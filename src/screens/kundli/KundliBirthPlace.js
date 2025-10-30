import { BackHandler, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Colors, Fonts, Sizes } from '../../assets/style';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as SettingActions from '../../redux/actions/SettingActions';
import * as KundliActions from '../../redux/actions/KundliActions';
import MyHeader from '../../components/MyHeader';
import Stepper from '../../components/Stepper';
import CommanNextbtn from '../../components/CommanNextbtn';
import TranslateText from '../language/TranslateText';

const KundliBirthPlace = ({
    locationData,
    dispatch,
    isLoading,
    kundliusername,
    kundligender,
    kundlidob,
    kundlidot,
    navigation
}) => {
    // console.log(kundliusername);
    // console.log(kundligender);
    // console.log(kundlidob);
    // console.log(kundlidot);
    const [date, setDate] = useState(new Date());
    const { t } = useTranslation();

    //  useFocusEffect(
    //       useCallback(() => {
    //         const backAction = () => {
    //           navigation.navigate('home');
    //           return true; // Prevent the default back action
    //         };

    //         // Add event listener for Android back button press
    //         BackHandler.addEventListener('hardwareBackPress', backAction);

    //         // Cleanup the event listener when screen loses focus
    //         return () => {
    //           BackHandler.removeEventListener('hardwareBackPress', backAction);
    //         };
    //       },[navigation])
    //     )

    const CREATE_KUNDLI_ASTRO_BOOKS = async () => {
        try {
            // Log all parameter values
            console.log('Kundli Details:', {
                name: kundliusername,
                gender: kundligender,
                dob: kundlidob,
                tob: kundlidot,
                place: locationData?.address || 'Unknown Location',
                lat: locationData?.lat || null,
                lon: locationData?.lon || null,
            });

            const payload = {
                name: kundliusername,
                gender: kundligender,
                dob: kundlidob,
                tob: kundlidot,
                place: locationData?.address || 'Unknown Location',
                lat: locationData?.lat || null,
                lon: locationData?.lon || null,
            };

            console.log(payload, 'payload kundli');

            dispatch(SettingActions.setLocationData(null));

            dispatch(KundliActions.createKundli(payload));
        } catch (error) {
            console.error('Error creating Kundli:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white, }}>
            <MyHeader title={<TranslateText title={t('Enter Your Details')} />} navigation={navigation} />
            <View style={{ paddingHorizontal: Sizes.fixPadding, gap: SCREEN_WIDTH * 0.26, marginTop: SCREEN_WIDTH * 0.04 }}>
                <Stepper activeStep={5} />
                <View style={{ gap: SCREEN_WIDTH * 0.1 }}>
                    {nametext()}
                    {birthplache()}
                    <CommanNextbtn onPress={CREATE_KUNDLI_ASTRO_BOOKS} />



                </View>
            </View>

        </View>
    );



    function recentlySearched() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text
                    style={{
                        ...Fonts.MontserratRegularBlack,
                        fontSize: 12,
                        color: 'white',
                    }}>
                    Recently Searched
                </Text>
                <View
                    style={{
                        paddingVertical: 4,
                        paddingHorizontal: 15,
                        borderRadius: 11,
                        backgroundColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ ...Fonts.MontserratRegularBlack, fontSize: 10 }}>
                        Delhi
                    </Text>
                </View>
            </View>
        );
    }

    function birthplache() {
        return (
            <TouchableOpacity
                style={{
                    paddingVertical: 14,
                    borderRadius: 10,
                    paddingHorizontal: Sizes.fixPadding,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF',
                    borderColor: '#898888',
                    elevation: 2.8
                }}
                onPress={() => {
                    navigation.navigate('placeOfBirth');
                }}>
                <Text style={{ ...Fonts.primaryHelvetica, fontSize: 16, color: '#898888' }}>
                    {locationData ? <TranslateText title={locationData?.address} /> : t('New delhi,Delhi,india ')}
                </Text>
                <Image
                    source={require('../../assets/images/Search.png')}
                    resizeMode="contain"
                    style={{ height: SCREEN_WIDTH * 0.059, width: SCREEN_WIDTH * 0.059 }}
                />
            </TouchableOpacity>
        );
    }

    function nametext() {
        return (
            <View style={{ gap: 6 }}>
                <Text
                    style={{
                        ...Fonts.primaryHelvetica,
                        color: '#363636',
                        textAlign: 'center',
                        fontSize: 26,
                    }}>
                    <TranslateText title={' Where were You born ?'} />

                </Text>
            </View>
        );
    }


};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    kundliusername: state.setting.kundliusername,
    kundligender: state.setting.kundligender,
    kundlidob: state.setting.kundlidob,
    kundlidot: state.setting.kundlidot,
    isLoading: state.setting.isLoading,
    locationData: state.setting.locationData,
});

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(KundliBirthPlace);

const styles = StyleSheet.create({
    genderContainer: {
        height: SCREEN_WIDTH * 0.18,
        width: SCREEN_WIDTH * 0.18,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#D00000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        backgroundColor: 'white',
    },
    genderImage: {
        height: '100%',
        width: '100%',
    },
});
