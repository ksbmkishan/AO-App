import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

const NumerlogyChoChart = ({ basicDetails, dispatch, NumChart }) => {
  console.log("NumChart", NumChart)
  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat,
      lon: basicDetails?.lon
    }
    dispatch(KundliActions.getNumerologyChart(payload))
  }, [dispatch])

  const renderItem = ({ item }) => (
    <Text style={styles.item}>{item}</Text>
  )

  const planesData = Object.values(NumChart?.planes || {}).map(
    (plane) => `${plane.plane_name}: ${plane.plane_power_percentage_text}`
  )

  const arrowsStrengthData = Object.values(NumChart?.arrows_strength || {})
    .filter((arrow) => arrow.power > 0)
    .map((arrow) => arrow.represents)

  const arrowsWeaknessData = Object.values(NumChart?.arrows_weakness || {})
    .filter((arrow) => arrow.power > 0)
    .map((arrow) => arrow.represents)

  const arrowsMinorData = Object.values(NumChart?.arrows_minor || {}).map(
    (arrow) => arrow.represents
  )

  return (
    <ScrollView style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
      <Text style={styles.heading}>Numerology Chart for {NumChart?.fullname}</Text>

      <View style={styles.section}>
         <Text style={styles.title}>DOB : {NumChart?.dob}</Text>
        <Text style={styles.title}>Destiny Number: {NumChart?.destinynumber}</Text>
        <Text style={styles.title}>Life Path Number: {NumChart?.lifepathnumber}</Text>
        <Text style={styles.title}>Personal Year: {NumChart?.personalyearnumber}</Text>
        <Text style={styles.title}>Personal Month: {NumChart?.personalmonthnumber}</Text>
        <Text style={styles.title}>Personal Day: {NumChart?.personaldaynumber}</Text>
        <Text style={styles.title}>Missing Numbers: {NumChart?.missingnumbers}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Planes Strength:</Text>
        <FlatList
          data={planesData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `plane-${index}`}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Arrows of Strength:</Text>
        <FlatList
          data={arrowsStrengthData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `strength-${index}`}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Arrows of Weakness:</Text>
        <FlatList
          data={arrowsWeaknessData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `weakness-${index}`}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Arrows Minor:</Text>
        <FlatList
          data={arrowsMinorData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `minor-${index}`}
        />
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  NumChart: state.kundli.NumChart,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerlogyChoChart);

const styles = StyleSheet.create({
  heading: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(2.2),
    marginBottom: SCREEN_HEIGHT * 0.02,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: SCREEN_HEIGHT * 0.025,
  },
  title: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.8),
    marginVertical: 2,
  },
  subheading: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    marginBottom: 5,
    color:"black"
  },
  item: {
    fontSize: responsiveFontSize(1.6),
    marginLeft: 10,
    color:"black",
    paddingVertical: 2,
  },
})
