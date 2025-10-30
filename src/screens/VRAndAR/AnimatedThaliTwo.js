import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT } from '../../config/Screen';

const AnimatedThaliTwo = () => {
    const moveX = useRef(new Animated.Value(0)).current;
    const moveY = useRef(new Animated.Value(0)).current;

  const {isImageAnimation ,isShowAnimation} = useSelector(state => state.VRAndAR);

  useEffect(() => {
    const loopMotion = () => {
      Animated.sequence([
        Animated.timing(moveX, {
          toValue: -10, // Move left
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(moveX, {
          toValue: 10, // Move right
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(moveX, {
          toValue: 0, // Center
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(moveY, {
          toValue: -10, // Move up
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(moveY, {
          toValue: 10, // Move down
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(moveY, {
          toValue: 0, // Center
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.delay(1000), // Pause
      ]).start(() => loopMotion());
    };

    loopMotion();
  }, [moveX, moveY]);

  return (
    isShowAnimation &&
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.half}>
          <Animated.Image
            source={{uri: isImageAnimation}}
            style={{ transform: [{ translateX: moveX }, { translateY: moveY }],width:70, height: 70 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.half}>
          <Animated.Image
               source={{uri: isImageAnimation}}
           style={{ transform: [{ translateX: moveX }, { translateY: moveY }],width:70, height: 70 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: responsiveScreenHeight(10),
    width: '100%',
    alignItems: 'center',
    zIndex: 1000,
    bottom:SCREEN_HEIGHT * 0.2,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  half: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thaliImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedThaliTwo);
