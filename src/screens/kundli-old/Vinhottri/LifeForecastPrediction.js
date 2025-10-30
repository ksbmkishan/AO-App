import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import * as KundliActions from '../../../redux/actions/KundliActions'

const LifeForecastPrediction = ({ basicDetails, dispatch, Forecastpridiction }) => {
    console.log("basicDetails",basicDetails)
    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
        }
        dispatch(KundliActions.getForecastpridiction(payload))
    }, [dispatch])

    console.log("Forecastpridiction", Forecastpridiction)

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.planet}>🔯 {item.planet} Dasha</Text>
            <Text style={styles.date}>📆 {item.from} → {item.to}</Text>
            <Text style={styles.prediction}>{item.dashaphal}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={Forecastpridiction?.[0] ?? []}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Forecastpridiction: state.kundli.Forecastpridiction,
    isLoading: state.setting.isLoading,
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(LifeForecastPrediction)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8E8D9',
        padding: SCREEN_HEIGHT * 0.02,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: SCREEN_HEIGHT * 0.02,
        marginBottom: SCREEN_HEIGHT * 0.015,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    planet: {
        ...Fonts.black14InterBold,
        fontSize: responsiveFontSize(2),
        marginBottom: 5,
        color: '#4B0082',
    },
    date: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.5),
        marginBottom: 10,
        color: '#555',
    },
    prediction: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.6),
        textAlign: 'justify',
        color: '#333',
    },
})
