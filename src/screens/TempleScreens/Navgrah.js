import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Animated,
    Dimensions,
    BackHandler
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';
import { connect, useSelector } from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import * as SanatanActions from '../../redux/actions/sanatanActions';
import Modal from 'react-native-modal';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import AjkaPradhan from './Components/AjkaPradhan';
import MusciPlayer from './Components/Navgarh/MusciPlayer';
import Flower from './Components/Flower';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import HeaderSantan from './Components/header';
import Mythali from './Components/Mythali';
import Bell from './Components/Navgarh/Bell';
import BottomLeft from './Components/Navgarh/BottomLeft';
import PlayBell from './Components/Navgarh/PlayBell';
import CoconutAnimation from './Components/CoconutAnimation';
import MandirViewNavgrah from './Components/Navgarh/MandirViewNavgrah';
import MandirBackgroundNavgrah from './Components/Navgarh/MandirBackgroundNavgrah';
import HeaderImageNavgarh from './Components/Navgarh/HeaderImageNavgarh';
import Header from './Components/Navgarh/Header';
import SantanSimmer from '../../components/SantanSimmer';
import MusicSound from './Components/MusicSound';
import MyHeader from '../../components/MyHeader';
import { normalize } from '../../config/constants';
import { Alert } from 'react-native';

const { height } = Dimensions.get('window');

const NewSanatan = ({ sanatangif,
    dispatch,
    getbaghwandatanavgrah,
    mudradata,
    customerData,
    navigation,
    showLottieMudra,
    visibleNavgarhIndex,
    flowerVisible,
    cocountVisible }) => {

    const rotateValue = useState(new Animated.Value(0))[0];
    const spinValue = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        if (getbaghwandatanavgrah) {
            dispatch(SanatanActions.getSantanAudioSelect(getbaghwandatanavgrah[visibleNavgarhIndex]?.bulkAudioUpload));
        }

        return () => {
            rotateValue.stopAnimation();
        };
    }, [rotateValue, getbaghwandatanavgrah]);

     

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
        dispatch(HomeActions.getBaghwandataNavgrah())
        dispatch(HomeActions.getPoojaCategory())
    }, [dispatch]);

    const [musicVisible, setMusicVisible] = useState(false);
        const [isPlaying, setIsPlaying] = useState(false);
        const soundRef = useRef(null);


    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                {!getbaghwandatanavgrah ? 
                <SantanSimmer /> :
               <>
                <Flower />
                <StatusBar backgroundColor={'#D6CDBB'} barStyle={'dark-content'} />
                <Header localBalance={localBalance} navigation={navigation} showLottieMudra={showLottieMudra} show={true} />
                <MandirBackgroundNavgrah />
                <MandirViewNavgrah />
                {getbaghwandatanavgrah && <HeaderImageNavgarh getbaghwandatanavgrah={getbaghwandatanavgrah} visibleNavgarhIndex={visibleNavgarhIndex} />}
                <Mythali spinValue={spinValue} />
                {flowerVisible && <PlayBell />}
                {cocountVisible && <CoconutAnimation />}
                <BottomLeft setLocalBalance={setLocalBalance} spinValue={spinValue} refRBSheetMusic={refRBSheetMusic} />
                <View style={{ position: "absolute", alignSelf: 'center', bottom: 5 }}>
                    <AjkaPradhan />
                </View>
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
                    closeOnPressBack
                    customAvoidingViewProps={{
                        enabled: false,
                    }}
                >
                    <MusciPlayer onClose={() => refRBSheetMusic.current?.close()} />

                </RBSheet>
                 {/* <MusicSound visible={musicVisible} onClose={() => setMusicVisible(false)}  visibleIndex={visibleNavgarhIndex}
                                                    getbaghwandata={getbaghwandatanavgrah}
                                                     /> */}
                </>}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    notificationData: state.customer.notificationData,
    sanatangif: state.home.sanatangif,
    getbaghwandatanavgrah: state.home.getbaghwandatanavgrah,
    getcategorydata: state.home.getcategorydata,
    mudradata: state.home.mudradata,
    aartiSound: state.sanatan.aartiSound,
    shankhSound: state.sanatan.shankhSound,
    cocountSound: state.sanatan.cocountSound,
    gifBellVisible: state.sanatan.gifBellVisible,
    imageBellVisible: state.sanatan.imageBellVisible,
    showLottieMudra: state.sanatan.showLottieMudra,
    selecteTop: state.sanatan.selecteTop,
    visibleNavgarhIndex: state.sanatan.visibleNavgarhIndex,
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


});