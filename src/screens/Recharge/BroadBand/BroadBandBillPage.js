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
import { useNavigation, useRoute } from '@react-navigation/native';
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

const BroadBandBillPage = ({ route, dispatch, rechargeRequestFields, rechargeBanner }) => {
    const navigation = useNavigation();
    const providerData = route.params?.providerData;
    const [customerNumber, setCustomerNumber] = useState('');
    const [errors, setErrors] = useState({});
    const paymentResultModal = useSelector(state => state.rechargeReducer.paymentResultModal);
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(RechargeActions.getRechargeRequestFields(providerData?.OperatorCode));
    }, []);

    const validate = () => {
        let valid = true;
        let err = {};

        if (!customerNumber) {
            err.customerNumber = 'Invalid Customer ID';
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
                            number: customerNumber,
                            product_code: providerData.product_code,
                            latitude: 28.4567,
                            longitude: 77.4567,
                        },
                        onComplete: () => navigation.navigate('BroadBandPayment', {
                            providerData: {
                                number: customerNumber,
                                product_name: providerData?.product_name,
                                product_code: providerData?.product_code
                            }
                        }),
                    };

                    console.log('Broadband Payload :::', payload);

                    dispatch(RechargeActions.getFetchBillInfo(payload));
                }
            });
        } catch (error) {
            console.log({ err: error });
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyHeader title={'Broadband Bill Payment'} tintColor={Colors?.white} navigation={navigation} color='#002E6E'/>
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
                    <TouchableOpacity style={styles.inputWrapper} onPress={() => navigation.navigate('BroadBandProviders')}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={{ uri: providerData?.operatorImage }}
                                style={styles.operatorIcon}
                            />
                        </View>
                        <Text style={styles.operatorText}>
                            {providerData?.product_name || t('Select Broadband Operator')}
                        </Text>
                    </TouchableOpacity>

                    {/* Customer Number Field */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.rupeeIcon}>#</Text>
                        </View>
                        <TextInput
                            placeholder={t("Enter Customer ID")}
                            style={styles.input}
                            value={customerNumber}
                            onChangeText={setCustomerNumber}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {errors.customerNumber && <Text style={styles.errorText}>{errors.customerNumber}</Text>}

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
    rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
    rechargeBanner: state.rechargeReducer.rechargeBanner,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BroadBandBillPage);

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
       fontSize:12,
       color:'black'
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
