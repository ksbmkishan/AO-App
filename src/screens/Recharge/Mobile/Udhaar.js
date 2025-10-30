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
  Modal,
  FlatList,
  Linking,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import { selectContactPhone } from 'react-native-contact-picker';
import MyHeader from '../../../components/MyHeader';
import { Colors, Fonts } from '../../../assets/style';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import SvgOrImage from '../../../components/SvgOrImage';
import { colors, img_url } from '../../../config/Constants1';
import MyLoader from '../../../components/MyLoader';
import Contacts from 'react-native-contacts';
import PaymentResultModal from '../../../components/PaymentResultModal';

const { width } = Dimensions.get('window');

const Udhaar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const customerData = useSelector(state => state.customer.customerData);
  const { rechargeRupees, selectedRecharge, rechargeBanner, selectedOperator, hlrLookup, deviceContacts } = useSelector(state => state.rechargeReducer);
  const [location, setLocation] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showContactList, setShowContactList] = useState(false);
  const paymentResultModal = useSelector(state => state.rechargeReducer.paymentResultModal);

  const refRBSheet = useRef();

  console.log('selectedOperator ',selectedOperator);

  useEffect(() => {
    async function requestContactPermission() {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true);
          dispatch(RechargeActions.getDeviceContacts());
        } else {
          console.log('Contacts permission denied');
          Alert.alert(
            'Alert',
            'Go to settings and allow contact permission',
            [
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
        }
      } else {
        dispatch(RechargeActions.getDeviceContacts());
      }
    }
    requestContactPermission();
  }, []);

  useEffect(() => {
    if (mobileNumber.length === 10 && /^\d{10}$/.test(mobileNumber)) {
      // detectOperator(mobileNumber);
    }
  }, [mobileNumber]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const mobile = query.replace(/\s+/g, '').replace('+91', '');

    const filtered = deviceContacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.phoneNumber.includes(query)
    );

    setFilteredContacts(filtered);

    if (mobile.length === 10 && /^\d+$/.test(mobile)) {
      setMobileNumber(mobile);
      detectOperator(mobile);
    }
  };

  const detectOperator = (number) => {
    const payload = {
      data: { number },
      onComplete: (response) => {
        console.log('Operator detection response:', response);
        if (response?.status === 1 && response.data) {
          const operatorData = {
            name: response.data.product_name,
            code: response.data.product_code
          };
          console.log('Dispatching operator:', operatorData);
          dispatch(RechargeActions.setSelectedOperator(operatorData));
        }
      }
    };
    dispatch(RechargeActions.getHlrLookup(payload));
  };

  const getServiceIcon = (name = '') => {
    if (!name) return require("../../../assets/images/airtel.png");

    const upper = name.toUpperCase();
    console.log('Operator name for icon:', upper);

    if (upper.includes('AIRTEL')) {
      return require("../../../assets/images/airtel.png");
    }
    else if (upper.includes('JIO')) {
      return require("../../../assets/astroOneImages/JioAPNA.png");
    }
    else if (upper.includes('VI') || upper.includes('VODAFONE') || upper.includes('IDEA')) {
      return require("../../../assets/astroOneImages/VIBADIYA.png");
    }
    else if (upper.includes('BSNL')) {
      return require("../../../assets/astroOneImages/BSNL.png");
    }
    else if (upper.includes('MTNL')) {
      return require("../../../assets/astroOneImages/MTNLSERVICES.jpeg");
    }
    else if (upper.includes('TATA')) {
      return require("../../../assets/astroOneImages/TAAAAAATATA.jpeg");
    }
    else {
      return require("../../../assets/images/airtel.png");
    }
  };

  const validate = () => {
    let valid = true;
    let err = {};

    if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
      err.mobile = 'Invalid mobile number';
      valid = false;
    }

    setErrors(err);
    return valid;
  };

  const handleProceed = () => {
    if (validate()) {
      requestPermission().then((hasPermission) => {
        console.log('has permission ', hasPermission)
        if (hasPermission) {
          const operatorToUse = selectedOperator;
          console.log(operatorToUse)
          const payload = {
            data: {
              number: mobileNumber,
              product_code: operatorToUse.code,
              latitude: 28.4521,
              longitude: 77.5241,
            },
            onComplete: () => navigation.navigate('RechargePostpaidPayment', {
              providerData: {
                number: mobileNumber, 
                product_code: operatorToUse.code,
                productName: operatorToUse.name,
                operatorImage: getServiceIcon(selectedOperator?.name)
              }
            }),
          }
          dispatch(RechargeActions.getFetchBillInfo(payload));
        }
      });
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const renderContactList = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => {
            const mobile = item?.phoneNumber.replace(/\s+/g, '').replace('+91', '');
            setMobileNumber(mobile);
            detectOperator(mobile);
            setShowContactList(false);
          }}
        >
          <View style={styles.contactInfo}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.contactImage} />
            ) : (
              <View style={styles.contactImagePlaceholder}>
                <Text style={styles.contactImagePlaceholderText}>{item.name[0]}</Text>
              </View>
            )}
            <View>
              <Text style={styles.contactName}>{item?.name}</Text>
              <Text style={styles.contactPhone}>{item?.phoneNumber}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        visible={showContactList}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowContactList(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
          <View style={styles.contactHeader}>
            <TouchableOpacity onPress={() => setShowContactList(false)}>
              <Icon name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.contactHeaderTitle}>Select Contact</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={Colors.grayA}
            />
          </View>

          <FlatList
            data={filteredContacts.length > 0 ? filteredContacts : deviceContacts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text>No contacts found</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MyHeader title={'Mobile'} tintColor={'white'} navigation={navigation} color='#002E6E'/>
      <MyLoader />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
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
                <View style={{ alignItems: 'center' }}>
                  <Image source={{ uri: item?.bannerImage}}
                    style={{ width: width * 0.95, height: width / 2.5, borderRadius: 10, resizeMode: "cover" }}
                  />
                </View>
              )}
            />
          </View>

          <View style={styles.inputWrapper2}>
            <View style={styles.iconCircle}>
              <Icon name="cellphone" size={16} color="#000" />
            </View>

            <TextInput
              placeholder="Enter mobile number"
              style={styles.input}
              keyboardType="phone-pad"
              value={mobileNumber.toString()}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9]/g, '').substring(0, 10);
                setMobileNumber(cleanedText);
              }}
              maxLength={10}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowContactList(true)}>
              {/* <Icon name="account-box-multiple" size={24} color="#000" /> */}
              <Image source={require('../../../assets/images/PhoeBook.png')} style={{height:24,width:24}} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

          <TouchableOpacity
            key={selectedOperator?.name || 'default'}
            style={styles.inputWrapper}
            // onPress={() => navigation.navigate('SelectOperator', { serviceId: 1 })}
          >
            <View style={styles.iconCircle}>
              {selectedOperator?.name ? (
                <Image
                  source={getServiceIcon(selectedOperator.name)}
                  style={styles.operatorIcon}
                />
              ) : (
                <Icon name="sim" size={16} color="#000" />
              )}
            </View>
            <Text style={styles.operatorText}>
              {selectedOperator?.name || 'Select Operator'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.warningText}>
            {selectedOperator?.name || ''} wrong recharges reversal not possible.
          </Text>

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

      <PaymentResultModal
        visible={paymentResultModal?.visible || false}
        type={paymentResultModal?.type}
        title={paymentResultModal?.title}
        message={paymentResultModal?.message}
        orderId={paymentResultModal?.orderId}
        amount={paymentResultModal?.amount}
        details={paymentResultModal?.details}
        primaryAction={paymentResultModal?.primaryAction}
        secondaryAction={paymentResultModal?.secondaryAction}
        onClose={() => dispatch(RechargeActions.hidePaymentResultModal())}
      />

      {renderContactList()}
    </View>
  );
};

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
    marginBottom: 10,
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
    backgroundColor: '#008CBA',
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
    color: 'black',
    textAlign: 'center'
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactHeaderTitle: {
    ...Fonts.PoppinsBold,
    color: 'black',
    fontSize: 16
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    ...Fonts.PoppinsRegular,
    fontSize: 14
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contactImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryTheme,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contactImagePlaceholderText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  contactName: {
    ...Fonts.PoppinsRegular,
    fontSize: 14,
    color: 'black',
  },
  contactPhone: {
    ...Fonts.PoppinsRegular,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Udhaar;