import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import Home from '../screens/home/Home';
import AstroForCall from '../screens/astrologers/AstroForCall';
import AstroBlogs from '../screens/customer/AstroBlogs';
import AstroForChat from '../screens/astrologers/AstroForChat';
import { colors } from '../config/Constants1';
import Feather from 'react-native-vector-icons/Feather';
import { Fonts } from '../assets/style';
import LiveList from '../screens/live/LiveList';


const TabArr = [
  { route: 'home3', label: '', icon: 'home-outline', type: Ionicons, component: Home },
  { route: 'astroForCall', label: '', icon: 'call', type: Ionicons, component: AstroForCall },
  { route: 'astroForChat', label: '', icon: 'chat', type: MaterialIcons, component: AstroForChat },

  { route: 'astroBlog', label: '', icon: 'edit', type: Feather, component: AstroBlogs },
  // { route: 'live', label: 'Live', icon: 'wifi-tethering', type:MaterialIcons, component: LiveList },

];

const Tab = createBottomTabNavigator();

const TabButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const IconComponent = item.type;
  const iconColor = focused ? colors.background_theme2 : Colors.inactiveColor;

  useEffect(() => {
    if (focused) {

      viewRef.current?.animate({
        0: { scale: 0 },
        1: { scale: 1 }
      }, 150);
    } else {
      // Animate scale to 1 and then 0 (fast speed)
      viewRef.current?.animate({
        0: { scale: 1 },
        1: { scale: 0 }
      }, 150);
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animatable.View
        ref={viewRef}
        style={[styles.animatedBackground, { backgroundColor: focused ? colors.background_theme2 : 'transparent' }]}
      />
      <View style={styles.iconContainer}>
        <IconComponent name={item.icon} size={24} color={focused ? 'white' : colors.background_theme2} />
        {focused && <Text style={styles.label}>{item.label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TabButton
            key={label}
            item={TabArr.find(tab => tab.route === route.name)}
            onPress={onPress}
            accessibilityState={{ selected: isFocused }}
          />
        );
      })}
    </View>
  );
}

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName='home3'
    tabBar={props => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
    {TabArr.map((item, index) => (
      <Tab.Screen key={index} name={item.route} component={item.component} options={{ tabBarLabel: item.label }} />
    ))}
  </Tab.Navigator>
);

export default TabNavigator;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: "white",

    paddingVertical: SCREEN_HEIGHT * 0.013,
    paddingHorizontal: SCREEN_WIDTH * 0.01,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    elevation: 30
  },
  animatedBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: SCREEN_HEIGHT * 0.008,
    paddingHorizontal: SCREEN_WIDTH * 0.04,

  },
  label: {
    ...Fonts.PoppinsSemiBold,
    fontSize: 14,
    color: Colors.white,
  },
});
