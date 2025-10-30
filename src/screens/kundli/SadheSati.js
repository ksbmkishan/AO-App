import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { fonts } from '@rneui/base';
import { Fonts } from '../../assets/style';
import { colors } from '../../config/Constants1';
import moment from 'moment';
import TranslateText from '../language/TranslateText';
import { FontsStyle, normalize } from '../../config/constants';
import RenderHTML from 'react-native-render-html';
// import FastImage from 'react-native-fast-image';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
const { TTSModule } = NativeModules;


const SadheSati = ({ basicDetails, dispatch, sadhesatiData }) => {
  const { t } = useTranslation();

  console.log("sadhesatiData", sadhesatiData?.[0]?.sadesati?.length);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      // ✅ jaise hi page se bahar jaoge, speech band ho jayegi
      TTSModule.stop();
      setIsSpeaking(false);
    };
  }, []);

  const getRemediesSpeechText = () => {
    if (!htmlview) return '';
    return htmlview.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  const stripHtml = (html) => {
    if (!html) return '';
    // Replace tags with space and collapse multiple spaces
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };


  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (sadhesatiData?.[0]?.sadesati) {
      setListData(sadhesatiData[0].sadesati);
    }
  }, [sadhesatiData]);



  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getSadhesatiData(payload));
  }, [dispatch]);

  console.log('GetSadheSattiData::KKK', sadhesatiData);


  const htmlview = t('lang') == 'en' ?
    `<p><b>Sade Sati Remedies – A Transformative Saturn Guide</b></p>
    <p>Sade Sati is not a curse—it is a celestial masterclass from Saturn, the strictest but wisest teacher of karma.</p>
    <p>This 7.5-year cycle of Shani is feared for its discipline, delays, and deep lessons. But those who walk with humility, faith, and correct remedies not only survive—it becomes their greatest transformation.</p>
    <p>Below are time-tested, scriptural and psychological remedies to navigate Sade Sati with grace, wisdom, and rising fortune.</p>
    <p><span style="color: green;"><b>🪐 Key Remedies to Calm Shani during Sade Sati</b></span></p>
    <p>🧹Clean every Saturday morning: Mop and declutter your home, especially the southwest corners. Remove unused items and donate what you no longer need.</p>
    <p>🚫Avoid non-veg, alcohol, lies, and harsh speech, especially on Saturdays. Donate food and clothes to laborers, sweepers, or old-age homes.</p>
    <p>🪞Shadow Oil Offering: Look at your reflection in a bowl of mustard oil on Saturday evening and offer that oil in a Shani temple. This is a powerful method to absorb Saturn’s negative karmas.</p>
    <p>🧣Gift dark-colored clothes (black/navy) to saints or the needy on Saturday.</p>
    <p>🧵Tie a 19-arm-length black thread around your waist or neck to protect against Saturn’s malefic gaze.</p>
    <p>🪔Light a Jasmine oil diya at sunset on Saturdays with vermillion or ghee offering before a Shani yantra or idol.</p>
    <p>🛁Herbal Saturn Bath (monthly on 1st Saturday):Soak overnight: fennel, khus, benzyl, soorma, dhavni black sesame, shatkushum, khilla, khinreti logh. Bathe with this water next morning.</p>
    <p>🥥<b>Coconut Ritual for Shani Pacification</b>: Fill cooked black gram flour in a coconut with ghee and sugar. Bury under a peepal tree away from home. Repeat 1.25 yearly during Sade Sati/Dhaiyya transitions.</p>
    <p><span style="color: green;"><b>🕉️ Most Effective Mantra Remedies for Sade Sati</b></span></p>
    <p>🔸Shani Beej Mantra (Daily 108 times):</p>
    <p>“ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥”</p>
    <p>🔸Shani Gayatri Mantra(Daily):</p>
    <p>“ॐ कृष्णांगाय विद्महे रवी पुत्राय धीमहि तन्नो मन्दः प्रचोदयात्॥”</p>
    <p>🔸Maha Mrityunjaya Mantra(21 times daily for protection and strength).</p>
    <p>🔸Hanuman Chalisa on Tuesdays and Saturdays to neutralize fear, doubt, and obstacles caused by Saturn.</p>
    <p><span style="color: green;"><b>📿 Yantra & Stone Remedies (Use Caution)</b></span></p>
    <p>🔷 Install a Shani Yantra (energized) in your puja space. Offer blue flowers, sesame oil diya, and recite Shani mantras every Saturday.</p>
    <p>💎 Blue Sapphire (Neelam) can be worn only after detailed Kundli analysis. It is highly potent and should be tested for 72 hours before regular use.</p>
    <p>Alternative safe stones: Amethyst, Black Zircon, or 7-Mukhi Rudraksha (worn on Saturday morning after energizing).</p>
    <p><span style="color: green;"><b>🌟 Final Message of Shani Dev</b></span></p>
    <p>Sade Sati doesn’t break you. It makes you.</p>
    <p>Saturn rewards consistency, truth, service, and silence. If you align with humility, serve with heart, and surrender to time, even Saturn becomes your greatest blessing.</p>
    <p>Let this phase be your inner purification. Let it be your rise.</p>
    ` : `
    <p><b>🪐 साढ़ेसाती उपाय – शनि का रूपांतरणकारी मार्गदर्शन</b></p>
    <p>साढ़ेसाती शाप नहीं है। यह शनि का दिया हुआ सात-साढ़े सात वर्षों की आकाशीय पाठशाला है — सबसे कठोर, पर सबसे न्यायप्रिय गुरु की। शनि देरी कराते हैं, अनुशासन सिखाते हैं और भीतर से बदलने पर मजबूर करते हैं, पर अंत में सकारात्मक बदलाव लाते हैं । जो मनुष्य इस समय को नम्रता, विश्वास और सही उपायों के साथ पार करते हैं, उनके लिए यही काल जीवन का सबसे बड़ा रूपांतरण बन जाता है।</p>
    <p><b>🌟 शनि को शांत करने के उपाय (साढ़ेसाती के दौरान)</b></p>
    <p><b>🧹 शनिवार की सुबह सफ़ाई करें</b></p>
    <p>- घर में विशेषकर दक्षिण-पश्चिम कोना साफ़ करें।</p>
    <p>- अनुपयोगी वस्तुएँ दान करें।</p>
    <p><b>🚫 परहेज़ करें</b></p>
    <p>- शनिवार को मांस, शराब, झूठ, और कटु वाणी से बचें।</p>
    <p>- भोजन और वस्त्र मज़दूरों, सफ़ाईकर्मियों या वृद्धाश्रम को दान करें।</p>
    <p><b>🪞 छाया तेल अर्पण</b></p>
    <p>- शनिवार संध्या को सरसों के तेल में अपना प्रतिबिंब देखें।</p>
    <p>- वही तेल शनि मंदिर में अर्पित करें।</p>
    <p>- यह कर्म शनि के नकारात्मक प्रभाव को सोख लेता है।</p>
    <p><b>🧣 गहरे रंग के वस्त्र दान करें</b></p>
    <p>- काले या नेवी रंग के कपड़े संतों या ज़रूरतमंदों को दें।</p>
    <p><b>🧵 19 हाथ लंबा काला धागा</b></p>
    <p>- कमर या गले में बाँधें, शनि की टेढ़ी नज़र से रक्षा हेतु।</p>
    <p><b>🪔 चमेली के तेल का दीपक</b></p>
    <p>- शनिवार सूर्यास्त पर जलाएँ।</p>
    <p>- सिंदूर या घी अर्पित करें।</p>
    <p><b>🛁 शनि स्नान (मासिक, पहले शनिवार को)</b></p>
    <p>- सौंफ, खस, बेंज़िल, सूर्मा, धवनी काले तिल, षटकुषुम, खिल्ला, खिनरेटी लोंग – रातभर भिगोकर रखें।</p>
    <p>- अगली सुबह उस जल से स्नान करें।</p>
    <p><b>🥥 नारियल उपाय</b></p>
    <p>- उबला चना आटा, घी और शक्कर भरकर नारियल में डालें।</p>
    <p>- उसे घर से दूर पीपल के नीचे दबाएँ।</p>
    <p>- साढ़ेसाती या ढैय्या के संक्रमणकाल में 1.25 वर्ष पर दोहराएँ।</p>
    <p><b>🕉️ मंत्र उपाय</b></p>
    <p>🔸 शनि बीज मंत्र (प्रतिदिन 108 बार)</p>
    <p>“ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥”</p>
    <p>🔸 शनि गायत्री मंत्र (प्रतिदिन)</p>
    <p>“ॐ कृष्णांगाय विद्महे रवि पुत्राय धीमहि तन्नो मन्दः प्रचोदयात्॥”</p>
    <p>🔸 महामृत्युंजय मंत्र (प्रतिदिन 21 बार) – सुरक्षा और शक्ति हेतु।</p>
    <p>🔸 हनुमान चालीसा (मंगलवार और शनिवार) – भय, संदेह और बाधाओं से रक्षा हेतु।</p>
    <p><b>📿 यंत्र और रत्न उपाय (सावधानी आवश्यक)</b></p>
    <p><b>🔷 शनि यंत्र (ऊर्जित)</b></p>
    <p>- पूजास्थान में स्थापित करें।</p>
    <p>- नीले पुष्प, तिल का तेल दीपक अर्पित करें।</p>
    <p>- शनिवार को शनि मंत्र का जप करें।</p>
    <p><b>💎 नीलम (Blue Sapphire)</b></p>
    <p>- केवल संपूर्ण कुंडली विश्लेषण के बाद धारण करें।</p>
    <p>- अत्यंत प्रभावी है। पहले 72 घंटे परखकर पहनें।</p>
    <p><b>✨ वैकल्पिक सुरक्षित रत्न:</b></p>
    <p>- ऐमेथिस्ट, ब्लैक ज़िरकॉन, या 7 मुखी रुद्राक्ष (शनिवार प्रातः ऊर्जित कर धारण करें)।</p>
    <p><b>🌟 शनि देव का अंतिम संदेश</b></p>
    <p>साढ़ेसाती आपको तोड़ती नहीं—बनाती है। शनि निरंतरता, सत्य, सेवा और मौन का प्रतिफल देता है। यदि आप नम्रता अपनाते हैं, सेवा में मन लगाते हैं और समय को समर्पित करते हैं, तो शनि भी सबसे बड़ा आशीर्वाद बन जाता है।</p>
    <p>✨ इस काल को भीतर की शुद्धि  मानिए। </p>
    <p>✨ इसे अपने उदय का समय समझिए।</p>

    `


  const RenderItem = ({ item }) => {
    const lastSadeSatiItem = sadhesatiData?.[0]?.sadesati?.[sadhesatiData?.[0]?.sadesati.length - 1];

    console.log('lastSadeSatiItem ', item);

    return (
      <View>
        <View style={{ backgroundColor: "white", elevation: 10, margin: 10, padding: 10, borderRadius: 10 }}>


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: SCREEN_HEIGHT * 0.025,
              backgroundColor: "white",

            }}
          >
            <Text
              style={[
                item?.type == "Sade Sati" ? {...FontsStyle.fontBold , fontSize: normalize(10)} :{...FontsStyle.font, fontSize: normalize(10)}
              ]}
            >
              {`${item?.type || "N/A"}`}
            </Text>
            <Text style={[
              { fontSize: normalize(16) },
             item?.type == "Sade Sati" ? {...FontsStyle.fontBold , fontSize: normalize(10)} :{...FontsStyle.font, fontSize: normalize(10)}
            ]}>
             {`${item?.saturnrashi || "N/A"}`}
            </Text>
            <Text style={[
              { fontSize: normalize(16) },
            item?.type == "Sade Sati" ? {...FontsStyle.fontBold , fontSize: normalize(10)} :{...FontsStyle.font, fontSize: normalize(10)}
            ]}>
              {item?.startDate || "N/A"}
            </Text>
            <Text style={[
              { fontSize: normalize(16) },
              item?.type == "Sade Sati" ? {...FontsStyle.fontBold , fontSize: normalize(10)} :{...FontsStyle.font, fontSize: normalize(10)}
            ]}>
              {item?.endDate || "N/A"}
            </Text>
            <Text style={[
              { fontSize: normalize(16) },
              item?.type == "Sade Sati" ? {...FontsStyle.fontBold , fontSize: normalize(10)} :{...FontsStyle.font, fontSize: normalize(10)}
            ]}>
              {`${item?.phase || "N/A"}`}
            </Text>
          </View>
        </View>
        {lastSadeSatiItem?.startDate?.toString() == item?.startDate?.toString() && (
          <View style={{ margin: 20 }}>
            <TouchableOpacity
              onPress={() => {
                const text = getRemediesSpeechText();
                if (!text) return;

                if (isSpeaking) {
                  TTSModule.stop();
                  setIsSpeaking(false);
                } else {
                  TTSModule.stop();
                  TTSModule.speak(text, 'male', t('lang'));
                  setIsSpeaking(true);
                }
              }}
              style={{ alignItems: 'center', marginTop: 20 }}
            >
             {!isSpeaking ?   <MaterialCommunityIcons
                           name={"volume-high"}
                           size={24}
                           color={"#B75D00"} // ya theme.colors.primary
                         />: <Image source={require('../../assets/astroOneImages/rishi.png')} style={{ height:25, width:25}}/>}
              <Text style={{ marginTop: 5, color: '#B75D00', fontWeight: 'bold' }}>
                {isSpeaking ? 'Stop Reading' : 'Listen Remedies'}
              </Text>
            </TouchableOpacity>

            <RenderHTML
              contentWidth={SCREEN_WIDTH}
              source={{ html: htmlview }}
            />
          </View>

        )}
      </View>
    );
  };


  return (
    <View style={styles.container}>

      {/* {sadhesatiData?.length > 0 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}> <TranslateText title={sadhesatiData[0]?.info} /></Text>
        </View>
      )} */}
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
        {/* <Text style={{ ...Fonts.PoppinsMedium, textAlign: "justify" }}>Sade Sati is not a curse—it is a celestial masterclass from Saturn, the strictest but wisest teacher of karma.
          This 7.5-year cycle of Shani is feared for its discipline, delays, and deep lessons.</Text> */}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", elevation: 5, paddingHorizontal: SCREEN_WIDTH * 0.02, marginHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.035, backgroundColor: colors.background_theme2, borderRadius: 10 }}>
        <Text style={{ ...FontsStyle.fontBold, color: "white", fontSize: responsiveFontSize(1.8) }}>{t("Type")}</Text>
        <Text style={{ ...FontsStyle.fontBold, color: "white", fontSize: responsiveFontSize(1.8) }}>{t("Saturnrashi")}</Text>
        <Text style={{ ...FontsStyle.fontBold, color: "white", fontSize: responsiveFontSize(1.8) }}>{t("Start Date")}</Text>
        <Text style={{ ...FontsStyle.fontBold, color: "white", fontSize: responsiveFontSize(1.8) }}>{t("End Date")}</Text>
        <Text style={{ ...FontsStyle.fontBold, color: "white", fontSize: responsiveFontSize(1.8) }}>{t("Phase")}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {listData && listData.length > 0 ? (
            listData.map((item, index) => (
              <RenderItem key={`${item.startDate}-${index}`} item={item} index={index} />
            ))
          ) : (
            <View
              style={{
                paddingTop: SCREEN_HEIGHT * 0.25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3 }}>
                {/* Your empty component UI */}
                <Text>No data available</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  sadhesatiData: state.kundli.sadhesatiData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SadheSati);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.01,
  },
  infoContainer: {
    marginBottom: 10,
    marginHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.02
  },
  infoText: {
    ...FontsStyle.fontfamily,
    textAlign: "justify"
  },
  cardContainer: {
    borderWidth: 1,
    padding: SCREEN_HEIGHT * 0.015,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SCREEN_HEIGHT * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#333',
    ...FontsStyle.fontfamily,
  },
  value: {
    fontSize: responsiveFontSize(1.8),
    color: '#555',
    ...FontsStyle.fontfamily,
  },
  noDataText: {
    textAlign: 'center',
    color: 'black',
    fontSize: normalize(20),
    ...FontsStyle.fontfamily,
  },
  Hedertxt: {
    ...FontsStyle.font,
    fontSize: normalize(15),

  },
  remedyText: {
    ...FontsStyle.font,
    fontSize: normalize(15),
    textAlign: "justify",
    marginTop: 8,
  },
  mantra: {
    ...FontsStyle.font,
    fontSize: normalize(15),
    fontStyle: "italic",
    marginLeft: 10,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});