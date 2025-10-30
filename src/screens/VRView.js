import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    FlatList,
    NativeModules,
    requireNativeComponent,
    Text
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Sound from 'react-native-sound';
import Voice from '@react-native-voice/voice';
import { connect, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { base_url } from '../config/constants';
import AnimatedThaliTwo from './VRAndAR/AnimatedThaliTwo';
import * as VrAndArActions from '../redux/actions/VrActions';

const { PanoramaViewer } = NativeModules;
// const PanoramaView = requireNativeComponent('PanoramaView');

const VRView = ({
    getbaghwandata,
    visibleIndex,
    dispatch,
    customerData
}) => {
    const [isLandscape, setIsLandscape] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const bellSoundRef = useRef(null);

    const navigation = useNavigation();
    const isUnmounted = useRef(false);
    const { vrItems } = useSelector(state => state.VRAndAR);

    


    // 🔄 Orientation Check
    useEffect(() => {
        const handleOrientation = (orientation) => {
            const isLandscapeMode = orientation.startsWith('LANDSCAPE');
            setIsLandscape(isLandscapeMode);

            Orientation.lockToLandscape();

            if (!isLandscapeMode && !alertShown) {
                Alert.alert(
                    'लैंडस्केप मोड आवश्यक है',
                    'कृपया बेहतर अनुभव के लिए अपना डिवाइस घुमाएं।',
                    [{ text: 'ठीक है', onPress: () => setAlertShown(true) }]
                );
            }
        };

        Orientation.getOrientation(handleOrientation);
        Orientation.addOrientationListener(handleOrientation);

        return () => {
            Orientation.removeOrientationListener(handleOrientation);
             Orientation.unlockAllOrientations();
             Orientation.lockToPortrait();
        };
    }, [alertShown]);

    // Initialize voice recognition
    const [recognizedText, setRecognizedText] = useState('');

    useEffect(() => {
        Voice.onSpeechResults = (e) => {
            console.log('Speech results:', e.value);
            setRecognizedText(e.value[0]);
            processVoiceCommand(e.value[0].toLowerCase());
        };

        Voice.onSpeechError = (e) => {
            console.log('Speech error:', e);
            if (!isUnmounted.current && e.error?.code === '7') {
                setTimeout(() => {
                    Voice.stop(),
                        Voice.start('en-IN')
                }, 300);
            } else {
                Voice.stop();
                Voice.start('en-IN');

            }
        };

        // Start listening automatically when component mounts
        startVoiceRecognition();

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
            if (bellSoundRef.current) {
                bellSoundRef.current.release();
            }
        };
    }, []);

    const startVoiceRecognition = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'App needs access to your microphone for voice commands',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await Voice.start('en-IN'); // english language
            } else {
                console.log('Microphone permission denied');
            }
        } catch (err) {
            console.warn('Error starting voice recognition:', err);
        }
    };

    const processVoiceCommand = (command) => {
        console.log('Processing command:', command);

        const getItemName = vrItems.find(item =>
            item.keywords.some(keyword =>
                command.toLowerCase().includes(keyword.toLowerCase())
            )
        );

        if (getItemName) {
            console.log('Recognized item:', getItemName);
            const payload = {
                data: {
                    name: getItemName.itemName,
                    amount: getItemName.itemPrice,
                    paymentStatus: getItemName.payment,
                    customerId: customerData?._id,
                },
                onComplete: () => handleSound(getItemName),
            }
            dispatch(VrAndArActions.onVrDeductAdd(payload));
        } else if (command.includes('wapas') || command.includes('back')) {
            console.log('Navigating back');
            navigation.goBack();
        } else {
            console.log('No match found.');
        }
        Voice.stop(); // Stop listening after processing command
        Voice.start('en-IN'); // Always restart listening

    };




    const imageUrl = getbaghwandata && getbaghwandata[visibleIndex]?.vr_mode && getbaghwandata[visibleIndex]?.vr_mode.length > 0
        ? base_url + getbaghwandata[visibleIndex]?.vr_mode[0]?.vr_image :
        'https://cloudflare1.360gigapixels.com/pano/hemant3d/00905632_hampi2_cube_3_equi.jpg/equirect_crop_3_1/6.jpg';

       
useEffect(() => {
    PanoramaViewer.showPanorama(imageUrl)
      .then(() => console.log('Panorama viewer launched'))
      .catch((error) => console.error('Error:', error));
  }, [imageUrl]);

    const handleSound = (data) => {
        if (isUnmounted.current) return;

        const soundUrl = base_url + data?.audio;
        console.log("Sound URL:", soundUrl);

        if (!data?.audio) {
            Alert.alert('Error', 'Audio URL is not available');
            return;
        }

        dispatch(VrAndArActions.showgif(data));

        // Release previous sound
        if (bellSoundRef.current) {
            bellSoundRef.current.release();
            bellSoundRef.current = null;
        }

        const sound = new Sound(soundUrl, null, (error) => {
            if (error) {
                console.log('Failed to load sound:', error);
                return;
            }

            bellSoundRef.current = sound;

            sound.play((success) => {
                if (success) {
                    console.log('Sound played successfully');
                } else {
                    console.log('Sound playback failed');
                }
                sound.release();
                bellSoundRef.current = null;
            });

            // Optional: Stop manually after duration (if needed)
            if (data?.duration) {
                setTimeout(() => {
                    if (bellSoundRef.current) {
                        bellSoundRef.current.stop(() => {
                            console.log('Sound stopped manually');
                            bellSoundRef.current.release();
                            bellSoundRef.current = null;
                        });
                    }
                }, data.duration * 1000);
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <FlatList
                    data={vrItems}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                       
                        <TouchableOpacity style={styles.iconButton} onPress={() => handleSound(item)}>
                            <Image
                                source={{ uri: base_url + item.itemImage }}
                                style={{ width: 20, height: 20, borderRadius: 25 }}
                            />
                        </TouchableOpacity>
                     
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <AnimatedThaliTwo />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    vrContainer: { flex: 1 },
    overlay: {
        position: 'absolute',
        left: 50,
        top: '0%',
        zIndex: 10,
    },
    iconButton: {
        backgroundColor: 'rgba(255, 165, 0, 0.8)',
        borderRadius: 30,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#FFF',
        marginHorizontal: 2,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: '#FFF',
    },
    micIndicator: {
        position: 'absolute',
        bottom: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0F0',
    },
    webview: {
        flex: 1,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -12 }, { translateY: -12 }],
    },
    controls: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 10,
    },
    pano: {
    width: '100%',
    height: 100
  }
});

const mapStateToProps = (state) => ({
    visibleIndex: state.sanatan.visibleIndex,
    getbaghwandata: state.home.getbaghwandata,
    customerData: state.customer.customerData,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => dispatch(action),
});


export default connect(mapStateToProps, mapDispatchToProps)(VRView); 