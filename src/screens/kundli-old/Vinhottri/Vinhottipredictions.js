import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';

import { SCREEN_WIDTH } from '../../../config/Screen';
import VinhotariPrediction from './VinhotariPrediction';
import LifeForecastPrediction from './LifeForecastPrediction';




const Tab = createMaterialTopTabNavigator();
const Vinhottipredictions = () => {
    return (
        <View style={{ backgroundColor: "F8E8D9" }}>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                    tabBarStyle: { flex: 1 },
                    tabBarItemStyle: { width: SCREEN_WIDTH , },
                }}>

                <Tab.Screen
                    name={"Vinshottari  Prediction"}
                    component={VinhotariPrediction}

                />


                {/* <Tab.Screen
                    name={"Life Forecast Prediction"}
                    component={LifeForecastPrediction}

                /> */}







            </Tab.Navigator>
        </View>
    )
}

export default Vinhottipredictions

const styles = StyleSheet.create({})