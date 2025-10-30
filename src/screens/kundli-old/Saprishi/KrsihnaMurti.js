import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { Fonts } from '../../../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import MyHeader from '../../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';

const KrsihnaMurti = ({ route, planetData, dispatch, basicDetails, kundliId }) => {
    const { t } = useTranslation();
    console.log("basicDetailskk", basicDetails)

    console.log("kundliidtarot", kundliId)
    useEffect(() => {

        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);

    const navigation = useNavigation();

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
        };
        dispatch(KundliActions.getPlanetData(payload));
    }, [dispatch]);

    const renderPlanetDetails = () => {
        const details = planetData?.planets_details;

        if (!details || Object.keys(details).length === 0) {
            return (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No data found in Planet Details</Text>
                </View>
            );
        }

        return Object.entries(details).map(([planet, data], index) => (
            <View key={index} style={styles.card}>
                <Text style={styles.planetTitle}>{planet}</Text>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Planet:</Text>
                    <Text style={styles.value}>{data.planet}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Rashi:</Text>
                    <Text style={styles.value}>{data.rashi}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Ansh:</Text>
                    <Text style={styles.value}>{data.ansh}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Retrograde:</Text>
                    <Text style={styles.value}>{data.retrograde ? data.retrograde : 'No'}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Combust:</Text>
                    <Text style={styles.value}>{data.combust ? data.combust : 'No'}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Rashi Lord:</Text>
                    <Text style={styles.value}>{data.rashilord}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Nakshatra:</Text>
                    <Text style={styles.value}>{data.nakshatra}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Charan:</Text>
                    <Text style={styles.value}>{data.nakshatracharan}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Nakshatra Lord:</Text>
                    <Text style={styles.value}>{data.nakshatralord}</Text>
                </View>

                <View style={styles.cardRow}>
                    <Text style={styles.label}>Nak Sub-lord:</Text>
                    <Text style={styles.value}>{data.nakshatrasublord}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.label}>Nak Sub-Sub-lord:</Text>
                    <Text style={styles.value}>{data.nakshatrasubsublord}</Text>
                </View>
            </View>
        ));
    };

    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={"KRISHNAMURTI PADVATI"} navigation={navigation} />
            {/* <LinearGradient colors={['#1E68B9', '#123A62']} locations={[0, 0.81]}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={[styles.commanTitleText, { color: '#FBB03B' }]}>
                        {t('Planets Details')}
                    </Text>
                </View>
            </LinearGradient> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, gap: 20 }}>


                    {renderPlanetDetails()}
                </View>
            </ScrollView>
        </View>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    planetData: state.kundli.planetData,
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    isLoading: state.setting.isLoading,

    kundliListData: state.kundli.kundliListData,
    kundliId: state.kundli.kundliId,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KrsihnaMurti);

const styles = StyleSheet.create({
    commanTitleText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
    },
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
    },
    noDataText: {
        ...Fonts.PoppinsMedium,
        textAlign: 'center',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    planetTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E68B9',
        marginBottom: 10,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    label: {
        fontWeight: '600',
        color: '#333',
        width: '50%',
    },
    value: {
        color: '#000',
        width: '50%',
        textAlign: 'right',
    },
});
