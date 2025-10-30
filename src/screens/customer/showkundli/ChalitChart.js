import { View, Text, Image } from 'react-native';
import React from 'react';
import ChartComponent from './ChartComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getChart } from '../../../config/apiService';
import MyLoader from '../../../components/MyLoader';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';
import WebView from 'react-native-webview';

const ChalitChart = ({ dispatch, chartData, route, basicDetails, chalitChart }) => {
    console.log("ChalitChart:::kkK", chalitChart);

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
        };

        console.log("Payload sent:", payload);
        dispatch(KundliActions.getChalitChart(payload));
    }, [dispatch]);

    return (
        <View style={{ flex: 1, }}>

            {chalitChart ? (
                <View style={{ height: SCREEN_HEIGHT * 0.45, width: SCREEN_WIDTH * 0.96, paddingHorizontal: 2, top: 0, alignSelf: 'center', borderRadius: 8 }}>
                    <View style={{ height: '100%', width: '100%' }}>
                        <Image source={{ uri: chalitChart || undefined }} style={{ height: '100%', width: '100%', alignItems: 'center' }} resizeMode='contain' />
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={{ ...Fonts.PoppinsMedium, textAlign: 'center' }}>No Chart Data Found</Text>
                </View>
            )}

        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    chalitChart: state.kundli.chalitChart
});

export default connect(mapStateToProps, mapDispatchToProps)(ChalitChart)