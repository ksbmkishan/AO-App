import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { t } from 'i18next'
import { FontsStyle, normalize } from '../../../config/constants'

const MonthlyNumero = ({ basicDetails, dispatch, MyYear, MyMonth }) => {
    console.log("MyYearmonthwala", MyYear)
    console.log("MyMonth", MyMonth)
    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
        }
        console.log("Mahadev", payload)
        dispatch(KundliActions.getPersnalyear(payload))
    }, [dispatch, basicDetails])

    useEffect(() => {
        if (basicDetails?.lat && basicDetails?.lon && MyYear?.data?.personalYearNumber) {
            const payload = {
                lat: basicDetails.lat,
                lon: basicDetails.lon,
                personalYearNumber: MyYear.data.personalYearNumber
            }
            console.log("payloadmonth", payload)
            dispatch(KundliActions.getPersnalMonth(payload))
        }
    }, [dispatch, basicDetails, MyYear])




    return (
        <ScrollView style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>

            <Text style={styles.heading}>{t("Personal Month Number")}</Text>

            <Text style={{ ...FontsStyle.font,fontWeight:'bold', fontSize: normalize(28), textAlign: 'center', marginVertical: 10 }}>{MyMonth?.data?.personalMonthNumber}</Text>

            <Text style={{ ...FontsStyle.font,textAlign: "justify", paddingHorizontal: SCREEN_WIDTH * 0.02, fontSize: normalize(15) }}>{t("Personal Year Number: Combine the birth day and month with the current year (or the year of interest) and reduce to one digit. Essentially, Personal Year = (Birth Month + Birth Day + Current Year) reduced. Personal Month Number: Add the calendar month (1–12, reduced to 1–9) to the personal year number, then reduce. For instance, if someone’s Personal Year is 7 and we want the energy of October (10, which is 1+0 = 1), then Personal Month = 7 + 1 = 8. Each Personal Month is like a sub-cycle influencing that month’s themes.")}  </Text>


        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    MyYear: state.kundli.MyYear,

    MyMonth: state.kundli.MyMonth,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyNumero);

const styles = StyleSheet.create({
    heading: {
        ...FontsStyle.fontBold,
        fontSize: normalize(16),
        marginBottom: 10
        , alignSelf: "center"
    },
    letter: {
        ...FontsStyle.fontBold,
        fontSize: responsiveFontSize(1.8),
        
    },
    prediction: {
        ...FontsStyle.font,
        fontSize: responsiveFontSize(1.6),
        textAlign: 'justify'
    }
})
