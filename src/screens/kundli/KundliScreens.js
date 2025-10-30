import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShowKundliKpPlanets from './ShowKundliKpPlanets';
import KpBirthDetails from './KpBirthDetails';


const Tab = createMaterialTopTabNavigator();

const KundliScreens = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="KP Planets" component={ShowKundliKpPlanets} />
      <Tab.Screen name="Kp Birth Details" component={KpBirthDetails} />
    </Tab.Navigator>
  )
}

export default KundliScreens

const styles = StyleSheet.create({})