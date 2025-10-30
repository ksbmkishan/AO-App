import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import * as SettingActions from '../../redux/actions/SettingActions';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import TranslateText from '../language/TranslateText';

const PlaningHistory = ({ PlansHistory, dispatch, route }) => {
    const { ID } = route.params;
    console.log("route", ID)
    const navigation = useNavigation();

    useEffect(() => {

        const payload = {
            chatBotUserId: ID
        }

        console.log("payload", payload)

        dispatch(SettingActions.getPlansHistory(payload));
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.planTitle}><TranslateText title={item.planId?.title} /></Text>
            <View style={styles.row}>
                <Text style={styles.label}><TranslateText title={"🧾 Messages:"} /></Text>
                <Text style={styles.value}><TranslateText title={item.planId?.title} /></Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}><TranslateText title={"💰 Amount:"} /></Text>
                <Text style={styles.value}>₹{item.amountSpent}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}><TranslateText title={"📅 Purchased:"} /></Text>
                <Text style={styles.value}>
                    <TranslateText title={new Date(item.purchasedAt).toLocaleString()} />
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <MyHeader title={"Planning History"} navigation={navigation} />
            <FlatList
                data={PlansHistory}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.empty}>No history found.</Text>}
            />
        </View>
    );
};

const mapStateToProps = state => ({
    PlansHistory: state.setting.PlansHistory,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PlaningHistory);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9', // light gray-blue
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 18,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    planTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e3a8a', // blue shade
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    label: {
        fontSize: 15,
        color: '#374151', // gray-700
        fontWeight: '500',
    },
    value: {
        fontSize: 15,
        color: '#111827', // gray-900
    },
    empty: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#6b7280', // gray-500
    },
});
