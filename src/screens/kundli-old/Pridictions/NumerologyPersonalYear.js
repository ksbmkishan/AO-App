import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const NumerologyPersonalYear = ({ basicDetails, dispatch, Numyearpridiction }) => {
    console.log("Numyearpridiction", Numyearpridiction)

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon
        }
        dispatch(KundliActions.getNumYearPridiction(payload))
    }, [dispatch])






    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, flex: 1, backgroundColor: '#F8E8D9' }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{
                    ...Fonts.black11InterMedium,
                    fontSize: responsiveFontSize(1.6),
                    textAlign: "justify"
                }}>
                    {Numyearpridiction?.nameprediction?.personalyearpredictions
                        ? Numyearpridiction.nameprediction.personalyearpredictions
                        : 'No prediction available with this Kundli'}
                </Text>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Numyearpridiction: state.kundli.Numyearpridiction,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyPersonalYear);

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
