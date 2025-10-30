import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function CircularDiyaPuja() {
  const angle = useRef(new Animated.Value(0)).current;
  const radius = 100;

  const { isPujaGif } = useSelector(state => state.VRAndAR);

  console.log("isDiyaAnimating", isPujaGif);

  useEffect(() => {
    Animated.loop(
      Animated.timing(angle, {
        toValue: 1, // Normalized value (0-1 represents 0-2π radians)
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Pre-calculate positions for 4 key points (0°, 90°, 180°, 270°)
  const positions = [0, 0.25, 0.5, 0.75, 1].map(t => {
    const rad = t * 2 * Math.PI;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius
    };
  });

  const translateX = angle.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: positions.map(p => p.x),
  });

  const translateY = angle.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: positions.map(p => p.y),
  });

  return (
    isPujaGif &&
    <View style={styles.container}>
      <View style={[styles.circleCenter, { width: radius * 2, height: radius * 2 }]}>
        <Animated.View
          style={{
            transform: [
              { translateX },
              { translateY },
            ],
          }}
        >
          <Image
            source={require('../../assets/images/diya.png')}
            style={styles.diya}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom:0,
    right: 0,
    left:0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  diya: {
    width: 70,
    height: 70,
  },
});