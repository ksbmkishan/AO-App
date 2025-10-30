import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT } from '../../config/Screen'
import Header from '../TempleScreens/Components/header'
import MyHeader from '../../components/MyHeader'
import { FontsStyle, normalize } from '../../config/constants'
import { SafeAreaView } from 'react-native'
import MyStatusBar from '../../components/MyStatusbar'
import { colors } from '../../config/Constants1'
import { useTranslation } from 'react-i18next'

const Dham = ({ navigation}) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
        <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <MyHeader title="Teerth Dham" navigation={navigation} />
        <View style={{flex: 1, width: '100%'}}>
        <Image source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/three.png'}} style={{width: '100%', height: SCREEN_HEIGHT}} resizeMode="cover" />
        </View>
      <View style={{position: 'absolute', bottom: 50, alignSelf: 'center'}}>
       <TouchableOpacity style={styles.button}
       activeOpacity={0.7}
       onPress={() => navigation.navigate('selectmapsantan')}>
         <Text style={styles.text}>✨ “{t("Ghar Baithe Teerth Darshan")}”: </Text>
         <Text style={styles.textBold}>{t("AR (Augmented Reality)")}</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button}
       activeOpacity={0.7}
       onPress={() => navigation.navigate('selectmapvr')}>
         <Text style={styles.text}>🌌 “{t("Adbhut Teerth Yatra Anubhav")}”:</Text>
          <Text style={styles.textBold}>{t("VR (Virtual Reality)")}</Text>
       </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Dham

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: normalize(15),
    ...FontsStyle.fontBold,
    fontStyle:'italic',
    color:'white'
  },
  textBold: {
    ...FontsStyle.fontBold,
 color:'white'
    
  },
  button: {
    backgroundColor: colors.background_theme2,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
    shadowRadius: 3, // for iOS shadow
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    
  }
})