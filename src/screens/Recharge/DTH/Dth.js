import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { navigate } from '../../../navigations/NavigationServices';
import { connect } from 'react-redux';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import Loader from '../../../components/Loader';
import defaultOperatorImg from '../../../assets/images/tatasky.png';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { Colors, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';
import MyStatusBar from '../../../components/MyStatusbar';
import MyHeader from '../../../components/MyHeader';
import { img_url } from '../../../config/constants';
import Carousel from 'react-native-reanimated-carousel';
import { useTranslation } from 'react-i18next';
const Dth1 = ({ dispatch, dthOperatorData, rechargeBanner }) => {

    console.log("dthOperatorData", dthOperatorData);
    const {t} = useTranslation();

    const navigation = useNavigation()
    const [imgError, setImgError] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(dthOperatorData);


    useEffect(() => {
        dispatch(RechargeActions.getDthOperator());
    }, [])





    useEffect(() => {
        setFilteredData(dthOperatorData);
    }, [dthOperatorData]);



    const handleSearch = (text) => {
        setSearch(text);
        const newData = dthOperatorData.filter(item =>
            item?.OperatorName?.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(newData);
    };


    return (
        <SafeAreaView style={styles.safeAreaView}>
            <MyStatusBar backgroundColor={'#002E6E'} barStyle={'light-content'}/>
            {/* <Loader /> */}
            <MyHeader title={'Select Operator'} navigation={navigation} tintColor={Colors.white} color='#002E6E'/>
            <View style={styles.mainView}>
                <View style={{ height: SCREEN_WIDTH / 2.2, padding: 10 }}>
                    <Carousel
                        loop
                        width={SCREEN_WIDTH}
                        height={SCREEN_WIDTH / 2.2}
                        autoPlay
                        autoPlayInterval={3000}
                        data={rechargeBanner.filter(item => item?.redirectTo === 'Dth')}
                        scrollAnimationDuration={1000}
                        renderItem={({ item }) => (
                            <View>
                                <Image source={{ uri: item?.bannerImage }}
                                    style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_WIDTH / 2.5, borderRadius: 10, }}
                                />
                            </View>
                        )}
                    />
                </View>
                {SearchInput()}
                {rechargename()}
                {/* {bottomInputField()} */}
            </View>
        </SafeAreaView>
    );

    function rechargename() {
        const getImage = (id) => {
            let image;
            switch (id) {
                case '21': image = require('../../../assets/images/dishtv.png'); break;
                case '22': image = require('../../../assets/images/airtel.png'); break;
                case '23': image = require('../../../assets/images/tatasky.png'); break;
                case '24': image = require('../../../assets/images/videocon.jpg'); break;
                case '25': image = require('../../../assets/images/sundirect.png'); break;
                default: image = null;
            }
            return image;
        };
        const renderItem = ({ item }) => {

            return (
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    activeOpacity={0.5}
                    onPress={() => {
                        navigate('DthRechargeNew', { ...item });
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Image source={getImage(item?.product_code)} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                    </View>
                    <Text style={styles.text}>{item?.product_name}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item) => item?.OperatorCode}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    function SearchInput() {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 0,
                borderRadius: 10,
                backgroundColor: '#f0f0f0',
                marginTop: 10,
                marginHorizontal: 10,
                borderWidth: 0.5
            }}>
                <FontAwesome6 name='magnifying-glass' color={'black'} size={16} />

                <TextInput
                    placeholder={t("Search Operator")}
                    value={search}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
                    placeholderTextColor="black"
                />
            </View>
        )
    }


    function bottomInputField() {






        return (
            <View style={styles.bottomContainer}>
                {/* Mobile No. to DTH ID */}
                <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={() => {
                        navigation.navigate('MobileNumbertoDth', { dthList: filteredData });
                    }}
                >
                    <View style={styles.bottomLeftContent}>

                        <Text style={styles.commanText}>Mobile No. to DTH ID</Text>
                    </View>
                    <Entypo name='chevron-thin-right' color={'black'} size={20} />
                </TouchableOpacity>

                {/* Heavy Refresh */}
                {/* <TouchableOpacity
                    style={styles.heavyRefreshButton}
                    onPress={() => {
                        navigation.navigate('HeavyRefresh')
                    }}
                >
                    <View style={styles.bottomLeftContent}>
                        <FontAwesome6 name="rotate" size={18} color="black" />
                        <Text style={styles.commanText}>Heavy Refresh</Text>
                    </View>
                    <Entypo name='chevron-thin-right' color={'black'} size={20} />
                </TouchableOpacity> */}
            </View>
        );
    }





};
const mapStateToProps = state => ({

    dthOperatorData: state.rechargeReducer.dthOperatorData,
    rechargeBanner: state.rechargeReducer.rechargeBanner

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dth1);


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    mainView: {
        flex: 1,
        zIndex: -1
    },
    touchableOpacity: {
        width: '47%', // Leave some space between 2 columns
        marginTop: Sizes.fixPadding * 2,
        gap: Sizes.fixPadding * 0.3,
        borderWidth: 0.5,
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.18,
        height: SCREEN_WIDTH * 0.18,
        borderRadius: 100,
        overflow: 'hidden',

    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: Sizes.fixPadding,

    },
    text: {
        ...Fonts.PoppinsRegular,
        fontSize: 12,
        textAlign: 'center',
        color: 'black'
    },
    flatListContainer: {
        flex: 1,
        padding: Sizes.fixPadding * 0.5,
    },
    searchInput: {

        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        flex: 1
    },
    commanText: {
        ...Fonts.PoppinsRegular,
        fontSize: 12,
        color: 'black'
    },
    bottomContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        gap: 10,
        bottom: 20
    },
    bottomButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
    },
    heavyRefreshButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#e6e6fa',
    },
    bottomLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    lottieIcon: {
        height: 24,
        width: 24,
    },
    inputLabel: {
        ...Fonts.PoppinsRegular,
        fontSize: 13,
        color: 'black',
        marginBottom: 5,
        marginLeft: 4,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderColor: '#8A2BE2'
    },
    iconContainer: {
        backgroundColor: '#8A2BE2',
        padding: 8,
        borderRadius: 100,
        marginRight: 10,
    },
    mobileInput: {
        flex: 1,
        fontSize: 14,
        color: 'black',
        fontFamily: 'Poppins-Regular',
    },
    processButton: {
        backgroundColor: Colors.primaryTheme,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    processButtonText: {
        ...Fonts.PoppinsRegular,
        fontSize: 14,
        color: 'white',
    },

});




