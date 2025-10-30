import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import ChartSvg from '../charts/ChartSvg';
import moment from 'moment'
import TranslateText from '../../language/TranslateText';
import { colors } from '../../../config/Constants1';
import MyLoader from '../../../components/MyLoader'; // ✅ Step 1: Import loader
import { FontsStyle } from '../../../config/constants';

const KpcupsChart = ({ basicDetails, dispatch, kpcupschart, isLoading }) => {

  const { t } = useTranslation();

  useEffect(() => {
    const payload = {
      lang: t('lang'),
    };
    dispatch(KundliActions.getKundliBirthDetails(payload));
  }, [dispatch]);

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place
    };
    dispatch(KundliActions.getKpCupsData(payload));
  }, [dispatch]);

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
    <View style={{ flex: 1, paddingTop: SCREEN_HEIGHT * 0.02 }}>
      {isLoading || !kpcupschart?.chart ? (
        <MyLoader /> // ✅ Step 2: Show loader conditionally
      ) : (
        <ChartSvg data={kpcupschart} />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  kpcupschart: state.kundli.kpcupschart,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KpcupsChart);

const styles = StyleSheet.create({
  Hedertxt: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7),
  }
});
