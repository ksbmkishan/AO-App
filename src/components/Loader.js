import { View, Modal, Animated, Easing, Image } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../config/Constants1';
import FastImage from '@d11/react-native-fast-image';
import { useSelector } from 'react-redux';
import { Fonts, Sizes } from '../assets/style';
import { useTranslation } from 'react-i18next';

const Loader = props => {
  const fadeAnim = new Animated.Value(0); // Initial value for opacity

  const {t} = useTranslation();
  // Animated values for text visibility
  const fadeAnim1 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim2 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim3 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Sequence animation for the text
    Animated.sequence([
      // --- fadeAnim1 ---
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(fadeAnim1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),

      // --- fadeAnim2 ---
      Animated.delay(500),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),

      // --- fadeAnim3 ---
      Animated.delay(500),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(fadeAnim3, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

  }, []);

  useEffect(() => {
    const animate = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };

    animate();
    return () => { };
  }, [fadeAnim]);

  return (
    <Modal visible={props.isVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background_theme2 + '10',
        }}
      >
        <Animated.View
          style={{

            borderRadius: 1000,
            padding: 10,
            opacity: fadeAnim,
          }}
        >
          <Image
            style={{
              width: 120,
              height: 120,
              objectFit: 'contain',
            }}
            source={require('../assets/images/om.gif')}
          />
        </Animated.View>
        <Animated.Text
          style={[
            { ...Fonts.PoppinsBold },
            { opacity: fadeAnim1, fontSize: Sizes.large },
          ]}
        >
          {t("Be Ready!")}
        </Animated.Text>
        <Animated.Text
          style={[
            { ...Fonts.PoppinsBold },
            { opacity: fadeAnim2, fontSize: Sizes.large },
          ]}
        >
          {t("Aligning the Stars and Blessings for You.")}
        </Animated.Text>
        <Animated.Text
          style={[
            { ...Fonts.PoppinsBold },
            { opacity: fadeAnim3, fontSize: Sizes.large },
          ]}
        >
          {t("Your Destiny is About to Change.")}
        </Animated.Text>
      </View>
    </Modal>
  );
};

export default Loader;