import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import MyHeader from '../../../components/MyHeader';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';

const MangliMatch = ({ dispatch, navigation, matchmanglik, isLoading, MatchBasicDetails }) => {


  console.log("matchmanglik", matchmanglik)

  const hour = MatchBasicDetails?.female_astro_details?.hour?.toString().padStart(2, '0');
  const minute = MatchBasicDetails?.female_astro_details?.minute?.toString().padStart(2, '0');
  const ft = `${hour}:${minute}`;
  const hourMale = MatchBasicDetails?.male_astro_details?.hour?.toString().padStart(2, '0');
  const minuteMale = MatchBasicDetails?.male_astro_details?.minute?.toString().padStart(2, '0');
  const mt = `${hourMale}:${minuteMale}`;

  useEffect(() => {
    const payload = {
      ft: ft,
      mt: mt
    }
    dispatch(KundliActions.getmatchmanglik(payload));
  }, [dispatch]);

  console.log('adsfasdf', matchmanglik)

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View>
      <MyHeader title={'Manglik Dosha'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>

        {matchmanglik && (
          <>
            <View style={[styles.card, { backgroundColor: '#F7F6FE' }]}>
              <Text style={styles.header}>Female</Text>
              <Text style={styles.text}>Degree: {matchmanglik.female.degree}</Text>
              <Text style={styles.text}>Manglik: {matchmanglik.female.manglik}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: 'white' }]}>
              <Text style={styles.header}>Male</Text>
              <Text style={styles.text}>Degree: {matchmanglik.male.degree}</Text>
              <Text style={styles.text}>Manglik: {matchmanglik.male.manglik}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.header}>Match</Text>
              <Text style={styles.text}>Recommendation: {matchmanglik.match.matchrecommended}</Text>
              <Text style={styles.text}>Note: {matchmanglik.match.note}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  matchmanglik: state.kundli.matchmanglik,
  isLoading: state.kundli.isLoading,
  MatchBasicDetails: state.kundli.MatchBasicDetails,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    backgroundColor: '#ecf0f1',
    marginTop: SCREEN_WIDTH * 0.08,
    backgroundColor: '#F8E8D9',
  },
  title: {
    ...Fonts.PoppinsSemiBold,
    marginBottom: 20,
    color: '#3498db',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  header: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 5,
    ...Fonts.PoppinsMedium,
    fontSize: 20
  },
  text: {
    ...Fonts.PoppinsRegular,
    marginVertical: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MangliMatch);
