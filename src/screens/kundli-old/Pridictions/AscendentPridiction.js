import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const AscendentPridiction = ({ basicDetails, dispatch, ascendtpridiction }) => {

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getAscendentpridiction(payload))
    }, [dispatch])
    return (

        <View style={{ flex: 1, borderWidth: 1,paddingBottom:SCREEN_HEIGHT*0.04,paddingHorizontal:SCREEN_WIDTH*0.02,paddingTop:SCREEN_HEIGHT*0.02 }}>
            <ScrollView >
                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>{ascendtpridiction?.asc_predictions}</Text>
            </ScrollView>
        </View>




    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    ascendtpridiction: state.kundli.ascendtpridiction,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AscendentPridiction);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})