import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';


import { navigate } from '../../../navigations/NavigationServices';
import { connect } from 'react-redux';
// import * as RechargeActions from '../../../redux/actions/RechargeActions'
import Loader from '../../../components/Loader';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
// import defaultOperatorImg from '../../../assests/images/tatasky.png';
import MyStatusBar from '../../../components/MyStatusbar';
import MyHeader from '../../../components/MyHeader';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { colors } from '../../../config/Constants1';

const MobileNumbertoDth = ({ dispatch, dthOperatorData }) => {
    const navigation = useNavigation()
    const [imgError, setImgError] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(dthOperatorData);
    const [mobileNumber, setMobileNumber] = useState('');


    useEffect(() => {
        // dispatch(RechargeActions.getDthOperator());
    }, [])









    return (
        <SafeAreaView style={styles.safeAreaView}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />

            <MyHeader title={'Mobile No. to DTH ID'} tintColor={Colors.white} navigation={navigation}/>
            <View style={styles.mainView}>
                {rechargename()}
                {bottomInputField()}
            </View>
        </SafeAreaView>
    );

    function rechargename() {
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
                        {/* <Image
                            source={
                                imgError || !item?.operatorImage
                                    ? defaultOperatorImg
                                    : { uri: item?.operatorImage }
                            }
                            onError={() => setImgError(true)}
                            style={styles.image}
                            resizeMode="contain"
                        /> */}
                    </View>
                    <Text style={styles.text}>{item?.OperatorName}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    data={dthOperatorData}
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





    function bottomInputField() {






        return (
            <View style={styles.bottomContainer}>
                <Text style={styles.inputLabel}>Customer Number</Text>
                <View style={styles.inputRow}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="phone" size={20} color={'white'} />
                    </View>
                    <TextInput
                        maxLength={10}
                        placeholder="Enter mobile number"
                        keyboardType="phone-pad"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        style={styles.mobileInput}
                        placeholderTextColor={'#999'}
                    />
                </View>

                <TouchableOpacity
                    style={styles.processButton}
                    onPress={() => {
                        console.log('Processing mobile number:', mobileNumber);
                    }}
                >
                    <Text style={styles.processButtonText}>Process</Text>
                </TouchableOpacity>
            </View>
        );
    }





};
const mapStateToProps = state => ({

    // dthOperatorData: state.rechargeReducer.dthOperatorData

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MobileNumbertoDth);


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
        backgroundColor: '#002E6E',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    processButtonText: {
        ...Fonts.PoppinsRegular,
        fontSize: 14,
        color: 'black',
    },

    bottomContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        gap: 10,
        bottom: 20,
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
        borderColor: '#8A2BE2',
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
        backgroundColor: '#002E6E',
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




