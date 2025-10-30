import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../config/Constants1'
import { connect } from 'react-redux';
import * as KundliActions from '../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { Fonts } from '../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import TranslateText from './language/TranslateText';
import { FontsStyle, normalize } from '../config/constants';
import RenderHTML from 'react-native-render-html';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
const { TTSModule } = NativeModules;

const MangalDosha = ({ basicDetails, dispatch, MangalDosha }) => {
  const { t } = useTranslation();
  console.log("shreekridhna", MangalDosha)
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



  useEffect(() => {
    const payload = {
      lang: t('lang'),


    }
    dispatch(KundliActions.getKundliBirthDetails(payload))
  }, [dispatch])


  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place

    }
    console.log("Mahadev", payload)
    dispatch(KundliActions.getMangalDosha(payload))
  }, [dispatch]);


  const htmlview = t('lang') == 'en' ?
    `<p><b>Ultimate Remedies for Mangal Dosha (Manglik Yog)</b></p>
    <p><b>🕉️Core Spiritual & Astrological Remedies</b></p>
    <p><span style="color: green;"><b>✅ Tulsi (Basil) Marriage / Vishnu Vivah:</b></span></p>
    <p>- Marry a Tulsi plant (females) or a Peepal tree (males) as per custom.</p>
    <p>- Symbolic marriage with Vishnu dissolves ill-effects of premature Mangal placement.</p>
    <p>- Best done in a proper Panchang-timed Muhurat with Brahmin guidance.</p>
    <p><span style="color: green;"><b>✅ Kumbh Vivah (Dummy Marriage):</b></span></p>
    <p>- Ritualistic marriage with a pot (kalash) before real marriage neutralizes the dosha karmically.</p>
    <p><span style="color: green;"><b>✅ Recital of Sundarkand or Hanuman Chalisa:</b></span></p>
    <p>- Daily or weekly reading (especially on Tuesdays and Saturdays) brings relief.</p>
    <p>- Recite Sundarkand 11 times across 11 Tuesdays for strong impact.</p>
    <p><b>🕉️Mantras and Daily Jap (Chanting)</b></p>
    <p><span style="color: green;"><b>✅ Universal Mangal Dosha Mantra (21 days or 108 times daily):</b></span></p>
    <p>ॐ क्रां क्रीं क्रौं सः भौमाय नमः ||</p>
    <p>- Use a coral mala (moonga mala).</p>
    <p>- Do it facing East, with a copper vessel of water nearby.</p>
    <p><span style="color: green;"><b>✅ Sri Mangal Chandika Stotra + Panchmukhi Deepak:</b></span></p>
    <p>- Light 5-wick oil lamp.</p>
    <p>- Recite: Raksha Raksha Devi Mangal Chandike, Harike vipatkale bhayaharinike ||</p>
    <p><b>🕉️Special Gender-Based Remedies</b></p>
    <p><span style="color: green;"><b>🔸 For Females:</b></span></p>
    <p>- Recite: “Sindhura Arkatimanam chhaya martanda sambhavam...” (108 times for 48 days). </p>
    <p>- Perform ‘Saubhagya Sundari Sadhna’ or Durga Saptashati.</p>
    <p>- Donate red bangles, sindoor, red clothes on Fridays or Tuesdays.</p>
    <p><span style="color: green;"><b>🔸 For Males:</b></span></p>
    <p>- Recite Durga Saptashati Argala Stotra + “Om Om Ambe Ambike Ambalike...” (51 times daily).</p>
    <p>- Wear energized Red Coral (Moonga) in right-hand ring finger on a Tuesday.</p>
    <p><b>🕉️Pooja, Homa & Talisman Remedies</b></p>
    <p><span style="color: green;"><b>✅ Mangal Shanti Pooja & Havan:</b></span></p>
    <p>- Done at Navagraha temple or during auspicious Muhurat.</p>
    <p>- Offer masoor dal, red cloth, jaggery, and red flowers into the havan.</p>
    <p><span style="color: green;"><b>✅ Use of Mangal Yantra (energized):</b></span></p>
    <p>- Keep copper-engraved Mangal Yantra in pooja space.</p>
    <p>- Worship with red sandal, vermilion, and red flowers every Tuesday.</p>
    <p><b>🕉️Temple Visits and Donations</b></p>
    <p><span style="color: green;"><b>✅Temple Visits and Donations</b></span></p>
    <p>- Navagraha temples: Offer archana for Mangal dosha</p>
    <p>- Kukke Subramanya (K'taka): For Sarpa Dosha + Mangalik</p>
    <p>- Mangalnath Mandir, Ujjain: Most powerful for Mars</p>
    <p><span style="color: green;"><b>✅Donations on Tuesdays:</b></span></p>
    <p>- Masoor dal, red cloth, copper utensils, jaggery, or red sandalwood to Brahmins or needy.</p>
    <p><b>🕉️Practical Tips & Lifestyle Adjustments  </b></p>
    <p>1. Avoid anger, aggression, dominance — qualities aggravated by Mars. </p>                         
    <p>2. Practice Yoga / Martial arts to balance Martian energy.</p>
    <p>3. Wear Red Coral (Moonga) only after full Kundli analysis.</p>
    <p>4. Fast on Tuesdays (avoid salt, non-veg).</p>
    <p><b>🕉️Most Effective Combo Remedy Plan (21–48 Days Protocol)</b></p>
    <p>Morning: Bathe, light diya in red clay lamp with mustard oil, offer red flowers.</p>
    <p>Mantra Jap: Chant 'Om Kraam Kreem Kraum...' 108 times on coral mala.</p>
    <p>Evening: Recite Hanuman Chalisa / Sundarkand / Durga Argala Stotra.</p>
    <p>Weekly: Visit Hanuman or Navagraha Temple.</p>
    <p>Fasting: On Tuesdays, avoid salt, spicy food.</p>`: 
    `
    <p><b>🌺 मंगल दोष (मांगलिक योग) के परम उपाय</b></p>
    <p><b>🌿 आध्यात्मिक व ज्योतिषीय उपाय</b></p>
    <p><span style="color: green;"><b>✅ तुलसी विवाह / विष्णु विवाह</b></span></p>
    <p>- कन्याओं के लिए तुलसी विवाह और पुरुषों के लिए पीपल विवाह – यह प्रतीकात्मक विवाह मंगल दोष की कठोरता को शीतल करता है।</p>
    <p>- विष्णु जी के साथ यह बंधन अकाल मंगल की पीड़ा को हर लेता है।</p>
    <p>- उत्तम फल हेतु शुभ पंचांग-मुहूर्त में, ब्राह्मण मार्गदर्शन से कराएँ।</p>
    <p><span style="color: green;"><b>✅ कुंभ विवाह (कन्या/वर का कलश से विवाह)</b></span></p>
    <p>- वास्तविक विवाह से पहले कलश विवाह करने से दोष के कर्मात्मक बंधन ढीले पड़ते हैं।</p>
    <p><span style="color: green;"><b>✅ सुंदरकांड / हनुमान चालीसा पाठ</b></span></p>
    <p>- रोज़ाना या हर मंगलवार-शनिवार को पाठ करने से मंगल शांति होती है।</p>
    <p>- लगातार 11 मंगलवार सुंदरकांड का 11 बार पाठ – अद्भुत असर देता है।</p>
    <p><b>🔔 मंत्र जाप और दैनिक साधना</b></p>
    <p><span style="color: green;"><b>✅ सार्वभौमिक मंगल मंत्र (21 दिन या प्रतिदिन 108 बार): ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥</b></span></p>
    <p>- मूँगे की माला से जप करें।</p>
    <p>- पूरब दिशा में बैठकर, ताम्र-पात्र में जल पास रखें।</p>
    <p><span style="color: green;"><b>✅ श्री मंगल चंडिका स्तोत्र + पंचमुखी दीपक</b></span></p>
    <p>- पाँच बातियों वाला दीपक जलाएँ।</p>
    <p>- पाठ करें: “रक्षा रक्षा देवी मंगल चंडिके, हरिके विपत्काले भयहारिणिके”</p>
    <p><b>👩‍🦰 विशेष उपाय (महिलाओं के लिए)</b></p>
    <p>- “सिन्धूर अर्कतिमानं छाया मार्तण्ड सम्भवम्...” – यह मंत्र 108 बार, लगातार 48 दिनों तक।</p>
    <p>- ‘सौभाग्य सुंदरी साधना’ या दुर्गा सप्तशती का पाठ करें।</p>
    <p>- शुक्रवार या मंगलवार को लाल चूड़ियाँ, सिंदूर, लाल वस्त्र दान करें।</p>
    <p><b>👨 विशेष उपाय (पुरुषों के लिए)</b></p>
    <p>- दुर्गा सप्तशती के अर्गला स्तोत्र का पाठ + “ॐ ॐ अम्बे अम्बिके अम्बालिके...” (प्रतिदिन 51 बार)।</p>
    <p>- मंगलवार को अभिमंत्रित मूँगा अंगूठी, दाहिने हाथ की अनामिका में धारण करें।</p>
    <p><b>🔥 पूजा, होम और ताबीज़ उपाय</b></p>
    <p><span style="color: green;"><b>✅ मंगल शांति पूजा व हवन</b></span></p>
    <p>- नवग्रह मंदिर में शुभ मुहूर्त पर कराएँ।</p>
    <p>- मसूर दाल, लाल कपड़ा, गुड़ और लाल पुष्प अर्पित करें।</p>
    <p><span style="color: green;"><b>✅ मंगल यंत्र (अभिमंत्रित)</b></span></p>
    <p>- तांबे पर अंकित मंगल यंत्र को पूजा-स्थल पर रखें।</p>
    <p>- लाल चंदन, सिंदूर और लाल पुष्प से प्रत्येक मंगलवार पूजन करें।</p>
    <p><b>🛕 मंदिर व दान उपाय</b></p>
    <p><b>मंदिर</b></p>
    <p>- नवग्रह मंदिर – मंगल दोष निवारण हेतु अर्चना।</p>
    <p>- कुक्के सुब्रमण्य (कर्नाटक) – सर्प दोष + मांगलिक के लिए विशेष।</p>
    <p>- मंगलनाथ मंदिर, उज्जैन – मंगल ग्रह का सबसे प्रभावी स्थान।</p>
    <p><b>दान (मंगलवार को)</b></p>
    <p>- मसूर दाल, लाल वस्त्र, तांबे के बर्तन, गुड़, या लाल चंदन – ब्राह्मणों अथवा ज़रूरतमंदों को।</p>
    <p><b>🌿 व्यावहारिक जीवनशैली के उपाय</b></p>
    <p>1. क्रोध, आक्रामकता, हावी होने की प्रवृत्ति से बचें – यही मंगल को उग्र बनाते हैं।</p>
    <p>2. योग, मार्शल आर्ट्स या अनुशासित व्यायाम से ऊर्जा को संतुलित करें।</p>
    <p>3. मूँगा (Red Coral) पहनने से पहले संपूर्ण कुंडली का विश्लेषण करवाएँ।</p>
    <p>4. मंगलवार उपवास रखें – नमक व मांसाहार से परहेज़।</p>
    <p><b>🌞 सर्वश्रेष्ठ संयुक्त उपाय योजना (21–48 दिन का प्रोटोकॉल)</b></p>
    <p>सुबह: स्नान कर लाल मिट्टी के दीपक में सरसों तेल से दीप जलाएँ, लाल पुष्प चढ़ाएँ।</p>
    <p>मंत्र जप: ‘ॐ क्रां क्रीं क्रौं...’ मंत्र का 108 बार मूँगा माला से जप।</p>
    <p>शाम: हनुमान चालीसा / सुंदरकांड / दुर्गा अर्गला स्तोत्र का पाठ।</p>
    <p>साप्ताहिक: हनुमान या नवग्रह मंदिर दर्शन।</p>
    <p>उपवास: मंगलवार को नमक व तीखे भोजन से परहेज़।</p>
    <p>✨ इन उपायों को यदि श्रद्धा और अनुशासन के साथ अपनाया जाए, तो मंगल दोष की पीड़ा धीरे-धीरे मिटने लगती है, और जीवन में सामंजस्य, सौंदर्य व स्थिरता का संचार होता है।</p>
    `;




  return (
    <ScrollView style={{ flex: 1, paddingTop: SCREEN_HEIGHT * 0.04, paddingHorizontal: SCREEN_WIDTH * 0.02, gap: 10 }}>


      <TouchableOpacity
        onPress={() => {
          if (!MangalDosha && !htmlview) return;

          if (isSpeaking) {
            TTSModule.stop();
            setIsSpeaking(false);
          } else {
            // Combine both object + HTML content
            const text = getFullSpeechText(MangalDosha) + '. ' + getFullSpeechText(htmlview);
            if (!text) return;
            TTSModule.stop();
            TTSModule.speak(text, 'male', t('lang'));
            setIsSpeaking(true);
          }
        }}
        style={{ alignItems: 'flex-end', padding: 10 }}
      >
       {!isSpeaking ?   <MaterialCommunityIcons
                     name={"volume-high"}
                     size={24}
                     color={"#B75D00"} // ya theme.colors.primary
                   />: <Image source={require('../assets/astroOneImages/rishi.png')} style={{ height:25, width:25}}/>}
      </TouchableOpacity>


      <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(15), }}> {MangalDosha?.info}</Text>


      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <Text style={styles.title}> {t('Mangal Dosha')}</Text>
          <Text style={[styles.value, { color: MangalDosha?.reason ? 'red' : 'black' }]}>
            {`${MangalDosha?.reason ? 'Present' : 'Not Present'}`}

          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}> {t('Type')} </Text>
          <Text style={styles.value}> {`${MangalDosha?.type || 'N/A'}`}</Text>
        </View>
      </View>

      <RenderHTML
        contentWidth={SCREEN_WIDTH}
        source={{ html: htmlview }}
      />




      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.1 }}>

      </View>



    </ScrollView>
  )
}


const mapStateToProps = state => ({

  isLoading: state.setting.isLoading,

  basicDetails: state.kundli.basicDetails,
  MangalDosha: state.kundli.MangalDosha,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(MangalDosha);

const styles = StyleSheet.create({

  point: {
    ...FontsStyle.fontfamily,
    fontSize: normalize(15),
    color: '#333',
    marginBottom: 4,
  },
  sectionTitle: {
    ...FontsStyle.fontBold,
    fontSize: normalize(15),
    color: '#a70000',
    marginTop: 12,
    marginBottom: 4,
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
    fontSize: normalize(26),
    color: '#333',
    ...FontsStyle.fontBold,
  },
  value: {
    fontSize: normalize(16),
    color: '#555',
    ...FontsStyle.fontfamily,
  },
  Hedertxt: {
    ...FontsStyle.fontfamily,
    fontSize: normalize(18),

  }

})