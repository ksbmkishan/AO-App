import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import LottieView from 'lottie-react-native';
import { Fonts, Sizes } from '../../assets/style';
import { colors } from '../../config/Constants1';
import RBSheet from 'react-native-raw-bottom-sheet';
import RenderHTML from 'react-native-render-html';
import * as SantanaActions from '../../redux/actions/sanatanActions';
import { FontsStyle, normalize } from '../../config/constants';
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';
import { useLottieAnimation } from '../../utils/DownloadFile/downloadHome';

const Shivalya = ({ dispatch, mudradata, vardanShivalyaData }) => {
  const customerData = useSelector(state => state.customer.customerData);
  const navigation = useNavigation();

  const { t } = useTranslation();

  const [showLota, setShowLota] = useState(false);
  const [showSecondLota, setShowSecondLota] = useState(true);
  const [showLottieMudra, setShowLottieMudra] = useState(false);
  const [localBalance, setLocalBalance] = useState(mudradata?.balance || 0);
  const [canClickChunni, setCanClickChunni] = useState(true);
  const [isAnimationLoading, setIsAnimationLoading] = useState(false);

  const refRBSheetBottom = useRef(null);
  const lottieRef = useRef(null);

  // Use the specialized Lottie hook
  const { animationSource, loading: animationLoading, error } = useLottieAnimation("shivalya");

  console.log('🔍 Lottie Source:', animationSource);
  console.log('📊 Loading state:', animationLoading);
  console.log('❌ Error state:', error);

  useEffect(() => {
    dispatch(SantanaActions.getSantanVardanShivalya());
  }, [dispatch]);

  useEffect(() => {
    const data = {
      userId: customerData?._id,
    };
    dispatch(HomeActions.getAllMudra(data));
  }, [dispatch, customerData?._id, mudradata?.balance]);

  useEffect(() => {
    setLocalBalance(mudradata?.balance || 0);
  }, [mudradata]);

  const reset = async () => {
    dispatch(CustomerActions.onShivalyaDayReset());
  };

  const lotaArpan = async () => {
    if (!canClickChunni || !animationSource) {
      console.log('🚫 Cannot click - conditions not met:', { canClickChunni, hasSource: !!animationSource });
      return;
    }

    console.log('🎬 Starting animation sequence...');
    setIsAnimationLoading(true);
    
    const payload = {
      onClick: () => handleclick(),
      onAnimated: () => handleAnimated(),
    }
    dispatch(CustomerActions.onShivalyaDeduct(payload));
  };

  const handleAnimated = () => {
    console.log('💰 Mudra animation triggered');
    setShowLottieMudra(true);
    setTimeout(() => {
      setShowLottieMudra(false);
    }, 2000);
  }

  const handleclick = () => {
    console.log('🔄 Setting animation states');
    setShowLota(true);
    setShowSecondLota(false);
    setCanClickChunni(false);
    setIsAnimationLoading(false);
  }

  const handleAnimationFinish = () => {
    console.log("✅ Lottie animation finished");
    setShowLota(false);
    setShowSecondLota(true);
    setCanClickChunni(true);
    setIsAnimationLoading(false);
  }

  const handleAnimationLoadError = (error) => {
    console.log("❌ Lottie animation error:", error);
    setShowLota(false);
    setShowSecondLota(true);
    setCanClickChunni(true);
    setIsAnimationLoading(false);
  }

  const handleAnimationLoaded = () => {
    console.log("✅ Lottie animation loaded successfully - ready to play");
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

  const handBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primaryTheme} barStyle={'dark-content'} />
      
      <View style={styles.centeredImageContainer}>
        <ImageBackground
          source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/shiva.jpg' }}
          style={styles.imageBackground}
          resizeMode="stretch"
        >
          <View style={styles.headerContainer}>
            <View>
              <TouchableOpacity onPress={() => handBack()}>
                <Ionicons name="chevron-back" size={normalize(30)} color="#fff" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              style={styles.daysContainer}
            >
              <Text style={{ ...FontsStyle.font, color: 'white', fontSize: normalize(12) }}>{t("Days")}</Text>
              <Text style={{ ...FontsStyle.font, color: 'white', fontSize: normalize(12) }}>{customerData?.dayShivalya}</Text>
              <TouchableOpacity 
                onPress={() => reset()} 
                style={styles.resetButton}
              >
                <Text style={{ ...FontsStyle.font, color: colors.background_theme2, fontSize: normalize(12) }}>{t("Reset")}</Text>
              </TouchableOpacity>
            </TouchableOpacity>

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

            {showLottieMudra && (
              <LottieView
                source={require('../../assets/lottie/mudra.json')}
                autoPlay
                loop
                style={styles.mudraAnimation}
              />
            )}
          </View>

          {/* Full Screen Lottie Animation */}
          {showLota && animationSource && (
            <View style={styles.fullScreenAnimationContainer}>
              <LottieView
                ref={lottieRef}
                source={animationSource}
                autoPlay
                loop={false}
                style={styles.fullScreenLottie}
                resizeMode="cover"
                onAnimationFinish={handleAnimationFinish}
                onLoad={handleAnimationLoaded}
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

          {showSecondLota && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={lotaArpan}
              disabled={!canClickChunni || !animationSource}
              style={styles.tapArea}
            >
              <View style={styles.invisibleButton} />
              <Text style={styles.tapText}>
                {t("Tap Golden Kalash → Offer Milk → Be Blessed at Maha Shivalinga ✨")}
              </Text>
              {!animationSource && (
                <Text style={styles.loadingText}>
                  Loading animation... {animationLoading ? 'Downloading' : 'Ready'}
                </Text>
              )}
            </TouchableOpacity>
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
                      ? vardanShivalyaData && vardanShivalyaData[1]?.description_hi 
                      : vardanShivalyaData && vardanShivalyaData[1]?.description
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

export default connect(mapStateToProps, mapDispatchToProps)(Shivalya);

const styles = StyleSheet.create({
  centeredImageContainer: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 10,
    position: 'absolute',
    width: SCREEN_WIDTH
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.background_theme2,
    padding: Sizes.fixPadding * 0.5,
    borderRadius: Sizes.fixPadding * 2,
    marginHorizontal: Sizes.fixPadding * 5
  },
  resetButton: {
    backgroundColor: 'white',
    padding: Sizes.fixPadding * 0.5,
    borderRadius: Sizes.fixPadding * 2
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
    width: SCREEN_WIDTH * 0.08,
    height: SCREEN_HEIGHT * 0.02,
    objectFit: 'contain',
  },
  mudraAnimation: {
    position: 'absolute',
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
    zIndex: 20, // Higher zIndex to cover everything
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenLottie: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'transparent',
  },
  tapArea: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.72,
    alignSelf: 'center',
    zIndex: 1,
    alignItems: 'center',
  },
  invisibleButton: {
    backgroundColor: 'white',
    opacity: 0.01,
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  tapText: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    color: 'black',
    textAlign: 'center',
    fontSize: normalize(10),
    marginTop: 10,
    maxWidth: SCREEN_WIDTH * 0.85,
  },
  loadingText: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    fontSize: normalize(8),
    marginTop: 5,
  },
  infoButton: {
    backgroundColor: colors.background_theme2,
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.1,
    left: SCREEN_WIDTH * 0.08,
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: 100,
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    height: '70%',
    width: '70%',
    objectFit: 'contain',
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