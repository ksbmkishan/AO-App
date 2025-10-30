import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import MyHeader from '../../../components/MyHeader';

import { connect } from 'react-redux';

import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import MyStatusBar from '../../../components/MyStatusbar';
import MyLoader from '../../../components/MyLoader';
import { SCREEN_WIDTH } from '../../../config/Screen';
import Carousel from 'react-native-reanimated-carousel';
import { img_url } from '../../../config/constants';
import { useTranslation } from 'react-i18next';

const GasOperators = ({ dispatch, allServiceProviders,rechargeBanner }) => {
  const route = useRoute();
  const { serviceId } = route.params || {};
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const navigation = useNavigation()
  const {t} =useTranslation();

  useEffect(() => {
    dispatch(RechargeActions.getAllServiceProviders({ serviceId }));
  }, []);

  useEffect(() => {
    setFilteredData(allServiceProviders || []);
  }, [allServiceProviders]);

  const searchFilterFunction = (text) => {
    if (allServiceProviders?.length) {
      const newData = allServiceProviders.filter(item =>
        item.product_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    }
    setSearch(text);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Gas', { providerData: item })}
      style={styles.operatorContainer}
    >
      <Text style={styles.operatorText}>{item.product_name}</Text>

      <Entypo
        name="chevron-thin-right"
        size={16}
        color="black"
        style={{ marginLeft: 'auto' }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={'#002E6E'} barStyle={'light-content'} />
      {/* <MyLoader /> */}
      <MyHeader title={'Gas Operators'} tintColor={Colors.white} navigation={navigation} color='#002E6E'/>
      <View style={{ height: SCREEN_WIDTH / 2.2, padding:10 }}>
        <Carousel
          loop
          width={SCREEN_WIDTH}
          height={SCREEN_WIDTH / 2.2}
          autoPlay
          autoPlayInterval={3000}
          data={rechargeBanner.filter(item => item?.redirectTo === 'Gas')}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri:  item?.bannerImage }}
                style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_WIDTH / 2.5, borderRadius: 10, resizeMode: "cover" }}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          cursorColor={Colors.black}
          placeholder={t("Search Operator")}
          value={search}
          onChangeText={searchFilterFunction}
          placeholderTextColor="gray"
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.product_code?.toString() || index.toString()}
        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No gas operators found.</Text>
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  allServiceProviders: state.rechargeReducer.allServiceProviders,
  rechargeBanner: state.rechargeReducer.rechargeBanner
});

export default connect(mapStateToProps)(GasOperators);

// ✅ Updated Styles:
const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchInput: {
    height: 45,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  operatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  operatorText: {
    ...Fonts.PoppinsMedium,
    color: 'black',
    fontSize: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
});
