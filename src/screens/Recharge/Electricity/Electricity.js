import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions';



import { navigate } from '../../../navigations/NavigationServices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useRoute } from '@react-navigation/native';
import MyStatusBar from '../../../components/MyStatusbar';
import Header from '../../live/components/Header';
import MyHeader from '../../../components/MyHeader';
import { Colors, Fonts } from '../../../assets/style';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '../../../config/Screen';
import SvgOrImage from '../../../components/SvgOrImage';
import { useTranslation } from 'react-i18next';

const Electricity = ({ dispatch, allServiceProviders, navigation , rechargeBanner }) => {

    console.log("|?????kingsir", allServiceProviders)
    const {t} = useTranslation();

    const [search, setSearch] = useState('');
    const [filteredStates, setFilteredData] = useState([]);
    const route = useRoute();
    const { serviceId } = route.params;

    useEffect(() => {
        if (route?.params?.serviceId) {
            dispatch(RechargeActions.getAllServiceProviders({ serviceId: route.params.serviceId }));
        } else {
            console.warn("⚠️ serviceId is missing in route.params");
        }
    }, []);

    useEffect(() => {
        setFilteredData(allServiceProviders || []);
    }, [allServiceProviders]);

    console.log('filteredStates ', filteredStates)

    const searchFilterFunction = (text) => {
        if (allServiceProviders?.length) {
            const newData = allServiceProviders.filter(item =>
                item.product_name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(newData);
        }
        setSearch(text);
    };

    console.log('Total items:', filteredStates.length);

    const renderItem = ({ item }) => {
        console.log('item ', item);
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() =>
                    navigate('ElectricityProvidersList', {
                        stateName: item.product_name,
                        providerDetails: item,
                    })
                }
            >
                <View style={styles.row}>
                    <MaterialCommunityIcons
                        name="lightbulb-on-outline"
                        size={22}
                        color={Colors.primaryTheme}
                        style={{ marginRight: 10 }}
                    />

                    <Text style={styles.itemText}>{item.product_name}</Text>

                    <Entypo
                        name="chevron-thin-right"
                        size={16}
                        color="black"
                        style={{ marginLeft: 'auto' }}
                    />
                </View>
            </TouchableOpacity>
        )

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle="light-content" />
            <MyHeader title="Select Your State" tintColor={Colors.white} navigation={navigation} color='#002E6E' />
             <View style={{ padding: 10,flex:0.3 }}>
                <Carousel
                    loop
                    width={SCREEN_WIDTH}
                    height={SCREEN_WIDTH / 2.2}
                    autoPlay
                    autoPlayInterval={3000}
                    data={rechargeBanner.filter(item => item?.redirectTo == 'Electricity')}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View>
                            <SvgOrImage uri={item?.bannerImage}
                                style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_WIDTH / 2.5, borderRadius: 10, resizeMode: "cover" }}
                            />
                        </View>
                    )}
                />
            </View>
            <View style={styles.searchContainer}>
                <FontAwesome6 name='magnifying-glass' color={'black'} size={16} />
                <TextInput
                    placeholder={t("Search Operator")}
                    value={search}
                    onChangeText={searchFilterFunction}
                    style={styles.searchInput}
                    placeholderTextColor="black"
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={filteredStates}
                    keyExtractor={(item, index) => `${item.product_code}-${index}`}
                    renderItem={renderItem}
                    initialNumToRender={101}
                    maxToRenderPerBatch={101}
                    // windowSize={10}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}
                    ListEmptyComponent={<Text>No data found</Text>} />
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    allServiceProviders: state.rechargeReducer.allServiceProviders,
    rechargeBanner: state.rechargeReducer.rechargeBanner,
});

export default connect(mapStateToProps)(Electricity);

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 0.5
    },
    searchInput: {
        flex: 1,
        ...Fonts.PoppinsMedium,
        color: 'black',
        paddingLeft: 10
    },
    item: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#eee',
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        ...Fonts.PoppinsRegular,
        fontSize: 12,
        textTransform: 'capitalize',
        color: '#333',
        flex: 1
    },
});
