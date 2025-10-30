import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

const AvakhadaChakra = ({ basicDetails, dispatch, Avakhdaji }) => {
    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon
        };
        console.log("Avakhdaji", Avakhdaji);
        console.log(payload, 'payload');
        dispatch(KundliActions.getAvakhadaChakra(payload));
    }, [dispatch]);

    const formatKey = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')      // camelCase ko split karta hai
            .replace(/^./, str => str.toUpperCase()); // First letter capital
    };

    return (
        <View style={styles.wrapper}>
           

            {Avakhdaji && Object.entries(Avakhdaji).map(([key, value]) => (
                <View key={key} style={styles.container}>
                    <Text style={styles.textKey}>{formatKey(key)}:</Text>
                    <Text style={styles.textValue}>{value}</Text>
                </View>
            ))}
        </View>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Avakhdaji: state.kundli.Avakhdaji,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AvakhadaChakra);

const styles = StyleSheet.create({
    wrapper: {
        padding: SCREEN_HEIGHT * 0.02,
        backgroundColor: '#F8E8D9',
        flex: 1
    },
    heading: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        marginBottom: SCREEN_HEIGHT * 0.02,
        color: '#5A2A0A',
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_WIDTH * 0.04,
        paddingVertical: SCREEN_HEIGHT * 0.015,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    textKey: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),
      
        flex: 1
    },
    textValue: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),
      
        flex: 1,
        textAlign: 'right'
    }
});
