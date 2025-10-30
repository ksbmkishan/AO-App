import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MyHeader from '../../../components/MyHeader';



const CheckOffer = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const route = useRoute();
    const { number, productCode } = route.params;
    const { checkOfferData, } = useSelector(state => state.rechargeReducer);




    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true);
                setError(null);
                const payload = {
                    number: number,
                    product_code: productCode
                };
                await dispatch(RechargeActions.checkOffer(payload));
            } catch (err) {
                setError('Failed to fetch offers. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, [number, productCode, dispatch]);


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.planItem}
            onPress={() => {
                 dispatch(RechargeActions.setSelectedRecharge(item));
                                dispatch(RechargeActions.setRechargeRupees(item?.rs));
                                navigation.navigate('Recharge')
            }}

        >



            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>₹{item.rs}</Text>
            </View>

            <Text style={styles.planText}>{item.desc}</Text>

        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <MyHeader title="Select Plan" tintColor={Colors.white} navigation={navigation}/>
            <FlatList
                data={checkOfferData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default CheckOffer;

const styles = StyleSheet.create({
    listContainer: {
        padding: 15,
    },
    planItem: {
        flexDirection: 'row',
        gap: 20,
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 12,
        elevation: 1,
    },
    planText: {
        flex: 1,
        color: '#333',
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        paddingRight: 10,
    },
    priceContainer: {
        backgroundColor: '#EA7515', height: '100%', padding: 30, borderTopLeftRadius: 10, borderBottomLeftRadius: 10
    },
    priceText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Poppins-Bold',
    },
});
