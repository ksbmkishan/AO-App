import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as SanatanActions from '../../../../redux/actions/sanatanActions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../config/Screen';
import Sound from 'react-native-sound';

const PlayBell = ({dispatch,gifBellVisible,flowerVisible}) => {

  useEffect(() => {
    const sound = new Sound('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/bell_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Error loading sound:', error);
        }
    });
    
    dispatch(SanatanActions.setSantanAudioBell(sound));
    startAnimation();
    return () => {
        if (sound) {
            sound.release();
        }
    };
}, []);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  
   const startAnimation = () => {
      Animated.loop(
          Animated.sequence([
              Animated.timing(rotateAnim, {
                  toValue: 1, // Rotate right (20°)
                  duration: 1500,
                  useNativeDriver: true,
              }),
              Animated.timing(rotateAnim, {
                  toValue: 0, // Rotate left (-20°)
                  duration: 1500,
                  useNativeDriver: true,
              }),
          ])
      ).start();
  };


  const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['-10deg', '10deg'],
  });

  return (
    <View style={{ zIndex: 5, position:'absolute',flexDirection:'row'}}>

      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          top: SCREEN_HEIGHT * -0.1,
          left:  SCREEN_WIDTH * 0.3,
          zIndex: 1,
        }}
      >
        {flowerVisible && (
          <Animated.Image
            source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/bbbell.png' }}
            style={{
              height: SCREEN_HEIGHT * 0.13,
              width: SCREEN_WIDTH * 0.1,
              top: SCREEN_WIDTH * 0.0,
              left: SCREEN_WIDTH * 0.0,
              transform: [
                { translateX: -SCREEN_WIDTH * 0.05 }, // Move anchor point left
                { translateY: -SCREEN_HEIGHT * 0.065 }, // Move anchor point up
                { rotate: rotateInterpolate }, // Apply rotation
                { translateX: SCREEN_WIDTH * 0.05 }, // Restore anchor point
                { translateY: SCREEN_HEIGHT * 0.065 }, // Restore anchor point
              ],
            }}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
       
        activeOpacity={0.9}
        style={{
         
          top: SCREEN_HEIGHT * -0.1,
          right: gifBellVisible ? SCREEN_WIDTH * 0.3 : SCREEN_WIDTH * 0.3,
          zIndex: 1,
          backgroundColor:'red'
        }}
      >
        {flowerVisible && (
          <Animated.Image
            source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/bbbell.png' }}
            style={{
              height: SCREEN_HEIGHT * 0.13,
              width: SCREEN_WIDTH * 0.1,
              position: 'absolute',
              top: SCREEN_WIDTH * 0.0,
              right: SCREEN_WIDTH * 0.0,
              transform: [
                { translateX: -SCREEN_WIDTH * 0.05 }, // Move anchor point left
                { translateY: -SCREEN_HEIGHT * 0.065 }, // Move anchor point up
                { rotate: rotateInterpolate }, // Apply rotation
                { translateX: SCREEN_WIDTH * 0.05 }, // Restore anchor point
                { translateY: SCREEN_HEIGHT * 0.065 }, // Restore anchor point
              ],
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch});

const mapStateToProps = state => ({ 
  flowerVisible: state.sanatan.flowerVisible,
  bellSound: state.sanatan.bellSound,
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayBell)

const styles = StyleSheet.create({})