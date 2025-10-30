import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../config/Constants1'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { SCREEN_WIDTH } from '../../config/Screen'
import { FontsStyle, normalize } from '../../config/constants'

const BasicMatch = ({ femaleKundliData, maleKundliData }) => {
  const { t } = useTranslation();

  const rows = [
    {
      left: femaleKundliData?.name,
      label: t("name"),
      right: maleKundliData?.name,
    },
    {
      left: formatDate(femaleKundliData?.dob),
      label: t("Date"),
      right: formatDate(maleKundliData?.dob),
    },
    {
      left: formatTime(femaleKundliData?.tob),
      label: t("time"),
      right: formatTime(maleKundliData?.tob),
    },
    {
      left: femaleKundliData?.place,
      label: t("place"),
      right: maleKundliData?.place,
    },
    {
      left: femaleKundliData?.lat,
      label: t("lat"),
      right: maleKundliData?.lat,
    },
    {
      left: femaleKundliData?.lon,
      label: t("long"),
      right: maleKundliData?.lon,
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        {rows.map((row, idx) => (
          <View
            key={idx}
            style={[
              styles.row,
              { borderBottomWidth:1, borderColor:'#ddd' },
            ]}
          >
            <Text style={[styles.valueText, { textAlign: "right" }]}>{row.left || "-"}</Text>
            <Text style={styles.labelText}>{row.label}</Text>
            <Text style={[styles.valueText, { textAlign: "left" }]}>{row.right || "-"}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// ✅ Helper functions
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
};

const formatTime = (time) => {
  if (!time) return "-";
  return new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};

const mapStateToProps = (state) => ({
  maleKundliData: state.kundli.maleKundliData,
  femaleKundliData: state.kundli.femaleKundliData,
});

export default connect(mapStateToProps)(BasicMatch);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white_color,
    padding: 10,
  },
  card: {
    backgroundColor: colors.background_theme1,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: colors.black_color5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    width: "95%",
    alignSelf: "center",
    borderWidth:0.5
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  labelText: {
    ...FontsStyle.fontfamily,
    fontWeight: "bold",
    fontSize: normalize(13),
    color: colors.green_color2,
    flex: 1,
    textAlign: "center",
  },
  valueText: {
    ...FontsStyle.fontfamily,
    fontSize: normalize(13),
    color: colors.black_color8,
    flex: 1,
  },
});
