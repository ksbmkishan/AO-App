import React, { useEffect, useRef } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import Sound from 'react-native-sound';
import { useDispatch, useSelector } from 'react-redux';
import * as VrAndArActions from '../../redux/actions/VrActions';
import { useNavigation } from '@react-navigation/native';
import SvgOrImage from '../../components/SvgOrImage';
import { Text } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';


export default function HeaderWithBell({ data, customerData }) {
    console.log('data', data)
    const bellSoundRef = useRef(null);
    const isUnmounted = useRef(false);

    const { vrItems } = useSelector(state => state.VRAndAR);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        Sound.setCategory('Playback');
        bellSoundRef.current = new Sound(
            'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/bell_sound.mp3',
            Sound.MAIN_BUNDLE,
            (error) => {
                if (error) console.log('Sound load error:', error);
            }
        );

        return () => {
            bellSoundRef.current?.release();
        };
    }, []);

    const handleSound = (data) => {
        if (isUnmounted.current) return;
        console.log("handleSound data", data?.itemName);
        const soundUrl =  data?.audio;
        console.log("Sound URL:", soundUrl, data);

        if (!data?.audio) {
            Alert.alert('Error', 'Audio URL is not available');
            return;
        }
        dispatch(VrAndArActions.showgif(data)); // Show gif based on item name


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

    const handleDeduct = (getItemName) => {
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
    }


    return (

        <View style={styles.overlay}>
            <View style={styles.row}>
                <FlatList
                    data={vrItems}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => handleDeduct(item)}
                        >
                            <SvgOrImage
                                uri={ item.itemImage}
                                style={{ width: 20, height: 20, borderRadius: 25 }}
                            />
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

               
            </View>
             {/* VR button inline with icons */}
                <TouchableOpacity
                    style={styles.iconButton2}
                    onPress={() => {
                        navigation.navigate('VrUnity', { data: data });
                    }}
                >
                    <Text style={{color:'white',fontSize:15, fontWeight:'bold'}}>Enter in VR Temple </Text>
                    <Image
                        source={require('../../assets/images/vr.png')}
                        style={styles.icon}
                    />
                    <View style={styles.micIndicator} />
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    bellContainer: {
        padding: 8,
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 16,
        zIndex: 10,
        alignItems: 'center', // center the row horizontally
    },
    row: {
        alignItems: 'center',
        justifyContent: 'center', // icons + VR button centered together
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: '#FFF',
    },
    iconButton: {
        backgroundColor: 'rgba(255, 165, 0, 0.8)',
        borderRadius: 30,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFF',
        marginRight: 10,
        overflow: 'hidden',
    },
    iconButton2: {
        backgroundColor: 'rgba(255, 165, 0, 0.8)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFF',
        marginRight: 10,
        overflow: 'hidden',
        position:'absolute',
        bottom:SCREEN_HEIGHT * 0.15,
        flexDirection:'row',
        padding:10,
        paddingHorizontal:SCREEN_WIDTH * 0.25
    },
});
