import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import {
    colors,
    fonts,
    getFontSize
} from '../../../config/Constants1';
import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
const { config, fs } = RNFetchBlob;
import { useTranslation } from 'react-i18next';
import ShowKundliCharts from '.././ShowKundliCharts';
import * as KundliActions from '../../../redux/actions/KundliActions'
import LinearGradient from 'react-native-linear-gradient';
import VimhotriMahadasha from '../showdasha/VimhotriMahadasha';
import ShowKundliPlanets from '../ShowKundliPlanets';
import MySarvastak from '../MySarvastak';
import Nakshatra from '../Predictions/Nakshatra';
import KpCuspsDetailes from '../kpData/KpCuspsDetailes';
import FriendshipData from '../FriendshipData';
import KpRulingPlanets from '../kpData/KpRulingPlanets';
import ShowKundliKpPlanetCusp from '../ShowKundliKpPlanetCusp';
import LabelAstakvarga from '../MyAstakvarga/LabelAstakvarga';
import { FontsStyle } from '../../../config/constants';


const Vedicjyoti = ({ navigation, route, dispatch, kundliId }) => {
    const { t } = useTranslation();
    const viewRef = useRef(null);

    const [show, setShow] = useState('showKundliCharts');
    useEffect(() => {
        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);



    return (
        <View style={{ flex: 1 }} ref={viewRef}>
            <View
                style={{ flex: 1, backgroundColor: '#F8E8D9' }}
            >

                {header()}
                <View style={{ flex: 1, }}>
                    <FlatList
                        ListHeaderComponent={<>
                            <View style={{ flex: 1, gap: 10 }}>
                                {tabsInfo()}
                                {/* {show == 'basic' && <KundliBirthDetailes />} */}
                                {/* {show == 'basic' && <BasicPanchang />} */}
                                {show == 'showKundliCharts' && <ShowKundliCharts />}
                                {show == 'showDashna' && <VimhotriMahadasha />}
                                {show == 'showKundliPlanets' && <ShowKundliPlanets />}
                                {show == 'Houses' && <KpCuspsDetailes />}
                                {show == 'report' && <MySarvastak />}
                                {show == 'BirthNakshatraReport' && <Nakshatra />}
                                {show == 'Maitri' && <FriendshipData />}

                                {/* {show == 'showKundliPlanets' && <ShowKundliPlanets />}
                              
                                {show == 'Sade Sati' && <Sadhedati />}
                                {show == 'Dirshti' && <Dirshti />}
                                {show == 'Maitri' && <Maitri />}
                               
                                {show == 'kaaSarpYog' && <KaalSarrp />}
                                {show == 'Vinhottipredictions' && <Vinhottipredictions />}
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
                              

                                {show == 'Pridiction' && <AllPridictions />}

                                {show == 'report' && <Report />}
                                {show == 'GeoModule' && <GeoModule />}
                                {show == 'Astak' && <NewAstakvarga />} */}
                                {show == 'Astak' && <LabelAstakvarga />}
                                {show == 'AvakhadaChakra' && <KpRulingPlanets />}
                                {show == 'Dirshti' && <ShowKundliKpPlanetCusp />}
                            </View>
                        </>}
                        contentContainerStyle={{ padding: 0 }}
                    />
                </View>

            </View>
        </View>
    );




    function tabsInfo() {
        const handleKundli = (item) => {
            setShow(item);
        }

        const tabs = [
            // { key: 'basic', label: 'Basic' },
            { key: 'showKundliCharts', label: t('CHARTS') },
            { key: 'showDashna', label: t('DASHAS') },
            { key: 'showKundliPlanets', label: t('PLANET DETAILS') },
            { key: 'Houses', label: t('HOUSE DETAILS') },
            // { key: 'Sade Sati', label: t('Sade Sati') },
            { key: 'Maitri', label: t('FRIENDSHIP') },
            { key: 'Astak', label: t('ASTAKVARGAS') },
            { key: 'Dirshti', label: t('DRISHTI/ASPECT') },


            // { key: 'kaaSarpYog', label: t('Kaalsarp') },
            // { key: 'Vinhottipredictions', label: t('Vinshottari  prediction') },
            // { key: 'BirthNakshatraReport', label: t('Birth Nakshatra Report') },
            // { key: 'KalsarpRemedies', label: t('Kaalsarp Remedies') },
            { key: 'AvakhadaChakra', label: t('Avakhada Chakra') },
            // { key: 'ManglikYog', label: t('Manglik Yog') },


            // { key: 'Sadhbhal', label: t('Shadbal') },
            // { key: 'Transit', label: t('Transit') },



            // { key: 'NewNumerology', label: t('Numerology') },





            // { key: 'LuckyGemstone', label: t('Lucky Gemstone') },
            // { key: 'Yantra', label: t('Yantra') },
            // { key: 'Mantra', label: t('Mantra') },
            // { key: 'Rudhraksha', label: t('Rudraksha') },
            // { key: 'TarotCard', label: t('Tarot Card') },
            // { key: 'Pridiction', label: t('Prediction') },

            // { key: 'report', label: t('Report') },

            // { key: 'GeoModule', label: t('Geo Module') },


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
                           ...FontsStyle.font,

                        }}>
                        {t("SAPTRISHI VEDIC JYOTISHACHARYA")}
                    </Text>
                </View>
            </View>
        )
    }

};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,

    basicDetails: state.kundli.basicDetails,
    kundliId: state.kundli.kundliId,
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(Vedicjyoti);

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
        ...FontsStyle.fontBold,
        color: 'white',
        
    }
});




