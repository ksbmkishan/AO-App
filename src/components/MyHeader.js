import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  PermissionsAndroid,
  Alert,
  Platform
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts, getFontSize } from '../config/Constants1';
import { openFacebook, openInstagram, openYoutube } from './Methods';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Sizes } from '../assets/style';
import { FontsStyle, normalize } from '../config/constants';
import { useTranslation } from 'react-i18next';



const MyHeader = ({ title,
  navigation,
  download = false, id,
  puja = false,
  PursharthaWallet = false,
  DivyaWallet = false,
  Vr = false,
  Ar = false,
modelVisible,
color = colors.background_theme2 }) => {

  const {t} = useTranslation();

  return (
    <SafeAreaView
      style={{ backgroundColor: color }}
      forceInset={{ top: 'always', bottom: 'never' }}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: 12,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flex: 0,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="arrow-back"
            color={colors.white_color}
            size={normalize(25)}
          />
        </TouchableOpacity>
        <View style={{ flex: 0.9, flexDirection: 'row' }}>
          <Text allowFontScaling={false}
            numberOfLines={1}
            style={{
              fontSize: normalize(17),
              color: colors.white_color,
              ...FontsStyle.fontfamily,
            }}>
            {t(`${title}`)}
          </Text>
          {DivyaWallet &&
            <TouchableOpacity
              style={{ backgroundColor: colors.background_theme1, paddingHorizontal: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 20, left: 10 }}
              onPress={() => {
                navigation.navigate('divyaRashi')
              }}>
              <Ionicons name="wallet" color={'black'} size={25} />
            </TouchableOpacity>
          }
        </View>

        {puja &&

          <TouchableOpacity
            style={{ backgroundColor: colors.background_theme1, paddingHorizontal: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 20 }}
            onPress={() => {
              navigation.navigate('PujaCart')
            }}>
            <Ionicons name="cart" color={'black'} size={25} />
          </TouchableOpacity>

        }
        {PursharthaWallet &&
          <TouchableOpacity
            style={{ backgroundColor: colors.background_theme1, paddingHorizontal: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 20 }}
            onPress={() => {
              navigation.navigate('PursharthaWallet')
            }}>
            <MaterialIcons name="temple-hindu" color={'black'} size={25} />
          </TouchableOpacity>
        }

        {Vr &&
          <TouchableOpacity
            style={{ backgroundColor: colors.background_theme1, paddingHorizontal: Sizes.fixPadding, borderRadius: Sizes.fixPadding * 20 }}
            onPress={() => {
             modelVisible(true)
            }}>
            <Text>Info</Text>
          </TouchableOpacity>
        }
      </View>


    </SafeAreaView>
  );
};

export default MyHeader;
