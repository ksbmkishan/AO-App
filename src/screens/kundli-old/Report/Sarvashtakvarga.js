import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { Fonts } from '../../../assets/style';

const Sarvashtakvarga = ({ report }) => {
  // Extract relevant data from the report
  const { house, jupiter, lagn, mars, mercury, moon, planet, saturn, sun, total, venus } = report && report[1]?.sarvashtakvarga || {};

  // Combine data for easier rendering
  const planetData = [
    { name: "Jupiter", data: jupiter },
    { name: "Lagn", data: lagn },
    { name: "Mars", data: mars },
    { name: "Mercury", data: mercury },
    { name: "Moon", data: moon },
    { name: "Saturn", data: saturn },
    { name: "Sun", data: sun },
    { name: "Venus", data: venus },
    { name: "Total", data: total }
  ];



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sarvashtakvarga</Text>

      <View style={styles.table}>


        {/* Table Data */}
        {house && house.map((houseName, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{houseName}</Text>
            {planetData.map((planet, planetIndex) => (
              <Text key={planetIndex} style={styles.tableCell}>{planet.data[index]}</Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const mapStateToProps = state => ({
  report: state.kundli.report
});

export default connect(mapStateToProps)(Sarvashtakvarga)

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    ...Fonts.PoppinsSemiBold,
    textAlign: 'center'
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
    ...Fonts.PoppinsRegular
  }
});
