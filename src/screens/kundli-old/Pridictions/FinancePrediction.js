import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const FinancePrediction = ({ basicDetails, dispatch, FinanceDATA }) => {
    console.log("FinanceDATA", FinanceDATA)

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getFinancepridiction(payload))
    }, [dispatch])
    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(2), textAlign: "justify", marginBottom: 10 }}>Finance Report</Text>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>{FinanceDATA?.report}</Text>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    FinanceDATA: state.kundli.FinanceDATA,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FinancePrediction);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})