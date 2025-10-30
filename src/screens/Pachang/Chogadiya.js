import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH, } from '../../config/Screen'
import { useState } from 'react';
import { colors } from '../../config/Constants1';
import { Fonts, Sizes } from '../../assets/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as KundliActions from '../../redux/actions/KundliActions'
import { connect } from 'react-redux';
import moment from 'moment';
import { FontsStyle } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const Chogadiya = ({ dispatch, chogadiyaData }) => {
  const [buttonStatus, setButtonStatus] = useState(true);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    const payload = {
      day: moment(new Date()).format("DD"),
      month: moment(new Date()).format("MM"),
      year: moment(new Date()).format("YYYY"),
       lang: t('lang')
    }
    console.log("payloadcho  ", payload)
    dispatch(KundliActions.getChogadiyadata(payload))
  }, [dispatch]);

  console.log('chogadiyaData :::      ', chogadiyaData)
  const onPress = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const payload = {
      
      day: moment(currentDate).format("DD"),
      month: moment(currentDate).format("MM"),
      year: moment(currentDate).format("YYYY"),
      lang: t('lang')
    };

    dispatch(KundliActions.getChogadiyadata(payload));

  };

  const handleTommorrow = () => {
    setButtonStatus(false);
  };

  const handleToday = () => {
    setButtonStatus(true);

  };


  const renderItem = ({ item }) => {

    return (
      item &&
     <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.background_theme2, margin: SCREEN_HEIGHT * 0.005 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.01, }}>
        <Text style={{...styles.commanTitle,fontWeight:'bold'}}>{item?.name}</Text>
        <Text style={styles.commanTitle}>{item?.time}</Text>
      </View>
      <Text style={{ color: colors.black_color9, fontSize: 12, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01,...FontsStyle.font }}>
        {item?.auspicious_info}
      </Text>
       </View>
    )
  }
  const renderItem2 = ({ item }) => {
    return (
      <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.background_theme2, margin: SCREEN_HEIGHT * 0.005 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.01, }}>
        <Text style={{...styles.commanTitle,fontWeight:'bold'}}>{item?.name}</Text>
        <Text style={styles.commanTitle}>{item?.time}</Text>
      </View>
      <Text style={{ color: colors.black_color9, fontSize: 12, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01,...FontsStyle.font }}>
        {item?.auspicious_info}
      </Text>
       </View>
    )
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: '#F8E8D9' }}>
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.2 }}>

        <View style={{ backgroundColor: colors.background_theme2, padding: Sizes.fixPadding, borderRadius: Sizes.fixPadding }}>
          <Text style={{ color: colors.white_color, fontWeight: 'bold' }}>{moment(date).format('DD-MM-YYYY')}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <MaterialIcons name="date-range" size={20} color={"black"} />
        </TouchableOpacity>



        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {buttons()}
    </View>
  )

  function buttons() {
    return (
      <View>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.022, paddingTop: SCREEN_HEIGHT * 0.02 }}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: 7,
              borderRadius: 10,

            }}>

            <TouchableOpacity
              onPress={() => handleToday()}
              style={{
                elevation: 20,
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.05,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: buttonStatus

                  ? colors.background_theme2
                  : colors.background_theme1,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: buttonStatus
                    ? colors.white_color
                    : colors.black_color9,
                }}>
                {t("Day Chaughadiya")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTommorrow()}
              style={{
                borderRadius: 20,
                elevation: 20,
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.05,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: !buttonStatus
                  ? colors.background_theme2
                  : colors.background_theme1,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: !buttonStatus
                    ? colors.white_color
                    : colors.black_color9,
                }}>
                {t("Night Chaughadiya")}
              </Text>
            </TouchableOpacity>

          </View>
        </View>

        {buttonStatus ? (
          <View style={{ height: "100%", width: '100%', paddingBottom: SCREEN_HEIGHT * 0.1 }}>
            <View
              style={{ flex: 0.8, backgroundColor: '#F8E8D9' }}
            >
              <View>
                <FlatList
                  data={chogadiyaData?.data[0]?.dayChaughadiya}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id} />

              </View>
            </View>
          </View>
        ) : (
          <View
            style={{ height: "100%", width: '100%', paddingBottom: SCREEN_HEIGHT * 0.1 }}>
            <View
              style={{ flex: 0.8, backgroundColor: '#F8E8D9' }}
            // source={require('../../assets/images/BG120.png')}
            >
              <View>
                <FlatList
                  data={chogadiyaData?.data[0]?.nightChaughadiya}
                  renderItem={renderItem2}
                  keyExtractor={(item) => item.id} />

              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({ dispatch })

const mapStateToProps = state => ({
  chogadiyaData: state.kundli.chogadiyaData
})

export default connect(mapStateToProps, mapDispatchToProps)(Chogadiya)

const styles = StyleSheet.create({
  commanTab2: {
    ...FontsStyle.fontfamily,
    color: 'white',
    fontSize:14
  },
  commanTitle: {
   ...FontsStyle.fontfamily,
    color: 'black',
    fontSize:14
  }
})