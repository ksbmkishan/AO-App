import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { Colors, Fonts, Sizes } from '../../assets/style';
import Stars from 'react-native-stars';
import { ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '../../config/Constants1';
import { base_url } from '../../config/constants';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MyHeader from '../../components/MyHeader';


const { width } = Dimensions.get('screen');

let timeout;

const AstroForCall = ({ callListData, navigation, dispatch, isRefreshing, isMoreLoading,route }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const payload = {
      expertise: route?.params?.data
    }
    console.log('expertise ',payload)
    dispatch(AstrologerActions.getCallAstroData(payload));
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(AstrologerActions.getCallAstroData());
      return () => setSearch('');
    }, [dispatch])
  );

  const searchFilterFunction = text => {
    setSearch(text);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const payload = {
        search: text
      }
      dispatch(AstrologerActions.getCallAstroData(payload));
      clearTimeout(timeout);
    }, 1500);
  };

  useEffect(() => {
    setNoData(callListData?.length === 0 && search.length > 0);
  }, [callListData, search]);

  const rounditem = item => {
    const wallet = item.toString();
    const slice11 = wallet.slice(0, 4);
    return slice11;
  };

  const getStatusColor = status => {
    switch (status) {
      case 'online':
        return '#29bf12';
      case 'offline':
        return '#00000040';
      case 'busy':
        return '#fca311';
      default:
        return 'white';
    }
  };

  const renderItems = ({ item }) => {




    return (

      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, }}>
        <View style={{ borderRadius: 10, overflow: "hidden", backgroundColor: "white", elevation: 4, marginVertical: SCREEN_HEIGHT * 0.01, }}>
          <View style={{ flexDirection: "row", gap: 6, paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.02, backgroundColor: "#FFDBBB" }}>
            <View style={{}}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderRadius: 100 }}
                source={{ uri:  item.profileImage }} />
            </View>
            <View style={{}}>
              <View style={{ paddingBottom: SCREEN_HEIGHT * 0.003 }}>
                <Text style={{...Fonts.PoppinsMedium}}>{item.astrologerName}</Text>
              </View>
              <View>
                <Text style={{ ...Fonts.PoppinsRegular}}>{item?.language.join(', ')}</Text>
              </View>


              <View style={{ flexDirection: "row", alignItems: "center", gap: 4}}>

                <View style={{ flexDirection: "row", paddingTop: SCREEN_HEIGHT * 0.003 }}>
                  <Stars
                    default={item?.rating ?? 1}
                    disabled
                    count={5}
                    half={true}
                    starSize={20}
                    fullStar={<Ionicons name={'star'} size={14} color={Colors.primaryLight} />}
                    emptyStar={<Ionicons name={'star-outline'} size={14} color={Colors.primaryLight} />}
                    halfStar={<Ionicons size={14} name={'star-half'} style={{ color: Colors.primaryLight }} />}
                  />
                </View>

                <Text style={{...Fonts.PoppinsRegular}}>{item?.totalRating}</Text>
              </View>

              <View style={{  }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 2, paddingTop: SCREEN_HEIGHT * 0.005 }}>
                  <AntDesign name="adduser" size={15} color={'black'} />
                  <Text style={{...Fonts.PoppinsRegular}}>{item?.follower_count}  {t("Followers")}</Text>
                  <AntDesign name="clockcircleo" size={13} color={'black'} />
                  <Text style={{...Fonts.PoppinsRegular}}>{item.experience}  {t("Year Experience")} </Text>


                  {/* < Entypo name="eye" size={20} color={"black"} /> */}


                </View>
              </View>
              
            </View>

          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.12 }}>

            <View style={{ justifyContent: "center", alignItems: "center" }} >
              <Text style={{ color: getStatusColor(item.chat_status), fontSize: 10, fontWeight: "500" }}>{t("Available Now")}</Text>
              <Text style={{ color: "gray", fontSize: 10, fontWeight: "500" }}>{t("Consult on Call")}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 10, fontWeight: "500" }}>   {`₹ ${rounditem(parseFloat(item?.call_price) + parseFloat(item?.commission_call_price))}/min`}</Text>
              <Text style={{ color: "gray", fontSize: 10, fontWeight: "500" }}>{t("Consultation Call")}</Text>
            </View>


          </View>

          <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, paddingBottom: SCREEN_HEIGHT * 0.02 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => 
                navigation.navigate('astrologerDetailes', {
                  _id: item?._id,
                  type: 'call',

                })
              }
              style={{ justifyContent: "center", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.008, borderRadius: 6, backgroundColor: "#D56A14" }}>
              <Text style={{ fontSize: 12, color: "white", fontWeight: "500" }}>{t("Consult to Astrologer now")}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    )

  }





  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      {/* <MyLoader isVisible={isLoading} /> */}
      <MyHeader title={'All Astrologer'} navigation={navigation} />
      <View style={{ flex: 1 }}>
        {searchInfo()}
        {noData ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.white_color, fontSize: 16, fontFamily: fonts.medium, color: "black" }}>
              {t('No Data Found')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={callListData}
            renderItem={renderItems}
            keyExtractor={item => item?._id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={{ height: 50 }}>
                {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
              </View>
            }
            onEndReached={() => dispatch(AstrologerActions.getMoreCallAstroData(search))}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
              setSearch('');
              dispatch(AstrologerActions.onRefreshCallAstrologer());
            }} />}
          />
        )}
      </View>
    </View>
  );

  function searchInfo() {
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: colors.background_theme1,
          paddingVertical: 10,
        }}>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#FFDBBB',
            borderWidth: 1,
            borderColor: "gray"
          }}>
          <Ionicons name="search" color={colors.black_color6} size={22} />
          <TextInput
            value={search}
            placeholder={t("Search Astrologer by name")}
            placeholderTextColor={colors.black_color6}
            onChangeText={text => searchFilterFunction(text)}
            style={{
              width: '100%',
              fontFamily: fonts.medium,
              color: colors.black_color8,
              padding: 8,
            }}
          />
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  callListData: state.astrologer.callListData,
  customerData: state.customer.customerData,
  isRefreshing: state.setting.isRefreshing,
  isMoreLoading: state.setting.isMoreLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstroForCall);















