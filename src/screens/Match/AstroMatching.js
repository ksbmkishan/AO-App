import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { colors } from '../../config/Constants1';
import { FontsStyle, normalize } from '../../config/constants';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';

const AstroMatching = ({ dispatch, NewAstromatching }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const payload = {
      lang: t("lang")
    }
    dispatch(KundliActions.getNewAstromatching(payload));
  }, []);

  const labels = [
    'ascendant1', 'sign', 'sign_lord', 'nakshatra', 'nakshatra_lord',
    'charan', 'karan', 'yog', 'Varna', 'Vashya',
    'Yoni', 'Gana', 'Paya', 'Nadi', 'Yunja',
    'Tatva', 'Name Alphabet(English)', 'Name Alphabet(Hindi)'
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
      horizontal={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { textAlign: 'center' }]}>{t("boy")}</Text>
        <Text style={[styles.headerText, { textAlign: 'center', flex: 1 }]}>{t("Birth Details")}</Text>
        <Text style={[styles.headerText, { textAlign: 'center' }]}>{t("girl")}</Text>
      </View>

      {/* Data Rows */}
      {labels.map((label, idx) => (
        <View key={idx} style={styles.dataRow}>
          {/* Boy Data */}
          <Text style={[styles.dataText, { textAlign: 'right' }]}>
            {getNestedValue(NewAstromatching?.boyAstroData, convertKey(label))}
          </Text>

          {/* Label */}
          <Text style={[styles.labelText]}>
            {t(label)}
          </Text>

          {/* Girl Data */}
          <Text style={[styles.dataText, { textAlign: 'left' }]}>
            {getNestedValue(NewAstromatching?.girlAstroData, convertKey(label))}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

// ✅ Helper to map API keys properly
const convertKey = (label) => {
  const map = {
    ascendant1: 'ascendant',
    sign_lord: 'signLord',
    nakshatra: 'naksahtra',
    nakshatra_lord: 'nakshatraLord',
    karan: 'karan.name',
    yog: 'yog.name',
    Varna: 'varna',
    Vashya: 'vashya',
    Yoni: 'yoni',
    Gana: 'gana',
    Paya: 'paya',
    Nadi: 'nadi',
    Yunja: 'yunja',
    Tatva: 'tatva',
    'Name Alphabet(English)': 'nameAlphabetEnglish',
    'Name Alphabet(Hindi)': 'nameAlphabetHindi'
  };
  return map[label] || label;
};

// ✅ Safe nested value fetch
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || '-';
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  NewAstromatching: state.kundli.NewAstromatching,
});

export default connect(mapStateToProps)(AstroMatching);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.background_theme2,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  headerText: {
    ...FontsStyle.fontfamily,
    fontSize: normalize(15),
    color: "white",
    width: SCREEN_WIDTH * 0.25
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: SCREEN_HEIGHT * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
  dataText: {
    ...FontsStyle.font,
    fontSize: normalize(13),
    color: "#333",
    width: SCREEN_WIDTH * 0.25,
  },
  labelText: {
    ...FontsStyle.font,
    fontSize: normalize(13),
    color: "#53cb8b",
    flex: 1,
    textAlign: "center"
  },
});
