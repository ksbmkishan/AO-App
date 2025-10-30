import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const PersnalityReportPrediction = ({ basicDetails, dispatch, MyPersnality }) => {
    console.log("MyPersnality", MyPersnality)

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getpersnality(payload))
    }, [dispatch])
    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>{MyPersnality?.report}</Text>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    MyPersnality: state.kundli.MyPersnality,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PersnalityReportPrediction);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})