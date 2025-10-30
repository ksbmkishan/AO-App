import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { FontsStyle, normalize } from '../../config/constants'
import { colors } from '../../config/Constants1'
import { useDispatch, useSelector } from 'react-redux'
import * as HomeActions from '../../redux/actions/HomeActions';
import { Modal } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { Sizes } from '../../assets/style'
import { useTranslation } from 'react-i18next'





const SelectMapSantan = ({ navigation }) => {

  const {t} = useTranslation();

  const temples = [
  { id: 0, name: t("Prem Mandir Radha Krishna Puri"), x: 25, y: 20, icon:{uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 1, name: t("Sai Nath Prerna Sthal"), x: 45, y: 55, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan2.png'} },
  { id: 2, name:t("Shree Durga Shaktipeeth"), x: 49, y: 25, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan3.png'} },
  { id: 3, name: t("Adi Hanuman Prachin Mandir"), x: 22, y: 55, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 4, name: t("Maa Saraswati Vidya Peetham"), x: 63, y: 70, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 5, name: t("Sri Mahalaxmi Divya Dwar"), x: 5, y: 65, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan2.png'} },
  { id: 6, name: t("Sri SitaRam Dwar"), x: 5, y: 42, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 7, name: t("Shyam Baba Khatu Dham"), x: 28, y: 37, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan2.png'} },
  { id: 8, name: t("Shree Laxmi Narayan Puri Dham"), x: 52, y: 40, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 9, name: t("Sri Satyanarayan Maha Peeth"), x: 75, y: 45, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan3.png'} },
  { id: 10, name: t("Siddhivinayak Ganesh Dham"), x: 32, y: 68, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan3.png'} },
  { id: 11, name: t("Divya Mahadev Dham"), x: 10, y: 28, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 12, name: t("Maa Kali Shakti Peetham"), x: 72, y: 30, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
]

const temples2 = [
  { id: 0, name: t("Aditya Tej Dham"), x: 25, y: 20, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh.png'} },
  { id: 1, name: t("Shukra Laxmi Teerth"), x: 30, y: 70, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh3.png'} },
  { id: 2, name: t("Shani Nyay Dwar"), x: 10, y: 35, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh.png'} },
  { id: 3, name: t("Rahu Shakti Peetham"), x: 33, y: 35, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh2.png'} },
  { id: 4, name: t("Mangal Shaktipeeth"), x: 50, y: 25, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh3.png'} },
  { id: 5, name: t("Ketu Moksha Dham"), x: 54, y: 42, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh3.png'} },
  { id: 6, name: t("Chandra Sheet Teerth"), x: 40, y: 55, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh2.png'} },
  { id: 7, name: t("Budh Vidya Peetham"), x: 15, y: 55, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh.png'} },
  { id: 8, name: t("Brihaspati Gyan Dham"), x: 73, y: 30, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh2.png'} },
]

  const getbaghwandata = useSelector(state => state.home.getbaghwandata);
  const getbaghwandataNavgrah = useSelector(state => state.home.getbaghwandatanavgrah);

  const [modelVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(HomeActions.getBaghwanData());
    dispatch(HomeActions.getBaghwandataNavgrah());
  }, []);


  const handleVr = (index) => {
    navigation.navigate('ArImage', { data: getbaghwandata[index]?.vr_mode, id: getbaghwandata[index]?._id })
  }

  const handleVrNavgrah = (index) => {
    navigation.navigate('ArImage', { data: getbaghwandataNavgrah[index]?.vr_mode, id: getbaghwandataNavgrah[index]?._id })
  }

  const htmlContent = {
    en: 
`
  <h3 style="text-align:center">🌸✨ Beloved Yatri, ✨🌸</h3>
<p>
  
  Touch any temple icon on the maps to enter the sacred <b>AR Teerth Dham</b> of that Deity. 🙏
</p>
<p>Inside, offer <b>flowers for purity 🌸, conch for energy 🐚, coconut for surrender 🥥, aarti for devotion 🪔, and bell for divine presence </b>🔔—all by a simple touch.

</p>
<p>When your darshan is complete, return here and enter the next Dham. </p>
<p>🌺 Step by step, temple by temple, your <b>Divine Yatra</b> unfolds—filling you with blessings, light, and the complete Punya of life. 🌌</p>

<p>✨ Honor each Deity, let your reverence repeat,
And the circle of grace shall be made complete. ✨</p>
`
    ,
    hi:  `
    <h3 style="text-align:center">🌸✨ प्रिय यात्री, ✨🌸</h3>
  <p>
    मानचित्र पर किसी भी मंदिर के चिन्ह को स्पर्श करें और उस देवता के पवित्र <b>AR तीर्थ धाम</b> में प्रवेश करें। 🙏
  </p>
  <p>
    भीतर, <b>पवित्रता के लिए फूल 🌸, ऊर्जा के लिए शंख 🐚, समर्पण के लिए नारियल 🥥, भक्ति के लिए आरती 🪔, और दिव्यता के लिए घंटी</b> 🔔 अर्पित करें — बस एक स्पर्श से।
  </p>
  <p>
    जब आपका दर्शन पूर्ण हो जाए, तो यहाँ लौटें और अगले धाम में प्रवेश करें।
  </p>
  <p>
    🌺 कदम दर कदम, मंदिर दर मंदिर, आपकी <b>दिव्य यात्रा</b> आगे बढ़ती है — आशीर्वाद, प्रकाश और जीवन के पूर्ण <b>पुण्य</b> से आपको भर देती है। 🌌
  </p>
  <p>
    ✨ प्रत्येक देवता का सम्मान करें, अपनी श्रद्धा दोहराएँ,<br/>
    और कृपा का चक्र पूर्ण हो जाए। ✨
  </p>
    `
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <MyHeader title="AR (Augmented Reality)" navigation={navigation} />



      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
       

        {/* Map with markers */}

        <View style={styles.mapContainer}>
          <Image
            source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/daymap.png'}}
            style={styles.mapImage}
            resizeMode="contain"
          />
           <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ alignSelf: 'center', backgroundColor: colors.background_theme2, padding: 10, margin: 5, borderRadius: 10, paddingHorizontal: Sizes.fixPadding * 2,position:'absolute',top:Sizes.fixPadding }}>
          <Text style={{ ...FontsStyle.fontBold, color:'white', fontSize:normalize(11) }}>✨ {t("Celestial AR Teerth Yatra – Ritual Guide")} ✨</Text>
        </TouchableOpacity>
          {temples.map((temple, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.marker,
                { left: `${temple.x}%`, top: `${temple.y}%` },
              ]}
              onPress={() => handleVr(temple.id)}
            >
              <Image source={temple.icon} style={styles.markerIcon} />
              <Text style={styles.label}>{temple.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Map with markers */}
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/nightmap.png'}}
            style={styles.mapImage}
            resizeMode="contain"
          />
          {temples2.map((temple, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.marker,
                { left: `${temple.x}%`, top: `${temple.y}%` },
              ]}
              onPress={() => handleVrNavgrah(temple.id)}
            >
              <Image source={temple.icon} style={styles.markerIcon} />
              <Text style={styles.label}>{temple.name}</Text>
            </TouchableOpacity>
          ))}
        </View>


      </ScrollView>

      <Modal visible={modelVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <RenderHTML
              contentWidth={SCREEN_WIDTH}
              baseStyle={{ color: 'black' }}
              source={{ html: htmlContent[t('lang')] }} />

            <View style={styles.buttons}>


              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.button]}>
                <Text style={styles.buttonText}>{t('ok')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default SelectMapSantan

const styles = StyleSheet.create({
  mapContainer: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.6,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  marker: {
    position: "absolute",
    alignItems: "center",
  },
  markerText: {
    fontSize: 16,
  },
  label: {
    fontSize: normalize(8),
    color: "black",
    backgroundColor: "white",
    padding: 2,
    borderRadius: 4,
    width: RESPONSIVE_WIDTH(20),
    fontWeight: 'bold',
    textAlign: "center",
    margin:Sizes.fixPadding
  },
  markerIcon: {
    width: RESPONSIVE_WIDTH(5),
    height: RESPONSIVE_HEIGHT(5),
    marginBottom: -10,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.02,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.background_theme2,
    padding: 10,
    borderRadius: 5,
    elevation: 3, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2e7d32',
    borderRadius: 5,
  },
  cancel: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})
