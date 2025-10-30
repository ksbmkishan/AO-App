import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const NumerologyNameAlphabet = ({ basicDetails, dispatch, NUMNAMEPRIDICTION, kundliPayloads }) => {
    console.log("kundliPayloadsqnujjjj", kundliPayloads)
        ,
        useEffect(() => {
            const payload = {
                lat: basicDetails?.lat,
                lon: basicDetails?.lon
            }
            dispatch(KundliActions.getNumname(payload))
        }, [dispatch])

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 10 }}>
            <Text style={styles.letter}>{item[0]}</Text>
            <Text style={styles.prediction}>{item[1]}</Text>
        </View>
    )

    const data = NUMNAMEPRIDICTION?.nameprediction
        ? Object.entries(NUMNAMEPRIDICTION.nameprediction).filter(([key]) => key !== 'name')
        : []

    return (
        <ScrollView style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <Text style={styles.heading}>Name: {NUMNAMEPRIDICTION?.nameprediction?.name}</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item[0]}
                renderItem={renderItem}
            />
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    NUMNAMEPRIDICTION: state.kundli.NUMNAMEPRIDICTION,
    kundliPayloads: state.kundli.kundliPayloads,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyNameAlphabet);

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
