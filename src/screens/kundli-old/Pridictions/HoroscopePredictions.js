import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const HoroscopePredictions = ({ basicDetails, dispatch, HoroscopePridiction }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState('aries');

  const planets = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', "capricorn", "aquarius", "pisces"];


  useEffect(() => {
    if (basicDetails?.lat && basicDetails?.lon && selectedPlanet) {
      const payload = {
        lat: basicDetails.lat,
        lon: basicDetails.lon,
        planet_name: selectedPlanet
      };
      dispatch(KundliActions.getHoroscopepridiction(payload));
    }
  }, [basicDetails?.lat, basicDetails?.lon, selectedPlanet, dispatch]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
    setDropdownVisible(false);
    // ✅ selectedPlanet ke change pe useEffect chalega, yahan se dobara dispatch ki zarurat nahi
  }

  return (
    <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
      <TouchableOpacity
        style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
        onPress={toggleDropdown}
      >
        <Text style={{
          ...Fonts.black11InterMedium,
          fontSize: responsiveFontSize(1.6),
          textAlign: "justify"
        }}>
          {selectedPlanet}
        </Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {planets.map((planet, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePlanetSelect(planet)}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownText}>{planet}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02 }}>
        <Text style={styles.title}>Career Horoscope</Text>
        <Text style={styles.content}>
          {HoroscopePridiction?.data?.data?.careerhoroscope || "Loading..."}
        </Text>

        <Text style={styles.title}>Health Horoscope</Text>
        <Text style={styles.content}>
          {HoroscopePridiction?.data?.data?.healthhoroscope || "Loading..."}
        </Text>

        <Text style={styles.title}>Love Horoscope</Text>
        <Text style={styles.content}>
          {HoroscopePridiction?.data?.data?.lovehoroscope || "Loading..."}
        </Text>

        <Text style={styles.title}>Overall Horoscope</Text>
        <Text style={styles.content}>
          {HoroscopePridiction?.data?.data?.overallhoroscope || "Loading..."}
        </Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  HoroscopePridiction: state.kundli.HoroscopePridiction,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HoroscopePredictions);

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 5
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  dropdownText: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.5)
  },
  title: {
    ...Fonts.PoppinsBold,
    fontSize: responsiveFontSize(2),
    textAlign: "justify",
    marginTop: 10,
  },
  content: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(2),
    textAlign: "justify",
    alignSelf: "center"
  }
});
