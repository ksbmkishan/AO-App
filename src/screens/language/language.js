import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors, getFontSize } from '../../config/Constants1';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { api_url, whaticanask } from '../../config/Constants1';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n';

const Language = (props) => {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    props.navigation.setOptions({
      title: t("ln"),
      headerTintColor: colors.white_color,
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.background_theme2,
      },
      headerTitleStyle: {
        fontSize: getFontSize(2), // Set the desired font size here
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{ flex: 0 }}>
          <AntDesign
            name="arrowleft"
            color={colors.white_color}
            size={getFontSize(2.2)}
          />
        </TouchableOpacity>
      ),

    }), []
  });

  const changeLanguage = async (language) => {
    // Save the selected language in AsyncStorage
    await AsyncStorage.setItem('selectedLanguage', language);
   
      // Change the language using i18next
      i18n.changeLanguage(language);

      // Optionally, you can also reload the app or navigate to a different screen
      // to apply the language change throughout the app
      props.navigation.goBack(); // Replace 'Home' with your desired screen name

  };



  return (
    <View style={{ margin: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: i18n.language == 'en' ? '#f4a261' : '#ddd',
          padding: 20,
          borderRadius: 10,
          marginBottom: 20
        }}
        activeOpacity={0.8}
        onPress={() => changeLanguage('en')}>
        <Text allowFontScaling={false} style={{ fontSize: 22, fontWeight: 'bold', fontSize: getFontSize(1.8), color: i18n.language == 'en' ? 'white' : 'black' }}>{t("en")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: i18n.language == 'hi' ? '#f4a261' : '#ddd', padding: 20, borderRadius: 10 }}
        activeOpacity={0.8}
        onPress={() => changeLanguage('hi')}>
        <Text allowFontScaling={false} style={{ fontSize: 22, fontWeight: 'bold', fontSize: getFontSize(1.8), color: i18n.language == 'hi' ? 'white' : 'black' }}>{t("hi")}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ backgroundColor: i18n.language == 'ma' ? '#f4a261':'#ddd', padding: 20, borderRadius: 10 , marginTop:20}}
        activeOpacity={0.8}
        onPress={() => changeLanguage('ma')}>
        <Text allowFontScaling={false} style={{ fontSize: 22, fontWeight: 'bold', fontSize: getFontSize(1.8), color: i18n.language == 'ma' ? 'white':'black'  }}>{t("ma")}</Text>
      </TouchableOpacity> */}
      {/* <Text style={{color:'black',textAlign:'center',paddingVertical:100}}>Coming Soon...</Text> */}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemHeader: {
    padding: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black_color
  },
  itemContent: {
    padding: 16,
    color: colors.black_color,
    fontSize: 12,
    backgroundColor: '#f1f1f1'
  },
});

export default Language