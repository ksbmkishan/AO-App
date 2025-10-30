import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as RechargeActions from '../../../redux/actions/RechargeActions'
import { useRoute } from "@react-navigation/native";
import MyStatusBar from "../../../components/MyStatusbar";

import { Colors, SCREEN_WIDTH } from "../../../config/Screen";
import { Fonts, Sizes } from "../../../assets/style";
import MyHeader from "../../../components/MyHeader";
import Carousel from "react-native-reanimated-carousel";
import { img_url } from "../../../config/constants";
import { useTranslation } from "react-i18next";

const Fasttag = ({ dispatch, fastagOperators, navigation, allServiceProviders , rechargeBanner}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const {t} = useTranslation(); 


  useEffect(() => {
    const payload = {
      serviceId: 9,
    };
    dispatch(RechargeActions.getAllServiceProviders(payload));

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={'#002E6E'} barStyle={"light-content"} />
      <MyHeader title={"Select Operator"} tintColor={Colors.white} navigation={navigation} color='#002E6E'/>
      <View style={{ flex: 1, paddingVertical: Sizes.fixPadding * 0.5 }}>
        <View style={{ height: SCREEN_WIDTH / 2.2, borderRadius: 10, padding:10 }}>
          <Carousel
            loop
            width={SCREEN_WIDTH}
            height={SCREEN_WIDTH / 2.2}
            autoPlay
            autoPlayInterval={3000}
            data={rechargeBanner.filter(item => item?.redirectTo === 'Fastag')}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item?.bannerImage }}
                  style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH / 2.2, borderRadius: 10, resizeMode: "contain" }}
                />
              </View>
            )}
          />
        </View>
        {SearchBar()}
        {banktitle()}
        {banklist()}
      </View>
    </SafeAreaView>
  );

  function banklist() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Fastagvechicle', { providerData: item })}
        activeOpacity={0.8}
        style={{
          borderWidth: 1,
          borderColor: "#C1C1C1",
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: Sizes.fixPadding,
          paddingHorizontal: Sizes.fixPadding * 1,
        }}
      >
        <View
          style={{
            height: SCREEN_WIDTH * 0.15,
            width: SCREEN_WIDTH * 0.15,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            overflow: 'hidden',
            backgroundColor: '#002E6E',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {item.product_name[0]}
          </Text>
        </View>

        <Text
          style={{
            ...Fonts.primaryLight15RobotoRegular,
            color: "#00000080",
            marginLeft: Sizes.fixPadding * 2,
            fontSize: 16,
            width: SCREEN_WIDTH * 0.6,
          }}
        >
          {item.product_name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ marginHorizontal: 18 }}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.product_code + index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, top: 20 }}
        />
      </View>
    );
  }

  function banktitle() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 1.5,
          zIndex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <Text style={{ ...Fonts.primaryDark14RobotoMedium, color: "#00000080" }}>
          {t("FASTag issuing Bank list")}
        </Text>
      </View>
    );
  }

  function SearchBar() {
    return (
      <View
        style={{
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          borderColor: "#81818190",
          marginTop: Sizes.fixPadding * 0.8,
          marginHorizontal: Sizes.fixPadding * 1,
        }}
      >
        {/* <Image
          source={require("../../../assests/icons/search.png")}
          style={{ height: 16, width: 16, resizeMode: "contain" }}
        /> */}

        <TextInput
          value={search}
          onChangeText={searchFilterFunction}
          style={{
            width: "95%",
            ...Fonts.PoppinsMedium,
            color: Colors.black,
            fontSize: 12,
            height: SCREEN_WIDTH * 0.12,
          }}
          placeholder={t("Search FASTag issuing Bank")}
          placeholderTextColor={"#81818190"}
        />
      </View>
    );
  }
};





const mapStateToProps = state => ({
  fastagOperators: state.rechargeReducer.fastagOperators,
  allServiceProviders: state.rechargeReducer.allServiceProviders,
  rechargeBanner: state.rechargeReducer.rechargeBanner
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Fasttag);

const styles = StyleSheet.create({});
