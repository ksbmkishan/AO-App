import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Animated, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors, new_img_url } from '../../../../config/Constants1';
import { SCREEN_HEIGHT } from '../../../../config/Screen';
import FastImage from "@d11/react-native-fast-image";;
import Carousel from 'react-native-reanimated-carousel';
import { parallaxLayout } from '../parallax';
import * as SanatanActions from '../../../../redux/actions/sanatanActions';
import SvgOrImage from '../../../../components/SvgOrImage';
import { normalize } from '../../../../config/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.1;
const ITEM_SPACING = SCREEN_WIDTH * 0.03;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING;

const PAGE_WIDTH = SCREEN_WIDTH / 5;

const HeaderImageNavgarh = ({ getbaghwandatanavgrah, visibleNavgarhIndex }) => {
  const fadeAnimArray = useRef(getbaghwandatanavgrah.map(() => new Animated.Value(0.8))).current;
  const carouselRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Debugging the visibleNavgarhIndex and the current data length
    console.log('visibleNavgarhIndex: ', visibleNavgarhIndex);
    console.log('Data length: ', getbaghwandatanavgrah.length);

    // Handle the case where visibleNavgarhIndex might be out of bounds
    const indexToScroll = (visibleNavgarhIndex % getbaghwandatanavgrah.length + getbaghwandatanavgrah.length) % getbaghwandatanavgrah.length;
    console.log('indexToScroll (with modulo): ', indexToScroll);

    // Ensure carouselRef exists and scrollTo method is available
    if (carouselRef.current && typeof carouselRef.current.scrollTo === 'function') {
      carouselRef.current.scrollTo({ index: indexToScroll, animated: false });
    } else {
      console.log('carouselRef or scrollTo method is not available');
    }

    fadeAnimArray.forEach((fadeAnim, index) => {
      Animated.spring(fadeAnim, {
        toValue: visibleNavgarhIndex === index ? 1 : 0.8,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
   
  }, [visibleNavgarhIndex, getbaghwandatanavgrah.length]);

  console.log('current Ref ',carouselRef.current)

  return (
    <View style={{ width: SCREEN_WIDTH, zIndex: 3, top: SCREEN_HEIGHT * 0.04 }}>
      <Carousel
        ref={carouselRef}
        width={SCREEN_WIDTH}
        height={ITEM_WIDTH * 2}
        data={getbaghwandatanavgrah}
        scrollAnimationDuration={0}
        
        enabled={true} 
        loop={true}
        onSnapToItem={(index) => {
          console.log('onSnapToItem index: ', index);
          dispatch(SanatanActions.setSantanNavgarhVisibleIndex(index));
        }}
        renderItem={({ item, index }) => (
          <View style={{ justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH }}>
            <Animated.View
              style={{
                opacity: fadeAnimArray[index],
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={[
                  styles.UpperFlatlistImageContainer,
                  visibleNavgarhIndex === index && styles.selectedItem,
                ]}
              >
                {/* <FastImage
                  style={styles.flatListImage}
                  source={{ uri: new_img_url + item?.image }}
                  resizeMode={FastImage.resizeMode.contain}
                /> */}
                <SvgOrImage uri={ item?.image} style={styles.flatListImage} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        customAnimation={parallaxLayout(
          {
            size: PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale: normalize(1),
            parallaxAdjacentItemScale: normalize(1),
            parallaxScrollingOffset: normalize(30),
          }
        )}
      />
    </View>
  );
  };
  
  export default HeaderImageNavgarh;
  
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