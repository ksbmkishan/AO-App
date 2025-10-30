import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { FontsStyle, normalize } from '../../config/constants'
import { colors } from '../../config/Constants1'
import { useDispatch, useSelector } from 'react-redux'
import * as HomeActions from '../../redux/actions/HomeActions';
import RenderHTML from 'react-native-render-html'
import { Sizes } from '../../assets/style'
import AudioManager from '../../utils/AudioManager';
import { useTranslation } from 'react-i18next'





const SelectMapVr = ({ navigation }) => {

    const {t} = useTranslation();

    const temples = [
  { id: 0, name: t("Prem Mandir Radha Krishna Puri"), x: 25, y: 20, icon: {uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan2.png'} },
  { id: 1, name: t("Sai Nath Prerna Sthal"), x: 48, y: 58, icon: {uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan2.png'} },
  { id: 2, name: t("Shree Durga Shaktipeeth"), x: 49, y: 25, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan3.png'} },
  { id: 3, name: t("Adi Hanuman Prachin Mandir"), x: 22, y: 55, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 4, name: t("Maa Saraswati Vidya Peetham"), x: 63, y: 70, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 5, name: t("Sri Mahalaxmi Divya Dwar"), x: 5, y: 65, icon: {uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan2.png'} },
  { id: 6, name: t("Sri SitaRam Dwar"), x: 5, y: 42, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 7, name: t("Shyam Baba Khatu Dham"), x: 28, y: 37, icon: {uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan2.png'} },
  { id: 8, name: t("Shree Laxmi Narayan Puri Dham"), x: 52, y: 40, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 9, name: t("Sri Satyanarayan Maha Peeth"), x: 75, y: 45, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan3.png'} },
  { id: 10, name: t("Siddhivinayak Ganesh Dham"), x: 32, y: 70, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan3.png'} },
  { id: 11, name: t("Divya Mahadev Dham"), x: 10, y: 28, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
  { id: 12, name: t("Maa Kali Shakti Peetham"), x: 72, y: 30, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/santan1.png'} },
]

const temples2 = [
  { id: 0, name: t("Aditya Tej Dham"), x: 25, y: 20, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh.png'} },
  { id: 1, name: t("Shukra Laxmi Teerth"), x: 30, y: 70, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh2.png'} },
  { id: 2, name: t("Shani Nyay Dwar"), x: 10, y: 35, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh.png'} },
  { id: 3, name: t("Rahu Shakti Peetham"), x: 33, y: 35, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh3.png'} },
  { id: 4, name: t("Mangal Shaktipeeth"), x: 50, y: 25, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh2.png'} },
  { id: 5, name: t("Ketu Moksha Dham"), x: 54, y: 42, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh2.png'} },
  { id: 6, name: t("Chandra Sheet Teerth"), x: 40, y: 55, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh3.png'} },
  { id: 7, name: t("Budh Vidya Peetham"), x: 15, y: 55, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh.png'} },
  { id: 8, name: t("Brihaspati Gyan Dham"), x: 73, y: 30, icon: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/maps/navgarh3.png'} },
]

    const getbaghwandata = useSelector(state => state.home.getbaghwandata);
    const getbaghwandataNavgrah = useSelector(state => state.home.getbaghwandatanavgrah);

    const [modelVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(HomeActions.getBaghwanData());
        dispatch(HomeActions.getBaghwandataNavgrah());
        AudioManager.getRingerMode()
          .then(mode => {
            console.log('Current mode:', mode);
            prevMode = mode;
            
            // Set to vibrate mode
            return AudioManager.setRingerMode('vibrate');
          })
          .then(success => {
            console.log('Ringer mode changed to vibrate:', success);
          })
          .catch(error => {
            console.error('Error:', error, error.code);
            
            // If it's a permission error, guide user to settings
            if (error.code === 'E_NO_PERMISSION') {
              Alert.alert(
                'Permission Required',
                'Please grant Do Not Disturb access to change ringer mode',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Settings', onPress: () => AudioManager.openDndSettings() }
                ]
              );
            }
          });
          return () => {
                if (prevMode) {
                  AudioManager.setRingerMode(prevMode);
                }
              };
    }, []);


    const handleVr = (index) => {
        navigation.navigate('VrUnity', { data: getbaghwandata[index]?.vr_mode, })
    }

    const handleVrNavgrah = (index) => {
        navigation.navigate('VrUnity', { data: getbaghwandataNavgrah[index]?.vr_mode })
    };


    const dataNavgarh = (getbaghwandataNavgrah ?? [])
        .filter(item => Array.isArray(item.vr_mode) && item.vr_mode.length > 0)
        .flatMap(item =>
            item.vr_mode
                .filter(vr => vr.vr_image) // remove null or empty
                .map(vr => ({ ...vr })) || []
        );

    const dataSantan = (getbaghwandata ?? [])
        .filter(item => Array.isArray(item.vr_mode) && item.vr_mode.length > 0)
        .flatMap(item =>
            item.vr_mode
                ?.filter(vr => vr?.vr_image) // null/undefined check
                .map(vr => ({ ...vr })) || []
        );

    const htmlContent = {en: `
    <h3 style="text-align:center">🌸✨ Beloved Yatri, ✨🌸</h3>
<p>
  
   Touch any temple icon on the map to step into the sacred <b>VR Teerth Dham</b> of that Deity. 🙏
Inside, this is not just darshan—it is your <b>soul’s dialogue with the Divine.</b> Every word you utter is an offering… speak with Shraddha, and the <b>Cosmos itself shall respond. 🌌</b>

</p>
<p>So, say aloud with devotion:
</p>
<ul>
  <li><b>🌸 “One One One” (1,1,1) → </b>Offer Flowers, to open the heart in purity</li>
  <li><b>🐚 “Two Two Two” (2,2,2) → </b>Blow the Divine Conch, to cleanse and awaken energies</li>
  <li><b>🥥 “Three Three Three” (3,3,3) →</b> Offer Coconut, symbol of surrendering ego to the Divine</li>
  <li><b>🪔 “Four Four Four” (4,4,4) →</b> Perform Aarti, bathing the soul in light and devotion</li>
  <li><b>🔔 “Five Five Five” (5,5,5) →</b> Ring the Sacred Bell, inviting Divine Presence within you</li>
  <li><b>⏩ “Eight Eight Eight” (8,8,8) →</b> Forward, receiving Punya as you enter the Temple of the Next Deity</li>
  <li><b>⏩ “Nine Nine Nine” (9,9,9) → →</b> Return, to bow again and gain Punya at the Previous Temple</li>
</ul>
<p>✨ Every word is prayer, every sound divine,
Speak with Bhakti, and the Universe will shine. ✨</p>
`,
hi:` <h3 style="text-align:center">🌸✨ प्रिय यात्री, ✨🌸</h3>
  <p>
    मानचित्र पर किसी भी मंदिर के चिन्ह को स्पर्श करें और उस देवता के पवित्र <b>VR तीर्थ धाम</b> में प्रवेश करें। 🙏  
    भीतर यह केवल दर्शन नहीं—यह आपके <b>आत्मा का ईश्वर से संवाद</b> है।  
    आपके प्रत्येक शब्द एक अर्पण हैं... श्रद्धा से बोलें, और <b>संपूर्ण ब्रह्मांड आपकी पुकार का उत्तर देगा। 🌌</b>
  </p>
  <p>अब भक्ति से उच्चारण करें:</p>
  <ul>
    <li><b>🌸 “वन वन वन” (1,1,1) → </b>फूल अर्पित करें — हृदय को पवित्रता से खोलने के लिए</li>
    <li><b>🐚 “टू टू टू” (2,2,2) → </b>शंख फूँकें — ऊर्जा को शुद्ध और जाग्रत करने के लिए</li>
    <li><b>🥥 “थ्री थ्री थ्री” (3,3,3) → </b>नारियल अर्पित करें — अहंकार को ईश्वर में समर्पित करने के लिए</li>
    <li><b>🪔 “फोर फोर फोर” (4,4,4) → </b>आरती करें — आत्मा को प्रकाश और भक्ति में स्नान कराने के लिए</li>
    <li><b>🔔 “फाइव फाइव फाइव” (5,5,5) → </b>घंटी बजाएँ — अपने भीतर दिव्यता को आमंत्रित करने के लिए</li>
    <li><b>⏩ “एट एट एट” (8,8,8) → </b>आगे बढ़ें — अगले देवता के मंदिर में प्रवेश करते हुए पुण्य अर्जित करें</li>
    <li><b>⏪ “नाइन नाइन नाइन” (9,9,9) → </b>वापस जाएँ — पुनः प्रणाम करें और पिछले मंदिर में पुण्य प्राप्त करें</li>
  </ul>
  <p>✨ प्रत्येक शब्द एक प्रार्थना है, प्रत्येक ध्वनि दिव्यता है,<br/>
  भक्ति से बोलिए, और ब्रह्मांड आपके साथ दमकेगा। ✨</p>`};


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <MyHeader title="VR (Virtual Reality)" navigation={navigation} />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{ alignSelf: 'center', backgroundColor: colors.background_theme2, padding: 10, margin: 5, borderRadius: 10, paddingHorizontal: Sizes.fixPadding * 2, position: 'absolute', top: Sizes.fixPadding,zIndex:10 }}>
                    <Text style={{ ...FontsStyle.fontBold, color: 'white', fontSize: normalize(11) }}>✨ {t("Divine VR Teerth Yatra – Ritual Guide")} ✨</Text>
                </TouchableOpacity>
                {/* Map with markers */}

                <View style={styles.mapContainer}>
                    <Image
                        source={{ uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/daymap.png'}}
                        style={styles.mapImage}
                        resizeMode="contain"
                    />
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
                            <Text style={styles.markerText}>📍</Text>
                            <Text style={styles.label}>{temple.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('VrUnity', { data: dataSantan })}>
                            <Text style={styles.buttonText}>{t("Sanatan Teerth Yatra")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Map with markers */}
                <View style={styles.mapContainer}>
                    <Image
                        source={{ uri:'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/nightmap.png'}}
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
                            {/* <Text style={styles.markerText}>📍</Text> */}
                            <Text style={styles.label}>{temple.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('VrUnity', { data: dataNavgarh })}>
                            <Text style={styles.buttonText}>{t("Navgrah Teerth Yatra")}</Text>
                        </TouchableOpacity>
                    </View>
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
                                <Text style={styles.buttonText}>{t("ok")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SelectMapVr

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
     overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
