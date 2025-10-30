import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Sound from 'react-native-sound';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';

const Artithali = () => {
    const [btnclick, SetBtnclick] = useState(false);
    const animation = useSharedValue(0);

    const sound = new Sound('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/temple_aarti_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log("Failed to load the sound", error);
            return;
        }
    });

    const startAnimation2 = () => {
        animation.value = withRepeat(withTiming(1, { duration: 3000 }), -1, false);
    };

    const stopAnimation2 = () => {
        animation.value = 0;
        sound.stop();
    };

    const toggleAnimation2 = () => {
        if (btnclick) {
            stopAnimation2();
        } else {
            startAnimation2();
            sound.play();
        }
        SetBtnclick(!btnclick);
    };

    const AnimatedStyle3 = useAnimatedStyle(() => ({
        transform: [
            { translateY: animation.value * -70 },
            { rotate: `${animation.value * -650}deg` },
            { translateX: animation.value * 140 },
        ],
    }));

    const innerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: animation.value * -70 },
            { rotate: `${animation.value * 650}deg` },
            { translateX: animation.value * -240 },
        ],
    }));

    return (
        <View style={{ flex: 1, borderWidth: 1 }}>
            <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.4 }}>
                <Animated.View style={AnimatedStyle3}>
                    <Animated.View style={innerAnimatedStyle}>
                        <View style={{left:SCREEN_WIDTH*0.4 }}>
                            <Image
                                style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2 }}
                                source={require('../../assets/images/AARTITHALI.png')}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>

                <TouchableOpacity
                    onPress={toggleAnimation2}
                    style={{ borderWidth: 1, width: 50, alignItems: "center" }}
                >
                    <Text>{btnclick ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Artithali;

const styles = StyleSheet.create({});
