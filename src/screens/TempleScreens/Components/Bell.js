import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as SanatanActions from '../../../redux/actions/sanatanActions';
import { RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import Sound from 'react-native-sound';

const Bell = ({ dispatch, gifBellVisible, imageBellVisible, imageBellVisible1, gifBellVisible1, bellSound, bellSound2 }) => {

  useEffect(() => {
    const sound = new Sound('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/bell_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading sound:', error);
      }
    });

    dispatch(SanatanActions.setSantanAudioBell(sound));
    dispatch(SanatanActions.setSantanAudioBell2(sound));

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotateAnim2 = useRef(new Animated.Value(0)).current;

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

  const startAnimation2 = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim2, {
          toValue: 1, // Rotate right (20°)
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim2, {
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

  const rotateInterpolate2 = rotateAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '10deg'],
  });


  const handleBellSound = () => {
    console.log('BBBBBBBB')
    bellSound.stop();
    startAnimation();
    dispatch(SanatanActions.getSantanSoundBell(rotateAnim));
    if (bellSound) {
      bellSound.play((success) => {
        if (success) {
          console.log('Success Audio');
        } else {
          console.log("Success Failed");
        }
      })
    }
  }

  const handleBellSound2 = () => {
    console.log('aaaaaaaaaa')
    bellSound2.stop();
    startAnimation2();
    dispatch(SanatanActions.getSantanSoundBell2());
    if (bellSound2) {
      bellSound2.play((success) => {
        if (success) {
          console.log('Success Audio');
        } else {
          console.log("Success Failed");
        }
      })
    }
  }

  return (
    <View style={{ zIndex: 2, right: 0, left: 0, flexDirection: 'row', position: 'absolute', top: RESPONSIVE_HEIGHT(42), alignSelf: 'center', justifyContent: 'space-between', overflow: 'hidden',paddingHorizontal:RESPONSIVE_WIDTH(70) }}

    >

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleBellSound()}
        style={{
          top: SCREEN_HEIGHT * -0.018,
          // left: gifBellVisible ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH * 0.5,
          zIndex: 1,
        }}

      >
        {gifBellVisible && (
          <Animated.Image
            source={{ uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/bbbell.png'}}
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
        {imageBellVisible && (

          <Image
            source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/bbbell.png'}}
            style={{
              height: SCREEN_HEIGHT * 0.13,
              width: SCREEN_WIDTH * 0.1,
              objectFit: "contain",
            }}
          />
        )}

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleBellSound2()}
        activeOpacity={0.9}
        style={{
          top: SCREEN_HEIGHT * -0.02,
          // right: gifBellVisible ? SCREEN_WIDTH * 0.22 : SCREEN_WIDTH * 0.22,
          zIndex: 1,
        }}
      >
        {gifBellVisible1 && (
          <Animated.Image
            source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/bbbell.png'}}
            style={{
              height: SCREEN_HEIGHT * 0.13,
              width: SCREEN_WIDTH * 0.1,
              top: SCREEN_WIDTH * 0.0,
              transform: [
                { translateX: -SCREEN_WIDTH * 0.05 }, // Move anchor point left
                { translateY: -SCREEN_HEIGHT * 0.065 }, // Move anchor point up
                { rotate: rotateInterpolate2 }, // Apply rotation
                { translateX: SCREEN_WIDTH * 0.05 }, // Restore anchor point
                { translateY: SCREEN_HEIGHT * 0.065 }, // Restore anchor point
              ],
            }}
          />
        )}
        {imageBellVisible1 && (
          <Image source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/bbbell.png' }}
            style={{
              height: SCREEN_HEIGHT * 0.13,
              width: SCREEN_WIDTH * 0.1,
              objectFit: "contain",
            }}
          />

        )}
      </TouchableOpacity>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
  gifBellVisible: state.sanatan.gifBellVisible,
  imageBellVisible: state.sanatan.imageBellVisible,
  imageBellVisible1: state.sanatan.imageBellVisible1,
  gifBellVisible1: state.sanatan.gifBellVisible1,
  bellSound: state.sanatan.bellSound,
  bellSound2: state.sanatan.bellSound2,
})

export default connect(mapStateToProps, mapDispatchToProps)(Bell)

const styles = StyleSheet.create({})