import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { selectContactPhone } from 'react-native-contact-picker';
import MyHeader from '../../../components/MyHeader';
import { Colors } from '../../../assets/style';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { colors, img_url } from '../../../config/Constants1';
import SvgOrImage from '../../../components/SvgOrImage';

const { width } = Dimensions.get('window');

const bannerImages = [
  require('../../../assets/images/banner.png'),
  require('../../../assets/images/banner.png'),
  require('../../../assets/images/banner.png'),
];

// 🔐 Permission Request Function
const requestContactsPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts Permission",
          message: "This app needs access to your contacts to select a mobile number.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

const RechargePrepaid = () => {


  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params || {};
 
  const { rechargeRupees, selectedRecharge , rechargeBanner,selectedOperator} = useSelector(state => state.rechargeReducer);
  const [location, setLocation] = useState(null);
  console.log('rupee ', rechargeRupees, selectedRecharge)
  const [mobileNumber, setMobileNumber] = useState('');

  const [errors, setErrors] = useState({});

  const refRBSheet = useRef();

  useEffect(() => {
    console.log('Selected Operator from Route Params:', selectedOperator);
    console.log('Selected Operator from Redux:', );
  }, [selectedOperator, ]);



  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: "Contacts Permission",
            message: "This app needs access to your contacts to select a mobile number.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // const openContactPicker = async () => {
  //   const hasPermission = await requestContactsPermission();
  //   if (!hasPermission) {
  //     Alert.alert("Permission Denied", "Please allow contacts permission from settings.");
  //     return;
  //   }

  //   try {
  //     const selected = await selectContactPhone();
  //     if (selected && selected.number) {
  //       const cleanedNumber = selected.number.replace(/\D/g, '');
  //       setMobileNumber(cleanedNumber);
  //     } else {
  //       Alert.alert("No Number", "Selected contact has no phone number.");
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //     Alert.alert("Error", "Could not access contacts.");
  //   }
  // };

  const validate = () => {
    let valid = true;
    let err = {};

    if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
      err.mobile = 'Invalid mobile number';
      valid = false;
    }

    if (!rechargeRupees || isNaN(rechargeRupees) || Number(rechargeRupees) <= 0) {
      err.amount = 'Invalid amount';
      valid = false;
    }

    setErrors(err);
    return valid;
  };



  const handleCheckOffer = () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }

    const operatorToUse = selectedOperator;

    if (!operatorToUse?.code) {
      Alert.alert("Error", "Please select an operator first");
      return;
    }

    const payload = {
      data: {
        number: mobileNumber,
        product_code: operatorToUse.code
      },
      onComplete: () => {
        navigation.navigate('CheckOffer', {
          number: mobileNumber,
          productCode: operatorToUse.code
        });
      }

    };

    dispatch(RechargeActions.checkOffer(payload));

  };


  const handleViewPlan = () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number first");
      return;
    }
    const operatorToUse =   selectedOperator;
    if (!operatorToUse?.code) {
      Alert.alert("Error", "Please select an operator first");
      return;
    }

    const payload = {
      data: {
        number: mobileNumber,
      },
      onComplete: () => {
        navigation.navigate('ViewPlan', {
          productCode: operatorToUse.code,
          mobileNumber: mobileNumber
        });
      }

    }

    dispatch(RechargeActions.getHlrLookup(payload))


  };

  const handleProceed = () => {
    if (validate()) {

      requestPermission().then((hasPermission) => {
        console.log('has permission ', hasPermission)
        if (hasPermission) {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              // setLocation({ latitude, longitude });
              const operatorToUse = selectedOperator;
              console.log(operatorToUse)
              const payload = {
                data: {
                  number: mobileNumber,
                  product_code: operatorToUse.code,
                  latitude: latitude,
                  longitude: longitude,
                },
                onComplete: () => console.log('asfa')

              }

              dispatch(RechargeActions.getFetchBillInfo(payload));

            },
            (error) => {
              console.log('Error getting location', error);
            },
            { enableHighAccuracy: true }
          );
        }
      });

      // Alert.alert("Success", `Recharge of ₹${rechargeRupees} initiated for ${mobileNumber}`);

    }
  };
  const renderBanner = ({ item }) => (
    <Image source={item} style={styles.bannerImage} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MyHeader title={'Mobile'} tintColor={'white'} navigation={navigation} color='#002E6E'/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Carousel */}
          <View style={styles.carouselContainer}>
            <Carousel
                    loop
                    width={width}
                    height={width / 2.2}
                    autoPlay
                    autoPlayInterval={3000}
                    data={rechargeBanner.filter(item => item?.redirectTo == 'Recharge-postpaid')}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View>
                            <Image source={{ uri: item?.bannerImage}}
                                style={{ width: width * 0.95, height: width / 2.5, borderRadius: 10 }}
                            />
                        </View>
                    )}
                />
          </View>

          {/* Operator Info */}
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => navigation.navigate('SelectOperator', { serviceId: 1 })}
          >
            <View style={styles.iconCircle}>

              {/* <Image
                                source={selectedOperator?.image || require('../../assests/images/airtel.png')}
                                style={styles.operatorIcon}
                            /> */}


            </View>
            <Text style={styles.operatorText}>
              {selectedOperator?.name || 'Select Operator'}
            </Text>
          </TouchableOpacity>

          {/* Mobile Number */}
          <View style={styles.inputWrapper2}>
            <View style={styles.iconCircle}>
              <Icon name="cellphone" size={16} color="#000" />
            </View>
            <TextInput
              placeholder="Enter mobile number"
              style={styles.input}
              keyboardType="phone-pad"
              value={mobileNumber.toString()}
              onChangeText={setMobileNumber}
              maxLength={10}
              placeholderTextColor="#999"
            />
            <TouchableOpacity

            // onPress={openContactPicker}

            >
              <Feather name="phone-call" size={16} color="#000" />
            </TouchableOpacity>
          </View>
          {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

          {/* Amount */}
          <View style={styles.inputWrapper2}>
            <View style={styles.iconCircle}>
              <Text style={styles.rupeeIcon}>₹</Text>
            </View>
            <TextInput
              editable={rechargeRupees ? true : false}
              placeholder="Enter amount"
              style={styles.input}
              keyboardType="numeric"
              value={rechargeRupees ? rechargeRupees.toString() : ''}
              onChangeText={(value) => dispatch(RechargeActions.setRechargeRupees(value))}
              placeholderTextColor="#999"
            />
          </View>
          {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

          <Text style={styles.warningText}>
            {selectedOperator?.name || ''} wrong recharges reversal not possible.
          </Text>

          {/* Three Buttons */}


          {/* Proceed Button */}
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={{ alignSelf: 'center' }}>
          <Text style={{ color: 'black' }}>Welcome</Text>
        </View>
      </RBSheet>
    </View>
  );
};

export default RechargePrepaid;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerImage: {
    width: width - 30,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginTop: 20,
    elevation: 1,
  },
  inputWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 20,
    elevation: 1,
    height: 50,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  operatorIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  operatorText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  rupeeIcon: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
  },
  warningText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    marginTop: 3,
    fontFamily: 'Poppins-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#002E6E',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  walletContainer: {
    alignItems: 'center',
  },
  walletText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#444',
  },
  proceedButton: {
    backgroundColor: '#002E6E',
    padding: 14,
    marginTop: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  offers: {
    // ...Fonts.PoppinsRegular,
    color: 'black',
    textAlign: 'center'
  }
});
