import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader2';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import moment from 'moment';
import MyHeader from '../../components/MyHeader';
import * as KundliActions from '../../redux/actions/KundliActions'
import { Fonts } from '../../assets/style';
import TranslateText from '../language/TranslateText';

const KundliBirthDetailes = ({ navigation, basicDetails, birthDetailsData, dispatch, MYBIRTHJII }) => {
  console.log("MYBIRTHJII", MYBIRTHJII)


  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? ("0" + hours).slice(-2) : 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const payload = {
      lang: t('lang'),

    }
    dispatch(KundliActions.getKundliBirthDetails(payload))
  }, [dispatch])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MyLoader isVisible={isLoading} />
      {/* <MyHeader title={'Birth Details'} navigation={navigation} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ ...Fonts.primaryHelvetica, fontSize: 18, fontWeight: 600, color: 'black' }}> <TranslateText title={'Basic Details'} /></Text>



        <View
          style={{
            flex: 0,
            width: '98%',
            alignSelf: 'center',
            backgroundColor: colors.background_theme1,
            paddingVertical: 20,
            borderRadius: 10,
            shadowColor: colors.black_color5,
            shadowRadius: 5,
            borderWidth: 0.4,
            borderColor: '#737272'
          }}>
          <View style={styles.itmeContainer}>
            <Text allowFontScaling={false} style={styles.itemText}>{t("name")}</Text>

            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={MYBIRTHJII?.birthdata?.name} />
            </Text>


          </View>

          <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#F7F6FE',
            }}>
            <Text allowFontScaling={false} style={{ ...styles.itemText, }}>
              {t("date")}
            </Text>
            <Text allowFontScaling={false} style={{ ...styles.itemText }}>
              <TranslateText title={` ${moment(basicDetails?.dob).format('DD MMM YYYY')}`} />

            </Text>
          </View>

          <View style={styles.itmeContainer}>
            <Text allowFontScaling={false} style={styles.itemText}>
              {t("time")}
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>
              {moment(basicDetails?.tob).format('hh:mm A')}
            </Text>
          </View>

          <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#F7F6FE',
            }}>
            <Text allowFontScaling={false} style={{ ...styles.itemText, }}>
              {t("place")}
            </Text>

            <Text allowFontScaling={false} style={{ ...styles.itemText }}>
              <TranslateText title={basicDetails?.place} />
            </Text>


          </View>

          <View style={styles.itmeContainer}>
            <Text allowFontScaling={false} style={styles.itemText}>
              {t("lat")}
            </Text>

            <Text allowFontScaling={false} style={styles.itemText}>
              {basicDetails?.lat}
            </Text>


          </View>

          <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#F7F6FE',
            }}>
            <Text allowFontScaling={false} style={{ ...styles.itemText, }}>
              {t("long")}
            </Text>
            <Text allowFontScaling={false} style={{ ...styles.itemText, }}>
              {basicDetails?.lon}
            </Text>
          </View>

          <View style={styles.itmeContainer}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={t("Sunrise")} />
            </Text>

            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={MYBIRTHJII?.birthdata?.sunrise} />
            </Text>
          </View>




          <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#F7F6FE',
            }}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={t("Sunset")} />
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={MYBIRTHJII?.birthdata?.sunset} />
            </Text>
          </View>


          <View
            style={{
              ...styles.itmeContainer,
            }}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title="TimeZone" />
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={birthDetailsData?.timezone ? birthDetailsData?.timezone.toString() : '5.5'} />
            </Text>
          </View>


          <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#F7F6FE',
            }}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={' Shak Samvat'} />
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>{MYBIRTHJII?.birthdata?.shakSamvat}</Text>
          </View>

          <View
            style={{
              ...styles.itmeContainer,

            }}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={' Vikram Samvat'} />
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>{MYBIRTHJII?.birthdata?.vikramSamvat}</Text>
          </View>
          <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#F7F6FE',
            }}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={'Ayanamsa Name '} />
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>{MYBIRTHJII?.birthdata?.ayanamsha?.ayanamsha_name}</Text>
          </View>

          <View
            style={{
              ...styles.itmeContainer,

            }}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={' Ayanamsa Degree '} />
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}> {MYBIRTHJII?.birthdata?.ayanamsha?.degree}</Text>
          </View>

          <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#F7F6FE',
            }}>
            <Text allowFontScaling={false} style={styles.itemText}>
              <TranslateText title={' Thithi '} />
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}> <TranslateText title={MYBIRTHJII?.birthdata?.tithi?.name} /></Text>
          </View>







          {/* <View
            style={{
              ...styles.itmeContainer,
              backgroundColor: '#ffbf69',
            }}>
            <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
            Ayanamsha
            </Text>
            <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
              {birthDetailsData?.ayanamsha}
            </Text>
          </View> */}
          {/* <View style={styles.itmeContainer1}>
            <Text allowFontScaling={false} style={styles.itemText}>
              Sunrise
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>{birthDetailsData?.sunrise}</Text>
          </View> */}
          {/* <View style={styles.itmeContainer1}>
            <Text allowFontScaling={false} style={styles.itemText}>
              Sunset
            </Text>
            <Text allowFontScaling={false} style={styles.itemText}>{birthDetailsData?.sunset}</Text>
          </View> */}
        </View>

      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  basicDetails: state.kundli.basicDetails,
  birthDetailsData: state.kundli.birthDetailsData,
  MYBIRTHJII: state.kundli.MYBIRTHJII,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(KundliBirthDetailes);

const styles = StyleSheet.create({
  itmeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderColor: 'grey'
  },
  itmeContainer1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

  },
  itemText: {
    flex: 0.5,
    fontSize: getFontSize(1.5),
    color: "black"
  },
});
