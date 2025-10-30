import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  TextInput,
  Linking,
  FlatList,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import MyHeader from '../../components/MyHeader';
import {
  api_addwallet,
  api_getRechargeplans,
  api_url,
  colors,
  fonts,
  vedic_images,
  create_phonepe_order,
  phonepe_success,
  getFontSize,
} from '../../config/Constants1';
import {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {success_toast, warnign_toast} from '../../components/MyToastMessage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import {useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyLoader from '../../components/MyLoader2';
import * as HistoryActions from '../../redux/actions/HistoryActions'
import {useTranslation} from 'react-i18next';
import {showNumber, showToastMessage} from '../../utils/services';
import {Sizes, Fonts, Colors} from '../../assets/style';
import {Input} from '@rneui/themed';
import {SCREEN_HEIGHT} from '../../config/Screen';
import moment from 'moment';
const {width, height} = Dimensions.get('screen');

const PursharthaWallet = ({
  navigation,
  route,
  customerData,
  dispatch,
  purusharthaHistory,
}) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [firstOffer, setFirstOffer] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('Divya Rashi Wallet')}
          navigation={navigation}
          socialIcons={false}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(HistoryActions.getPurusharthaHistory());
  }, [dispatch]);

  console.log('purusharthaHistory :: ',purusharthaHistory)

  const add_money = () => {
   
    const amountRegex = /^\d+(\.\d+)?$/;
    if (amount.length == 0) {
      warnign_toast('Please Enter your amount to add your wallet.');
      return;
    } else if (amount < 1) {
      warnign_toast('Minimum amount required is INR 50');
      return;
    } else if (!amountRegex.test(amount)) {
      warnign_toast('Please enter valid amount');
      return;
    } else if(parseFloat(customerData?.wallet_balance) + parseFloat(amount) >= 5000) {
      showToastMessage({ message:"Wallet Balance Maximum 5000"});
      return;
    } else {
      navigation.navigate('WalletGstAmount', {amount: amount});
    }
  };

  return (
   <View style={{flex:1,backgroundColor:1}}>
      <MyLoader isVisible={isLoading} />

      <View style={{flex: 1}}>
      
          <View style={{marginTop: 5}}>
            {/* <TouchableOpacity style={{ padding: 10, marginLeft: 300 }} onPress={() => navigation.navigate('walletHistroy')}>
            <Text style={{ fontSize: 18, fontWeight: 800 }}>Wallet History</Text>
          </TouchableOpacity> */}
          </View>
         
          {/*  */}
          {walletHistoryInfo()}
      </View>

    
    </View>
  );

  function walletHistoryInfo() {
          const _listEmtpy = () => {
              return(
                  <View style={{alignSelf:'center', paddingVertical:Sizes.fixPadding * 10}}>
                      <Text style={{color:'black'}}>No History</Text>
                  </View>
              )
          }
         
          const renderItem = ({ item, index }) => {
              return (
                  <View style={styles.itemContainer}>
                      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                      <Text style={{...styles.text, fontWeight:'bold'}}>
                          {`${item?.status == 'Add' ? 'Added' : 'Deducted'} ${item?.price} Purshartha By offering ${item?.name}`}
                          </Text>
                          <Text style={{color: item?.status == 'Add' ? 'green' : 'red',fontSize:18}}>{`${item?.status == 'Add' ? '+' : '-'}${item?.price}`}</Text>
                          </View>
                      <Text style={styles.text}>Date: {moment(item?.createdAt).format('DD MMM YYYY')}</Text>
                      <Text style={styles.text}>Time: {moment(item?.createdAt).format('hh:mm A')}</Text>
                     
                      
                  </View>
              )
          }
          return (
  
              <View>
                  <FlatList
                      data={purusharthaHistory}
                      renderItem={renderItem}
                     
                      ListEmptyComponent={_listEmtpy}
                  />
              </View>
          )
      }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  rechargeOfferList: state.customer.rechargeOfferList,
  purusharthaHistory: state.history.purusharthaHistory
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(PursharthaWallet);

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: 50,
    backgroundColor: colors.background_theme1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  amountInput: {
    // textAlign: 'center',
    fontSize: getFontSize(1.8),
    width: '70%',
    fontFamily: fonts.medium,
    color: colors.black_color,
  },

  box1: {
    width: width * 0.25,
    height: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    transform: [{rotate: '-50deg'}],
    overflow: 'hidden',
    right: width * 0.18,
    top: width * 0.05,
  },
  bannerText: {
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: getFontSize(1),
    textAlign: 'center',
  },

  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rowText: {
    fontSize: 14,
    color: colors.black_color7,
    fontFamily: fonts.medium,
  },
  itemContainer: {
    backgroundColor: Colors.grayLight,
    marginBottom: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
},
invoiceId: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.fixPadding * 0.5,
    paddingVertical: Sizes.fixPadding * 0.3,
    borderRadius: 1000,
    elevation: 3,
    shadowColor: Colors.blackLight,
    alignSelf: 'flex-start',
    marginBottom: Sizes.fixPadding * 0.8
},
text: {
    ...Fonts.blackLight14RobotoRegular,
    marginBottom: Sizes.fixPadding * 0.3,
    fontSize: 13
},
amountContainer: {
    position: 'absolute',
    top: Sizes.fixPadding,
    right: Sizes.fixPadding
}
});
