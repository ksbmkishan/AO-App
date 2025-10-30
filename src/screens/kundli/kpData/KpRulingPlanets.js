import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../config/Constants1';
import TranslateText from '../../language/TranslateText';
import MyLoader from '../../../components/MyLoader'; // ✅ Loader
import { FontsStyle } from '../../../config/constants';

const KpRulingPlanets = ({ basicDetails, dispatch, RulingData, isLoading }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getRulingPlanets(payload));
    dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }));
  }, [dispatch]);

  if (isLoading || !RulingData) return <MyLoader />; // ✅ Show loader while data loads

  return (
    <View style={styles.container}>
      {[
        { label: t('Ascendant Nakshatra Lord'), value: RulingData?.ascendant_nakshatra_lord },
        { label: t('Ascendant Sign Lord'), value: RulingData?.ascendant_sign_lord },
        { label: t('Moon Nakshatra Lord'), value: RulingData?.moon_nakshatra_lord },
        { label: t('Moon Sign Lord'), value: RulingData?.moon_sign_lord },
        { label: t('Day Lord'), value: RulingData?.day_lord },
        { label: t('Ascendant Sub Lord'), value: RulingData?.moon_sub_lord },
        { label: t('Moon Sub Lord'), value: RulingData?.ascendant_sub_lord },
      ].map((item, index) => (
        <View key={index} style={styles.rowContainer}>
          <Text style={styles.textStyle}>{item.label}</Text>
          <Text style={styles.textStyle}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  RulingData: state.kundli.RulingData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KpRulingPlanets);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.03,
    paddingBottom: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    borderWidth: 0.5,
    borderRadius: 10,
    gap: SCREEN_HEIGHT * 0.015,
    marginHorizontal: SCREEN_WIDTH * 0.02,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  textStyle: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7),
  },
});
