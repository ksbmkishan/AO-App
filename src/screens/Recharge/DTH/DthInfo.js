import { PermissionsAndroid, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { showToastMessage } from '../../../utils/services';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import MyHeader from '../../../components/MyHeader';
import Geolocation from '@react-native-community/geolocation';
import { Colors } from '../../../config/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Sizes } from '../../../assets/style';

const DthInfo = ({ billCustomerInfo, route, dispatch, navigation ,customerData}) => {
    const { amount, product_code, product_name, subscriberId } = route?.params || {};
    const [updateAmount, setUpdateAmount] = useState(billCustomerInfo?.data?.monthly.toString() || '');
    const [isModalVisible, setIsModalVisible] = useState(false)

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const handleOpen = () => {
        if (isAmountValid(updateAmount)) {
            setIsModalVisible(true);
        }
    }

    const isAmountValid = (amount) => {
        return amount && !isNaN(amount) && parseFloat(amount) > 0;
    };

    const Walletandphonepay = () => {
            setIsModalVisible(false);
            requestPermission().then((hasPermission) => {
                if (hasPermission) {
                    const payload = {
                        number:subscriberId,
                        amount: updateAmount,
                        product_code:product_code,
                        productName:product_name,
                        latitude: 28.4521,
                        longitude: 77.5241,
                        billType: 'DTH RECHARGE',
                        serviceType: 'DTH RECHARGE',
                        bill_fetch_ref: billCustomerInfo?.order_id,
                        dispatch: dispatch
                    }
                    dispatch(RechargeActions.getRechargeData(payload));
                }
            });
        };


    const handlePress = () => {
        if (!updateAmount) {
            showToastMessage({ message: "Please Enter Amount" });
            return false;
        }

        requestPermission().then((hasPermission) => {
            if (hasPermission) {
                const payload = {
                    number: subscriberId,
                    amount: updateAmount,
                    product_code: product_code,
                    latitude: 28.4521,
                    longitude: 77.5241,
                    billType: 'FASTAG',
                    productName: product_name,
                    dispatch: dispatch
                }

                dispatch(RechargeActions.getRechargeData(payload));
            }
        });
    };

    const getImage = (id) => {
        switch (id) {
            case '21': return require('../../../assets/images/dishtv.png');
            case '22': return require('../../../assets/images/airtel.png');
            case '23': return require('../../../assets/images/tatasky.png');
            case '24': return require('../../../assets/images/videocon.jpg');
            case '25': return require('../../../assets/images/sundirect.png');
            default: return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <MyHeader title={'DTH'} navigation={navigation} color='#002E6E'/>

            <View style={{
                alignItems: 'center',
                marginHorizontal: 10,
                marginVertical: 40
            }}>
                {getImage(product_code) && (
                    <Image
                        source={getImage(product_code)}
                        style={{ width: 80, height: 80, resizeMode: 'contain', marginBottom: 10 }}
                    />
                )}
                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{product_name}</Text>
            </View>

            <View style={{ borderBottomWidth: 1 }} />

            <View style={{ alignItems: 'center', margin: 10 }}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>VC Number or Mobile No</Text>
                <Text style={{ color: 'black' }}>{subscriberId}</Text>
            </View>

            <View style={{ borderBottomWidth: 1 }} />

            <View style={{ alignItems: 'flex-start', marginHorizontal: 10, margin: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>Bill Details</Text>
                <Text style={{ color: 'grey' }}>Name: <Text style={{ color: 'black', fontWeight: 'bold' }}>{billCustomerInfo?.data?.customer_name}</Text></Text>
                <Text style={{ color: 'grey' }}>Balance: {billCustomerInfo?.data?.balance}</Text>
                <Text style={{ color: 'grey' }}>Next Recharge Date: {billCustomerInfo?.data?.next_recharge_date}</Text>
                <Text style={{ color: 'grey' }}>Monthly Recharge: {billCustomerInfo?.data?.monthly}</Text>
                <Text style={{ color: 'grey' }}>Last Recharge Date: {billCustomerInfo?.data?.last_recharge_date}</Text>
                <Text style={{ color: 'grey' }}>RMN: {billCustomerInfo?.data?.reg_mobile_number}</Text>
                <Text style={{ color: 'grey' }}>Number: {subscriberId}</Text>
            </View>

            <View style={{ borderBottomWidth: 1 }} />

            <View style={{ alignItems: 'center', marginVertical: 50 }}>
                <Text style={{ color: 'black', fontWeight: "700" }}>Amount</Text>
                <TextInput
                    value={updateAmount}
                    onChangeText={setUpdateAmount}
                    style={{
                        color: 'black',
                        borderRadius: 10,
                        borderColor: 'black',
                        borderWidth: 1,
                        textAlign: 'center',
                        paddingHorizontal: 10,
                        width: '60%',
                        marginTop: 5
                    }}
                    placeholder='₹ Enter Amount'
                    placeholderTextColor={'black'}
                    keyboardType="numeric"
                />
            </View>

            <View style={{ borderBottomWidth: 1 }} />

            <View style={styles.proceedButtonContainer}>
                <TouchableOpacity
                    onPress={handleOpen}
                    disabled={!isAmountValid(updateAmount)}
                    style={[styles.button, !isAmountValid(updateAmount) && styles.disabledButton]}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.buttonText, !isAmountValid(updateAmount) && styles.disabledText]}>
                        PROCEED
                    </Text>
                </TouchableOpacity>
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
                                const rechargeAmount = parseFloat(updateAmount || 0);
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
                                Walletandphonepay();

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
        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    billCustomerInfo: state.rechargeReducer.billCustomerInfo,
     customerData: state.customer.customerData,
});

export default connect(mapStateToProps, mapDispatchToProps)(DthInfo);

const styles = StyleSheet.create({
    proceedButtonContainer: {
        position: 'absolute',
        bottom: Sizes.fixPadding * 2,
        width: '90%',
        alignSelf: 'center'
    },
     disabledButton: {
        backgroundColor: '#cccccc',
    },
     disabledText: {
        color: '#888',
    },
     button: {
        height: 50,
        width: 200,
        borderRadius: 8,
        backgroundColor: '#002E6E',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
     buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
});
