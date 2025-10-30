import React, { useEffect, useState } from 'react';
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
    FlatList,
    SafeAreaView,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import { Colors, Sizes } from '../../../assets/style';
import MyHeader from '../../../components/MyHeader';
import MyLoader from '../../../components/MyLoader';
import SvgOrImage from '../../../components/SvgOrImage';
import { img_url } from '../../../config/Constants1';
import Button from '../Button';
import PaymentResultModal from '../../../components/PaymentResultModal';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');



const Fasttagvehicle = ({ route, dispatch, rechargeRequestFields, rechargeBanner }) => {
    const navigation = useNavigation();
    const providerData = route.params?.providerData;
    const [fields, setFields] = useState(null);
    const [number, setNumber] = useState('');
    const [errors, setErrors] = useState({});
    const paymentResultModal = useSelector(state => state.rechargeReducer.paymentResultModal);
    console.log('providerData', providerData)
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(RechargeActions.getRechargeRequestFields(providerData?.OperatorCode))
    }, []);

    useEffect(() => {
        setFields(rechargeRequestFields?.Request)
    }, [rechargeRequestFields]);

    const validate = () => {
        let valid = true;

        if (!number) {
            err.amount = 'Invalid Number';
            valid = false;
        }


        return valid;
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


    const handleProceedPayment = async () => {
        if (!validate()) return;

        try {

            requestPermission().then((hasPermission) => {
                console.log('has permission ', hasPermission)
                if (hasPermission) {
                    // Geolocation.getCurrentPosition(
                    // (position) => {
                    //     const { latitude, longitude } = position.coords;
                    // setLocation({ latitude, longitude });
                    const payload = {
                        data: {
                            number: number,
                            product_code: providerData.product_code,
                            latitude: 28.4567,
                            longitude: 77.4567,
                        },
                        onComplete: () => navigation.navigate('Fastagpayment', { providerData: { number, product_name: providerData?.product_name, product_code: providerData?.product_code } }),

                    }

                    dispatch(RechargeActions.getFetchBillInfo(payload));


                    // },
                    // (error) => {
                    //     console.log('Error getting location', error);
                    // },
                    // { enableHighAccuracy: true }
                    // );
                }
            });

        } catch (error) {
            console.log({ err: error });
        }


    };

    const handleInputChange = (index, newValue) => {
        const newDataArray = [...fields];
        newDataArray[index].Value = newValue;
        setFields(newDataArray);
    };

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.inputWrapper2}>
                    <View style={styles.iconCircle}>
                        <Icon name={index === 0 ? "car" : "cash"} size={16} color="#000" />
                    </View>
                    <TextInput
                        onChangeText={(newValue) => handleInputChange(index, newValue.toUpperCase())}
                        placeholder={`${item?.Key} ${item?.isOptional === 'True' ? '(Optional)' : ''}`}
                        style={styles.input}
                        placeholderTextColor="#999"
                        cursorColor={Colors.black}
                        autoCapitalize='characters'
                    />

                </View>

                <Text style={styles.warningText}>
                    Please enter vehicle number (Linked to FASTag) without spaces E.g UP01AB12374/For ICICI Bank, minimum amount is 500
                </Text>
                {errors[item.Key] && <Text style={styles.errorText}>{errors[item.Key]}</Text>}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyHeader title={'FASTag Recharge'} tintColor={Colors?.white} navigation={navigation}  color='#002E6E'/>
            <MyLoader />
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={{ flex: 1, padding: Sizes.fixPadding }}>

                    {/* Carousel */}
                    <View style={{ height: width / 2.2, borderRadius: 10 }}>
                        <Carousel
                            loop
                            width={width}
                            height={width / 2.2}
                            autoPlay
                            autoPlayInterval={3000}
                            data={rechargeBanner.filter(item => item?.redirectTo === 'Fastag')}
                            scrollAnimationDuration={1000}
                            renderItem={({ item }) => (
                                <View>
                                    <Image source={{ uri:  item?.bannerImage}}
                                        style={{ width: width * 0.9, height: width / 2.2, borderRadius: 10, resizeMode: "contain" }}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    {/* Bank Info */}

                    <TouchableOpacity style={styles.inputWrapper} onPress={() => navigation.navigate('Fasttag')}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={{ uri: providerData?.operatorImage }}
                                style={styles.operatorIcon}
                            />
                        </View>
                        <Text style={styles.operatorText}>
                            {providerData?.product_name || 'Select Bank'}
                        </Text>
                    </TouchableOpacity>


                    {/* Vehicle and Other Fields */}



                    {/* Amount Field */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.rupeeIcon}>IN</Text>
                        </View>
                        <TextInput
                            placeholder={t("Enter Vechile Number")}
                            style={styles.input}
                            maxLength={10}
                            value={number}
                            onChangeText={setNumber}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}





                    {/* Proceed Button */}
                    <View style={{ marginTop: 20 }}>
                        {/* <TouchableOpacity
                            onPress={handleProceedPayment}
                            activeOpacity={0.8}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Customer info</Text>
                        </TouchableOpacity> */}
                        <Button title={t('PROCEED')} onPress={() => handleProceedPayment()} />
                    </View>

                </View>

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

            </ScrollView>

        </View>
    );
};

const renderBanner = ({ item }) => (
    <Image source={item} style={styles.bannerImage} />
);

const mapStateToProps = state => ({
    rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
    rechargeBanner: state.rechargeReducer.rechargeBanner,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Fasttagvehicle);

const styles = StyleSheet.create({
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
    submitButtonText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold', // Optional, use 'System' if font not loaded
        fontWeight: 'bold'
    },
    proceedText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },
    submitButton: {
        height: 40,
        width: '90%',
        backgroundColor: 'green',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});