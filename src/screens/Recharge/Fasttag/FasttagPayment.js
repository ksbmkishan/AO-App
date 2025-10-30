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
import { connect, useSelector } from 'react-redux';
import { BottomSheet } from '@rneui/themed';
import Loader from '../../../components/Loader';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { showNumber, showToastMessage } from '../../../utils/services';
import MyHeader from '../../../components/MyHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import MyStatusBar from '../../../components/MyStatusbar';
import Button from '../Button';
import MyLoader from '../../../components/MyLoader';


const FasttagPayment = ({ route, customerdata, dispatch, billInfo, navigation }) => {
    const { billData, providerData } = route.params || {};
    console.log("providerData", providerData)
    const [amount, setAmount] = useState(billInfo?.data?.amount || '')
    const [detailModal, setDetailModal] = useState(false)
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

    const isAmountValid = (amount) => {
        return amount && !isNaN(amount) && parseFloat(amount) > 0;
    };

    const handleOpen = () => {
        if (isAmountValid(amount)) {
            setIsModalVisible(true);
        }
    }

    const Walletandphonepay = () => {

        requestPermission().then((hasPermission) => {
            console.log('has permission ', hasPermission)
            if (hasPermission) {

                const payload = {

                    number: providerData?.number,
                    amount: amount,
                    product_code: providerData.product_code,
                    productName: providerData.product_name,
                    latitude: 28.4567,
                    longitude: 77.4567,
                    billType: 'FASTAG',
                    bill_fetch_ref: billInfo?.order_id,
                     serviceType: 'FASTAG',
                    dispatch: dispatch
                }

                console.log('payload ', payload);

                dispatch(RechargeActions.onBillPayment(payload));
            }
        })
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle={'light-content'} />
            <MyHeader title={'FASTag Payment'} tintColor={Colors.white} navigation={navigation} color='#002E6E'/>
            <MyLoader />
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
                                Divya Rashi: ₹{customerdata?.wallet_balance.toFixed(2) ?? '0.00'}
                            </Text>
                        </View>

                        <View style={{ width: '100%' }}>
                            {(() => {
                                const balance = parseFloat(customerdata?.wallet_balance || 0);
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

    function viewDetails() {
        console.log("billData", billData)
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
                        <Text style={styles.bottomSheetTitle}>FASTag Details</Text>
                        <TouchableOpacity onPress={() => setDetailModal(false)}>
                            <AntDesign name="closecircleo" color={Colors.black} size={Sizes.fixPadding * 1.7} />
                        </TouchableOpacity>
                    </View>


                    {renderDetailRow('Name', billInfo?.data?.customer_name)}
                    {renderDetailRow('Bill Number', billInfo?.order_id)}
                    {/* {renderDetailRow('Amount Before Due Date', billData?.data?.BillNumber)} */}
                    {/* {renderDetailRow('Late Payment Amount', billData?.data?.BillNumber)} */}
                    {/* {renderDetailRow('Fast Tag Balance', '₹300')} */}
                    {/* {renderDetailRow('Minimum Amount for Top-up', showNumber(billData?.data?.DueAmount))} */}
                    {renderDetailRow('Minimum Amount for Top-up', '₹500')}
                    {/* {renderDetailRow('Tag Status', 'Active')} */}
                    {/* {renderDetailRow('Vehicle Model', 'Model X')} */}
                    {renderDetailRow('Maximum Permissible Recharge Amount', '₹10000')}
                </View>
            </BottomSheet>
        )
    }

    function renderDetailRow(label, value) {
        return (
            <View style={styles.detailRow}>
                <Text style={{ ...styles.detailLabel, flex: 0.8 }}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
            </View>
        )
    }


    function proceedbtn() {
        return (
            <View style={styles.proceedButtonContainer}>
                <Button title={'PROCEED'} onPress={() => handleOpen()} />
            </View>
        )
    }

    function Fasttagdetails() {
        return (
            <TouchableOpacity style={styles.fasttagDetailsButton} onPress={() => setDetailModal(true)}>
                <Text style={styles.fasttagDetailsText}>View Fastag Details</Text>
            </TouchableOpacity>
        )
    }

    function addamount() {
        return (
            <View>
                <View style={styles.addAmountContainer}>
                    <Text style={{ color: Colors.black, fontSize: 16, marginRight: 5, fontSize: 24 }}>₹</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={5}
                        placeholderTextColor={Colors.grayA}
                        cursorColor={Colors.black}
                        value={amount}
                        onChangeText={(txt) => setAmount(txt)}
                    />
                </View>
                <Text style={{ ...Fonts._13MontserratMedium, textAlign: 'center', marginTop: Sizes.fixPadding }}>Enter amount between 500 and 10000</Text>
            </View>

        );
    }

    function vehiclenumber() {
        return (
            <View style={styles.vehicleNumberContainer}>
                <View style={styles.vehicleImageContainer}>
                    {/* <Image
                        source={require('../../../assests/images/IND.jpg')}
                        style={styles.vehicleImage}
                    /> */}
                </View>
                <View style={styles.vehicleTextContainer}>
                    {/* <Text style={styles.vehicleOwnerName}>{billData?.data?.CustomerName}</Text> */}
                    <Text style={styles.vehicleNumber}>{providerData?.number}</Text>
                    {/* <Text style={{...styles.vehicleNumber, fontSize:20}}>{providerData?.OperatorName}</Text> */}
                </View>
            </View>
        );
    }
}

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
        backgroundColor: Colors.white,
        paddingVertical: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding * 2,
        borderRadius: 100,
        borderWidth: 1
    },
    fasttagDetailsText: {
        ...Fonts.primaryLight15RobotoRegular,
        color: '#00000090'
    },
    addAmountContainer: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        borderRadius: 10,
        padding: 0,
        marginTop: Sizes.fixPadding * 3,
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: SCREEN_WIDTH * 0.3,
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    textInput: {
        ...Fonts.primaryLight18RobotoMedium,
        paddingHorizontal: 10,
        width: '100%',
        textAlign: 'center'
    },
    vehicleNumberContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,


    },
    vehicleImageContainer: {
        flex: 0.2,
        paddingRight: Sizes.fixPadding * 0.5
    },
    vehicleImage: {
        height: SCREEN_WIDTH * 0.12,
        width: SCREEN_WIDTH * 0.12,
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
        ...Fonts.primaryLight15RobotoRegular,
        color: '#000',
        fontSize: 20

    },
    maincontainer: {
        backgroundColor: Colors.white,
        padding: Sizes.fixPadding,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding
    },
    bottomSheetTitle: {
        ...Fonts.primaryLight15RobotoRegular,
        color: '#000000',
        marginLeft: 10
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 0.2,
        alignItems: 'center'
    },
    detailLabel: {
        ...Fonts.primaryDark11InterMedium,
        color: Colors.black
    },
    detailValue: {
        ...Fonts.primaryDark14RobotoMedium,
        color: Colors.black
    }
});
