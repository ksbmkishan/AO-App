import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AstroCallList from '../screens/customer/AstroCallList';
import AstroChatList from '../screens/customer/AstroChatList';
import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants1';
import MyHeader from '../components/MyHeader';

const Tab = createMaterialTopTabNavigator();

const TotalCard = props => {
    useEffect(() => {
        props.navigation.setOptions({
          header: () => (
            <MyHeader
              title="Total Card"
              navigation={props.navigation}
              statusBar={{
                backgroundColor: colors.background_theme2,
                barStyle: 'light-content',
              }}
            />
          ),
        });
      }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="astroCallList" component={AstroCallList} />
      <Tab.Screen name="astroChatList" component={AstroChatList} />
    </Tab.Navigator>
  );
};

export default TotalCard;
