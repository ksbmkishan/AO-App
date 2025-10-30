import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  StatusBar,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import * as CustomerActions from '../../redux/actions/CustomerActions'
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import { Fonts, Sizes } from '../../assets/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../config/Constants1';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import RenderHTML from 'react-native-render-html';
import * as SantanaActions from '../../redux/actions/sanatanActions';
import { FontsStyle, normalize } from '../../config/constants';
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';
import { useLottieAnimation } from '../../utils/DownloadFile/downloadHome';

const VardaniBargad = ({ dispatch, mudradata, vardanShivalyaData }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(10)).current;
  const translateX = useRef(new Animated.Value(-100)).current;

  const customerData = useSelector(state => state.customer.customerData);
  const navigation = useNavigation();
  const [showLottieMudra, setShowLottieMudra] = useState(false);
  const [localBalance, setLocalBalance] = useState(mudradata?.balance || 0);
  const [showFlyingChunni, setShowFlyingChunni] = useState(false);
  const [showChunni, setShowChunni] = useState(true);
  const [chunniSound, setChunniSound] = useState(null);
  const [days, setDays] = useState(0);
  const [canClickChunni, setCanClickChunni] = useState(true);
  const [showChunniImage, setShowChunniImage] = useState(false);
  const [isAnimationLoading, setIsAnimationLoading] = useState(false);

  const refRBSheetBottom = useRef(null);
  const lottieRef = useRef(null);

  const { t } = useTranslation();

  // Use Lottie hook for Vardani animation
  const { animationSource, loading: animationLoading, error } = useLottieAnimation("vardani");

  console.log('🔍 Vardani Lottie Source:', animationSource);
  console.log('📊 Vardani Loading state:', animationLoading);

  useEffect(() => {
    dispatch(SantanaActions.getSantanVardanShivalya());
  }, [dispatch]);

  useEffect(() => {
    const sound = new Sound('chuni.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setChunniSound(sound);
    });

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  useEffect(() => {
    const data = {
      userId: customerData?._id,
    };
    dispatch(HomeActions.getAllMudra(data));
  }, [dispatch, customerData?._id, mudradata?.balance]);

  useEffect(() => {
    setLocalBalance(mudradata?.balance || 0);
  }, [mudradata]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT * 0.1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: SCREEN_WIDTH * 0.2,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(500),
      ]),
    ).start();
  }, [translateY, translateX]);

  useEffect(() => {
    const loadDays = async () => {
      const storedDays = await AsyncStorage.getItem('days');
      if (storedDays) {
        setDays(parseInt(storedDays));
      }
    };

    loadDays();
  }, []);

  const reset = async () => {
    dispatch(CustomerActions.onVardanDayReset());
  };

  const lotaArpan = async () => {
    if (!canClickChunni || !animationSource) {
      console.log('🚫 Cannot click - conditions not met:', { canClickChunni, hasSource: !!animationSource });
      return;
    }

    console.log('test');

    setIsAnimationLoading(true);
    const payload = {
      handleAnimated: () => handleAnimatedClick(),
    }
    dispatch(CustomerActions.onVARDANSHIVALYADEDUCT(payload));

    // Play sound
    if (chunniSound) {
      chunniSound.play(success => {
        if (!success) {
          console.log('Sound playback failed');
        }
      });
    }

    setShowFlyingChunni(true);
    setShowChunni(false);
    setCanClickChunni(false);

    setTimeout(() => {
      setShowChunni(true);
    }, 3000);

    // Save the current timestamp and days in AsyncStorage
    const currentTimestamp = new Date().getTime().toString();
    await AsyncStorage.setItem('lastClickTimestamp', currentTimestamp);
    await AsyncStorage.setItem('days', (days + 1).toString());
  };

  const handleAnimatedClick = () => {
    setShowLottieMudra(true);
    setTimeout(() => {
      setShowLottieMudra(false);
    }, 2000);
  }

  const handleAnimationFinish = () => {
    console.log("✅ Vardani Lottie animation finished");
    setShowFlyingChunni(false);
    setCanClickChunni(true);
    setIsAnimationLoading(false);
  }

  const handleAnimationLoadError = (error) => {
    console.log("❌ Vardani Lottie animation error:", error);
    setShowFlyingChunni(false);
    setCanClickChunni(true);
    setIsAnimationLoading(false);
  }

  const handleAnimationLoaded = () => {
    console.log("✅ Vardani Lottie animation loaded successfully");
    setIsAnimationLoading(false);
  }

  const showNumber0 = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toFixed(2);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  }

  const isToday = moment(customerData?.lastVardaniDate).format('DD-MM-YYYY') == moment(new Date()).format('DD-MM-YYYY');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={'#265765'}
        barStyle={'dark-content'}
      />
      <View style={styles.centeredImageContainer}>
        <ImageBackground
          source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/vardaniBargad.jpg' }}
          style={styles.imageBackground}>
          <View style={styles.headerContainer}>
            <View>
              <TouchableOpacity onPress={() => handleBack()}>
                <Ionicons name="chevron-back" size={normalize(30)} color="#fff" />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => reset()}
                style={styles.daysContainer}>
                <Text style={{ ...FontsStyle.font, color: 'white', fontSize: normalize(12) }}>
                  {t("Days")}
                </Text>
                <Text style={{ ...FontsStyle.font, color: 'white', fontSize: normalize(12) }}>
                  {customerData?.dayVardan}
                </Text>
                <Text style={styles.resetText}>
                  {t("Reset")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.walletButton}
              onPress={() => {
                navigation.navigate('wallet');
              }}>
              <Text style={{ ...FontsStyle.font, fontSize: normalize(12) }}>
                {showNumber0(customerData?.wallet_balance || 0)}
              </Text>
              <Image
                source={require('../../assets/images/mudra.png')}
                style={styles.mudraIcon}
              />
            </TouchableOpacity>
          </View>

          {showLottieMudra && (
            <LottieView
              source={require('../../assets/lottie/mudra.json')}
              autoPlay
              loop
              style={styles.mudraAnimation}
            />
          )}

          {/* Full Screen Lottie Animation */}
          {showFlyingChunni && animationSource && (
            <View style={styles.fullScreenAnimationContainer}>
              <LottieView
                ref={lottieRef}
                source={animationSource}
                autoPlay
                loop={false}
                style={styles.fullScreenLottie}
                resizeMode="cover"
                onAnimationFinish={handleAnimationFinish}
                onAnimationLoaded={handleAnimationLoaded}
                onError={handleAnimationLoadError}
                hardwareAccelerationAndroid
              />

              {(isAnimationLoading || animationLoading) && (
                <View style={styles.loader}>
                  <Loader />
                </View>
              )}
            </View>
          )}

          {/* Show overlay image if already done today */}
          {showChunni && isToday && (
            <View style={styles.overlayContainer}>
              <Image
                source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/vardaniBargad2.jpg' }}
                style={styles.overlayImage}
              />
            </View>
          )}

          {/* Chunni Button */}
          {showChunni && (
            <View style={styles.chunniContainer}>
              <TouchableOpacity
                onPress={lotaArpan}
                // disabled={!canClickChunni || isToday}
                style={styles.chunniButton}
              >
                <Image
                  source={require('../../assets/images/chunni.png')}
                  style={styles.chunniImage}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => refRBSheetBottom.current?.open()}
            style={styles.infoButton}
          >
            <Image
              source={require('../../../src/assets/images/sun.png')}
              style={styles.infoIcon}
            />
          </TouchableOpacity>
         
          <Text style={styles.instructionText}>
            {t("Tap → Offer Red Chunni → Be Blessed at Vardani Bargad")}
          </Text>
        </ImageBackground>
      </View>

      <RBSheet
        ref={refRBSheetBottom}
        useNativeDriver={true}
        draggable={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            height: SCREEN_HEIGHT * 0.8,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 0 }}>
            <TouchableOpacity
              style={{ margin: 10, alignSelf: 'flex-end' }}
              onPress={() => refRBSheetBottom?.current?.close()}
            >
              <Ionicons name='close' color={'black'} size={28} />
            </TouchableOpacity>

            <View style={{ padding: 10 }}>
              <RenderHTML
                contentWidth={SCREEN_WIDTH - 40}
                source={{
                  html: `<div style="color: black; max-width: 100%; text-align: justify; font-size: 16px; line-height: 24px;">
                    ${t('lang') === 'hi'
                      ? vardanShivalyaData && vardanShivalyaData[0]?.description_hi
                      : vardanShivalyaData && vardanShivalyaData[0]?.description
                    }
                  </div>`,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  mudradata: state.home.mudradata,
  vardanShivalyaData: state.sanatan.vardanShivalyaData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VardaniBargad);

const styles = StyleSheet.create({
  centeredImageContainer: {
    flex: 1,
  },
  imageBackground: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 20,
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    backgroundColor: colors.background_theme2,
    padding: Sizes.fixPadding * 0.5,
    borderRadius: Sizes.fixPadding * 2,
    height: SCREEN_HEIGHT * 0.05
  },
  resetText: {
    ...FontsStyle.font,
    color: colors.background_theme2,
    backgroundColor: 'white',
    padding: Sizes.fixPadding * 0.5,
    borderRadius: Sizes.fixPadding * 2,
    fontSize: normalize(12)
  },
  walletButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-around',
    paddingLeft: 15,
  },
  mudraIcon: {
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_HEIGHT * 0.02,
    objectFit: 'contain'
  },
  mudraAnimation: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.1,
    zIndex: 99999,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
    left: SCREEN_WIDTH * 0.3,
    top: 10,
  },
  // Full Screen Animation Styles
  fullScreenAnimationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenLottie: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'transparent',
  },
  overlayContainer: {
    position: 'absolute',
    zIndex: 3,
  },
  overlayImage: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    resizeMode: 'stretch'
  },
  chunniContainer: {
    flex: 1,
    zIndex: 12,
  },
  chunniButton: {
    position: 'absolute',
    alignSelf: 'center',
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    bottom: SCREEN_HEIGHT * 0.1,
    opacity: 1,
    borderRadius: 100,
    left: SCREEN_WIDTH * 0.45
  },
  chunniImage: {
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.25,
  },
  infoButton: {
    backgroundColor: colors.background_theme2,
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.15,
    left: SCREEN_WIDTH * 0.08,
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: 100,
    zIndex: 12
  },
  infoIcon: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    alignSelf: 'center',
  },
  instructionText: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    bottom: SCREEN_HEIGHT * 0.08, // Changed from 0 to 0.02 (2% from bottom)
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(12),
    zIndex:3
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    zIndex: 30,
  },
});