import React, {useState, useRef, useEffect, useCallback} from 'react';
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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/Screen';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// import Animated, { withRepeat } from 'react-native-reanimated';
import Sound, {setCategory} from 'react-native-sound';
import {colors, img_url, new_img_url} from '../../config/Constants1';
import {color} from '@rneui/base';
import {Fonts, Sizes} from '../../assets/style';
import FastImage from "@d11/react-native-fast-image";;
import axios from 'axios';
import {connect, useSelector} from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import Modal from 'react-native-modal';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import AjkaPradhan from './Components/AjkaPradhan';
import MusciPlayer from './Components/MusciPlayer';

const Sanatan = ({
  sanatangif,
  dispatch,
  getbaghwandata,
  getcategorydata,
  mudradata,
}) => {
  console.log('getbaghwandata>>', getbaghwandata);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [bellSound, setBellSound] = useState(null);
  const [isSwinging, setIsSwinging] = useState(false);
  const rotateValue = useState(new Animated.Value(0))[0];

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Define animated values
  const spinValue = useRef(new Animated.Value(0)).current; // For rotating the thali
  const scaleValue = useRef(new Animated.Value(1)).current; // For scaling the thali

  // Function to start the animation
  const [showNormalThali, setShowNormalThali] = useState(true);
  const [showRotateThali, setShowRotateThali] = useState(false);

  const handlePress = () => {
    setShowNormalThali(false);
    setShowRotateThali(true);
    refRBSheet.current?.close();
    newPlayBellSound();

    spinValue.setValue(0);

    // Start the rotation animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000, // Duration for one full rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    spinAnimation.start();

    // Stop the rotation animation after 10 seconds and reset to starting position
    setTimeout(() => {
      spinAnimation.stop(); // Stop the animation
      spinValue.setValue(0); // Reset to initial position
      setShowNormalThali(true);
      setShowRotateThali(false);
    }, 13000);
  };

  const handleCoconut = () => {
    refRBSheet.current?.close();
    newPlayCoconutSound();
  };

  const newPlayCoconutSound = () => {
    if (coconutSound) {
      coconutSound.play(success => {
        if (success) {
          console.log('Successfully played sound');
        } else {
          console.log('Sound play failed');
        }
      });
    }
    // setShowGifBell(true)
    // setShowImageBell(false)
    // setShowFlower(true)
    // setTimeout(() => {
    //     setShowGifBell(false)
    //     setShowImageBell(true)
    //     setShowFlower(false)
    // }, 13000)
  };

  const handleShankh = () => {
    console.log('kdjhsdjkshdfkj');

    refRBSheet.current?.close();
    newPlayShankhSound();
  };

  const handleRBSheetOpen = categoryTitle => {
    console.log('categoryTitle', categoryTitle);

    const category = getcategorydata.find(cat => cat.title === categoryTitle);
    if (category) {
      setActiveCategoryId(category._id);
      refRBSheet.current.open();
    }
  };

  const newPlayShankhSound = () => {
    if (shankhSound) {
      shankhSound.play(success => {
        if (success) {
          console.log('Successfully played sound');
        } else {
          console.log('Sound play failed');
        }
      });
    }
    // setShowGifBell(true)
    // setShowImageBell(false)
    // setShowFlower(true)
    // setTimeout(() => {
    //     setShowGifBell(false)
    //     setShowImageBell(true)
    //     setShowFlower(false)
    // }, 13000)
  };

  const shankSound = (itemName, payment, itemPrice) => {
    // setMyThali(itemImage)
    const isAdd = payment === 'add';
    const data = {
      userId: customerData?._id,
      gifts: itemName,
      credit: isAdd ? itemPrice : '0',
      debited: isAdd ? '0' : itemPrice,
    };

    console.log('data', data);
    dispatch(HomeActions.getLotaMudra(data));
    setShowLottieMudra(true);
    setLocalBalance(prevBalance =>
      isAdd ? prevBalance + itemPrice : Math.max(prevBalance - itemPrice, 0),
    );

    setTimeout(() => {
      setShowLottieMudra(false);
    }, 2000);
  };

  // Interpolate spin value to rotate image (but keep it upright)
  const spin = spinValue.interpolate({
    inputRange: [0, 2],
    outputRange: ['0deg', '720deg'],
  });

  const spin1 = spinValue.interpolate({
    inputRange: [0, 2],
    outputRange: ['0deg', '-720deg'],
  });

  // Define style for animated image
  const animatedImageStyle = {
    width: 150,
    height: 150,
    objectFit: 'contain',
    transformOrigin: 'center center',
    transform: [{scale: scaleValue}, {rotate: spin1}],
  };

  const animatedViewStyle = {
    transform: [{rotate: spin}, {translateX: -100}, {translateY: -100}],
    width: 190,
    height: 50,
    marginTop: responsiveScreenHeight(-60),
    marginLeft: responsiveScreenWidth(0),

    alignItems: 'center',
  };

  useEffect(() => {
    return () => {
      rotateValue.stopAnimation();
    };
  }, [rotateValue]);
  useEffect(() => {
    const sound = new Sound(
      'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/bell_sound.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
        }
      },
    );
    setBellSound(sound);

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playBellSound = () => {
    if (bellSound) {
      bellSound.play(success => {
        if (success) {
          console.log('Successfully played sound');
        } else {
          console.log('Sound play failed');
        }
      });
    }
  };
  const [newBellSound, setNewBellSound] = useState(null);
  const [shankhSound, setShankhSound] = useState(null);
  const [coconutSound, setCoconutSound] = useState(null);
  const [showGifBell, setShowGifBell] = useState(false);
  const [showImageBell, setShowImageBell] = useState(true);
  const [showFlower, setShowFlower] = useState(false);
  useEffect(() => {
    const sound = new Sound(
      'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/aartisound.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
        }
      },
    );
    setNewBellSound(sound);

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  useEffect(() => {
    const sound = new Sound(
      'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/shankh_sound.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
        }
      },
    );
    setShankhSound(sound);

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  useEffect(() => {
    const sound = new Sound(
      'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/coconut.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
        }
      },
    );
    setCoconutSound(sound);

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const newPlayBellSound = () => {
    if (newBellSound) {
      newBellSound.play(success => {
        if (success) {
          console.log('Successfully played sound');
        } else {
          console.log('Sound play failed');
        }
      });
    }
    setShowGifBell(true);
    setShowImageBell(false);
    setShowFlower(true);
    setTimeout(() => {
      setShowGifBell(false);
      setShowImageBell(true);
      setShowFlower(false);
    }, 13000);
  };

  const translateY = useRef(new Animated.Value(-200)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const navigation = useNavigation();
  const customerData = useSelector(state => state.customer.customerData);
  const [showLottieMudra, setShowLottieMudra] = useState(false);
  const [localBalance, setLocalBalance] = useState(mudradata?.balance || 0);
  const refRBSheet = useRef(null);
  const refRBSheetMusic = useRef(null);
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
    dispatch(HomeActions.getSanatangif());
    dispatch(HomeActions.getBaghwanData());
    dispatch(HomeActions.getPoojaCategory());
  }, [dispatch]);

  const lotaArpan = () => {
    const data = {
      userId: customerData?._id,
      gifts: 'Lota',
      credit: '1',
      debited: '0',
    };
    dispatch(HomeActions.getLotaMudra(data));
    setShowLottieMudra(true);
    setLocalBalance(prevBalance => prevBalance + 1);
    setTimeout(() => {
      setShowLottieMudra(false);
    }, 2000);
  };
  const [activeCategoryId, setActiveCategoryId] = useState(
    getcategorydata && getcategorydata?.length > 0
      ? getcategorydata[0]._id
      : null,
  );
  const [flowerImage, setFlowerImage] = useState();
  const foolArpan = (itemName, payment, itemPrice, itemImage) => {
    setFlowerImage(itemImage);

    const isAdd = payment === 'add';
    const data = {
      userId: customerData?._id,
      gifts: itemName,
      credit: isAdd ? itemPrice : '0',
      debited: isAdd ? '0' : itemPrice,
    };

    console.log('data', data);
    dispatch(HomeActions.getLotaMudra(data));
    setShowLottieMudra(true);
    setLocalBalance(prevBalance =>
      isAdd ? prevBalance + itemPrice : Math.max(prevBalance - itemPrice, 0),
    );
    setShowShower(true);
    setTimeout(() => {
      setShowLottieMudra(false);
    }, 2000);
    setTimeout(() => {
      setShowShower(false);
    }, 2000);
  };
  const thaliArpan = (itemName, payment, itemPrice, itemImage) => {
    setMyThali(itemImage);
    const isAdd = payment === 'add';
    const data = {
      userId: customerData?._id,
      gifts: itemName,
      credit: isAdd ? itemPrice : '0',
      debited: isAdd ? '0' : itemPrice,
    };

    console.log('data', data);
    dispatch(HomeActions.getLotaMudra(data));
    setShowLottieMudra(true);
    setLocalBalance(prevBalance =>
      isAdd ? prevBalance + itemPrice : Math.max(prevBalance - itemPrice, 0),
    );

    setTimeout(() => {
      setShowLottieMudra(false);
    }, 2000);
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState([]);
  const [images, setImages] = useState([]);
  const onGestureEvent = useCallback(
    ({nativeEvent}) => {
      const {translationY, state} = nativeEvent;

      if (state === 4) {
        if (translationY < -30) {
          setVisibleIndex(prevIndex => {
            const newIndex = prevIndex < images?.length - 1 ? prevIndex + 1 : 0;
            return newIndex;
          });
        } else if (translationY > 30) {
          setVisibleIndex(prevIndex => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : images?.length - 1;
            return newIndex;
          });
        }
      }
    },
    [images?.length],
  );

  useEffect(() => {
    setImages(selectedImages);
  }, [selectedImages]);
  const handleItemPress = item => {
    setSelectedImages(item.bulkImageUpload);
    setSelectedAudio(item.bulkAudioUpload);
  };
  useEffect(() => {
    if (getbaghwandata?.length > 0) {
      handleItemPress(getbaghwandata[0]);
    }
  }, [getbaghwandata]);

  //Thali
  const [myThali, setMyThali] = useState();
  const renderItem = ({item, index}) => {
    const isSelected = selectedIndex === index;
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            setSelectedIndex(index);
            handleItemPress(item);
          }}
          style={[
            styles.UpperFlatlistImageContainer,
            isSelected && styles.selectedItem,
          ]}>
          <Image
            resizeMode="cover"
            source={{uri: new_img_url + item?.image}}
            style={[styles.flatListImage]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const [showShower, setShowShower] = useState(false);
  return (
    <GestureHandlerRootView>
      {showFlower && (
        <LottieView
          source={require('../../assets/lottie/flower.json')}
          autoPlay
          loop
          style={{
            position: 'absolute',
            top: -80,
            zIndex: 9999,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
        />
      )}

      {showShower && (
        <View style={{position: 'absolute', top: 0}}>
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {transform: [{translateY}], left: responsiveScreenHeight(1)},
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {transform: [{translateY}], left: responsiveScreenHeight(10)},
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {transform: [{translateY}], left: responsiveScreenHeight(2)},
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {transform: [{translateY}], left: responsiveScreenHeight(4)},
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {transform: [{translateY}], left: responsiveScreenHeight(12)},
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {transform: [{translateY}], left: responsiveScreenHeight(10)},
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {transform: [{translateY}], left: responsiveScreenHeight(16)},
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-12),
                left: responsiveScreenHeight(18),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-28),
                left: responsiveScreenHeight(24),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-22),
                left: responsiveScreenHeight(24),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-42),
                left: responsiveScreenHeight(24),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-46),
                left: responsiveScreenHeight(24),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-36),
                left: responsiveScreenHeight(30),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-36),
                left: responsiveScreenHeight(40),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-56),
                left: responsiveScreenHeight(30),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-47),
                left: responsiveScreenHeight(35),
              },
            ]}
          />
          <Animated.Image
            source={{uri: new_img_url + flowerImage}}
            style={[
              styles.flower,
              {
                transform: [{translateY}],
                top: responsiveScreenHeight(-57),
                left: responsiveScreenHeight(35),
              },
            ]}
          />
        </View>
      )}

      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#D6CDBB'} barStyle={'dark-content'} />

        <ImageBackground
          style={[styles.templeImage, {pointerEvents: 'box-none'}]}
          resizeMode="cover">
          <View>
            <TouchableOpacity
              onPress={playBellSound}
              style={{
                position: 'absolute',
                top: SCREEN_HEIGHT * 0.35,
                left: showGifBell ? SCREEN_WIDTH * 0.1 : SCREEN_WIDTH * 0.22,
              }}>
              
            </TouchableOpacity>

            <TouchableOpacity
              onPress={playBellSound}
              style={{
                position: 'absolute',
                top: SCREEN_HEIGHT * 0.35,
                right: showGifBell ? SCREEN_WIDTH * 0.1 : SCREEN_WIDTH * 0.22,
              }}>
              
            </TouchableOpacity>
          </View>
          <View
            style={{
              zIndex: 9999999,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            <View
              style={{
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
              }}>
              <Text style={{fontWeight: '700', fontSize: 20, color: '#000'}}>
                {localBalance}
              </Text>
              <Image
                source={require('../../assets/images/mudra.png')}
                style={{
                  width: 30,
                  height: 30,
                  objectFit: 'contain',
                }}
              />
            </View>
            {showLottieMudra && (
              <LottieView
                source={require('../../assets/lottie/mudra.json')}
                autoPlay
                loop
                style={{
                  position: 'absolute',
                  top: SCREEN_HEIGHT * 0.1,
                  zIndex: 99999,
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT * 0.3,
                  left: SCREEN_WIDTH * 0.3,
                  top: 10,
                }}
              />
            )}
          </View>

          <View style={{}}>
            <FlatList
              data={getbaghwandata}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.flatList,
                {flexDirection: 'row-reverse'},
              ]}
              style={{}}
              getItemLayout={(data, index) => ({
                length: SCREEN_WIDTH * 0.13,
                offset: SCREEN_WIDTH * 0.13 * index,
                index,
              })}
            />
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <FlatList
                data={[images[visibleIndex]]}
                renderItem={({item}) => {
                  return (
                    <Image
                      source={{uri: new_img_url + item}}
                      style={styles.centerNewImage}
                    />
                  );
                }}
                keyExtractor={(item, index) => `${index}-${visibleIndex}`}
                horizontal={false}
                scrollEnabled={false}
              />
            </PanGestureHandler>
          </View>

          {showNormalThali && (
            <TouchableOpacity
              style={styles.thaliView}
              onPress={() => {
                refRBSheet.current?.open();
              }}>
              <Image
                source={
                  myThali
                    ? {uri: new_img_url + myThali}
                    : require('../../assets/images/AARTITHALI.png')
                }
                style={{
                  width: 150,
                  height: 150,
                  objectFit: 'contain',
                  position: 'absolute',
                  bottom: responsiveScreenHeight(25),
                }}
              />
            </TouchableOpacity>
          )}

          {showRotateThali && (
            <TouchableOpacity
              style={styles.thaliView}
              // onPress={handlePress}
              onPress={() => {
                refRBSheet.current?.open();
              }}>
              <Animated.View style={animatedViewStyle}>
                <Animated.Image
                  source={
                    myThali
                      ? {uri: new_img_url + myThali}
                      : require('../../assets/images/AARTITHALI.png')
                  }
                  style={animatedImageStyle} // Apply rotation only to the image
                />
              </Animated.View>
            </TouchableOpacity>
          )}
          <View
            style={{
              position: 'absolute',
              bottom: SCREEN_HEIGHT * 0.05,
              left: SCREEN_WIDTH * 0.03,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            }}>
            <TouchableOpacity
              style={{backgroundColor: '#fff', borderRadius: 100}}
              onPress={() => {
                handleRBSheetOpen('THALI');
              }}>
              
            </TouchableOpacity>

            {/* Button 2 */}
            <TouchableOpacity
              style={{backgroundColor: '#fff', borderRadius: 100}}
              onPress={() => {
                handleRBSheetOpen('Flower');
              }}>
             
            </TouchableOpacity>

            {/* Button 3 */}
            <TouchableOpacity
              style={{backgroundColor: '#fff', borderRadius: 100}}
              onPress={() => handleRBSheetOpen('Shankh')}>
              <Image
                source={require('../../assets/images/shankh_golden.png')}
                style={{
                  width: responsiveScreenWidth(9),
                  height: responsiveScreenHeight(7),
                  objectFit: 'contain',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                refRBSheetMusic.current?.open();
              }}>
              <Image
                source={require('../../assets/images/music1.png')}
                style={{
                  width: responsiveScreenWidth(15),
                  height: responsiveScreenHeight(7),
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', alignSelf: 'center', bottom: 10}}>
            <AjkaPradhan />
          </View>
        </ImageBackground>

        <RBSheet
          ref={refRBSheet}
          useNativeDriver={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              height: SCREEN_HEIGHT * 0.26,
              backgroundColor: '#000',
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
          }}>
          <View style={{padding: 8}}>
            <Text style={{fontSize: 12, color: '#fff', fontWeight: '700'}}>
              Choose Samagri For Mandir
            </Text>
            <View>
              {/* Category Tabs */}
              <FlatList
                horizontal
                data={getcategorydata}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryTab,
                      activeCategoryId === item._id && styles.activeTab,
                    ]}
                    onPress={() => {
                      setActiveCategoryId(item._id);
                    }}>
                    <Text
                      style={[
                        styles.categoryText,
                        activeCategoryId === item._id && styles.activeText,
                      ]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
              />
              {/* Items List */}
              <FlatList
                horizontal
                data={
                  getcategorydata?.find(cat => cat._id === activeCategoryId)
                    ?.items || []
                }
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        const categoryTitle = getcategorydata.find(
                          cat => cat._id === activeCategoryId,
                        )?.title;

                        if (categoryTitle === 'THALI') {
                          handlePress();
                          thaliArpan(
                            item?.itemName,
                            item?.payment,
                            item?.itemPrice,
                            item?.itemImage,
                          );
                        } else if (categoryTitle === 'Shankh') {
                          handleShankh();
                          thaliArpan(
                            item?.itemName,
                            item?.payment,
                            item?.itemPrice,
                            item?.itemImage,
                          );
                        } else if (categoryTitle === 'Coconut') {
                          handleCoconut();
                          thaliArpan(
                            item?.itemName,
                            item?.payment,
                            item?.itemPrice,
                            item?.itemImage,
                          );
                        } else {
                          foolArpan(
                            item?.itemName,
                            item?.payment,
                            item?.itemPrice,
                            item?.itemImage,
                          );
                        }
                      }}>
                      <Image
                        source={{uri: new_img_url + item?.itemImage}}
                        style={styles.itemImage}
                      />
                      <Text style={styles.itemName}>{item.itemName}</Text>
                      <Text style={styles.itemPrice}>₹{item.itemPrice}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </RBSheet>
        
        <RBSheet
          ref={refRBSheetMusic}
          useNativeDriver={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              height: SCREEN_HEIGHT,
              backgroundColor: '#fff',
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
          }}>
          <MusciPlayer
            onClose={() => refRBSheetMusic.current?.close()}
            navgrahMusic={selectedAudio}
          />
        </RBSheet>
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
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(Sanatan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  templeImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignSelf: 'center',
    position: 'relative',
  },

  centeredImage: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: SCREEN_WIDTH * 0.04,
    position: 'absolute',
    alignSelf: 'center',
    top: SCREEN_HEIGHT * 0.41,
    objectFit: 'cover',
  },
  flatList: {
    padding: 10,
    gap: 10,
  },
  flatListImage: {
    height: '100%',
    width: '100%',
    borderRadius: SCREEN_WIDTH * 0.06,
    borderWidth: 2,
    borderColor: colors.background_theme2,
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
  UpperFlatlistImageContainer: {
    height: SCREEN_WIDTH * 0.13,
    width: SCREEN_WIDTH * 0.13,
    borderRadius: SCREEN_WIDTH * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    backgroundColor: colors.white_color,
  },
  selectedItem: {backgroundColor: 'orange'},
  UpperFlatlistImageContainer2: {
    height: SCREEN_WIDTH * 0.12,
    width: SCREEN_WIDTH * 0.12,
    borderRadius: SCREEN_WIDTH * 0.09,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
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
    width: '100%',
    objectFit: 'cover',
    height: '30%',
  },
  modalText: {
    fontSize: 24,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  modalText1: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
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

  thaliView: {
    // Ensure the view is centered on the screen initially
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: SCREEN_HEIGHT * 0.19,
  },
  thali: {
    width: 100, // Initial size of the thali
    height: 100, // Initial size of the thali
  },

  categoryTab: {
    marginHorizontal: 5,
    marginTop: 10,
    marginRight: 20,
  },
  activeTab: {
    borderBottomColor: '#995844',
    borderBottomWidth: 2,
  },
  categoryText: {
    fontSize: 13,
    color: '#fff',
    textTransform: 'capitalize',
  },
  activeText: {
    color: '#ffff',
  },
  itemContainer: {
    marginRight: 15,
    alignItems: 'center',
    width: 80,
    marginTop: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 5,
    objectFit: 'contain',
    borderWidth: 1,
    borderColor: '#fff',
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
  flower: {
    width: 30,
    height: 30,
    zIndex: 999,
    objectFit: 'contain',
  },
  centerNewImage: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.35,
    left: SCREEN_WIDTH * 0.26,
    marginTop: SCREEN_HEIGHT * 0.29,
    borderRadius: 20,
    objectFit: 'cover',
  },
});
