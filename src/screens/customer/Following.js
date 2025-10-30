import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { api_getfollowinglist, api_url, colors, fonts, getFontSize, img_url } from '../../config/Constants1';
import MyHeader from '../../components/MyHeader';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MyLoader from '../../components/MyLoader2';
import { useTranslation } from 'react-i18next';
import { getFSInfo } from 'react-native-fs';
import * as CustomerActions from '../../redux/actions/CustomerActions'
import { base_url, FontsStyle } from '../../config/constants';
import { Sizes, Fonts, Colors } from '../../assets/style';
import * as ChatActions from '../../redux/actions/ChatActions'
import * as AstrologerActions from '../../redux/actions/AstrologerActions'
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen';
import TranslateText from '../language/TranslateText';

const { width, height } = Dimensions.get('screen');

const Following = ({ navigation, route, dispatch, followingListData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    dispatch(CustomerActions.getFollowingList())
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('following')}
          socialIcons={false}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, [dispatch]);

  

  

  const renderItem = ({ item, index }) => {
    console.log(item,'all data ')
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('astrologerDetailes', {
            _id: item?._id,
          })}
        >
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.row} >
            <Image source={{ uri: item?.profileImage }} style={{ width: width * 0.2, height: width * 0.2, borderRadius: 10000 }} />
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text allowFontScaling={false} style={{ ...FontsStyle.font,fontWeight:'bold' }}><TranslateText title={item.astrologerName} /></Text>
              <Text allowFontScaling={false} style={{ ...FontsStyle.font}}><TranslateText title={item.gender} /></Text>
            </View>
       
        </View>
        </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() =>{
            const payload = {
              following: true,
              astrologerId:item?._id
            }
            dispatch(AstrologerActions.onFollowUnfollowAstrologer(payload))}} style={{...styles.actions,borderRadius:10}}>
            <Text allowFontScaling={false} style={{...FontsStyle.font,color:Colors.white }}><TranslateText title={'Unfollow'} /></Text>
          </TouchableOpacity>

        {/* <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => onChat(item)} style={styles.actions}>
            <Text style={{ ...Fonts.white14RobotoMedium }}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onCall(item)} style={[styles.actions, { marginLeft: Sizes.fixPadding }]}>
            <Text style={{ ...Fonts.white14RobotoMedium }}>Call</Text>
          </TouchableOpacity>
        </View> */}

      </TouchableOpacity>
    );
  };

  const _listEmptyComponent = () => {
    return (
      <View style={{alignItems:"center",justifyContent:"center",paddingVertical:SCREEN_HEIGHT*0.3}}>

      <View>
        <Image
        style={{height:SCREEN_HEIGHT*0.2,width:SCREEN_WIDTH*0.4}}
        source={require('../../assets/images/emptybox.png')}/>
      </View>
        <Text style={{color:"black",fontWeight:"400",fontSize:15}}>No Data Available </Text>
    </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      {followingListData && (
        <FlatList
          data={followingListData}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={_listEmptyComponent}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  followingListData: state.customer.followingListData,
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Following);

const styles = StyleSheet.create({
  container: {
    flex: 0,

    backgroundColor: colors.background_theme1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: colors.black_color2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#dadada"
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: Sizes.fixPadding
  },
  actions: {
    backgroundColor: Colors.primaryLight,
    width: '30%',
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.fixPadding * 0.8,
    alignSelf:'flex-end'
  }

})
