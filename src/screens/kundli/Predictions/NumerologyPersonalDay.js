import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { t } from 'i18next'
import { FontsStyle, normalize } from '../../../config/constants'

const NumerologyPersonalDay = ({ basicDetails, dispatch, MyYear, MyMonth, Personalday }) => {
    console.log("MyYearDAY", MyYear)
    console.log("MyMonthdAY", MyMonth)
    console.log("Personalday", Personalday)

    useEffect(() => {
        const payload = {
            lang: t('lang'),


        }
        dispatch(KundliActions.getKundliBirthDetails(payload))
    }, [dispatch])

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


    useEffect(() => {
        if (basicDetails?.lat && basicDetails?.lon && MyYear?.data?.personalYearNumber && MyMonth?.data?.personalMonthNumber) {
            const payload = {
                lat: basicDetails.lat,
                lon: basicDetails.lon,
                personalYearNumber: MyYear.data.personalYearNumber,
                personalMonthNumber: MyMonth.data.personalMonthNumber
            }
            console.log("payloadDAYDATA", payload)
            dispatch(KundliActions.getnumerologyday(payload))
        }
    }, [dispatch, basicDetails, MyYear, MyMonth])



    return (
        <View style={{flex:1, padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9', alignItems: "center", gap: SCREEN_HEIGHT * 0.02 }}>

            <Text style={{ ...FontsStyle.fontBold,fontSize: normalize(16) }}>{t("Persnal Day Number")}</Text>
            <Text style={{ ...FontsStyle.fontBold, fontSize:  normalize(26), textAlign: 'center', marginVertical: 10 }}>{Personalday?.data?.personalDayNumber}</Text>
            <Text style={{ ...FontsStyle.font, textAlign: "justify", paddingHorizontal: SCREEN_WIDTH * 0.02 ,fontSize: normalize(15)}}>{t("Personal Day Number: Add the calendar day (1–31, reduced) to the personal month and reduce to a digit. For example, if the Personal Month is 8 and today is the 14th (which is 1+4=5), then Personal Day = 8 + 5 = 13 → 1+3 = 4. This gives a daily guidance number.")}</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Numdaypridiction: state.kundli.Numdaypridiction,
    isLoading: state.setting.isLoading,

    MyYear: state.kundli.MyYear,
    Personalday: state.kundli.Personalday,
    MyMonth: state.kundli.MyMonth,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyPersonalDay);

const styles = StyleSheet.create({
    heading: {
        ...FontsStyle.font,
        fontSize: normalize(16),
        marginBottom: 10
    },
    letter: {
        ...FontsStyle.fontBold,
        fontSize:  normalize(16),
       
    },
    prediction: {
        ...FontsStyle.font,
        fontSize:  normalize(16),
        textAlign: 'justify'
    }
})
