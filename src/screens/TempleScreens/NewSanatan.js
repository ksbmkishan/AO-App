import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Animated,
    BackHandler,
    Alert,
    Dimensions,
} from 'react-native';
import { Colors, FoldPhone, SCREEN_HEIGHT, SCREEN_WIDTH, } from '../../config/Screen';
import { StatusBar } from 'react-native';
import {
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { connect, useSelector } from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import * as SanatanActions from '../../redux/actions/sanatanActions';
import AjkaPradhan from './Components/AjkaPradhan';
import Flower from './Components/Flower';
import HeaderSantan from './Components/header';
import MandirBackground from './Components/MandirBackground';
import MandirView from './Components/MandirView';
import Mythali from './Components/Mythali';
import BottomLeft from './Components/BottomLeft';
import PlayBell from './Components/PlayBell';
import CoconutAnimation from './Components/CoconutAnimation';
import HeaderImage from './Components/HeaderImage';
import SantanSimmer from '../../components/SantanSimmer';
import Sound from 'react-native-sound';
import MusicSound from './Components/MusicSound';
import RBSheet from 'react-native-raw-bottom-sheet';
import MusciPlayer from './Components/MusciPlayer';
import MyHeader from '../../components/MyHeader';
import { normalize } from '../../config/constants';
import MusicPlayerModal from './Components/MusicPlayerModal';

const { width, height } = Dimensions.get('window')

const NewSanatan = ({ sanatangif,
    dispatch,
    getbaghwandata,
    mudradata,
    customerData,
    navigation,
    showLottieMudra,
    visibleIndex,
    flowerVisible,
    cocountVisible,
    route }) => {

    console.log('adsa ', route)

    const rotateValue = useState(new Animated.Value(0))[0];
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (getbaghwandata) {
            dispatch(SanatanActions.getSantanAudioSelect(getbaghwandata[visibleIndex]?.bulkAudioUpload));
        }

        return () => {
            rotateValue.stopAnimation();
        };
    }, [rotateValue, getbaghwandata]);

    const translateY = useRef(new Animated.Value(-200)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const [localBalance, setLocalBalance] = useState(mudradata?.balance || 0);
    const refRBSheetMusic = useRef(null);

    useEffect(() => {
        const data = {
            userId: customerData?._id
        }
        dispatch(HomeActions.getAllMudra(data));
    }, [dispatch, customerData?._id, mudradata?.balance]);

    useEffect(() => {
        setLocalBalance(mudradata?.balance || 0);
    }, [mudradata]);


    useEffect(() => {
        dispatch(HomeActions.getSanatangif());
        dispatch(HomeActions.getBaghwanData());
        dispatch(HomeActions.getPoojaCategory())
    }, [dispatch]);

    const [musicVisible, setMusicVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [youtubeVisible, setYoutubeVisible] = useState(false);
    const soundRef = useRef(null);

    useEffect(() => {
        if (route?.params?.data && getbaghwandata) {
            let data = {};
            try {
                data = JSON.parse(decodeURIComponent(route.params.data));
                handleThali(data?.audio);
            } catch (e) {
                console.log('Invalid data', e);
            }

        }

    }, [route.params?.data, getbaghwandata]);

    const handleThali = (audio) => {
        const data = {
            "_id": "67ea34d985ced1d1fa78eef7",
            "duration": 10,
            "itemImage": "uploads/images/05abced7-cb22-48d1-bbf9-f7b01e327ac3.png",
            "itemName": "Thali",
            "itemPrice": 1,
            "payment": "add"
        };

        const durationData = data?.duration ? data?.duration * 1000 : 3000;

        const payload = {
            data: {
                duration: durationData,
                spinValue: spinValue,  // make sure spinValue is defined
                itemImage: data?.itemImage,
                itemPrice: data?.itemPrice,
            },
            startAnimation: () => playAudio(audio, durationData),
        };

        dispatch(SanatanActions.santanThali(payload));
        dispatch(SanatanActions.getSantanSOundPlayBell(10000));
    };

    const playAudio = (audio, durationMs) => {
        if (!audio) return;

        const sound = new Sound(
            'https://api.astroone.in/uploads/audio/' + audio,
            Sound.MAIN_BUNDLE,
            (error) => {
                if (error) {
                    console.log('Failed to load the sound', error);
                    return;
                }

                sound.play((success) => {
                    sound.release(); // release when naturally ends
                });

                // Stop manually after durationMs
                setTimeout(() => {
                    sound.stop(() => {
                        sound.release();
                        console.log('Sound stopped after', durationMs, 'ms');
                    });
                }, durationMs);
            }
        );
    };



    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>

                {!getbaghwandata ?
                    <SantanSimmer /> :
                    <>
                        {/* <MandirBackground /> */}
                        <Flower />
                        <StatusBar backgroundColor={'#D6CDBB'} barStyle={'dark-content'} />
                        <MandirView />
                        <HeaderSantan show={true} localBalance={localBalance} navigation={navigation} showLottieMudra={showLottieMudra} />
                        {getbaghwandata && (
                            <HeaderImage getbaghwandata={getbaghwandata} visibleIndex={visibleIndex} />
                        )}
                        <Mythali spinValue={spinValue} />
                        {flowerVisible && <PlayBell />}
                        {cocountVisible && <CoconutAnimation />}

                        <BottomLeft setLocalBalance={setLocalBalance} spinValue={spinValue} refRBSheetMusic={refRBSheetMusic} />
                        <View style={{ position: "absolute", alignSelf: 'center', bottom: 5, zIndex: 2 }}>
                            <AjkaPradhan />
                        </View>

                        {/* <View style={{ flex: 1, height: '100%', position: 'absolute',width:'100%',zIndex:100 }}> */}
                        <MusicSound visible={musicVisible} onClose={() => setMusicVisible(false)} visibleIndex={visibleIndex}
                            getbaghwandata={getbaghwandata}
                        />
                        {/* </View> */}

                        <RBSheet
                            ref={refRBSheetMusic}
                            useNativeDriver={true}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: 'transparent',
                                },
                                container: {
                                    height: height,
                                    backgroundColor: '#faedcd',

                                },
                                draggableIcon: {
                                    backgroundColor: '#000',
                                },
                            }}
                            customModalProps={{
                                animationType: 'slide',
                                statusBarTranslucent: true,
                            }}
                            customAvoidingViewProps={{
                                enabled: false,
                            }}
                            closeOnPressBack
                        >
                            <MusciPlayer onClose={() => refRBSheetMusic.current?.close()} />
                        </RBSheet>
                    </>
                }
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    notificationData: state.customer.notificationData,
    sanatangif: state.home.sanatangif,
    getbaghwandata: state.home.getbaghwandata,
    getcategorydata: state.home.getcategorydata,
    mudradata: state.home.mudradata,
    aartiSound: state.sanatan.aartiSound,
    shankhSound: state.sanatan.shankhSound,
    cocountSound: state.sanatan.cocountSound,
    gifBellVisible: state.sanatan.gifBellVisible,
    imageBellVisible: state.sanatan.imageBellVisible,
    showLottieMudra: state.sanatan.showLottieMudra,
    selecteTop: state.sanatan.selecteTop,
    visibleIndex: state.sanatan.visibleIndex,
    imageBellVisible1: state.sanatan.imageBellVisible1,
    gifBellVisible1: state.sanatan.gifBellVisible1,
    audioSelected: state.sanatan.audioSelected,
    activeCategory: state.sanatan.activeCategory,
    currentIndex: state.sanatan.currentIndex,
    flowerVisible: state.sanatan.flowerVisible,
    cocountVisible: state.sanatan.cocountVisible
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NewSanatan);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    templeImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignSelf: 'center',
        position: 'relative',
        zIndex: 10
    },

    centeredImage: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_WIDTH * 0.5,
        borderRadius: SCREEN_WIDTH * 0.04,
        position: "absolute",
        alignSelf: "center",
        top: SCREEN_HEIGHT * 0.41,
        objectFit: "cover"
    },

    scrollView: {
        width: '100%',
    },
    scrollableImageContainer: {
        width: SCREEN_WIDTH * 1.13,
        height: SCREEN_HEIGHT * 0.5,
    },
    pujaAssetsContainer: {
        position: 'absolute',
        bottom: SCREEN_WIDTH * 0.16,
        alignItems: 'center',
    },
    pujaAssetsFlatList: {
        gap: 20,
    },
    pujaItemContainer: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: '#FFA500',
        borderRadius: 50,
        backgroundColor: '#940000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pujaImage: {
        height: 30,
        width: 30,
    },

    AajKaPradhanContainer: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    musicIconBackground: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    musicIconTouchable: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.08,
    },
    musicIcon: {
        height: '100%',
        width: '100%',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#FFA500',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 20,
    },
    musicPlayerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    musicController: {
        alignItems: 'center',
    },
    musicImage: {
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_HEIGHT * 0.1,
        marginBottom: 10,
    },
    timerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    timerText: {
        fontSize: 14,
        color: '#fff',
    },
    controllerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginTop: 10,
    },
    imageBackground: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.08,
    },
    iconImage: {
        height: '100%',
        width: '100%',
    },
    fullScreenModal: {
        margin: 0,
    },
    modalContent2: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: '100%'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    modalBody: {
        flex: 1,
        marginTop: 20,

    },
    modalImage: {
        width: "100%",
        objectFit: "cover",
        height: "30%"
    },
    modalText: {
        fontSize: 24,
        color: '#FFA500',
        fontWeight: 'bold'
    },
    modalText1: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    modalText2: {
        fontSize: 18,
        color: 'black',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        borderBottomColor: '#995844',
        borderBottomWidth: 2,
    },

    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 5,
        objectFit: "contain",
        borderWidth: 1,
        borderColor: "#fff"
    },
    itemName: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
    },
    itemPrice: {
        fontSize: 12,
        color: '#ffcc00',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ffb703',
        padding: 15,
        borderRadius: 12,
        width: 100,
        height: 100,
        zIndex: 100
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },

});