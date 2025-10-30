import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SwitchComponent,
  BackHandler,
} from 'react-native';
import MyHeader from '../../components/MyHeader';
import { Fonts, Sizes } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import * as SettingActions from '../../redux/actions/SettingActions';
import { connect } from 'react-redux';
import Stepper from '../../components/Stepper';
import CommanNextbtn from '../../components/CommanNextbtn';
import { replace } from '../../navigations/NavigationServices';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors } from '../../config/Constants1';
import TranslateText from '../language/TranslateText';
import { t } from 'i18next';
const Gender = ({ navigation, kundligender, dispatch }) => {
  console.log("kundligender", kundligender);


  // useFocusEffect(
  //     useCallback(() => {
  //       const backAction = () => {
  //         navigation.navigate('home');
  //         return true; // Prevent the default back action
  //       };
    
  //       // Add event listener for Android back button press
  //       BackHandler.addEventListener('hardwareBackPress', backAction);
    
  //       // Cleanup the event listener when screen loses focus
  //       return () => {
  //         BackHandler.removeEventListener('hardwareBackPress', backAction);
  //       };
  //     },[navigation])
  //   )

  console.log(kundligender, 'hiii');
  const SelectGender = (selectedGender) => {
    dispatch(SettingActions.setGender(selectedGender));
  };

  const handleNext = () => {
    if (kundligender) {
      navigation.navigate('KundliBirthDate');
    } else {
      alert('Please select a gender!');
    }
  };




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <MyHeader  title= {<TranslateText title={t('Enter Your Details')}/>} navigation={navigation} />
      <View style={{ paddingHorizontal: Sizes.fixPadding, gap: SCREEN_WIDTH * 0.26, marginTop: SCREEN_WIDTH * 0.04 }}>
        <Stepper activeStep={2} />

        <View style={{ gap: SCREEN_WIDTH * 0.1 }}>
          {nametext()}
          {GenderSelection()}
          <CommanNextbtn onPress={handleNext} />


        </View>
      </View>
    </SafeAreaView>
  );

  function nametext() {
    return (
      <View>
        <Text style={styles.title}> <TranslateText title={'Select Your Gender'}/></Text>
      </View>
    );
  }

  function GenderSelection() {
    return (
      <View style={styles.genderContainer}>
        <GenderButton
          gender="male"
          isSelected={kundligender === 'male'}
          onPress={() => SelectGender('male')}
        />
        <GenderButton
          gender="female"
          isSelected={kundligender === 'female'}
          onPress={() => SelectGender('female')}
        />
      </View>
    );
  }
};

const GenderButton = ({ gender, isSelected, onPress }) => {
  const imageSource =
    gender === 'male'
      ? require('../../assets/images/KundliMale.png')
      : require('../../assets/images/KundliFemale.png');

  return (
    <View style={styles.genderButtonContainer}>
      <TouchableOpacity
        style={[
          styles.genderButton,
          {
            backgroundColor: isSelected ? colors.background_theme2 : 'white',
            borderColor: colors.background_theme2,
          },
        ]}
        onPress={onPress}>
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{
            height: '80%',
            width: '80%',
            tintColor: isSelected ? 'white' : colors.background_theme2,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.genderText}> <TranslateText title={`${gender.charAt(0).toUpperCase() + gender.slice(1)}`}/>{}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  kundligender: state.setting.kundligender,
});

export default connect(mapStateToProps)(Gender);

const styles = StyleSheet.create({
  title: {
    ...Fonts.primaryHelvetica,
    color: '#363636',
    textAlign: 'center',
    fontSize: 26,
  },
  genderContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: SCREEN_WIDTH * 0.08
  },
  genderButtonContainer: {
    alignItems: 'center',
  },
  genderButton: {
    height: SCREEN_WIDTH * 0.28,
    width: SCREEN_WIDTH * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 100,
  },
  genderText: {
    ...Fonts.primaryHelvetica,
    color: '#363636',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 8,
  },
  nextButton: {
    paddingVertical: 14.5,
    backgroundColor: '#31CBE2',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    alignSelf: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    ...Fonts.primaryHelvetica,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 34,
  },
});
