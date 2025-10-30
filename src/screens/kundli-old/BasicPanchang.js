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
import { SCREEN_WIDTH } from '../../config/Screen';

const BasicPanchang = ({ navigation, basicDetails, birthDetailsData, dispatch, Panchang }) => {
  console.log(birthDetailsData)
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('adfaf')
    dispatch(KundliActions.getbasicpanchange())
  }, []);


  return (
    <View style={{ flex: 1, }}>
      <MyLoader isVisible={isLoading} />
      <View style={{ paddingVertical: 8, paddingHorizontal: 2, backgroundColor: '#AB0001' }}>
        <Text style={{ ...Fonts.PoppinsSemiBold, color: 'white' }}>Panchang Details</Text>


      </View>

      <View
        style={{
          flex: 1,
          gap: 10,
          paddingHorizontal: 10

        }}>

        <View style={{ ...styles.itmeContainer, }}>

          <Text allowFontScaling={false} style={[styles.itemText, { color: '#AB0001' }]}>
            {t("karan")}
          </Text>

          <Text allowFontScaling={false} style={[styles.itemText, { color: 'black' }]}>{Panchang?.Panchang?.panchang?.karanname}</Text>
        </View>

        <View
          style={{
            ...styles.itmeContainer,

          }}>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: '#AB0001' }}>
            {t("nakshatra")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText }}>
            {Panchang?.Panchang?.panchang?.nakshatraname}
          </Text>
        </View>



        <View style={{ ...styles.itmeContainer, }}>
          <Text allowFontScaling={false} style={[styles.itemText, { color: '#AB0001' }]}>
            {t("tithi")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>{Panchang?.Panchang?.panchang?.tithiname}</Text>
        </View>


        <View
          style={{
            ...styles.itmeContainer,

          }}>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: 'blue' }}>
            {t("yog")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText }}>
            {Panchang?.Panchang?.panchang?.yogname}
          </Text>
        </View>




      </View>


    </View>
  );
};

const mapStateToProps = state => ({
  basicDetails: state.kundli.basicDetails,
  birthDetailsData: state.kundli.birthDetailsData,
  Panchang: state.kundli.Panchang
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BasicPanchang);

const styles = StyleSheet.create({
  itmeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  itemText: {
    ...Fonts.PoppinsMedium
  },
});
