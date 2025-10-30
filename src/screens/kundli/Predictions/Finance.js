import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { t } from 'i18next';
import { colors } from '../../../config/Constants1';
import RenderHTML from 'react-native-render-html';
import { FontsStyle } from '../../../config/constants';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
const { TTSModule } = NativeModules;

const Finance = ({ basicDetails, dispatch, FinancejiData, MYlagnaCHART, MyCuspsData }) => {
    const { i18n } = useTranslation();

    console.log("MyCusspsData", MyCuspsData)
    const [isSpeaking, setIsSpeaking] = useState(false);

    const stripHtml = (html) => {
        if (!html) return '';
        // Replace tags with space and collapse multiple spaces
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };

    useEffect(() => {
        return () => {
            // ✅ jaise hi page se bahar jaoge, speech band ho jayegi
            TTSModule.stop();
            setIsSpeaking(false);
        };
    }, []);

    const getFullSpeechText = (data) => {
        if (!data) return '';
        const fields = ['quote', 'traits', 'sources', 'dos', 'donts', 'shine', 'caution', 'wisdom', 'remedy'];
        let text = '';
        fields.forEach(f => {
            if (data[f]) text += stripHtml(data[f]) + '. ';
        });
        return text.trim();
    };


    useEffect(() => {

        const payload2 = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place
        }
        dispatch(KundliActions.getKpCuspsData(payload2))
    }, [dispatch])

    const house2 = Array.isArray(MyCuspsData)
        ? MyCuspsData.find(item => item.house === 2)
        : null;

    console.log("House 2 Sign Lord:", house2?.signLord);










    const planetAliasMap = {
        su: 'sun', mo: 'moon', ma: 'mars', me: 'mercury', ju: 'jupiter', ve: 'venus', sa: 'saturn', ra: 'rahu', ke: 'ketu',
        सू: 'sun', चं: 'moon', मं: 'mars', बु: 'mercury', बृ: 'jupiter', शु: 'venus',शुक्र: 'venus', श: 'saturn' , रा: 'rahu' , के: 'ketu'
    };

     const plantName = {
        सूर्य: 'sun', चंद्र: 'moon', मंगल: 'mars', बुध: 'mercury', गुरु: 'jupiter', शुक्र: 'venus', शनि: 'saturn', राहु: 'rahu', केतु: 'ketu'
    }
    const secondHousePlanetShort = MYlagnaCHART?.chart?.[1]?.planets?.[0]?.name;
    const secondHousePlanetFull = secondHousePlanetShort ? planetAliasMap[secondHousePlanetShort.toLowerCase()] || secondHousePlanetShort : plantName[house2?.signLord] || house2?.signLord;

    console.log('secondHousePlanetShort ',secondHousePlanetFull);
    useEffect(() => {
        dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
        };
        dispatch(KundliActions.getLagnaChart(payload));
    }, [dispatch]);

    useEffect(() => {
        if (secondHousePlanetFull) {
            const payload = { Planet: secondHousePlanetFull, lang: t('lang')};
            dispatch(KundliActions.getFinanceData(payload));
        }
    }, [secondHousePlanetFull, dispatch]);

    const isLoadingData = !MYlagnaCHART || !MYlagnaCHART.chart || !FinancejiData?.financeReportData || !secondHousePlanetFull;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F8E8D9' }}>

            <TouchableOpacity
                onPress={() => {
                    const report = FinancejiData?.financeReportData;
                    if (!report) return;

                    if (isSpeaking) {
                        TTSModule.stop();
                        setIsSpeaking(false);
                    } else {
                        const text = getFullSpeechText(report);
                        if (!text) return;
                        TTSModule.stop();
                        TTSModule.speak(text, 'male', t('lang'));
                        setIsSpeaking(true);
                    }
                }}
                style={{ alignItems: 'flex-end', padding: 10 }}
            >
             {!isSpeaking ?   <MaterialCommunityIcons
                           name={"volume-high"}
                           size={24}
                           color={"#B75D00"} // ya theme.colors.primary
                         />: <Image source={require('../../../assets/astroOneImages/rishi.png')} style={{ height:25, width:25}}/>}
            </TouchableOpacity>
            {isLoadingData ? (
                <View style={styles.loaderContainer}>
                    <Text style={{ ...Fonts.PoppinsBold }}>{t("No Finance Report Found")}</Text>
                </View>
            ) : (
                <View style={styles.contentWrapper}>
                    <View style={styles.card}>
                        {/* <RenderHTML contentWidth={SCREEN_WIDTH} baseStyle={styles.title} source={{ html: FinancejiData.financeReportData.title }} /> */}
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.quote }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.traits }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.sources }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.dos }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.donts }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.shine }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.caution }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.wisdom }} />
                        <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: FinancejiData.financeReportData.remedy }} />
                    </View>
                </View>
            )}
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.04 }}></View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    FinancejiData: state.kundli.FinancejiData,
    isLoading: state.setting.isLoading,
    MYlagnaCHART: state.kundli.MYlagnaCHART,
    MyCuspsData: state.kundli.MyCuspsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Finance);

const styles = StyleSheet.create({
    loaderContainer: {
        paddingTop: SCREEN_HEIGHT * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.03,
        paddingHorizontal: 20,
    },
    card: {
        width: SCREEN_WIDTH * 0.9,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        // ...Fonts.PoppinsBold,
        fontSize: responsiveFontSize(2.2),
        color: 'red',
        marginBottom: 12,
    },
    label: {
        ...FontsStyle.fontfamily,
        fontSize: responsiveFontSize(2),
        color: colors.black_color9,
        marginTop: 8,

    },
    value: {
        ...FontsStyle.fontfamily,
        fontSize: responsiveFontSize(1.5),
        color: "#000",
        marginVertical: 4,
        textAlign: "justify"
    },
});