import { View, Text, TouchableOpacity, Image, Dimensions, Alert, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, fonts, getFontSize } from '../config/Constants1';
import { connect } from 'react-redux';
import { openFacebook, openInstagram, openYoutube } from './Methods';
import { useTranslation } from 'react-i18next';
import { showNumber, showNumber0 } from '../utils/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts, Sizes } from '../assets/style';
import { mainlogo } from '../assets/images/Images';
import FastImage from "@d11/react-native-fast-image";;

const { width, height } = Dimensions.get('screen');
const HomeHeader = props => {
  const { t } = useTranslation();
  { title = "AstroOne" }
  useEffect(() => {
    console.log("cus-data", props?.customerData)
    if (props?.customerData?.banned_status) {
      Alert.alert("AstroOne", "You are banned, Please contact administrator")
      props.navigation.navigate('login')
    }
  }, [])

  const showNumber0 = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 10000) {
      return (num / 1000).toFixed(0) + 'K';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toFixed(2);
    }
  };



  return (
    <View
      style={{
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        paddingVertical: SCREEN_HEIGHT * 0.015,
        elevation: 1,

        backgroundColor: colors.white_color,


      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>


        <TouchableOpacity
          activeOpacity={0.8}
          // style={{}}
          onPress={() => props.navigation.openDrawer()}
          // onPress={() => console.log('first')}
          style={{ elevation: 3, zIndex: 4, }}>
          <FontAwesome name="bars" color={colors.black_color} size={28} />
        </TouchableOpacity>
        {/* <Image source={mainlogo}
        style={{ width: SCREEN_WIDTH*0.08, height: SCREEN_HEIGHT*0.05,  resizeMode:'center',marginLeft:Sizes.fixPadding }} />    */}
        <View style={{ width: SCREEN_WIDTH * 0.4, justifyContent: "center", paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <TouchableOpacity 
        onPress={() => props.navigation.navigate('language')

        }>
          <FontAwesome
            name="language"
            color={colors.background_theme2}
            size={getFontSize(3)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('notifications')}
          style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding }}>
          {
            props?.notificationCounts != 0 && <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: getFontSize(1.2),
                justifyContent: 'center',
                position: 'absolute',
                left: getFontSize(1.3),
                bottom: getFontSize(1.3),
                zIndex: 1,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.2),
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  color: colors.red_color1,

                }}>
                {props?.notificationCounts ?? ''}
              </Text>
            </View>
          }
          <FontAwesome name="bell-o" color={colors.background_theme2} size={getFontSize(2.6)} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('wallet')}
          style={styles.walletContainer}>
          <View style={styles.walletIconContainer}>
            <View style={{ alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.06, height: SCREEN_HEIGHT * 0.028, }}>
              <FastImage

                style={{ width: SCREEN_WIDTH * 0.06, height: SCREEN_HEIGHT * 0.023, resizeMode: "contain" }}
                source={{ uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/gif/wallet_gif.gif'}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>

          </View>
          <View>
            <Text style={styles.walletText}>{showNumber0(props.customerData?.wallet_balance ?? 0)}</Text>
          </View>

        </TouchableOpacity>


      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  notificationData: state.customer.notificationData,
  notificationCounts: state.customer.notificationCounts,
});

export default connect(mapStateToProps)(HomeHeader);
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SCREEN_HEIGHT * 0.015,
    backgroundColor: "white",
    paddingHorizontal: SCREEN_WIDTH * 0.015,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  headerTitle: {
    ...Fonts.PoppinsMedium,
    fontSize: 20
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  walletContainer: {
    flexDirection: "row", borderWidth: 1,
    width: SCREEN_WIDTH * 0.24,
    height: SCREEN_HEIGHT * 0.04,
    alignItems: "center",
    gap: 2, borderRadius: 20,
    borderColor: colors.background_theme2,
    backgroundColor: '#FFDBBB', gap: 5

  },
  walletContent: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center"



  },
  walletIconContainer: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: SCREEN_WIDTH * 0.01,
    height: SCREEN_HEIGHT * 0.038,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: colors.background_theme2
  },
  walletText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.background_theme2
  },
});
