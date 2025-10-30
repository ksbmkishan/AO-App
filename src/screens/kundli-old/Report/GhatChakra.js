import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Fonts } from '../../../assets/style'

const GhatChakra = ({ report }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.header}>Ghat Chakra</Text>

      {report && report[0]?.ghaatchakra && Object.entries(report[0]?.ghaatchakra).map(([key, value]) => (
        <View key={key} style={styles.itemContainer}>
          <Text style={styles.itemKey}>{key}:</Text>
          <Text style={styles.itemValue}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const mapStateToProps = state => ({
  report: state.kundli.report
});

export default connect(mapStateToProps)(GhatChakra)

const styles = StyleSheet.create({
  container: {
  },
  header: {
    ...Fonts.PoppinsMedium,
    textAlign: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20


  },
  itemKey: {
    ...Fonts.PoppinsRegular
  },
  itemValue: {
    ...Fonts.PoppinsRegular
  }
});
