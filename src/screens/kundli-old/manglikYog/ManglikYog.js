import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import ManglikRemedies from './ManglikRemedies';
import MnaglikBriefReport from './MnaglikBriefReport';



const Tab = createMaterialTopTabNavigator();
const ManglikYog = () => {
    return (
        <View style={{height:SCREEN_HEIGHT*0.8}}>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                   
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>


                <Tab.Screen
                    name={"Manglik Yoga Report"}
                    component={MnaglikBriefReport}

                />
                <Tab.Screen
                    name={"Manglik Yoga Remedies"}
                    component={ManglikRemedies}

                />




            </Tab.Navigator>
        </View>
    )
}

export default ManglikYog

const styles = StyleSheet.create({})