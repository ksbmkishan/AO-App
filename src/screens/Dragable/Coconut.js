import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Sound from 'react-native-sound';
import Animated, { useSharedValue, useAnimatedStyle, withTiming ,withRepeat } from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';

const Coconut = () => {
    const [btnclick3, SetBtnclick3] = useState(false);
    const animation4 = useSharedValue(0);

 
    

    const startAnimation3 = () => {

        

     
        animation4.value = withTiming(1, { duration: 1000 });
    };

    const stopAnimation3 = () => {
   
        animation4.value = 0;
    };

    const toggleAnimation3= () => {
        if (btnclick3) {
            stopAnimation3();
        } else {
            startAnimation3();
        }
        SetBtnclick3(!btnclick3);
    };

    const AnimatedStyle4 = useAnimatedStyle(() => ({
        transform: [
            
            
           
            { translateY: animation4.value * 500 },
           { rotate: `${animation4.value * -80}deg` },





        ],
    }));
    const AnimatedStyle5 = useAnimatedStyle(() => ({
        transform: [
            
            
           
            { translateY: animation4.value * 500 },
           { rotate: `${animation4.value * 120}deg` },





        ],
    }));
    const AnimatedStyle6 = useAnimatedStyle(() => ({
        transform: [
            
            
           
            { translateY: animation4.value * 500 },
           { rotate: `${animation4.value * 90}deg` },





        ],
    }));
    const AnimatedStyle7 = useAnimatedStyle(() => ({
        transform: [
            
            
           
            { translateY: animation4.value * 500 },
           { rotate: `${animation4.value * 140}deg` },





        ],
    }));

    return (
        <View style={{ flex: 1, borderWidth: 1 }}>
            <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.4 }}>

        <View style={{flexDirection:"row",gap:100}}>
                <View style={{gap:10}}>
                <Animated.View style={AnimatedStyle4}>
                    <View>
                        <Image
                            style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                            source={require('../../assets/images/flower1.png')}
                        />
                        
                    </View>
                </Animated.View>

                <Animated.View style={AnimatedStyle5}>
                    <View>
                        <Image
                            style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                            source={require('../../assets/images/flower1.png')}
                        />
                        
                    </View>
                </Animated.View>

                </View>


                <View>
                <Animated.View style={AnimatedStyle6}>
                    <View>
                        <Image
                            style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                            source={require('../../assets/images/flower1.png')}
                        />
                        
                    </View>
                </Animated.View>
                </View>

                <View style={{gap:10}}>
                <Animated.View style={AnimatedStyle7}>
                    <View>
                        <Image
                            style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                            source={require('../../assets/images/flower1.png')}
                        />
                        
                    </View>
                </Animated.View>

                <Animated.View style={AnimatedStyle4}>
                    <View>
                        <Image
                            style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                            source={require('../../assets/images/flower1.png')}
                        />
                        
                    </View>
                </Animated.View>

                </View>
                </View>

                <TouchableOpacity
                    onPress={toggleAnimation3}
                    style={{ borderWidth: 1, width: 50, alignItems: "center" }}
                >
                    <Text>{btnclick3 ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Coconut;

const styles = StyleSheet.create({});
