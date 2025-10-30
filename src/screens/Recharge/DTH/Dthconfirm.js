import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { showToastMessage } from '../../../utils/services';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import MyHeader from '../../../components/MyHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../config/Constants1';

const DthConfirm = ({ route, dispatch, navigation }) => {
  const { amount, product_code, product_name, subscriberId } = route?.params || {};
  const customerData = useSelector(state => state.customer.customerData);

  const [updateAmount, setUpdateAmount] = useState(amount || '');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const validate = () => {
    if (!updateAmount || isNaN(updateAmount) || parseFloat(updateAmount) <= 0) {
      showToastMessage({ message: "Please enter a valid amount" });
      return false;
    }
    return true;
  };

  const handleOpen = () => {
    if (validate()) {
    //   setIsModalVisible(true);
    Walletandphonepay();
    }
  };

  const Walletandphonepay = () => {
    if (validate()) {
      // requestPermission().then((hasPermission) => {
      //   if (hasPermission) {
      //     const payload = {
      //       number: subscriberId,
      //       amount: updateAmount,
      //       product_code: product_code,
      //       latitude: 28.4521,
      //       longitude: 77.5241,
      //       billType: 'DTH RECHARGE',
      //       productName: product_name,
      //       dispatch: dispatch
      //     };
      //     dispatch(RechargeActions.getRechargeData(payload));
      //   }
      // });



      const payload = {
        data: {
          number: subscriberId,
          product_code: product_code,
        },
        onComplete: () => navigation.navigate('DthInfo', { product_name, product_code, amount, subscriberId }),

      }

      dispatch(RechargeActions.getDTHInfo(payload));

    }
  };

  const getImage = (code) => {
    switch (code) {
      case '21': return require('../../../assets/images/dishtv.png');
      case '22': return require('../../../assets/images/airtel.png');
      case '23': return require('../../../assets/images/tatasky.png');
      case '24': return require('../../../assets/images/videocon.jpg');
      case '25': return require('../../../assets/images/sundirect.png');
      default: return null;
    }
  };

  const renderModal = () => {
    const balance = parseFloat(customerData?.wallet_balance || 0);
    const rechargeAmount = parseFloat(updateAmount || 0);
    const remainingAmount = (rechargeAmount - balance).toFixed(2);

    const isWalletSufficient = balance >= rechargeAmount;
    const isWalletPartiallySufficient = balance > 0 && balance < rechargeAmount;
    const isWalletZero = balance === 0;

    return (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Recharge is being processed...</Text>

            <View style={styles.walletInfo}>
              <Text style={styles.walletText}>
                Wallet Balance:{' '}
                <Icon name="currency-inr" size={14} color="black" />
                {customerData?.wallet_balance ?? '0.00'}
              </Text>
            </View>

            <View style={{ width: '100%' }}>
              {(isWalletSufficient || isWalletPartiallySufficient) && (
                <TouchableOpacity disabled style={styles.paymentOption}>
                  <Icon name="checkbox-marked" size={24} color="#007AFF" />
                  <Text style={styles.paymentText}>
                    Wallet (
                    <Icon name="currency-inr" size={14} color="black" />
                    {isWalletPartiallySufficient ? balance.toFixed(2) : rechargeAmount})
                  </Text>
                </TouchableOpacity>
              )}

              {(isWalletPartiallySufficient || isWalletZero) && (
                <TouchableOpacity disabled style={styles.paymentOption}>
                  <Icon name="checkbox-marked" size={24} color="#007AFF" />
                  <Text style={styles.paymentText}>
                    UPI / PhonePe (
                    <Icon name="currency-inr" size={14} color="black" />
                    {isWalletPartiallySufficient ? remainingAmount : rechargeAmount})
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                Walletandphonepay();
                setIsModalVisible(false);
              }}
              style={styles.payNowButton}
            >
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MyHeader title={'DTH'} navigation={navigation} />
      <View style={styles.infoContainer}>
        {getImage(product_code) && (
          <Image
            source={getImage(product_code)}
            style={{ width: 70, height: 70, resizeMode: 'contain', marginBottom: 10 }}
          />
        )}
        <Text style={styles.productName}>{product_name}</Text>
      </View>
      <View style={styles.separator} />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.vcLabel}>VC Number or Mobile No</Text>
        <Text style={{ color: 'black' }}>{subscriberId}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.amountWrapper}>
        <Text style={{ color: 'black', fontWeight: "700", marginBottom: 20 }}>Amount</Text>
        <TextInput
          value={updateAmount}
          onChangeText={setUpdateAmount}
          style={styles.input}
          placeholder='₹ Enter Amount'
          placeholderTextColor={'#aaa'}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.separator} />
      <TouchableOpacity onPress={handleOpen} style={styles.confirmButton}>
        <Text style={{ color: 'white' }}>Confirm</Text>
      </TouchableOpacity>

      {renderModal()}
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(DthConfirm);

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 40
  },
  productName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginHorizontal: 10
  },
  vcLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 8
  },
  amountWrapper: {
    alignItems: 'center',
    marginVertical: 40
  },
  input: {
    color: 'black',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    width: 200,
    padding: 10
  },
  confirmButton: {
    alignItems: 'center',
    backgroundColor: colors.background_theme2,
    alignSelf: 'center',
    padding: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
    top: 40
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  walletInfo: {
    paddingVertical: 15
  },
  walletText: {
    fontSize: 14,
    color: 'black'
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'black'
  },
  payNowButton: {
    marginTop: 25,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  payNowText: {
    color: 'white',
    fontSize: 14
  }
});
