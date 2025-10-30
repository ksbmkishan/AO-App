import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import KaalSarrp from './KaalSarrp';
import KalsarpRemedies from './KalsarpRemedies';



const Tab = createMaterialTopTabNavigator();
const Kaalsarpmain = () => {
    return (
        <View style={{ backgroundColor: "F8E8D9",height:SCREEN_HEIGHT*0.8 }}>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                   
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>

                <Tab.Screen
                    name={"Kaalsarp Yoga Report"}
                    component={KaalSarrp}

                />

                <Tab.Screen
                    name={"Kaalsarp Yoga Remedies"}
                    component={KalsarpRemedies}

                />






            </Tab.Navigator>
        </View>
    )
}

export default Kaalsarpmain

const styles = StyleSheet.create({})