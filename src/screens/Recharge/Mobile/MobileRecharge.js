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
    PermissionsAndroid,
    Platform,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';


import { selectContactPhone } from 'react-native-contact-picker';
import MyHeader from '../../../components/MyHeader';
import { Colors } from '../../../assets/style';

const { width } = Dimensions.get('window');



// 🔐 Permission Request Function
const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: "Contacts Permission",
                    message: "This app needs access to your contacts to select a mobile number.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else {
        return true;
    }
};

const MobileRecharge = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const { selectedOperator, item } = route.params || {};

    const [mobileNumber, setMobileNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (item?.price) {
            setAmount(item.price);
        }
    }, [item]);

    const openContactPicker = async () => {
        const hasPermission = await requestContactsPermission();
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Please allow contacts permission from settings.");
            return;
        }

        try {
            const selected = await selectContactPhone();
            if (selected && selected.number) {
                setMobileNumber(selected.number.replace(/\s/g, ''));
            } else {
                Alert.alert("No Number", "Selected contact has no phone number.");
            }
        } catch (error) {
            console.warn(error);
            Alert.alert("Error", "Could not access contacts.");
        }
    };

    const validate = () => {
        let valid = true;
        let err = {};

        if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
            err.mobile = 'Invalid mobile number';
            valid = false;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            err.amount = 'Invalid amount';
            valid = false;
        }

        setErrors(err);
        return valid;
    };

    const handleProceed = () => {
        if (validate()) {
            Alert.alert("Success", `Recharge of ₹${amount} initiated for ${mobileNumber}`);
        }
    };

    const renderBanner = ({ item }) => (
        <Image source={item} style={styles.bannerImage} />
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyHeader title={'Mobile'} tintColor={Colors?.white} navigation={navigation} color='#002E6E'/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Carousel */}
                    <View style={styles.carouselContainer}>
                        {/* <Carousel
                            loop
                            width={width - 30}
                            height={150}
                            autoPlay
                            data={bannerImages}
                            scrollAnimationDuration={1000}
                            renderItem={renderBanner}
                        /> */}
                    </View>

                    {/* Operator Info */}
                    <TouchableOpacity style={styles.inputWrapper} onPress={() => { navigation.navigate('SelectOperator') }}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={selectedOperator?.image || require('../../../assets/images/airtel.png')}
                                style={styles.operatorIcon}
                            />
                        </View>
                        <Text style={styles.operatorText}>
                            {selectedOperator?.name || 'Select Operator'}
                        </Text>
                    </TouchableOpacity>

                    {/* Mobile Number */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Icon name="cellphone" size={16} color="#000" />
                        </View>
                        <TextInput
                            placeholder="Enter mobile number"
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity onPress={openContactPicker}>
                            <Feather name="phone-call" size={16} color="#000" />
                        </TouchableOpacity>
                    </View>
                    {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

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
                    <Text style={styles.warningText}>  {selectedOperator?.name || ''} wrong recharges reversal not possible.</Text>

                    {/* Three Buttons */}
                    <View style={{ gap: 20 }}>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={[styles.smallButton, { backgroundColor: 'green' }]} onPress={() => { navigation.navigate('CheckOffer') }}>
                                <Text style={styles.buttonText}>Check Offer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.smallButton, { backgroundColor: 'blue' }]} onPress={() => { navigation.navigate('ViewPlan') }}>
                                <Text style={styles.buttonText}>View Plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.smallButton}>
                                <Text style={styles.buttonText}>Plan Sheet</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            {item?.title &&
                                <Text style={styles.offers}>{item.title}</Text>}

                        </View>


                        {/* Wallet Balance */}
                        <View style={styles.walletContainer}>
                            <Text style={styles.walletText}>Wallet Balance: ₹0</Text>
                        </View>

                    </View>


                    {/* Proceed Button */}
                    <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                        <Text style={styles.proceedText}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default MobileRecharge;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 10,
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
        fontSize: 12,
        color: '#666',
        marginLeft: 5,
        marginTop: 3,
        fontFamily: 'Poppins-Regular',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    smallButton: {
        flex: 1,
        backgroundColor: '#002E6E',
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
        backgroundColor: '#002E6E',
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
    offers: {
        // ...Fonts.PoppinsRegular,
        color: 'black',
        textAlign: 'center'
    }
});
