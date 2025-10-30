import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Alert
} from 'react-native';


import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { connect } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions';
import WebView from 'react-native-webview';
import MyHeader from '../../../components/MyHeader';
import { Fonts } from '../../../assets/style';
import { Colors } from '../../../config/Screen';
import Carousel from 'react-native-reanimated-carousel';
import { img_url } from '../../../config/constants';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const boxSize = width / 3 - 18;




const SelectOperator = ({ dispatch, postpaidOPerator, allServiceProviders , rechargeBanner }) => {
    console.log("allServiceProviders", allServiceProviders)
    const navigation = useNavigation();
    const route = useRoute();
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { serviceId } = route.params || {};
    const webViewRef = useRef(null);

    const {t} = useTranslation();

    useEffect(() => {
        dispatch(RechargeActions.getAllServiceProviders({ serviceId }));
    }, []);

    useEffect(() => {
        if (allServiceProviders?.length) {
            setFilteredData(allServiceProviders);
        }
    }, [allServiceProviders]);

    const handleSearch = (text) => {
        setSearch(text);
        const newData = allServiceProviders.filter(item =>
            item.product_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(newData);
    };

    const [loading, setLoading] = useState(false);






    const getServiceIcon = (name = '') => {
        const upper = name.toUpperCase();

        if (upper.includes('AIRTEL')) {
            return require("../../../assets/images/airtel.png");
        } else if (upper.includes('JIO')) {
            return require("../../../assets/astroOneImages/JioAPNA.png");
        } else if (upper.includes('TATA')) {
            return require("../../../assets/astroOneImages/TAAAAAATATA.jpeg");
        } else if (upper.includes('BSNL')) {
            return require("../../../assets/astroOneImages/BSNL.png");
        } else if (upper.includes('VI') || upper.includes('VODAFONE') || upper.includes('IDEA')) {
            return require("../../../assets/astroOneImages/VIBADIYA.png");
        } else if (upper.includes('MTNL')) {
            return require("../../../assets/astroOneImages/MTNLSERVICES.jpeg");
        } else {
            ""
        }
    };

    const handleMessage = (event) => {
        let status = event.nativeEvent.data;

        // Parse if it's a stringified boolean
        if (status === 'true' || status === true) {
            console.log('status', status);
            setLoading(false);
        } else {
            setLoading(false);
            console.log('status >>', status);
            Alert.alert(
                'Alert',
                'You are not logged in. Please login to access this page.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('bookingweb'),
                    },
                ],
                { cancelable: false }
            );
        }
    };


    const injectJavaScript = `
            (function() {
                setTimeout(() => {
                    let logoutButton = document.querySelector('a[href*="logout.php"]');
                    window.ReactNativeWebView.postMessage(logoutButton ? "true" : "false");
                }, 5000);
            })();
        `;

    const handleLoadEnd = () => {
        webViewRef.current?.injectJavaScript(injectJavaScript);
    };

    const renderItem = ({ item }) => {
        const operatorImage = getServiceIcon(item.product_name);

        return (
            <TouchableOpacity
                style={styles.operatorCard}
                onPress={() => {
                    const operatorData = {
                        name: item.product_name,
                        code: item.product_code,
                        serviceId: item.service_id,
                        image: operatorImage,
                    };
                    dispatch(RechargeActions.setSelectedOperator(operatorData));
                    
                    if (serviceId == 1) {
                        navigation.navigate('Recharge');
                    } else {
                        navigation.navigate('Udhaar');
                    }
                }}
            >
                {operatorImage ? (
                    <Image source={operatorImage} style={styles.image} />
                ) : null}
                <Text style={styles.operatorName}>{item.product_name}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <MyHeader title="Select Operator" tintColor={Colors.white} navigation={navigation} color='#002E6E'/>
            <View style={{ height: width / 2, marginTop:10}}>              
                <Carousel
              loop
              width={width}
              height={width / 2.2}
              autoPlay
              autoPlayInterval={3000}
              data={rechargeBanner.filter(item => item?.redirectTo == 'Recharge-prepaid')}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <View style={{ alignItems: 'center' }}>
                  <Image source={{ uri:  item?.bannerImage}}
                    style={{ width: width * 0.95, height: width / 2.5, borderRadius: 10, resizeMode: "cover" }}
                  />
                </View>
              )}
            />
            </View>

            <View style={styles.searchContainer}>
               
                <FontAwesome6 name="magnifying-glass" color={'black'} size={16} />
                <TextInput
                    placeholder={t("Search Operator")}
                    value={search}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
                    placeholderTextColor="black"
                />
            </View>

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No operator found.</Text>
                )}
                contentContainerStyle={styles.listContainer}
            />

            {loading && (
                <View style={{ height: '100%', position: 'absolute', zIndex: 10, width: '100%', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#E58634" />
                    {/* <Text style={styles.text}>Loading...</Text> */}
                </View>
            )}
            {/* {renderWebView()} */}
        </View>
    );

    function renderWebView() {
        return (
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://www.bharatdarshan.today' }}
                style={{ height: 1, width: 1, opacity: 0 }}
                onMessage={handleMessage}
                onLoadEnd={handleLoadEnd}
            />
        );
    }
};

const mapStateToProps = (state) => ({
    allServiceProviders: state.rechargeReducer.allServiceProviders,
    selectedOperator: state.rechargeReducer.selectedOperator,
    rechargeBanner: state.rechargeReducer.rechargeBanner
});

export default connect(mapStateToProps)(SelectOperator);

// 📱 Enhanced Styles Below:
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        margin: 12,
        borderRadius: 10,
        paddingHorizontal: 12,
        borderWidth: 0.5,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
        paddingVertical: 8,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    operatorCard: {
        width: boxSize,
        height: boxSize + 10, // slightly more vertical space
        margin: 5,
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    operatorName: {
        ...Fonts.PoppinsMedium,
        color: '#333',
        fontSize: 11, // smaller than prepaid
        textAlign: 'center',
        lineHeight: 13,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
    },
});
