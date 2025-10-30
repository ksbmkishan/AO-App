import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import {
    colors,
    fonts,
    getFontSize
} from '../../../config/Constants1';
import { useState, useRef } from 'react';
import MyLoader from '../../../components/MyLoader2';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
const { config, fs } = RNFetchBlob;
import { useTranslation } from 'react-i18next';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { Colors, Fonts, Sizes } from '../../../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import KpBirthChart from '../kpData/KpBirthChart';
import KpBirthDetails from '../KpBirthDetails';
import KpCuspsDetailes from '../kpData/KpCuspsDetailes';
import KpcupsChart from '../kpData/KpcupsChart';
import ShowKundliKpPlanets from '../ShowKundliKpPlanets';
import ShowKundliKpPlanetCusp from '../ShowKundliKpPlanetCusp';
import ShowKundliKpHouseCusp from '../ShowKundliKpHouseCusp';
import KpRulingPlanets from '../kpData/KpRulingPlanets';
import { FontsStyle } from '../../../config/constants';


const KrsihnaMurti = ({ navigation, route, dispatch, isLoading, basicDetails, kundliId }) => {
    const { t } = useTranslation();
    const viewRef = useRef(null);

    const [show, setShow] = useState('KP Birth Details');

    useEffect(() => {
        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);


    return (
        <View style={{ flex: 1 }} ref={viewRef}>
            <View
                style={{ flex: 1, backgroundColor: '#F8E8D9' }}
            >
                <MyLoader isVisible={isLoading} />
                {header()}
                {tabsInfo()}
                <View style={{ flex: 1, }}>
                    <FlatList
                        ListHeaderComponent={<>
                            <View style={{ flex: 1, gap: 10 }}>
                                


                                {show == 'KP Birth Details' && <KpBirthDetails />}
                                {show == 'KP Birth Chart' && <KpBirthChart />}
                                {show == 'KP Cusps Details' && <KpCuspsDetailes />}
                                {show == 'KP Cusps Chart' && <KpcupsChart />}
                                {show == 'KP Planetary Positions' && <ShowKundliKpPlanets />}
                                {show == 'KP Planet Significators' && <ShowKundliKpPlanetCusp />}
                                {show == "KP House Significators" && <ShowKundliKpHouseCusp />}
                                {show == "KP Ruling Planets" && <KpRulingPlanets />}

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


            { key: 'KP Birth Details', label: t('KP Birth Details') },
            { key: 'KP Birth Chart', label: t('KP Birth Chart') },

            { key: 'KP Cusps Details', label: t('KP Cusps Details') },
            { key: 'KP Cusps Chart', label: t('KP Cusps Chart') },
            // { key: 'Sade Sati', label: t('Sade Sati') },
            { key: 'KP Planetary Positions', label: t('KP Planetary Positions') },
            { key: 'KP Planet Significators', label: t('KP Planet Significators') },
            { key: 'KP House Significators', label: t('KP House Significators') },
            { key: 'KP Ruling Planets', label: t('KP Ruling Planets') },





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
                           ...FontsStyle.font

                        }}>
                        {t("KrishnaMurti Padvati")} 
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


export default connect(mapStateToProps, mapDispatchToProps)(KrsihnaMurti);

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
        color: 'white'
    }
});




