import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { t } from 'i18next';
import { colors } from '../../config/Constants1';
import { FontsStyle, normalize } from '../../config/constants';

const Mantra = ({ basicDetails, dispatch, mantradata, Mynum2 }) => {
  const { i18n } = useTranslation();

  console.log("Mynum2",Mynum2?.numerlogy?.details?.favourableMantra)

  useEffect(() => {
    dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      KundliActions.getMyNumerology({
        lang: t('lang'),
        gender: basicDetails?.gender,
        name: basicDetails?.name,
        place: basicDetails?.place,
      })
    );
  }, [dispatch]);

  const isLoadingData = !Mynum2?.numerlogy?.details;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8E8D9' }}>
      {isLoadingData ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.themeColor || 'red'} />
        </View>
      ) : (
        <View style={styles.contentWrapper}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}> {t("Mantra for You")}</Text>

            <Text style={styles.mantraText}>
              {Mynum2?.numerlogy?.details?.favourableMantra}
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>{t("Jap Number")}:</Text>
              <Text style={styles.value}>
                {Mynum2?.numerlogy?.details?.japnumber}
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.04 }}></View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  mantradata: state.kundli.mantradata,
  isLoading: state.setting.isLoading,
  Mynum2: state.kundli.Mynum2,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Mantra);

const styles = StyleSheet.create({
  loaderContainer: {
    paddingTop: SCREEN_HEIGHT * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.03,
    paddingHorizontal: 20,
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
     ...FontsStyle.fontBold,
    fontSize: normalize(16),
    color: colors.black_color9,
    marginBottom: 15,
  },
  mantraText: {
     ...FontsStyle.font,
    fontSize: normalize(15),
    textAlign: 'center',
    marginBottom: 15,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
     ...FontsStyle.fontBold,
    fontSize: normalize(16),
    color: colors.black_color9,
  },
  value: {
     ...FontsStyle.fontfamily,
    fontSize: normalize(15),
    color: colors.primaryText || '#111',
  },
});
