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

const HomeSimmer = props => {

  const {t} = useTranslation();
  const avatarRef = React.createRef();
  const firstLineRef = React.createRef();
  const secondLineRef = React.createRef();
  const thirdLineRef = React.createRef();
  const fourthLineRef = React.createRef();
  const fifthLineRef = React.createRef();

  // Animated values for text visibility
  const fadeAnim1 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim2 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim3 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const facebookAnimated = Animated.stagger(400, [
      Animated.delay(500),
      avatarRef.current.getAnimated(),
      Animated.parallel([
        Animated.delay(500),
        firstLineRef.current.getAnimated(),
        secondLineRef.current.getAnimated(),
        thirdLineRef.current.getAnimated(),
        fourthLineRef.current.getAnimated(),
        fifthLineRef.current.getAnimated(),
      ]),
    ]);

    Animated.loop(facebookAnimated).start();

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
    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
      }}
    >
      <View style={{}}>
        <ShimmerPlaceholder
          visible={props.isLoading}
          ref={avatarRef}
          stopAutoRun
          style={{
            width: width * 0.9,
            height: width * 0.5,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            bottom: SCREEN_HEIGHT * 0.23,
            alignItems: 'center',
            justifyContent: 'center',
            gap: SCREEN_HEIGHT * 0.02,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SCREEN_WIDTH * 0.02,
            }}
          >
            <ShimmerPlaceholder
              ref={firstLineRef}
              visible={props.isLoading}
              stopAutoRun
              style={{
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.1,
                borderRadius: 10,
              }}
            />

            <ShimmerPlaceholder
              ref={secondLineRef}
              visible={props.isLoading}
              stopAutoRun
              style={{
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.1,
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SCREEN_WIDTH * 0.02,
            }}
          >
            <ShimmerPlaceholder
              ref={thirdLineRef}
              visible={props.isLoading}
              stopAutoRun
              style={{
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.1,
                borderRadius: 10,
              }}
            />

            <ShimmerPlaceholder
              ref={fourthLineRef}
              visible={props.isLoading}
              stopAutoRun
              style={{
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.1,
                borderRadius: 10,
              }}
            />
          </View>
        </View>

        <View style={{ bottom: SCREEN_HEIGHT * 0.12 }}>
          <ShimmerPlaceholder
            ref={fifthLineRef}
            visible={props.isLoading}
            stopAutoRun
            style={{
              width: SCREEN_WIDTH * 0.9,
              height: SCREEN_HEIGHT * 0.23,
              borderRadius: 10,
            }}
          />

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              bottom: SCREEN_HEIGHT * 0.3,
            }}
          >
            <Animated.Image
              source={require('../assets/images/om.gif')}
              style={{width:100,height:100}}
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SCREEN_WIDTH * 0.02,
            bottom: SCREEN_HEIGHT * 0.1,
          }}
        >
          <ShimmerPlaceholder
            ref={firstLineRef}
            visible={props.isLoading}
            stopAutoRun
            style={{
              width: SCREEN_WIDTH * 0.5,
              height: SCREEN_HEIGHT * 0.6,
              borderRadius: 20,
            }}
          />

          <ShimmerPlaceholder
            ref={secondLineRef}
            visible={props.isLoading}
            stopAutoRun
            style={{
              width: SCREEN_WIDTH * 0.5,
              height: SCREEN_HEIGHT * 0.6,
              borderRadius: 20,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeSimmer;
