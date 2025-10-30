import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { connect } from 'react-redux';
import { new_img_url } from '../../../config/Constants1';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';

const Mythali = ({rotateVisible ,normalVisible,mythaliData,spinValue ,normalGif}) => {

     const refRBSheet = useRef(null);
     const scaleValue = useRef(new Animated.Value(1)).current;

     console.log('NA :::: ', rotateVisible, normalVisible);

     const spin = spinValue.interpolate({
             inputRange: [0, 2],
             outputRange: ['0deg', '720deg'],
         });
     
         const spin1 = spinValue.interpolate({
             inputRange: [0, 2],
             outputRange: ['0deg', '-720deg'],
         });
     
         // Define style for animated image
         const animatedImageStyle = {
     
             width: 100,
             height: 100,
             objectFit: "contain",
             // transformOrigin: 'center center',
             transform: [
                 { scale: scaleValue },
                 { rotate: spin1 }
             ],
         };
     
         const animatedViewStyle = {
             transform: [
                 { rotate: spin },
                 { translateX: -60 },
                 { translateY: -60 },
     
             ],
             width: 100,
             height: 50,
             marginTop: responsiveScreenHeight(110),
             marginLeft: responsiveScreenWidth(0),
             zIndex:100,
             alignItems: 'center',
         };

         console.log('Normal :: ', normalVisible,rotateVisible,normalGif )

    return (
        <View style={{ position: 'relative', zIndex: 100 }}>
            {normalVisible && !rotateVisible && !normalGif && (
                <TouchableOpacity
                    style={styles.thaliView}
                    onPress={() => {
                        refRBSheet.current?.open();

                    }}
                >
                    <Image source={mythaliData != null ? {uri: mythaliData} :  {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/thalinew.gif'}}
                        style={{
                            width: SCREEN_WIDTH * 0.16,
                            height: SCREEN_HEIGHT * 0.16,
                            objectFit: "contain",
                            position: "absolute",
                            bottom: responsiveScreenHeight(-20),
                        }}
                    />

                </TouchableOpacity>
            )}

            {!normalVisible && normalGif && !rotateVisible && <TouchableOpacity
                    style={styles.thaliView}
                    onPress={() => {
                        refRBSheet.current?.open();

                    }}
                >
                    <Image source={{uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/thalinew.gif'}}
                        style={{
                            width: 100,
                            height: 100,
                            objectFit: "contain",
                            position: "absolute",
                            bottom: responsiveScreenHeight(-20),
                        }}
                    />

                </TouchableOpacity>}

            {rotateVisible && (
                <TouchableOpacity
                    style={styles.thaliView}
                    // onPress={handlePress}
                    onPress={() => {
                        refRBSheet.current?.open();
                    }}
                >

                    <Animated.View style={animatedViewStyle}>
                        <Animated.Image
                            source={mythaliData ? { uri: mythaliData } : require('../../../assets/images/AARTITHALI.png')}
                            style={animatedImageStyle} // Apply rotation only to the image
                        />
                    </Animated.View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    normalVisible: state.sanatan.normalVisible,
    rotateVisible: state.sanatan.rotateVisible,
    mythaliData: state.sanatan.mythaliData,
    normalGif: state.sanatan.normalGif
})

export default connect(mapStateToProps,mapDispatchToProps)(Mythali)

const styles = StyleSheet.create({
    thaliView: {
        // Ensure the view is centered on the screen initially
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        top: SCREEN_HEIGHT * -0.32,
        zIndex:10000
    },
    thali: {
        width: 100, // Initial size of the thali
        height: 100, // Initial size of the thali
    },
})