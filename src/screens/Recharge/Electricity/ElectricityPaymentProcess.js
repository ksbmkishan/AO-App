import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Modal,
} from 'react-native';

import { connect } from 'react-redux';

import { BottomSheet } from '@rneui/themed';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { navigate } from '../../../navigations/NavigationServices';
import { createOrder, electricityOrGasRecharge, fastagOrCableRecharge, razorpayInialise } from '../../../utility/rechargeApi';

import { calendarFormat } from 'moment';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'


import Geolocation from '@react-native-community/geolocation';
import MyStatusBar from '../../../components/MyStatusbar';
import MyLoader from '../../../components/MyLoader';
import { Fonts, Sizes } from '../../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../../../config/Constants1';


const ElectricityPaymentProcess = ({ route, dispatch, billInfo, customerData }) => {
    const { data } = route.params || {};
    const [detailModal, setDetailModal] = useState(false)

    const [number, setNumber] = useState(billInfo?.data?.amount || '');

    console.log('data ', data, 'bill info  ', billInfo)

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const isAmountValid = (amount) => {
        return amount && !isNaN(amount) && parseFloat(amount) > 0;
    };

    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOpen = () => {
        if (isAmountValid(number)) {
            setIsModalVisible(true);
        }
    }

    const onPayment = () => {
        // dispatch(UserActions.setPaymentType({ visible: true, data: { amount: billData?.data?.DueAmount, type: 'ELECTRICITY' }, onPress: handleProceedPayment }))
        setIsModalVisible(false);
        requestPermission().then((hasPermission) => {
            console.log('has permission ', hasPermission)
            if (hasPermission) {


                const payload = {

                    number: data?.number,
                    amount: number,
                    product_code: data?.providerDetails?.product_code,
                    productName: data?.providerDetails.product_name,
                    latitude: 28.5678,
                    longitude: 77.4567,
                    billType: 'ELECTRICITY',
                    bill_fetch_ref: billInfo?.order_id,
                    serviceType: 'ELECTRICITY',
                    dispatch: dispatch
                }

                console.log('payload ', payload);

                dispatch(RechargeActions.onBillPayment(payload));


            }
        });
    }



    return (
        <SafeAreaView style={styles.safeArea}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle={'light-content'} />
            {/* <MyLoader /> */}
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/images/fasttagwallet.png')} style={styles.imageBackground} resizeMode='cover'>
                    <View style={styles.imageInnerContainer}>
                        {vehiclenumber()}
                        {addamount()}
                    </View>
                </ImageBackground>
                {Fasttagdetails()}
                {proceedbtn()}
                {viewDetails()}
            </View>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            width: '85%',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'flex-end',
                                alignSelf: 'flex-end'
                            }}
                            onPress={() => setIsModalVisible(false)}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>X</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                            Payment Confirmation
                        </Text>

                        <View style={{ paddingVertical: 15 }}>
                            <Text style={{ fontSize: 14, color: 'black' }}>
                                Divya Rashi: ₹{customerData?.wallet_balance.toFixed(2) ?? '0.00'}
                            </Text>
                        </View>

                        <View style={{ width: '100%' }}>
                            {(() => {
                                const balance = parseFloat(customerData?.wallet_balance || 0);
                                const rechargeAmount = parseFloat(number || 0);
                                const remainingAmount = (rechargeAmount - balance).toFixed(2);

                                const isWalletSufficient = balance >= rechargeAmount;
                                const isWalletPartiallySufficient = balance > 0 && balance < rechargeAmount;
                                const isWalletZero = balance === 0;

                                return (
                                    <>
                                        {(isWalletSufficient || isWalletPartiallySufficient) && (
                                            <TouchableOpacity disabled={true} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                                <AntDesign name={'checkcircle'} size={20} color="#007AFF" />
                                                <Text style={{ marginLeft: 10, fontSize: 14, color: 'black' }}>
                                                    Divya Rashi ( ₹
                                                    {isWalletPartiallySufficient
                                                        ? balance.toFixed(2)
                                                        : rechargeAmount}
                                                    )
                                                </Text>
                                            </TouchableOpacity>
                                        )}

                                        {(isWalletPartiallySufficient || isWalletZero) && (
                                            <TouchableOpacity disabled={true} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                                <AntDesign name={'checkcircle'} size={20} color="#007AFF" />
                                                <Text style={{ marginLeft: 10, fontSize: 14, color: 'black' }}>
                                                    UPI / PhonePe (
                                                    ₹
                                                    {isWalletPartiallySufficient
                                                        ? remainingAmount
                                                        : rechargeAmount}
                                                    )
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </>
                                );
                            })()}
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                onPayment();

                            }}
                            style={{
                                marginTop: 25,
                                backgroundColor: '#002E6E',
                                paddingVertical: 12,
                                paddingHorizontal: 30,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 14 }}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );

    function viewDetails() {
        return (
            <BottomSheet
                isVisible={detailModal}
                onBackdropPress={() =>
                    setDetailModal(false)
                }
            >
                <View style={styles.maincontainer}>
                    <View style={styles.bottomSheetHeader}>
                        <View></View>
                        <Text style={styles.bottomSheetTitle}>Electricity Bill Details</Text>
                        <TouchableOpacity onPress={() => setDetailModal(false)}>
                            <AntDesign name='closecircleo' color={Colors.black} size={26} />
                        </TouchableOpacity>
                    </View>
                    {renderDetailRow('Name', billInfo?.data?.customer_name)}
                    {renderDetailRow('Bill Number', data?.number)}
                    {renderDetailRow('Due Ammount', `₹${billInfo?.data?.amount}`)}
                    {renderDetailRow('Due Date', billInfo?.data?.bill_due_date ? billInfo?.data?.bill_due_date : billInfo?.data?.dueDate)}
                    {renderDetailRow('Billing Date', billInfo?.data?.bill_date ? billInfo?.data?.bill_date : billInfo?.data?.billDate)}

                </View>
            </BottomSheet>
        )
    }

    function renderDetailRow(label, value) {
        return (
            <View style={styles.detailRow}>
                <Text style={{ ...styles.detailLabel, width: '50%' }}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
            </View>
        )
    }

    function proceedbtn() {
        return (
            <View style={styles.proceedButtonContainer}>

                <TouchableOpacity onPress={() => handleOpen()} style={styles.button}>
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function Fasttagdetails() {
        return (
            <TouchableOpacity style={styles.fasttagDetailsButton} onPress={() => setDetailModal(true)}>
                <Text style={styles.fasttagDetailsText}>View Details</Text>
            </TouchableOpacity>
        )
    }

    function addamount() {
        return (
            <View style={styles.addAmountContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder=""
                    keyboardType="numeric"
                    placeholderTextColor={Colors.grayA}
                    cursorColor={Colors.black}
                    editable={false}
                    onChangeText={setNumber}
                    value={number}
                />
            </View>
        );
    }

    function vehiclenumber() {
        return (
            <View style={styles.vehicleNumberContainer}>
                <View style={styles.vehicleTextContainer}>
                    <Text style={styles.vehicleOwnerName}>{billInfo.data?.customer_name}</Text>
                    <Text style={styles.vehicleNumber}>Bill No. :- {data?.number}</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    billInfo: state.rechargeReducer.billInfo,
    customerData: state.customer.customerData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityPaymentProcess);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container: {
        flex: 1
    },
    imageBackground: {
        height: SCREEN_HEIGHT * 0.4
    },
    imageInnerContainer: {
        flex: 1
    },
    proceedButtonContainer: {
        position: 'absolute',
        bottom: Sizes.fixPadding * 2,
        width: '90%',
        alignSelf: 'center'
    },
    fasttagDetailsButton: {
        alignSelf: 'center',
        marginTop: -Sizes.fixPadding,
        backgroundColor: 'white',
        paddingVertical: Sizes.fixPadding * 0.5,
        paddingHorizontal: 16,
        borderRadius: 100,
        elevation: 5
    },
    fasttagDetailsText: {
        ...Fonts.primaryLight15RobotoMedium,
        color: '#00000090'
    },
    addAmountContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '40%',
        borderRadius: 10,
        padding: 5,
        marginTop: Sizes.fixPadding * 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        ...Fonts.primaryLight18RobotoMedium,
        paddingHorizontal: 10
    },
    vehicleNumberContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    vehicleImageContainer: {
        flex: 0.2,
        paddingRight: Sizes.fixPadding * 0.5
    },
    vehicleImage: {
        height: SCREEN_WIDTH * 0.09,
        width: SCREEN_WIDTH * 0.09,
        alignSelf: 'flex-end'
    },
    vehicleTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    vehicleOwnerName: {
        ...Fonts.primaryDark11InterMedium,
        color: '#000000',
    },
    vehicleNumber: {
        ...Fonts.primaryDark11InterMedium,
        color: '#A39C9C'
    },
    maincontainer: {
        backgroundColor: 'white',
        padding: Sizes.fixPadding,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomSheetTitle: {
        ...Fonts.primaryLight15RobotoMedium,
        color: '#000000',
        marginLeft: 10
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 0.2
    },
    detailLabel: {
        ...Fonts.primaryDark14RobotoMedium,
        color: Colors.black
    },
    detailValue: {
        ...Fonts.primaryDark14RobotoMedium,
        color: Colors.grayA
    },
    button: {
        backgroundColor: colors.background_theme2, // Blue color, customize as needed
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
});
