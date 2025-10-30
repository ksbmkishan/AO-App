import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const Nakshtraprediction = ({ basicDetails, dispatch, Nakshtradata }) => {
    console.log("Nakshtradata",Nakshtradata)

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getNakshatrapridiction(payload))
    }, [dispatch])
    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:SCREEN_HEIGHT*0.025}}>
                <Text style={{...Fonts.black11InterMedium,fontSize:responsiveFontSize(1.7)}}>Nakshtra Birth : {Nakshtradata?.nakshatrabirth}</Text>
                <Text style={{...Fonts.black11InterMedium,fontSize:responsiveFontSize(1.7)}}>Nakshtra Birth : {Nakshtradata?.nakshatratoday}</Text>
            </View>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>{Nakshtradata?.todayspredictions}</Text>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Nakshtradata: state.kundli.Nakshtradata,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Nakshtraprediction);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})