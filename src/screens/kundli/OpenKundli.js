import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert,
  BackHandler,
  ImageBackground
} from 'react-native';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { api2_my_kundali, api_url, delete_kundali, kundali_search, colors, fonts, getFontSize } from '../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import MyLoader from '../../components/MyLoader2';
import moment from 'moment';
const { width, height } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import { success_toast } from '../../components/MyToastMessage';
import * as KundliActions from '../../redux/actions/KundliActions'
import { Fonts, Sizes } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import TranslateText from '../language/TranslateText';
import { FontsStyle, normalize } from '../../config/constants';


const OpenKundli = ({ navigation, dispatch, kundliListData, masterKundliListData }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(search);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
  navigation.setOptions({
    tabBarLabel: t("previous_kundli"),
    tabBarLabelStyle: {
      ...FontsStyle.font,   // your custom font family
      fontSize: 14,         // example size
      color: '#000',        // example color
    },
    tabBarStyle: {
      backgroundColor: '#fff', // only View style here
      height: 60,
    },
  });
}, [navigation, t]);



  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // Navigate to Home screen when back button is pressed
        navigation.navigate('home');
        return true; // Prevent the default back action
      };

      // Add event listener for Android back button press
      BackHandler.addEventListener('hardwareBackPress', backAction);

      // Cleanup the event listener when screen loses focus
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [navigation])
  )


  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true)
    console.log("refreshingggg")
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };



  useEffect(() => {
    dispatch(KundliActions.getAllKundli())
  }, [dispatch]);

  console.log('kundlilistadata:::::KKKK', kundliListData,)


  const searchFilterFunction = text => {
    // Check if searched text is not blank
    // console.log("sambaba4",masterKundliListData)
    if (!masterKundliListData) {
      console.log("CheckKundliData::::KKK", masterKundliListData)
      return
    }

    if (text) {
      const newData = masterKundliListData.filter(function (item) {
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

  const handlePress = (item) => {
    const payload = {
      lang: t('lang'),
      kundliId: item?._id,
    }
    dispatch(KundliActions.getKundliData(payload))
    navigation.navigate('NewShowKundli', { kundliId: item?._id, })

  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1, paddingBottom: 20 }}>
      <MyLoader isVisible={isLoading} />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginVertical: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.black_color7,
          padding: 2,
        }}>
        <View style={{ margin: getFontSize(0.5) }}>
          <Ionicons name="search" color={colors.black_color7} size={25} />
        </View>

        <TextInput
          placeholder={t("s_k_b_n")}
          placeholderTextColor={colors.black_color5}
          onChangeText={text => searchFilterFunction(text)}
          style={{
            fontSize: getFontSize(1.5),
            color: colors.black_color7,
            ...FontsStyle.font,
            padding: 5,
            flex: 1
          }}
        />



      </View>


      <View style={{ width: '95%', alignSelf: 'center', flex: 1 }}>
        <Text allowFontScaling={false}
          style={{
            marginBottom: 10,
             ...FontsStyle.font,
            color: '#000000'
          }}>
          {t("recent_kundli")}
        </Text>
         {kundliListData && (
          <FlatList
            data={kundliListData}
            renderItem={({ item, index }) => (
              <ImageBackground
                style={{
                  height: SCREEN_HEIGHT * 0.18,  // or fixed like height: 150
                  width: SCREEN_WIDTH * 0.9,     // or fixed like width: 350
                  padding: getFontSize(3),
                  marginBottom: 5,
                  borderRadius: 5,
                  overflow: 'hidden',
                  alignSelf: "center"
                }}
                source={require("../../assets/images/LETTER2.png")}
                imageStyle={{ borderRadius: 5 }}
              >
                <TouchableOpacity
                  onPress={() => handlePress(item)}
                  activeOpacity={0.6}
                  key={index}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: getFontSize(3),
                    paddingVertical: getFontSize(1),
                    // backgroundColor: colors.background_theme1,
                    borderRadius: 5,
                    shadowColor: colors.black_color4,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                  }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: colors.black_color,
                        borderWidth: 2,
                     
                        paddingLeft: 12,
                        paddingRight: 8,
                        padding: 5,
                        borderRadius: width * 0.1,
                        borderColor: 'red',
                         ...FontsStyle.font,
                         fontSize: normalize(12)
                      }}>
                      {item.name.charAt(0)}
                    </Text>
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                         
                          color: colors.black_color,
                          ...FontsStyle.fontBold,
                           fontSize: normalize(13),
                        }}>
                        <TranslateText title={item.name?.length > 25 ? `${item.name.slice(0,25)}...` : item.name}></TranslateText>
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                         
                          color: colors.black_color9,
                          ...FontsStyle.fontBold,
                           fontSize: normalize(10),
                        }}>
                        <TranslateText
                          title={`${moment(item?.dob).format('DD MMM YYYY')} ${moment(
                            item.tob
                          ).format('hh:mm A')}`}
                        />
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                         
                          width: width * 0.5,
                          color: colors.black_color9,
                          ...FontsStyle.fontBold,
                           fontSize: normalize(10),
                       
                        }}>
                        <TranslateText title={item.place?.length > 20 ? `${item.place.slice(0, 29)}...` : item.place} />
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{ right: -8, position: 'absolute', zIndex: 10 }}
                    onPress={() => dispatch(KundliActions.deleteKundli(item?._id))}>
                    <MaterialIcons
                      name="delete"
                      color={colors.black_color9}
                      size={getFontSize(2.2)}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </ImageBackground>
            )}
            ListEmptyComponent={NoDATA()}
          />
        )}

      </View>

      <TouchableOpacity style={{ paddingVertical: 14, backgroundColor: colors.background_theme2, borderRadius: 35, alignItems: 'center', justifyContent: 'center', width: '90%', alignSelf: 'center' }} onPress={() => {
        navigation.navigate('NewKundli')
      }}>
        <Text style={{ color: 'white', fontSize: 14, ...FontsStyle.fontfamily }}> <TranslateText title={'Create New Kundli'} /></Text>

      </TouchableOpacity>
    </View>
  );
  function NoDATA() {
    return (
      <View style={{ justifyContent: 'center', alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.35 }}>
        <Text style={{ ...Fonts.black11InterMedium, fontSize: 13 }}> <TranslateText title={'No Recent Kundli'} /></Text>

      </View>
    )
  }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  kundliListData: state.kundli.kundliListData,
  masterKundliListData: state.kundli.masterKundliListData
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(OpenKundli);
