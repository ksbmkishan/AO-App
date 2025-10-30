import React, { useEffect, useState, } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, Dimensions, Platform, PermissionsAndroid } from 'react-native';


import Button from '../Button';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { connect, useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import MyStatusBar from '../../../components/MyStatusbar';
import MyHeader from '../../../components/MyHeader';
import MyLoader from '../../../components/MyLoader';
import { showToastMessage } from '../../../utils/services';
import Carousel from 'react-native-reanimated-carousel';
import SvgOrImage from '../../../components/SvgOrImage';
import { img_url } from '../../../config/Constants1';
import PaymentResultModal from '../../../components/PaymentResultModal';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const GasPipedOperators = ({ dispatch, gasOperatorData, dthCircleData, route, rechargeRequestFields, navigation, billInfo, rechargeBanner }) => {
    const providerData = route?.params?.providerData
    console.log("providerData", providerData)
    const [fields, setFields] = useState(null);
    const {t} = useTranslation();

    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
     const paymentResultModal = useSelector(state => state.rechargeReducer.paymentResultModal);

    useEffect(() => {
        dispatch(RechargeActions.getRechargeRequestFields(route.params?.providerData?.OperatorCode))
    }, [dispatch]);

    useEffect(() => {
        setFields(rechargeRequestFields?.Request)
    }, [rechargeRequestFields])

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };


    const handleProceedPayment = async () => {
        try {
            if (!number) {
                showToastMessage({ message: 'Please Enter a LPG ID/ Registered Mobile Number' });
                return false;
            } else if (number.length < 9) {
                showToastMessage({ message: 'Please Your 10 digits numbers' });
                return false;
            }





            requestPermission().then((hasPermission) => {
                console.log('has permission ', hasPermission)
                if (hasPermission) {
                    // Geolocation.getCurrentPosition(
                    //     (position) => {
                    //         const { latitude, longitude } = position.coords;
                    // setLocation({ latitude, longitude });
                    const payload = {
                        data: {
                            number: number,
                            product_code: providerData.product_code,
                            latitude: 28.4521,
                            longitude: 77.5241,
                        },
                        onComplete: () => navigation.navigate('GasPipedAmount', { providerData: { number, product_name: providerData?.product_name, product_code: providerData?.product_code } }),

                    }
                    console.log("payload", payload)
                    dispatch(RechargeActions.getFetchBillInfo(payload));


                    //     },
                    //     (error) => {
                    //         console.log('Error getting location', error);
                    //     },
                    //     { enableHighAccuracy: true }
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
            {/* <MyLoader /> */}
            <MyHeader title={'Gas Piped'} tintColor={Colors.white} navigation={navigation} color='#002E6E' />
            <View style={{ flex: 1, padding: Sizes.fixPadding }}>
                {bannerInfo()}
                {customerdetails()}
                {submitBtn()}
            </View>
        </SafeAreaView>
    );

    function bannerInfo() {
        return (
            <View style={{ padding: 10,height:width / 2.2 }}>
                <Carousel
                    loop
                    width={width}
                    height={width / 2.2}
                    autoPlay
                    autoPlayInterval={3000}
                    data={rechargeBanner.filter(item => item?.redirectTo === 'Gas')}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View>
                            <SvgOrImage uri={ item?.bannerImage}
                                style={{ width: width * 0.9, height: width / 2.5, borderRadius: 10, resizeMode: "cover" }}
                            />
                        </View>
                    )}
                />
            </View>
        )
    }

    function customerdetails() {



        return (
            <View style={{
                flex: 0
            }}>
                <TouchableOpacity style={styles.inputWrapper} onPress={() => navigation.goBack()}>
                    <View style={styles.iconCircle}>
                        <Image
                            source={{ uri: providerData?.operatorImage }}
                            style={styles.operatorIcon}
                        />
                    </View>
                    <Text style={styles.operatorText}>
                        {providerData?.product_name || 'Select Gas'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.inputWrapper2}>
                    <View style={styles.iconCircle}>
                        <Entypo name='pencil' size={20} color={"black"} />
                    </View>
                    <TextInput
                        placeholder={t("Enter LPG ID/ registered Mobile Number")}
                        style={styles.input}
                        value={number}
                        onChangeText={setNumber}
                        placeholderTextColor="#999"
                    />
                </View>

                {/* <View style={styles.inputWrapper2}>
                    <View style={styles.iconCircle}>
                        <Entypo name='pencil' size={20} color={"black"} />
                    </View>
                    <TextInput
                        placeholder="Enter Amount"
                        style={styles.input}
                        maxLength={10}
                        value={amount}
                        onChangeText={setAmount}
                        placeholderTextColor="#999"
                    />
                </View> */}

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
            </View>
        );
    }

    function submitBtn() {

        return (
            <View style={{ flex: 1,marginVertical:20 }}>
                <TouchableOpacity
                    onPress={handleProceedPayment}
                    activeOpacity={0.8}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}>{t("Customer info")}</Text>
                </TouchableOpacity>

                {/* <Button title={'View Details'} onPress={handleProceedPayment}/> */}
            </View>
        );
    }
};

const mapStateToProps = state => ({
    gasOperatorData: state.rechargeReducer.gasOperatorData,
    dthCircleData: state.rechargeReducer.dthCircleData,
    rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
    billInfo: state.rechargeReducer.billInfo,
    rechargeBanner: state.rechargeReducer.rechargeBanner,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GasPipedOperators);

const styles = StyleSheet.create({
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
    errorText: {
        ...Fonts._11MontserratRegular,
        color: "red",
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
    submitButton: {
        height: 40,
        width: '90%',
        backgroundColor: '#002E6E',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold', // Optional, use 'System' if font not loaded
        fontWeight:'bold'
    },
});
