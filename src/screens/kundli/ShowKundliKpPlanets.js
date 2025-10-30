import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { api_url, colors, fonts, get_KpHoroscope, get_Kpplanets, getFontSize } from '../../config/Constants1';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Fonts } from '../../assets/style';
import moment from 'moment'
import TranslateText from '../language/TranslateText';
import { FontsStyle } from '../../config/constants';

const ShowKundliKpPlanets = ({ navigation, kpPlanetData, dispatch, basicDetails }) => {
  console.log("kpPlanetData", kpPlanetData)
  const { t } = useTranslation();
  const [dropdownVisibility, setDropdownVisibility] = useState({});

  const [dropdownIndex, setDropdownIndex] = useState(null);

  useEffect(() => {
    const payload = {
      lang: t('lang')
    }
    dispatch(KundliActions.getKpPlanetData(payload))
  }, [dispatch])

  const toggleDropdown = (item) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [item]: !dropdownVisibility[item],
    });
  };

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place

    }
    console.log("Mahadev", payload)
    dispatch(KundliActions.getAstroData(payload))
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
            <Text style={[styles.Hedertxt, { color: 'red', }]}> {item?.name}</Text>
            <Text style={styles.Hedertxt}>{item?.degree}</Text>
            <Text style={[styles.Hedertxt, { color: 'purple', }]}> {item?.rashi}</Text>
          </View>
          <View>
            <Text style={{ color: "black" }}>{isDropdownVisible ? "▲" : "▼"}</Text>
          </View>
        </TouchableOpacity>

        

        {isDropdownVisible && (

          <View style={styles.dropdownContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SCREEN_WIDTH * 0.05,
                paddingVertical: SCREEN_HEIGHT * 0.02,
                borderBottomWidth: 1
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{...FontsStyle.font, color: "#026135" }}>
                  {t("SL")} 
                </Text>
                <Text style={{...FontsStyle.font }}>
                  {item?.signLord}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{...FontsStyle.font, color: "#026135" }}>
                  {t("NL")} 
                </Text>
                <Text style={{...FontsStyle.font }}>
                  {item?.nakshatraLord}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SCREEN_WIDTH * 0.05,
                paddingVertical: SCREEN_HEIGHT * 0.01
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{...FontsStyle.font, color: "#026135" }}>
                  {t("SB")}
                </Text>
                <Text style={{...FontsStyle.font }}>
                  {item?.subLord}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{...FontsStyle.font, color: "#026135" }}>
                  {t("SS")}
                </Text>
                <Text style={{...FontsStyle.font }}>
                  {item?.subSubLord}
                </Text>
              </View>
            </View>
          </View>


        )}


      </View>
    );
  };

  const calculateColor = (value) => {
    // Example: Assign colors based on a range (adjust as needed)
    if (value >= 0 && value <= 0) {
      return '#ffc8dd';
    } else if (value >= 1 && value <= 1) {
      return '#bde0fe';
    } else if (value >= 2 && value <= 2) {
      return '#d6ccc2';
    } else if (value >= 3 && value <= 3) {
      return '#fcf6bd';
    } else if (value >= 4 && value <= 4) {
      return '#c9ada7';
    } else if (value >= 5 && value <= 5) {
      return '#f6bd60';
    } else if (value >= 6 && value <= 6) {
      return '#f7c59f';
    } else if (value >= 7 && value <= 7) {
      return '#ccff33';
    } else if (value >= 8 && value <= 8) {
      return '#d3d3d3';
    } else if (value >= 9 && value <= 9) {
      return '#a8dadc';
    } else if (value >= 10 && value <= 10) {
      return '#ffb3c6';
    } else if (value >= 11 && value <= 11) {
      return '#f07167';
    } else {
      return '#f4e409';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8E8D9" }}>
      {/* <MyHeader title={'Kundli KP Planets'} navigation={navigation} /> */}


      {/* <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
        <Text style={styles.Hedertxt}>  {basicDetails?.name} /></Text>
        <Text style={styles.Hedertxt}>
          <TranslateText
            title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
          />
        </Text>

        <Text style={styles.Hedertxt}> {basicDetails?.place} /></Text>
      </View> */}


      <FlatList
        data={kpPlanetData}
        renderItem={renderItem}

      />
    </View>
  );
};

const mapStateToProps = state => ({
  kpPlanetData: state.kundli.kpPlanetData,
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliKpPlanets);

const styles = StyleSheet.create({
  itmeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 8,
    paddingLeft: 8,
    borderBottomWidth: 0.4,



  },
  itemText: {
    flex: 0.24,
    fontSize: getFontSize(1.4),
    color: colors.black_color8,
    ...FontsStyle.fontfamily,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemText11: {
    flex: 0.24,
    fontSize: getFontSize(1.2),
    color: colors.black_color8,
    ...FontsStyle.fontfamily,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemText2: {
    flex: 0.26,
    fontSize: getFontSize(1.6),
    color: colors.black_color8,
    ...FontsStyle.fontfamily,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemText1: {
    flex: 0.24,
    fontSize: getFontSize(1.3),
    color: colors.black_color8,
    ...FontsStyle.fontfamily,
    textAlign: 'center',
  },
  itemText3: {
    flex: 0.15,
    fontSize: getFontSize(1.4),
    color: colors.black_color8,
    ...FontsStyle.fontfamily,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dropdownContent: {
    backgroundColor: 'white',

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1, // Add a border to the bottom of each row
    borderColor: 'gray', // Set the border color
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1, // Add a border to the right of each cell
    borderColor: 'gray', // Set the border color
  },
  textCenter: {
    textAlign: 'center',
    color: 'black'
  },
  Hedertxt: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7),

  },
  headerButton: {
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.023,
    borderRadius: 10,
    backgroundColor: colors.mybackground

  },
  dropdownContainer: {
    elevation: 1,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 1
  },
});
