import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
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
import { Fonts, Sizes } from '../../assets/style';

const KundliBirthDetailes = ({ navigation, basicDetails, birthDetailsData, dispatch }) => {
  console.log("birthDetailsData,", birthDetailsData)
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const payload = {
  //     lang: t('lang'),

  //   }
  //   dispatch(KundliActions.getKundliBirthDetails(payload))
  // }, [dispatch])



  useEffect(() => {
    const payload = {

      lat: basicDetails?.lat,
      lon: basicDetails?.lon

    }
    dispatch(KundliActions.getKundliBirthDetails(payload))
  }, [dispatch])
  console.log(birthDetailsData, 'birthd')



  return (
    <View style={{ flex: 1, gap: Sizes.fixPadding }}>


      <MyLoader isVisible={isLoading} />

      <View style={{ paddingVertical: 8, paddingHorizontal: 2, backgroundColor: '#AB0001' }}>
        <Text style={{ ...Fonts.PoppinsSemiBold, color: 'white' }}>Basic Details</Text>

      </View>

      <View style={{ paddingHorizontal: 10, gap: Sizes.fixPadding }}>

        <View style={{ ...styles.itmeContainer, }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: '#AB0001' }]}>{t("name")}</Text>

          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.name}
          </Text>

        </View>

        <View
          style={{
            ...styles.itmeContainer,
          }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: '#AB0001' }]}>
            {t("date")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText }}>
            {moment(basicDetails?.dob).format('DD MMM YYYY')}
          </Text>
        </View>

        <View style={{ ...styles.itmeContainer }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: '#AB0001' }]}>
            {t("time")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {moment(basicDetails?.tob).format('hh:mm A')}
          </Text>
        </View>

        <View
          style={{
            ...styles.itmeContainer,

          }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: '#AB0001' }]}>
            {t("place")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText }}>
            {basicDetails?.place
              ? basicDetails.place.split(' ').slice(0, 5).join(' ')
              : null
            }
          </Text>
        </View>

        <View style={{ ...styles.itmeContainer, }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: '#AB0001' }]}>
            {t("lat")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.lat}
          </Text>
        </View>

        <View
          style={{
            ...styles.itmeContainer,

          }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: 'blue' }]}>
            {t("long")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText }}>
            {basicDetails?.lon}
          </Text>
        </View>

        <View style={{ ...styles.itmeContainer, }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: 'green' }]}>
            {t("time_zone")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>GMT+05:30</Text>
        </View>

      </View>

    </View>
  );
};

const mapStateToProps = state => ({
  basicDetails: state.kundli.basicDetails,
  birthDetailsData: state.kundli.birthDetailsData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(KundliBirthDetailes);

const styles = StyleSheet.create({
  itmeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itmeContainer1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,

  },
  itemText: {
    ...Fonts.PoppinsMedium,
  },
});
