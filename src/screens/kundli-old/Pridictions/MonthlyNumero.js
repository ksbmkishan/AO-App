import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const MonthlyNumero = ({ basicDetails, dispatch, Monthlypridiction }) => {
    console.log("Monthlypridiction", Monthlypridiction)

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon
        }
        dispatch(KundliActions.getNumMonthlyPridiction(payload))
    }, [dispatch])






    return (
        <ScrollView style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>{Monthlypridiction?.nameprediction?.personalmonthpredictions}</Text>
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Monthlypridiction: state.kundli.Monthlypridiction,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyNumero);

const styles = StyleSheet.create({
    heading: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(2),
        marginBottom: 10
    },
    letter: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold'
    },
    prediction: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.6),
        textAlign: 'justify'
    }
})
