import { FlatList, StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
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

const BaiscGemstone = ({ basicDetails, dispatch, LuckyGemstone, MYlagnaCHART }) => {
    const { i18n } = useTranslation();

    const luckystone = MYlagnaCHART?.chart?.[8]?.rashiIndex;


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
        if (luckystone !== undefined) {
            const payload = {
                zodiacNumber: luckystone,
                lang: t('lang')
            };
            dispatch(KundliActions.getLuckyGemstonedata(payload));
        }
    }, [dispatch, luckystone]);

    const isLoadingData =
        !MYlagnaCHART || !MYlagnaCHART.chart || !LuckyGemstone?.data || !luckystone;

    console.log('LuckyGemstone ', LuckyGemstone)

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
                            <Text style={styles.value}>{luckystone}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>{t("Zodiac Sign")}:</Text>
                            <Text style={styles.value}>{LuckyGemstone?.data?.zodiac}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>{t("Ruling Planet")}:</Text>
                            <Text style={styles.value}>{LuckyGemstone?.data?.rulingPlanet}</Text>
                        </View>

                        <View style={{ ...styles.row }}>
                            <Text style={[styles.label, { marginTop: 10 }]}>{t("Destiny/Luck Stone")}:</Text>
                            <Text style={styles.value}>{LuckyGemstone?.data?.gemstone}</Text>
                        </View>

                        <Text style={[styles.label, { marginTop: 10 }]}>✅ {t("Benefits")}:</Text>
                        <Text style={styles.highlightValue}>{LuckyGemstone?.data?.benefits}</Text>

                        <Text style={[styles.label, { marginTop: 10 }]}>👤 {t("Who Should Wear")}:</Text>
                        <Text style={styles.highlightValue}>{LuckyGemstone?.data?.whoShouldWear}</Text>

                        <Text style={[styles.label, { marginTop: 10 }]}>🌟 {t("Famous Personalities Wearing")} {LuckyGemstone?.data?.gemstone}:</Text>
                        {LuckyGemstone?.data?.famousPersonalities?.map((name, index) => (
                            <Text key={index} style={styles.highlightValue}>
                                • {name}
                            </Text>
                        ))}

                        <Text style={[styles.label, { marginTop: 10 }]}>✨ {t("Unique Insight About")} {LuckyGemstone?.data?.gemstone}:</Text>
                        <Text style={styles.highlightValue}>{LuckyGemstone?.data?.uniqueInsight}</Text>

                        <Text style={[styles.label, { marginTop: 10 }]}>❓{t("Unknown Fact")}:</Text>
                        <Text style={styles.highlightValue}>{LuckyGemstone?.data?.unknownFact}</Text>

                        <Text style={[styles.label, { marginTop: 10 }]}>🔍 {t("How to Identify Whether It’s Real")}:</Text>
                        <Text style={styles.highlightValue}>{LuckyGemstone?.data?.howToIdentifyWhetherItReal}</Text>


                    </View>
                </View>
            )}
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.04 }}></View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    LuckyGemstone: state.kundli.LuckyGemstone,
    isLoading: state.setting.isLoading,
    MYlagnaCHART: state.kundli.MYlagnaCHART,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BaiscGemstone);

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
