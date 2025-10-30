import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SCREEN_WIDTH } from '../../config/Screen';

const AnimatedThali = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spinReverse = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const animatedImageStyle = {
    width: 100,
    height: 100,
    transform: [
      { scale: 1 },
      { rotate: spinReverse },
    ],
  };

  const animatedViewStyle = {
    transform: [
      { rotate: spin },
      { translateX: -60 },
      { translateY: -60 },
    ],
    width: 100,
    height: 100,
    alignItems: 'center',
  };

  // Continuous loop animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.thaliView}>
        <Animated.View style={animatedViewStyle}>
          <Animated.Image
            source={require('../../assets/gifs/thalinew.gif')}
            style={animatedImageStyle}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: responsiveScreenHeight(10),
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
  },
  thaliView: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedThali);
