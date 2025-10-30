import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Modal, Dimensions, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Colors, Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import MyHeader from '../../components/MyHeader';
import * as RechargeActions from '../../redux/actions/RechargeActions';
import { connect } from 'react-redux';
import { colors } from '../../config/Constants1';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontsStyle, img_url } from '../../config/constants';
import SvgOrImage from '../../components/SvgOrImage';
import moment from 'moment';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../components/MyStatusbar';

const { width, height } = Dimensions.get('screen');

const Allservices = ({ dispatch, servicesList, bannerData, rechargeBanner, rechargeHistory }) => {
    const navigation = useNavigation();
    const [showRechargeModal, setShowRechargeModal] = useState(false);
    const [activeTab, setActiveTab] = useState('services');
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        dispatch(RechargeActions.getServicesList({}));
        dispatch(RechargeActions.getRechargeBanner({}));
        fetchRechargeHistory();
    }, [dispatch]);

    const fetchRechargeHistory = async () => {
        try {
            setLoading(true);
            await dispatch(HistoryActions.getRechargeHistory());
        } catch (error) {
            console.error("Error fetching recharge history:", error);
        } finally {
            setLoading(false);
        }
    };

    const getServiceIcon = (serviceName) => {
        const iconMap = {
            'PREPAID RECHARGE': require("../../assets/images/Phone.png"),
            'POSTPAID RECHARGE': require("../../assets/images/Phone.png"),
            'MOBILE RECHARGE': require("../../assets/images/Phone.png"),
            'DTH RECHARGE': require("../../assets/images/DthNew.png"),
            'GAS CYLINDER': require("../../assets/images/GasCylinderNew.png"),
            'FASTAG': require("../../assets/images/FastTagNew.png"),
            'ELECTRICITY': require("../../assets/images/ElectricityNew.png"),
             'BROADBAND': require("../../assets/images/wifi.png"),
            'WATER': require("../../assets/images/Water.png"),
            'MUNICIPAL TAXES': require("../../assets/images/Municipal.png"),
            'LANDLINE': require("../../assets/images/LandLine.png"),
            'GAS PIPED': require("../../assets/images/gaspipe.png"),
        };
        return iconMap[serviceName?.toUpperCase()] || require('../../assets/images/Phone.png');
    };

    const handleServicePress = (item) => {
        const name = item?.service_name?.toUpperCase();

        if (name === 'MOBILE RECHARGE') {
            setShowRechargeModal(true);
        } else {
            const routeMap = {
                'DTH RECHARGE': 'Dth',
                'GAS CYLINDER': 'GasOperators',
                'FASTAG': 'Fasttag',
                'ELECTRICITY': 'Electricity',
                 'WATER': 'WaterPage',
                'MUNICIPAL TAXES': 'MunicipalProviders',
                'LANDLINE': 'LandLineProviders',
                'BROADBAND': 'BroadBandProviders',
                'GAS PIPED':'GasPiped'

            };
            const route = routeMap[name];
            if (route) {
                navigation.navigate(route, {
                    serviceId: item?.service_id,
                    serviceName: item?.service_name
                });
            } else {
                Alert.alert('Service coming soon');
            }
        }
    };

    const displayedList = [];
    let addedMobile = false;

    (servicesList || []).forEach(item => {
        const name = item?.service_name?.toUpperCase();
        // Skip service_id 30 and 31
        if (item.service_id == 30 || item.service_id == 31) {
            return;
        }
        
        if ((name === 'PREPAID RECHARGE' || name === 'POSTPAID RECHARGE')) {
            if (!addedMobile) {
                displayedList.push({
                    service_name: 'Mobile Recharge',
                    service_id: '1000' // dummy ID
                });
                addedMobile = true;
            }
        } else if ([1,2,3,8,9,10,22, 20, 16, 15, 11].includes(Number(item.service_id))) {
            displayedList.push(item);
        }
    });

    const renderRechargeItem = ({ item }) => {
        const statusColor = {
            SUCCESS: '#4CAF50',
            FAILURE: '#F44336',
            CANCEL: '#FF9800',
            PENDING: '#2196F3',
        }[item.status] || '#9E9E9E';

        return (
            <View style={styles.historyCard}>
                <View style={styles.historyRow}>
                    <Text style={styles.historyLabel}>{t("Number")}:</Text>
                    <Text style={styles.historyValue}>{item.number || 'N/A'}</Text>
                </View>
                <View style={styles.historyRow}>
                    <Text style={styles.historyLabel}>{t("Operator")}:</Text>
                    <Text style={styles.historyValue}>{item.productName || 'N/A'}</Text>
                </View>
                <View style={styles.historyRow}>
                    <Text style={styles.historyLabel}>{t("Amount")}:</Text>
                    <Text style={styles.historyValue}>₹{item.amount || 0}</Text>
                </View>
                <View style={styles.historyRow}>
                    <Text style={styles.historyLabel}>{t("Status")}:</Text>
                    <Text style={[styles.historyValue, { color: statusColor }]}>
                        {t(`${item.status}` || 'N/A')}
                    </Text>
                </View>
                <View style={styles.historyRow}>
                    <Text style={styles.historyLabel}>{t("Date")}:</Text>
                    <Text style={styles.historyValue}>
                        {item.createdAt ? moment(item.createdAt).format('DD/MM/YYYY, hh:mm A') : 'N/A'}
                    </Text>
                </View>
            </View>
        );
    };

    const renderEmptyHistory = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recharge history found</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle="light-content" />
            <MyHeader title={"Recharge Services"} navigation={navigation} color='#002E6E'/>

            {/* Banner at the top */}

            {rechargeBanner && bannerInfo()}

            {/* Toggle Tabs - Fixed below banner */}

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        activeTab === 'services' && styles.activeButton1,
                    ]}
                    onPress={() => setActiveTab('services')}
                >
                    <Text style={[
                        styles.toggleText,
                        activeTab === 'services' && styles.activeText
                    ]}>
                        {t("All Services")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        activeTab === 'history' && styles.activeButton,
                    ]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[
                        styles.toggleText,
                        activeTab === 'history' && styles.activeText
                    ]}>
                        {t("Recharge History")}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable content area */}
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'services' ? (
                    <View style={styles.servicesContainer}>
                        <Text style={styles.heading}>{t("AstroOne Utility Services")}</Text>

                        {displayedList.length > 0 && (
                            <FlatList
                                data={displayedList}
                                key={`grid_2_columns`}
                                keyExtractor={(item, index) => `${item.service_id}_${index}`}
                                numColumns={2}
                                scrollEnabled={false}
                                contentContainerStyle={styles.servicesGrid}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.serviceBox}
                                        onPress={() => handleServicePress(item)}
                                    >
                                        <View style={styles.iconCircle}>
                                            <Image
                                                source={getServiceIcon(item.service_name)}
                                                style={styles.iconImage}
                                            />
                                        </View>
                                        <Text style={styles.serviceText}>{t(`${item.service_name}`)}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                ) : (
                    <View style={styles.historyContainer}>
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Loading history...</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={[...rechargeHistory].reverse()} 
                                scrollEnabled={false}
                                renderItem={renderRechargeItem}
                                keyExtractor={(item, index) => index.toString()}
                                ListEmptyComponent={renderEmptyHistory}
                                contentContainerStyle={styles.historyListContent}
                            />
                        )}
                    </View>
                )}
            </ScrollView>

            {/* Recharge Modal */}

            <Modal
                transparent
                visible={showRechargeModal}
                animationType="slide"
                onRequestClose={() => setShowRechargeModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <TouchableOpacity
                            style={styles.crossButton}
                            onPress={() => setShowRechargeModal(false)}
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>{t("Select Recharge Type")}</Text>

                        <View style={{ flexDirection: "row", justifyContent: 'space-around', width: '100%' }}>
                            <TouchableOpacity
                                style={styles.modalServiceBox}
                                onPress={() => {
                                    setShowRechargeModal(false);
                                    navigation.navigate('Recharge', {
                                        serviceType: 'PREPAID',
                                        serviceId: '1',
                                        serviceName: 'Prepaid Recharge',
                                    });
                                }}
                            >
                                <View style={styles.modalIconCircle}>
                                    <Image
                                        source={require('../../assets/images/Phone.png')}
                                        style={styles.modalIconImage}
                                    />
                                </View>
                                <Text style={styles.modalServiceText}>{t("Prepaid")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalServiceBox}
                                onPress={() => {
                                    setShowRechargeModal(false);
                                    navigation.navigate('SelectOperator', {
                                        serviceType: 'POSTPAID',
                                        serviceId: '2',
                                        serviceName: 'Postpaid Recharge',
                                    });
                                }}
                            >
                                <View style={styles.modalIconCircle}>
                                    <Image
                                        source={require('../../assets/images/Phone.png')}
                                        style={styles.modalIconImage}
                                    />
                                </View>
                                <Text style={styles.modalServiceText}>{t("Postpaid")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );

   
     function bannerInfo() {
        return (
            <View style={{ padding: 10,height:width / 2.2 }}>
                <Carousel
                    loop
                    width={width}
                    height={width / 2.2}
                    autoPlay
                    autoPlayInterval={3000}
                    data={rechargeBanner.filter(item => item?.redirectTo === 'Recharge-home')}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View>
                            <Image source={{ uri: item?.bannerImage}}
                                style={{ width: width * 0.95, height: width / 2.6, borderRadius: 10,  }}
                            />
                        </View>
                    )}
                />
            </View>
        )
    }
};

