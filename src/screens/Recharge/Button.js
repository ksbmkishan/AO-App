import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Sizes } from '../../assets/style';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SCREEN_WIDTH } from '../../config/Screen';
import { getFontSize } from '../../config/Constants1';


const Button = ({ onPress, title, style, styletxt }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...style }} activeOpacity={0.8}>
            <LinearGradient
                colors={['#002E6E', '#00B9F1', '#002E6E']}
                style={[styles.button,]}
                start={{ x: 0.5, y: 0.3 }}
                end={{ x: 1, y: 0.2 }}
            >
                <Text style={[styles.buttonText, styletxt]}>{title}</Text>
                <Image source={require('../../assets/images/btndownimage.png')} style={{ height: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH, resizeMode: 'cover', position: 'absolute', bottom: 0 }} />
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        paddingVertical: Sizes.fixPadding * 1.1,
        borderRadius: Sizes.fixPadding * 0.4,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: getFontSize(2),
        fontFamily: 'Montserrat-Regular'
    },
})