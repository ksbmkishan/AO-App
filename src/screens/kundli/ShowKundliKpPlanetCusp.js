import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import * as KundliActions from '../../redux/actions/KundliActions';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from 'moment';
import TranslateText from '../language/TranslateText';
import MyLoader from '../../components/MyLoader'; // ✅ Step 1: Import Loader
import { FontsStyle, normalize } from '../../config/constants';

const ShowKundliKpPlanetCusp = ({ navigation, kpPlanetCupsData, dispatch, basicDetails, isLoading }) => {
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(KundliActions.getKpPlanetCupsData({ lang: t('lang') }));
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8E8D9", marginHorizontal: SCREEN_WIDTH * 0.02, paddingBottom: SCREEN_HEIGHT * 0.07 }}>
      {isLoading || !kpPlanetCupsData ? (
        <MyLoader /> // ✅ Step 2: Show loader while loading
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 10 }}>
          <View style={{ top: 10, bottom: 20 }}>
            <View
              style={{
                backgroundColor: colors.background_theme2,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: SCREEN_HEIGHT * 0.03,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: SCREEN_WIDTH * 0.05,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: "500", right: 5,...FontsStyle.fontfamily }}> {t('planet')}</Text>
              <Text style={{ color: colors.white_color, fontWeight: "500", right: 30,...FontsStyle.fontfamily }}>I</Text>
              <Text style={{ color: colors.white_color, fontWeight: "500", right: 20 ,...FontsStyle.fontfamily}}>II</Text>
              <Text style={{ color: colors.white_color, fontWeight: "500",right: 20,...FontsStyle.fontfamily }}>III</Text>
              <Text style={{ color: colors.white_color, fontWeight: "500", right: 15,...FontsStyle.fontfamily }}>IV</Text>
            </View>

            <View style={{
              flex: 0,
              width: '100%',
              alignSelf: 'center',
              backgroundColor: "#F8E8D9",
              borderBottomWidth: 0.5,
              borderLeftWidth: 0.5,
              borderRightWidth: 0.5,
              shadowColor: colors.black_color5,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              gap: 10,
            }}>
              {kpPlanetCupsData.map((item, index) => (
                <View key={index}>
                  <View style={styles.itmeContainer}>
                    <Text style={styles.itemText}>
                      {item?.planet}
                    </Text>
                    <Text style={styles.itemText}>{item?.significators[0]?.join(',')}</Text>
                    <Text style={styles.itemText}>{item?.significators[1]?.join(',')}</Text>
                    <Text style={styles.itemText}>{item?.significators[2]?.join(',')}</Text>
                    <Text style={styles.itemText}>{item?.significators[3]?.join(',')}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  kpPlanetCupsData: state.kundli.kpPlanetCupsData,
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliKpPlanetCusp);

const styles = StyleSheet.create({
  itmeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    alignItems: "center",
    paddingVertical: SCREEN_HEIGHT * 0.02,
    gap: SCREEN_WIDTH * 0.055,
    paddingHorizontal: 10,
  },
  itemText: {
   
    color: colors.black_color8,
    ...FontsStyle.font,
     fontSize: normalize(12),
    textAlignVertical: "center",
    fontWeight: "medium",
    width: normalize(55),
  },
  Hedertxt: {
    ...FontsStyle.font,
    fontSize: normalize(17),
  },
});