const mapStateToProps = state => ({
    servicesList: state.rechargeReducer.servicesList,
    bannerData: state.home.bannerData,
    rechargeBanner: state.rechargeReducer.rechargeBanner,
    rechargeHistory: state.history.rechargeHistory || []
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Allservices);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFEFF',
    },
    bannerContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    bannerItem: {
        paddingHorizontal: 5,
    },
    bannerImage: {
        width: '100%',
        height: width / 2.5,
        borderRadius: 10,
        resizeMode: "cover",
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginHorizontal: 15,
        marginVertical: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    toggleButton: {
        flex: 1,
        paddingVertical:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeButton: {
        backgroundColor: '#002E6E',
    },
    activeButton1: {
        backgroundColor: '#002E6E',
    },
    toggleText: {
        ...Fonts.PoppinsMedium,
        fontSize: 14,
        color: '#666',
        ...FontsStyle.fontfamily
    },
    activeText: {
        ...Fonts.PoppinsMedium,
        fontSize:14,
        color: Colors.white,
         ...FontsStyle.fontfamily
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    servicesContainer: {
        // paddingHorizontal: 15,
        // paddingTop: 5,
    },
    heading: {
         ...FontsStyle.fontfamily,
         fontWeight:'bold',
        color: '#002E6E',
        fontSize: 15,
        textAlign: "center",
        marginBottom: 15,
    },
    servicesGrid: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#FFF6F1',
    },
    serviceBox: {
        width: SCREEN_WIDTH / 2.3,
        alignItems: 'center',
        margin: 8,
        backgroundColor: '#002E6E',
        paddingVertical: 15,
        borderRadius: 12,
        elevation:1
    },
    iconCircle: {
        backgroundColor: '#fff',
        borderRadius: 100,
        padding: 12,
        height: SCREEN_WIDTH * 0.20,
        width: SCREEN_WIDTH * 0.20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    serviceText: {
         ...FontsStyle.fontfamily,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
        color: '#fff',
    },
    historyContainer: {
        paddingHorizontal: 15,
        paddingTop: 5,
    },
    historyCard: {
        backgroundColor: Colors.white,
        marginBottom: 12,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    historyRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    historyLabel: {
        width: 90,
        ...Fonts.PoppinsMedium,
        color: '#555',
        fontSize: 13,
    },
    historyValue: {
        flex: 1,
         ...FontsStyle.fontfamily,
        color: '#333',
        fontSize: 13,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
         ...FontsStyle.fontfamily,
        color: '#999',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    loadingText: {
         ...FontsStyle.fontfamily,
        color: '#666',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    crossButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    modalTitle: {
        ...Fonts.PoppinsSemiBold,
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    modalServiceBox: {
        width: SCREEN_WIDTH / 3,
        alignItems: 'center',
    },
    modalIconCircle: {
        backgroundColor: '#FFF6F1',
        borderRadius: 100,
        padding: 12,
        height: SCREEN_WIDTH * 0.18,
        width: SCREEN_WIDTH * 0.18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalIconImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    modalServiceText: {
        ...Fonts.PoppinsMedium,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        color: '#333',
    },
});