import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { Fonts } from '../../assets/style';
import { colors } from '../../config/Constants1';
import moment from 'moment';
import TranslateText from '../language/TranslateText';
import RenderHTML from 'react-native-render-html';
import { FontsStyle, normalize } from '../../config/constants';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { TTSModule } = NativeModules;

const KaalsarpaDosha = ({ basicDetails, dispatch, kaalsarpDoshaData }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const payload = { lang: t('lang') };
    dispatch(KundliActions.getKundliBirthDetails(payload));
  }, [dispatch]);


  const [isSpeaking, setIsSpeaking] = useState(false);

  const stripHtml = (html) => {
    if (!html) return '';
    // Replace tags with space and collapse multiple spaces
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };


  useEffect(() => {
    return () => {
      // ✅ jaise hi page se bahar jaoge, speech band ho jayegi
      TTSModule.stop();
      setIsSpeaking(false);
    };
  }, []);

  const getFullSpeechText = (dataOrHtml) => {
    if (!dataOrHtml) return '';

    // Agar object hai
    if (typeof dataOrHtml === 'object') {
      const fields = ['info', 'reason', 'type', 'intensity'];
      let text = '';
      fields.forEach(f => {
        if (dataOrHtml[f]) {
          text += dataOrHtml[f].replace(/<[^>]*>/g, ' ').trim() + '. ';
        }
      });
      return text.trim();
    }

    // Agar string (HTML) hai
    if (typeof dataOrHtml === 'string') {
      return dataOrHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }

    return '';
  };




  console.log("kaalsarpDoshaDatakaalsarpDoshaData", kaalsarpDoshaData)


  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getKaalsarpDosha(payload));
  }, [dispatch]);

  console.log('checkKalSarpDosha:::KKK', kaalsarpDoshaData);

  const doshaData = kaalsarpDoshaData?.[0]?.kaalsarpDosha || {};
  const { info, kalsharpdosh, type } = doshaData;


  const remediesText = t('lang') == 'en' ? `
<p>🕉️ Kaal Sarp Yog is not a punishment  — it’s a deep spiritual challenge granted by the cosmos to accelerate your soul’s evolution.</p>

<p>When Rahu and Ketu overshadow your planetary alignment, they don't bring destruction—they ignite transformation.</p>

<p>This yog can test your stability, relationships, or progress, but with the right remedies, your destiny can become extraordinary.</p>

<p>Below are time-tested, psychologically uplifting, and spiritually energizing remedies from ancient texts, field experience, and sacred traditions</p>

<p>⏳<span style="color: green;"><b>Best Time & Constellations for Remedies:</b></span></p>

<p>✔️ Avoid Saturdays, Sundays, and Tuesdays. Wednesday is considered the most powerful for Kaal Sarp Yog remedies.</p>

<p>✔️ Favorable lunar days: Panchami, Saptami, Navami, Poornima, and Amavasya.</p>

<p>✔️ Avoid Bhadra, Vaighrit Tithi, Adhik Maas, and Kshaya Maas.</p>

<p>✔️ Ideal Nakshatras: Ashlesha, Pushya, Aardra, Swati, Ashwini, Magha, Moola, Jayeshtha, Shatabhisha.</p>

<p>✔️ Powerful Amavasya: If it falls on a Wednesday and in Ashlesha Nakshatra.</p>

<p>✔️ Nag Panchami and Ashlesha Navami hold divine cleansing potential.</p>

<p>🌿 <span style="color: green;"><b>Non-Shastriya Yet Powerful Remedies:</b></span></p>

<p>🌿 Offer Indian Bael leaves to Lord Shiva with full surrender.</p>

<p>🌿 Drink water kept in iron vessels to strengthen karmic immunity.</p>

<p>🌿 Fill blue/white glass bottle with water, keep in sunlight, drink next morning.</p>

<p>🌿 Make a hole in a coconut, put a copper coin, and place in water body with prayer.</p>

<p>🌿 Feed leprosy or needy patients without expectation.</p>

<p>🌿 Wear a 7-Mukhi Rudraksha for inner peace and Rahu-Ketu balance.</p>


<p>📜 <span style="color: green;"><b>Shastriya Remedies (As per Scriptures) :</b></span></p>

<p>🐍 Prepare a Copper Snake Effigy of your height, bathe before sunrise, worship it with *Shodshopachar* vidhi, then leave it at Shiv Temple. Don’t look back that day.</p>

<p>🐍 Make a Snake Effigy from Black Gram or Wheat, worship for 1 year, then immerse it and conduct a Nag Bali with an Acharya.</p>

<p>💍 Wear a Silver Onyx ring on middle finger to counter Rahu’s illusory impact.</p>

<p>🌑 During Eclipse, spell Kaal Sarp Mantra, pour water on snake idol and immerse it: “ॐ नवकुलाय विधमहे विषदंताय धीमहि तन्नो सर्प: प्रचोदयात्॥”.</p>

<p>🌸 Color your room in light pastel tones like white, grey, pale blue for energetic detox.</p>

<p>🔺 Install Kaal Sarp Dosh Yantra in your puja room, energize it, and offer dhoop and red sandal daily.</p>

<p>📿 Do Mahamrityunjaya Mantra Anushthan or Laghu Rudra Path over 21 days to remove deep-rooted dosha. </p>


<p>🕉️ <span style="color: green;"><b>A Final Divine Note :</b></span></p>

<p>The moment you begin these remedies with shraddha (faith) and sankalp (intent), the grip of Kaal Sarp Yog begins to dissolve.</p>

<p>You are not bound—you are chosen. And chosen souls are not broken by destiny, they are built by it.</p>

<p>Use these tools. And watch your darkness transform into light.</p>
`:`

<p>कालसर्प योग दंड नहीं है। यह ब्रह्मांड की ओर से मिला एक गहन आध्यात्मिक अवसर है, जो आत्मा की गति और विकास को तेज़ करने के लिए दिया जाता है।
जब राहु और केतु आपके ग्रह-संयोजन पर छाया डालते हैं, तो वे विनाश नहीं लाते—वे रूपांतरण जगाते हैं।</p>
<p>यह योग आपकी स्थिरता, रिश्तों या प्रगति को परख सकता है, परंतु सही उपायों के साथ यही आपकी असाधारण नियति का आधार बन जाता है।</p>
<p>नीचे दिए गए उपाय प्राचीन शास्त्रों, आचार्यों के अनुभवों और पवित्र परम्पराओं से लिए गए हैं — जिनका उद्देश्य आपको मानसिक बल और आध्यात्मिक ऊर्जा देना है।</p>
<p>⏳ <span style="color: green;"><b>उपाय का श्रेष्ठ समय व नक्षत्र:</b></span></p>
<p>✔️ शनिवार, रविवार और मंगलवार से परहेज़ करें।</p>
<p>✔️ बुधवार कालसर्प योग के उपायों के लिए सबसे प्रभावी माना गया है।</p>
<p>✔️ पञ्चमी, सप्तमी, नवमी, पूर्णिमा और अमावस्या तिथि विशेष फलदायी हैं।</p>
<p>✔️ भद्रा, वैघृत तिथि, अधिक मास और क्षय मास से बचें।</p>
<p>✔️ आदर्श नक्षत्र: अश्लेषा, पुष्य, आर्द्रा, स्वाती, अश्विनी, मघा, मूल, ज्येष्ठा, शतभिषा।</p>
<p>✔️ यदि अमावस्या बुधवार को और अश्लेषा नक्षत्र में आए, तो वह विशेष दिव्य मानी जाती है।</p>
<p>✔️ नागपञ्चमी और अश्लेषा नवमी — इन दिनों में उपाय विशेष शुद्धि प्रदान करते हैं।</p>
<p>🌿 <span style="color: green;"><b> शास्त्रों से परे परंतु प्रभावी उपाय:</b></span></p>
<p>🌿 भगवान शिव को सम्पूर्ण समर्पण भाव से बेलपत्र अर्पित करें।</p>
<p>🌿 लोहे के पात्र में रखा जल पिएँ — यह कर्म-प्रतिरोधक क्षमता को मज़बूत करता है।</p>
<p>🌿 नीली/सफ़ेद काँच की बोतल में पानी भरकर धूप में रखें और अगली सुबह पिएँ।</p>
<p>🌿 नारियल में छेद करके उसमें ताँबे का सिक्का डालें और जलाशय में प्रार्थना सहित प्रवाहित करें।</p>
<p>🌿 कुष्ठ रोगी या ज़रूरतमंद मरीजों की सेवा करें, बिना किसी प्रत्याशा के।</p>
<p>🌿 सात मुखी रुद्राक्ष धारण करें — यह राहु-केतु के असंतुलन को शांत करता है और भीतर शांति देता है।</p>
<p><b>📜 <span style="color: green;"><b>शास्त्रीय उपाय (शास्त्रानुसार) :</b></span> </b></p>
<p>🐍 अपनी लंबाई का ताँबे का सर्प बनवाएँ, सूर्योदय से पहले स्नान कर षोडशोपचार विधि से पूजन करें और शिव मंदिर में छोड़ आएँ। उस दिन पीछे मुड़कर न देखें।</p>
<p>🐍 काले चने या गेहूँ से बना सर्प — उसे एक वर्ष तक पूजें, फिर उसका विसर्जन करें और आचार्य की उपस्थिति में नागबली अनुष्ठान कराएँ।</p>
<p>💍 रजत (चाँदी) का ओनेक्स अंगूठी मध्यमा उँगली में धारण करें — राहु की माया को संतुलित करने हेतु।</p>
<p>🌑 ग्रहणकाल में कालसर्प मंत्र जपते हुए सर्प-प्रतिमा पर जल अर्पित करें और फिर विसर्जन करें:</p>
<p>“ॐ नवकुलाय विधमहे विषदंताय धीमहि तन्नः सर्पः प्रचोदयात्॥”</p>
<p>🌸 अपने कक्ष का रंग हल्के पेस्टल शेड्स — सफ़ेद, धूसर, हल्का नीला — में रखें, ताकि ऊर्जात्मक शुद्धि हो।</p>
<p>🔺 पूजास्थान में कालसर्प दोष यंत्र स्थापित करें, उसे अभिमंत्रित करें और प्रतिदिन धूप व लाल चंदन अर्पित करें।</p>
<p>📿 महामृत्युंजय मंत्र अनुष्ठान या लघु रुद्र पाठ 21 दिनों तक करें, ताकि गहराई से बैठा दोष धीरे-धीरे हटे।</p>
<p>🕉️ <span style="color: green;"><b>🕉️ एक दिव्य अंतिम संदेश</b></span></p>
<p>जिस क्षण आप इन उपायों को श्रद्धा (faith) और संकल्प (intent) से आरंभ करते हैं, उसी क्षण से कालसर्प योग की पकड़ ढीली होने लगती है।</p>
<p>आप बंधे हुए नहीं हैं — आप चुने हुए हैं। और जिन्हें भाग्य चुनता है, उन्हें तोड़ता नहीं, गढ़ता है।</p>
<p>✨ इन साधनों का प्रयोग करें।</p>
<p>✨ और देखिए कैसे आपका अंधकार प्रकाश में बदलता है।</p>
`;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if ((!kaalsarpDoshaData || !kaalsarpDoshaData.length) && !remediesText) return;

          if (isSpeaking) {
            TTSModule.stop();
            setIsSpeaking(false);
          } else {
            // 1️⃣ Object text nikal lo
            const doshaObj = kaalsarpDoshaData?.[0]?.kaalsarpDosha || {};
            let objectText = '';
            ['info', 'reason', 'type', 'intensity'].forEach(f => {
              if (doshaObj[f]) objectText += doshaObj[f].replace(/<[^>]*>/g, ' ').trim() + '. ';
            });

            // 2️⃣ HTML remedies text clean karo
            const htmlText = remediesText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

            // 3️⃣ Dono combine karke bolao
            const finalText = objectText + '. ' + htmlText;
            if (!finalText) return;

            TTSModule.stop();
            TTSModule.speak(finalText, 'male', t('lang'));
            setIsSpeaking(true);
          }
        }}
        style={{ padding: 10, alignSelf: 'flex-end' }}
      >
        {!isSpeaking ? <MaterialCommunityIcons
          name={"volume-high"}
          size={24}
          color={"#B75D00"} // ya theme.colors.primary
        /> : <Image source={require('../../assets/astroOneImages/rishi.png')} style={{ height: 25, width: 25 }} />}
      </TouchableOpacity>


      {info && (
        <View style={styles.infoContainer}>
          <Text style={{ ...FontsStyle.fontBold, textAlign: "justify", fontSize: normalize(16), paddingHorizontal: SCREEN_WIDTH * 0.02, alignSelf: "center", paddingVertical: SCREEN_HEIGHT * 0.02 }}> 🐍🕉️ {t("Kaalsarp Dosha")} </Text>
          <Text style={{ ...FontsStyle.fontBold, textAlign: "justify", fontSize: normalize(16), paddingHorizontal: SCREEN_WIDTH * 0.02 }}> {info} </Text>
        </View>
      )}

      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <Text style={styles.title}> {t('Kaalsarp Dosha')}</Text>
          <Text style={[styles.value, { color: kalsharpdosh ? 'red' : 'green' }]}>
            {`${kalsharpdosh ? 'Present' : 'Not Present'}`}

          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}> {t('Type')}</Text>
          <Text style={styles.value}> {`${type || 'N/A'}`}</Text>
        </View>
      </View>


      <ScrollView showsVerticalScrollIndicator={true}>
        <View>
          <Text style={{
            ...FontsStyle.fontBold,
            textAlign: "center",
            fontSize: normalize(16),
            paddingHorizontal: SCREEN_WIDTH * 0.02,
            alignSelf: "center",
            paddingVertical: SCREEN_HEIGHT * 0.02
          }}>
            {t("Kaal Sarp Yog – Complete Guide to Remedies")}
          </Text>

          <View style={{ margin: 10 }}>
            <RenderHTML
              source={{ html: remediesText }}

              contentWidth={SCREEN_WIDTH}
            />

          </View>

        </View>
      </ScrollView>

      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.03 }}>

      </View>

    </ScrollView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  kaalsarpDoshaData: state.kundli.kaalsarpDoshaData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KaalsarpaDosha);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.01,
  },
  infoContainer: {
    padding: SCREEN_WIDTH * 0.03,
    ...FontsStyle.fontfamily,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: responsiveFontSize(2),
    color: '#000',
    textAlign: 'center',
    ...FontsStyle.fontfamily,
  },
  cardContainer: {
    borderWidth: 1,
    padding: SCREEN_HEIGHT * 0.015,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    backgroundColor: '#f9f9f9',
    marginHorizontal: SCREEN_WIDTH * 0.02
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SCREEN_HEIGHT * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: normalize(16),
    // fontWeight: 'bold',
    color: '#333',
    ...FontsStyle.fontBold,
  },
  value: {
    fontSize: normalize(16),
    color: '#555',
    ...FontsStyle.font
  },
  Hedertxt: {
    ...FontsStyle.fontfamily,
    fontSize: normalize(16),

  }
});