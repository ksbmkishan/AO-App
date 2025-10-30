import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const dummyPlans = [
    { id: '1', title: 'Unlimited Calls + 1.5GB/day for 28 days', price: '249' },
    { id: '2', title: '2GB/day + 100 SMS/day for 56 days', price: '399' },
    { id: '3', title: '1GB/day + Calls for 84 days', price: '599' },
    { id: '4', title: '100GB Total + Calls, Validity 60 days', price: '299' },
    { id: '5', title: 'Truly Unlimited with 3GB/day for 90 days', price: '799' },
];

const RecommendedPacks = () => {
    const navigation = useNavigation()
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.planItem} onPress={() => {
            navigation.navigate('MobileRecharge', {
                item
            })
        }}>



            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>₹{item.price}</Text>
            </View>

            <Text style={styles.planText}>{item.title}</Text>

        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={dummyPlans}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default RecommendedPacks;

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
        fontSize: 14,
        color: '#333',
        fontFamily: 'Poppins-Regular',
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
