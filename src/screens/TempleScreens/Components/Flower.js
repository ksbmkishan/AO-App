import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../config/Screen';
import {new_img_url} from '../../../config/Constants1';
import Sound from 'react-native-sound';

const Flower = ({flowerVisible, showShowerVisible, flowerImage}) => {
  const [chunniSound, setChunniSound] = useState(null);

  const flowers = Array.from({length: 20}, () => ({
    translateY: new Animated.Value(-100), // Start above the screen
    left: Math.random() * SCREEN_WIDTH, // Random horizontal position
  }));

  useEffect(() => {
    const sound = new Sound('chuni.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setChunniSound(sound);
    });

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  console.log('Chunni :: ', chunniSound)

  useEffect(() => {
    if (chunniSound) {
      chunniSound.setNumberOfLoops(-1); // **Infinite loop (auto repeat)**
  
      if (showShowerVisible) {
        chunniSound.stop(() => {
          chunniSound.setCurrentTime(0); // **साउंड को रीसेट करें**
          chunniSound.play(); // **फिर से प्ले करें**
        });
      } else {
        chunniSound.stop();
      }
    }
  }, [showShowerVisible, chunniSound]);  // **showShowerVisible को dependency में रखें**
  

  useEffect(() => {

    flowers.forEach(flower => {
      const animateFlower = () => {
        flower.translateY.setValue(-100); // Reset to top
        flower.left = Math.random() * SCREEN_WIDTH; // Randomize horizontal position

        Animated.timing(flower.translateY, {
          toValue: SCREEN_HEIGHT + 100, // Move to below the screen
          duration: 3000 + Math.random() * 3000, // Randomize speed
          useNativeDriver: true,
        }).start(() => animateFlower()); // Loop animation
      };

      if (showShowerVisible) {
        animateFlower();
      }
    });

    return () => {
      flowers.forEach(flower => {
        flower.translateY.stopAnimation();
      });
    };
  }, [showShowerVisible]);

  return (
    <View style={{width: SCREEN_WIDTH, position: 'absolute', top: 100}}>
      {flowerVisible && (
        <LottieView
          source={require('../../../assets/lottie/flower.json')}
          autoPlay
          loop
          style={{
            position: 'absolute',
            top: SCREEN_HEIGHT * -0.1,
            zIndex: 9999,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
        />
      )}
      <View
        style={{
          top: SCREEN_HEIGHT * 0.15,
        }}>
        {showShowerVisible &&
          flowers.map((flower, index) => (
            <Animated.Image
              key={index}
              source={{uri:  flowerImage}}
              style={[
                styles.flower,
                {
                  transform: [{translateY: flower.translateY}],
                  left: flower.left,
                },
              ]}
            />
          ))}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  flowerVisible: state.sanatan.flowerVisible,
  showShowerVisible: state.sanatan.showShowerVisible,
  flowerImage: state.sanatan.flowerImage,
});

export default connect(mapStateToProps, null)(Flower);

const styles = StyleSheet.create({
  flower: {
    width: 30,
    height: 30,
    zIndex: 999,
    objectFit: 'contain',
  },
});
