import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'


import Button from '../Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, useSelector } from 'react-redux'
import * as RechargeActions from '../../../redux/actions/RechargeActions'

import { showToastMessage } from '../../../utils/services'
import Carousel from 'react-native-reanimated-carousel';
import { Colors, Fonts, Sizes } from '../../../assets/style';



const { width } = Dimensions.get('window');


const ElectricityPayment = ({ route, dispatch, rechargeRequestFields, navigation }) => {
    const providerData = route.params?.providerData
    const [fields, setFields] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subscriberId, setSubscriberId] = useState('');
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState('');
    const [selectedOperator, setSelectedOperator] = useState({
        OperatorName: providerData?.OperatorName || 'Select Operator',
        image: providerData?.operatorImage
            ? { uri: providerData.operatorImage }
            : ""
    });

    useEffect(() => {
        // Update operator when providerData changes
        if (providerData) {
            setSelectedOperator({
                OperatorName: providerData.OperatorName,
                image: providerData.operatorImage
                    ? { uri: providerData.operatorImage }
                    : ""
            });
        }
        dispatch(RechargeActions.getRechargeRequestFields(providerData?.OperatorCode))
    }, [providerData])

    useEffect(() => {
        setFields(rechargeRequestFields?.Request)
    }, [rechargeRequestFields])

    const validate = () => {
        let valid = true;
        let err = {};

        if (!subscriberId || subscriberId.length === 0) {
            err.subscriber = 'Please enter Subscriber ID';
            valid = false;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            err.amount = 'Invalid amount';
            valid = false;
        }

        setErrors(err);
        return valid;
    };

    const handleProceedPayment = async () => {
        if (!validate()) return;

        try {
            let isValid = true
            fields.forEach(element => {
                if (element.Value.length === 0 || element?.Value === 'Enter Value') {
                    showToastMessage({ message: `${element?.Key} is required` })
                    isValid = false
                }
            });
            if (!isValid) return

            const RequestData = fields.map(element => {
                return { Key: element?.Key, Value: element?.Value }
            })

            const payload = {
                RequestData: { Request: RequestData },
                operator: providerData?.OperatorCode,
                providerData: { ...providerData, number: fields[0]?.Value },
                navigateTo: 'electricityPaymentProcess'
            }

            setLoading(true);
            dispatch(RechargeActions.getRechargeBillDetails(payload))
            setLoading(false);

        } catch (error) {
            console.log({ err: error });
            setLoading(false);
        }
    }

  

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle={'light-content'} />
            <Loader visible={loading} />
            <Header title={'Electricity Bill Payment'} tintColor={Colors.white} color={'#002E6E'} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Banner Carousel with gaps */}

                    {/* Operator Selection */}
                    <TouchableOpacity
                        style={styles.inputWrapper}
                        onPress={() => navigation.goBack()}
                    >
                        <View style={styles.iconCircle}>
                            <Image
                                source={selectedOperator.image}
                                style={styles.operatorIcon}
                                resizeMode="contain"
                                onError={(e) => {
                                    console.log('Image load error:', e.nativeEvent.error);
                                    setSelectedOperator(prev => ({
                                        ...prev,
                                        // image: require('../../../assests/images/tatasky.png')
                                    }));
                                }}
                            />
                        </View>
                        <Text style={styles.operatorText}>
                            {selectedOperator.OperatorName}
                        </Text>
                        <Icon name="chevron-right" size={24} color="#666" />
                    </TouchableOpacity>

                    {/* Subscriber ID */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Icon name="identifier" size={16} color="#000" />
                        </View>
                        <TextInput
                            placeholder="Consumer Number"
                            style={styles.input}
                            keyboardType="number-pad"
                            value={subscriberId}
                            onChangeText={setSubscriberId}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {errors.subscriber && <Text style={styles.errorText}>{errors.subscriber}</Text>}

                    {/* Amount */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.rupeeIcon}>₹</Text>
                        </View>
                        <TextInput
                            placeholder="Enter amount"
                            style={styles.input}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

                    <Text style={styles.warningText}>
                        Note: Wrong payments are non-refundable.
                    </Text>



                </View>
            </ScrollView>

            {/* Proceed Button */}
            <View style={styles.proceedButtonContainer}>
                <Button
                    title={'Proceed to Pay'}
                    onPress={handleProceedPayment}
                    buttonStyle={styles.proceedButton}
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    rechargeRequestFields: state.rechargeReducer.rechargeRequestFields,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityPayment);

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 30,
        paddingHorizontal: Sizes.fixPadding,
    },
    container: {
        flex: 1,
        paddingBottom: 80,
    },
    carouselContainer: {
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2,
    },
    bannerImage: {
        width: '100%',
        height: 150,
        borderRadius: Sizes.fixPadding,
        resizeMode: 'cover',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginTop: 15,
        elevation: 1,
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
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    operatorText: {
        flex: 1,
        ...Fonts.PoppinsMedium,
        fontSize: 14,
        color: '#000',
    },
    inputWrapper2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginTop: 15,
        height: 50,
        elevation: 1,
    },
    input: {
        flex: 1,
        ...Fonts.PoppinsRegular,
        fontSize: 14,
        color: '#000',
        paddingVertical: 0,
    },
    rupeeIcon: {
        ...Fonts.PoppinsBold,
        fontSize: 16,
        color: '#000',
    },
    errorText: {
        ...Fonts.PoppinsRegular,
        fontSize: 12,
        color: 'red',
        marginTop: 5,
        marginLeft: 15,
    },
    warningText: {
        ...Fonts.PoppinsRegular,
        fontSize: 12,
        color: '#666',
        marginTop: 15,
        marginLeft: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    actionButton: {
        width: '30%',
        backgroundColor: Colors.primaryTheme,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    actionButtonText: {
        ...Fonts.PoppinsSemiBold,
        fontSize: 12,
        color: Colors.white,
    },
    proceedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 15,
        backgroundColor: Colors.white,
    },
    proceedButton: {
        borderRadius: 8,
        height: 50,
    },
});