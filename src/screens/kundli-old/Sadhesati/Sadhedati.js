import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';
import Sadhesaticurrent from './Sadhesaticurrent';
import SadhesatiDetails from './SadhesatiDetails';
import Sadhesatibriefreport from './Sadhesatibriefreport';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import sadhesatiRemedies from './sadhesatiRemedies';
import SadesatiRemediesReport from './SadesatiRemediesReport';
import SadesatiRunningLifeReport from './SadesatiRunningLifeReport';


const Tab = createMaterialTopTabNavigator();
const Sadhedati = () => {
    return (
        <View style={{height:SCREEN_HEIGHT*0.8,backgroundColor:'#F8E8D9'}}>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                    
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>
                {/* <Tab.Screen
                    name={"Sadhesati Details"}
                    component={SadhesatiDetails}

                />
                <Tab.Screen
                    name={"Sadhesati current"}
                    component={Sadhesaticurrent}

                /> */}
                <Tab.Screen
                    name={"Sadesati Current Status Report"}
                    component={Sadhesatibriefreport}

                />
                {/* <Tab.Screen
                    name={"Sadhesati Remedies"}
                    component={sadhesatiRemedies}

                /> */}
                <Tab.Screen
                    name={"Sadesati Life Report"}
                    component={SadesatiRunningLifeReport}

                />
                <Tab.Screen
                    name={"Sadesati Remedies"}
                    component={SadesatiRemediesReport}

                />


            </Tab.Navigator>
        </View>
    )
}

export default Sadhedati

const styles = StyleSheet.create({})