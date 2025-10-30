import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';

import AscendentPridiction from './AscendentPridiction';
import HousePridiction from './HousePridiction';
import RashiPrediction from './RashiPrediction';
import NumerologyPridiction from './NumerologyPridiction';
import NumerologyNameAlphabet from './NumerologyNameAlphabet';
import NumerologyPersonalYear from './NumerologyPersonalYear';
import NumerologyPersonalDay from './NumerologyPersonalDay';
import EducationReport from './Philosophy/EducationReport';
import RomanticAnalysisReport from './Philosophy/RomanticAnalysisReport';
import Nakshtraprediction from './Nakshtraprediction';
import FinancePrediction from './FinancePrediction';
import PersnalityReportPrediction from './PersnalityReportPrediction';
import Lalkitaab from './Lalkitaab';
import NumeroogyDestination from './NumeroogyDestination';
import HoroscopePredictions from './HoroscopePredictions';


const Tab = createMaterialTopTabNavigator();
const WhoAMI = () => {
    return (
        <View style={{ backgroundColor: "F8E8D9",height:SCREEN_HEIGHT*0.95 }}>

            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                  
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>

                <Tab.Screen
                    name={"Ascendent Prediction"}
                    component={AscendentPridiction}

                />



                <Tab.Screen
                    name={"Moon Sign Predictions"}
                    component={HoroscopePredictions}

                />



                <Tab.Screen
                    name={"Nakshtra prediction"}
                    component={Nakshtraprediction}

                />






                <Tab.Screen
                    name={"Rashi Prediction"}
                    component={RashiPrediction}

                />


                <Tab.Screen
                    name={"Lalkitaab Prediction"}
                    component={Lalkitaab}

                />











            </Tab.Navigator>

            
        </View>
    )
}

export default WhoAMI

const styles = StyleSheet.create({})