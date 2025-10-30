import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { Fonts } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from 'moment';
import TranslateText from '../language/TranslateText';
import MyLoader from '../../components/MyLoader'; // ✅ Step 1
import { FontsStyle } from '../../config/constants';

const ShowKundliKpHouseCusp = ({ navigation, kpHouseCupsData, dispatch, basicDetails, isLoading }) => {
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }));
    dispatch(KundliActions.getKpHouseCupsData({ lang: t('lang') }));
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8E8D9", gap: 20, paddingTop: SCREEN_HEIGHT * 0.03 }}>
      {isLoading || !kpHouseCupsData ? (
        <MyLoader /> // ✅ Step 2: Show loader
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: colors.background_theme2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: SCREEN_HEIGHT * 0.03,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: SCREEN_WIDTH * 0.05
            }}
          >
            <Text style={{ color: colors.white_color, fontWeight: "500" ,...FontsStyle.fontfamily}}>{t('House')}</Text>
            <Text style={{ color: colors.white_color, fontWeight: "500", right: 10 ,...FontsStyle.fontfamily}}>I</Text>
            <Text style={{ color: colors.white_color, fontWeight: "500",...FontsStyle.fontfamily }}>II</Text>
            <Text style={{ color: colors.white_color, fontWeight: "500", ...FontsStyle.fontfamily }}>III</Text>
            <Text style={{ color: colors.white_color, fontWeight: "500", ...FontsStyle.fontfamily }}>IV</Text>
          </View>

          <View
            style={{
              flex: 0,
              width: '100%',
              alignSelf: 'center',
              backgroundColor: "#F8E8D9",
              borderBottomWidth: 0.5,
              borderLeftWidth: 0.5,
              borderRightWidth: 0.5,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              shadowColor: colors.black_color5,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}
          >
            {kpHouseCupsData.map((item, index) => (
              <View key={index}>
                <View style={styles.itmeContainer}>
                  <Text style={styles.itemText}>
                    {item?.house}
                  </Text>
                  {item?.significators.map((significatorSet, sIndex) => (
                    <FlatList
                      key={sIndex}
                      data={significatorSet}
                      renderItem={({ item }) => (
                        <Text style={styles.itemText}>{item}</Text>
                      )}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  kpHouseCupsData: state.kundli.kpHouseCupsData,
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliKpHouseCusp);

const styles = StyleSheet.create({
  itmeContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.025,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  itemText: {
    textAlign: "center",
    color: colors.black_color9,
    fontSize: responsiveFontSize(1.6),
    fontWeight: "500",
    ...FontsStyle.fontfamily
  },
  Hedertxt: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7),
  }
});
