import { View, Text, Animated, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, Sizes } from '../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { colors } from '../config/Constants1';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const SantanSimmer = props => {

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


  return (

    <View style={{ flex: 1, backgroundColor: 'white' }}>


      <View
        style={{
          alignItems: 'center',
          alignSelf:'center',
          top:SCREEN_HEIGHT * 0.4,
          width:SCREEN_WIDTH
        }}
      >
        <Animated.Image
          source={require('../assets/images/om.gif')}
          style={{ width: 100, height: 100 }}
        />

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


    </View>
  );
};

export default SantanSimmer;
