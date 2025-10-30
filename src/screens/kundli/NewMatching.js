import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SwitchComponent,
  Image,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { CheckBox } from '@rneui/themed';

import React from 'react';
import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  api2_create_kundali,
  api_url,
  colors,
  fonts,
  getFontSize,
  match_making,
} from '../../config/Constants1';
import MyLoader from '../../components/MyLoader2';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import moment from 'moment';
import { warnign_toast } from '../../components/MyToastMessage';
import axios from 'axios';
import { connect } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import MyHeader from '../../components/MyHeader';
import * as KundliActions from '../../redux/actions/KundliActions'
import * as SettingActions from '../../redux/actions/SettingActions'
import { Fonts, Sizes } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import TranslateText from '../language/TranslateText';
import { FontsStyle } from '../../config/constants';

const NewMatching = ({ customerData, navigation, route, dispatch, locationData, subLocationData, kundliListData, masterKundliListData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [maleName, setMaleName] = useState('');
  const [femaleName, setFemaleName] = useState('');
  const [maleDateVisible, setMaleDateVisible] = useState(false);
  const [maleDate, setMaleDate] = useState(null);
  const [maleTimeVisible, setMaleTimeVisible] = useState(false);
  const [maleTime, setMaleTime] = useState(null);
  const [femaleDateVisible, setFemaleDateVisible] = useState(false);
  const [femaleDate, setFemaleDate] = useState(null);
  const [femaleTimeVisible, setFemaleTimeVisible] = useState(false);
  const [femaleTime, setFemaleTime] = useState(null);
  const [toggle, setToggle] = useState(null)
  const [search, setSearch] = useState(search);
  const [refreshing, setRefreshing] = useState(false);
  const [isDateChecked, setIsDateChecked] = useState(false);
  const [isDateChecked2, setIsDateChecked2] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true)
    console.log("refreshingggg")
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleDateCheck = () => {
    setIsDateChecked(!isDateChecked);
    if (!isDateChecked) {
      setMaleTime(moment('12:00 PM', 'hh:mm A'));
    } else {
      setMaleTime(null);
    }
  };

  const handleDateCheck2 = () => {
    setIsDateChecked2(!isDateChecked2);
    if (!isDateChecked2) {
      setFemaleTime(moment('12:00 PM', 'hh:mm A'));
    } else {
      setFemaleTime(null);
    }
  };

  useEffect(() => {
    dispatch(KundliActions.getAllKundli())
  }, [dispatch]);

  console.log('kundlilistadata:::::KKKK', kundliListData,)

  const searchFilterFunction = text => {

    if (!masterKundliListData) {
      return
    }

    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterKundliListData.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      dispatch(KundliActions.setAllKundli(newData))
      setSearch(text);
    } else {
      dispatch(KundliActions.setAllKundli(masterKundliListData))
      setSearch(text);
    }
  };
  const handleToggle = () => {
    setToggle(prevToggle => !prevToggle)
  }

  useEffect(() => {
    return () => {
      dispatch(SettingActions.setLocationData(null))
      dispatch(SettingActions.setSubLocationData(null))
    }
  }, [])

  console.log(customerData?.address?.latitude, 'cdata')

  const validation = () => {
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const isStringInValid = (string) => {
      return !string || !string?.trim() || !/^[a-zA-Z ]+$/.test(string)
    }

    if (maleName.length === 0) {
      warnign_toast('Please enter male name.');
      return false;
      // } else if (!nameRegex.test(maleName)) {
    } else if (isStringInValid(maleName)) {
      warnign_toast('Male name can only contain alphabetic characters.');
      return false;
    } else if (maleName.length > 40) {
      warnign_toast('Male name can only contain only 40 character.');
      return false;
    } else if (maleDate === null) {
      warnign_toast('Please select male birth date.');
      return false;
    } else if (maleTime === null) {
      warnign_toast('Please select male birth time.');
      return false;
    }
    else if (!locationData) {
      warnign_toast('Please select male birth address.');
      return false;
    }
    else if (femaleName.length === 0) {
      warnign_toast('Please enter female name.');
      return false;
    } else if (femaleName.length > 40) {
      warnign_toast('Female name can only contain only 40 character');
      return false;
    } else if (isStringInValid(femaleName)) {
      warnign_toast('Female name can only contain alphabetic characters.');
      return false;
    } else if (femaleDate === null) {
      warnign_toast('Please select female birth date.');
      return false;
    } else if (femaleTime === null) {
      warnign_toast('Please select female birth time.');
      return false;
    }
    else if (!subLocationData) {
      warnign_toast('Please select female birth address.');
      return false;
    }
    else {
      return true;
    }
  };


  const get_matching = async (mid, fid) => {
    if (validation()) {
      const maleKundliData = {
        name: maleName,
        gender: 'male',
        dob: maleDate,
        tob: maleTime,
        place: locationData?.address,
        // place: customerData?.address?.birthPlace,
        lat: locationData?.lat,
        lon: locationData?.lon,
        // lat: customerData?.address?.latitude,
        // lon: customerData?.address?.longitude
      };

      const femaleKundliData = {
        name: femaleName,
        gender: 'female',
        dob: femaleDate,
        tob: femaleTime,
        place: subLocationData?.address,
        lat: subLocationData?.lat,
        lon: subLocationData?.lon,
        // place: customerData?.address?.birthPlace,
        // lat: customerData?.address?.latitude,
        // lon: customerData?.address?.longitude
      };
      console.log(maleKundliData?.lat, 'this data')
      const matchingPayload = {
        m_day: parseInt(moment(maleDate).format('D')),
        m_month: parseInt(moment(maleDate).format('M')),
        m_year: parseInt(moment(maleDate).format('YYYY')),
        m_hour: parseInt(moment(maleTime).format('HH')),
        m_min: parseInt(moment(maleTime).format('mm')),
        m_lat: maleKundliData?.lat,
        m_lon: maleKundliData?.lon,
        m_tzone: 5.5,
        f_day: parseInt(moment(femaleDate).format('D')),
        f_month: parseInt(moment(femaleDate).format('M')),
        f_year: parseInt(moment(femaleDate).format('YYYY')),
        f_hour: parseInt(moment(femaleTime).format('HH')),
        f_min: parseInt(moment(femaleTime).format('mm')),
        f_lat: femaleKundliData?.lat,
        f_lon: femaleKundliData?.lon,
        f_tzone: 5.5,
      }

      const payload = {
              femaleKundliData:femaleKundliData,maleKundliData:maleKundliData,matchingPayload:matchingPayload
            }
      console.log("data-------", femaleKundliData)
      dispatch(KundliActions.setFemaleKundliData(femaleKundliData))
      dispatch(KundliActions.setMaleKundliData(maleKundliData))
      dispatch(KundliActions.getKundliMatchingReport(matchingPayload))
      dispatch(KundliActions.onMatchingData(payload))
      // navigation.navigate("BasicMatching");
    }
  };
  // console.log("data-------",femaleKundliData)
  const male_date_handle = (event, selectedDate) => {
    if (event.type == 'set') {
      setMaleDate(selectedDate);
    }
    setMaleDateVisible(false);
  };

  const male_time_handle = (event, selectedTime) => {
    if (event.type == 'set') {
      setMaleTime(selectedTime);
    }
    setMaleTimeVisible(false);
  };

  const female_date_handle = (event, selectedDate) => {
    if (event.type == 'set') {
      setFemaleDate(selectedDate);
    }
    setFemaleDateVisible(false);

  };

  const female_time_handle = (event, selectedTime) => {
    if (event.type == 'set') {
      setFemaleTime(selectedTime)
    }
    setFemaleTimeVisible(false);
  };

  const handleTextChange = (text) => {
    console.log("Original text:", text);
    const filteredText = text.replace(/[^a-zA-Z0-9 ]/g, '');
    console.log("Filtered text:", filteredText);
    setFemaleName(filteredText);
  };



  return (
    <ImageBackground
      resizeMode='cover'
      source={require('../../assets/images/MatchingBookBackgroun.png')}
      style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      {/* <MyHeader title={t('Kundli Matching')} navigation={navigation} /> */}
      <View style={{ flex: 1, gap: 16 }}>
        <View style={{ flexDirection: 'row', borderWidth: 0.5, borderRadius: 35, marginHorizontal: Sizes.fixPadding, borderColor: '#CECECE', top: SCREEN_WIDTH * 0.02 }}>
          {/* 
          <TouchableOpacity style={[styles.CommanToogle, { backgroundColor: toggle ? '#31CBE2' : 'white' }]} onPress={handleToggle}>
            <Text style={[styles.CommanText, { color: toggle ? 'white' : 'black' }]}>Open Kundli</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity style={[styles.CommanToogle, { backgroundColor: toggle ? 'white' : '#31CBE2' }]} onPress={handleToggle}>
            <Text style={[styles.CommanText, { color: toggle ? 'black' : 'white' }]}>New Matching</Text>
          </TouchableOpacity> */}

        </View>

        {toggle ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                marginVertical: 15,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: '#ccc',
                padding: 2,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 4,
              }}>
              <TouchableOpacity style={{ height: 20, width: 20 }}>
                <Image source={require('../../assets/images/Search.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
              </TouchableOpacity>

              <TextInput
                placeholder={t("s_k_b_n")}
                placeholderTextColor={colors.black_color5}
                onChangeText={text => searchFilterFunction(text)}
                style={{
                  fontSize: getFontSize(1.5),
                  color: colors.black_color7,
                  ...FontsStyle.fontfamily,
                  padding: 5,
                  flex: 1
                }}
              />



            </View>

            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              <Text
                style={{
                  ...FontsStyle.fontfamily,
                  color: 'black'
                }}>
                {t("recent_kundli")}
              </Text>
              {kundliListData && (
                <FlatList
                  data={kundliListData}
                  renderItem={({ item, index }) => (
                    <>

                      <TouchableOpacity
                        onPress={() => navigation.navigate('showKundli', { kundliId: item?._id, })}
                        activeOpacity={0.6}
                        key={index}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: getFontSize(1.2),
                          paddingVertical: getFontSize(1),
                          borderWidth: 0.5,
                          borderColor: '#ccc',
                          backgroundColor: '#fff',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 3,
                          elevation: 4,
                          borderRadius: 8,
                          marginBottom: Sizes.fixPadding,

                        }}>
                        <View
                          style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                          <Text allowFontScaling={false} style={{ color: colors.black_color, borderWidth: 2, fontSize: getFontSize(1.6), paddingLeft: 12, paddingRight: 8, padding: 5, borderRadius: width * 0.1, borderColor: 'red' }}>{item.name.charAt(0)}</Text>
                          <View style={{ marginLeft: 10 }}>
                            <Text allowFontScaling={false}
                              style={{
                                color: '#000000',
                                ...FontsStyle.fontfamily,
                              }}>
                              {item.name}
                            </Text>
                            <Text allowFontScaling={false}
                              style={{
                                fontSize: getFontSize(1.2),
                                color: colors.black_color7,
                                fontFamily: fonts.medium,
                              }}>
                              {`${moment(item?.dob).format('DD MMM YYYY')} ${moment(item.tob).format("HH:mm A")}`}
                            </Text>
                            <Text allowFontScaling={false}
                              style={{
                                fontSize: getFontSize(1.2),
                                width: width * 0.5,
                                color: colors.black_color7,
                                fontFamily: fonts.medium,
                              }}>
                              {item.place}
                            </Text>
                          </View>
                        </View>
                        {/* <TouchableOpacity
                              style={{ right: 50, position: 'absolute' }}
                              onPress={() => navigation.navigate('editkundli', { data1: item })}
                            >
                              <Entypo
                                name="edit"
                                color={colors.black_color7}
                                size={getFontSize(2.2)}
                              />
                            </TouchableOpacity> */}
                        <TouchableOpacity
                          style={{ right: 10, position: 'absolute' }}
                          onPress={() => dispatch(KundliActions.deleteKundli(item?._id))}>
                          <MaterialIcons
                            name="delete"
                            color={colors.black_color7}
                            size={getFontSize(2.2)}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>

                    </>


                  )}
                />
              )}

            </View>

          </View>

        )
          : (

            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 0,
                  width: '95%',
                  paddingVertical: 15,
                  alignSelf: 'center',
                }}>

                <View style={styles.containerBox}>
                  <Text allowFontScaling={false} style={styles.heading}>
                    {t("boy_details")}
                  </Text>
                  <Text style={styles.CommanLable}> <TranslateText title={'Name'} /></Text>
                  <View style={styles.inputContainer}>
                    <View style={{ height: 16, width: 16 }}>
                      <Image source={require('../../assets/images/UserMatchin.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>
                    <KeyboardAvoidingView
                      behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
                      <TextInput
                        placeholder={t("Enter name")}
                        placeholderTextColor={colors.black_color5}
                        onChangeText={(text) => {

                          const filteredText = text.replace(/[^a-zA-Z0-9 ]/g, '');
                          setMaleName(filteredText);
                        }}
                        value={maleName}
                        style={{
                          flex: 0,
                          marginLeft: 5,
                          color: colors.black_color9,
                          fontWeight: 'normal',
                          ...Fonts.primaryHelvetica
                        }}
                      />

                    </KeyboardAvoidingView>
                  </View>

                  <Text style={styles.CommanLable}> <TranslateText title={'Birth Date'} /></Text>
                  <TouchableOpacity
                    onPress={() => setMaleDateVisible(true)}
                    style={{ ...styles.inputContainer, }}>

                    <View style={{ height: 18, width: 18 }}>
                      <Image source={require('../../assets/images/CalenderMatching.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>

                    <Text
                      allowFontScaling={false}
                      style={{
                        marginLeft: 5,
                        fontWeight: 'normal',
                        ...FontsStyle.fontfamily,
                        paddingVertical: 12,
                        color: '#585858',
                      }}
                    >
                      {maleDate == null ? (
                        <TranslateText title="DD/MM/YYYY" />

                      ) : (
                        moment(maleDate).format('Do MMM YYYY')
                      )}
                    </Text>

                  </TouchableOpacity>

                  <Text style={styles.CommanLable}> <TranslateText title={'Birth Time'} /></Text>
                  <TouchableOpacity
                    onPress={() => setMaleTimeVisible(true)}
                    style={{ ...styles.inputContainer, flex: 0.47 }}>
                    <View style={{ height: 18, width: 18 }}>
                      <Image source={require('../../assets/images/ClockMatching.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>

                    <Text
                      allowFontScaling={false}
                      style={{
                        marginLeft: 5,
                        fontWeight: 'normal',
                        ...FontsStyle.fontfamily,
                        paddingVertical: 12,
                        color: '#585858',
                      }}
                    >
                      {maleTime == null ? (
                        <TranslateText title="HH:MM:AA" /> // use translation key here
                      ) : (
                        moment(maleTime).format('hh:mm A')
                      )}
                    </Text>


                  </TouchableOpacity>
                  <View style={styles.CommanCheckBoxContainer}>
                    <CheckBox
                      title={t('Don’t know my exact time of birth')}

                      containerStyle={styles.checkboxContainer}
                      textStyle={styles.checkboxText}
                      checked={isDateChecked}
                      onPress={handleDateCheck}
                      checkedColor={colors.background_theme2}
                      uncheckedColor="#000"
                      size={18}
                    />
                    <Text style={{ ...FontsStyle.fontfamily, paddingHorizontal: Sizes.fixPadding, color: 'black' }}> <TranslateText title={'Note: Without time of birth, we can still achieve upto 80% accurate predictions'} /></Text>

                  </View>



                  {maleDateVisible && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={maleDate == null ? new Date() : new Date(maleDate)}
                      mode={'date'}
                      display='spinner'
                      is24Hour={false}
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 1, 1)}
                      onChange={male_date_handle}
                    />
                  )}
                  {maleTimeVisible && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={maleTime == null ? new Date() : new Date(maleTime)}
                      mode={'time'}

                      display='spinner'
                      is24Hour={false}
                      onChange={male_time_handle}
                    />
                  )}

                  {/* place of birth male */}
                  <Text style={styles.CommanLable}> <TranslateText title={'Birth Place'} /></Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('placeOfBirth'), {
                        type: "sub"
                      }
                    }}
                    style={{ ...styles.inputContainer, marginBottom: 5 }}>
                    <View style={{ height: 18, width: 18 }}>
                      <Image source={require('../../assets/images/LocationMatching.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>
                    <Text allowFontScaling={false}
                      style={{
                        marginLeft: 5,
                        fontWeight: 'normal',
                        ...FontsStyle.fontfamily,
                        paddingVertical: 12,
                        color: '#585858'
                      }}>
                      {locationData ? locationData?.address : t("select_location")}
                    </Text>
                  </TouchableOpacity>


                </View>



                <View style={styles.containerBox}>
                  <Text allowFontScaling={false} style={styles.heading}>
                    {t("girl_details")}
                  </Text>
                  <Text style={styles.CommanLable}><TranslateText title={'Name'} /></Text>

                  <View style={styles.inputContainer}>
                    <View style={{ height: 16, width: 16 }}>
                      <Image source={require('../../assets/images/UserMatchin.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>
                    <KeyboardAvoidingView
                      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                      <TextInput
                        placeholder={t("Enter name")}
                        placeholderTextColor={colors.black_color5}
                        onChangeText={handleTextChange}
                        style={{
                          flex: 0,
                          marginLeft: 5,
                          color: colors.black_color9,
                          fontWeight: 'normal',
                        }}
                        value={femaleName} // Bind the value to the state
                      />


                    </KeyboardAvoidingView>
                  </View>

                  <Text style={styles.CommanLable}> <TranslateText title={'Birth Date'} /></Text>
                  <TouchableOpacity
                    onPress={() => setFemaleDateVisible(true)}
                    style={{ ...styles.inputContainer, flex: 0.47 }}>
                    <View style={{ height: 18, width: 18 }}>
                      <Image source={require('../../assets/images/CalenderMatching.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>
                    <Text allowFontScaling={false}
                      style={{
                        marginLeft: 5,
                        fontWeight: 'normal',
                        ...FontsStyle.fontfamily,
                        paddingVertical: 12,
                        color: '#585858'
                      }}>
                      {femaleDate == null
                        ? 'DD/MM/YYYY'
                        : moment(femaleDate).format('Do MMM YYYY')}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.CommanLable}> <TranslateText title={'Birth Time'} /></Text>
                  <TouchableOpacity
                    onPress={() => setFemaleTimeVisible(true)}
                    style={{ ...styles.inputContainer, flex: 0.47 }}>
                    <View style={{ height: 18, width: 18 }}>
                      <Image source={require('../../assets/images/ClockMatching.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>
                    <Text allowFontScaling={false}
                      style={{
                        marginLeft: 5,
                        fontWeight: 'normal',
                        ...FontsStyle.fontfamily,
                        paddingVertical: 12,
                        color: '#585858'
                      }}>
                      {femaleTime == null
                        ? 'HH:MM AM'
                        : moment(femaleTime).format('hh:mm A')}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CommanCheckBoxContainer}>
                    <CheckBox
                      title={t('Don’t know my exact time of birth')}
                      containerStyle={styles.checkboxContainer}
                      textStyle={styles.checkboxText}
                      checked={isDateChecked2}
                      onPress={handleDateCheck2}
                      checkedColor={colors.background_theme2}
                      uncheckedColor="#000"
                      size={18}
                    />
                    <Text style={{ ...FontsStyle.fontfamily, paddingHorizontal: Sizes.fixPadding, color: 'black' }}> <TranslateText title={'Note: Without time of birth, we can still achieve upto 80% accurate predictions'} /></Text>
                  </View>


                  {femaleDateVisible && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={femaleDate == null ? new Date() : new Date(femaleTime)}
                      mode={'date'}
                      display='spinner'
                      is24Hour={false}
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 1, 1)}
                      onChange={female_date_handle}
                    />
                  )}
                  {femaleTimeVisible && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={femaleTime == null ? new Date() : new Date(femaleTime)}
                      mode={'time'}
                      display='spinner'
                      is24Hour={false}
                      onChange={female_time_handle}
                    />
                  )}
                  {/* place of bireth female */}
                  <Text style={styles.CommanLable}> <TranslateText title={'Birth Place'} /></Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('placeOfBirth', {
                        type: 'sub'
                      });
                    }}
                    style={{ ...styles.inputContainer, marginBottom: 5 }}>
                    <View style={{ height: 18, width: 18 }}>
                      <Image source={require('../../assets/images/LocationMatching.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />

                    </View>
                    <Text allowFontScaling={false}
                      style={{
                        marginLeft: 5,
                        fontWeight: 'normal',
                        ...FontsStyle.fontfamily,
                        paddingVertical: 12,
                        color: '#585858'
                      }}>
                      {subLocationData ? subLocationData?.address : t("select_location")}
                    </Text>
                  </TouchableOpacity>

                  {/* <View style={styles.inputContainer}
>
<MaterialCommunityIcons
name="map-marker"
color={colors.black_color8}
size={getFontSize(2)}
/>
<TextInput
// onPress={() => {
//   navigation.navigate('placeOfBirth',);
// }}
value={customerData?.address?.birthPlace}
// editable={false}
placeholder={'Place of birth'}
placeholderTextColor={colors.black_color5}
// onChangeText={setName}
style={{
flex: 1,
marginLeft: 5,
color: colors.black_color9,
fontSize: getFontSize(1.4),
padding: 0
}}
/>
</View> */}
                </View>

                <TouchableOpacity
                  onPress={() => get_matching()}
                  activeOpacity={0.8}
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    backgroundColor: colors.background_theme2,
                    borderRadius: 35,
                    padding: 14
                  }}>
                  <Text allowFontScaling={false}
                    style={{
                      fontSize: 16,
                      color: colors.white_color,
                      fontFamily: fonts.medium,
                      textAlign: 'center',
                    }}>
                    {t("show_match")}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

          )
        }
      </View>





    </ImageBackground>
  );
}


