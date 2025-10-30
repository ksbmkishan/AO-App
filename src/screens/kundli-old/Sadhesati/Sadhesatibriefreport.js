import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const Sadhesatibriefreport = ({ basicDetails, dispatch, SadhesatiBrief }) => {
 
  useEffect(() => {
    const payload = {

      lat: basicDetails?.lat,
      lon: basicDetails?.lon

    }
    console.log(payload, 'payload')
    dispatch(KundliActions.getSadhesatiBriefreportData(payload))
  }, [dispatch])
  return (
    <View style={{flex:1,paddingVertical:SCREEN_HEIGHT*0.05}}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Sadesati Brief Report</Text>
      </View>


      {SadhesatiBrief && (
        <View style={styles.content}>
          <Text style={styles.title}>{SadhesatiBrief.title}</Text>

          <Text style={styles.subtitle}>Present:</Text>
          <Text style={styles.text}>{SadhesatiBrief?.data?.present}</Text>

          <Text style={styles.subtitle}>Reason:</Text>
          <Text style={styles.text}>{SadhesatiBrief?.data?.reason}</Text>

          <Text style={styles.subtitle}>Note:</Text>
          <Text style={styles.text}>{SadhesatiBrief?.data?.note || "NA"}</Text>
        </View>
      )}
    </View>
  )
}



const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  SadhesatiBrief: state.kundli.SadhesatiBrief,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Sadhesatibriefreport);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#AB0001',
  },
  headerText: {
    ...Fonts.PoppinsMedium,
    color: 'white',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
   ...Fonts.black11InterMedium,
    marginBottom: 10,
    fontSize: responsiveFontSize(1.5),
  },
});