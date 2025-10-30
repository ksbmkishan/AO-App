import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { t } from 'i18next'

const Mantra = ({ basicDetails, dispatch, mantradata, Mynum2 }) => {
    console.log("Mynum2", Mynum2)

    // useEffect(() => {
    //     const payload = {

    //         lat: basicDetails?.lat,
    //         lon: basicDetails?.lon

    //     }
    //     console.log(payload, 'payload')
    //     // dispatch(KundliActions.getMantra(payload))
    // }, [dispatch])
    useEffect(() => {
        dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }))
    }, [dispatch]);

    useEffect(() => {
        dispatch(KundliActions.getMyNumerology({
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place
        }))
    }, [dispatch]);
    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>

            <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, gap: 10 }}>

                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>Today's Mantra </Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>{Mynum2?.numerlogy?.details?.favourableMantra}</Text>
            </View>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.9), textAlign: "center" }}>
                Jap Number :   {Mynum2?.numerlogy?.details?.japnumber}
            </Text>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    mantradata: state.kundli.mantradata,
    isLoading: state.setting.isLoading,
    Mynum2: state.kundli.Mynum2,

});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Mantra);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})