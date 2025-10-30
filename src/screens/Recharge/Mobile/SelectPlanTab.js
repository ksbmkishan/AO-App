import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { useDispatch, useSelector } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import Popular from './Popular';
import { Colors } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';

const Tab = createMaterialTopTabNavigator();

const SelectPlanTab = ({}) => {
  const dispatch = useDispatch();
   const { circleList, isLoading,mobilePlansData } = useSelector(state => state.rechargeReducer);

   useEffect(()=>{
 dispatch(RechargeActions.getMobilePlans());
   },[])
   console.log('CheckPlansInTab::::KKK',mobilePlansData)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: Colors.secondryTheme,
        tabBarInactiveTintColor: '#444',
        tabBarIndicatorStyle: { backgroundColor: Colors.secondryTheme },
        tabBarLabelStyle: {
          fontSize: 12,
          ...Fonts.PoppinsMedium,
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      {mobilePlansData &&
        Object.entries(mobilePlansData).map(([tabName, plans]) => (
          <Tab.Screen
            key={tabName || 'default'}
            name={tabName || 'Default'}
          >
            {() => <Popular plans={plans} />}
          </Tab.Screen>
      ))}

    
    </Tab.Navigator>
  );
};

export default SelectPlanTab;