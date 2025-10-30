import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../config/Screen';

const AnimatedCoconut = () => {
    const leftCoconutTranslateX = useRef(new Animated.Value(-200)).current; // Left coconut horizontal movement
    const leftCoconutRotate = useRef(new Animated.Value(0)).current; // Left coconut rotation

    const rightCoconutTranslateX = useRef(new Animated.Value(-200)).current; // Right coconut horizontal movement
    const rightCoconutRotate = useRef(new Animated.Value(0)).current; // Right coconut rotation

    useEffect(() => {
        // Left Coconut Animation (Move and Rotate)
        Animated.loop(
            Animated.sequence([
                // Horizontal move without rotation for 5 seconds
                Animated.timing(leftCoconutTranslateX, {
                    toValue: SCREEN_WIDTH * 0.1, // Center of the screen
                    duration: 3000, // 5 seconds
                    useNativeDriver: true,
                }),
                // Rotation after horizontal move for 5 seconds
                Animated.timing(leftCoconutRotate, {
                    toValue: 1, // Rotate to 100 degrees
                    duration: 3000, // Rotate for 5 seconds
                    useNativeDriver: true,
                }),
                // Reset position and rotation after animation
                Animated.timing(leftCoconutTranslateX, {
                    toValue: -100,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(leftCoconutRotate, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Right Coconut Animation (Move and Rotate)
        Animated.loop(
            Animated.sequence([
                // Horizontal move without rotation for 5 seconds
                Animated.timing(rightCoconutTranslateX, {
                    toValue: SCREEN_WIDTH * 0.1, // Center of the screen
                    duration: 3000, // 5 seconds
                    useNativeDriver: true,
                }),
                // Rotation after horizontal move for 5 seconds
                Animated.timing(rightCoconutRotate, {
                    toValue: 1, // Rotate to -100 degrees
                    duration: 3000, // Rotate for 5 seconds
                    useNativeDriver: true,
                }),
                // Reset position and rotation after animation
                Animated.timing(rightCoconutTranslateX, {
                    toValue: -100,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(rightCoconutRotate, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Rotation Interpolations
    const leftRotateInterpolation = leftCoconutRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-80deg'], // Rotate from 0 to 100 degrees
    });

    const rightRotateInterpolation = rightCoconutRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '80deg'], // Rotate from 0 to -100 degrees
    });

    return (
        <View style={styles.container}>
            {/* Left Coconut */}
            <Animated.Image
                source={require('../../assets/images/coconut_left.webp')} // Replace with your image
                style={[
                    styles.coconut,
                    {
                        transform: [
                            { translateX: leftCoconutTranslateX },
                            { rotate: leftRotateInterpolation },
                        ],
                        top: SCREEN_HEIGHT * 0.3, // Adjust vertical position
                    },
                ]}
            />

            {/* Right Coconut */}
            <Animated.Image
                source={require('../../assets/images/coconut_right.webp')} // Replace with your image
                style={[
                    styles.coconut,
                    {
                        transform: [
                            { translateX: rightCoconutTranslateX },
                            { rotate: rightRotateInterpolation },
                        ],
                        top: SCREEN_HEIGHT * 0.3,
                        left: SCREEN_WIDTH * 0.07, // Adjust horizontal position
                    },
                ]}
            />
        </View>
    );
};

export default AnimatedCoconut;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        position: 'absolute',
        left:SCREEN_WIDTH * 0.3,
        zIndex:50,
        height:SCREEN_HEIGHT,
        top:SCREEN_HEIGHT * 0.2
        
    },
    coconut: {
        width: 40, // Adjust coconut image size
        height: 40,
        position: 'absolute',
        resizeMode: 'contain',
    },
});
