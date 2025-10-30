import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  RefreshControl,
  Alert,
  FlatList,
  BackHandler,
  Button,
} from 'react-native';
import React, { useCallback } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { WebView } from 'react-native-webview';
import { useEffect, useRef } from 'react';
import {
  colors,
  fonts,
  getFontSize,
} from '../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as HomeActions from '../../redux/actions/HomeActions';
import * as EcommerceActions from '../../redux/actions/ecommerceActions';
import * as SettingActions from '../../redux/actions/SettingActions';
import { base_url, FontsStyle, get_astro_blogs, img_url, normalize } from '../../config/constants';
import HomeSimmer from '../../components/HomeSimmer';
import { Sizes, Fonts, Colors } from '../../assets/style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import MyStatusBar from '../../components/MyStatusbar';
import * as BlogActions from '../../redux/actions/BlogActions';
import * as CustomerActions from '../../redux/actions/CustomerActions'
import * as KundliActions from '../../redux/actions/KundliActions'
import { RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
const { width, height } = Dimensions.get('screen');
import FastImage from "@d11/react-native-fast-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import SvgOrImage from '../../components/SvgOrImage';
import Video from 'react-native-video';
import { navigate } from '../../navigations/NavigationServices';
import { useFocusEffect } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
import WebViewComponent from './components/WebViewComponent';
import VideoPlayerView from './components/VideoPlayerNative';
import AartiModal from '../../components/AartiModal';
import VideoPlayerComponent from './components/VideoPlayer';
import Media3PlayerView from './components/Media3PlayerView';
import LottieView from 'lottie-react-native';
import TranslateText from '../language/TranslateText';
import ForceUpdateChecker from '../../../ForceUpdateChecker';
import RenderHTML from 'react-native-render-html';
import * as RazorpayActions from '../../redux/actions/RechargeActions';
import socketServices from '../../utils/socket';
const Home = ({
  navigation,
  dispatch,
  isRefreshing,
  homeSimmer,
  bannerData,
  customerData,
  liveTempleData,
  testmonialData,
  ecommerceCategoryData,
  NewPanchang,
  templeFoundation,
  teerthDham,
  templeVideos,
  route
}) => {
  const [livelist, setLivelist] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const [modalArtiVisible, setModalArtiVisible] = useState(customerData?.isJoin || false);



  const { t } = useTranslation();
  useEffect(() => {
    dispatch(HomeActions.getHomeData());
    dispatch(BlogActions.getTestmonial());
    dispatch(EcommerceActions.getEcommerceCategory());

  }, [dispatch]);

  useEffect(() => {
  if (customerData?._id) {
    console.log("Registering customer:", customerData._id);
    socketServices.emit("registerCustomer", customerData._id);
  }
}, [customerData]);

  const today = new Date();
  const day = today.getDate().toString();
  const month = (today.getMonth() + 1).toString();
  const year = today.getFullYear().toString();

  useEffect(() => {
    const payload = {
      day,
      month,
      year,
      lang: t("lang")
    };
    dispatch(KundliActions.getMyPanchang(payload));
  }, [day, month, year]);

  console.log('temple foundation ', teerthDham)

  const mYpachang = () => {
    const today = new Date();
    const day = today.getDate().toString();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();

    const payload = {
      day,
      month,
      year,
    };
    dispatch(KundliActions.getMyPanchang(payload));
  }

  const _listEmptyComponent = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
          alignSelf: 'center',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            color: '#000',
            textAlign: 'center',
            marginHorizontal: width * 0.35,
          }}>
          {t('NoVideo')}
        </Text>
      </View>
    );
  };

  const playerRef = useRef(null);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      console.log("Video has finished playing!");
    }
  }, []);



  useEffect(() => {
    const checkModalPreference = async () => {
      const showModal = await AsyncStorage.getItem('showModal');
      const savedReferralCode = await AsyncStorage.getItem('referralCode');

      // If 'showModal' is set to 'false', we hide the modal
      if (showModal === 'false') {
        setModalVisible(false);
      }

      if (savedReferralCode) {
        setReferralCode(savedReferralCode);
      }
    };
    checkModalPreference();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert(
          "Exit Temple",
          "Do you really want to exit?",
          [
            { text: "Cancel", style: "cancel", onPress: () => null },
            { text: "YES", onPress: () => BackHandler.exitApp() },
          ]
        );
        return true; // prevent default back behavior
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove(); // cleanup when screen unfocused
    }, [])
  );

  const handleSubmit = async () => {
    if (referralCode) {
      await AsyncStorage.setItem('referralCode', referralCode);
      const payload = {
        customerId: customerData?._id,
        referralCode: referralCode,
      };

      dispatch(CustomerActions.onCustomerReferralCode(payload));
    }

    if (dontShowAgain) {
      await AsyncStorage.setItem('showModal', 'false');
    }

    setModalVisible(false);
  };

  useEffect(() => {
    const checkModalPreference = async () => {
      const showModal = await AsyncStorage.getItem('showModal');
      if (showModal === 'false') {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
    };
    checkModalPreference();
  }, []);

  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      console.log("Visible item changed to:", viewableItems[0].item);
    }
  }).current;


  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <HomeHeader navigation={navigation} />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.black_color1,
          paddingHorizontal: Sizes.fixPadding,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                dispatch(HomeActions.getHomeDataOnRefresh());
                mYpachang()
              }}
            />
          }
          ListHeaderComponent={
            <>
              {homeSimmer ? (
                <HomeSimmer />
              ) : (
                <>
                  <View style={{ flex: 1, gap: SCREEN_WIDTH * 0.08 }}>
                    <View style={{ gap: 0, marginBottom: -SCREEN_HEIGHT * 0.05 }}>
                      {ASTROONENOTE()}
                      {CARD1()}
                    </View>
                    {bannerData && bannerInfo()}
                    {PlaceOfWorship()}
                    {ThreeDArt()}
                    {Recharge()}
                    {Foundation()}
                    {BANNER2()}
                    {banner3()}
                    {letterToGod()}
                    {YourHoroscope()}
                    {banner5()}
                    {banner6()}
                    {visittemple({ liveTempleData })}
                    {analysis()}
                    {ALMANAC()}
                    {HAPPY()}
                    {SHOPPING()}
                    {livelist && liveListInfo()}

                  </View>
                </>
              )}
            </>
          }
        />
        {/* <TouchableOpacity style={{backgroundColor:'red', padding:10, alignSelf:'center'}}
        onPress={() => dispatch(RazorpayActions.razorpayTest())}>
          <Text>Submit Payment Test</Text>
        </TouchableOpacity> */}
        {/* <Button
  title="Test Crash"
  onPress={() => {
    throw new Error("Test crash from Ritesh’s app!");
  }}
/> */}
      </View>
      <AartiModal
        onClose={() => dispatch(SettingActions.setVisibleHomeModal(false))}
        onJoin={() => {
          dispatch(SettingActions.setVisibleHomeModal(false));
          dispatch(SettingActions.onJoin({ customerId: customerData?._id }));
        }}
      />
      <ForceUpdateChecker />
    </View>
  );

  function PlaceOfWorship() {
    console.log('temple videos', templeVideos);
    const templeVideos2 = [
      {
        id: 1,
        name: t("Sanatan Temple"),
        videoSource: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/Santan1.json',
        navigateTo: 'Sanatan'
      },
      {
        id: 2,
        name: t("Navgrah Temple"),
        videoSource: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/Navgrah.json`,
        navigateTo: 'Navgrah'
      },
      {
        id: 3,
        name: t("Vardani Bargad"),
        videoSource: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/Vardani.json',
        navigateTo: 'VardaniBargad'
      },
      {
        id: 4,
        name: t("Shivalya Temple"),
        videoSource: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/Shivalya.json',
        navigateTo: 'Shivalya'
      }
    ];

    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}>
          {t("Place of Worship")}
          <Image
            source={require("../../assets/images/flower2.png")}
            style={{ height: 20, width: 20 }}
          />
        </Text>

        {[0, 2].map((rowStartIndex) => (
          <View key={rowStartIndex} style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            {templeVideos2.slice(rowStartIndex, rowStartIndex + 2).map((temple) => (
              <TouchableOpacity
                key={temple.id}
                onPress={() => navigation.navigate(temple.navigateTo)}
                style={{
                  height: SCREEN_HEIGHT * 0.2,
                  width: SCREEN_WIDTH * 0.42,
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: 'black',
                }}
              >

                <LottieView
                  source={{ uri: temple.videoSource }}
                  autoPlay
                  loop
                  speed={1}
                  hardwareAccelerationAndroid={true} // Android only
                  style={{ width: SCREEN_WIDTH * 0.44, height: SCREEN_HEIGHT * 0.2 }}
                  resizeMode='contain'
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    paddingVertical: 6,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>{temple.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  }


  function ThreeDArt() {


    return (
      <View style={{}}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>
            {t("Divine Pilgrimage Site Darshan")}
            <Image
              source={require('../../assets/icons/teerth.png')}
              resizeMethod="contain"
              style={{ height: SCREEN_WIDTH * 0.06, width: SCREEN_WIDTH * 0.06, resizeMode: 'cover' }}
            />
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            top: 10,
            overflow: 'hidden',
            height: SCREEN_HEIGHT * 0.22,
            width: SCREEN_WIDTH * 0.94,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('Dham')}
        >
          {/* Add pointerEvents="none" to prevent video from capturing touches */}
          <LottieView
            source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/DivinePilgrim.json` }}
            autoPlay
            loop
            speed={1}
            hardwareAccelerationAndroid={true} // Android only
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
            resizeMode='contain'
          />

        </TouchableOpacity>
      </View>
    );
  }

  function Recharge() {
    return (
      <View style={{}}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>
            {t("Recharge With Divya Rashi")}
            <Image
              source={require('../../assets/icons/teerth.png')}
              resizeMethod="contain"
              style={{ height: SCREEN_WIDTH * 0.06, width: SCREEN_WIDTH * 0.06, resizeMode: 'cover' }}
            />
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            top: 10,
            overflow: 'hidden',
            height: SCREEN_HEIGHT * 0.22,
            width: SCREEN_WIDTH * 0.94,
            borderRadius: 10
          }}
          onPress={() => navigation.navigate('Allservices')}
        >
          {/* Add pointerEvents="none" to prevent video from capturing touches */}
          <LottieView
            source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/recharge.json` }}
            autoPlay
            loop
            speed={1}
            hardwareAccelerationAndroid={true} // Android only
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
            resizeMode='contain'
          />

        </TouchableOpacity>
      </View>
    );
  }

  function Foundation() {

    const RenderItem = React.memo(({ item }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ flex: 1, top: 10 }}
      >
        <Image
          source={{ uri: item.image }}
          resizeMode="stretch"
          style={{
            width: SCREEN_WIDTH * 0.95,
            height: SCREEN_HEIGHT / 4,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    ));

    return (
      <View style={{}}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>{t("Sacred Contributors for the Temple Foundation")}
            <Image
              source={require('../../assets/icons/foundation.png')}
              resizeMethod="contain"
              style={{ height: SCREEN_WIDTH * 0.06, width: SCREEN_WIDTH * 0.06, resizeMode: 'cover' }}
            />
          </Text>

        </View>
        <Carousel
          loop
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT / 4}
          autoPlay={true}
          data={templeFoundation}
          scrollAnimationDuration={600}
          autoPlayInterval={4000}
          renderItem={({ item }) => <RenderItem item={item} />}
          panGestureHandlerProps={{
            activeOffsetY: [-500, 500], // disables vertical swipe
          }}
        />
      </View>
    );
  }

  function BANNER2() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          {/* <Text style={{ color: colors.background_theme2, fontSize: 18, fontWeight: "900" }}>|</Text> */}
          <Text style={styles.Heading}>{t("Complete Horoscope Solution")}</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('kundli')}
          style={{ flex: 1, borderRadius: 10, overflow: 'hidden', objectFit: 'fill', width: SCREEN_WIDTH * 0.94, height: SCREEN_HEIGHT * 0.22 }}>
          <LottieView
            source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/completehoroscopesolution.json` }}
            autoPlay
            loop
            speed={1}
            hardwareAccelerationAndroid={true} // Android only
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
    );
  }

  function banner3() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>{t("Horoscope Matching")}</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04, objectFit: 'fill' }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('matching')}
          style={{
            flex: 1,
            borderRadius: 10,
            borderRadius: 10,
            overflow: 'hidden',
            width: SCREEN_WIDTH * 0.95,
            height: SCREEN_HEIGHT * 0.22
          }}>
          <LottieView
            source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/horoscopematching.json` }}
            autoPlay
            loop
            speed={1}
            hardwareAccelerationAndroid={true} // Android only
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
            resizeMode='contain'
          />

        </TouchableOpacity>
      </View>
    );
  }

  function letterToGod() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          {/* <Text style={{ color: colors.background_theme2, fontSize: 18, fontWeight: "900" }}>|</Text> */}
          <Text style={styles.Heading}>{t("Letter To God")}</Text>
          <Image
            source={require('../../assets/images/flower2.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Welcome')}
          style={{ flex: 1, borderRadius: 10, overflow: 'hidden', objectFit: 'fill', width: SCREEN_WIDTH * 0.94, height: SCREEN_HEIGHT * 0.22 }}>
          <LottieView
            source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/lettertogod.json` }}
            autoPlay
            loop
            speed={1}
            hardwareAccelerationAndroid={true} // Android only
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
            resizeMode='contain'
          />

        </TouchableOpacity>
      </View>
    );
  }

  function YourHoroscope() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          {/* <Text style={{ color: colors.background_theme2, fontSize: 18, fontWeight: "900" }}>|</Text> */}
          <Text style={styles.Heading}>{t("Your Horoscope")}</Text>
          <Image
            source={require('../../assets/images/flower2.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectSignnew')}
          style={{ flex: 1, borderRadius: 10, overflow: 'hidden', objectFit: 'fill', width: SCREEN_WIDTH * 0.94, height: SCREEN_HEIGHT * 0.22 }}>
          <LottieView
            source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/Horoscope.json` }}
            autoPlay
            loop
            speed={1}
            hardwareAccelerationAndroid={true} // Android only
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
            resizeMode='contain'
          />

        </TouchableOpacity>
      </View>
    );
  }
  function banner5() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>{t("Religion Collection")}</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('PujaSection')}
          style={{ alignItems: 'center', borderRadius: 10, overflow: 'hidden', objectFit: 'fill' }}>
          <LottieView
            source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/Religiouscollection.json` }}
            autoPlay
            loop
            speed={1}
            hardwareAccelerationAndroid={true} // Android only
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
    );
  }

  function banner6() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>{t("AstroOne Special Devotee Rosary")}</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04, objectFit: 'fill' }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowTotalPradhan')}
          style={{ alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <LottieView
              source={{ uri: `https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/devoteerosary.json` }}
              autoPlay
              loop
              speed={1}
              hardwareAccelerationAndroid={true} // Android only
              style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.25 }}
              resizeMode='contain'
            />

          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function getYouTubeVideoId(url) {
    if (url.includes("youtube.com/watch?v=")) {
      return url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url.split("embed/")[1].split("?")[0];
    }
    return null;
  }



  function visittemple({ liveTempleData }) {

    const renderItem = ({ item }) => {

      const fromTime = moment.utc(item?.fromTimeOfArti).format("HH:mm");
      const toTime = moment.utc(item?.toTimeOfArti).format("HH:mm");

      const fromMinutes = moment.duration(fromTime).asMinutes();
      const toMinutes = moment.duration(toTime).asMinutes();
      const currentMinutes = moment.duration(
        moment().utc().add(5, 'hours').add(30, 'minutes').format("HH:mm")
      ).asMinutes();

      console.log(fromMinutes, toMinutes, currentMinutes);

      const isInRange = currentMinutes >= fromMinutes && currentMinutes <= toMinutes;

      let embedUrl = '';
      let videoId;
      if (item?.VideoLink?.includes('soundcloud.com')) {
        // Encode the track URL for SoundCloud
        const trackUrl = encodeURIComponent(item?.VideoLink);
        embedUrl = `https://w.soundcloud.com/player/?url=${trackUrl}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true&sharing=false&show_teaser=false&buying=false&show_artwork=false`;
      } else {
        videoId = getYouTubeVideoId(item?.VideoLink);
      }


      return <View
        style={{
          borderWidth: 0.5,
          borderRadius: 6,
          backgroundColor: 'white',
          borderColor: 'gray',
          position: 'relative'
        }}>

        <View
          style={{
            height: SCREEN_HEIGHT * 0.20,
            width: SCREEN_WIDTH * 0.85,
            overflow: 'hidden',
            borderRadius: 6,
            position: 'relative'
          }}>

          <View style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
            <FastImage
              style={{
                width: SCREEN_WIDTH * 0.22,
                height: SCREEN_WIDTH * 0.07,
              }}
              source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/live_gif.gif' }}
            />
          </View>
          {/* <WebView
            source={{ uri: item?.VideoLink }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
          /> */}
          {!isInRange ? (
            // <Image
            //   source={{ uri: base_url + item?.image }}
            //   style={{ width: SCREEN_WIDTH * 0.85, height: SCREEN_HEIGHT * 0.20, objectFit: 'fill' }}

            // />
            <SvgOrImage uri={item?.image}
              style={{ width: SCREEN_WIDTH * 0.85, height: SCREEN_HEIGHT * 0.20, objectFit: 'fill' }} />
          ) : (
            // <WebView
            //   source={{ uri: item?.VideoLink }}
            //   style={styles.webview}
            //   javaScriptEnabled={true}
            //   domStorageEnabled={true}
            //   allowsInlineMediaPlayback={true}
            //   mediaPlaybackRequiresUserAction={false}
            //   onError={() => console.log('WebView error')}
            //   onHttpError={({ nativeEvent }) => {
            //     console.error('HTTP error: ', nativeEvent.statusCode);
            //     // setVideoUnavailable(true);
            //   }}
            // />
            <YoutubePlayer
              ref={playerRef}
              height={250}
              play={true} // autoplay
              videoId={videoId} // just the videoId, not the whole URL
              onChangeState={onStateChange}
            />
          )}

        </View>

        <View style={{ padding: 10, alignSelf: 'center' }}>

          <Text
            style={{
              ...FontsStyle.font,
              textAlign: 'center',
            }}>
            {item?.TempleName}
          </Text>



          {/* <Text>{isFuture ? "True" : 'False'}</Text>
          <Text>{moment().format('DD.MM.YYYY hh:mm A')}</Text> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, alignSelf: 'center', justifyContent: 'space-between' }}>
            <Text style={{ ...Fonts.PoppinsRegular }}>
              Start: {moment.utc(item?.fromTimeOfArti).format('hh:mm A')}
            </Text>
            <Text style={{ ...Fonts.PoppinsRegular }}>
              End: {moment.utc(item?.toTimeOfArti).format('hh:mm A')}
            </Text>

          </View>


        </View>
        {/* 
        {isFuture && isStartTimeInFuture && (
          <View style={{ position: 'absolute', zIndex: 100, top: 0, right: 0, bottom: 100, left: 0, backgroundColor: 'Transparent', borderRadius: 6 }}></View>
        )} */}
      </View>
    };

    return (
      liveTempleData && liveTempleData.length > 0 &&
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>{t("Virtue of visiting famous temples")}</Text>
          <Image
            source={require('../../assets/images/SanatanFlag.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08 }}
          />
        </View>

        <FlatList
          horizontal
          data={liveTempleData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 10,
          }}
        />
      </View>
    );
  }


  function analysis() {
    const data = [
      {
        id: '1',
        label: t('Lalkitab'),
        image: require('../../assets/images/horoscope2.png'),
      },
      {
        id: '2',
        label: t('Prashna'),
        image: require('../../assets/images/horoscope3.png'),
      },
      {
        id: '3',
        label: t('Vastu'),
        image: require('../../assets/images/horoscope2.png'),
      },
    ];
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: SCREEN_WIDTH * 0.4,
          paddingHorizontal: SCREEN_WIDTH * 0.02,
          gap: 5,
          paddingVertical: SCREEN_HEIGHT * 0.006,
          borderRadius: 100,
          backgroundColor: colors.background_theme2,
        }}
        onPress={() => navigation.navigate('AstroForCall', { data: item?.label })}
      >
        <View
          style={{
            height: SCREEN_HEIGHT * 0.054,
            width: SCREEN_WIDTH * 0.111,
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
            source={item.image}
          />

        </View>
        <Text style={{ ...FontsStyle.font, color: colors.white_color }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>





        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.Heading}>{t("Contact for astrological analysis & solution")}
              <Image
                source={require('../../assets/images/flower.png')}
                resizeMethod="contain"
                style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
              />
            </Text>

          </View>
        </View>

        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            flexDirection: 'row',
            paddingVertical: SCREEN_HEIGHT * 0.025,
            gap: 3,
          }}
        />
      </View>
    );
  }






  function ALMANAC() {
    return (
      <View style={styles.containerGap}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.Heading}>{t("Today's Almanac")}</Text>
            <Image
              source={require('../../assets/images/flower.png')}
              resizeMethod="contain"
              style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04, objectFit: 'fill' }}
            />
          </View>

          <View>
            <Entypo name="calendar" color={'black'} size={20} />
          </View>
        </View>

        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 25,
            paddingHorizontal: SCREEN_WIDTH * 0.025,
            paddingVertical: SCREEN_HEIGHT * 0.02,
            borderRadius: 10,
            backgroundColor: colors.background_theme2,
          }}
          onPress={() => navigation.navigate('NewPanchang')}
          >
          <View
            style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3 }}>
            <Image
              resizeMode="contain"
              style={{ height: '100%', width: '100%' }}
              source={require('../../assets/images/rishi.png')}
            />
          </View>

          <View>
            <Text style={styles.AlmanacCommonText}>thithi</Text>
            <Text style={styles.AlmanacCommonText}>din</Text>
            <Text style={styles.AlmanacCommonText}>Special Diwali</Text>
            <Text style={styles.AlmanacCommonText}>Constellation</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('NewPanchang')}
          style={{ alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>
          <Image
            style={{
              height: SCREEN_HEIGHT * 0.2,
              width: SCREEN_WIDTH * 0.98,
              elevation: 1,
              resizeMode: 'cover',
            }}
            source={require('../../assets/images/almanacImage.jpeg')}
          />
        </TouchableOpacity>
      </View>
    );
  }





  function HAPPY() {

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingVertical: SCREEN_HEIGHT * 0.035,
            paddingBottom: SCREEN_HEIGHT * 0.04,
            backgroundColor: '#FFE4CE',
            borderRadius: 10,
            borderColor: '#FFE4CE',
            borderWidth: 0.5,
            marginHorizontal: 4,
            gap: Sizes.fixPadding,
            paddingLeft: 10,
            paddingRight: 10
          }}>

          <View>

            <View
              style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderWidth: 1, borderRadius: 100 }}>

              <SvgOrImage
                uri={item.image}
                style={{ height: '100%', width: '100%', borderRadius: 100, objectFit: 'fill', overflow: 'hidden' }}
              />
            </View>

            <View style={{ flexDirection: 'row', left: 10 }}>
              {[...Array(5)].map((_, index) => {
                return (
                  <Ionicons
                    key={index}
                    name={index < item.rating ? 'star' : 'star-outline'}
                    size={10}
                    color={colors.background_theme2}
                  />
                );
              })}
            </View>

          </View>

          <View style={{ width: SCREEN_WIDTH * 0.65 }}>
            <Text style={{ ...FontsStyle.font, fontWeight: 'bold' }}>
              <TranslateText title={item?.name} /></Text>
            <RenderHTML
              contentWidth={SCREEN_WIDTH}
              source={{
                html: `<div style="color: black;  text-align:justify;font-size:12px">${t('lang') === 'en' ? item?.description : item?.description_hi}</div>`,
              }}
            />
          </View>






        </TouchableOpacity>
      );
    };





    return (
      <View style={styles.containerGap}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.Heading}>{t("AstroOne's Happy Family")}</Text>
            <Image
              source={require('../../assets/images/SanatanFlag.png')}
              resizeMethod="contain"
              style={{ height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08 }}
            />

          </View>
          <TouchableOpacity style={{
            borderRadius: Sizes.fixPadding * 10,
            borderWidth: 1,
            padding: Sizes.fixPadding
          }}
            onPress={() => navigation.navigate('CustomerTestimonials')}>
            <Text style={{ fontSize: 12, color: 'black' }}>{t("See all")}</Text>
          </TouchableOpacity>
        </View>


        <Carousel
          loop
          width={SCREEN_WIDTH * 0.94}
          height={SCREEN_HEIGHT * 0.2}
          autoPlay={true}
          data={testmonialData}
          scrollAnimationDuration={1500}
          autoPlayInterval={5000}
          renderItem={renderItem}
          panGestureHandlerProps={{
            activeOffsetY: [-500, 500], // disables vertical swipe
          }}
        />
      </View>
    );
  }




  function SHOPPING() {

    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>{t("Online shop of astrology material")}</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>

        <FlatList
          horizontal
          data={ecommerceCategoryData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: SCREEN_WIDTH * 0.4,
                borderRadius: 10,
                backgroundColor: 'white',
                marginRight: 10,
              }}
              onPress={() => {
                navigation.navigate('AllPujaByCategory', {
                  id: item?._id,
                  name: item?.categoryName?.split('_')?.join(' '),
                  description: item?.description,
                  description_hi: item?.description_hi
                });
              }}
            >
              <View
                style={{
                  height: SCREEN_HEIGHT * 0.2,
                  width: SCREEN_WIDTH * 0.4,
                  overflow: 'hidden',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>

                <SvgOrImage
                  uri={item.image}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    objectFit: 'fill',
                  }}
                />
              </View>

              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: SCREEN_HEIGHT * 0.01,
                }}>
                <Text style={{ ...Fonts.PoppinsRegular }}>
                  {t(`${item.categoryName?.split('_')?.join(' ')}`)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }




  function liveListInfo() {
    const live = (live_ud, astroId, data) => {
      if (customerData.username != null) {
        navigation.navigate('goLive', {
          liveID: live_ud,
          astro_id: astroId,
          userID: customerData.id,
          userName: customerData.username,
          astroData: data,
        });
      } else {
        Alert.alert('Message', 'Please Update Customer Account.');
      }
    };

    const renderItems = ({ item, index }) => {
      return item.current_status1 === 'Live' ? (
        <TouchableOpacity
          activeOpacity={0.9} // Set the active opacity level here
          onPress={() => live(item.live_id, item.user_id, item)}
          key={index}
          style={{
            flex: 0,
            width: width * 0.355,
            borderRadius: 5,
            marginVertical: 10,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 2, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            zIndex: 100,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderColor: '#ddd',
              backgroundColor: colors.background_theme2,
            }}>
            <View
              style={{
                height: 150,
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: item.img_url }}
                style={{
                  width: width * 0.25,
                  height: width * 0.25,
                  borderRadius: 100,
                  borderWidth: 0.5,
                  borderColor: colors.white_color,
                  marginTop: 10,
                }}
              />
              <View style={{}}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.2),
                    color: colors.black_color9,
                    fontFamily: fonts.semi_bold,
                    paddingRight: 10,
                    textAlign: 'center',
                  }}>
                  {item.owner_name}
                </Text>
                <View
                  style={{
                    flex: 0.9,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/live_gif.gif')}
                    style={{ width: 102, height: 25 }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null;
    };
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              marginHorizontal: 10,
              fontSize: getFontSize(1.8),
            }}>
            {t('astrologer_live')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('astrolive', { data: 'home' })}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={livelist}
          renderItem={renderItems}
          keyExtractor={item => item.id}
          numColumns={1}
          ListEmptyComponent={_listEmptyComponent}
          showsVerticalScrollIndicator={false}
          horizontal
          centerContent={true}
        />
      </View>
    );
  }



  function ASTROONENOTE() {
    return (
      <View style={{ marginTop: SCREEN_WIDTH * 0.04 }}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>{t('Auspicious and Inauspicious time')}</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
      </View>
    );
  }






  function bannerInfo() {
    // function bannerInfo() {
    //   const renderItem = ({ index, item }) => {

    const renderItem = ({ index, item }) => {

      const handlePress = () => {
        console.log(item);
        // const url = item?.redirectionUrl; // Replace with your desired URL
        // const urlPattern = new RegExp(
        //   '^(https?:\\/\\/)?' + // protocol
        //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        //   '(\\#[-a-z\\d_]*)?$',
        //   'i', // fragment locator
        // );
        // if (url && urlPattern.test(url)) {
        //   Linking.openURL(url).catch(err => {
        //     // console.error("Failed to open URL", err);
        //     // Alert.alert("Error", "Failed to open URL.");
        //   });
        // } else {
        //   Alert.alert('Invalid URL', 'The provided URL is not valid.');
        // }
        if (item?.priorityPage == 1) {
          navigate('NewPanchang')
        } else if (item?.priorityPage == 2) {
          navigate('Allservices')
        } else if (item?.priorityPage == 3) {
          navigate('charDhamYatraVr')
        }
      };

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            top: 10,
            overflow: 'hidden',

          }}
          onPress={() => handlePress()}
        >
          {/* <SvgViewer uri={img_url + item?.bannerImage} style={{ width: width * 0.95, height: width / 2.5, borderRadius: 10 }} /> */}
          {/* <SvgOrImage uri={img_url + item?.bannerImage} style={{ width: width * 0.95, height: width / 2.5, borderRadius: 10,overflow:'hidden' }} /> */}
          <Image
            source={{ uri: item?.bannerImage }}
            style={{
              width: RESPONSIVE_WIDTH(94),
              height: RESPONSIVE_HEIGHT(20),
              borderRadius: 10,
              resizeMode: 'stretch'
            }}
          />
        </TouchableOpacity>
      );
    };

    return (
      <View style={{}}>
        <Carousel
          loop
          width={RESPONSIVE_WIDTH(95)}
          height={RESPONSIVE_HEIGHT(22)}
          autoPlay={true}
          data={bannerData.filter(item => item?.redirectTo == 'customer_home')}
          scrollAnimationDuration={1500}
          autoPlayInterval={5000}
          renderItem={renderItem}
        />

      </View>
    );
  }




  function CARD1() {
    return (
      //  backgroundColor: "",
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizes.fixPadding,
            borderRadius: 10,
            backgroundColor: 'white',
            borderColor: 'gray',
            elevation: 1,
          }}>
          <View style={{ gap: 10 }}>
            <View style={styles.AuspiciousContainer}>
              <Text style={[styles.AuspiciousCommanText, { color: '#10EC86' }]}>
                {t("Abhijeet Muhurata")}
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {NewPanchang?.panchang?.abhijitkal}
              </Text>
            </View>
            <View
              style={[
                styles.AuspiciousContainer,
                { backgroundColor: '#FCCDC7' },
              ]}>
              <Text style={[styles.AuspiciousCommanText, { color: '#EB1C0A' }]}>
                {t("Rahukaal")}
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {NewPanchang?.panchang?.rahukal}
              </Text>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <View
              style={[
                styles.AuspiciousContainer,
                { backgroundColor: '#685F02' },
              ]}>
              <Text style={[styles.AuspiciousCommanText, { color: '#DACD29' }]}>
                {t("Gulik period")}
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {NewPanchang?.panchang?.gulika}
              </Text>
            </View>
            <View
              style={[
                styles.AuspiciousContainer,
                { backgroundColor: '#6D88D5' },
              ]}>
              <Text style={[styles.AuspiciousCommanText, { color: '#0849F1' }]}>
                {t("Yamghantak")}
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {NewPanchang?.panchang?.yamganda}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewPanchang')}
          style={{ alignItems: 'center', bottom: RESPONSIVE_HEIGHT(12) }}>
          <Image
            style={{ height: RESPONSIVE_HEIGHT(5), width: RESPONSIVE_WIDTH(25) }}
            source={t('lang') == 'en' ? require('../../assets/images/panchang.png') : require('../../assets/images/panchang_hi.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  bannerData: state.home.bannerData,
  teerthDham: state.home.teerthDham,
  homeSimmer: state.home.homeSimmer,
  templeFoundation: state.home.templeFoundation,
  isRefreshing: state.setting.isRefreshing,
  astroBlogData: state.blogs.astroBlogData,
  liveTempleData: state.home.liveTempleData,
  testmonialData: state.blogs.testmonialData,
  ecommerceCategoryData: state.ecommerce.ecommerceCategoryData,
  NewPanchang: state.kundli.NewPanchang,
  templeVideos: state.home.templeVideos,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  panchangContainer: {
    width: width * 0.18,
    height: width * 0.18,
    backgroundColor: '#48cae4',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: colors.black_color6,
  },

  punchangText: {
    fontSize: getFontSize(1.2),
    fontWeight: '400',
    fontFamily: fonts.medium,
    marginTop: 4,
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  box: {
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    flex: 1,
  },
  box2: {
    alignSelf: 'center',
  },
  boxtext: {
    textAlign: 'center',
    fontSize: getFontSize(1.5),
    fontWeight: 'bold',
    paddingTop: 5,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 1, // Add a border to the bottom of each row
    borderColor: '#dee2e6',
    marginTop: 10,
    marginBottom: 10,
  },
  row1: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  info: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    margin: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  panchangImage: {
    width: width * 0.13,
    height: width * 0.13,
    resizeMode: 'contain',
    borderRadius: 1000,
  },
  Heading: {
    ...FontsStyle.font,
    fontSize: normalize(13.5),
  },
  HeadingContainer: {
    paddingLeft: Sizes.fixPadding,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: colors.background_theme2,
  },
  AuspiciousContainer: {
    width: RESPONSIVE_WIDTH(43),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: Sizes.fixPadding,
    backgroundColor: '#40956E',
    elevation: 1,
  },
  AuspiciousCommanText: {
    ...FontsStyle.font,
    color: Colors.white,
    fontSize: normalize(11)
  },
  containerGap: {
    gap: 10,
  },
  AlmanacCommonText: {
    ...FontsStyle.font,
    color: Colors.white,
  },
  checkBoxText: {
    fontSize: 11,
    color: 'gray',
    fontWeight: '500',
    textDecorationLine: 'none',
  },
  modaltext: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.white,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

});
