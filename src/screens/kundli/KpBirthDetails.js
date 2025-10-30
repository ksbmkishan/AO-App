import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

import { colors, fonts, getFontSize } from '../../config/Constants1';
import { useTranslation } from 'react-i18next';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import moment from 'moment'
import TranslateText from '../language/TranslateText';
import { TEST_ID } from 'react-native-gifted-chat';
import MyLoader from '../../components/MyLoader';
import { FontsStyle } from '../../config/constants';

const KpBirthDetails = ({ navigation, isLoading, dispatch, kpBirthDetails, basicDetails }) => {

  console.log("isLoading", isLoading)

  const { t } = useTranslation();

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place

    }
    dispatch(KundliActions.getKpBirthDetails(payload))
  }, [dispatch])


  useEffect(() => {
    const payload = {
      lang: t('lang'),


    }
    dispatch(KundliActions.getKundliBirthDetails(payload))
  }, [dispatch])


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





  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1, marginHorizontal: SCREEN_WIDTH * 0.02, paddingBottom: SCREEN_HEIGHT * 0.02 }}>



      {isLoading || !kpBirthDetails?.length ? (
        <MyLoader />
      ) : (
        <FlatList data={kpBirthDetails} renderItem={(({ item }) => {
          console.log("kpBirthDetails::::>", item)

          return (

            <View
              style={{
                flex: 0,
                width: '100%',
                alignSelf: 'center',
                backgroundColor: '#F8E8D9',
                paddingVertical: 20,
                borderRadius: 10,
                shadowColor: colors.black_color5,
                shadowRadius: 5,
                borderWidth: 0.4,
                borderColor: '#737272'
              }}>

              <View style={styles.itmeContainer}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("name")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.name}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("Date")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {`${item?.birthdata?.day}-${item?.birthdata?.month}-${item?.birthdata?.year}`}
                </Text>
              </View>

              <View style={styles.itmeContainer}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("time")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {`${item?.birthdata?.hour}:${String(item?.birthdata?.min).padStart(2, '0')}`} 
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("place")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  <TranslateText
                    title={
                      item?.birthdata?.place
                        ? item.birthdata.place.slice(0, 30) + (item.birthdata.place.length > 30 ? '...' : '')
                        : ''
                    }
                  />
                </Text>
              </View>

              <View style={styles.itmeContainer}>

                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("lat")}
                </Text>

                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.latitude}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("long")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.longitude}
                </Text>
              </View>

              <View style={styles.itmeContainer}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("sunrise")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.sunrise}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("sunset")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.sunset}
                </Text>
              </View>

              <View style={styles.itmeContainer}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("shak_samvat")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.shakSamvat}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("vikram_samvat")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.vikramSamvat}
                </Text>
              </View>

              <View style={styles.itmeContainer}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("ayanamsa_name")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.ayanamsha?.ayanamsha_name}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("ayanamsa_degree")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.ayanamsha?.degree}
                </Text>
              </View>

              <View style={styles.itmeContainer}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("tithi")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.tithi?.name}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("gender")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.gender}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: "#F8E8D9",
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("day")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.dayname}
                </Text>
              </View>

              <View
                style={{
                  ...styles.itmeContainer,
                  backgroundColor: colors.mybackground,
                }}>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {t("time_zone")}
                </Text>
                <Text allowFontScaling={false} style={styles.itemText}>
                  {item?.birthdata?.timezone}
                </Text>
              </View>

            </View>



          )
        })} />
      )}





      <ScrollView showsVerticalScrollIndicator={false}>


      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  kpPlanetCupsData: state.kundli.kpPlanetCupsData,
  isLoading: state.setting.isLoading,
  kpBirthDetails: state.kundli.kpBirthDetails,
  basicDetails: state.kundli.basicDetails,
})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(KpBirthDetails);

const styles = StyleSheet.create({
  itmeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SCREEN_HEIGHT * 0.023,
    paddingHorizontal: SCREEN_WIDTH * 0.025,


  },
  itemText: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7)
  },
  itemText2: {
    flex: 0.26,
    fontSize: getFontSize(1.6),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'left',
    fontWeight: 'bold',
    width: 60,


  },
  itemText1: {
    flex: 0.24,
    fontSize: getFontSize(1.3),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
  itemText3: {
    flex: 0.15,
    fontSize: getFontSize(1.6),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dropdownContent: {
    backgroundColor: '#F8E8D9',

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'gray',
  },
  textCenter: {
    textAlign: 'center',
    color: 'black'
  },
  Hedertxt: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.7),

  }
});