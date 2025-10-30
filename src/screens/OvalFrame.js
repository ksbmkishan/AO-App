import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/Screen';

const DOT_SIZE = 14;
const RADIUS = SCREEN_WIDTH / 2 -25;
const TOP_MARGIN = 30;
const SIDE_HEIGHT = SCREEN_HEIGHT - 2.2 * RADIUS - TOP_MARGIN * 2;
const TOTAL_ARC_DOTS = 27;
const TOTAL_VERTICAL_DOTS = 27;


const TOTAL_DOTS = TOTAL_ARC_DOTS * 2 + TOTAL_VERTICAL_DOTS * 2;

const RoundedRectFrame = ({count}) => {
    console.log('total dots ', TOTAL_DOTS, count)
  const dots = Array.from({ length: TOTAL_DOTS }).map((_, i) => {
    let x = 0;
    let y = 0;
    
    if (i < TOTAL_ARC_DOTS) {
      // ✅ top arc (curving UP)
      const angle = Math.PI * (i / (TOTAL_ARC_DOTS - 1));
      x = SCREEN_WIDTH  / 2 + RADIUS * Math.cos(angle) - DOT_SIZE / 2;
      y = TOP_MARGIN + RADIUS - RADIUS * Math.sin(angle) - DOT_SIZE / 0.8;
    } else if (i < TOTAL_ARC_DOTS + TOTAL_VERTICAL_DOTS) {
      // right side
      const index = i - TOTAL_ARC_DOTS;
      x = SCREEN_WIDTH / 2 + RADIUS - DOT_SIZE / 2;
      y = TOP_MARGIN + RADIUS + (SIDE_HEIGHT / TOTAL_VERTICAL_DOTS) * index;
    } else if (i < TOTAL_ARC_DOTS * 2 + TOTAL_VERTICAL_DOTS) {
      // bottom arc (π to 0)
      const index = i - (TOTAL_ARC_DOTS + TOTAL_VERTICAL_DOTS);
      const angle = Math.PI * (index / (TOTAL_ARC_DOTS - 1));
      x = SCREEN_WIDTH / 2 + RADIUS * Math.cos(Math.PI - angle) - DOT_SIZE / 2;
      y = TOP_MARGIN + RADIUS + SIDE_HEIGHT + RADIUS * Math.sin(angle) - DOT_SIZE / 0.8;
    } else {
      // left side
      const index = i - (TOTAL_ARC_DOTS * 2 + TOTAL_VERTICAL_DOTS);
      x = SCREEN_WIDTH / 2 - RADIUS - DOT_SIZE / 2;
      y = TOP_MARGIN + RADIUS + (SIDE_HEIGHT / TOTAL_VERTICAL_DOTS) * index;
    }

    const image = i < count
    ? require('../assets/icons/round-color.png')
    : require('../assets/icons/round.png');

    return (

      <Image
        key={i}
        source={image}
        style={[styles.dot, { left: x, top: y }]}
      />
    );
  });

  return <View style={styles.container}>{dots}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    // backgroundColor:'red',
   
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
  },
});

export default RoundedRectFrame;
