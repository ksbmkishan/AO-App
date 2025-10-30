import {
  Animated,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FoldPhone, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { connect } from 'react-redux';
import * as SanatanActions from '../../../redux/actions/sanatanActions';

import { colors, new_img_url } from '../../../config/Constants1';
import Sound from 'react-native-sound';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Fonts, Sizes } from '../../../assets/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RenderHTML from 'react-native-render-html';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { showToastMessage } from '../../../utils/services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgOrImage from '../../../components/SvgOrImage';
import { FontsStyle, normalize } from '../../../config/constants';
import MyHeader from '../../../components/MyHeader';
import { useTranslation } from 'react-i18next';
import TranslateText from '../../language/TranslateText';

const BottomLeft = ({
  getcategorydata,
  dispatch,
  activeCategory,
  customerData,
  spinValue,
  visibleIndex,
  getbaghwandata,
  shankhVisible,
  bottomLeft,
 musicVisible,
 setVisible,
 refRBSheetMusic
}) => {
  
  const navigation = useNavigation();
  const {t} = useTranslation();
  useEffect(() => {
    
    const sound = new Sound(
      'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/aartithali.mpeg',
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




  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [newBellSound, setNewBellSound] = useState(null);
  const [shankhSound, setShankhSound] = useState(null);
  const [coconutSound, setCoconutSound] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [amountSecond, setAmountSecond] = useState(0);
  const [queuedAction, setQueuedAction] = useState(null);
  const [queuedShankh, setQueuedShankh] = useState(null);
  const [thaliData, setThaliData] = useState(null);
  const [flowerData, setFlowerData] = useState(null);
  const [shankhData, setShankhData] = useState(null);
  const [coconutData, setCoconutData] = useState(null);
  const [count, setCount] = useState(0);
  const refRBSheet = useRef(null);
  const refRBSheetBottom = useRef(null);
  const refRBSheetBottomConfirm = useRef(null);
  const refRBSheetFlower = useRef(null);
  const refRBSheetShankh = useRef(null);
  const refRBSheetCoconut = useRef(null);

  // console.log('getbaghwandata[visibleIndex]?.bulkImageUpload[currentIndex]' ,getbaghwandata[visibleIndex])

  const handleRBSheetOpen = categoryTitle => {
    console.log('categoryTitle', categoryTitle);
    if (bottomLeft) {
      showToastMessage({ message: "Wait ..." });
      return;
    }
    const category = getcategorydata.find(cat => cat.title === categoryTitle);
    if (category) {
      dispatch(SanatanActions.setSantanActiveCateogry(category._id));
      refRBSheet.current.open();
    }
  };

  const sortOrder = ["Flower", "Coconut", "Shankh", "THALI"];

  const handleRBSheetBottom = () => {
    refRBSheetBottom.current.open();
  };

  const handlePress = (data) => {
    refRBSheet.current?.close();

    if (data.payment != 'add') {
      setThaliData(data);

      if (customerData?.askConfirmation == 0) {
        refRBSheetBottomConfirm.current?.open();
      } else {
        handleThali(data);
      }

    } else {
      handleThali(data);
    }
  };

  const handleThali = (data) => {
    // dispatch(SanatanActions.setSantanShowLottieMudra(true));

    console.log('data :::::: ', data);
    const durationData = data?.duration != 0 ? data?.duration * 1000 : 3000;
    const payload = {
      data: {
        duration: durationData,
        spinValue: spinValue,
        itemImage: data?.itemImage,
        itemPrice: data?.itemPrice,
      },
      startAnimation: () => newPlayBellSound(durationData),
    }
    dispatch(SanatanActions.getSantanShowThali(payload));


  }

  const handleCoconut = item => {
    refRBSheet.current?.close();

    if (item.payment != 'add') {
      setCoconutData(item);
      if (customerData?.askConfirmation == 0) {
        refRBSheetCoconut.current.open();
      } else {
        handleCoconutClick(item);
      }
    } else {
      handleCoconutClick(item);
    }
  };

  const handleCoconutClick = (item) => {
    const payload = {
      data: item,
      onCall: () => newPlayCoconutSound(),
    };
    dispatch(SanatanActions.getSantaCocountArpan(payload));

  }

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
  };

  const handleShankh = (item) => {
    refRBSheet.current?.close();


    if (item.payment != 'add') {
      setShankhData(item);
      if (customerData?.askConfirmation == 0) {
        refRBSheetShankh.current.open();
      } else {
        handleShankhClick(item);
      }
    } else {
      handleShankhClick(item);
    }

  };

  const handleShankhClick = (item) => {
    const time = item?.duration ? item?.duration * 1000 : 3000;
    const payload = {
      dispatch: dispatch,
      duration: time,
      data: item
    }
    dispatch(SanatanActions.getSantanShankhPlay(payload));

  }


  useEffect(() => {
    if (shankhSound) {
      shankhSound.setNumberOfLoops(-1); // **Infinite loop (auto repeat)**

      if (shankhVisible) {
        shankhSound.stop(() => {
          shankhSound.setCurrentTime(0); // **साउंड को रीसेट करें**
          shankhSound.play(); // **फिर से प्ले करें**
        });
      } else {
        console.log('stop :: ')
        shankhSound.stop();
      }
    }
  }, [shankhSound, shankhVisible]);

  const newPlayBellSound = (data) => {
    console.log('data sound Bell ', data);

    if (newBellSound) {
      newBellSound.setNumberOfLoops(-1); // 🔁 Infinite loop
      newBellSound.play(success => {
        if (success) {
          console.log('Successfully playing bell sound in loop');
        } else {
          console.log('Sound play failed');
        }
      });
    }

    console.log('start animations');
    startAnimation();
    dispatch(SanatanActions.getSantanSOundPlayBell(data));

    // ⏱️ Stop after "data" milliseconds
    setTimeout(() => {
      if (newBellSound) {
        newBellSound.stop(() => {
          console.log('Bell sound stopped');
        });
      }
    }, data);
  };


  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1, // Rotate right (20°)
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0, // Rotate left (-20°)
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const HandleVr = () => {

    refRBSheetBottom.current.close();
    navigation.navigate('ViroImage', { data: getbaghwandata[visibleIndex]?.vr_mode, id: getbaghwandata[visibleIndex]?._id })
  }



  const handleFlower = (item) => {
    dispatch(SanatanActions.setFlowerImage(item?.itemImage));
    refRBSheet.current.close();

    if (item.payment != 'add') {
      setFlowerData(item);
      if (customerData?.askConfirmation == 0) {
        refRBSheetFlower.current.open();
      } else {
        handleFlowerClick(item);
      }
    } else {
      handleFlowerClick(item);
    }


  }

  const handleFlowerClick = (item) => {
    const payload = {
      data: item,
      duration: item?.duration ? item?.duration * 1000 : 3000,
    };

    console.log('flower playload :: ', payload)

    dispatch(SanatanActions.getSantanFoolArpan(payload));

  }

  // Function to get price based on slider value
  const getPrice = (value) => {
    if (value <= 3) return '0';
    if (value <= 6) return '10';
    if (value <= 10) return '20';
    return 'N/A';
  };

  // Update amountSecond when sliderValue changes
  useEffect(() => {
    if (sliderValue <= 3) {
      setAmountSecond(0);
    } else if (sliderValue <= 6) {
      setAmountSecond(10);
    } else if (sliderValue <= 10) {
      setAmountSecond(20);
    }
  }, [sliderValue]);


  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: SCREEN_HEIGHT * 0.1,
          left: FoldPhone ? SCREEN_WIDTH * 0.27 : SCREEN_WIDTH * 0.03,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          zIndex: 1,
          width: FoldPhone ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH * 0.12,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 100,
            width: FoldPhone ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.12,
            height: FoldPhone ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.12,
            padding: 4,
          }}
          onPress={() => {
            handleRBSheetBottom();
          }}>
          <Image
            source={require('../../../assets/images/sun.png')}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 100,
            width: FoldPhone ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.12,
            height: FoldPhone ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.12,
            padding: 4,
          }}
          onPress={() => {
            handleRBSheetOpen('Flower');
          }}>
          <Image
            source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/ThaliFlowerComman.jpeg'}}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 100,

              objectFit: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>

        {/* Button 2 */}

       

        {/* Button 3 */}

        {/* <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 100,
            width: SCREEN_WIDTH * 0.12,
            height: SCREEN_WIDTH * 0.12,
            padding: 5,
          }}
          onPress={() => handleRBSheetOpen('Shankh')}>
          <Image
            source={require('../../../assets/images/shankh_golden.png')}
            style={{
              width: SCREEN_WIDTH * 0.08,
              height: SCREEN_WIDTH * 0.08,
              objectFit: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity> */}

        {/* <TouchableOpacity
        style={{ backgroundColor: '#fff', borderRadius: 100 }}
        onPress={() => handleRBSheetOpen('Shankh')}
    >
        <Image
            source={require('../../assets/images/shankh_golden.png')}
            style={{
                width: responsiveScreenWidth(9),
                height: responsiveScreenHeight(7),
                objectFit: 'contain',
                alignSelf: 'center',
            }}
        />
    </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 100,
             width: FoldPhone ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.12,
            height: FoldPhone ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.12,
            padding: 4,
          }}
          onPress={() => {
            // setVisible(true);
            refRBSheetMusic?.current?.open();
            // musicVisible(true);

          }}>

          <Image
            source={require('../../../assets/images/music1.png')}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              alignSelf: 'center',
            }}
          />

        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        closeOnPressBack
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            height: SCREEN_HEIGHT * 0.26,
            // backgroundColor: '#000',
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
        }}>
        <View style={{ padding: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(15) }}>
              {t("Choose Samagri For Mandir")}
            </Text>
            <TouchableOpacity onPress={() => setInfoVisible(true)}>
              <Ionicons name="information-circle" color={'black'} size={normalize(20)} />
            </TouchableOpacity>
          </View>

          <View>
            {/* Category Tabs */}

            <FlatList
              horizontal
              data={getcategorydata}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryTab,
                    activeCategory === item._id && styles.activeTab,
                  ]}
                  onPress={() => {
                    console.log('afa'),
                      dispatch(
                        SanatanActions.setSantanActiveCateogry(item._id),
                      );
                  }}>
                  <Text
                    style={[
                      styles.categoryText,
                      activeCategory === item._id && styles.activeText,
                    ]}>
                    <TranslateText title={item.title} />
                  </Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />

            {/* Items List */}

            <FlatList
              horizontal
              data={
                getcategorydata?.find(cat => cat._id === activeCategory)
                  ?.items || []
              }
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      const categoryTitle = getcategorydata.find(
                        cat => cat._id === activeCategory,
                      )?.title;

                      if (categoryTitle === 'THALI') {
                        handlePress(item);
                      } else if (categoryTitle === 'Shankh') {
                        handleShankh(item);
                      } else if (categoryTitle === 'Coconut') {
                        handleCoconut(item);
                      } else {
                        handleFlower(item);
                      }
                    }}>
                    {item.payment != 'add' && <View style={{
                      position: 'absolute',
                      top: -SCREEN_WIDTH * 0.02,
                      right: -SCREEN_WIDTH * 0.015,
                      backgroundColor: '#faedcd', zIndex: 1
                    }}>
                      <Text style={{ fontSize: normalize(11), color: '#dc562e', fontWeight: 'bold' }}>{t("Paid")}</Text>
                    </View>}



                    <SvgOrImage
                      uri={item?.itemImage}
                      style={{ ...styles.itemImage, borderWidth: item.payment != 'add' ? 1 : 1, borderColor: item.payment != 'add' ? '#dc562e' : 'grey' }}
                    />
                    <Text style={styles.itemName}><TranslateText title={item.itemName} /></Text>
                    {item.payment != 'add' ? (
                      <Text style={styles.itemPrice}>
                        {item.itemPrice} {'\n'}
                        <Text style={{ fontSize: normalize(10) }}>{t('Divya Rashi')}</Text>
                      </Text>)
                      :
                      (
                        <>
                          <Text style={{ ...styles.itemPrice, color: 'black' }}>{item.itemPrice}{'\n'}
                            <Text style={{ fontSize: normalize(10) }}>{t('Purshartha')}</Text>
                          </Text>

                        </>
                      )}

                  </TouchableOpacity>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

      </RBSheet>
      {getbaghwandata && (
        <RBSheet
          ref={refRBSheetBottom}
          useNativeDriver={true}
          draggable={true}
          closeOnPressBack
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              height: SCREEN_HEIGHT,
              backgroundColor: '#fff',
              flex:normalize(22)
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
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={{ padding: 0 ,flex:0}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: colors.background_theme2,
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => refRBSheetBottom.current.close()}>
                  <AntDesign name="caretdown" color={'white'} size={20} />
                </TouchableOpacity>
                <Text style={{ ...FontsStyle.font,fontWeight:'bold', color: 'white' }}>
                  <TranslateText title={getbaghwandata && getbaghwandata[visibleIndex]?.title} />
                </Text>
                <Text></Text>
              </View>
             
              <SvgOrImage
                uri={getbaghwandata[visibleIndex]?.image}
                style={{
                  width: SCREEN_WIDTH * 0.9,
                  height: SCREEN_HEIGHT * 0.2,
                  paddingHorizontal: Sizes.fixPadding,
                  borderRadius: 20,
                  resizeMode: 'contain',
                  margin: 10,
                }}
              />
              
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, padding: 10, margin: 4, backgroundColor: 'orange' }} onPress={() => {
                HandleVr()
              }}>
                <Text style={{ ...FontsStyle.fontBold, color: 'white',fontSize: normalize(13) }}>🎧 {t("Mandir mein Virtual Roop se Pravesh karein")}</Text>
              </TouchableOpacity>


              <View style={{ padding: 10 }}>
                <RenderHTML
                  contentWidth={SCREEN_WIDTH}
                  source={{
                    html: `
                      ${getbaghwandata && t('lang') === 'en' ? getbaghwandata[visibleIndex]?.description : getbaghwandata[visibleIndex]?.description_hi}                  `,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </RBSheet>
      )}

      <RBSheet
        ref={refRBSheetBottomConfirm}
        useNativeDriver={true}
        closeOnPressBack
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            height: SCREEN_HEIGHT * 0.15,
            // backgroundColor: '#000',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
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
        <View style={{ padding: 8 }}>
          <Text style={{ ...FontsStyle.font, fontWeight:'bold', textAlign: 'center' }}>
            {t("Ask For Confirmation")}
          </Text>
          <View>
            <Text style={{ color: 'black', textAlign: 'center' }}>
              {t("This is a premium feature, you Divya Rashi will be deducted")}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', top: 10 }}>
              <TouchableOpacity
                onPress={() => { refRBSheetBottomConfirm.current.close(), handleThali(thaliData) }}
                style={{
                  backgroundColor: 'green',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t('yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => refRBSheetBottomConfirm.current.close()}
                style={{
                  backgroundColor: 'red',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t('no')}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </RBSheet>

      {/* Flower */}
      <RBSheet
        ref={refRBSheetFlower}
        useNativeDriver={true}
        closeOnPressBack
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            height: SCREEN_HEIGHT * 0.15,
            // backgroundColor: '#000',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
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
        <View style={{ padding: 8 }}>
          <Text style={{ ...FontsStyle.font, fontWeight:'bold', textAlign: 'center' }}>
            {t("Ask For Confirmation")}
          </Text>
          <View>
            <Text style={{ color: 'black', textAlign: 'center' }}>
              {t("This is a premium feature, you Divya Rashi will be deducted")}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', top: 10 }}>
              <TouchableOpacity
                onPress={() => { refRBSheetFlower.current.close(), handleFlowerClick(flowerData) }}
                style={{
                  backgroundColor: 'green',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t("yes")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => refRBSheetFlower.current.close()}
                style={{
                  backgroundColor: 'red',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t("no")}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </RBSheet>

      {/* Shankh */}
      <RBSheet
        ref={refRBSheetShankh}
        useNativeDriver={true}
        closeOnPressBack
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            height: SCREEN_HEIGHT * 0.15,
            // backgroundColor: '#000',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
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
        <View style={{ padding: 8 }}>
          <Text style={{ ...FontsStyle.font, fontWeight:'bold', textAlign: 'center' }}>
            {t("Ask For Confirmation")}
          </Text>
          <View>
            <Text style={{ color: 'black', textAlign: 'center' }}>
              {t("This is a premium feature, you Divya Rashi will be deducted")}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', top: 10 }}>
              <TouchableOpacity
                onPress={() => { refRBSheetShankh.current.close(), handleShankhClick(shankhData) }}
                style={{
                  backgroundColor: 'green',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t("yes")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => refRBSheetShankh.current.close()}
                style={{
                  backgroundColor: 'red',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t("no")}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </RBSheet>

      {/* Cocount*/}
      <RBSheet
        ref={refRBSheetCoconut}
        useNativeDriver={true}
        closeOnPressBack
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            height: SCREEN_HEIGHT * 0.15,
            // backgroundColor: '#000',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
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
        <View style={{ padding: 8 }}>
          <Text style={{ ...FontsStyle.font, fontWeight:'bold', textAlign: 'center' }}>
            {t("Ask For Confirmation")}
          </Text>
          <View>
            <Text style={{ color: 'black', textAlign: 'center' }}>
              {t("This is a premium feature, you Divya Rashi will be deducted")}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', top: 10 }}>
              <TouchableOpacity
                onPress={() => { refRBSheetCoconut.current.close(), handleCoconutClick(coconutData) }}
                style={{
                  backgroundColor: 'green',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t("yes")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => refRBSheetCoconut.current.close()}
                style={{
                  backgroundColor: 'red',
                  padding: Sizes.fixPadding,
                  borderRadius: Sizes.fixPadding,
                  paddingHorizontal: Sizes.fixPadding * 4
                }}>
                <Text style={{ color: 'white' }}>{t("no")}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </RBSheet>

     

      {/* Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>{("Ask For confirmation")}</Text>
            {/* Close Modal Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>{t("Close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={infoVisible} animationType="slide">
        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text></Text>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>{t("Info")}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setInfoVisible(false)}>
                <Ionicons name='close' color={'white'} size={20} />
              </TouchableOpacity>
            </View>

            <Text style={{ color: 'black', textAlign: 'justify', fontSize: 16, fontWeight: '600', paddingVertical: 20 }}>
              * {t("Complete any 5 Pursharthas to earn 1 Divya Rashi (DR)")}.
              {'\n\n'}
              * {t("A Devotee can earn up to 5 DR per day and a maximum of 51 DR per month")}.
              {'\n\n'}
              * {t("1 DR = ₹1 (usable for in-app services, non-withdrawable).")}</Text>
            {/* Close Modal Button */}

          </View>
        </View>
      </Modal>

      {/* Music Player */}
       {/* <Modal transparent={true} visible={musicVisible} animationType="slide">
        <View style={styles.modalBackground1}>

          <View style={styles.modalContainer1}>
            <MusciPlayer onClose={() => setMusicVisible(false)} isPlaying={isPlaying}        // 🔹 pass state
              setIsPlaying={setIsPlaying} 
              />
          </View>
        </View>
      </Modal> */}

    </>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
  getcategorydata: state.home.getcategorydata,
  flowerImage: state.sanatan.flowerImage,
  activeCategory: state.sanatan.activeCategory,
  customerData: state.customer.customerData,
  visibleIndex: state.sanatan.visibleIndex,
  currentIndex: state.sanatan.currentIndex,
  getbaghwandata: state.home.getbaghwandata,
  normalVisible: state.sanatan.normalVisible,
  shankhVisible: state.sanatan.shankhVisible,
  bottomLeft: state.sanatan.bottomLeft
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomLeft);

const styles = StyleSheet.create({
  activeText: {
    color: 'black',
    ...FontsStyle.fontfamily
  },
  activeTab: {
    borderBottomColor: '#995844',
    borderBottomWidth: 2,
    
  },
  categoryText: {
    fontSize: normalize(13),
    textTransform: 'capitalize',
    color: 'black',
    ...FontsStyle.font
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
    borderRadius: 5,
    marginBottom: 5,
    objectFit: 'contain',
    borderWidth: 0.5,
    borderColor: '#DC9104',
  },
  itemName: {
    textAlign: 'center',
    ...FontsStyle.font,
    fontSize: normalize(12)
  },
  itemPrice: {
    fontSize: normalize(14),
    color: '#dc562e',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  categoryTab: {
    marginHorizontal: 5,
    marginTop: 10,
    marginRight: 20,
  },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { backgroundColor: 'white', borderRadius: 10, margin: 20, paddingVertical: 10, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  buttonContainer: { flexDirection: 'row', marginTop: 10 },
  optionButton: { backgroundColor: 'blue', padding: 10, marginHorizontal: 5, borderRadius: 5 },
  closeButton: { backgroundColor: colors.background_theme2, padding: 5, borderRadius: Sizes.fixPadding * 100 },
   modalBackground1: { flex: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContainer1: {
    height: "100%",
    width:"100%",
    backgroundColor: "#faedcd",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});
