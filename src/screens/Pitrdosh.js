import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import { Fonts, Sizes } from '../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { colors } from '../config/Constants1'
import { connect } from 'react-redux';
import * as KundliActions from '../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { FontsStyle, normalize } from '../config/constants'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeModules } from "react-native";
import FastImage from '@d11/react-native-fast-image'

const { TTSModule } = NativeModules;

const Pitrdosh = ({ basicDetails, dispatch, PitrDosha }) => {
  const { t } = useTranslation();
  const [speakingIndex, setSpeakingIndex] = useState(null);

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place
    }
    dispatch(KundliActions.getPitrdosh(payload))

    // ✅ Cleanup jab screen se bahar jao
    return () => {
      TTSModule.stop();
      setSpeakingIndex(null);
    };
  }, [dispatch])

  const stripHtml = (text) => text?.replace(/<\/?[^>]+(>|$)/g, "").trim();

  const speakFullData = (text, index) => {
    if (speakingIndex === index) {
      // agar wahi chal raha tha to stop kar do
      TTSModule.stop();
      setSpeakingIndex(null);
    } else {
      if (text) {
        TTSModule.stop();
        TTSModule.speak(text, "male", t("lang"));
        setSpeakingIndex(index);
      }
    }
  };

  const RenderItem = ({ item, index }) => {
    const infoText = item?.info || '';
    const parts = infoText.split('Remedy :');

    // 🔹 Full speech text prepare
    let fullSpeechText = "";

    // Agar ye pehla item hai to upar wala info bhi include karo
    if (PitrDosha?.rina && PitrDosha?.info && index === 0) {
      fullSpeechText += `${stripHtml(PitrDosha?.info)}. `;
      fullSpeechText += PitrDosha?.pitridosh
        ? t("Pitri dosha is detected in your kundli")
        : t("Pitri dosha not detected in your kundli");
      fullSpeechText += ". ";
    }

    // Current item ka info
    fullSpeechText += stripHtml(parts[0]);
    if (parts[1]) {
      fullSpeechText += `. Remedy: ${stripHtml(parts[1])}`;
    }

    return (
      <View style={{ elevation: 1, borderRadius: 10, backgroundColor: colors.white_color, marginVertical: SCREEN_HEIGHT * 0.015 }}>
        {/* Upar ka info section sirf first item ke liye */}
        {PitrDosha?.rina && PitrDosha?.info && index === 0 && (

          <>
            <TouchableOpacity
              onPress={() => speakFullData(PitrDosha?.info, 13)}
              style={{ alignItems: "flex-end", margin: 6 }}
            >
              {speakingIndex != 13 ? <MaterialCommunityIcons
                name={"volume-high"}
                size={24}
                color={"#B75D00"} // ya theme.colors.primary
              /> : <Image source={require('../assets/astroOneImages/rishi.png')} style={{ height: 25, width: 25 }} />}
            </TouchableOpacity>
            <View style={{ marginVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: Sizes.fixPadding }}>
              <Text style={{ ...FontsStyle.font, fontSize: normalize(15), textAlign: "justify", marginHorizontal: 3 }}>
                {PitrDosha?.info}
              </Text>
            </View>
            <Text style={{ color: 'red', alignSelf: 'center', fontSize: 16, ...FontsStyle.fontfamily }}>
              {PitrDosha?.pitridosh ? t('Pitri dosha is detected in your kundli') : t('Pitri dosha not detected in your kundli')}
            </Text>
          </>
        )}

        {/* 🔊 Speech Button */}
        <TouchableOpacity
          onPress={() => speakFullData(fullSpeechText, index)}
          style={{ alignItems: "flex-end", margin: 6 }}
        >
          {speakingIndex != index ? <MaterialCommunityIcons
            name={"volume-high"}
            size={24}
            color={"#B75D00"} // ya theme.colors.primary
          /> : <Image source={require('../assets/astroOneImages/rishi.png')} style={{ height: 25, width: 25 }} />}
        </TouchableOpacity>

        {/* Item Title */}
        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
          <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(18) }}> {item?.name}</Text>
        </View>

        {/* Item Content */}
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.02, paddingBottom: SCREEN_HEIGHT * 0.02 }}>
          <Text style={{ ...FontsStyle.font, textAlign: "justify", marginHorizontal: 3, fontSize: normalize(15) }}>
            {parts[0].trim()}
            {'\n\n'}
            {parts[1] && (
              <>
                <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(15) }}>Remedy :</Text>
                <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(15) }}>{` ${parts[1].trim()}`}</Text>
              </>
            )}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, marginHorizontal: SCREEN_WIDTH * 0.02 }}>
      {!PitrDosha || Object.keys(PitrDosha)?.length === 0 ? (
        <View style={{ paddingTop: SCREEN_HEIGHT * 0.25, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3 }}>
            <Image
              style={{
                width: 120,
                height: 120,
                objectFit: 'contain',
              }}
              source={require('../assets/images/om.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      ) : (
        <FlatList
          data={PitrDosha?.rina}
          renderItem={RenderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  )
}

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  MangalDosha: state.kundli.MangalDosha,
  PitrDosha: state.kundli.PitrDosha,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Pitrdosh);

const styles = StyleSheet.create({})