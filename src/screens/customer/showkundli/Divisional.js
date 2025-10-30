import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
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
import { Sizes } from '../../../assets/style';
const Divisional = ({ dispatch, kundliDX, route, basicDetails }) => {

    const [current, setCurrent] = useState('Hara (D-2)');


    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
            data: route?.params?.data || 'moon'
        };

        console.log("Payload sent:", payload);
        dispatch(KundliActions.getKundliChartDx(payload));
    }, [dispatch, route?.params?.data, basicDetails?.lat, basicDetails?.lon]);



    // useEffect(() => {
    //     dispatch(KundliActions.getKundliChartDx(2));
    // }, [route]);

    const DivisionalArray = [{

        name: 'Navamsa (D-9)', value: 9
    },
    { name: 'Hara (D-2)', value: 2 },
    { name: 'Drekkana (D-3)', value: 3 },
    { name: 'Chaturthamsa (D-4)', value: 4 },
    { name: 'Saptamsa (D-7)', value: 7 },
    
    { name: 'Dasamsa (D-10)', value: 10 },
    { name: 'Dwadasamsa (D-12)', value: 12 },
    { name: 'Shodasamsa (D-16)', value: 16 },
    { name: 'Vimsamsa (D-20)', value: 20 },
    { name: 'Chaturvimsamsa', value: 24 },
    { name: 'Saptavimsamsa', value: 27 },
    { name: 'Khavedamsa', value: 30 },
    { name: 'Akshavedamsa', value: 40 },
    {
        name: 'Shastiamsa', value: 45
    },
    { name: 'Shashtyamsha', value: 60 },

    ];

    const handleKundliCharts = (item) => {
        setCurrent(item.name)
        dispatch(KundliActions.getKundliChartDx(item?.value));
    }

    return (
        <View style={{ flex: 1, alignSelf: 'center', paddingHorizontal: 20, height: SCREEN_HEIGHT }}>
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }}>
                    {DivisionalArray.map((item, index) => (
                        <TouchableOpacity key={index}
                            style={{ paddingHorizontal: 10, paddingVertical: 5, borderWidth: current == item.name ? 2 : 1, borderRadius: 10, margin: 10 }}
                            onPress={() => handleKundliCharts(item)}>
                            <Text style={{ color: 'black' }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={{ height: SCREEN_HEIGHT * 0.45, width: SCREEN_WIDTH * 0.96, }}>
                <Image
                    source={{ uri: kundliDX?.url }}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    resizeMode='contain'
                />
            </View>

        </View>

    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    kundliDX: state.kundli.kundliDX
});

export default connect(mapStateToProps, mapDispatchToProps)(Divisional)