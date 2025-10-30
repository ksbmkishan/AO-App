import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Panchangscreen from './Panchangscreen';
import Chogadiya from './Chogadiya';
import Mahurat from './Mahurat';
import Yog from './Yog';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import MyHeader from '../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../config/Constants1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import DurMahurat from './DurMahurat';
import Abhijeet from './Abhijeet';
import { FontsStyle, normalize } from '../../config/constants';
import { useTranslation } from 'react-i18next';
const Tab = createMaterialTopTabNavigator();

const NewPanchang = () => {
  const route = useRoute();
  const initialTab = route.params?.screen || 'Panchang';

  const {t} = useTranslation();

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SCREEN_WIDTH * 0.06,
          paddingVertical: SCREEN_HEIGHT * 0.01,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={30} color={colors.black_color} />
        </TouchableOpacity>
        <Text style={{ ...FontsStyle.font, fontWeight:'bold'}}>{t("Panchang")}</Text>
      </View>

      <Tab.Navigator
        initialRouteName={initialTab}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#D56A14',
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
          },
          tabBarItemStyle: {
            width: SCREEN_WIDTH * 0.3,
          },
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarLabelStyle: {
            fontWeight: '500',
            ...FontsStyle.fontfamily,
            fontSize: normalize(11),
          },
        }}>
        <Tab.Screen name={t("Panchang")} component={Panchangscreen} />
        <Tab.Screen name={t("Muhurat")} component={Mahurat} />
        <Tab.Screen name={t("Chogadiya")} component={Chogadiya} />
      </Tab.Navigator>

    </View>
  );
};

export default NewPanchang;

const styles = StyleSheet.create({});
