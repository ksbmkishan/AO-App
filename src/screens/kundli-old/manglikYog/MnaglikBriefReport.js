import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Fonts } from '../../../assets/style';

const ManglikBriefReport = ({ basicDetails, dispatch, ManglikRePORT, isLoading }) => {

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon
        };
        dispatch(KundliActions.getManglikReport(payload));
    }, [dispatch]);

    const data = ManglikRePORT?.data;

    return (
        <ScrollView style={styles.container}>
            {isLoading || !data ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#5A2D22" />
                    <Text style={styles.loadingText}>Loading your Manglik Report...</Text>
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.title}>{data?.title}</Text>

                    <Text style={styles.row}>
                        <Text style={styles.label}>Result:</Text>
                        <Text style={styles.value}>{data?.result}</Text>
                    </Text>

                    <Text style={styles.row}>
                        <Text style={styles.label}>Manglik Percentage:</Text>
                        <Text style={styles.value}>{data?.percentage}</Text>
                    </Text>

                    <Text style={styles.row}>
                        <Text style={styles.label}>Reason:</Text>
                    </Text>
                    <Text style={styles.description}>{data?.reason}</Text>

                    <Text style={styles.row}>
                        <Text style={styles.label}>Note:</Text>
                    </Text>
                    <Text style={styles.description}>{data?.note}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8E8D9',
        padding: SCREEN_HEIGHT * 0.02,
    },
    card: {
        backgroundColor: '#FFF5EC',
        borderRadius: 12,
        padding: 20,
        elevation: 4,
    },
    title: {
        ...Fonts.black15RobotoMedium,
        fontSize: responsiveFontSize(2.4),
        marginBottom: 18,
        color: '#5A2D22',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    row: {
        fontSize: responsiveFontSize(2),
        marginTop: 10,
        color: '#333',
    },
    label: {
        fontWeight: '600',
        color: '#5A2D22',
    },
    value: {
        fontWeight: 'normal',
        color: '#333',
    },
    description: {
        marginLeft: 24,
        marginTop: 6,
        fontSize: responsiveFontSize(1.8),
        color: '#444',
        textAlign: 'justify',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        marginTop: 12,
        fontSize: responsiveFontSize(2),
        color: '#5A2D22',
    }
});

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    ManglikRePORT: state.kundli.ManglikRePORT,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ManglikBriefReport);
