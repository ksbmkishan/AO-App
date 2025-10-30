import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { t } from 'i18next';
import { colors } from '../../../config/Constants1';
import { FontsStyle, normalize } from '../../../config/constants';

const EducationStone = ({ basicDetails, dispatch, Educationstonedata, MYlagnaCHART }) => {
    const { i18n } = useTranslation();

    const educationStoneIndex = MYlagnaCHART?.chart?.[4]?.rashiIndex;

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
        if (educationStoneIndex !== undefined) {
            const payload = {
                zodiacNumber: educationStoneIndex,
                lang: t('lang')
            };
            dispatch(KundliActions.getEducationstone(payload));
        }
    }, [dispatch, MYlagnaCHART]);

    const isLoadingData =
        !MYlagnaCHART || !MYlagnaCHART.chart || !Educationstonedata?.data || !educationStoneIndex;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F8E8D9' }}>
            {isLoadingData ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.themeColor || 'red'} />
                </View>
            ) : (
                <View style={styles.contentWrapper}>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.label}>{t("Zodiac Number")}:</Text>
                            <Text style={styles.value}>{educationStoneIndex}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>{t("Zodiac Sign")}:</Text>
                            <Text style={styles.value}>{Educationstonedata?.data?.zodiac}</Text>
                        </View>

                        <View style={styles.row}>
                              <Text style={styles.label}>{t("Ruling Planet")}:</Text>
                            <Text style={styles.value}>{Educationstonedata?.data?.rulingPlanet}</Text>
                        </View>

                        <View style={{ ...styles.row }}>
                            <Text style={[styles.label, { marginTop: 10 }]}>{t("Destiny/Luck Stone")}:</Text>
                            <Text style={styles.value}>{Educationstonedata?.data?.gemstone}</Text>
                        </View>

                        <Text style={[styles.label, { marginTop: 10 }]}>✅ {t("Benefits")}:</Text>
                        <Text style={styles.highlightValue}>{Educationstonedata?.data?.benefits}</Text>

                       <Text style={[styles.label, { marginTop: 10 }]}>👤 {t("Who Should Wear")}:</Text>
                        <Text style={styles.highlightValue}>{Educationstonedata?.data?.whoShouldWear}</Text>

                        <Text style={[styles.label, { marginTop: 10 }]}>🌟 {t("Famous Personalities Wearing")} {Educationstonedata?.data?.gemstone}:</Text>
                        {Educationstonedata?.data?.famousPersonalities?.map((name, index) => (
                            <Text key={index} style={styles.highlightValue}>
                                • {name}
                            </Text>
                        ))}

                        <Text style={[styles.label, { marginTop: 10 }]}>✨ {t("Unique Insight About")}  {Educationstonedata?.data?.gemstone}:</Text>
                        <Text style={styles.highlightValue}>{Educationstonedata?.data?.uniqueInsight}</Text>

                        <Text style={[styles.label, { marginTop: 10 }]}>❓{t("Unknown Fact")}:</Text>
                        <Text style={styles.highlightValue}>{Educationstonedata?.data?.unknownFact}</Text>

                         <Text style={[styles.label, { marginTop: 10 }]}>🔍 {t("How to Identify Whether It’s Real")}:</Text>
                        <Text style={styles.highlightValue}>{Educationstonedata?.data?.howToIdentifyWhetherItReal}</Text>
                    </View>
                </View>
            )}
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.04 }}></View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Educationstonedata: state.kundli.Educationstonedata,
    isLoading: state.setting.isLoading,
    MYlagnaCHART: state.kundli.MYlagnaCHART,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(EducationStone);

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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    label: {
         ...FontsStyle.fontBold,
        fontSize: normalize(16),
        color: colors.black_color9,
       
    },
    value: {
         ...FontsStyle.fontfamily,
        fontSize: normalize(15),
        color: colors.primaryText || '#111',
          width: SCREEN_WIDTH * 0.25,
        textAlign:'right'
    },
    highlightValue: {
         ...FontsStyle.fontfamily,
        fontSize: normalize(15),
        color: colors.black_color9,
        marginTop: 5,
    },
});
