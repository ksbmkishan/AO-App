import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import MyHeader from '../../../components/MyHeader';
import MyLoader from '../../../components/MyLoader';
import SvgOrImage from '../../../components/SvgOrImage';
import { img_url } from '../../../config/Constants1';
import Button from '../Button';
import PaymentResultModal from '../../../components/PaymentResultModal';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const MunicipalTaxPageData = ({ route, dispatch, rechargeBanner }) => {
    const navigation = useNavigation();
    const providerData = route.params?.providerData;
    const [upicNumber, setUpicNumber] = useState('');
    const [financialYear, setFinancialYear] = useState('');
    const [errors, setErrors] = useState({});
    const paymentResultModal = useSelector(state => state.rechargeReducer.paymentResultModal);

    const {t} = useTranslation();


    useEffect(() => {
        if (providerData?.OperatorCode) {
            dispatch(RechargeActions.getRechargeRequestFields(providerData?.OperatorCode));
        }
    }, []);

    const validate = () => {
        let valid = true;
        let err = {};

        if (!upicNumber) {
            err.upicNumber = 'Invalid UPIC Number';
            valid = false;
        }
        if (!financialYear) {
            err.financialYear = 'Enter Financial Year';
            valid = false;
        }

        setErrors(err);
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
                if (hasPermission) {
                    const payload = {
                        data: {
                            upic_number: upicNumber,
                            financial_year: financialYear,
                            product_code: providerData.product_code,
                            latitude: 28.4567,
                            longitude: 77.4567,
                        },
                        onComplete: () => navigation.navigate('MunicipalTaxPayment', {
                            providerData: {
                                upic_number: upicNumber,
                                financial_year: financialYear,
                                product_name: providerData?.product_name,
                                product_code: providerData?.product_code
                            }
                        }),
                    };

                    console.log('CheckPayloadForMunicipalTax:::', payload);

                    dispatch(RechargeActions.getFetchBillInfo(payload));
                }
            });
        } catch (error) {
            console.log({ err: error });
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyHeader title={'Municipal Tax Payment'} tintColor={Colors?.white} navigation={navigation} color='#002E6E'/>
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
                                    <SvgOrImage
                                        uri={ item?.bannerImage}
                                        style={{ width: width * 0.9, height: width / 2.2, borderRadius: 10, resizeMode: "cover" }}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    {/* Operator Info */}
                    <TouchableOpacity style={styles.inputWrapper} onPress={() => navigation.navigate('MunicipalTaxpage')}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={{ uri: providerData?.operatorImage }}
                                style={styles.operatorIcon}
                            />
                        </View>
                        <Text style={styles.operatorText}>
                            {providerData?.product_name || 'Select Operator'}
                        </Text>
                    </TouchableOpacity>

                    {/* UPIC Number Field */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.rupeeIcon}>#</Text>
                        </View>
                        <TextInput
                            placeholder={t("Enter UPIC Number")}
                            style={styles.input}
                            value={upicNumber}
                            onChangeText={setUpicNumber}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {errors.upicNumber && <Text style={styles.errorText}>{errors.upicNumber}</Text>}

                    {/* Financial Year Field */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.rupeeIcon}>FY</Text>
                        </View>
                        <TextInput
                            placeholder={t("Enter Financial Year")}
                            style={styles.input}
                            value={financialYear}
                            onChangeText={setFinancialYear}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {errors.financialYear && <Text style={styles.errorText}>{errors.financialYear}</Text>}

                    {/* Proceed Button */}
                    <View style={{ marginTop: 20 }}>
                        <Button title={t('PROCEED')} onPress={handleProceedPayment} />
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

const mapStateToProps = state => ({
    rechargeBanner: state.rechargeReducer.rechargeBanner,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalTaxPageData);

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 30,
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
        ...Fonts.PoppinsRegular,
        fontSize: 12,
        color: 'black'
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
});
