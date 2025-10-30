import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Sun from '../../screens/customer/showkundli/Sun';
import Moon from '../../screens/customer/showkundli/Moon';
import Chalit from '../../screens/customer/showkundli/Chalit';
import Birth from '../../screens/customer/showkundli/Birth';
import Hora from '../../screens/customer/showkundli/Hora';
import Dreshkan from '../../screens/customer/showkundli/Dreshkan';
import Chathurthamasha from '../../screens/customer/showkundli/Chathurthamasha';
import Panchmansha from '../../screens/customer/showkundli/Panchmansha';
import Saptamansha from '../../screens/customer/showkundli/Saptamansha';
import Ashtamansha from '../../screens/customer/showkundli/Ashtamansha';
import Navamansha from '../../screens/customer/showkundli/Navamansha';
import Dashamansha from '../../screens/customer/showkundli/Dashamansha';
import Dwadashamsha from '../../screens/customer/showkundli/Dwadashamsha';
import Shodashamsha from '../../screens/customer/showkundli/Shodashamsha';
import Vishamansha from '../../screens/customer/showkundli/Vishamansha';
import Chaturvimshamsha from '../../screens/customer/showkundli/Chaturvimshamsha';
import Bhamsha from '../../screens/customer/showkundli/Bhamsha';
import Trishamansha from '../../screens/customer/showkundli/Trishamansha';
import Khavedamsha from '../../screens/customer/showkundli/Khavedamsha';
import Akshvedansha from '../../screens/customer/showkundli/Akshvedansha';
import Shashtymsha from '../../screens/customer/showkundli/Shashtymsha';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import Divisional from '../customer/showkundli/Divisional';
import PlantChart from '../customer/showkundli/PlantChart';
import { Fonts, Sizes } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import LinearGradient from 'react-native-linear-gradient';
import ChalitChart from '../customer/showkundli/ChalitChart';
import MoonChart from '../customer/showkundli/MoonChart';
const { height } = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator();


