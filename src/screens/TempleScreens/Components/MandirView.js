import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { colors, new_img_url } from '../../../config/Constants1';
import * as SanatanActions from '../../../redux/actions/sanatanActions';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import Video, { VideoRef } from 'react-native-video';
import MandirTemple from './MandirTemple';
import Bell from './Bell';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgOrImage from '../../../components/SvgOrImage';
import { useCallDetection } from '../../../utils/callDetection';
import Carousel from "react-native-reanimated-carousel";
import MandirBackground from './MandirBackground';
import DownloadManager from '../../../utils/DownloadManager';
import { useSantanLocal } from '../../../utils/DownloadFile/downloadHome';

const ITEM_WIDTH = SCREEN_WIDTH * 0.3;

const MandirView = ({
  getbaghwandata,
  dispatch,
  visibleIndex,
  currentIndex,
  flowerVisible,
}) => {
  console.log('flowerVisible', visibleIndex);
  const [Loading, setLoading] = useState(false);
  const [swipeSound, setSwipeSound] = useState(null); // State to hold the sound object
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [isMuted, setIsMuted] = useState(false);
  const flatListRef = useRef(null);
  const scrollViewRef = useRef(null);
  const videoRef = useRef(null);



  // Load the sound when the component mounts
  useEffect(() => {
    const sound = new Sound('ticktick.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setSwipeSound(sound);
    });

    // Cleanup the sound when the component unmounts
    return () => {
      if (sound) {
        sound.release(); // Release the sound resource
      }
    };
  }, []);

  useEffect(() => {
    let scroller = setInterval(() => {
      if (scrollViewRef.current && getbaghwandata.length > 0) {
        currentIndex.current += 1;
        if (currentIndex.current >= getbaghwandata.length) {
          currentIndex.current = 0; // लूप में लाने के लिए
        }

        // सेंटर में लाने के लिए ऑफसेट सेट करें
        const offset = currentIndex.current * ITEM_WIDTH - (SCREEN_WIDTH / 2 - ITEM_WIDTH / 2);
        scrollViewRef.current.scrollTo({ x: offset, animated: true });
      }
    }, 2000); // 2 सेकंड में एक बार स्क्रॉल करें

    return () => clearInterval(scroller);
  }, [getbaghwandata]);

  useEffect(() => {
    if (flatListRef.current && visibleIndex !== null) {
      flatListRef.current.scrollToIndex({
        index: visibleIndex,
        animated: true,
        viewPosition: 0, // **सेंटर में लाने के लिए**
      });
    }
  }, [visibleIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  const onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY } = event.nativeEvent;
      console.log("TranslationX:", translationX, "TranslationY:", translationY, visibleIndex);


      // Horizontal swipes (left/right)
      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (
          translationX > 0 &&
          visibleIndex < getbaghwandata?.length
        ) {
          // Swipe left
          console.log('left ::', visibleIndex);

          if (visibleIndex < 0) {
            translateX.value = withTiming(0, { duration: 500 });
            dispatch(SanatanActions.setSantanVisibleIndex(visibleIndex - 1));
            console.log(visibleIndex - 1, ' ::: visibleIndex');

            dispatch(
              SanatanActions.getSantanAudioSelect(
                getbaghwandata[visibleIndex - 1]?.bulkAudioUpload,
              ),
            );
            dispatch(SanatanActions.getSatnaSongCurrentState());
            dispatch(SanatanActions.setSantanCurrentIndex(0));

            // Play sound on swipe left
            if (swipeSound) {
              swipeSound.play(success => {
                if (!success) {
                  console.log('Sound playback failed');
                }
              });
            }
          } else {
            console.log('left else :: ', getbaghwandata?.length);
            translateX.value = withTiming(0, { duration: 500 });
            if (visibleIndex > 0) {
              dispatch(SanatanActions.setSantanVisibleIndex(visibleIndex - 1));
              console.log(visibleIndex, ' ::: visibleIndex');

              dispatch(
                SanatanActions.getSantanAudioSelect(
                  getbaghwandata[getbaghwandata?.length - 1]?.bulkAudioUpload,
                ),
              );
            } else {
              dispatch(SanatanActions.setSantanVisibleIndex(getbaghwandata?.length - 1));
              console.log(visibleIndex, ' ::: visibleIndex');

              dispatch(
                SanatanActions.getSantanAudioSelect(
                  getbaghwandata[getbaghwandata?.length - 1]?.bulkAudioUpload,
                ),
              );
            }

            dispatch(SanatanActions.getSatnaSongCurrentState());
            dispatch(SanatanActions.setSantanCurrentIndex(0));

            // Play sound on swipe left
            if (swipeSound) {
              swipeSound.play(success => {
                if (!success) {
                  console.log('Sound playback failed');
                }
              });
            }
          }


        } else if (
          translationX < 0
        ) {
          console.log('right');

          translateX.value = withTiming(0, { duration: 500 });
          // Swipe right
          if (visibleIndex < getbaghwandata?.length - 1) {
            dispatch(SanatanActions.setSantanVisibleIndex(visibleIndex + 1));
            dispatch(
              SanatanActions.getSantanAudioSelect(
                getbaghwandata[visibleIndex + 1]?.bulkAudioUpload,
              ),
            );
            dispatch(SanatanActions.getSatnaSongCurrentState());
            dispatch(SanatanActions.setSantanCurrentIndex(0));
          } else {
            dispatch(SanatanActions.setSantanVisibleIndex(0));
            dispatch(
              SanatanActions.getSantanAudioSelect(
                getbaghwandata[0]?.bulkAudioUpload,
              ),
            );
            dispatch(SanatanActions.getSatnaSongCurrentState());
            dispatch(SanatanActions.setSantanCurrentIndex(0));
          }


          // Play sound on swipe right
          if (swipeSound) {
            swipeSound.play(success => {
              if (!success) {
                console.log('Sound playback failed');
              }
            });
          }
        }
      }
      // Vertical swipes (up/down)
      else {
        if (
          translationY < -50 &&
          currentIndex <
          getbaghwandata[visibleIndex]?.bulkImageUpload.length - 1
        ) {
          // Swipe up

          translateY.value = withTiming(0, { duration: 500 });
          dispatch(SanatanActions.setSantanCurrentIndex(currentIndex + 1));
        } else if (translationY > 50 && currentIndex > 0) {
          // Swipe down

          translateY.value = withTiming(0, { duration: 500 });
          dispatch(SanatanActions.setSantanCurrentIndex(currentIndex - 1));
        }
      }
    }
  };

  const toggleMute = () => {
    console.log('Toggle Mute');
    setIsMuted(!isMuted);

  };



  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    console.log("Currently visible:", viewableItems.map(v => v.index));
  }).current;




  return (
    <View style={{ position: 'absolute', zIndex: 1, }}>
      <View style={{
        zIndex: 2,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
      }}
        pointerEvents="none">
        <MandirTemple />
      </View>
      {!flowerVisible && <Bell />}
      {getbaghwandata && (
        <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
          <View style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',

          }}>
            {(() => {
              // const item = getbaghwandata[visibleIndex]?.bulkImageUpload[currentIndex];
              const item = getbaghwandata[visibleIndex]?.bulkImageUpload[currentIndex];

              if (!item) return null;
              const data = getbaghwandata[visibleIndex]?.bulkImageUpload;
              if (!data) return null;
              const isVideo = item?.includes('.mp4');
              const { localUri } = useSantanLocal(item);
              console.log('local URI ', localUri)
              return (
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => console.log('Tested')}
                    activeOpacity={0.95}
                    style={{
                      width: '100%',
                      height: '100%',
                      alignSelf: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {!isVideo ? (


                      <ImageBackground
                        source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/mandirbackground.jpg' }}
                        style={{ width: RESPONSIVE_WIDTH(100), height: RESPONSIVE_HEIGHT(50), marginTop: SCREEN_HEIGHT * 0.35 }}
                      >
                        <Image
                          source={{ uri: localUri }}
                         style={{ width: RESPONSIVE_WIDTH(100), height: RESPONSIVE_HEIGHT(50), objectFit: 'fill' }}
                        />
                      </ImageBackground>
                    ) : (
                      <View style={{
                        width: RESPONSIVE_WIDTH(100),
                        height: RESPONSIVE_HEIGHT(50),
                        marginTop: RESPONSIVE_HEIGHT(38),
                      }}>
                        {Loading && (
                          <View style={{
                            position: 'absolute',
                            zIndex: 10,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                          }}>
                            <Image
                              source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/mandirbackground.jpg' }}
                              style={{
                                width: SCREEN_WIDTH,
                                height: RESPONSIVE_HEIGHT(50),
                                position: 'absolute'
                              }}
                            />
                            <Image
                              source={require('../../../assets/images/om.gif')}
                              style={{
                                width: SCREEN_WIDTH * 0.35,
                                height: SCREEN_HEIGHT * 0.15
                              }}
                            />
                          </View>
                        )}

                        <Video
                          source={{ uri: localUri }}
                          ref={videoRef}
                          muted={isMuted}
                          onBuffer={({ isBuffering }) => setLoading(isBuffering)}
                          onLoad={() => setLoading(false)}
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                          paused={false}
                          repeat={true}
                          resizeMode='stretch'
                          playInBackground={true}      // background play works
                          playWhenInactive={true}  
                          controlsStyles={{
                            hideFullscreen: true
                          }}
                          poster=
                          {{
                            source: { uri: "https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/mandirbackground.jpg" },
                            resizeMode: "cover",
                          }}
                        />
                        <TouchableOpacity onPress={toggleMute} style={{ position: 'absolute', right: 20, backgroundColor: 'orange', bottom: RESPONSIVE_HEIGHT(5), padding: 10, borderRadius: 20, zIndex: 10 }}
                        >
                          <Text style={{ color: 'white' }}>{isMuted ? <Ionicons name="volume-mute" size={20} color="white" /> : <Ionicons name="volume-medium" size={20} color="white" />}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>

                </View>
              );
            })()}
          </View>
        </PanGestureHandler>
      )}

    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
  visibleIndex: state.sanatan.visibleIndex,
  currentIndex: state.sanatan.currentIndex,
  getbaghwandata: state.home.getbaghwandata,
  flowerVisible: state.sanatan.flowerVisible,
  showShowerVisible: state.sanatan.showShowerVisible,
});

