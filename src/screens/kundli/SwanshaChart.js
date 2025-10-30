import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'


import { responsiveFontSize } from 'react-native-responsive-dimensions';
import KpCupsSvg from './components/KpCupsSvg';
import { SCREEN_HEIGHT ,SCREEN_WIDTH} from '../../config/Screen';
import KpBirthSvg from './components/KpBirthSvg';
import { Fonts } from '../../assets/style'
import { colors } from '../../config/Constants1';
import moment from 'moment';
import KarkanshaChartSvg from './components/KarkanshaChartSvg';
import TranslateText from '../language/TranslateText';
import MyLoader from '../../components/MyLoader';
import Loader from '../../components/Loader';




const SwanshaChart = ({ basicDetails, dispatch, SwanshaChart,isLoading }) => {

  console.log("khjkhguk", SwanshaChart)


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
    dispatch(KundliActions.getSwanshaChartData(payload))
  }, [dispatch])

  if (isLoading || !SwanshaChart) {
              return <Loader  />;
          }

  return (
    <View style={{ paddingTop: SCREEN_HEIGHT * 0.025 }}>

{/* <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
            </View> */}

      <KarkanshaChartSvg data={SwanshaChart} />
    </View>
  )
}


const mapStateToProps = state => ({

  isLoading: state.setting.isLoading,

  basicDetails: state.kundli.basicDetails,

  SwanshaChart: state.kundli.SwanshaChart,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(SwanshaChart);

const styles = StyleSheet.create({
  Hedertxt: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.7),

  }
})