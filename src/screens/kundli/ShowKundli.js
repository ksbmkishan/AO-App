import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MyLoader from '../../components/MyLoader';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts, Sizes } from '../../assets/style';
import ShowKundliBasic from './ShowKundliBasic';
import ShowPachang from './ShowPachang';
import ShowKundliCharts from './ShowKundliCharts';
import ShowKundliPlanets from './ShowKundliPlanets';
import * as KundliActions from '../../redux/actions/KundliActions';
import KundliBirthDetailes from './KundliBirthDetailes';
import ShowDashna from './ShowDashna';
import RashiReport from './RashiReport';
import Ashtakvarga from './Ashtakvarga';
import Share from 'react-native-share';
import ShowKundliKpPlanets from './ShowKundliKpPlanets';
import ShowKundliKpHouseCusp from './ShowKundliKpHouseCusp';
import ShowKundliKpPlanetCusp from './ShowKundliKpPlanetCusp';
import KpBirthDetails from './KpBirthDetails';
import KpRulingPlanets from './kpData/KpRulingPlanets';
import KpCuspsDetailes from './kpData/KpCuspsDetailes';
import Numerology2 from './Numerology2';
import VimhotriMahadasha from './showdasha/VimhotriMahadasha';
import Prediction from './Prediction';
import SadheSati from './SadheSati';
import KaalsarpDosha from './KaalsarpDosha';
import GeminiData from './GeminiData';
import CharDasha from './CharDasha';
import KarkanshaChart from './KarkanshaChart';
import SwanshaChart from './SwanshaChart';
import YoginaDasha from './showdasha/YoginaDasha';
import MangalDosha from '../MangalDosha';
import Pitrdosh from '../Pitrdosh';
import KpBirthChart from './kpData/KpBirthChart';
import KpcupsChart from './kpData/KpcupsChart';
import TransitChart from './TransitChart';
import DashamanshaChart from './charts/DashamanshaChart';
import DwadasmanshaChart from './charts/DwadasmanshaChart';
import TrishamanshaChart from './charts/TrishamanshaChart';
import Shashtymansha from './charts/Shashtymansha';
import NavamanshaChart from './charts/NavamanshaChart';
import DreshkanChart from './charts/DreshkanChart';
import ChalitChart from './charts/ChalitChart';
import SunChart2 from './charts/SunChart2';
import MoonChart from './charts/MoonChart';
import LagnaChart from './charts/LagnaChart';
import HoraChart from './charts/HoraChart';
import UpGrahaPlanet from './UpGrahaPlanet';
import Dhasambhavmadhya from './Dhasambhavmadhya';
import AstroDetailes from './AstroDetailes';
import AscendantPridiction from './Predictions/AscendantPridiction';
import SignPrediction from './Predictions/SignPrediction';
import PlanetPridiction from './Predictions/PlanetPridiction';
import BhavPrediction from './Predictions/BhavPrediction';
import Nakshatra from './Predictions/Nakshatra';
import FriendshipData from './FriendshipData';
import MySarvastak from './MySarvastak';
import MyAstakvarga from './MyAstakvarga/MyAstakvarga';
import { replace } from '../../navigations/NavigationServices';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '../../config/Constants1';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import TranslateText from '../language/TranslateText';


