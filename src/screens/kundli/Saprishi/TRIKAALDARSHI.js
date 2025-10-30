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
import WhoAMI from '../Predictions/WhoAMI';
import KaalsarpDosha from '../KaalsarpDosha';
import MangalDosha from '../../MangalDosha';
import SadheSati from '../SadheSati';
import Dashasimple from '../showdasha/Dashasimple';
import BhavPrediction from '../Predictions/BhavPrediction';
import NewLaalkitab from '../NewLaalkitab';
import Pitrdosh from '../../Pitrdosh';
import Romance from '../Predictions/Romance';
import Finance from '../Predictions/Finance';
import Professionreport from '../Predictions/Professionreport';
import Philosphyeducation from '../Predictions/Philosphyeducation';
import Healthmind from '../Predictions/Healthmind';
import LuckReport from '../Predictions/LuckReport';
import { FontsStyle } from '../../../config/constants';


const TRIKAALDARSHI = ({ navigation, route, dispatch, isLoading, basicDetails, kundliId }) => {
    const { t } = useTranslation();
    const viewRef = useRef(null);
    const [show, setShow] = useState('PLANETRY IMPACT');



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
                   
                    <View style={{ flex: 1, gap: 10 }}>
                        {tabsInfo()}
                        {show == 'WhoAMI' && <WhoAMI />}
                        {show == 'KALSARPA' && <KaalsarpDosha />}
                        {show == 'ManglikYog' && <MangalDosha />}
                        {show == 'Sade Sati' && <SadheSati />}
                        {show == 'PLANETRY IMPACT' && <NewLaalkitab />}
                        {show == 'Vinhottipredictions' && <Dashasimple />}
                        {show == 'Bhav' && <BhavPrediction />}
                        {show == 'Pitrdosh' && <Pitrdosh />}
                        {show == 'Romance' && <Romance />}
                        {show == 'Finance' && <Finance />}
                        {show == 'Profession' && <Professionreport />}
                        {show == 'PHILOSOPY' && <Philosphyeducation />}
                        {show == 'HEALTH' && <Healthmind />}
                        {show == 'Luckreport' && <LuckReport />}

                    </View>
                    
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
            { key: 'Bhav', label: t('BHAV PREDICTIONS') },
            { key: 'Pitrdosh', label: t('PITRDOSH') },
            { key: 'WhoAMI', label: t('Who AM I ?') },
            { key: 'Romance', label: t('ROMANCE') },
            { key: 'Finance', label: t('FINANCE') },
            { key: 'PHILOSOPY', label: t('PHILOSOPHY & EDUCATION') },
            { key: 'Profession', label: t('PROFESSION') },
            { key: 'HEALTH', label: t('HEALTH AND MIND REPORT') },
            { key: 'Luckreport', label: t('LUCK REPORT') },
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
                            ...FontsStyle.font,fontWeight:'bold',

                        }}>
                        {t("TRIKAALDARSHI")}
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
        ...FontsStyle.font,
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
        ...FontsStyle.fontBold
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




