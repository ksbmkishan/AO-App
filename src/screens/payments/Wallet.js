import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import MyHeader from '../../components/MyHeader';
import {
  colors,
  fonts,
  getFontSize,
} from '../../config/Constants1';
import {useState} from 'react';
import {connect} from 'react-redux';
import {success_toast, warnign_toast} from '../../components/MyToastMessage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import MyLoader from '../../components/MyLoader2';
import {useTranslation} from 'react-i18next';
import {showNumber, showToastMessage} from '../../utils/services';
import {Sizes, Fonts, Colors} from '../../assets/style';
import {Input} from '@rneui/themed';
import {SCREEN_HEIGHT} from '../../config/Screen';
import { FontsStyle } from '../../config/constants';
const {width, height} = Dimensions.get('screen');

const Wallet = ({
  navigation,
  route,
  customerData,
  dispatch,
  rechargeOfferList,
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
          title={t('Divya Rashi')}
          navigation={navigation}
          socialIcons={false}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
          PursharthaWallet={true}
          DivyaWallet={true}
        />
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(CustomerActions.getWalletRechargeOfferList());
  }, [dispatch]);

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
    <ImageBackground
      source={require('../../assets/icons/wallet.png')}
      style={{flex: 1}}>
      <MyLoader isVisible={isLoading} />

      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 5}}>
            {/* <TouchableOpacity style={{ padding: 10, marginLeft: 300 }} onPress={() => navigation.navigate('walletHistroy')}>
            <Text style={{ fontSize: 18, fontWeight: 800 }}>Wallet History</Text>
          </TouchableOpacity> */}
          </View>
          <View
            style={{alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.02}}>
            <Text style={{...FontsStyle.font,fontWeight:'800' ,fontSize: 16}}>
              {t("Divya Rashi")}
            </Text>
          </View>
          <Text
            allowFontScaling={false}
            style={{
              color: colors.black_color,
              ...FontsStyle.fontfamily,
              fontWeight:'bold',
              fontSize: 26,
              alignSelf: 'center',
              marginTop: SCREEN_HEIGHT * 0.027,
              marginBottom: SCREEN_HEIGHT * 0.01,
            }}>
            {/* {t('available_balance')}:{' '} */}
            <Text
              allowFontScaling={false}
              style={{color: 'black', fontWeight: '500',...FontsStyle.fontfamily}}>
              {showNumber(customerData?.wallet_balance)}
            </Text>
          </Text>
          <View
            style={{
              flex: 0,
              width: '85%',
              padding: 15,
              borderRadius: 15,
              borderColor: colors.black_color8,
              borderWidth: 1,
              borderColor: colors.background_theme2,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
              backgroundColor: 'white',
              paddingBottom: SCREEN_HEIGHT * 0.05,
            }}>
            <View style={{paddingBottom: SCREEN_HEIGHT * 0.02}}>
              <Text
                style={{color: colors.background_theme2, fontWeight: '500',...FontsStyle.fontfamily,fontWeight:'800'}}>
                {t("Add Money to your Wallet")}
              </Text>
            </View>

            <Input
              value={amount}
              placeholder={t('Enter Your Amount')}
              placeholderTextColor={colors.grey_color}
              keyboardType="number-pad"
              maxLength={6}
              returnKeyType="done"
              onChangeText={setAmount}
              inputStyle={styles.amountInput}
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: colors.black_color8,
                width: '90%',
                alignSelf: 'center',
              }}
              leftIcon={
                <Text style={{...FontsStyle.font, fontSize: 18}}>
                  ₹{' '}
                </Text>
              }
              cursorColor={Colors.primaryDark}
            />

            <TouchableOpacity
              onPress={() => add_money()}
              style={{
                color: 'black',
                backgroundColor: colors.background_theme2,
                padding: 9,
                borderRadius: 20,
                width: '50%',
                alignItems: 'center',
              }}
              activeOpacity={0.8}>
              <Text
                allowFontScaling={false}
                style={{color: 'white', fontSize: getFontSize(1.6), ...FontsStyle.fontfamily, fontWeight:'800'}}>
                {t('Add')}
              </Text>
            </TouchableOpacity>
          </View>

          {imageData == '0' && (
            <TouchableOpacity
              style={{
                width: width * 0.95,
                height: width * 0.32,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.black_color,
                marginBottom: 20,
                overflow: 'hidden',
                padding: 5,
              }}
              onPress={() =>
                navigation.navigate('walletgstoffer', {
                  data: firstOffer[0]?.recharge_of,
                  data2: firstOffer[0]?.recharge_get,
                })
              }>
              <ImageBackground
                source={require('../../assets/images/permotional_banner.jpeg')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover">
                <View
                  style={{
                    width: '50%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 18,
                      color: colors.black_color8,
                      ...FontsStyle.fontfamily,
                      textAlign: 'center',
                    }}>
                    Get ₹{' '}
                    {firstOffer && parseFloat(firstOffer[0]?.recharge_get)}.0
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 13,
                      color: colors.black_color8,
                      ...FontsStyle.fontfamily,
                      textAlign: 'center',
                    }}>
                    First Recharge offer{'\n'}Recharge with {'\n'}₹{' '}
                    {firstOffer && parseFloat(firstOffer[0]?.recharge_of)}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {rechargeOfferList &&
              rechargeOfferList.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    if(customerData?.wallet_balance + item?.amount <= 5000) {
                      navigation.navigate('WalletGstAmount', {
                        amount: item?.amount,
                        rechargePlanId: item?._id,
                      })
                    } else {
                      showToastMessage({ message:"Wallet Balance maximum 5000"})
                    }
                    
                  }
                  }
                  key={index}
                  style={{
                    flex: 0,
                    width: '40%',
                    height: width * 0.18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: Sizes.fixPadding,
                    backgroundColor: colors.background_theme1,
                    marginHorizontal: '5%',
                    marginBottom: '10%',
                    overflow: 'hidden',
                    elevation: 5,
                    shadowColor: Colors.blackLight,
                  }}>
                  <View style={styles.box1}>
                    <Text
                      allowFontScaling={false}
                      style={
                        styles.bannerText
                      }>{`Extra ${item?.percentage}%`}</Text>
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...Fonts.black16RobotoMedium,
                      color: Colors.blackLight,
                    }}>
                    ₹ {item?.amount}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

         
        </ScrollView>
      </View>

      <View style={{flex: 0}}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: getFontSize(1.4),
            color: colors.black_color,
            ...FontsStyle.fontfamily,
            fontWeight:'800',
            textAlign: 'center',
          }}>
          {t('gst_excluded')}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: getFontSize(1),
            color: colors.black_color,
            ...FontsStyle.fontfamily,
            textAlign: 'center',
            width: '95%',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          {t('for_payment')}
        </Text>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  rechargeOfferList: state.customer.rechargeOfferList,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

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
    ...FontsStyle.fontfamily,
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
    ...FontsStyle.fontfamily,
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
    ...FontsStyle.fontfamily,
  },
});
