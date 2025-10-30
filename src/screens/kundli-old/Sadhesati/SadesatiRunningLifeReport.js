import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const SadesatiRunningLifeReport = ({ basicDetails, dispatch, SadhesatiRunning }) => {
  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat,
      lon: basicDetails?.lon
    }
    dispatch(KundliActions.getSadhesatiRunning(payload))
  }, [dispatch]);

  const renderPhaseItem = ({ item }) => {
    const isGood = item.nature?.toLowerCase() === 'good';
    const natureColor = isGood ? '#4CAF50' : '#D32F2F'; // green for good, red for bad

    return (
      <View style={[styles.phaseContainer, { borderLeftColor: natureColor }]}>
        <Text style={[styles.nature, { color: natureColor }]}>
          Nature: {item.nature || 'N/A'}
        </Text>
        <Text style={styles.commentText}>
          {item.comments || 'No comments provided.'}
        </Text>
      </View>
    );
  };

  const processedData = (SadhesatiRunning?.data?.phase || []).map(item => ({
    nature: item.nature || 'N/A',
    comments: item.comments || 'No comments available.',
  }));

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, paddingVertical: SCREEN_HEIGHT * 0.05 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{SadhesatiRunning?.data?.heading || 'Sade Sati Periods'}</Text>
      </View>

      <FlatList
        data={processedData}
        renderItem={renderPhaseItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.content}
      />
      <View style={{paddingVertical:SCREEN_HEIGHT*0.05}}>

      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  SadhesatiRunning: state.kundli.SadhesatiRunning,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SadesatiRunningLifeReport);

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#AB0001',
    marginBottom:5
  },
  headerText: {
    ...Fonts.PoppinsMedium,
    color: 'white',
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 50,
  },
  phaseContainer: {
 
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderLeftWidth: 5,
    elevation: 2,
    margin:10
  },
  nature: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 6,
  },
  commentText: {
    fontSize: responsiveFontSize(1.8),
    color: '#444',
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
});
