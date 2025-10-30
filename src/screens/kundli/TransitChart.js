import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import KpBirthSvg from './components/KpBirthSvg';
import { Fonts } from '../../assets/style';
import TransitSvgchart from './components/TransitSvgchart';
import { colors } from '../../config/Constants1';
import moment from 'moment';
import TranslateText from '../language/TranslateText';
import { FontsStyle } from '../../config/constants';
// import FastImage from 'react-native-fast-image';


const TransitChart = ({ basicDetails, dispatch, TransitChart }) => {
  console.log("lllmnmmm", TransitChart?.transitData?.transitLagnaChart)

  const { t } = useTranslation();


  useEffect(() => {
    const payload = {
      lang: t('lang'),


    }
    dispatch(KundliActions.getKundliBirthDetails(payload))
  }, [dispatch])

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place

    }
    console.log("Mahadev", payload)
    dispatch(KundliActions.getTransitChartData(payload))
  }, [dispatch])

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? ("0" + hours).slice(-2) : 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };



  return (
    <View style={{ flex: 1, backgroundColor: '#F8E8D9', alignItems: 'center' }}>
      {TransitChart?.transitData && Object.keys(TransitChart?.transitData).length > 0 ? (
        <View style={{ paddingTop: SCREEN_HEIGHT * 0.01, width: '100%' }}>
          <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "white" }}>
            <TransitSvgchart data={TransitChart?.transitData} />
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: SCREEN_WIDTH * 0.02
            }}>
              <Text style={{ ...FontsStyle.font, fontSize: responsiveFontSize(1.8) }}>
                <TranslateText title={'* Retrograde'} />
              </Text>
              <Text style={{ ...FontsStyle.font, fontSize: responsiveFontSize(1.8) }}>
                <TranslateText title={' ~ Combust '} />
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ paddingTop: SCREEN_HEIGHT * 0.25 }}>
          <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3 }}>
            {/* <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('../../assets/gifs/transparentmaamla.gif')}
              resizeMode={FastImage.resizeMode.stretch}
            /> */}
          </View>
        </View>
      )}
    </View>
  )
}




const mapStateToProps = state => ({

  isLoading: state.setting.isLoading,

  basicDetails: state.kundli.basicDetails,
  kpBirthChart: state.kundli.kpBirthChart,
  TransitChart: state.kundli.TransitChart,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(TransitChart);


const styles = StyleSheet.create({
  Hedertxt: {
   ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7),

  }
})