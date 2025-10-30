import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const NumerologyPersonalDay = ({ basicDetails, dispatch, Numdaypridiction }) => {
    console.log("Numdaypridiction", Numdaypridiction)  

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon
        }
        console.log("jk",payload)
        dispatch(KundliActions.getNumDayPridiction(payload))
    }, [dispatch])






    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9',alignItems:"center",gap:SCREEN_HEIGHT*0.02 }}>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>Personal Day Number {Numdaypridiction?.nameprediction?.personaldaynumber}</Text>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>Personal Day Number {Numdaypridiction?.nameprediction?.personaldaypredictions}</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Numdaypridiction: state.kundli.Numdaypridiction,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyPersonalDay);

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
