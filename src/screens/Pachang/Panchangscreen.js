import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { RESPONSIVE_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH, } from '../../config/Screen'
import { useState } from 'react';
import { colors } from '../../config/Constants1';
import { Fonts } from '../../assets/style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import * as HomeActions from '../../redux/actions/HomeActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { FontsStyle, normalize } from '../../config/constants';
import { useTranslation } from 'react-i18next';


const Panchangscreen = ({ dispatch, NewPanchang, }) => {

    const [show, setShow] = useState(false);

    const [date, setDate] = useState(new Date());

    const {t} = useTranslation();

    const date_handle = (event, selectedDate) => {
        if (event.type === 'set') {
            const newDate = selectedDate || date;

            setShow(false);
            setDate(newDate);
            const day = newDate.getDate().toString();
            const month = (newDate.getMonth() + 1).toString();
            const year = newDate.getFullYear().toString();

            const payload = {
                day,
                month,
                year,
                lang: t("lang")
            };
            dispatch(KundliActions.getMyPanchang(payload));
        } else {
            setShow(false);
        }
    };


    const handleToday = () => {
        const newDate = new Date(); // आज की तारीख को सेट करें

        setDate(newDate); // स्टेट को अपडेट करें

        const day = newDate.getDate().toString();
        const month = (newDate.getMonth() + 1).toString();
        const year = newDate.getFullYear().toString();

        const payload = {
            day,
            month,
            year,
            lang: t("lang")
        };
        dispatch(KundliActions.getMyPanchang(payload));
    };

    const handleTomorrowClick = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // सिर्फ कल की तारीख सेट करें

        setDate(tomorrow); // स्टेट अपडेट करें

        const day = tomorrow.getDate().toString();
        const month = (tomorrow.getMonth() + 1).toString();
        const year = tomorrow.getFullYear().toString();

        const payload = {
            day,
            month,
            year,
            lang: t("lang")
        };
        dispatch(KundliActions.getMyPanchang(payload));
    };




    const renderItem = ({ item }) => {
        return (
            <View style={{ borderWidth: 1, paddingTop: SCREEN_HEIGHT * 0.005, width: SCREEN_WIDTH * 0.142, height: SCREEN_HEIGHT * 0.05, alignItems: "center", gap: 2, backgroundColor: colors.background_theme2, borderColor: colors.grey_color }}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: colors.black_color9 }}>{moment(item.title, 'DD/MM/YYYY').format('DD')}</Text>
                {/* <Text style={{ fontSize: 11, fontWeight: "500", color: colors.black_color9 }}>{item.event}</Text> */}
            </View>
        )
    }

    const [buttonStatus, setButtonStatus] = useState(true);
    return (

        <View
            style={{ flex: 1, backgroundColor: '#F8E8D9' }}

        >
            <ScrollView style={{}}>
                {/* {PachangPHOTO()} */}
                {buttons()}
            </ScrollView>
        </View>
    )


    function PachangPHOTO() {
        return (
            <View style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, paddingVertical: SCREEN_HEIGHT * 0.005 }}>
                <Image
                    style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, resizeMode: "contain" }}
                    source={require('../../assets/images/newpanchang.png')} />
            </View>
        )
    }



    function buttons() {
        return (
            <View>

                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.022, paddingTop: SCREEN_HEIGHT * 0.02 }}>
                    <View
                        style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            paddingVertical: 7,
                            borderRadius: 10,
                        }}>

                        <TouchableOpacity
                            onPress={() => setButtonStatus(true)}
                            style={{
                                elevation: 20,
                                width: SCREEN_WIDTH * 0.45,
                                height: SCREEN_HEIGHT * 0.05,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: buttonStatus

                                    ? colors.background_theme2
                                    : colors.background_theme1,
                            }}>
                            <Text allowFontScaling={false}
                                style={{
                                    fontSize: normalize(14),
                                    fontWeight: "500",
                                    color: buttonStatus
                                        ? colors.white_color
                                        : colors.black_color9,
                                    ...FontsStyle.fontfamily,
                                    fontWeight:'800'
                                }}>
                                {t("Daily")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setButtonStatus(false)}
                            style={{
                                borderRadius: 20,
                                elevation: 20,
                                width: SCREEN_WIDTH * 0.45,
                                height: SCREEN_HEIGHT * 0.05,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: !buttonStatus
                                    ? colors.background_theme2
                                    : colors.background_theme1,
                                    
                            }}>
                            <Text allowFontScaling={false}
                                style={{
                                    fontSize: normalize(14),
                                    fontWeight: "500",
                                    color: !buttonStatus
                                        ? colors.white_color
                                        : colors.black_color9,
                                        ...FontsStyle.fontfamily,
                                        fontWeight:'800'
                                }}>
                                {t("Monthly")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {buttonStatus ? (
                    <View style={{ height: "100%", width: '100%', paddingBottom: SCREEN_HEIGHT * 0.1 }}>


                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.015, paddingBottom: SCREEN_HEIGHT * 0.02 }}>

                            <TouchableOpacity
                                onPress={() => handleToday()}
                                style={{ borderWidth: 3, width: SCREEN_WIDTH * 0.15, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderRadius: 100, backgroundColor: colors.white_color, borderColor: colors.background_theme2 }}>
                                <Text style={{  fontWeight: "800", color: "black",...FontsStyle.fontfamily,fontSize: normalize(10) }}>{t("Today")}</Text>
                            </TouchableOpacity >
                            <TouchableOpacity
                                onPress={() => handleTomorrowClick()}
                                style={{ borderWidth: 3, width: SCREEN_WIDTH * 0.18, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderRadius: 100, backgroundColor: colors.white_color, borderColor: colors.background_theme2 }}>
                                <Text style={{ fontWeight: "800", color: "black",...FontsStyle.fontfamily ,fontSize: normalize(10)}}>{t("Tomorrow")}</Text>
                            </TouchableOpacity>



                            <View style={{ borderWidth: 1, alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.3, paddingVertical: SCREEN_HEIGHT * 0.016, borderRadius: 100, backgroundColor: colors.background_theme1, borderColor: colors.grey_color }}>

                                <Text style={{ fontSize: 13, fontWeight: "800", color: colors.background_theme2,...FontsStyle.fontfamily }}>
                                    {moment(date).format('DD-MM-YYYY')}
                                </Text>

                            </View>


                            <TouchableOpacity onPress={() => setShow(true)}>
                                <MaterialIcons name="date-range" size={25} color={'black'} />
                            </TouchableOpacity>

                            {show && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={date_handle}
                                />
                            )}

                        </View>

                        <View

                            style={{ flex: 0.8, paddingVertical: SCREEN_HEIGHT * 0.025, gap: SCREEN_HEIGHT * 0.02 }}>


                            <View>
                                <View style={{ alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.35, height: SCREEN_HEIGHT * 0.053, borderRadius: 100, backgroundColor: colors.background_theme1, alignSelf: "center", elevation: 20 , zIndex:1}}>
                                    <Text style={{ color: colors.background_theme2, fontWeight: "800", ...FontsStyle.fontfamily,fontSize: normalize(11) }}> {t(`${moment(date).format('dddd')}`)}</Text>
                                </View>

                                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, bottom: SCREEN_HEIGHT * 0.015 }}>
                                    <View style={{ backgroundColor: colors.white_color, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.02, }}>
                                        <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: colors.background_theme2, paddingHorizontal: SCREEN_WIDTH * 0.02, gap: 10, paddingBottom: SCREEN_HEIGHT * 0.02 }}>
                                            <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 100, }}>
                                                <Image
                                                    style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, resizeMode: "contain" }}
                                                    source={require('../../assets/images/rishi.png')} />
                                            </View>

                                            <View>
                                                <Text style={{ fontWeight: "800", color: colors.black_color9,...FontsStyle.fontfamily }}>{NewPanchang?.panchang?.tithi?.name} </Text>
                                                <Text style={{ fontWeight: "400", color: colors.black_color9,...FontsStyle.fontfamily}}>{NewPanchang?.panchang?.karan?.name}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: SCREEN_HEIGHT * 0.015 }}>
                                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                                <Text style={{ color: colors.black_color9,...FontsStyle.fontfamily }}>विशेष</Text>
                                                <Text style={{ color: colors.background_theme2, fontWeight: "700" ,...FontsStyle.fontfamily}}>{NewPanchang?.panchang?.yoga?.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                                <Text style={{ color: colors.black_color9,...FontsStyle.fontfamily }}>नक्षत्र</Text>
                                                <Text style={{ color: colors.background_theme2, fontWeight: "700",...FontsStyle.fontfamily }}>{NewPanchang?.panchang?.nakshatra?.name}</Text>
                                            </View>


                                        </View>

                                    </View>
                                </View>
                            </View>


                            <View>
                                <View style={{ alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.35, height: RESPONSIVE_HEIGHT(6), borderRadius: 100, backgroundColor: colors.background_theme1, alignSelf: "center", elevation: 20,zIndex:1 }}>
                                    <Text style={{ ...FontsStyle.fontfamily,fontWeight:'bold', color: colors.background_theme2 }}>{t("Muhurat")}</Text>
                                </View>

                                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, bottom: SCREEN_HEIGHT * 0.015 }}>
                                    <View style={{ backgroundColor: colors.white_color, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.02, }}>


                                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.015 }}>

                                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly" }}>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={styles.commanText}>{t("Abhijeet Muhurata")}</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={[styles.commanText, { color: 'black' }]}>
                                                            {NewPanchang?.panchang?.abhijitkal}
                                                        </Text>
                                                    </View>

                                                </View>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={styles.commanText}>{t("Gulik period")}</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={[styles.commanText, { color: 'black' }]}>
                                                            {NewPanchang?.panchang?.gulika}
                                                        </Text>
                                                    </View>

                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly" }}>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={styles.commanText}>{t("Rahukaal")}</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={[styles.commanText, { color: 'black' }]}>
                                                            {NewPanchang?.panchang?.rahukal}
                                                        </Text>
                                                    </View>

                                                </View>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={styles.commanText}>{t("Yamghantak")}</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={[styles.commanText, { color: 'black' }]}>
                                                            {NewPanchang?.panchang?.yamganda}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View >
                    </View>
                ) : (
                    <View
                        style={{ flex: 1, paddingVertical: SCREEN_HEIGHT * 0.01, paddingBottom: SCREEN_HEIGHT * 0.1 }}>

                        <View style={{ gap: 10, paddingVertical: SCREEN_HEIGHT * 0.025, backgroundColor: colors.background_theme2, }}>

                            <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingHorizontal: SCREEN_WIDTH * 0.05 }}>
                                <View style={{ flexDirection: "row", gap: 13 }}>
                                    <Image
                                        style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, resizeMode: "contain" }}
                                        source={require('../../assets/images/rishi.png')} />
                                </View>

                                <View style={{ alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.1, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 50, color: colors.white_color, fontWeight: "500" }}>{moment(new Date()).format("DD")}</Text>
                                    <View style={{ paddingLeft: SCREEN_WIDTH * 0.02, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "450" }}>{moment(new Date()).format("dddd")}</Text>
                                        <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "450" }}>{moment(new Date()).format("MMMM")}</Text>
                                        <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "450" }}>{moment(new Date()).format("YYYY")}</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.04 }}>

                                <View>
                                    <Text style={{ fontSize: 12, color: colors.white_color, fontWeight: "400" }}>{t("sunrise")}: {NewPanchang?.panchang?.sunrise}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, color: colors.white_color, fontWeight: "400" }}>{t("sunset")}: {NewPanchang?.panchang?.sunset}</Text>
                                </View>
                            </View>
                        </View>

                        {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: SCREEN_HEIGHT * 0.015 }}>

                            <TouchableOpacity onPress={() => handleMonthPrevious()}>
                                <AntDesign name='left' color={'white'} size={25} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 15, color: colors.white_color, fontWeight: "500" }}>{moment(month).format("MMMM")}</Text>

                            <TouchableOpacity onPress={() => handleMonthNext()}>
                                <AntDesign name='right' color={'white'} size={25} />
                            </TouchableOpacity>

                        </View> */}

                        {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: SCREEN_HEIGHT * 0.015, backgroundColor: colors.background_theme2 }}>

                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Sunday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Monday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Tuseday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Wednesday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Thurday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Friday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Saturday</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: SCREEN_HEIGHT * 0.01 }}>
                            <FlatList
                                data={PanchangData}
                                renderItem={renderItem}
                                numColumns={7}
                                keyExtractor={(item) => item.id} />


                        </View> */}

                        <TouchableOpacity
                            onPress={() => dispatch(KundliActions.getPanchangMonthly({ lang: t('lang')}))}
                            style={{ alignItems: "center", justifyContent: "center", alignSelf: 'center', backgroundColor: colors.background_theme2, marginTop: SCREEN_HEIGHT * 0.02, borderRadius: 100, paddingHorizontal: SCREEN_WIDTH * 0.3 }}>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: colors.white_color, paddingHorizontal: SCREEN_WIDTH * 0.04, paddingVertical: SCREEN_HEIGHT * 0.015 }}>{t("Yearly Festival")}</Text>
                        </TouchableOpacity>


                    </View>
                )}

            </View>
        )
    }



}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    muhuratDD: state.kundli.muhuratDD,
    Panchang: state.kundli.Panchang,
    PanchangData: state.kundli.PanchangData,
    getabhijitdata: state.home.getabhijitdata,
    getdurmuhurtdata: state.home.getdurmuhurtdata,
    getgulikdata: state.home.getgulikdata,
    getyamgantakdata: state.home.getyamgantakdata,
    NewPanchang: state.kundli.NewPanchang,
})
export default connect(mapStateToProps, mapDispatchToProps)(Panchangscreen)

const styles = StyleSheet.create({
    commanText: {
        ...FontsStyle.fontfamily,
        color: 'white',
        fontSize:normalize(11)
    }
})