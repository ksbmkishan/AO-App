import React, { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import RenderHTML from 'react-native-render-html';

const SadesatiRemediesReport = ({ basicDetails, dispatch, SadhesatiRemedies }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat,
      lon: basicDetails?.lon,
    };
    dispatch(KundliActions.getSadhesatiRemedies(payload));
  }, [dispatch]);

 
  const remediesList = Object.keys(SadhesatiRemedies?.data || {})
    .filter(key => !isNaN(key)) 
    .map(key => SadhesatiRemedies.data[key])
    .filter(item => item && item.trim().length > 0); 

  return (
    <ScrollView style={{ flex: 1, paddingVertical: SCREEN_HEIGHT * 0.03 }}>
    

      <View style={styles.content}>
        <Text style={styles.title}>Remedies for Sade Sati</Text>

        <FlatList
          data={remediesList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          // renderItem={({ item }) => (
          //   <View style={styles.itemContainer}>
          //     <Text style={styles.text}>{`\u2022 ${item.replace(/&bull;/g, '').trim()}`}</Text>
          //   </View>
          // )}
          renderItem={({ item }) => {
            const htmlContent = item.replace(/&bull;/g, "&#8226;"); // Convert &bull; to bullet character
    
            return (
              <View style={styles.itemContainer}>
                <RenderHTML 
                  contentWidth={SCREEN_WIDTH} 
                 baseStyle={{color:'black'}}
                  source={{ html: `<p>${htmlContent.trim()}</p>` }} 
                />
              </View>
            );
          }}
        />
      </View>
      <View style={{paddingVertical:SCREEN_HEIGHT*0.05}}>
     
           </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  basicDetails: state.kundli.basicDetails,
  SadhesatiRemedies: state.kundli.SadhesatiRemedies,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SadesatiRemediesReport);

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#AB0001',
    marginBottom: 20,
  },
  headerText: {
    ...Fonts.PoppinsMedium,
    color: 'white',
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginBottom: 15,
  },
  itemContainer: {
    marginBottom: 10,
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    ...Fonts.black11InterMedium,
    color: '#333',
    lineHeight: 22,
  },
});
