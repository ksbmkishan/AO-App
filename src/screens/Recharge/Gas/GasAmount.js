import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    StyleSheet,
    ImageBackground,
    PermissionsAndroid,
    Platform,
    Image,
    Modal
} from 'react-native';

import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusbar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import { BottomSheet } from '@rneui/themed';

const FasttagPayment = ({ route, customerData, dispatch, billInfo, navigation }) => {
    const { billData, providerData } = route.params || {};
    const [amount, setAmount] = useState(billInfo?.data?.amount || '')
    const [detailModal, setDetailModal] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    console.log("amountamount",amount)

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
        if (isAmountValid(amount)) {
            setIsModalVisible(true);
        }
    }

    const Walletandphonepay = () => {
        requestPermission().then((hasPermission) => {
            if (hasPermission) {
                const payload = {
                    number: providerData?.number,
                    amount: amount,
                    product_code: providerData.product_code,
                    productName: providerData.product_name,
                    latitude: 28.4521,
                    longitude: 77.5241,
                    billType: 'GAS',
                    bill_fetch_ref: billInfo?.order_id,
                     serviceType: 'GAS CYLINDER',
                    dispatch: dispatch
                }
                dispatch(RechargeActions.onBillPayment(payload));
            }
        });
    };

    const isAmountValid = (amount) => {
        return amount && !isNaN(amount) && parseFloat(amount) > 0;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle={'light-content'} />
            <MyHeader title={'Gas Bill'} tintColor={Colors.white} navigation={navigation} color='#002E6E'/>

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
                                                style={{alignItems:'flex-end',
                                                    alignSelf:'flex-end'
                                                }}
                                                onPress={() => setIsModalVisible(false)}>
                                                    <Text style={{fontSize:18, fontWeight:'bold'}}>X</Text>
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
                                const rechargeAmount = parseFloat(amount || 0);
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
                                setIsModalVisible(false);
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

    function vehiclenumber() {
        return (
            <View style={styles.vehicleNumberContainer}>
                <View style={styles.vehicleImageContainer}>
                    <Image source={{ uri: providerData?.operatorImage }} style={styles.vehicleImage} />
                </View>
                <View style={styles.vehicleTextContainer}>
                    <Text style={styles.vehicleOwnerName}>{billInfo?.data?.customer_name}</Text>
                    <Text style={styles.vehicleNumber}>{providerData?.number}</Text>
                </View>
            </View>
        );
    }

    function addamount() {
        return (
            <View style={styles.addAmountContainer}>
                <Text style={{ ...Fonts._20MontserratMedium }}>₹</Text>
                <TextInput
                    editable={false}
                    style={styles.textInput}
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    placeholderTextColor={Colors.grayA}
                    cursorColor={Colors.black}
                    value={amount}
                    onChangeText={(txt) => setAmount(txt)}
                />
            </View>
        );
    }

    function Fasttagdetails() {
        return (
            <TouchableOpacity style={styles.fasttagDetailsButton} onPress={() => setDetailModal(true)}>
                <Text style={styles.fasttagDetailsText}>View Details</Text>
            </TouchableOpacity>
        );
    }

    function proceedbtn() {
        return (
            <View style={styles.proceedButtonContainer}>
                <TouchableOpacity
                    onPress={handleOpen}
                    disabled={!isAmountValid(amount)}
                    style={[styles.button, !isAmountValid(amount) && styles.disabledButton]}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.buttonText, !isAmountValid(amount) && styles.disabledText]}>
                        PROCEED
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function viewDetails() {
        return (
            <BottomSheet isVisible={detailModal} onBackdropPress={() => setDetailModal(false)}>
                <View style={styles.maincontainer}>
                    <View style={styles.bottomSheetHeader}>
                        <Text style={styles.bottomSheetTitle}>Connection Details</Text>
                        <View></View>
                        <TouchableOpacity onPress={() => setDetailModal(false)}>
                            <AntDesign name="closecircleo" color={Colors.black} size={Sizes.fixPadding * 1.7} />
                        </TouchableOpacity>
                    </View>
                    {renderDetailRow('Name', billInfo?.data?.customer_name)}
                    {renderDetailRow('Bill Number', billInfo?.order_id)}
                    {renderDetailRow('Amount Before Due Date', billInfo?.data?.amount)}
                    {renderDetailRow('Consumer Name', billInfo?.data?.customer_name)}
                    {renderDetailRow('Gas Number', providerData?.number)}
                    {renderDetailRow('Operator Name', providerData?.product_name)}
                </View>
            </BottomSheet>
        );
    }

    function renderDetailRow(label, value) {
        return (
            <View style={styles.detailRow}>
                <Text style={{ ...styles.detailLabel, width: '50%' }}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    billInfo: state.rechargeReducer.billInfo
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FasttagPayment);

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
        paddingHorizontal:  16,
        borderRadius: 100,
        elevation: 2
    },
    fasttagDetailsText: {
        ...Fonts.primaryLight15RobotoRegular,
        color: '#00000090'
    },
    addAmountContainer: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        width: '40%',
        borderRadius: 10,
        padding: 5,
        marginTop: Sizes.fixPadding * 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textInput: {
        ...Fonts.primaryLight18RighteousRegular,
        paddingHorizontal: 10,
        flex: 1,
        textAlign: 'center'
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
        ...Fonts.primaryLight18RobotoMedium,
        color: '#000000',
    },
    vehicleNumber: {
        ...Fonts.primaryLight18RobotoMedium,
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
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 0.5
    },
    bottomSheetTitle: {
        ...Fonts.primaryDark16RobotoMedium,
        color: '#000000',
        fontSize: 17
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 0.4
    },
    detailLabel: {
        ...Fonts.primaryLight14RobotoRegular,
        color: 'black'
    },
    detailValue: {
        ...Fonts.primaryLight14RobotoRegular,
        color: 'grey'
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
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    disabledText: {
        color: '#888',
    },
});
