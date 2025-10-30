import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as RechargeActions from "../../../redux/actions/RechargeActions";
import MyStatusBar from "../../../components/MyStatusbar";
import MyHeader from "../../../components/MyHeader";
import { Colors, SCREEN_WIDTH } from "../../../config/Screen";
import { Fonts, Sizes } from "../../../assets/style";
import Carousel from "react-native-reanimated-carousel";
import SvgOrImage from "../../../components/SvgOrImage";
import { useTranslation } from "react-i18next";

const BroadBandProviders = ({ dispatch, navigation, allServiceProviders, rechargeBanner }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    const payload = {
      serviceId: 15, 
    };
    dispatch(RechargeActions.getAllServiceProviders(payload));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(allServiceProviders || []);
  }, [allServiceProviders]);

  const searchFilterFunction = (text) => {
    if (allServiceProviders?.length) {
      const newData = allServiceProviders.filter((item) =>
        item.product_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    }
    setSearch(text);
  };

  function renderList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BroadBandBillPage", { providerData: item })
        }
        activeOpacity={0.8}
        style={styles.listItem}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{item.product_name[0]}</Text>
        </View>

        <Text style={styles.itemText}>{item.product_name}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1, marginHorizontal: 18 }}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.product_code + index}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    );
  }

  function titleText() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 1.5,
          backgroundColor: Colors.white,
        }}
      >
        <Text style={styles.title}>{t("Broadband Providers")}</Text>
      </View>
    );
  }

  function searchBar() {
    return (
      <View style={styles.searchBox}>
        <TextInput
          value={search}
          onChangeText={searchFilterFunction}
          style={styles.searchInput}
          placeholder={t("Search Broadband Provider")}
          placeholderTextColor={"#81818190"}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={'#002E6E'}
        barStyle={"light-content"}
      />
      <MyHeader
        title={t("Select Broadband Provider")}
        tintColor={Colors.white}
        navigation={navigation}
        color="#002E6E"
      />
      {/* Carousel */}
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
              <SvgOrImage
                uri={item?.bannerImage}
                style={{ width: SCREEN_WIDTH * 0.95, height: SCREEN_WIDTH / 2.2, borderRadius: 10, resizeMode: "cover" }}
              />
            </View>
          )}
        />
        </View>
      <View style={{ flex: 1, paddingVertical: Sizes.fixPadding * 0.5 }}>
        {searchBar()}
        {titleText()}
        {renderList()}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  allServiceProviders: state.rechargeReducer.allServiceProviders,
     rechargeBanner: state.rechargeReducer.rechargeBanner,
});

export default connect(mapStateToProps)(BroadBandProviders);

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderColor: "#C1C1C1",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 1,
    marginBottom: 10,
  },
  iconCircle: {
    height: SCREEN_WIDTH * 0.15,
    width: SCREEN_WIDTH * 0.15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002E6E",
  },
  iconText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  itemText: {
    fontFamily: "Poppins-Medium",
    color: "#000000",
    marginLeft: Sizes.fixPadding * 2,
    fontSize: 14,
    flexShrink: 1,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#000000",
  },
  searchBox: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#81818190",
    marginTop: Sizes.fixPadding * 0.8,
    marginHorizontal: Sizes.fixPadding * 1,
  },
  searchInput: {
    width: "100%",
    fontFamily: "Poppins-Medium",
    color: Colors.black,
    fontSize: 14,
    height: SCREEN_WIDTH * 0.12,
    paddingHorizontal: 10,
  },
});
