import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TextInput,
    Platform,
    PermissionsAndroid,
} from 'react-native';


import { navigate } from '../../../navigations/NavigationServices';
import Loader from '../../../components/Loader'
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import Button from '../Button';
import { showToastMessage } from '../../../utils/services';
import { connect } from 'react-redux';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import MyStatusBar from '../../../components/MyStatusbar';
import MyHeader from '../../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
import { colors, img_url } from '../../../config/Constants1';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import Carousel from 'react-native-reanimated-carousel';
import SvgOrImage from '../../../components/SvgOrImage';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const ElectricityProvidersList = ({ route, dispatch, rechargeBanner }) => {
    const { stateName, providerDetails } = route.params;

    const navigation = useNavigation()
    const {t} = useTranslation();

    const handleSelectOperator = (item) => {
        navigate('ElectricityPayment', { providerData: item });
    };
    console.log('banner data ', rechargeBanner);
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectOperator(item)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.operatorImage }}
                    style={styles.image}
                />
            </View>
            <Text style={styles.operatorText}>{item.OperatorName}</Text>
        </TouchableOpacity>
    );


    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const requestLocationPermission = async () => {
        let result;

        if (Platform.OS === 'android') {
            result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        } else {
            result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }

        return result === RESULTS.GRANTED;
    };


    const handleProceedPayment = async () => {
        try {
            if (!number) {
                showToastMessage({ message: 'Please Enter a Customer ID/ Account ID' });
                return false;
            } else if (number.length < 9) {
                showToastMessage({ message: 'Please Your 10 digits numbers' });
                return false;
            }

            const granted = await requestLocationPermission();
            console.log(granted)
            if (!granted) {
                console.log('Location permission not granted');
                return;
            }



            requestPermission().then((hasPermission) => {
                console.log('has permission ', hasPermission)
                if (hasPermission) {

                    const code = providerDetails.product_code;
                    let payload;

                    switch (code) {
                        case '453':
                            if (mobileNumber.length !== 10) {
                                showToastMessage({ message: "Please Enter Mobile." });
                                return false;
                            }
                            payload = {
                                data: {
                                    number: mobileNumber,
                                    optional1: number,
                                    product_code: providerDetails.product_code,
                                    latitude: 28.4567,
                                    longitude: 77.4567,
                                },
                                onComplete: () =>
                                    navigation.navigate('ElectricityPaymentProcess', {
                                        data: { number, providerDetails },
                                    }),
                            };
                            break;

                        default:
                            payload = {
                                data: {
                                    number: number,
                                    product_code: providerDetails.product_code,
                                    latitude: 28.4567,
                                    longitude: 77.4567,
                                },
                                onComplete: () =>
                                    navigation.navigate('ElectricityPaymentProcess', {
                                        data: { number, providerDetails },
                                    }),
                            };
                            break;
                    }

                    console.log('providerDetails.product_code', payload);

                    dispatch(RechargeActions.getFetchBillInfo(payload));

                    // },
                    // (error) => {
                    //     console.log('Error getting location', error);
                    // },
                    // { enableHighAccuracy: true, }
                    // );
                }
            });


        } catch (error) {
            console.log({ err: error });
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle={'light-content'} />
            <MyHeader title={'Electricity'} tintColor={Colors.white} navigation={navigation} color='#002E6E'/>
            <View style={{ padding: 10 }}>
                <Carousel
                    loop
                    width={width}
                    height={width / 2.2}
                    autoPlay
                    autoPlayInterval={3000}
                    data={rechargeBanner.filter(item => item?.redirectTo == 'Electricity')}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View>
                            <SvgOrImage uri={item?.bannerImage}
                                style={{ width: width * 0.95, height: width / 2.5, borderRadius: 10, resizeMode: "cover" }}
                            />
                        </View>
                    )}
                />
            </View>
            <View style={{ margin: 10, marginTop: 150 }}>
                <TouchableOpacity style={styles.inputWrapper} onPress={() => navigation.navigate('Electricity', { serviceId: 8 })}>
                    <View style={styles.iconCircle}>
                        <Image
                            source={{ uri: providerDetails?.operatorImage }}
                            style={styles.operatorIcon}
                        />
                    </View>
                    <Text style={styles.operatorText}>
                        {providerDetails?.product_name || 'Select Bank'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.inputWrapper2}>
                    <View style={styles.iconCircle}>
                        <Entypo name='pencil' size={20} color={"black"} />
                    </View>
                    <TextInput
                        placeholder={t("Enter Custoomer ID/ Account ID")}
                        style={styles.input}
                        maxLength={10}
                        value={number}
                        keyboardType='numeric'
                        onChangeText={setNumber}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputWrapper2}>
                    <View style={styles.iconCircle}>
                        <Entypo name='pencil' size={20} color={"black"} />
                    </View>
                    <TextInput
                        placeholder={t("Enter mobile number")}
                        style={styles.input}
                        maxLength={10}
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={{ flex: 0, marginTop: SCREEN_HEIGHT * 0.02 }}>
                    <TouchableOpacity onPress={handleProceedPayment} style={styles.button}>
                        <Text style={styles.buttonText}>{t("Proceed")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    rechargeBanner: state.rechargeReducer.rechargeBanner,
})


export default connect(mapStateToProps, mapDispatchToProps)(ElectricityProvidersList);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding * 0.8,
        borderColor: '#ccc',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10
    },
    imageContainer: {
        height: SCREEN_WIDTH * 0.11,
        width: SCREEN_WIDTH * 0.11,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
        overflow: 'hidden',
    },
    image: {
        height: SCREEN_WIDTH * 0.09,
        width: SCREEN_WIDTH * 0.09,
        resizeMode: 'contain',
    },
    operatorText: {
        ...Fonts.PoppinsRegular,
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    heading: {
        ...Fonts._12MontserratMedium,
        bottom: -Sizes.fixPadding * 0.6,
        left: Sizes.fixHorizontalPadding * 3,
        backgroundColor: Colors.white,
        zIndex: 99,
        alignSelf: 'flex-start',
        paddingHorizontal: Sizes.fixHorizontalPadding,
        color: Colors.black
    },
    rightIcon: {
        ...Fonts._12MontserratRegular,
        color: Colors.primaryTheme
    },
    inputContainer: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding,
        borderColor: Colors.grayA,
        backgroundColor: '#FFFFFF'
    },
    errorContainer: {
        // marginTop: Sizes.fixPadding * 0.3,
        paddingHorizontal: Sizes.fixPadding * 0.5,


    },
    button: {
        backgroundColor: '#002E6E', // Blue color, customize as needed
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        ...Fonts._11MontserratRegular,
        color: Colors.redA,
        bottom: 5
    },
    modalContainer: {
        backgroundColor: Colors.white,
        padding: Sizes.fixHorizontalPadding * 3,
        borderTopRightRadius: Sizes.fixHorizontalPadding * 3,
        borderTopLeftRadius: Sizes.fixHorizontalPadding * 3,
    },
    modalHeader: {
        marginBottom: Sizes.fixPadding * 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
    },
    listItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingVertical: Sizes.fixPadding * 0.5,
        borderColor: '#00000030'
    },
    listText: {
        ...Fonts._14MontserratMedium,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    scrollContainer: {
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 10,
        gap: 10
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
        fontSize: 10,
        color: '#666',
        marginLeft: 5,
        marginTop: 20,
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
        backgroundColor: 'red',
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
});
