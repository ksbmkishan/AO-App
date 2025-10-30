import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import { Colors } from '../../../config/Screen';

const { width } = Dimensions.get('window');

const Popular = ({ plans }) => {
    const dispatch = useDispatch();

    const navigation = useNavigation();

    // Extract Popular plans from the API response


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.planItem}
            onPress={() => {
                dispatch(RechargeActions.setSelectedRecharge(item));
                dispatch(RechargeActions.setRechargeRupees(item?.rs));
                navigation.navigate('Recharge')
            }
            }
        >
            {/* Left Side - Price and Validity */}
            <View style={styles.leftContainer}>
                <Text style={styles.priceText}>₹{item.rs}</Text>
                <Text style={styles.validityText}>{item.validity}</Text>

            </View>

            {/* Right Side - Plan Details */}
            <View style={styles.rightContainer}>
                <View style={styles.detailsContainer}>
                    {item.desc.split('\n').map((line, i) => (
                        line.trim() && (
                            <View key={i} style={styles.detailRow}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.planText}>
                                    {line.trim()}
                                </Text>
                            </View>
                        )
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={plans}
                keyExtractor={(item, index) => `${item.rs}_${index}`}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No plans available</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        padding: 15,
    },
    planItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    leftContainer: {
        width: width * 0.28,
        backgroundColor: '#002E6E',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    rightContainer: {
        flex: 1,
        padding: 15,
    },
    priceText: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        marginBottom: 4,
    },
    validityText: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
    },
    bestValueBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    bestValueText: {
        fontSize: 10,
        color: '#333',
        fontFamily: 'Poppins-Bold',
    },
    planTitle: {
        fontSize: 14,
        color: Colors.primary,
        fontFamily: 'Poppins-Bold',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailsContainer: {
        marginTop: 5,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    bulletPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.primary,
        marginTop: 6,
        marginRight: 8,
    },
    planText: {
        flex: 1,
        fontSize: 13,
        color: '#555',
        fontFamily: 'Poppins-Regular',
        lineHeight: 18,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Poppins-Regular',
    },
});

export default Popular;