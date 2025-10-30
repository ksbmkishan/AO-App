import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';

import { SCREEN_WIDTH } from '../../../config/Screen';

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
const AllPridictions = () => {
    return (
        <View style={{ backgroundColor: "F8E8D9" }}>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                    tabBarStyle: { flex: 1 },
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>

                <Tab.Screen
                    name={"Ascendent Prediction"}
                    component={AscendentPridiction}

                />

                <Tab.Screen
                    name={"House Prediction"}
                    component={HousePridiction}

                />

                <Tab.Screen
                    name={"Rashi Prediction"}
                    component={RashiPrediction}

                />


                <Tab.Screen
                    name={"Numerology Prediction"}
                    component={NumerologyPridiction}

                />

                <Tab.Screen
                    name={"Numerology Name Alphabet"}
                    component={NumerologyNameAlphabet}

                />

                <Tab.Screen
                    name={"Numerology Personal Year"}
                    component={NumerologyPersonalYear}

                />

                <Tab.Screen
                    name={"Numerology Personal Day"}
                    component={NumerologyPersonalDay}

                />
                <Tab.Screen
                    name={"Philosophy/Education Report"}
                    component={EducationReport}

                />
                <Tab.Screen
                    name={"Romantic Analysis Report"}
                    component={RomanticAnalysisReport}

                />

                <Tab.Screen
                    name={"Nakshtra prediction"}
                    component={Nakshtraprediction}

                />

                <Tab.Screen
                    name={"Finance Prediction"}
                    component={FinancePrediction}

                />

                <Tab.Screen
                    name={"Personality Report Prediction"}
                    component={PersnalityReportPrediction}

                />

                <Tab.Screen
                    name={"Lalkitaab Prediction"}
                    component={Lalkitaab}

                />

                <Tab.Screen
                    name={"Numerology Destination Number"}
                    component={NumeroogyDestination}

                />


                <Tab.Screen
                    name={"Horoscope Predictions"}
                    component={HoroscopePredictions}

                />






            </Tab.Navigator>
        </View>
    )
}

export default AllPridictions

const styles = StyleSheet.create({})