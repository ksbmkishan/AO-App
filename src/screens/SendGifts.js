import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput, Image } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors, img_url } from '../config/Constants1';
import MyStatusBar from '../components/MyStatusbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize } from 'react-native-responsive-dimensions'; Entypo
import { connect } from 'react-redux';
import * as HomeActions from '../redux/actions/HomeActions';
import { Fonts, Sizes } from '../assets/style';
import moment from "moment";

import Entypo from 'react-native-vector-icons/Entypo';
import { showToastMessage } from '../utils/services';
import { FontsStyle } from '../config/constants';
import { useTranslation } from 'react-i18next';

const SendGifts = ({ navigation, dispatch, Mygiftdata, getGiftDataByID, SearchData, SendUser, customerData, getRequestData }) => {

  console.log("getGiftDataByID.....", getRequestData)
  // console.log("searcghing.....", SearchData)

  const { t } = useTranslation();

  const [buttonStatus, setButtonStatus] = useState(true);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(Mygiftdata);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  const [modalVisible4, setModalVisible4] = useState(false);

  const [dataRequest, setDataRequest] = useState(null);

  const navigate = useNavigation();

  useEffect(() => {
    dispatch(HomeActions.getGiftsData());
    dispatch(HomeActions.getGiftDataByID());
    dispatch(HomeActions.getSendRequestData());
  }, [dispatch]);

  console.log('translation:', t('Enter Divya Rashi'));


    useEffect(() => {
      if (searchQuery && Mygiftdata) {
        const filtered = Mygiftdata?.filter(item =>
          (item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())) &&
          item.phoneNumber !== customerData?.phoneNumber   // exclude current customer
        );
        setFilteredData(filtered);
      } else {
        const filtered = Mygiftdata?.filter(item => item.phoneNumber !== customerData?.phoneNumber);
        setFilteredData(filtered);
      }
    }, [searchQuery, Mygiftdata, customerData?.phoneNumber]);


  const sendGift = () => {
    const senderId = customerData?._id;
    const wallet_check = customerData?.wallet_balance
    if (!selectedReceiver || !amount) {
      showToastMessage({ message: 'Please select a receiver and enter an amount.' })
      return;
    }

    if (wallet_check < amount) {
      showToastMessage({ message: 'Your wallet balance is insufficient. Please add money to your wallet.' })
      return;
    }

    const payload = {
      senderId,
      receiverId: selectedReceiver,
      amount,
    };

    console.log("Payload being sent:", payload);

    dispatch(HomeActions.getSendUserData(payload));
    setModalVisible(false);
  };

  const sendGift2 = () => {
    const senderId = customerData?._id;
    const payload = {
      requesterId: senderId,
      responderId: selectedReceiver,
      amount: amount,
    };

    dispatch(HomeActions.getSendRequest(payload));
    setModalVisible2(false)
  }


  const sendIcon = (id) => {
    console.log("ITEMONG", id); // This will log the correct id
    setSelectedReceiver(id);
    setAmount('');
    setModalVisible(true);
  };

  const recievedHandle = (id) => {
    setSelectedReceiver(id);
    setAmount('');
    setModalVisible2(true)
  }


  const images = {
    samagri: require("../assets/images/avatar_book.png"),

  };

  const handleToggleButtonPress = () => {
    setButtonStatus(true);
    setButtonStatus1(false);
    setButtonStatus2(false);
  }

  const handleToggleButtonPress1 = () => {
    setButtonStatus(false);
    setButtonStatus1(true);
    setButtonStatus2(false);
  }

  const handleToggleButtonPress2 = () => {
    setButtonStatus(false);
    setButtonStatus1(false);
    setButtonStatus2(true);
  }

  const handleAccepted = (data) => {
    setDataRequest({ id: data?._id });
    setModalVisible3(true);
  }

  const onRespondWalletRequest = (status) => {
    const payload = {
      requestId: dataRequest?.id,
      response: status == 'yes' ? 'Accepted' : '',
      rejectionMessage: null
    }
    console.log('payload ', payload)
    dispatch(HomeActions.onRespondWalletRequest(payload));
    setModalVisible3(false)
  }

  const handleRejected = (data) => {
    const payload = {
      requestId: data?._id,
      response: 'Rejected',
      rejectionMessage: null
    }
    console.log('payload ', payload)
    dispatch(HomeActions.onRespondWalletRequest(payload));

  }


  const renderItemparas = ({ item }) => {

    const formattedDate = moment(item?.createdAt).format("DD-MM-YYYY hh:mm A");
    return (

      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01 }}>
        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.03, paddingHorizontal: SCREEN_WIDTH * 0.025, marginVertical: SCREEN_HEIGHT * 0.01, borderRadius: 10, backgroundColor: "white", gap: 10, elevation: 2 }}>
          <View style={{}}>
            <Text style={{ ...FontsStyle.fontfamily }}>{item?.description}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(1.5) }}>{item?.type}</Text>
            <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(1.5) }}>{formattedDate}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    console.log('Item ', item?.gender)
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={item?.image ? { uri: img_url + item?.image } : item?.gender == 'Female ' ? {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/female.jpeg'}: {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/male.jpeg'}}
            />
          </View>
          <View>
            {item.customerName &&  <Text style={styles.nameText}>{item.customerName ? item.customerName : ''}</Text>}
            <Text style={styles.phoneText}>{item.phoneNumber ? item.phoneNumber : 'N/A'}</Text>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => sendIcon(item._id)}
              style={{ elevation: 1, width: SCREEN_WIDTH * 0.2, height: SCREEN_HEIGHT * 0.05, alignItems: "center", justifyContent: "center", borderRadius: 8, backgroundColor: colors.background_theme2 }}>
              <Feather name='arrow-up-right' size={22} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => recievedHandle(item._id)}
              style={styles.modalButton}
            >
              <MaterialCommunityIcons name='call-received' color={"white"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderItemRequest = ({ item }) => {
    return (
      <View style={styles.centeredContent}>
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025,margin:10 }}>
          {item?.requesterId?._id != customerData?._id ? (
            <View style={{ elevation: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.05, backgroundColor: "white", borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.017 }}>
              <View>
                <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(2) }}>{item?.requesterId?.customerName}</Text>
                <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(1.7) }}>{item?.requesterId?.phoneNumber}</Text>
                <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(1.7) }}>Rs. {item?.amount}</Text>
              </View>
              <View style={{ gap: SCREEN_HEIGHT * 0.015 }}>
                {item?.status == 'Pending' ? (
                  <>
                    <TouchableOpacity
                      onPress={() => handleAccepted(item)}
                      style={{ elevation: 2, paddingVertical: SCREEN_HEIGHT * 0.006, width: SCREEN_WIDTH * 0.35, alignItems: "center", borderRadius: 5, backgroundColor: colors.background_theme2 }} >
                      <Text style={{ ...FontsStyle.fontfamily, color: "white", fontSize: responsiveFontSize(1.5) }}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRejected(item)}
                      style={{ elevation: 2, paddingVertical: SCREEN_HEIGHT * 0.006, width: SCREEN_WIDTH * 0.35, alignItems: "center", borderRadius: 5, backgroundColor: colors.background_theme2 }} >
                      <Text style={{ ...FontsStyle.fontfamily, color: "white", fontSize: responsiveFontSize(1.5) }}>Reject</Text>
                    </TouchableOpacity>
                  </>
                ) : item?.status == 'Accepted' ? (
                  <View>
                    <Text style={{ color: 'black' }}>Accepted</Text>
                  </View>
                ) : <View>
                  <Text style={{ color: 'black' }}>Rejected</Text>
                </View>}

              </View>
            </View>
          ) : (
            <View style={{ elevation: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.05, backgroundColor: "white", borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.017 }}>
              <View>
                <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(2) }}>{item?.responderId?.customerName}</Text>
                {/* <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(1.7) }}>To {item?.responderId?.customerName}</Text> */}
                <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(1.7) }}>Rs. {item?.amount}</Text>
              </View>
              <View style={{ gap: SCREEN_HEIGHT * 0.015 }}>
                {item?.status == 'Pending' ? (
                 <View>
                 <Text style={{ color: 'black' }}>Pending</Text>
               </View>
                ) : item?.status == 'Accepted' ? (
                  <View>
                    <Text style={{ color: 'black' }}>Accepted</Text>
                  </View>
                ) : <View>
                  <Text style={{ color: 'black' }}>Rejected</Text>
                </View>}

              </View>
            </View>
          )}

        </View>
      </View>
    )
  }

  const _listEmpty = () => {
    return (
      <View style={{ alignSelf: 'center', paddingVertical: Sizes.fixPadding * 20 }}>
        <Text style={{ color: 'black' }}>{t("No Data Send Gift")}</Text>
      </View>
    )
  }

  const _listEmptyHistory = () => {
    return (
      <View style={{ alignSelf: 'center', paddingVertical: Sizes.fixPadding * 20 }}>
        <Text style={{ color: 'black' }}>{t("No Data Gift History")}</Text>
      </View>
    )
  }

  const _listEmptyHistoryRequest = () => {
    return (
      <View style={{ alignSelf: 'center', paddingVertical: Sizes.fixPadding * 20 }}>
        <Text style={{ color: 'black' }}>{t("No Data Gift Requests")}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={colors.white_color} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <AntDesign name='left' size={23} color={colors.black_color} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("Gift")}</Text>
      </View>
      <View style={styles.toggleButtonsContainer}>
        <TouchableOpacity
          onPress={() => handleToggleButtonPress()}
          style={[styles.toggleButton, buttonStatus ? styles.activeButton : {}]}>
          <Text style={[styles.buttonText, buttonStatus ? styles.activeText : styles.InactiveText]}>
            {t("Send Gift")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleToggleButtonPress1()}
          style={[styles.toggleButton, buttonStatus1 ? styles.activeButton : {}]}>
          <Text style={[styles.buttonText, buttonStatus1 ? styles.activeText : styles.InactiveText]}>
            {t("Gift History")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleToggleButtonPress2()}
          style={[styles.toggleButton, buttonStatus2 ? styles.activeButton : {}]}>
          <Text style={[styles.buttonText, buttonStatus2 ? styles.activeText : styles.InactiveText]}>
            {t("Request")}
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder={t('search_gift')}
        onChangeText={setSearchQuery}
        placeholderTextColor={'black'}
        value={searchQuery}
        style={styles.searchBar}
      />

      {buttonStatus === true && (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          ListEmptyComponent={_listEmpty}
        />
      )}

      {buttonStatus1 === true && (
        <View style={{ flex: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, }}>
          <FlatList
            data={getGiftDataByID}
            renderItem={renderItemparas}
            ListEmptyComponent={_listEmptyHistory}
            keyExtractor={(item) => item.id} />
        </View>
      )}

      {buttonStatus2 === true && (
        <View style={{ flex: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, }}>
          <FlatList
            data={getRequestData}
            renderItem={renderItemRequest}
            ListEmptyComponent={_listEmptyHistoryRequest}
            keyExtractor={(item) => item.id} />
        </View>

      )}


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ alignItems: "flex-end", paddingHorizontal: SCREEN_WIDTH * 0.02, paddingTop: SCREEN_HEIGHT * 0.01 }}>
              <Entypo name='circle-with-cross' size={20} color={colors.background_theme2} />
            </TouchableOpacity>
            <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.025, }}>
              <Text style={{ ...FontsStyle.fontfamily,fontWeight:'bold',color: colors.background_theme2 }}>{t("Share Your Divya Rashi")}</Text>
            </View>
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, paddingTop: SCREEN_HEIGHT * 0.015 }}>
              <View style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.02, }}>
                <TextInput
                  style={styles.input}
                  placeholder={t("Enter Divya Rashi")}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholderTextColor={'grey'}
                />

              </View>
            </View>


            <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02 }}>
              <TouchableOpacity onPress={sendGift} style={{ elevation: 1, alignItems: "center", backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.4, borderRadius: 10 }}>
                <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(2), color: "white" }}>{t("Send")}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible2(false)}
              style={{ alignItems: "flex-end", paddingHorizontal: SCREEN_WIDTH * 0.02, paddingTop: SCREEN_HEIGHT * 0.01 }}>
              <Entypo name='circle-with-cross' size={20} color={colors.background_theme2} />
            </TouchableOpacity>
            <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.025, }}>
              <Text style={{ ...FontsStyle.fontfamily,fontWeight:'bold', color: colors.background_theme2 }}>{t("Request Divya Rashi for you.")}</Text>
            </View>
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.025, paddingTop: SCREEN_HEIGHT * 0.015 }}>
              <View style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.02, }}>
                <TextInput
                  style={styles.input}
                  placeholder={t("Enter Divya Rashi")}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholderTextColor={'grey'}
                />

              </View>
            </View>


            <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02 }}>
              <TouchableOpacity onPress={sendGift2} style={{ elevation: 1, alignItems: "center", backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.4, borderRadius: 10 }}>
                <Text style={{ ...FontsStyle.fontfamily, fontSize: responsiveFontSize(2), color: "white" }}>{t("Request")}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => setModalVisible3(false)}
      >
        <View style={{ ...styles.modalContainer }}>
          <View style={{ ...styles.modalContent, height: SCREEN_HEIGHT * 0.2 }}>
            <TouchableOpacity
              onPress={() => setModalVisible3(false)}
              style={{ paddingTop: SCREEN_HEIGHT * 0.01, alignSelf: "flex-end", paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
              <Entypo name='circle-with-cross' color={"black"} size={22} />
            </ TouchableOpacity>

            <View style={{ alignSelf: 'center', paddingVertical: Sizes.fixPadding }}>
              <Text style={{ color: 'black' }}>{t("Do you want to accept this request? If yes, the amount will be deducted from your wallet.")}</Text>
            </View>
            <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.023, flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => onRespondWalletRequest('yes')}
                style={{ elevation: 1, paddingVertical: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.25, alignItems: "center", borderRadius: 10, backgroundColor: colors.background_theme2, elevation: 1, marginHorizontal: 10 }}>
                <Text style={{ color: "white" }}>{t("yes")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible3(false)}
                style={{ elevation: 1, paddingVertical: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.25, alignItems: "center", borderRadius: 10, backgroundColor: colors.background_theme2, elevation: 1, marginHorizontal: 10 }}>
                <Text style={{ color: "white" }}>{t("no")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={() => setModalVisible4(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, gap: 10 }}>
              <TouchableOpacity
                onPress={() => setModalVisible4(false)}
                style={{ paddingTop: SCREEN_HEIGHT * 0.01, alignSelf: "flex-end", paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
                <Entypo name='circle-with-cross' color={"black"} size={22} />
              </ TouchableOpacity>
              <View style={{ backgroundColor: "white", borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0., height: SCREEN_HEIGHT * 0.16, borderWidth: 1, borderColor: colors.black_color6 }}>
                <TextInput
                  placeholder='Description' />
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible4(false)}
                style={{ elevation: 1, paddingVertical: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.25, alignItems: "center", borderRadius: 10, backgroundColor: colors.background_theme2, elevation: 1, alignSelf: "center" }}>
                <Text style={{ color: "white" }}>{t("Submit")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  Mygiftdata: state.home.Mygiftdata,
  getGiftDataByID: state.home.getGiftDataByID,
  SearchData: state.home.SearchData,
  getRequestData: state.home.getRequestData,
  customerData: state.customer.customerData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SendGifts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  header: {
    flexDirection: 'row',
    gap: 6,
    alignItems: "center",
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black_color,
    ...FontsStyle.font
  },
  toggleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: colors.background_theme2,
  },
  toggleButton: {
    width: '30%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.background_theme1,
    alignItems: "center"
  },
  activeButton: {
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 14,
    color: colors.background_theme1,
    fontWeight: "500",
    ...FontsStyle.fontfamily

  },
  activeText: {
    color: colors.background_theme2,
    ...FontsStyle.fontfamily
  },
  InactiveText: {
    color: colors.black_color,
    ...FontsStyle.fontfamily
  },
  searchBar: {
    // backgroundColor: "white",s
    borderWidth: 0.3,
    paddingHorizontal: 10,
    marginVertical: SCREEN_HEIGHT * 0.02,
    borderRadius: Sizes.fixPadding * 2,
    marginHorizontal: Sizes.fixPadding * 2,
    ...Fonts.PoppinsRegular,


  },
  card: {
    flex: 1,
    borderWidth: 1,
    marginVertical: SCREEN_HEIGHT * 0.01,
    borderRadius: 10,
    borderColor: "#ddd",
    marginHorizontal: Sizes.fixPadding
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SCREEN_HEIGHT * 0.01,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    alignItems: 'center',
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.085,
    width: SCREEN_WIDTH * 0.17,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.background_theme2,
  },
  image: {
    height: SCREEN_HEIGHT * 0.08,
    width: SCREEN_WIDTH * 0.16,
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: responsiveFontSize(1.6),
    ...FontsStyle.font,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: responsiveFontSize(1.3),
    ...FontsStyle.font,

    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: SCREEN_WIDTH * 0.015,
  },
  modalButton: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: colors.background_theme2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  centeredContent: {
    flex: 1,



  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH * 0.8,

    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.29


  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    ...FontsStyle.font,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    ...FontsStyle.font,
  },
  input: {
    color: 'black',
    ...FontsStyle.fontfamily
  }
});