const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  locationData: state.setting.locationData,
  subLocationData: state.setting.subLocationData,
  kundliListData: state.kundli.kundliListData,
  masterKundliListData: state.kundli.masterKundliListData
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(NewMatching);

const styles = StyleSheet.create({
  heading: {
    ...FontsStyle.fontfamily,
    color: 'black',
    textAlign: 'center',
    fontSize: 16
  },
  containerBox: {
    backgroundColor: colors.background_theme1,
    borderRadius: 14,
    shadowColor: colors.black_color5,
    padding: Sizes.fixPadding,
    marginTop: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: '#C8C8C8',
    marginBottom: 20,
    borderWidth: 0.5,
    paddingHorizontal: 4,

    overflow: 'hidden'
  },
  CommanLable: {
    ...FontsStyle.fontfamily,
    color: 'black',
    bottom: 3,
    fontSize: 14
  },
  CommanText: {
    ...FontsStyle.fontfamily,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center'
  },
  CommanToogle: {
    padding: Sizes.fixPadding, borderRadius: 35, flex: 1, backgroundColor: 'white'
  },
  checkboxContainer: {
    padding: 0,
  },
  checkboxText: {
    ...FontsStyle.fontfamily,
    color: '#555555',
    fontSize: 13
  },
  CommanCheckBoxContainer: {
    bottom: 10,
    // flexWrap:'wrap'
  }
});
