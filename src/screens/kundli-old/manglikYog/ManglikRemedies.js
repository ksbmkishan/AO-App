import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const ManglikRemedies = ({ basicDetails, dispatch, ManglikRemedies }) => {
  const [formattedData, setFormattedData] = useState([])

  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat,
      lon: basicDetails?.lon
    }
    dispatch(KundliActions.getMangliKremedies(payload))
  }, [dispatch])

  useEffect(() => {
    if (ManglikRemedies) {
      const sections = []

      Object.entries(ManglikRemedies?.data || {}).forEach(([key, value]) => {
        if (typeof value === 'object') {
          let contentList = []

          Object.entries(value).forEach(([subKey, subVal]) => {
            if (subKey !== 'heading') {
              contentList.push(subVal)
            }
          })

          sections.push({
            heading: value.heading || key,
            content: contentList
          })
        } else if (key === 'male' || key === 'female') {
          sections.push({
            heading: key === 'male' ? 'For Male' : 'For Female',
            content: [value[key]]
          })
        }
      })

      setFormattedData(sections)
    }
  }, [ManglikRemedies])

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.heading}>{item.heading}</Text>
      {item.content.map((point, index) => (
        <Text key={index} style={styles.contentText}>• {point}</Text>
      ))}
    </View>
  )

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: '#F8E8D9', padding: SCREEN_HEIGHT * 0.015 }}>
      <FlatList
        data={formattedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </ScrollView>
  )
}

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  ManglikRemedies: state.kundli.ManglikRemedies,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ManglikRemedies);

const styles = StyleSheet.create({
  heading: {
    ...Fonts.black15RobotoMedium,
    fontSize: responsiveFontSize(2),
    marginBottom: 8,
    color: '#5A2D22'
  },
  contentText: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.6),
    textAlign: "justify",
    marginBottom: 5
  },
  card: {
    backgroundColor: '#FFF5EC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    paddingBottom:SCREEN_HEIGHT*0.03,
    borderWidth:1
  }
})
