import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Fonts, Sizes } from '../../assets/style'
import { colors } from '../../config/Constants1'
import { useNavigation } from '@react-navigation/native'
import WebView from 'react-native-webview'
import { FontsStyle, normalize } from '../../config/constants'
import YoutubePlayer from "react-native-youtube-iframe";
import { useTranslation } from 'react-i18next'

const AartiDetails = ({ route }) => {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const { itemData } = route.params;
  const playerRef = useRef(null);

  function getYouTubeVideoId(url) {
    if (url?.includes("youtube.com/watch?v=")) {
      return url?.split("v=")[1].split("&")[0];
    } else if (url?.includes("youtu.be/")) {
      return url?.split("youtu.be/")[1].split("?")[0];
    } else if (url?.includes("youtube.com/embed/")) {
      return url?.split("embed/")[1].split("?")[0];
    }
    return null;
  }

  const videoId = getYouTubeVideoId(itemData?.link);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      console.log("Video has finished playing!");
    }
  }, []);

  console.log("Item Data received in AartiDetails:", itemData);

  return (
    <View style={{ flex: 1, backgroundColor: '#F8E8D9', paddingHorizontal: 20 }}  >
      {Header()}
      <View style={{ flex: 1, alignSelf: 'center', gap: Sizes.fixPadding, width: SCREEN_WIDTH * .90 }}>
        {photo()}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {Description()}
        </ScrollView>
        <Text style={{
          ...FontsStyle.fontBold,
          color: colors.black_color9,
          fontSize: normalize(14),
          textAlign: 'center',
          paddingVertical: SCREEN_HEIGHT * 0.01,
          paddingHorizontal: SCREEN_WIDTH * 0.05,
          lineHeight: 20

        }}>

          {t("Courtesy: Youtube")}
        </Text>
      </View>

    </View>
  );


  function Description() {
    return (
      <View>
        <Text style={{ ...Fonts.PoppinsMedium, color: 'black', alignSelf: 'flex-start', textAlign: 'justify' }}>{itemData.description}</Text>
      </View>
    )
  }


  function photo() {
    return (
      <View style={{
        height: 190, width: '100%', borderWidth: 0.5, borderColor: 'white', borderRadius: 8, overflow: 'hidden', margin: 'auto'
      }}>
        {/* <WebView
          source={{ uri: itemData?.link }}
          style={{ flex: 1, borderRadius: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
        /> */}
        <YoutubePlayer
          ref={playerRef}
          height={250}
          play={true} // autoplay
          videoId={videoId} // just the videoId, not the whole URL
          onChangeState={onStateChange}
        />
      </View>
    );
  }



  function Header() {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.02, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={22} color={colors.black_color9} />
        </TouchableOpacity>
        {/* Display the subCategoryName from itemData */}
        <Text style={{ color: colors.black_color9, ...FontsStyle.fontBold, fontSize: normalize(16) }}>
          {itemData.subCategoryName}
        </Text>
        {/* <Image
          style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06 }}
          source={require('../../assets/images/what.png')} /> */}
        <View></View>
      </View>
    );
  }
}

export default AartiDetails;

const styles = StyleSheet.create({
  webview: {
    height: '100%',
    width: '100%',
    borderRadius: 8
  }
});
