import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert, ImageBackground
} from 'react-native';
import React from 'react';
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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts } from '../../assets/style';

const OpenKundli = ({ navigation, dispatch, kundliListData, masterKundliListData }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(search);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: t("previous_kundli"),
    });
  }, []);

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

  // console.log(kundliListData, 'kundlilistadata')


  const searchFilterFunction = text => {
    // Check if searched text is not blank
    // console.log("sambaba4",masterKundliListData)
    if (!masterKundliListData) {
      // console.log("sambaba333",masterKundliListData)
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


  const handel_delete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'No',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Perform delete action here
            handel_confirm(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handel_confirm = (id) => {

    const payload = {
      id: id,
    }

    dispatch(KundliActions.deleteKundli(id));
  }

  const handleClick = (id) => {
    dispatch(KundliActions.setKundliId(id));
    navigation.navigate('NewShowKundli');
  }


  return (

    <View style={{ flex: 1, backgroundColor: '#F8E8D9' }}

    // source={require('../../assets/images/kundlibg.jpg')}

    >
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
          backgroundColor: '#FFDBBB',
          padding: 5,
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
            fontFamily: fonts.medium,
            padding: 5,
            flex: 1
          }}
        />



      </View>
      <View style={{ width: '95%', alignSelf: 'center', flex: 1 }}>
        <Text allowFontScaling={false}
          style={{
            fontSize: getFontSize(1.6),
            marginBottom: 10,
            fontFamily: fonts.medium,
            color: colors.black_color7,
          }}>
          {t("recent_kundli")}
        </Text>
        {kundliListData && (
          <FlatList
            data={kundliListData}
            renderItem={({ item, index }) => (
              <ImageBackground source={require('../../assets/images/LETTER2.png')}>
                <TouchableOpacity
                  onPress={() => handleClick(item?._id)}
                  activeOpacity={0.6}
                  key={index}
                  style={{
                    flex: 1,
                    paddingVertical: SCREEN_WIDTH * 0.1,

                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: getFontSize(1.2),
                    paddingTop: getFontSize(1.3),
                    // backgroundColor: colors.background_theme1,
                    marginBottom: 15,
                    borderRadius: 5,
                    shadowColor: colors.black_color4,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                  }}>
                  <View
                    style={{ flex: 0, flexDirection: 'row', alignItems: 'center', left: SCREEN_WIDTH * 0.14, gap: 4, top: SCREEN_HEIGHT * 0.025 }}>
                    <Text allowFontScaling={false} style={{ color: colors.black_color, borderWidth: 2, fontSize: getFontSize(1.6), paddingLeft: 12, paddingRight: 8, padding: 5, borderRadius: width * 0.1, borderColor: 'red' }}>{item.name.charAt(0)}</Text>
                    <View style={{}}>
                      <Text allowFontScaling={false}
                        style={{
                          ...Fonts.PoppinsMedium,
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 16

                        }}>
                        {item.name}
                      </Text>
                      <Text allowFontScaling={false}
                        style={{
                          ...Fonts.PoppinsMedium,
                          color: 'black'

                        }}>
                        {`${moment(item?.dob).format('DD MMM YYYY')} ${moment(item.tob).format("HH:mm A")}`}
                      </Text>
                      <Text allowFontScaling={false}
                        style={{
                          ...Fonts.PoppinsMedium,
                          color: 'black'
                        }}>
                        {item.place.split('').slice(0, 16).join('')}{item.place.split('').length > 6 ? '...' : ''}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => handel_delete(item?._id)}>
                      <MaterialIcons
                        name="delete"
                        color={colors.black_color}
                        size={getFontSize(2.2)}
                      />
                    </TouchableOpacity>
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
                  {/* <TouchableOpacity
                  style={{ right: 10, }}
                  onPress={() => dispatch(KundliActions.deleteKundli(item?._id))}>
                  <MaterialIcons
                    name="delete"
                    color={colors.black_color7}
                    size={getFontSize(2.2)}
                  />
                </TouchableOpacity> */}
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
  masterKundliListData: state.kundli.masterKundliListData
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(OpenKundli);
