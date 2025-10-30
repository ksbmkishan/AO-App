import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const RashiPrediction = ({ basicDetails, dispatch, Rashipridiction }) => {
    console.log("Rashipridiction", Rashipridiction)
    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getRashipridiction(payload))
    }, [dispatch])
    return (
        <ScrollView style={{ paddingHorizontal: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9', height: "100%", marginBottom: SCREEN_HEIGHT * 0.05 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>{Rashipridiction?.asc_predictions}</Text>
        </ScrollView>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Rashipridiction: state.kundli.Rashipridiction,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RashiPrediction);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})