import { BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import MyHeader from '../../components/MyHeader'
import { Fonts, Sizes } from '../../assets/style'
import { connect } from 'react-redux';
import * as SettingActions from '../../redux/actions/SettingActions';
import DatePicker from 'react-native-date-picker';
import Stepper from '../../components/Stepper';
import { SCREEN_WIDTH } from '../../config/Screen';
import CommanNextbtn from '../../components/CommanNextbtn';

import { useFocusEffect } from '@react-navigation/native';
import TranslateText from '../language/TranslateText';
import { t } from 'i18next';
const KundliBirthDate = ({ navigation, kundlidob, dispatch }) => {

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

    console.log(kundlidob);
    const [date, setDate] = useState(new Date());
    const handleNext = () => {
        dispatch(SettingActions.setDob(date));
        navigation.navigate('KundliBirthTime');
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
         <MyHeader  title= {<TranslateText title={t('Enter Your Details')}/>} navigation={navigation} />
            <View style={{ paddingHorizontal: Sizes.fixPadding, gap: SCREEN_WIDTH * 0.26, marginTop: SCREEN_WIDTH * 0.04 }}>
                <Stepper activeStep={3} />
                <View style={{ gap: SCREEN_WIDTH * 0.1 }}>
                    {BirtDateText()}
                    {dataModal()}
                    <CommanNextbtn onPress={handleNext} />


                </View>
            </View>

        </SafeAreaView>
    )

    function BirtDateText() {
        return (
            <View>
                <Text style={{
                    ...Fonts.primaryHelvetica,
                    color: '#363636',
                    textAlign: 'center',
                    fontSize: 26,
                }}> <TranslateText title={' What is Your Birth date<'}/></Text>
            </View>
        )
    }
    function dataModal() {
        return (
            <View style={{ alignSelf: 'center', }}>
                <DatePicker
                    date={date}
                    //   onDateChange={setDate}
                    onDateChange={(newDate) => setDate(newDate)}
                    mode="date"
                    dividerColor="#000000"
                    theme="light"
                    modal={false}
                    buttonColor="red"
                />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    kundlidob: state.setting.kundlidob,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KundliBirthDate);
// export default KundliBirthDate

const styles = StyleSheet.create({})