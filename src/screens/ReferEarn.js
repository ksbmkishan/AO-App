import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Linking, Alert, Clipboard, ToastAndroi, ToastAndroid } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'

import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../config/Constants1'
import { Sizes } from '../assets/style'
import OvalFrame from './OvalFrame'
import { FontsStyle, normalize } from '../config/constants'
import { useTranslation } from 'react-i18next'



const ReferEarn = () => {
  const customerData = useSelector((state) => state.customer.customerData);
  console.log("customerData", customerData)
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={{
   
    }}> 
      <OvalFrame count={customerData?.referral_count}/>
      {back()}
      {refer()}
      {PHOTO()}
      {WELCOMETEXT()}
      {refercode()}
      </View>

  )
  function refer() {
    return (
      <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.04, }}>
        <Text style={{ color: "black", fontWeight: "800",...FontsStyle.fontfamily, fontSize: normalize(18),}}>{t("Share & Shine: Divine Rewards")}</Text>
      </View>
    )
  }
  function PHOTO() {
    return (
      <View style={{ alignItems: "center",top:10 }}>
        <Image
          style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2,objectFit:'fill' }}
          source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/Share_Shine.png'}} />
      </View>
    )
  }
  function WELCOMETEXT() {
    return (
      <View style={{ alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.11, paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text style={{color: "black",  fontWeight: "bold",lineHeight:normalize(16),textAlign:'center',...FontsStyle.fontfamily,fontSize: normalize(16)}}>{t("🌸✨ Welcome to Your Sacred Circle! ✨🌸")}{'\n'}</Text>
        <Text style={{ color: "black", fontWeight: "500",lineHeight:normalize(16),textAlign:'center',...FontsStyle.fontfamily , fontSize: normalize(12)}}>
        
            {t("🌼 Add a 🌺 flower to your 🌿 Rudraksha Mala with every divine step.")}{'\n'}
            {t("🎯 Reach 108 referrals to become a 🌟 Vishisht Bhakt!")}{'\n'}
            {t("👑 The Top 6 Bhakts with the most 👥 followers are 🌞 featured daily in the 🛕 Sanatan Mandir.")}{'\n'}{'\n'}

            {t("💖 Let your 💫 devotion blossom and your name shine bright! 🌈🙏")}
         </Text>
      </View>
    )
  }
  function refercode() {
    return (
      <View>
        <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.03 }}>
          <Text style={{ color: "black", fontWeight: "bold",textAlign:"center" ,...FontsStyle.fontfamily,fontSize: normalize(15),}}>
          {t("🔑 Your Exclusive Code")}
          
            </Text>
            <Text style={{ color: "black",  fontWeight: "500",textAlign:"center",...FontsStyle.fontfamily,fontSize: normalize(11),width:SCREEN_WIDTH * 0.8 }}>📲 {t("Share your ✨ divine invite & grow your 🌸 sacred circle!")}</Text>
          <Text
          onPress={() => {
            const referralCode = customerData?.referral_code || 'default_code';
            Clipboard.setString(referralCode);
            ToastAndroid.show('Referral code copied to clipboard!', ToastAndroid.SHORT);  
          }}
          style={{ color: "#D56A14",  marginTop: 5, fontWeight: "600",borderWidth:1, paddingVertical:10, paddingHorizontal:20, borderRadius:Sizes.fixPadding * 10, borderColor:colors.background_theme2 ,  fontSize:normalize(12)}}>{customerData?.phoneNumber || 'N/A'}</Text>
        </View>
          <View style={{alignSelf:'center',paddingVertical: SCREEN_HEIGHT * 0.01,flexDirection:'row',alignItems:'center' }}>
            <Text style={{color:'black',...FontsStyle.fontfamily}}>{t("Referral Count")}: </Text>
            <Text style={{color: colors.background_theme2, fontWeight:'bold'}}>{customerData?.referral_count}</Text>
          </View>
        <TouchableOpacity
         onPress={() => {
          const referralCode = customerData?.referral_code || 'default_code';
          const message = `Join AstroOne with my referral code ${customerData?.phoneNumber} and unlock God’s blessings, celestial wisdom, and life-changing remedies! 🌟 This is the moment you have always been waiting for—your destiny is calling. Embrace your divine path NOW! 🙏🔥`;
          const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
          Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'WhatsApp is not installed on your device.')
          );
        }}
        style={{
          backgroundColor:"#FBBC09",
          alignSelf:"center",
          display:"flex",
          flexDirection:"row",
          alignItems:'center',
          borderRadius:50,
          paddingHorizontal:10,
          gap:5,
          }}>
            
          <Image
              style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.09, resizeMode: "contain" }}
              source={require('../assets/images/whatsapp_logo.png',)} />
            <Text style={{  color: "white", fontWeight: "500",...FontsStyle.fontfamily,fontSize: normalize(11) }}>{t("Share the link via Whatsapp")}</Text>
         
        </TouchableOpacity>



      </View>
    )
  }
  function back() {
    return (
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.025 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
         <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    )
  }
}

export default ReferEarn

const styles = StyleSheet.create({})