import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../config/Screen';
import { colors, new_img_url } from '../../../../config/Constants1';
import * as SanatanActions from '../../../../redux/actions/sanatanActions';
import { connect } from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInUp
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  State
} from 'react-native-gesture-handler';
import HeaderImageNavgarh from './HeaderImageNavgarh';
import FastImage from "@d11/react-native-fast-image";;
import Video from 'react-native-video';
import Bell from './Bell';
import Sound from 'react-native-sound';
import SvgOrImage from '../../../../components/SvgOrImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSantanLocal } from '../../../../utils/DownloadFile/downloadHome';
const AnimatedImage = Animated.createAnimatedComponent(Image);

const MandirView = ({
  getbaghwandatanavgrah,
  dispatch,
  visibleNavgarhIndex,
  currentIndex,
  flowerVisible,
}) => {
  console.log('flowerVisible', flowerVisible);
  const [Loading, setLoading] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [swipeSound, setSwipeSound] = useState(null);
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

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

  const toggleMute = () => {
    setIsMuted(!isMuted);

  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY } = event.nativeEvent;

      // Horizontal swipes (left/right)
      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 0 &&
          visibleNavgarhIndex < getbaghwandatanavgrah?.length) {

          if (visibleNavgarhIndex < 0) {
            console.log('left')
            // setLoading(true);
            translateX.value = withTiming(0, { duration: 500 });
            dispatch(SanatanActions.setSantanNavgarhVisibleIndex(visibleNavgarhIndex - 1));
            console.log(visibleNavgarhIndex, ' ::: visibleNavgarhIndex')
            dispatch(SanatanActions.getSantanAudioSelect(getbaghwandatanavgrah[visibleNavgarhIndex]?.bulkAudioUpload));
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
            console.log('left', getbaghwandatanavgrah?.length, visibleNavgarhIndex);
            // setLoading(true);
            translateX.value = withTiming(0, { duration: 500 });

            if (visibleNavgarhIndex > 0) {
              dispatch(SanatanActions.setSantanNavgarhVisibleIndex(visibleNavgarhIndex - 1));
              console.log(visibleNavgarhIndex, ' ::: visibleIndex');

              dispatch(
                SanatanActions.getSantanAudioSelect(
                  getbaghwandatanavgrah[getbaghwandatanavgrah?.length - 1]?.bulkAudioUpload,
                ),
              );
            } else {
              dispatch(SanatanActions.setSantanNavgarhVisibleIndex(getbaghwandatanavgrah?.length - 1));
              console.log(visibleNavgarhIndex, ' ::---x: visibleIndex');

              dispatch(
                SanatanActions.getSantanAudioSelect(
                  getbaghwandatanavgrah[getbaghwandatanavgrah?.length - 1]?.bulkAudioUpload,
                ),
              );
            }

            // dispatch(SanatanActions.setSantanNavgarhVisibleIndex(visibleNavgarhIndex - 1));
            // console.log(visibleNavgarhIndex, ' ::: visibleNavgarhIndex')
            // dispatch(SanatanActions.getSantanAudioSelect(getbaghwandatanavgrah[visibleNavgarhIndex]?.bulkAudioUpload));
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
        } else if (translationX < 0) {
          console.log('right')
          // setLoading(true);
          translateX.value = withTiming(0, { duration: 500 });
          // Swipe right
          // dispatch(SanatanActions.setSantanVisibleIndex(visibleIndex + 1));
          // dispatch(SanatanActions.getSantanAudioSelect(getbaghwandatanavgrah[visibleIndex]?.bulkAudioUpload));
          // dispatch(SanatanActions.getSatnaSongCurrentState());
          // dispatch(SanatanActions.setSantanCurrentIndex(0));

          if (visibleNavgarhIndex < getbaghwandatanavgrah?.length - 1) {
            dispatch(SanatanActions.setSantanNavgarhVisibleIndex(visibleNavgarhIndex + 1));
            dispatch(
              SanatanActions.getSantanAudioSelect(
                getbaghwandatanavgrah[visibleNavgarhIndex + 1]?.bulkAudioUpload,
              ),
            );
            dispatch(SanatanActions.getSatnaSongCurrentState());
            dispatch(SanatanActions.setSantanCurrentIndex(0));
          } else {
            dispatch(SanatanActions.setSantanNavgarhVisibleIndex(0));
            dispatch(
              SanatanActions.getSantanAudioSelect(
                getbaghwandatanavgrah[0]?.bulkAudioUpload,
              ),
            );
            dispatch(SanatanActions.getSatnaSongCurrentState());
            dispatch(SanatanActions.setSantanCurrentIndex(0));
          }

          // Play sound on swipe left
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
        if (translationY < -50 && currentIndex < getbaghwandatanavgrah[visibleNavgarhIndex]?.bulkImageUpload.length - 1) {
          // Swipe up
          setLoading(true);
          translateY.value = withTiming(0, { duration: 500 });
          dispatch(SanatanActions.setSantanCurrentIndex(currentIndex + 1));
        } else if (translationY > 50 && currentIndex > 0) {
          // Swipe down
          setLoading(true);
          translateY.value = withTiming(0, { duration: 500 });
          dispatch(SanatanActions.setSantanCurrentIndex(currentIndex - 1));
        }
      }
    }
  };



  const renderItem = ({ item, index }) => {
    const isSelected = visibleNavgarhIndex === index;

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            dispatch(SanatanActions.getSantanSelectedtop(index));
            dispatch(SanatanActions.setSantanNavgarhVisibleIndex(index));
          }}
          style={[
            styles.UpperFlatlistImageContainer,
            isSelected && styles.selectedItem,
          ]}
        >
          <Image
            resizeMode="cover"
            source={{ uri: new_img_url + item?.image }}
            style={[styles.flatListImage]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleImageLoad = () => {
    console.log('adasfd');
    setLoading(false)

  }

      const { localUri } = useSantanLocal('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/outernavgarhnew.png');

  return (
    <View style={{ position: 'absolute', zIndex: 0 }}>
      <View style={{
        zIndex: 2,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'transparent',
        overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
      }}
        pointerEvents="none">

        <FastImage
          source={{
            uri: localUri,
            priority: FastImage.priority.high,
          }}
          style={{ width: SCREEN_WIDTH * 1, height: SCREEN_HEIGHT * 1 }}
          resizeMode={FastImage.resizeMode.cover}
        />

      </View>

      <View style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%' }}>
        <TouchableOpacity onPress={toggleMute} style={{ position: 'absolute', right: 20, backgroundColor: 'orange', bottom: SCREEN_HEIGHT * 0.15, padding: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>{isMuted ? <Ionicons name="volume-mute" size={20} color="white" /> : <Ionicons name="volume-medium" size={20} color="white" />}</Text>
        </TouchableOpacity>
      </View>

      {!flowerVisible && <Bell />}
      {getbaghwandatanavgrah && (
        <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
          <View style={{ position: 'absolute', zIndex: 1, alignSelf: 'center' }} >
            {(() => {
              const item = getbaghwandatanavgrah[visibleNavgarhIndex]?.bulkImageUpload[currentIndex];
              if (!item) return null;

              const isVideo = item?.includes('.mp4');

                const { localUri } = useSantanLocal(item);

                console.log('local uri ', localUri)

              return (
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    activeOpacity={0.95}
                    style={{ alignSelf: 'center' }}
                  >
                    {!isVideo ? (
                      <SvgOrImage uri={localUri} style={styles.centerNewImage} />
                    ) : (
                      <View style={{ overflow: 'hidden', width: RESPONSIVE_WIDTH(85), height: RESPONSIVE_HEIGHT(45), marginTop: RESPONSIVE_WIDTH(55) }}>
                        {Loading && (
                          <View style={{ width: SCREEN_WIDTH * 1, height: SCREEN_HEIGHT * 1, alignSelf: 'center' }}>
                            <Image
                              source={require('../../../../assets/images/om.gif')}
                              style={{ width: SCREEN_WIDTH * 0.35, height: SCREEN_HEIGHT * 0.15, alignSelf: 'center', top: SCREEN_HEIGHT * 0.13 }}
                            />
                          </View>
                        )}
                        <Video
                          source={{ uri: localUri }}
                          ref={videoRef}
                          muted={isMuted}  // 🔥 म्यूट करने के लिए
                          onBuffer={({ isBuffering }) => setLoading(isBuffering)}
                          onLoad={() => setLoading(false)}
                          onLoadStart={() => setLoading(true)}
                          onError={(e) => {
                            console.log('Video Error: ', e);
                            setLoading(false);
                          }}
                          style={{ width: '100%', height: '100%' }}
                          paused={false}
                          repeat={true}
                          resizeMode='stretch'
                          playInBackground={true}      // background play works
                          playWhenInactive={true} 
                          controlsStyles={{
                            hideFullscreen: true
                          }}
                        />
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

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mapStateToProps = (state) => ({
  visibleNavgarhIndex: state.sanatan.visibleNavgarhIndex,
  currentIndex: state.sanatan.currentIndex,
  getbaghwandatanavgrah: state.home.getbaghwandatanavgrah,
  flowerVisible: state.sanatan.flowerVisible,
  showShowerVisible: state.sanatan.showShowerVisible,
});

export default connect(mapStateToProps, mapDispatchToProps)(MandirView);

const styles = StyleSheet.create({
  centerNewImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.5,
    marginTop:SCREEN_HEIGHT * 0.25,
    objectFit:'fill'
  },
  centerNewImageOm: {
    flex: 1,
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.35,
    marginTop: SCREEN_HEIGHT * 0.04,
    resizeMode: 'contain',
    // backgroundColor:'white'
  },
  UpperFlatlistImageContainer: {
    height: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.1,
    borderRadius: SCREEN_WIDTH * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    backgroundColor: colors.white_color,
  },
  selectedItem: {
    backgroundColor: 'orange',
    height: SCREEN_WIDTH * 0.13,
    width: SCREEN_WIDTH * 0.13,
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
    padding: 10,
    gap: 10,
  },
  backgroundVideo: {
    flex: 1,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.5,
    overflow: 'hidden',


  },
});
