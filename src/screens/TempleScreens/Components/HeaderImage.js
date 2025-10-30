import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Dimensions, Animated, StyleSheet } from 'react-native';
import { colors, new_img_url } from '../../../config/Constants1';
import { FoldPhone, RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT } from '../../../config/Screen';
import FastImage from "@d11/react-native-fast-image";;
import Carousel from 'react-native-reanimated-carousel';
import { parallaxLayout } from './parallax';
import * as SanatanActions from '../../../redux/actions/sanatanActions';
import { useDispatch } from 'react-redux';
import SvgOrImage from '../../../components/SvgOrImage';
import { normalize } from '../../../config/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.1;
const ITEM_SPACING = SCREEN_WIDTH * 0.03;

const PAGE_WIDTH = SCREEN_WIDTH / 5;

const HeaderImage = ({ getbaghwandata, visibleIndex }) => {
  const dispatch = useDispatch();
  const fadeAnimArray = useRef(getbaghwandata.map(() => new Animated.Value(0.8))).current;
  const carouselRef = useRef(null);

  const [fold,setFold] = useState(false);

  

  useEffect(() => {
    // Debugging the visibleIndex and the current data length
    console.log('visibleIndex: ', visibleIndex);
    console.log('Data length: ', getbaghwandata.length);

     if (SCREEN_WIDTH > SCREEN_HEIGHT) {
      setFold(true);
    } 

    // Handle the case where visibleIndex might be out of bounds
    const indexToScroll = (visibleIndex % getbaghwandata.length + getbaghwandata.length) % getbaghwandata.length;
    console.log('indexToScroll (with modulo): ', indexToScroll);

    // Ensure carouselRef exists and scrollTo method is available
    if (carouselRef.current && typeof carouselRef.current.scrollTo === 'function') {
      carouselRef.current.scrollTo({ index: indexToScroll, animated: false });
    } else {
      console.log('carouselRef or scrollTo method is not available');
    }

    fadeAnimArray.forEach((fadeAnim, index) => {
      Animated.spring(fadeAnim, {
        toValue: visibleIndex === index ? 1 : 0.8,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });

  }, [visibleIndex, getbaghwandata.length]);

  console.log('current Ref ', carouselRef.current)



  return (
    <View style={{ width: FoldPhone ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH, zIndex: 3, top: fold ? 2 : RESPONSIVE_HEIGHT(4),}}>
      <Carousel
        ref={carouselRef}
        width={FoldPhone ? RESPONSIVE_WIDTH(50) : RESPONSIVE_WIDTH(100)}
        height={FoldPhone ? ITEM_WIDTH : ITEM_WIDTH * 2}
        data={getbaghwandata}
        scrollAnimationDuration={0}
        enabled={true}
        loop={true}
        onSnapToItem={(index) => {
          console.log('onSnapToItem index: ', index);
          dispatch(SanatanActions.setSantanVisibleIndex(index));
        }}
        renderItem={({ item, index }) => {
          const isFocused = visibleIndex === index;

          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: FoldPhone ? RESPONSIVE_WIDTH(49) : RESPONSIVE_WIDTH(98),
                
             
              }}
              pointerEvents="box-none"
              
            >
              <Animated.View
                style={{
                  opacity: fadeAnimArray[index],
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: isFocused ? 10 : 1,
                  
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log('Image pressed, index:', index)}
                  activeOpacity={0.7}
                  style={[
                    styles.UpperFlatlistImageContainer,
                    isFocused && styles.selectedItem,
                  ]}
                  pointerEvents={isFocused ? "auto" : "none"}
                >
                 
                  <SvgOrImage uri={item?.image} style={styles.flatListImage} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
        customAnimation={parallaxLayout(
          {
            size: FoldPhone ? PAGE_WIDTH  : PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale:FoldPhone ? 0.5 : normalize(1),
            parallaxAdjacentItemScale:FoldPhone ? 0.5: normalize(1),
            parallaxScrollingOffset: FoldPhone ? 100 : normalize(30),
          }
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  UpperFlatlistImageContainer: {
    height: ITEM_WIDTH,
    width: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    backgroundColor: colors.white_color,
  },
  flatListImage: {
    height: '100%',
    width: '100%',
    borderRadius: ITEM_WIDTH / 2,
    borderWidth: 2,
    borderColor: colors.background_theme2,
  },
  selectedItem: {
    backgroundColor: 'orange',
    height: ITEM_WIDTH * 1.1,
    width: ITEM_WIDTH * 1.1,
    borderRadius: (ITEM_WIDTH * 1.1) / 2,
  },
});

export default HeaderImage;
