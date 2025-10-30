import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import MyHeader from '../components/MyHeader';
import { Fonts, Sizes } from '../assets/style';
import { Image } from 'react-native';
import { FontsStyle } from '../config/constants';
import { useTranslation } from 'react-i18next';
import RenderHTML from 'react-native-render-html';
import { SCREEN_WIDTH } from '../config/Screen';
import { aboutHtml } from '../components/htmlAbout';
import WebView from 'react-native-webview';

const About = ({ navigation }) => {

  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={'About AstroOne'} navigation={navigation} />
 <WebView
      originWhitelist={['*']}
      source={{ html: aboutHtml[`${t('lang')}`] }}
      style={{ flex: 1}}
    />
      
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    ...FontsStyle.fontfamily,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight:'bold'
  },
  subHeading: {
   ...FontsStyle.fontfamily,
    color: '#2C3E50',
    marginVertical: 10,
    fontWeight:'800'
  },
  paragraph: {
    color: '#555',
    marginBottom: 10,
    ...FontsStyle.fontfamily,
    textAlign:'justify'
  },
  boldDot: {
   ...FontsStyle.fontfamily,
  }
});
