import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts, Sizes } from '../../assets/style';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import MyLoader from '../../components/MyLoader';
import RenderHTML from 'react-native-render-html';
import { FontsStyle, normalize } from '../../config/constants';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { TTSModule } = NativeModules;
import TTS from 'react-native-tts';


const NumerlogyChoChart = ({ basicDetails, dispatch, kitaablaaldata, isLoading, MYlagnaCHART }) => {
  const { t } = useTranslation();
  const planetList = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  const [planetValue, setPlanetValue] = useState('Sun');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }));
  }, [dispatch]);

  const PLANET_NAME_MAP = {
  Sun: t('lang') === 'en' ? 'Su' : 'सू',
  Moon: t('lang') === 'en' ? 'Mo' : 'चं',
  Mars: t('lang') === 'en' ? 'Ma' : 'मं',
  Mercury: t('lang') === 'en' ? 'Me' : 'बु',
  Jupiter: t('lang') === 'en' ? 'Ju' : 'गु',
  Venus: t('lang') === 'en' ? 'Ve' : 'शु',
  Saturn: t('lang') === 'en' ? 'Sa' : 'श',
  Rahu: t('lang') === 'en' ? 'Ra' : 'रा',
  Ketu: t('lang') === 'en' ? 'Ke' : 'के',
  Uranus: t('lang') === 'en' ? 'Ur' : 'यू',
  Neptune: t('lang') === 'en' ? 'Ne' : 'ने',
  Pluto: t('lang') === 'en' ? 'Pl' : 'प्',
};



  useEffect(() => {
    dispatch(KundliActions.getLagnaChart({
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    }));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      // ✅ jaise hi page se bahar jaoge, speech band ho jayegi
      TTSModule.stop();
      setIsSpeaking(false);
    };
  }, []);

  const stripHtml = (text) => text?.replace(/<\/?[^>]+(>|$)/g, "").trim();

  const getFullSpeechText = (data) => {
    if (!data) return "";

    let text = "";

    // Title & Description
    if (data.title) text += `Title: ${stripHtml(data.title)}. `;
    if (data.description) text += `Description: ${stripHtml(data.description)}. `;

    // Sections
    const sections = [
      { label: "Signs", key: "signs" },
      { label: "Benefic", key: "benefic" },
      { label: "Malefic", key: "malefic" },
      { label: "Precautions", key: "precautions" },
      { label: "Remedies", key: "remedies" },
    ];

    sections.forEach((section) => {
      const sectionData = data[section.key];
      if (sectionData?.length) {
        text += `${section.label}: `;
        sectionData.forEach((point, idx) => {
          if (typeof point === "object" && point.title) {
            text += `${stripHtml(point.title)}. `;
          } else if (typeof point === "string") {
            text += `${idx + 1}. ${stripHtml(point)}. `;
          }
        });
      }
    });

    // Misalignment
    if (data.misalignment?.length) {
      text += "Misalignments: ";
      data.misalignment.forEach((item) => {
        if (item?.title) text += `${stripHtml(item.title)}. `;
        if (typeof item === "string") text += `${stripHtml(item)}. `;
      });
    }

    // Note
    if (data.note) {
      text += `Note: ${stripHtml(data.note)}. `;
    }

    // Planet Info
    if (data.planetInfo) {
      const p = data.planetInfo;
      text += `Planet Info: Name ${p.name}, Element ${p.element}, Nature ${p.nature}, Exaltation ${p.exaltation}, Debilitation ${p.debilitation}, Own Signs ${p.ownSigns?.join(", ")}. `;
    }

    // House Info
    if (data.houseInfo) {
      const h = data.houseInfo;
      text += `House Info: Name ${h.name}, Represents ${h.represents}, Element ${h.element}. `;
    }

    return text;
  };


  const speakFullData = () => {
    const text = getFullSpeechText(data);
    if (isSpeaking) {
      // Stop karna hai
      TTSModule.stop();
      setIsSpeaking(false);
    } else {
      // Start karna hai
      if (text) {
        TTSModule.stop(); // safety
        TTSModule.speak(text, "male", t("lang"));
        setIsSpeaking(true);
      }
    }
  };




  useEffect(() => {
    if (MYlagnaCHART?.chart?.length && planetValue) {
      const shortName = PLANET_NAME_MAP[planetValue];
      const matchedHouse = MYlagnaCHART.chart.find(h =>
        h.planets?.some(p => p?.name?.toLowerCase?.() === shortName?.toLowerCase())
      );

      console.log('matched Phone. ', matchedHouse,planetValue.toLowerCase())
      if (matchedHouse) {
        dispatch(KundliActions.getNewLaalkitaab({
          planet: planetValue.toLowerCase(),
          house: matchedHouse.house,
          lang: t('lang')
        }));
      }
    }
  }, [MYlagnaCHART, planetValue]);

  const handlePlanetSelect = (planet) => {
     TTSModule.stop(); 
      setIsSpeaking(false);
    setPlanetValue(planet);
  };

  const data = kitaablaaldata?.placement;
  const rows = [planetList.slice(0, 4), planetList.slice(4, 8), planetList.slice(8)];

  console.log('data?.title :: ', data?.title);

 const handleSpeak = async () => {
  const text = getFullSpeechText(data);
  
  if (!text || !text.trim()) {
    console.warn("TTS text is empty");
    return;
  }

  try {
    if (isSpeaking) {
      await TTSModule.stop(); // wait for stop to finish
      setIsSpeaking(false);
    } else {
      await TTSModule.stop(); // ensure any previous speech stops
      await TTSModule.speak(text, "male", t("lang")); // await speak to prevent errors
      setIsSpeaking(true);
    }
  } catch (err) {
    console.error("TTS error:", err);
    setIsSpeaking(false);
  }
};



  return (
    <View style={{ flex: 1 }}>
      {isLoading || !data ? (
        <MyLoader />
      ) : (
        <ScrollView style={styles.container}>


          <TouchableOpacity
            onPress={() => {
              handleSpeak();
            }}
            style={{ alignItems: "flex-end", }}
          >
            {!isSpeaking ?   <MaterialCommunityIcons
              name={"volume-high"}
              size={24}
              color={"#B75D00"} // ya theme.colors.primary
            />: <Image source={require('../../assets/astroOneImages/rishi.png')} style={{ height:25, width:25}}/>}
          
          </TouchableOpacity>



          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.toggleRowContainer}>
              {row.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handlePlanetSelect(item)}
                  style={[styles.toggleButton, planetValue === item && styles.activeToggleButton]}
                >
                  <Text
                    style={[styles.toggleButtonText, planetValue === item && styles.activeToggleButtonText]}
                  >
                    {t(`${item}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <View style={{ marginTop: 20, padding:15 }}>
            <Text style={{ ...FontsStyle.font, fontSize: normalize(18), color: '#B75D00', }}>
              {data?.title?.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
            <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(15), marginVertical: 10, }}>
              {data?.description?.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>

            {[{ label: 'Signs', key: 'signs' }, { label: 'Benefic', key: 'benefic' }, { label: 'Malefic', key: 'malefic' }, { label: 'Precautions', key: 'precautions' }, { label: 'Remedies', key: 'remedies' }].map((section) => {
              const sectionData = data?.[section.key];
              let pointCounter = 1;
              return (
                <View key={section.key} style={{}}>

                  {sectionData?.map((point, index) => {
                    if (typeof point === 'object' && point.title) {
                      return (
                        <Text key={`${section.key}-title-${index}`} style={styles.sectionTitle}>
                          {point.title?.replace(/<\/?[^>]+(>|$)/g, "")}
                        </Text>



                      );
                    }

                    return (
                      <View key={`${section.key}-point-${index}`} style={{ flexDirection: 'row', marginVertical: 4 }}>
                        <Text style={styles.pointCounter}>{`${pointCounter++}. `}</Text>
                        <RenderHTML
                          contentWidth={SCREEN_WIDTH}

                          source={{ html: point }}

                        />
                      </View>
                    );
                  })}

                </View>

              );
            })}
            {/* {data?.note && <Text style={{ ...Fonts.Po, fontSize: 13, marginTop: 20 }}>{data.note}</Text> */}

            {data?.misalignment && data?.misalignment.length > 0 &&
              data.misalignment.map((item, index) => (
                <View key={index} style={{}}>

                  <RenderHTML
                    key={index}
                    contentWidth={SCREEN_WIDTH}
                    baseStyle={styles.sectionTitle}
                    source={{ html: item?.title }}
                  />

                  <RenderHTML
                    key={index}
                    contentWidth={SCREEN_WIDTH}
                    baseStyle={{ fontSize: 13, marginTop: 0, color: 'black', ...FontsStyle.font, }}
                    source={{ html: item }}
                  />

                </View>
              ))
            }

            {data?.note &&
              <RenderHTML
                contentWidth={SCREEN_WIDTH}
                baseStyle={{ fontSize: 13, marginTop: 8, color: 'black', ...FontsStyle.font, }}
                source={{ html: data.note }}
              />}


            {data?.planetInfo && (
              <View style={{ marginTop: 20 }}>
                <Text style={{ ...styles.sectionTitle, }}>🌌 {t("Planet Info")}:</Text>
                <Text style={styles.sectionPoint}>{t("Name")}: {data.planetInfo.name}</Text>
                <Text style={styles.sectionPoint}>{t("Element")}: {data.planetInfo.element}</Text>
                <Text style={styles.sectionPoint}>{t("Nature")}: {data.planetInfo.nature}</Text>
                <Text style={styles.sectionPoint}>{t("Exaltation")}: {data.planetInfo.exaltation}</Text>
                <Text style={styles.sectionPoint}>{t("Debilitation")}: {data.planetInfo.debilitation}</Text>
                <Text style={styles.sectionPoint}>{t("Own Signs")}: {data.planetInfo.ownSigns?.join(', ')}</Text>
              </View>
            )}

            {data?.houseInfo && (
              <View style={{ marginTop: 20 }}>
                <Text style={{ ...styles.sectionTitle, }}>🏠 {t("House Info")}:</Text>
                <Text style={styles.sectionPoint}>{t("Name")}: {data.houseInfo.name}</Text>
                <Text style={styles.sectionPoint}>{t("Represents")}: {data.houseInfo.represents}</Text>
                <Text style={styles.sectionPoint}>{t("Element")}: {data.houseInfo.element}</Text>
              </View>
            )}


          </View>
          <View style={{ paddingVertical: SCREEN_HEIGHT * 0.1 }} />
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  kitaablaaldata: state.kundli.kitaablaaldata,
  isLoading: state.setting.isLoading,
  MYlagnaCHART: state.kundli.MYlagnaCHART,
});

export default connect(mapStateToProps)(NumerlogyChoChart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    backgroundColor: '#F8E8D9',
  },
  toggleRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 6,
  },
  activeToggleButton: {
    backgroundColor: '#B75D00',
    borderColor: '#B75D00',
  },
  toggleButtonText: {
    color: '#333',
    fontSize: normalize(13),
    ...FontsStyle.fontBold,
    textAlign: 'center',
  },
  activeToggleButtonText: {
    color: '#fff',
  },
  sectionTitle: {
    ...FontsStyle.font,
    fontSize: normalize(13),
    marginVertical: 6,
    color: '#B75D00',
    fontWeight: '600'

  },
  sectionPoint: {
    fontSize: normalize(13),
    marginVertical: 2,
    color: 'black',
    ...FontsStyle.font
  },
  pointCounter: {
    ...FontsStyle.font,
    fontSize: normalize(11),
    lineHeight: 30
  },
});