const ShowKundliCharts = ({ dispatch, planetData, basicDetails }) => {

  console.log("basicDetailscharts", basicDetails)

  const { t } = useTranslation();

  const [planet] = useState(null);
  const [nakshatra] = useState(null);
  const [isPlanet, setIsPlanet] = useState(true);


  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat,
      lon: basicDetails?.lon
      // gender: basicDetails?.gender,
      // name: basicDetails?.name,
      // place: basicDetails?.place

    }
    console.log("Mahadev", payload)
    dispatch(KundliActions.getKundliChartData(payload));
  }, [dispatch])



  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <ScrollView contentContainerStyle={{}}>
        <View style={{ backgroundColor: 'red',height:SCREEN_HEIGHT*0.7, }}>




          <Tab.Navigator

            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarLabelStyle: { fontSize: getFontSize(1.5), fontFamily: fonts.medium },
              tabBarGap: 0,
              tabBarStyle: { flex: 0 },
              tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
            }}>
            <Tab.Screen
              name={"LAGANA"}
              component={Birth}
              initialParams={{ data: 'birth' }}
            />
            <Tab.Screen
              name={"Divisional"}
              component={Divisional}
              initialParams={{ data: 'moon' }}
            />
            <Tab.Screen
              name={t("MoonChart")}
              component={MoonChart}
              initialParams={{ data: 'chalit' }}
            />
            <Tab.Screen
              name={t("chalit")}
              component={ChalitChart}
              initialParams={{ data: '' }}
            />

            {/* <Tab.Screen
              name={t("NAVAMSA")}
              component={Birth}
              initialParams={{ data: 'sun' }}
            /> */}

            {/* <Tab.Screen
              name={"Planets"}
              component={PlantChart}
            /> */}



          </Tab.Navigator>




          {/* <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarLabelStyle: { fontSize: getFontSize(1.5), fontFamily: fonts.medium },
              tabBarGap: 0,
              tabBarStyle: { flex: 0 },
              tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
            }}
          >
            <Tab.Screen
              name={"LAGANA"}
              component={Birth}

              initialParams={{
                data: 'birth',
                lat: basicDetails?.lat,
                lon: basicDetails?.lon
              }}
            />
            <Tab.Screen
              name={t("chalit")}
              component={Birth}
              initialParams={{
                data: 'chalit',
                lat: basicDetails?.lat,
                lon: basicDetails?.lon
              }}
            />
            <Tab.Screen
              name={t("NAVAMSA")}
              component={Birth}
              initialParams={{
                data: 'sun',
                lat: basicDetails?.lat,
                lon: basicDetails?.lon
              }}
            />
            <Tab.Screen
              name={"Divisional"}
              component={Divisional}
              initialParams={{
                data: 'moon',
                lat: basicDetails?.lat,
                lon: basicDetails?.lon
              }}
            />
            <Tab.Screen
              name={"Plants"}
              component={PlantChart}
              initialParams={{
                lat: basicDetails?.lat,
                lon: basicDetails?.lon
              }}
            />
          </Tab.Navigator> */}




        </View>

        {/* <View style={{}}>
          <View style={{ width: '100%', alignSelf: 'center', paddingVertical: 15, gap: Sizes.fixPadding }}>
            <View style={{
              alignSelf: 'flex-start', borderTopRightRadius: 6,
              borderBottomRightRadius: 6, borderWidth: 0.5, paddingVertical: 6, paddingHorizontal: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#AB0001'
            }}>
              <Text
                style={{
                  ...Fonts.PoppinsMedium,
                  color: 'white'
                }}>
                Planets
              </Text>
            </View>

            <LinearGradient
              colors={['#123A62', '#1E68B9']}
              locations={[0, 0.41]}
              style={{
                width: SCREEN_WIDTH,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingVertical: 10
              }}>

              <TouchableOpacity
                onPress={() => setIsPlanet(true)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 2,
                  // backgroundColor: isPlanet
                  //   ? colors.background_theme2
                  //   : colors.background_theme1,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    ...Fonts.PoppinsMedium,
                    color: isPlanet
                      ? '#FFAA48' :
                      'black'
                  }}>
                  MOON SIGN
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsPlanet(false)}
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 2,
                  // backgroundColor: !isPlanet
                  //   ? colors.background_theme2
                  //   : colors.background_theme1,
                }}>
                <Text
                  style={{
                    ...Fonts.PoppinsMedium,
                    color: isPlanet

                      ? 'black'
                      : '#FFAA48'
                  }}>
                  NAKSHATRA
                </Text>
              </TouchableOpacity>


            </LinearGradient>



            {isPlanet && planetData ? (
              <View
                style={{

                }}>
                <View
                  style={{
                    ...styles.rowContainer,

                    backgroundColor: '#AB0001'
                  }}>
                  <Text style={styles.rowText1}>{t("planet")}</Text>
                  <Text style={styles.rowText1}>{t("degree")}</Text>
                </View>
                {Object.entries(planetData?.planets_assoc || {}).map(([key, value], index, array) => (
                  <View
                    key={index}
                    style={{
                      ...styles.rowContainer,
                      borderBottomLeftRadius: index === array.length - 1 ? 15 : 0,
                      borderBottomRightRadius: index === array.length - 1 ? 15 : 0,
                    }}>
                    <Text style={styles.rowText}>{key}</Text>
                    <Text style={styles.rowText}>
                      {`${Math.floor(value)}° ${Math.floor((value % 1) * 60)}' ${Math.floor(((value % 1) * 60) % 1 * 60)}"`}
                    </Text>
                  </View>
                ))}
              </View>

            ) : nakshatra && (
              <View
                style={{

                }}>
                <View
                  style={{
                    ...styles.rowContainer,

                    backgroundColor: colors.background_theme2,
                  }}>
                  <Text style={styles.rowText}>Planet</Text>
                  <Text style={styles.rowText}>Nakshatra</Text>
                  <Text style={styles.rowText}>Naksh Lord</Text>
                  <Text style={styles.rowText}>pad</Text>
                </View>

                {Object.keys(nakshatra).map((item, index) => (
                  <View
                    key={index}
                    style={{
                      ...styles.rowContainer,
                      borderBottomLeftRadius:
                        Object.keys(planet).length == index + 1 ? 15 : 0,
                      borderBottomRightRadius:
                        Object.keys(planet).length == index + 1 ? 15 : 0,
                    }}>
                    <Text style={styles.rowText}>{planet[item].name}</Text>
                    <Text style={styles.rowText}>
                      {nakshatra[item].nakshatra}
                    </Text>
                    <Text style={styles.rowText}>
                      {nakshatra[item].nakshatraLord}
                    </Text>
                    <Text style={styles.rowText}>
                      {nakshatra[item].nakshatra_pad}
                    </Text>
                  </View>
                ))}


              </View>
            )}
          </View>
        </View> */}


      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch })
const mapStateToProps = state => ({
  basicDetails: state.kundli.basicDetails,
  planetData: state.kundli.planetData
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliCharts);

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  rowText: {
    flex: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: getFontSize(1.5),
    ...Fonts.PoppinsMedium,
    color: colors.black_color9,
    textTransform: 'capitalize',
  },
  rowText1: {
    flex: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: getFontSize(1.5),
    ...Fonts.PoppinsMedium,
    color: colors.black_color1,
    textTransform: 'capitalize',
  },
});

