import React, { useRef } from 'react';
import { View, Animated, PanResponder, Dimensions, Image, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Use a wide 360 panorama image (equirectangular projection)
const PANORAMA_IMAGE = require('../../assets/images/mata.jpeg'); 

export default function PanoramaViewer() {
  const translateX = useRef(new Animated.Value(0)).current;
  const lastTranslateX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        translateX.stopAnimation(value => {
          lastTranslateX.current = value;
        });
      },

      onPanResponderMove: (_, gestureState) => {
        // gestureState.dx = distance moved in X
        // Limit panning so it doesn't go beyond image edges

        // Width of panorama image - screen width (assume panorama image is 3x screen width)
        const maxPan = (screenWidth * 3) - screenWidth;

        let newTranslateX = lastTranslateX.current + gestureState.dx;

        // Clamp to max/min
        if (newTranslateX > 0) newTranslateX = 0;
        if (newTranslateX < -maxPan) newTranslateX = -maxPan;

        translateX.setValue(newTranslateX);
      },

      onPanResponderRelease: () => {
        lastTranslateX.current = translateX._value;
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.Image
        {...panResponder.panHandlers}
        source={PANORAMA_IMAGE}
        style={[
          styles.panorama,
          {
            transform: [{ translateX: translateX }],
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  panorama: {
    width: screenWidth * 3,  // Make panorama image wide (adjust to your image)
    height: '100%',
  },
});
