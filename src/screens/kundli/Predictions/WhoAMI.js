import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import AscendantPridiction from './AscendantPridiction';
import SignPrediction from './SignPrediction';
import Nakshatra from './Nakshatra';
import BhavPrediction from './BhavPrediction';
import { FontsStyle, normalize } from '../../../config/constants';
import { useTranslation } from 'react-i18next';




const Tab = createMaterialTopTabNavigator();
const WhoAMI = () => {

    const {t} = useTranslation();
    return (
        <View style={{ backgroundColor: "F8E8D9", height: SCREEN_HEIGHT * 0.95 }}>

            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...FontsStyle.font, fontSize: normalize(13)},
                    tabBarGap: 0,

                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>

                <Tab.Screen
                    name={t("Ascendent Prediction")}
                    component={AscendantPridiction}

                />



                <Tab.Screen
                    name={t("Moon Sign Predictions")}
                    component={SignPrediction}

                />



                <Tab.Screen
                    name={t("Nakshtra prediction")}
                    component={Nakshatra}

                />






                {/* <Tab.Screen
                    name={"Bhav Prediction"}
                    component={BhavPrediction}

                /> */}














            </Tab.Navigator>


        </View>
    )
}

export default WhoAMI

const styles = StyleSheet.create({})