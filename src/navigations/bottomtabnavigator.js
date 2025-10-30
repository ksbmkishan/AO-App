import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home1 from '../Screens/Home/Home1';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useEffect,useRef } from 'react';

import Feather from 'react-native-vector-icons/Feather'
// import call from '../Screens/tabScreens/Call';
import live from '../Screens/tabScreens/live';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Style';
import chat from '../Screens/tabScreens/chat';
import Profile from '../Screens/tabScreens/Profile';
import Call1 from '../Screens/tabScreens/Call1';
import AstroBlog from '../Screens/AstroBlog';
import Icons from '../config/Components/Icons'
import { Icon } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';



const TabArr = [
    { route: 'Astroblog', label: 'Astroblog', type: Feather, activeIcon: 'edit', inActiveIcon: 'edit', component: AstroBlog ,Color:Colors.background_theme1,aplhaclr:Colors.background_theme1},
    { route: 'CALL', label: 'CALL', type: Ionicons, activeIcon: 'call', inActiveIcon: 'call', component: Call1 ,Color:Colors.background_theme1,aplhaclr:Colors.background_theme1},
    { route: 'HOME', label: 'HOME', type: Ionicons, activeIcon: 'home-outline', inActiveIcon: 'home-outline', component: Home1,Color:Colors.background_theme1,aplhaclr:Colors.background_theme1 },
    { route: 'CHAT', label: 'CHAT', type: MaterialIcons, activeIcon: 'chat', inActiveIcon: 'chat', component: chat ,Color:Colors.background_theme1,aplhaclr:Colors.background_theme1},
    // { route: 'LIVE', label: 'LIVE', type: MaterialIcons, activeIcon: 'wifi-tethering', inActiveIcon: 'wifi-tethering', component: live,Color:Colors.background_theme1,aplhaclr:Colors.background_theme1 },
];


const TabButton = ({ item, onPress, accessibilityState }) => {
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const IconComponent = item.type;
    const iconColor = focused ? Colors.background_theme1 : Colors.inactiveColor;

    useEffect(() => {
        if (focused) {
          viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1  } });
        } else {
          viewRef.current.animate({ 0: { scale: 1}, 1: { scale: 0 } });
        }
      }, [focused])

    return (
      
        <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center",}} onPress={onPress}>

            <View>
                <Animatable.View
                style={[StyleSheet.absoluteFill,{backgroundColor:item.Color,borderRadius:10,alignContent:"center",justifyContent:"center",paddingVertical:SCREEN_HEIGHT*0.013,paddingHorizontal:SCREEN_WIDTH*0.08}]}
                ref={viewRef}
                />
                <View style={{flexDirection:"row",alignItems:'center',borderRadius:16,gap:5,paddingVertical:SCREEN_HEIGHT*0.008,paddingHorizontal:SCREEN_WIDTH*0.04}}>
                <IconComponent name={focused ? item.activeIcon : item.inActiveIcon}  color={focused ? "white" : Colors.background_theme1} size={20} />
                <Text style={[styles.label, { color: "white" ,fontSize:10 }]}>{item.label}</Text>
                </View>
            </View>
            
          
        </TouchableOpacity>
      
    );
};



const Tab = createBottomTabNavigator();
const bottomtabnavigator = () => {
    return (


        <Tab.Navigator initialRouteName="HOME"
            screenOptions={{
                tabBarActiveTintColor: Colors.background_theme1,
                tabBarInactiveTintColor: Colors.inactiveColor,
                tabBarStyle: {
                    height:SCREEN_HEIGHT*0.06,
                    // bottom:10,
                    // marginLeft:10,
                    // marginRight:10,borderRadius:20,position:"absolute",
                    paddingLeft:SCREEN_WIDTH*0.05

                }

            }}>
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarLabel: item.label,
                            tabBarIcon: ({ color, focused }) => {
                                const IconComponent = item.type;
                                return (
                                    <IconComponent
                                        name={focused ? item.activeIcon : item.inActiveIcon}
                                        color={color}
                                        size={23}
                                    />
                                );
                            },



                            tabBarButton: (props) => <TabButton {...props} item={item} />

                        }}
                    />
                )
            })}

        </Tab.Navigator>



    )
};


export default bottomtabnavigator

const styles = StyleSheet.create({})