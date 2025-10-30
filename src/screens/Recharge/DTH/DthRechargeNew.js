import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Alert,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation, useRoute } from '@react-navigation/native';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { connect } from 'react-redux';
import MyHeader from '../../../components/MyHeader';
import { Colors } from '../../../assets/style';
import { SCREEN_WIDTH } from '../../../config/Screen';
import MyLoader from '../../../components/MyLoader';
import SvgOrImage from '../../../components/SvgOrImage';
import { colors, img_url } from '../../../config/Constants1';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const DthRechargeNew = ({ dispatch, isLoading, rechargeBanner }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [subscriberId, setSubscriberId] = useState(route?.params?.number || '');
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState('');
    const [selectedOperator, setSelectedOperator] = useState({
        name: 'Select DTH Operator',
        image: require('../../../assets/images/tatasky.png')
    });

    const {t} = useTranslation();

    const { product_code, product_name, service_id } = route?.params || {};

    useEffect(() => {
        if (product_name) {

            setSelectedOperator({
                name: product_name,

            });
        }
    }, [product_name]);

    const validate = () => {
        let valid = true;
        let err = {};

        if ((!subscriberId)) {
            err.subscriber = 'Please enter Subscriber ID or Mobile No.';
            valid = false;
        }

        // if (!amount || isNaN(amount) || Number(amount) <= 0) {
        //     err.amount = 'Invalid amount';
        //     valid = false;
        // }

        setErrors(err);
        return valid;
    };

    const handleProceed = () => {
        if (validate()) {
            navigation.navigate('Dthconfirm', { product_name, product_code, amount, subscriberId });
        }
    };

    const renderBanner = ({ item }) => (
        // <Image source={item} style={styles.bannerImage} />
        <SvgOrImage uri={img_url + item?.bannerImages} style={styles.bannerImage} />
    );

    console.log('rooute ', route?.params)

    const handleCustomerInfo = () => {

        const payload = {
            data: {
                number: subscriberId,
                product_code: product_code,
            },
            onComplete: () => navigation.navigate('DthInfo', { product_name, product_code, amount, subscriberId }),

        }

        dispatch(RechargeActions.getDTHInfo(payload));
    }

    const handleHeavyRefresh = () => {
        navigation.navigate('HeavyRefresh');
        // const payload = {
        //      number: subscriberId,
        //         product_code: product_code,
        // }

        // dispatch(RechargeActions.getDTHHeavyRefresh(payload));
    }

    const getImage = (id) => {
        let image;
        switch (id) {
            case '21': image = require('../../../assets/images/dishtv.png'); break;
            case '22': image = require('../../../assets/images/airtel.png'); break;
            case '23': image = require('../../../assets/images/tatasky.png'); break;
            case '24': image = require('../../../assets/images/videocon.jpg'); break;
            case '25': image = require('../../../assets/images/sundirect.png'); break;
            default: image = null;
        }
        return image;
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyHeader title={'DTH Recharge'} tintColor={Colors?.white} navigation={navigation} color='#002E6E'/>
            {isLoading && <MyLoader />}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Banner */}


                    {/* <View style={styles.carouselContainer}>
                        <Carousel
                            loop
                             width={width}
                            height={width / 2.2}
                            autoPlay
                            autoPlayInterval={3000}
                            data={rechargeBanner.filter(item => item?.redirectTo == 'Dth')}
                            scrollAnimationDuration={1000}
                             renderItem={({ item }) => (
                        <View>
                            <SvgOrImage uri={img_url + item?.bannerImage}
                                style={{ width: width * 1, height: width / 2.5, borderRadius: 10, resizeMode: "cover" }}
                            />
                        </View>
                    )}
                        />
                    </View> */}


                    <View style={{  height: width / 2.2 }}>
                        <Carousel
                            loop
                            width={width}
                            height={width / 2.2}
                            autoPlay
                            autoPlayInterval={3000}
                            data={rechargeBanner.filter(item => item?.redirectTo === 'Dth')}
                            scrollAnimationDuration={1000}
                            renderItem={({ item }) => (
                                <View>
                                    <Image source={{ uri: item?.bannerImage}}
                                        style={{ width: width * 0.95, height: width / 2.5, borderRadius: 10,  }}
                                    />
                                </View>
                            )}
                        />
                    </View>






                    {/* Operator Selection - Shows selected operator */}
                    <TouchableOpacity
                        style={styles.inputWrapper}
                        onPress={() => navigation.navigate('Dth')}
                    >
                        <View style={styles.iconCircle}>
                            <Image source={getImage(product_code)} style={{ width: 25, height: 100 }} resizeMode='contain' />
                        </View>
                        <Text style={styles.operatorText}>
                            {selectedOperator.name}
                        </Text>

                    </TouchableOpacity>

                    {/* Subscriber ID */}
                    <View style={styles.inputWrapper2}>
                        <View style={styles.iconCircle}>
                            <Icon name="identifier" size={16} color="#000" />
                        </View>
                        <TextInput
                            placeholder={t("Subscriber ID or Mobile No.")}
                            style={styles.input}
                            keyboardType="number-pad"
                            value={subscriberId}
                            maxLength={11}
                            onChangeText={setSubscriberId}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {errors.subscriber && <Text style={styles.errorText}>{errors.subscriber}</Text>}

                    {/* Amount */}
                    {/* <View style={styles.inputWrapper2}>
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
                    </View> */}
                    {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

                    <Text style={styles.warningText}>
                        {selectedOperator.name}  Wrong  recharges are non-refundable.
                    </Text>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.smallButton]}>
                            <Text style={styles.buttonText}>Plan Sheet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleCustomerInfo()}
                            style={[styles.smallButton, { backgroundColor: '#002E6E' }]}>
                            <Text style={styles.buttonText}>{t("Customer info")}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => handleHeavyRefresh()}
                            style={[styles.smallButton, { backgroundColor: 'blue' }]}>
                            <Text style={styles.buttonText}>Heavy Refresh</Text>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity style={[styles.smallButton, { backgroundColor: 'green' }]}>
                            <Text style={styles.buttonText}>Mobile No. to DTH ID</Text>
                        </TouchableOpacity> */}


                    </View>


                    {/* Wallet */}
                    {/* <View style={styles.walletContainer}>
                        <Text style={styles.walletText}>Wallet Balance: ₹0</Text>
                    </View> */}

                    {/* Proceed */}
                    {/* <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                        <Text style={styles.proceedText}>Proceed</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </View>
    );
};

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading,
    rechargeBanner: state.rechargeReducer.rechargeBanner,
});

export default connect(mapStateToProps)(DthRechargeNew);

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    carouselContainer: {
        alignItems: 'center',
        margin: 10,

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
        paddingVertical: 10,
        marginTop: 20,
        elevation: 1,

    },
    inputWrapper2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20,
        height: 50,
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
        marginTop: 10,
        fontFamily: 'Poppins-Regular',
    },
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    smallButton: {
        backgroundColor: Colors.primaryTheme,
        paddingVertical: 10,
        marginHorizontal: 4,
        borderRadius: 8,
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.9
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },
    walletContainer: {
        alignItems: 'center',
        marginTop: 25,
    },
    walletText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#444',
    },
    proceedButton: {
        backgroundColor: colors.background_theme2,
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
});


