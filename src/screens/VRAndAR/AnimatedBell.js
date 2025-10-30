import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import SvgOrImage from '../../components/SvgOrImage';

export default function AnimatedBell() {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const angle = useRef(new Animated.Value(0)).current;

  const { isImageAnimation, isShowAnimation } = useSelector(state => state.VRAndAR);
  const animationType = isImageAnimation?.animationType;

  useEffect(() => {
    if (!animationType) return;

    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);
    angle.setValue(0);

    let animation;
    const radius = 50; // Reduced radius for better visibility

    switch (animationType) {
      case 'updown':
        animation = Animated.loop(
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: -20,
              duration: 500,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true
            }),
            Animated.timing(translateY, {
              toValue: 10,
              duration: 500,
              easing: Easing.bounce,
              useNativeDriver: true
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 300,
              easing: Easing.quad,
              useNativeDriver: true
            }),
          ]),
          { iterations: -1 }
        );
        break;

      case 'cracking':
        const shake = (val) => Animated.sequence([
          Animated.timing(translateX, {
            toValue: val,
            duration: 50,
            useNativeDriver: true
          }),
          Animated.timing(translateX, {
            toValue: -val,
            duration: 50,
            useNativeDriver: true
          }),
        ]);

        animation = Animated.loop(
          Animated.sequence([
            shake(8),
            shake(6),
            shake(4),
            shake(2),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true
            }),
            Animated.delay(500),
          ]),
          { iterations: -1 }
        );
        break;

      case 'round':
        const angleListener = angle.addListener(({ value }) => {
          translateX.setValue(Math.sin(value) * radius);
          translateY.setValue(-Math.cos(value) * radius);
        });

        animation = Animated.loop(
          Animated.timing(angle, {
            toValue: Math.PI * 2,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false
          })
        );

        // Custom cleanup for round animation
        const cleanup = () => {
          angle.removeListener(angleListener);
          animation.stop();
        };
        animation.start();
        return cleanup;

      case 'pendulum':
        animation = Animated.loop(
          Animated.sequence([
            Animated.timing(rotate, {
              toValue: 1,
              duration: 800,
              easing: Easing.out(Easing.sin),
              useNativeDriver: true
            }),
            Animated.timing(rotate, {
              toValue: -1,
              duration: 800,
              easing: Easing.out(Easing.sin),
              useNativeDriver: true
            }),
          ])
        );
        break;

      default:
        return;
    }

    animation.start();
    return () => {
      if (animation) animation.stop();
    };
  }, [animationType, translateX, translateY, rotate, angle]);

  const pendulumRotation = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const getTransform = () => {
    if (animationType === 'round') {
      return [{ translateX }, { translateY }];
    }
    
    const transform = [{ translateX }, { translateY }];
    if (animationType === 'pendulum') {
      transform.push({ rotate: pendulumRotation });
    }
    return transform;
  };

  return (
    isShowAnimation && (
      <View style={styles.container}>
        <Animated.View style={{ transform: getTransform() }}>
          <SvgOrImage
            uri={isImageAnimation?.itemImage}
            style={{ width: 50, height: 50 }}
          />
        </Animated.View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});