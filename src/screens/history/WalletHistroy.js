import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import { Colors, Sizes, Fonts } from '../../assets/style';
import MyHeader from '../../components/MyHeader';
import MyStatusBar from '../../components/MyStatusbar';
import moment from 'moment';
import { FontsStyle } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const WalletHistory = ({ dispatch, navigation, walletHistory }) => {
    const [loading, setLoading] = useState(true);

    const {t} = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(HistoryActions.getWalletHistory());
            } catch (error) {
                console.error("Error fetching wallet history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderItem = ({ item }) => {
        const statusColor = {
            SUCCESS: '#4CAF50',
            FAILURE: '#F44336',
            CANCEL: '#FF9800',
            PENDING: '#2196F3',
        }[item.status] || '#9E9E9E';

        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>{t("Transaction ID")}:</Text>
                    <Text style={styles.value}>{item.invoiceId || 'N/A'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{t("Amount")}:</Text>
                    <Text style={styles.value}>₹{item.amount || 0}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{t("Type")}:</Text>
                    <Text style={styles.value}>{getTransactionType(item.type)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{t("Status")}:</Text>
                    <Text style={[styles.value, { color: statusColor }]}>
                        {t(`${item.transactionType}`)|| 'N/A'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{t("Date")}:</Text>
                    <Text style={styles.value}>
                        {item.createdAt ? moment(item.createdAt).format('DD/MM/YYYY, hh:mm A') : 'N/A'}
                    </Text>
                </View>
            </View>
        );
    };

    const getTransactionType = (type) => {
        switch (type) {
            case 'CHAT': return t('chat');
            case 'CALL': return t('call');
            case 'GIFT': return t('Gift');
            case 'WALLET_RECHARGE': return t('Wallet Recharge');
            case 'PRODUCT': return t('Product Purchase');
            default: return type || 'Other';
        }
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t("No transactions found")}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Payment History'} navigation={navigation} />
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={walletHistory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={renderEmptyComponent}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const mapStateToProps = state => ({
    walletHistory: state.history.walletHistory || []
});

export default connect(mapStateToProps)(WalletHistory);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContent: {
        padding: Sizes.fixPadding,
    },
    card: {
        backgroundColor: Colors.white,
        marginBottom: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    row: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding * 0.5,
    },
    label: {
        width: 120,
        ...FontsStyle.fontfamily,
        color: '#555',
        fontSize: 14,
    },
    value: {
        flex: 1,
        ...FontsStyle.fontfamily,
        color: '#333',
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
    },
    emptyText: {
        ...FontsStyle.fontfamily,
        color: '#999',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...FontsStyle.fontfamily,
        color: '#666',
        fontSize: 16,
    },
});