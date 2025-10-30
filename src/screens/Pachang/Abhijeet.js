import { View, Text, Image } from 'react-native';
import React from 'react';


import { useEffect } from 'react';




import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';


const Abhijeet = ({ dispatch, chartData, route, basicDetails, Abhijeetmahurat }) => {
    console.log("Abhijeetmahurat", Abhijeetmahurat);

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
        };

        console.log("Payload sent:door", payload);
        dispatch(KundliActions.getAbhijeet(payload));
    }, [dispatch]);

    return (
        <View style={{ flex: 1, }}>



        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    Abhijeetmahurat: state.kundli.Abhijeetmahurat
});

export default connect(mapStateToProps, mapDispatchToProps)(Abhijeet)