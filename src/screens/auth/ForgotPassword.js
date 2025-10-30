import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import Icon from 'react-native-vector-icons/FontAwesome'
import { responsiveFontSize, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { launchCamera } from 'react-native-image-picker';

const ForgotPassword = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryTheme }}>
            <StatusBar backgroundColor={Colors.primaryTheme} barStyle={'dark-content'} />
            <View style={{ paddingHorizontal: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ marginTop: SCREEN_HEIGHT * 0.04 }}>
                    <Text style={styles.txt}>Forgot Password</Text>
                </View>
                <View style={styles.container}>
                    <View style={{  }}>
                        <Text style={styles.txt1}>Enter email to get new password</Text>
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_HEIGHT * 0.03,}}>
                        <View style={styles.txtInp}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={Colors.lightBlack}
                                style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                    color: 'black',
                                }}
                                maxLength={10}
                                keyboardType="email-address"
                                selectionColor={Colors.lightBlack}
                            />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.06,  }}>
                        <TouchableOpacity style={{ paddingVertical: SCREEN_HEIGHT * 0.0142, borderRadius: 50, alignItems: 'center', backgroundColor: Colors.primaryTheme }}>
                            <Text style={{ color: Colors.white, fontSize: responsiveScreenFontSize(2.1), fontWeight: "480" }}>Get Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    txt: {
        alignSelf: 'center',
        fontWeight: "400",
        color: Colors.white,
        fontSize: 20
    },
    container: {
        backgroundColor: Colors.white,
      paddingTop:SCREEN_HEIGHT*0.02,
      paddingBottom:SCREEN_HEIGHT*0.05,
        borderRadius: 20,
        marginTop: SCREEN_HEIGHT * 0.02,
        // height: SCREEN_HEIGHT * 0.4
        gap:SCREEN_HEIGHT*0.04,
        paddingHorizontal:SCREEN_HEIGHT*0.013
    },
    txt1: {
        alignSelf: 'center',
        fontWeight:"500",
        color: Colors.primaryTheme,
        fontSize: responsiveScreenFontSize(2),
        elevation: 3
    },
    txtInp: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:SCREEN_WIDTH*0.03
    }
})