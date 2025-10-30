import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import MyHeader from "../../components/MyHeader";
import { useTranslation } from "react-i18next";
import { colors, getFontSize } from "../../config/Constants1";
import NetInfo from '@react-native-community/netinfo';
import AutoScrolling from 'react-native-auto-scrolling';
import TextTicker from 'react-native-text-ticker'

const { width, height } = Dimensions.get('screen');



const Year = (props) => {


    const { t } = useTranslation();

    const data = [];


    useEffect(() => {

        props.navigation.setOptions({
            header: () => (
                <MyHeader
                    title={t("astro_companion")}
                    socialIcons={false}
                    navigation={props.navigation}
                    statusBar={{
                        backgroundColor: colors.background_theme2,
                        barStyle: 'light-content',
                    }}
                />
            ),
        });

    }, []);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener(state => {
            const conn = state.isConnected; //boolean value whether internet connected or not
            console.log("Connection type", state.type); //gives the connection type
            !conn ? alert("No Internet Connection!") : null; //alert if internet not connected
        });

        return () => removeNetInfoSubscription();
    });

    const get_horoscope_data = (item) => {
        props.navigation.navigate('yeardocuments', { select: item?.name, head: item?.text, type: item?.type });
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => get_horoscope_data(item)} style={styles.button}>
                            <Image source={item.images} style={styles.imgage} />

                            <Text allowFontScaling={false}

                                style={styles.text}
                            >
                                {item.text}
                            </Text>

                        </TouchableOpacity>
                    )}
                />

            </View>
        </View>
    )
}


export default Year;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4
    },
    row: {

        flex: 1,
        width: '95%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    imgage: {
        width: width * 0.15,
        height: width * 0.15,
        resizeMode: 'contain',

    },
    button: {
        width: width * 0.28,
        height: width * 0.28,
        backgroundColor: colors.background_theme1,
        margin: width * 0.018,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: colors.black_color2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'hidden'

    },
    text: {
        fontSize: getFontSize(1.4),
        fontWeight: '700',
        textAlign: 'center',
        width: '100%'
    },
    scrolling2: {



    },
})