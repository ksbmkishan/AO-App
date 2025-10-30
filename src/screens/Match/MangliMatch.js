import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import MyHeader from '../../components/MyHeader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts } from '../../assets/style';

const MangliMatch = ({ dispatch, navigation, matchmanglik, isLoading, MatchBasicDetails }) => {


  useEffect(() => {
    dispatch(KundliActions.getmatchmanglik());
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
    <View >
      <MyHeader title={'Manglik Dosha'} navigation={navigation} />
        {matchmanglik ? (
          <View style={{alignItems:'center',marginVertical:20}}>
            <View style={[styles.card, { backgroundColor: '#F7F6FE' }]}>
              <Text style={styles.header}>Female</Text>
              <Text style={[styles.text,{fontWeight:'bold'}]}>Reason: 
                <Text style={styles.text}> {matchmanglik?.girl?.mangalDosha?.reason}</Text></Text>
              <Text style={[styles.text,{fontWeight:'bold'}]}>Info:
                 <Text style={styles.text}> {matchmanglik?.girl?.mangalDosha?.info}</Text>
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: 'white' }]}>
              <Text style={styles.header}>Male</Text>
              <Text style={[styles.text,{fontWeight:'bold'}]}>Reason: 
                <Text style={styles.text}> {matchmanglik?.girl?.mangalDosha?.reason}</Text>
                </Text>
              <Text style={[styles.text,{fontWeight:'bold'}]}>Info: 
                <Text style={styles.text}> {matchmanglik?.girl?.mangalDosha?.info}</Text>
                </Text>
            </View>

            
          </View>
        ) :
          <View style={{
            alignSelf: 'center',
            marginVertical: 40
          }}>
            <Text style={{ color: 'black' }}>Coming Soon..</Text>
          </View>
        }
     
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
    flex: 1,
   
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
