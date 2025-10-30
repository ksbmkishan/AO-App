import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { colors } from '../../../config/Constants1'
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import moment from 'moment'
import TranslateText from '../../language/TranslateText'
import MyLoader from '../../../components/MyLoader'; // ✅ Import the loader
import { FontsStyle } from '../../../config/constants'

const KpCuspsDetailes = ({ basicDetails, dispatch, MyCuspsData, isLoading }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const payload1 = {
      lang: t('lang'),
    }
    dispatch(KundliActions.getKundliBirthDetails(payload1))

    const payload2 = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place
    }
    dispatch(KundliActions.getKpCuspsData(payload2))
  }, [dispatch])

  const renderItem = ({ item, index }) => {
    const isDropdownVisible = dropdownIndex === index;

    return (
      <View style={{ marginVertical: SCREEN_HEIGHT * 0.01 }}>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { backgroundColor: isDropdownVisible ? "white" : colors.mybackground }
          ]}
          onPress={() => setDropdownIndex(isDropdownVisible ? null : index)}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={[styles.Hedertxt, { color: 'red' }]}>
              {`House ${item?.house}`}
            </Text>
            <Text style={styles.Hedertxt}>{item?.degree}</Text>
            <Text style={[styles.Hedertxt, { color: 'purple' }]}>
              {item?.rashi}
            </Text>
          </View>
          <View>
            <Text style={{ color: "black" }}>{isDropdownVisible ? "▲" : "▼"}</Text>
          </View>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdownContainer}>
            <View style={styles.row}>
              <View style={styles.centeredCell}>
                <Text style={styles.greenLabel}>{t("SL")}</Text>
                <Text style={styles.value}>{item?.signLord}</Text>
              </View>
              <View style={styles.centeredCell}>
                <Text style={styles.greenLabel}>{t("NL")}</Text>
                <Text style={styles.value}>{item?.nakshatraLord}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.centeredCell}>
                <Text style={styles.greenLabel}>{t("SB")}</Text>
                <Text style={styles.value}>{item?.subLord}</Text>
              </View>
              <View style={styles.centeredCell}>
                <Text style={styles.greenLabel}>{t("SS")}</Text>
                <Text style={styles.value}>{item?.subSubLord}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: SCREEN_HEIGHT * 0.02 }}>
      {isLoading || !MyCuspsData?.length ? (
        <MyLoader /> // ✅ Show loader while loading or empty
      ) : (
        <FlatList
          data={MyCuspsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  MyCuspsData: state.kundli.MyCuspsData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(KpCuspsDetailes);

const styles = StyleSheet.create({
  Hedertxt: {
   ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7),
  },
  headerButton: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: SCREEN_WIDTH * 0.03,
  paddingVertical: SCREEN_HEIGHT * 0.023,
  borderRadius: 10,
  backgroundColor: colors.mybackground,

  // ✅ Android Shadow
  elevation: 1,

  // ✅ iOS Shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
  dropdownContainer: {
    elevation: 1,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 1
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.015,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  centeredCell: {
    alignItems: "center"
  },
  greenLabel: {
    ...FontsStyle.fontfamily,
    color: "#026135"
  },
  value: {
    ...FontsStyle.font,
  }
});
