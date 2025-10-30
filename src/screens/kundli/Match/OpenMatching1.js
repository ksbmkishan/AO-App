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
  ImageBackground
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { api2_my_kundali, api_url, delete_kundali, kundali_search, colors, fonts, getFontSize } from '../../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyLoader from '../../../components/MyLoader2';
import moment from 'moment';
const { width, height } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { Fonts, Sizes } from '../../../assets/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { FontsStyle, normalize } from '../../../config/constants';

const OpenMatching1 = ({ navigation, dispatch, kundliListData, masterKundliListData, NewMatchingData }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(search);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: t("Previous Matching"),
    });
  }, []);

  useEffect(() => {
    dispatch(KundliActions.getMatchingData())
  }, [dispatch]);


  const searchFilterFunction = text => {
    // Check if searched text is not blank

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

  const _listEmpty = () => {
    return (
      <View style={{ alignSelf: 'center', paddingVertical: SCREEN_HEIGHT * 0.3 }}>
        <Text style={{ color: 'black' }}>{' No Found Matching'}</Text>
      </View>
    )
  }

  const handleRefresh = () => {
    setIsRefreshing(true);

    dispatch(KundliActions.getMatchingData());
    setIsRefreshing(false);
  };

  const handleMatching = (item) => {
    console.log('adfda', item);

    const femaleKundliData = {
      name: item.FemaleName,
      gender: 'female',
      dob: item.FemaledateOfBirth,
      tob: item.FemaletimeOfBirth,
      place: item?.FemaleplaceOfBirth,
      lat: item?.Femalelatitude,
      lon: item?.Femalelongitude,
    };

    const maleKundliData = {
      name: item.MaleName,
      gender: 'male',
      dob: item.MaledateOfBirth,
      tob: item.MaletimeOfBirth,
      place: item?.MaleplaceOfBirth,
      lat: item?.Malelatitude,
      lon: item?.Malelongitude,
    };

    const matchingPayload = {
      m_day: parseInt(moment(item.MaledateOfBirth).format('D')),
      m_month: parseInt(moment(item.MaledateOfBirth).format('M')),
      m_year: parseInt(moment(item.MaledateOfBirth).format('YYYY')),
      m_hour: parseInt(moment(item.MaletimeOfBirth).format('hh')),
      m_min: parseInt(moment(item.MaletimeOfBirth).format('mm')),
      m_lat: item.Malelatitude,
      m_lon: item.Malelongitude,
      m_tzone: 5.5,
      f_day: parseInt(moment(item.FemaledateOfBirth).format('D')),
      f_month: parseInt(moment(item.FemaledateOfBirth).format('M')),
      f_year: parseInt(moment(item.FemaledateOfBirth).format('YYYY')),
      f_hour: parseInt(moment(item.FemaletimeOfBirth).format('hh')),
      f_min: parseInt(moment(item.FemaletimeOfBirth).format('mm')),
      f_lat: item.Femalelatitude,
      f_lon: item.Femalelongitude,
      f_tzone: 5.5,
    }


    dispatch(KundliActions.setFemaleKundliData(femaleKundliData))
    dispatch(KundliActions.setMaleKundliData(maleKundliData))
    dispatch(KundliActions.getKundliMatchingReport(matchingPayload))

    navigation.navigate("BasicMatching");
  }

  const handel_delete = (id) => {
    console.log(id);
    const payload = {
      id: id,
    }

    dispatch(KundliActions.onMatchingDelete(payload));

  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
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
          <Ionicons name="search" color={colors.black_color7} size={25} />
        </TouchableOpacity>

        <TextInput
          placeholder={t("s_k_b_n")}
          placeholderTextColor={colors.black_color5}
          onChangeText={text => searchFilterFunction(text)}
          style={{

            color: colors.black_color7,
            ...FontsStyle.fontfamily,
            padding: 5,
            flex: 1,
            fontSize: normalize(14),
          }}
        />



      </View>

      <View style={{ paddingHorizontal: Sizes.fixPadding, flex: 1 }}>
        <Text
          style={{
            ...FontsStyle.fontfamily,
            color: 'black'
          }}>
          {t("recent_kundli")}
        </Text>
        {NewMatchingData && (
          <FlatList
            data={NewMatchingData}
            ListEmptyComponent={_listEmpty}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={['#007AFF']} // Customize the loading spinner color
              />
            }

            renderItem={({ item, index }) => (
              <ImageBackground
                style={{
                  height: SCREEN_HEIGHT * 0.18,  // or fixed like height: 150
                  width: SCREEN_WIDTH * 0.95,     // or fixed like width: 350
                  padding: getFontSize(3),
                  marginBottom: 5,
                  borderRadius: 5,
                  overflow: 'hidden',
                  alignSelf: "center"
                }}
                source={require("../../../assets/images/LETTER2.png")}
                imageStyle={{ borderRadius: 5 }}
              >
                <TouchableOpacity
                  onPress={() => handleMatching(item)}
                  activeOpacity={0.6}
                  key={index}
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 35,
                    paddingVertical: 10,
                    marginBottom: 15,
                    borderRadius: 5,
                    shadowColor: colors.black_color4,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    // backgroundColor:'red',
                    left: 0
                  }}>
                  <View
                    style={{ flex: 0, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Sizes.fixPadding * 0.2 }}>

                    <View style={{ marginLeft: 10, width: '35%' }}>
                      <Text allowFontScaling={false}
                        style={{

                          color: colors.black_color,
                          ...FontsStyle.font,
                          fontWeight: 'bold',
                          fontSize: normalize(11),
                        }}>
                        {item.MaleName?.length > 14 ? item.MaleName.substring(0, 14) + '...'
                          : item?.MaleName}

                      </Text>
                      <Text allowFontScaling={false}
                        style={{

                          color: colors.black_color,
                          ...FontsStyle.fontfamily,
                          fontWeight: 'bold',
                          fontSize: normalize(9),
                        }}>
                        {`${moment(item.MaledateOfBirth).format("DD-MM-YYYY")} ${moment(item.MaletimeOfBirth).format("HH:mm")}`}

                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: colors.black_color,
                          ...FontsStyle.fontfamily,
                          fontWeight: 'bold',
                          fontSize: normalize(10),
                        }}
                      >
                        {item?.MaleplaceOfBirth?.length > 15
                          ? item.MaleplaceOfBirth.substring(0, 15) + '...'
                          : item?.MaleplaceOfBirth}
                      </Text>
                    </View>
                    <View style={{ paddingHorizontal: Sizes.fixPadding * 2 }}>
                      <FontAwesome name='heart' size={20} color={'red'} />
                    </View>
                    <View style={{ marginLeft: 10, width: '35%' }}>
                      <Text allowFontScaling={false}
                        style={{

                          color: colors.black_color,
                          ...FontsStyle.font,
                          fontWeight: 'bold',
                          fontSize: normalize(11),
                        }}>
                         {item.FemaleName?.length > 14 ? item.FemaleName.substring(0, 14) + '...'
                          : item?.FemaleName}

                      </Text>
                      <Text allowFontScaling={false}
                        style={{

                          color: colors.black_color,
                          ...FontsStyle.fontfamily,
                          fontWeight: 'bold',
                          fontSize: normalize(9),
                        }}>
                        {`${moment(item.FemaledateOfBirth).format("DD-MM-YYYY")} ${moment(item.FemaletimeOfBirth).format("HH:mm")}`}

                      </Text>
                      <Text allowFontScaling={false}
                        style={{

                          color: colors.black_color,
                          ...FontsStyle.fontfamily,
                          fontWeight: 'bold',
                          fontSize: normalize(9),
                        }}>
                        {item?.FemaleplaceOfBirth?.length > 15
                          ? item.FemaleplaceOfBirth.substring(0, 15) + '...'
                          : item?.FemaleplaceOfBirth}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{ right: -10, position: 'absolute' }}
                    onPress={() => handel_delete(item._id)}>
                    <MaterialIcons
                      name="delete"
                      color={colors.black_color}
                      size={25}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </ImageBackground>
            )}
          />
        )}
      </View>

    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  kundliListData: state.kundli.kundliListData,
  masterKundliListData: state.kundli.masterKundliListData,
  NewMatchingData: state.kundli.NewMatchingData
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(OpenMatching1);
