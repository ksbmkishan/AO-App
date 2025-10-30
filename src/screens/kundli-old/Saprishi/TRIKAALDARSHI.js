import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import React from 'react';

import { useEffect } from 'react';
import {
    colors,
    fonts,
    getFontSize
} from '../../../config/Constants1';
import { useState, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyLoader from '../../../components/MyLoader2';
import axios from 'axios';
import { connect } from 'react-redux';
import { warnign_toast } from '../../components/MyToastMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
const { config, fs } = RNFetchBlob;
import { useTranslation } from 'react-i18next';
import { getPlanets } from '../../config/apiService';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { captureRef } from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import ShowKundliPlanets from '.././ShowKundliPlanets';
import ShowKundliCharts from '.././ShowKundliCharts';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { Colors, Fonts, Sizes } from '../../../assets/style';
import moment from 'moment';
import KundliBirthDetailes from '.././KundliBirthDetailes';
import BasicPanchang from '.././BasicPanchang';
import Dirshti from '.././Dirshti';
import Maitri from '.././Maitri/Maitri';
import ShowDashna from '.././ShowDashna';
import Report from '.././Report';
import LinearGradient from 'react-native-linear-gradient';
import KaalSarrp from '.././KaalSarrp';
import Houses from '.././Houses';
import Sadhedati from '.././Sadhesati/Sadhedati';
import AllPridictions from '.././Pridictions/AllPridictions';
import LuckyGemstone from '.././LuckyGemstone';
import Yantra from '.././Yantra';
import Mantra from '.././Mantra';
import Rudhraksha from '.././Rudhraksha';
import TarotCard from '../NewTarotCard';
import Vinhottipredictions from '.././Vinhottri/Vinhottipredictions';
import BirthNakshatraReport from '.././BirthNakshatraReport';
import KalsarpRemedies from '.././KalsarpRemedies';
import GeoModule from '.././GeoModule';
import NewNumerology from '.././NewNumerology';
import Sadhbhal from '.././Sadhbhal';
import Transit from '.././Transit';
import AvakhadaChakra from '.././AvakhadaChakra';
import ManglikYog from '.././manglikYog/ManglikYog';
import NewAstakvarga from '../NewAstakvarga';
import WhoAMI from '../Pridictions/WhoAMI';
import RomanticAnalysisReport from '../Pridictions/Philosophy/RomanticAnalysisReport';
import FinancePrediction from '../Pridictions/FinancePrediction';
import EducationReport from '../Pridictions/Philosophy/EducationReport';
import Kaalsarpmain from '../Kaalsarpmain';
import HousePridiction from '../Pridictions/HousePridiction';
import LifeForecastPrediction from '../Vinhottri/LifeForecastPrediction';


const TRIKAALDARSHI = ({ navigation, route, dispatch, isLoading, basicDetails, kundliId }) => {
    const { t } = useTranslation();
    const viewRef = useRef(null);
    console.log("basicDetails???", basicDetails)
    const [show, setShow] = useState('PLANETRY IMPACT');


    console.log("kundliId", kundliId)

    useEffect(() => {

        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);


    console.log(show)

    return (
        <View style={{ flex: 1 }} ref={viewRef}>
            <View
                style={{ flex: 1, backgroundColor: '#F8E8D9' }}
            >
                <MyLoader isVisible={isLoading} />
                {header()}
                <View style={{ flex: 1, }}>
                    {/* <FlatList
                        ListHeaderComponent={<> */}
                    <View style={{ flex: 1, gap: 10 }}>
                        {tabsInfo()}
                        {/* {show == 'basic' && <KundliBirthDetailes />} */}
                        {/* {show == 'basic' && <BasicPanchang />} */}
                        {show == 'showKundliCharts' && <ShowKundliCharts />}
                        {show == 'showKundliPlanets' && <ShowKundliPlanets />}
                        {show == 'Houses' && <Houses />}
                        {show == 'Sade Sati' && <Sadhedati />}
                        {show == 'Dirshti' && <Dirshti />}
                        {show == 'Maitri' && <Maitri />}
                        {show == 'showDashna' && <ShowDashna />}
                        {show == 'kaaSarpYog' && <KaalSarrp />}
                        {show == 'Vinhottipredictions' && <LifeForecastPrediction />}
                        {show == 'BirthNakshatraReport' && <BirthNakshatraReport />}
                        {show == 'KalsarpRemedies' && <KalsarpRemedies />}
                        {show == 'NewNumerology' && <NewNumerology />}

                        {show == 'Sadhbhal' && <Sadhbhal />}
                        {show == 'LuckyGemstone' && <LuckyGemstone />}
                        {show == 'Yantra' && <Yantra />}
                        {show == 'Mantra' && <Mantra />}
                        {show == 'Rudhraksha' && <Rudhraksha />}
                        {show == 'TarotCard' && <TarotCard />}
                        {show == 'ManglikYog' && <ManglikYog />}


                        {show == 'Transit' && <Transit />}
                        {show == 'AvakhadaChakra' && <AvakhadaChakra />}

                        {show == 'Pridiction' && <AllPridictions />}

                        {show == 'report' && <Report />}
                        {show == 'GeoModule' && <GeoModule />}
                        {show == 'Astak' && <NewAstakvarga />}
                        {show == 'WhoAMI' && <WhoAMI />}
                        {show == 'Romance' && <RomanticAnalysisReport />}
                        {show == 'FINANCE' && <FinancePrediction />}
                        {show == 'PHILOSOPY & EDUCATION' && <EducationReport />}
                        {show == 'KALSARPA' && <Kaalsarpmain />}
                        {show == 'PLANETRY IMPACT' && <HousePridiction kundliId={kundliId} />}


                    </View>
                    {/* </>} */}
                    {/* contentContainerStyle={{ padding: 0 }}
                    /> */}
                </View>

            </View>
        </View>
    );




    function tabsInfo() {
        const handleKundli = (item) => {
            setShow(item);
        }

        const tabs = [



            { key: 'PLANETRY IMPACT', label: t('PLANETRY IMPACT') },
            { key: 'Vinhottipredictions', label: t('DASHA PREDICTIONS') },
            { key: 'WhoAMI', label: t('Who AM I ?') },
            { key: 'Romance', label: t('ROMANCE') },
            { key: 'FINANCE', label: t('FINANCE') },
            { key: 'PHILOSOPY & EDUCATION', label: t('PHILOSOPY & EDUCATION') },
            { key: 'KALSARPA', label: t('KAALSARP') },
            { key: 'ManglikYog', label: t('MANGLIK') },
            { key: 'Sade Sati', label: t('SADESATI') },






        ];

        return (

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView horizontal>
                    <LinearGradient colors={['#1E68B9', '#123A62']} locations={[0, 0.41]} style={{ flexDirection: 'row' }}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab.key}
                                activeOpacity={0.8}
                                onPress={() => handleKundli(tab.key)}
                                style={[
                                    styles.button

                                ]}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        show === tab.key && { color: '#FBB03B' },
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </LinearGradient>
                </ScrollView>
            </View>



        )
    }


    function header() {
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingVertical: 12,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        flex: 0,
                        width: '15%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Ionicons
                        name="arrow-back"
                        color={'black'}
                        size={getFontSize(2.5)}
                    />
                </TouchableOpacity>
                <View style={{ flex: 0.8 }}>
                    <Text allowFontScaling={false}
                        numberOfLines={1}
                        style={{
                            fontSize: getFontSize(1.7),
                            ...Fonts.PoppinsMedium

                        }}>
                        TRIKAALDARSHI
                    </Text>
                </View>
            </View>
        )
    }

};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    kundliId: state.kundli.kundliId,
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(TRIKAALDARSHI);

const styles = StyleSheet.create({
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background_theme1,
    },
    rowText: {
        flex: 0.5,
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.black_color9,
        textTransform: 'capitalize',
    },


    itmeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    itmeContainer1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,

    },
    itemText: {
        flex: 0.5,
        fontSize: getFontSize(1.5),
        color: colors.black_color8,
        fontFamily: fonts.medium,
    },

    button: {
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    buttonText: {
        ...Fonts.PoppinsSemiBold,
        color: 'white'
    }
});