export default connect(mapStateToProps, mapDispatchToProps)(MandirView);

const styles = StyleSheet.create({
  centerNewImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.52,
    marginTop: SCREEN_HEIGHT * 0.315,
    backgroundColor: 'red',
    resizeMode: 'stretch'
  },
  centerNewImageOm: {
    flex: 1,
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.35,
    marginTop: SCREEN_HEIGHT * 0.21,
    resizeMode: 'contain',
    // backgroundColor:'white'
  },
  UpperFlatlistImageContainer: {
    height: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.1,
    borderRadius: SCREEN_WIDTH * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    backgroundColor: colors.white_color,

  },
  selectedItem: {
    backgroundColor: 'orange',
    height: SCREEN_WIDTH * 0.12,
    width: SCREEN_WIDTH * 0.12,
    borderRadius: SCREEN_WIDTH * 0.1,
  },
  flatListImage: {
    height: '100%',
    width: '100%',
    borderRadius: SCREEN_WIDTH * 0.06,
    borderWidth: 2,
    borderColor: colors.background_theme2,
  },
  flatList: {
    padding: 5,
    alignItems: 'center',  // **FlatList कंटेनर के अंदर आइटम्स को सेंटर करेगा**
    justifyContent: 'center',
    gap: 10
  },
  backgroundVideo: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.54,
    marginTop: SCREEN_HEIGHT * 0.158,
  },
});
