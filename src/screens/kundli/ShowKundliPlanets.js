import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { colors } from '../../config/Constants1'
import moment from 'moment'
import TranslateText from '../language/TranslateText'
import { FontsStyle } from '../../config/constants'
import Loader from '../../components/Loader'

const ShowKundliPlanets = ({ basicDetails, dispatch, myPlanets, isLoading }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  



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
    dispatch(KundliActions.getMyPlanetsData(payload))
  }, [dispatch])
  const renderItem = ({ item, index }) => {
    const isDropdownVisible = dropdownIndex === index;

    return (
      <View style={{ marginVertical: SCREEN_HEIGHT * 0.01 }}>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { backgroundColor: isDropdownVisible ? "white" : colors.mybackground }
          ]}
          onPress={() => setDropdownIndex(isDropdownVisible ? null : index)}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={[styles.Hedertxt, { color: 'red', }]}>{item?.name}</Text>
            <Text style={styles.Hedertxt}>{item?.degree}</Text>
            <Text style={[styles.Hedertxt, { color: 'purple', }]}>{item?.rashi}</Text>
          </View>

          <View>
            <Text style={{ color: "black" }}>{isDropdownVisible ? "▲" : "▼"}</Text>
          </View>
        </TouchableOpacity>

        {isDropdownVisible && (

          <View style={styles.dropdownContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SCREEN_WIDTH * 0.05,
                paddingVertical: SCREEN_HEIGHT * 0.02,
                borderBottomWidth: 1
              }}
            >
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                 {t('Sign')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                 {item?.rashi}
                </Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                 {t('Sign Lord')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                 {item?.rashiLord}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SCREEN_WIDTH * 0.05,
                paddingVertical: SCREEN_HEIGHT * 0.015,
                borderBottomWidth: 1,
              }}
            >
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                 {t('Nakshatra')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                 {item?.nakshatra}
                </Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                 {t('Nakshatra Lord')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                 {item?.nakshatraLord}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SCREEN_WIDTH * 0.05,
                paddingVertical: SCREEN_HEIGHT * 0.015,
                borderBottomWidth: 1
              }}
            >
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                 {t('House')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                 {item?.house}
                </Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                 {t('Charan')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                 {item?.charan}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SCREEN_WIDTH * 0.05,
                paddingTop: SCREEN_HEIGHT * 0.02
              }}
            >
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                  {t('Retrograde')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                  {item?.isRetrograde || "No"}
                </Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                  {t('Combust')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                  {item?.isCombust || "No"}
                </Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: "#026135" }}>
                  {t('State')}
                </Text>
                <Text style={{  ...FontsStyle.font, }}>
                  {item?.PlanetState || "No"}
                </Text>
              </View>
            </View>
          </View>


        )}


      </View>
    );
  };

  // const RenderItem = ({ item }) => {
  //   return (
  //     <View style={{ borderWidth: 1, paddingTop: SCREEN_HEIGHT * 0.015, borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.015, marginVertical: 10 }}>

  //       <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
  //         <Text style={styles.MyText}>{item?.name}</Text>
  //         <Text style={styles.MyText}>{item?.rashi}</Text>
  //         <Text style={styles.MyText}>{item?.degree}</Text>
  //       </View>

  //       <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
  //         <View style={{ gap: 8 }}>
  //           <Text style={styles.MyText}>Sign</Text>
  //           <Text style={styles.MyText}>{item?.rashi}</Text>
  //         </View>

  //         <View style={{ gap: 8 }}>
  //           <Text style={styles.MyText}>Sign Lord</Text>
  //           <Text style={styles.MyText}>{item?.rashiLord}</Text>
  //         </View>


  //       </View>

  //       <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
  //         <View style={{ gap: 8 }}>
  //           <Text style={styles.MyText}>Nakshatra</Text>
  //           <Text style={styles.MyText}>{item?.nakshatra}</Text>
  //         </View>

  //         <View style={{ alignItems: "center", gap: 8 }}>
  //           <Text style={styles.MyText}>Nakshatra Lord</Text>
  //           <Text style={styles.MyText}>{item?.nakshatraLord}</Text>
  //         </View>


  //       </View>

  //       <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
  //         <View style={{ alignItems: "center", gap: 8 }}>
  //           <Text style={styles.MyText}>House</Text>
  //           <Text style={styles.MyText}>{item?.house}</Text>
  //         </View>

  //         <View style={{ alignItems: "center", gap: 8 }}>
  //           <Text style={styles.MyText}>Charan</Text>
  //           <Text style={styles.MyText}>{item?.charan}</Text>
  //         </View>


  //       </View>

  //       <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
  //         <View style={{ alignItems: "center", gap: 8 }}>
  //           <Text style={styles.MyText} >Retrograde</Text>
  //           <Text style={styles.MyText}>{item?.isRetrograde}</Text>
  //         </View>

  //         <View style={{ alignItems: "center", gap: 8 }}>
  //           <Text style={styles.MyText}>Combust</Text>
  //           <Text style={styles.MyText}>{item?.isCombust}</Text>
  //         </View>

  //         <View style={{ alignItems: "center" }}>
  //           <Text style={styles.MyText}>State</Text>
  //           <Text style={styles.MyText}>{item?.PlanetState}</Text>
  //         </View>




  //       </View>

  //     </View>
  //   )
  // }

  return (
    <View style={{ flex: 1, paddingTop: SCREEN_HEIGHT * 0.01 }}>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={myPlanets}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.1 }}
        />
      )}
    </View>
  )
}




const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  myPlanets: state.kundli.myPlanets,
})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliPlanets);



const styles = StyleSheet.create({

  MyText: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.8)
  },
  Hedertxt: {
     ...FontsStyle.font,
    fontSize: responsiveFontSize(1.7),

  },
  headerButton: {
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.023,
    borderRadius: 10,
    backgroundColor: colors.mybackground

  },
  dropdownContainer: {
    elevation: 1,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 1
  },
})