const ShowKundli = ({ navigation, route, dispatch, isLoading, basicDetails }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('Birth Details');
  const [loading, setLoading] = useState(false);
  const viewRef = useRef(null);


  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigation.navigate('OpenKundli');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [navigation])
  )

  useEffect(() => {
    if (typeof route?.params?.type === 'undefined') {
      const payload = {
        lang: t('lang'),
        kundliId: route?.params?.kundliId,
      }
      console.log("payloadchaudhary", payload)
      dispatch(KundliActions.getKundliData(payload));
    }

    if (navigation && typeof navigation.setOptions === 'function') {
      navigation.setOptions({
        headerTitle: 'My Kundli',
      });
    }

    return () => {
      dispatch(KundliActions.resetKundliData());
    };
  }, [dispatch, navigation]);


  useEffect(() => {
    if (selected) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [selected]);



  const shareContent = async () => {
    try {
      const shareOptions = {
        title: 'Share Horoscope',
        message: 'Share the Basic details',
        social: Share.Social.WHATSAPP,
        url: 'https://astrobook.co.in/',
      };

      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };



  const renderSelectedComponent = () => {
    switch (selected) {
      case 'Birth Details':
        return <KundliBirthDetailes />;
      case 'Panchang':
        return <ShowPachang />;
      case 'Charts':
        return <ShowKundliCharts />;
      case 'Planetary Positions':
        return <ShowKundliPlanets />;
      case 'Upgraha':
        return <UpGrahaPlanet />;
      case 'Sarvashtak':
        return <MySarvastak />;
      case 'Dhasam Bhav Madhya':
        return <Dhasambhavmadhya />;
      case 'Astro Details':
        return <AstroDetailes />;
      case 'Vimshottari Dasha':
        return <VimhotriMahadasha />;
      case 'Report':
        return <RashiReport />;
      case 'Ashtakvarga':
        return <Ashtakvarga />;
      case 'KP Planetary Positions':
        return <ShowKundliKpPlanets />;
      case 'KP House Significators':
        return <ShowKundliKpHouseCusp />;
      case 'KP Planet Significators':
        return <ShowKundliKpPlanetCusp />;
      case 'KP Birth Details':
        return <KpBirthDetails />;
      case 'KP Ruling Planets':
        return <KpRulingPlanets />;
      case 'KP Cusps Details':
        return <KpCuspsDetailes />;

      case 'Numerology Details':
        return <Numerology2 />;

      case 'Predictions':
        return <Prediction />
      case 'Sadhe Sati':
        return <SadheSati />
      case 'Kaalsarp Dosha':
        return <KaalsarpDosha />
      case 'Jaimini Details':
        return <GeminiData />
      case 'Char Dasha':
        return <CharDasha />
      case 'Karkansha Chart':
        return <KarkanshaChart />
      case 'Swansha Chart':
        return <SwanshaChart />
      case 'Yogini Dasha':
        return <YoginaDasha />
      case 'Mangal Dosha':
        return <MangalDosha />
      case 'Pitri Dosha':
        return <Pitrdosh />
      case 'KP Birth Chart':
        return <KpBirthChart />
      case 'KP Cusps Chart':
        return <KpcupsChart />
      case 'Transit':
        return <TransitChart />
      case 'Dashamansha Chart':
        return <DashamanshaChart />
      case 'Dwadasmansha Chart':
        return <DwadasmanshaChart />
      case 'Trishamansha Chart':
        return <TrishamanshaChart />
      case 'Shashtymansha Chart':
        return <Shashtymansha />
      case 'Navamansha Chart':
        return <NavamanshaChart />
      case 'Dreshkan Chart':
        return <DreshkanChart />
      case 'Chalit Chart':
        return <ChalitChart />
      case 'Sun Chart':
        return <SunChart2 />
      case 'Moon Chart':
        return <MoonChart />
      case 'Lagna Chart':
        return <LagnaChart />
      case 'Hora Chart':
        return <HoraChart />
      case 'Ascendant Prediction':
        return <AscendantPridiction />
      case 'Sign Prediction':
        return <SignPrediction />
      case 'Planet Consideration':
        return <PlanetPridiction />
      case 'Bhav Prediction':
        return <BhavPrediction />
      case 'Nakshatra Pridiction':
        return <Nakshatra />

      case 'Friendship Table':
        return <FriendshipData />
      case 'Astak Varga':
        return <MyAstakvarga />




        return;
      default:
        return (
          <View>
            <Text>{t('Select_Option')}</Text>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} ref={viewRef}>
      <MyLoader isVisible={isLoading || loading} />
      {CustomHeader()}
      {AllChartButtons()}

      <FlatList
        ListHeaderComponent={<>{renderSelectedComponent()}</>}
        contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );

  function CustomHeader() {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding,
          backgroundColor: '#F0F0F0',
          paddingVertical: SCREEN_HEIGHT * 0.02,

        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('OpenKundli')
              // navigation.reset({
              //   index: 0,  // Index of the new route you want to show
              //   routes: [{ name: 'OpenKundli' }], // Replace with your desired screen(s)
              // })
            }}>
            <Image
              source={require('../../assets/astroOneImages/back_navigation.png')}
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>

          <Text style={{ ...fonts.bold, fontSize: responsiveFontSize(2), fontWeight: "500", color: colors.black_color9 }}> <TranslateText title={'Kundli'} /> </Text>
        </View>
      </View>
    );
  }

  function AllChartButtons() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Sizes.fixPadding,
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: 'row',
            gap: 3.5,
            marginTop: SCREEN_WIDTH * 0.02,
          }}>
          {[
            'Birth Details',
            "Lagna Chart",
            "Astro Details",
            "Friendship Table",
            'KP Birth Details',
            'KP Planetary Positions',
            'KP Cusps Details',
            "KP Birth Chart",
            "KP Cusps Chart",
            'KP Planet Significators',
            'KP House Significators',
            'KP Ruling Planets',
            "Transit",
            'Planetary Positions',
            "Upgraha",
            "Dhasam Bhav Madhya",
            'Astak Varga',
            "Sarvashtak",

            "Moon Chart",
            "Sun Chart",
            "Chalit Chart",
            "Hora Chart",
            "Dreshkan Chart",
            "Navamansha Chart",
            "Dashamansha Chart",
            'Dwadasmansha Chart',
            "Trishamansha Chart",
            "Shashtymansha Chart",
            'Vimshottari Dasha',
            "Yogini Dasha",
            'Jaimini Details',
            'Char Dasha',
            'Karkansha Chart',
            'Swansha Chart',
            'Numerology Details',
            "Mangal Dosha",
            'Kaalsarp Dosha',
            "Pitri Dosha",
            'Sadhe Sati',
            "Ascendant Prediction",
            "Sign Prediction",
            "Planet Consideration",
            "Bhav Prediction",
            "Nakshatra Pridiction"










          ].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chartButton,
                {
                  backgroundColor: selected === item ? colors.background_theme2 : 'white',
                  borderColor: selected === item ? colors.background_theme2 : colors.background_theme2,
                  marginHorizontal: 2,
                },
              ]}
              onPress={() => setSelected(item)}>
              <Text
                style={[
                  styles.chartButtonText,
                  { color: selected === item ? 'white' : 'black' },
                ]}>
                <TranslateText title={item} />
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ShowKundli);

const styles = StyleSheet.create({
  buttonContainer: {
    width: '45%',
    backgroundColor: '#31CBE2',
    borderRadius: Sizes.fixPadding,
    height: SCREEN_WIDTH * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.fixPadding * 2,
  },
  buttonText: {
    ...Fonts.white16RobotoMedium,
    textAlign: 'center',
  },
  chartButton: {
    // paddingHorizontal: 16,
    paddingVertical: SCREEN_HEIGHT * 0.003,
    borderRadius: 5,
    backgroundColor: '#31CBE2',
    borderWidth: 0.5,
    width: SCREEN_WIDTH * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartButtonText: {
    ...Fonts.black11InterMedium,
    color: '#000000',
    fontSize: 13,
    textAlign: 'center',
  },
});
