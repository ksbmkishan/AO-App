import { FlatList, StyleSheet, Text, View, NativeModules, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import RenderHTML from 'react-native-render-html';
import { FontsStyle } from '../../../config/constants';
import MyLoader from '../../../components/MyLoader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import FastImage from '@d11/react-native-fast-image';
import { planetDescriptions } from '../../../json/planetDescriptions';
  const { TTSModule } = NativeModules;


const Dashasimple = ({ basicDetails, dispatch, myVimhotri }) => {


  const { t } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState(false);

const stripHtml = (text) => {
  if (!text) return "";
  return text
    .replace(/<\/?[^>]+(>|$)/g, "")  // remove HTML tags
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // remove emoticons
    .replace(/[\u{2700}-\u{27BF}]/gu, "")   // remove misc symbols
    .replace(/\s+/g, " ") // normalize spaces
    .trim();
};


  const getFullSpeechText = (data) => {
    if (!data) return "";

    let text = "";

    // Title & Description
    if (data) text += `${stripHtml(data)}. `;


    return text;
  };

  useEffect(() => {
    const payload = {
      lang: t('lang'), // can be dynamic via i18n
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getCurrentVimhotri(payload));
    dispatch(KundliActions.getvimhotrimahadasha(payload));
    dispatch(KundliActions.getKundliBirthDetails({ lang: 'en' }));

    return () => {
      // ✅ jaise hi page se bahar jaoge, speech band ho jayegi
      TTSModule.stop();
      setIsSpeaking(false);
    };
  }, [dispatch]);

  const speakFullData = useCallback((htmlContent) => {
          const text = getFullSpeechText(htmlContent);
  
          if (isSpeaking) {
              TTSModule.stop();
              setIsSpeaking(false);
          } else {
              if (text) {
                  TTSModule.stop();
                  console.log('text ', text);
                  TTSModule.speak(text, "male", t("lang"));
                  setIsSpeaking(true);
              }
          }
      }, [isSpeaking,getFullSpeechText, t]);

  const renderItem = ({ item }) => {
    const planet = item.planet?.charAt(0).toUpperCase() + item.planet?.slice(1).toLowerCase();
    console.log('planet ', planet)
    const desc = planetDescriptions[planet] || 'No description available.';

    return (
      desc ?
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => 
              
                speakFullData(desc)
            }
            style={{ alignItems: "flex-end", }}
          >
            {!isSpeaking ? <MaterialCommunityIcons
              name={"volume-high"}
              size={24}
              color={"#B75D00"} // ya theme.colors.primary
            /> : <Image source={require('../../../assets/astroOneImages/rishi.png')} style={{ height: 25, width: 25 }} />}
          </TouchableOpacity>
          <Text style={styles.planet}>🔯 {planet} Dasha</Text>
          <Text style={styles.date}>📆 {item.startDate} → {item.endDate}</Text>
          <RenderHTML
            contentWidth={SCREEN_WIDTH}
            source={{ html: desc }}

          />
        </View>
        : <MyLoader />
    );
  };




  return (
    <View style={styles.container}>
      <FlatList
        data={myVimhotri}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={{ paddingTop: SCREEN_HEIGHT * 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3, backgroundColor: '#F8E8D9', }}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  objectFit: 'contain',
                }}
                source={require('../../../assets/images/om.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        }

      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  myVimhotri: state.kundli.myVimhotri,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashasimple);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E8D9',
    padding: SCREEN_HEIGHT * 0.02,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: SCREEN_HEIGHT * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.015,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planet: {
    ...Fonts.black14InterBold,
    fontSize: responsiveFontSize(2),
    marginBottom: 5,
    color: '#4B0082',

  },
  date: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.5),
    marginBottom: 10,
    color: '#555',
  },
  prediction: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.6),
    textAlign: 'justify',
    color: '#333',
  },
  emptyText: {
    fontSize: responsiveFontSize(2),
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});