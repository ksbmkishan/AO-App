
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants1';

import MyHeader from '../components/MyHeader';
import OpenMatching from '../screens/customer/OpenMatching';
import { useTranslation } from 'react-i18next';
import NewMatching from '../screens/kundli/NewMatching';
import OpenMatching1 from '../screens/kundli/Match/OpenMatching1';
import { FontsStyle } from '../config/constants';

const Tab = createMaterialTopTabNavigator();

const Matching1 = props => {
  
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={t("matching")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),    });
  }, []);
  return (
    <Tab.Navigator
    style={{
      ...FontsStyle.font
    }}>
      <Tab.Screen name="openMatching" component={OpenMatching1} />
      <Tab.Screen name={t("new Matching")} component={NewMatching} />
    </Tab.Navigator>
  );
};

export default Matching1;
