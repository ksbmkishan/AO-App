import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import MyHeader from '../../../components/MyHeader';

import { colors } from '../../../config/Constants1';
import { Fonts } from '../../../assets/style';
import SelectPlanTab from './SelectPlanTab';


const ViewPlan = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { circleList, isLoading, mobilePlansData,hlrLookup } = useSelector(state => state.rechargeReducer);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCircleCode, setSelectedCircleCode] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  console.log('hlrLookup' ,mobilePlansData)
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(RechargeActions.getCircleList());
  }, []);

  useEffect(() => {
    if (selectedCircleCode) {
      fetchMobilePlans();
    }
  }, [selectedCircleCode]);

  const handleStateSelect = (state, code) => {
    setSelectedState(state);
    setSelectedCircleCode(code);
    setIsDropdownVisible(false);
  };

  const states = circleList?.data?.map(item => ({
    name: item.circle_name,
    code: item.circle_code
  })) || [];

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MyHeader title={'Select Plan'} tintColor={colors.white} navigation={navigation} color='#002E6E'/>

      {/* Operator & State Selection */}
      <View style={styles.stateHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* <Image
            source={require('../../assests/images/signal-tower.png')}
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
          /> */}
          <Text style={styles.SignalName}>{hlrLookup?.product_name}</Text>
        </View>

        {/* <View style={{ height: 20, borderWidth: 0.5 }} /> */}
{/* 
        <TouchableOpacity
          style={styles.stateDropdown}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Image
              source={require('../../assests/images/web.png')}
              style={{ height: 20, width: 20 }}
              resizeMode="contain"
            />
            <Text style={styles.SignalName}>
              {selectedState || 'Select State'}
            </Text>
            <AntDesign name="down" color={'white'} size={14} />
          </View>
        </TouchableOpacity> */}
      </View>

      {/* Dropdown */}
      {/* {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <ScrollView
            style={styles.dropdownScroll}
            contentContainerStyle={styles.dropdownContent}
          >
            {states.map((state) => (
              <TouchableOpacity
                key={state.code}
                onPress={() => handleStateSelect(state.name, state.code)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{state.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )} */}

      {/* <SelectPlanTab /> */}
      <SelectPlanTab  />
    </View>
  );
};

export default ViewPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stateHeader: {
    backgroundColor: '#002E6E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  SignalName: {
    ...Fonts.PoppinsRegular,
    fontSize: 12,
    color: 'white',
  },
  stateDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 90,
    right: 10,
    zIndex: 10,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: 'white',
    maxHeight: 400,
    width: 150,
  },
  dropdownScroll: {
    flex: 1,
  },
  dropdownContent: {
    paddingVertical: 5,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#333',
  },
});