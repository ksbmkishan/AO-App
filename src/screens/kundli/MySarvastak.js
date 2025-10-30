import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../config/Constants1';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import Sarvastakchart from './Sarvastakchart';
const MySarvastak = ({ basicDetails, dispatch, MySarvsatkdata }) => {
    const [selectedButton, setSelectedButton] = useState(1);
    const { t } = useTranslation();
    console.log("jjkjk", MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.aries)
    useEffect(() => {
        const payload = { lang: t('lang') };
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch, t]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place
        };
        dispatch(KundliActions.getMYsarvastakdata(payload));
    }, [dispatch, t, basicDetails]);

    const getSarvashtak = (planetName) => {
        return MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.prastaraks?.find(item => item.name === planetName)?.sarvashtak || [];
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F8E8D9", paddingHorizontal: SCREEN_WIDTH * 0.025 }}>




            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.viewButton, selectedButton === 1 && styles.selectedButton]}
                    onPress={() => setSelectedButton(1)}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}> {t('Table')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.viewButton, selectedButton === 2 && styles.selectedButton]}
                    onPress={() => setSelectedButton(2)}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}> {t('Chart')}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                {selectedButton === 1 && (
                    <View>
                        <View style={{ flexDirection: "row", borderBottomWidth: 1, paddingVertical: SCREEN_HEIGHT * 0.01, justifyContent: "space-between", paddingLeft: SCREEN_WIDTH * 0.19 }}>
                            {[...Array(12).keys()].map(num => (
                                <Text key={num} style={{color:"black",fontWeight:"500"}}>{num + 1}</Text>
                            ))}
                        </View>

                        {['Ascendant', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn',].map((planet, index) => (
                            <View key={index} style={{ flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: 1, paddingVertical: SCREEN_HEIGHT * 0.01, alignItems: "center" }}>
                                <Text style={[styles.Hedertxt, { color: "red" }]}> {t(`${planet}`)}</Text>
                                <Text style={{ textAlignVertical: "center", fontSize: responsiveFontSize(1.8), color: "black" }}>{getSarvashtak(planet).join("    ")}</Text>
                            </View>
                        ))}
                        <View style={{flexDirection:"row",gap:SCREEN_WIDTH*0.09,paddingVertical:SCREEN_HEIGHT*0.01}}>
                            <View>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}> {t('Total')}</Text>
                            </View>
                            <View style={{flexDirection:"row",gap:13}}>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.aries}
                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.taurus}

                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.gemini}

                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.leo}

                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.virgo}

                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.scorpio}

                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.sagittarius}

                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.capricorn}

                                </Text>
                                <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
                                    {MySarvsatkdata?.sarvashtakaListData?.sarvashtakaList[0]?.total?.pisces}

                                </Text>

                            </View>
                        </View>

                    </View>
                )}
                {selectedButton === 2 && (
                    <View>
                        <Sarvastakchart data={MySarvsatkdata?.sarvashtakaListData?.chart} />
                    </View>
                )}
            </View>

            
        </View>
    );
};

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    MySarvsatkdata: state.kundli.MySarvsatkdata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MySarvastak);

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    selectedButton: {
        borderBottomWidth: 2,
        borderBottomColor: colors.background_theme2,
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.6),
    },
    viewButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});
