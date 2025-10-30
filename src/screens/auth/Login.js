import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Linking,
  Alert,
  Keyboard,
} from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { api_url, colors, fonts, signup_google, api2_get_profile, getFontSize } from '../../config/Constants1';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader2';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {
  GoogleSignin,

} from '@react-native-google-signin/google-signin';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import * as AuthActions from '../../redux/actions/AuthActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts, Sizes } from '../../assets/style';

const { width, height } = Dimensions.get('screen');

GoogleSignin.configure();

const Login = props => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState({ callingCode: '91', cca2: 'IN' });
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);

  console.log('hieght: ', SCREEN_HEIGHT , 'width ', SCREEN_WIDTH)


  const login = async () => {
    try {
      const phoneRegex = /^\d{10}$/;

      if (!isChecked) {
        warnign_toast('Please accept the Terms of Use before proceeding');
      } else if (phoneNumber.length === 0) {
        warnign_toast('Please Enter Mobile Number');
      } else if (!phoneRegex.test(phoneNumber)) {
        warnign_toast('Please Enter Correct Mobile Number');
      } else {
        // Proceed with login if all conditions are met
        props.dispatch(AuthActions.onLogin({ phoneNumber: phoneNumber, referred_by: referralCode }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectCountry = (country) => {
    setCode({
      callingCode: country.callingCode[0],
      cca2: country.cca2,
    });
    setCountryModalOpen(false);
  };




  return (
    <View style={{ flex: 1, }}>
      <MyStatusBar
        backgroundColor={colors.background_theme1}
        barStyle="dark-content"
      />
      <MyLoader isVisible={isLoading} />

        <View style={{ alignItems: "center" }}>
          <Image style={{ transform: [{ rotate: '180deg' }], height: SCREEN_HEIGHT * 0.37, width: SCREEN_WIDTH * 1 }} source={require('../../assets/images/design.png')} />
          <Image
            style={{ height: SCREEN_HEIGHT * 0.41, width: SCREEN_WIDTH * 0.6, position: "absolute" }}
            source={require('../../assets/images/guru.png')} />
        </View>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text allowFontScaling={false}
              style={{
                textAlign: 'center',
                fontSize: getFontSize(2.5),

                // ...Fonts.SourGummyItalic,
                color: colors.black_color8,
                fontWeight: "500"
              }}>
              Login
            </Text>
            <Image
              style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.6 }}
              source={require('../../assets/images/design2.png')} />

          </View>
          <View style={{ bottom: SCREEN_HEIGHT * 0.03, paddingHorizontal: 10, gap: Sizes.fixPadding }}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
              <View
                style={{
                  width: '97%',
                  paddingVertical: SCREEN_HEIGHT * 0.003,
                  paddingHorizontal: SCREEN_WIDTH * 0.02,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',

                  borderColor: colors.background_theme4,
                  borderRadius: 10,
                  marginBottom: 5,
                  marginTop: 30, backgroundColor: "lightgray"
                }}>

                <TouchableOpacity onPress={() => setCountryModalOpen(true)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Image
                      style={{
                        width: 25,
                        height: 20,


                      }}
                      source={{
                        uri: `https://flagcdn.com/w320/${code.cca2.toLowerCase()}.png`,
                      }}
                    />
                    <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.3), fontWeight: "500", color: colors.black_color9 }}>
                      {`(${code.cca2}) +${code.callingCode}`}
                    </Text>
                  </View>


                </TouchableOpacity>


                <View style={{ paddingLeft: 1.1 }}>
                  <AntDesign name='caretdown' size={8} color={'black'} />
                </View>

                <TextInput
                  placeholder="Enter Your Mobile Number"
                  placeholderTextColor={colors.black_color6}
                  keyboardType="numeric"
                  onChangeText={text => {

                    if (text.length > 0 && text[0] === '0') {

                      setPhoneNumber(text.slice(1));
                    } else {
                      setPhoneNumber(text);
                    }

                    if (text.length >= 10) {
                      Keyboard.dismiss();
                    }
                  }}
                  style={{ width: '80%', fontSize: getFontSize(1.4), padding: 8,...Fonts.PoppinsMedium }}
                  maxLength={10}
                  onTouchEndCapture={() => console.log('bye')}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => login()}
                  cursorColor={colors.background_theme2}
                  disableFullscreenUI={false}
                />


              </View>
            </KeyboardAvoidingView>

            <View style={{}}>
              <Text style={{ textTransform: "capitalize", ...Fonts.PoppinsMedium, color: "#D56A14", }}>If you have any referral code, please enter</Text>
              <TextInput
                placeholder="Enter Referral Code"
                style={{ backgroundColor: "lightgrey", borderRadius: 10, paddingLeft: 10, color: "#000", ...Fonts.PoppinsMedium }}
                value={referralCode}
                onChangeText={(e) => setReferralCode(e)}
                placeholderTextColor={"#000"}
              />
            </View>


            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>

              <View>
                <BouncyCheckbox
                  size={getFontSize(1.7)}
                  fillColor={colors.background_theme2}
                  onPress={() => setIsChecked(!isChecked)}
                  innerIconStyle={{
                    borderRadius: 5,
                    backgroundColor: isChecked
                      ? colors.background_theme2
                      : colors.background_theme1,
                  }}
                />
              </View>


              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={{ ...Fonts.PoppinsRegular }}>By signing up, you acknowledge and agree to our
                  </Text>


                  <View style={{ flexDirection: 'row', gap: 10, }}>
                    <TouchableOpacity onPress={() => {
                      props.navigation.navigate('TermsofUse')
                    }}>
                      <Text style={[styles.commanText,{textDecorationLine:'underline'}]}> Terms & conditions</Text>
                    </TouchableOpacity>
                    <Text style={[styles.commanText, { ...Fonts.PoppinsMedium }]}>&</Text>
                    <TouchableOpacity onPress={() => {
                      props.navigation.navigate('PrivacyPolicy')
                    }}>
                      <Text style={[styles.commanText,{textDecorationLine:'underline'}]}> Privacy Policy</Text>

                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={login}
              style={{
                width: '97%',
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: height * 0.015,
                paddingVertical: 10,
                backgroundColor: colors.background_theme2,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                // borderWidth:1
              }}>
              <Text allowFontScaling={false} style={{ fontSize: getFontSize(2), paddingRight: 20, fontWeight: 'bold', color: colors.white_color }}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 46, bottom: SCREEN_HEIGHT * 0.01 }}>
              <View style={{ borderBottomWidth: 1, width: SCREEN_WIDTH * 0.33, borderBottomColor: "lightgray" }}>
              </View>
              <View>
                <Text style={{ ...Fonts.PoppinsMedium }}>or</Text>
              </View>
              <View style={{ borderBottomWidth: 1, width: SCREEN_WIDTH * 0.33, borderBottomColor: "lightgray" }}>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: SCREEN_HEIGHT * 0.01, bottom: SCREEN_HEIGHT * 0.01, }}>
              <TouchableOpacity
                style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.17, }}
                onPress={() => { props.dispatch(AuthActions.onGoogleLogin()) }}>
                <Image
                  resizeMode='contain'
                  style={{ height: '100%', width: '100%' }}
                  source={require('../../assets/icons/google2.webp')} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: SCREEN_HEIGHT * 0.052, width: SCREEN_WIDTH * 0.11 }}
                onPress={() => Linking.openURL('https://www.facebook.com/')}>
                <Image
                  resizeMode='contain'
                  style={{ height: '100%', width: '100%' }}
                  source={require('../../assets/images/facebook1.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <CountryPicker
            visible={countryModalOpen}
            withFlag
            withCallingCode
            withFilter
            withCountryNameButton={false}
            renderFlagButton={() => <View />}
            onSelect={handleSelectCountry}
            onClose={() => setCountryModalOpen(false)}
            modalProps={{
              style: { ...styles.modalContainer },
              headerStyle: styles.modalHeader,
              headerTextStyle: styles.modalHeaderText,
            }}
          />
        </View>
    </View >

  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  loginButtonContainer: {
    flex: 0,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: colors.background_theme4
  },
  loginButtonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme4,
    fontFamily: fonts.medium,
  },
  modalContainer: {
    width: '50%',
    // maxWidth: 500, 
    alignSelf: 'center',
  },
  commanText: {
    ...Fonts.PoppinsRegular
  }
});
