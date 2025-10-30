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

const NumerologyPersonalYear = ({ basicDetails, dispatch, MyYear }) => {
    console.log("MyYear", MyYear)

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
    }, [dispatch])


    return (
        <View style={{ backgroundColor: '#F8E8D9', flex: 1 }}>
            <Text style={{ ...FontsStyle.fontBold, alignSelf: "center", paddingTop: SCREEN_HEIGHT * 0.02, fontSize: normalize(16) }}>{t("Personal Year Number")}</Text>
            <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(28), textAlign: 'center', marginVertical: 10 }}>
                {MyYear?.data?.personalYearNumber}
            </Text>
            <Text style={{ ...FontsStyle.font, textAlign: "justify", paddingHorizontal: SCREEN_WIDTH * 0.02, fontSize: normalize(15) }}>{t("Personal Year Number: Combine the birth day and month with the current year (or the year of interest) and reduce to one digit. Essentially, Personal Year = (Birth Month + Birth Day + Current Year) reduced.")}
            </Text>

        </View>

    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Numdaypridiction: state.kundli.Numdaypridiction,
    isLoading: state.setting.isLoading,
    MyYear: state.kundli.MyYear,


});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyPersonalYear);

const styles = StyleSheet.create({
    heading: {
        ...FontsStyle.font,
        fontSize: responsiveFontSize(2),
        marginBottom: 10
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
