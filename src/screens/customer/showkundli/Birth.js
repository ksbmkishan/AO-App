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

const Birth = ({ dispatch, chartData, route, basicDetails }) => {
  console.log("chartData inside page :: ", chartData);

  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat,
      lon: basicDetails?.lon,
      data: route?.params?.data || 'birth'
    };

    console.log("Payload sent:", payload);
    dispatch(KundliActions.getKundliChartData(payload));
  }, [dispatch, route?.params?.data, basicDetails?.lat, basicDetails?.lon]);

  return (
    <View style={{
      flex: 1, height: SCREEN_HEIGHT,
      paddingTop:SCREEN_HEIGHT*0.06
    }}>

      {chartData ? (

        <View style={{ width: SCREEN_WIDTH * 2.74, height: SCREEN_HEIGHT * 2.2, paddingHorizontal: 4, top: 2 }}>
          <WebView source={{ uri: chartData || undefined }} style={{ height: '100%', width: '100%', alignItems: 'center' }} />
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
  chartData: state.kundli.chartData
});

export default connect(mapStateToProps, mapDispatchToProps)(Birth)