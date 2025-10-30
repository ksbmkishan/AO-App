import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyHeader from '../../components/MyHeader'
import { Colors, Fonts, Sizes } from '../../assets/style';
import { connect } from 'react-redux';
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import * as CustomerActions from '../../redux/actions/CustomerActions'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../config/Constants1';
import { FontsStyle, normalize } from '../../config/constants';
import moment from 'moment';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { showToastMessage } from '../../utils/services';

const PujaCart = ({ navigation, route,ecommerceCartData, dispatch,customerData,ecommerceAddressData,addressVisible }) => {

   useEffect(() => {
    dispatch(EcommerceActions.getEcommerceCart());
    dispatch(EcommerceActions.getEcommerceAddressData());
   },[]);

   const removeCartItem = (id) => {
    const data = {
        userId: customerData?._id,
        productId: id,

    }
    console.log(data);
    dispatch(EcommerceActions.onEcommerceRemoveCart(data));
  }

  const [addressId, setAddressId ] = useState(null);

  const increaseQuantity = (id) => {
    const data = {
        userId: customerData?._id,
        productId: id,
        quantityChange:1
    }
    console.log(data)
    dispatch(EcommerceActions.onEcommerceUpdateQuanitity(data));
  };
  const decreaseQuantity = (id) => {
    console.log(id);
    const data = {
        userId: customerData?._id,
        productId: id,
        quantityChange: -1
    };
    dispatch(EcommerceActions.onEcommerceUpdateQuanitity(data));
  };

  const paymentAstroOne = (customerCartPooja) => {
   
    const payload = {
      cartId: customerCartPooja?._id,
      amount: customerCartPooja?.totalAmount,
      addressId: addressId,
    }

    console.log('payload :: ', payload);

    // showToastMessage({ message:'Payment Coming Soon...'});

    dispatch(EcommerceActions.onEcommerceRazorpayPayment(payload));

  }

   console.log('ec ',JSON.stringify(ecommerceCartData))
    
    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={'Cart'} navigation={navigation} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, }}>
        {ecommerceCartData && ecommerceCartData?.items && ecommerceCartData?.items?.length === 0 ? (

          <Text style={{ color: "#000", textAlign: "center", fontSize: normalize(15), }}>Cart Is Empty !</Text>
        ) : (
          <View style={{ height: "100%", display: "flex", flexDirection: 'column', justifyContent: "space-between", paddingBottom: 50, }}>

            <View>

              <FlatList data={ecommerceCartData?.items} renderItem={({ item }) => {
                return (
                  <View style={styles.mainView}>
                    <TouchableOpacity style={styles.crossBtn}
                      onPress={() => {
                        removeCartItem(item?.product?._id)
                      }}
                    >
                      <Entypo name="circle-with-cross" size={normalize(30)} color={colors.background_theme2} />
                    </TouchableOpacity>
                    <View>
                      <Image source={{ uri:item?.product?.image }} style={styles.pujaImage} />
                    </View>
                    <View style={{top:2}}>
                    <Text style={{ ...styles.PujaText, fontWeight: 'bold' }}>
                        Name: {item?.product?.name.length > 15 
                          ? item?.product?.name.slice(0, 15) + '...' 
                          : item?.product?.name}
                      </Text>
                      {item?.date && <Text style={styles.PujaText}>Date: {moment(item?.date).format('DD-MM-YYYY')}</Text>}
                      {item?.time && <Text style={styles.PujaText}>Time: {moment(item?.time).format('hh:mm A')}</Text>}
                      <Text style={styles.PujaText}>Price: {item?.price}</Text>
                      <View style={{alignSelf:'flex-start',flexDirection:'row',alignItems:'center'}}>
                      <Text style={{...styles.PujaText,paddingRight:10,fontWeight:'bold'}}>QTY:</Text>
                      <View style={styles.cartBtn}>
                      
                      <TouchableOpacity
                        onPress={() => {
                          decreaseQuantity(item?.product?._id)
                        }}
                      >
                        <Text style={styles.quantityText}>−</Text>
                      </TouchableOpacity>

                      <Text style={[styles.quantityText, { fontSize: 14 }]}>{item?.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          increaseQuantity(item?.product?._id)
                        }}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>
                        </View>
                     
                    </View>
                  </View>
                )
              }} />
            </View>
            <View style={styles.paymentView}>
              <Text style={styles.priceText}>Total Price: ₹{ecommerceCartData?.totalAmount}</Text>
              <TouchableOpacity style={styles.payBtn}
               onPress={() => {
                if(addressId) {
                    paymentAstroOne(ecommerceCartData)
                } else {
                  dispatch(CustomerActions.setAddressModalVisible(true));
                }
               }}
              >
                <Text style={styles.priceText}>Proceed to Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {addressInfoAstroOne()}

      </View>


        </View>
    )

    function addressInfoAstroOne() {

        const renderItem = ({ item, index }) => {
          console.log(item?._id, 'iddd ')
          const dateDiff = birthDate => {
            const start = new Date(birthDate);
            const end = new Date();
    
            // Calculate the difference in milliseconds
            const diffMilliseconds = end - start;
    
            // Calculate the difference in years, months, and days
            const diffDate = new Date(diffMilliseconds);
            const years = diffDate.getUTCFullYear() - 1970;
            const months = diffDate.getUTCMonth();
            const days = diffDate.getUTCDate() - 1;
            if (years == 0 && months == 0) {
              return `${days}D`;
            } else if (years == 0 && months != 0) {
              return `${months}M ${days}D`;
            }
            return `${years}Y ${months}M ${days}D`;
          };
          const linkeddelete = () => {
            const payload = {
                addressId: item?._id
            }
            dispatch(EcommerceActions.onEcommerceDeleteAddress(payload))
          }
    
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    
              <TouchableOpacity
                onPress={() => {setAddressId(item?._id),dispatch(CustomerActions.setAddressModalVisible(false))}}
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.grayLight,
                  flexDirection: 'row',
                  paddingVertical: 10,
                }}>
                <Ionicons
                  name={
                    item._id == addressId
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={20}
                  color={Colors.grayDark}
                />
                <Text
                  style={{
                    
                    marginLeft: 10,
                    textTransform: 'uppercase',
                    color: Colors.black,
                    width:SCREEN_WIDTH * 0.77
                  }}>
                  {item.name},{' '}
                  {item.house}, {' '}{item.area}, { ' Pincode: '}{item.pincode}, {' State: '}{item.state}
                  {' Mobile No.'} {item.phone}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => linkeddelete()}
                // onPress={() => Kundalidelete(item._id)}
                style={{
                  flexDirection: 'row',
                  width: '13%',
                  justifyContent: 'space-between',
                }}>
                <MaterialCommunityIcons
                  name="delete"
                  color={"#F1B646"}
                  size={23}
                />
              </TouchableOpacity>
            </View>
          );
        };
    
        return(
          <Modal
          visible={addressVisible}
          onRequestClose={() => dispatch(CustomerActions.setAddressModalVisible(false))}
          style={{ justifyContent: 'flex-end' }}
          
          onDismiss={() => dispatch(CustomerActions.setAddressModalVisible(false))}>
          <View
            style={{
              flex: 0,
              padding: Sizes.fixPadding * 2,
              backgroundColor: Colors.white,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              maxHeight: SCREEN_HEIGHT * 1,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ ...FontsStyle.font, marginBottom: 10 }}>
                Enter Your Address
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(CustomerActions.setAddressModalVisible(false))}>
                <Ionicons
                  name={'close-circle-outline'}
                  size={25}
                  color={"#F1B646"}
                />
              </TouchableOpacity>
            </View>
            {ecommerceAddressData && (
              <FlatList data={ecommerceAddressData} renderItem={renderItem} />
            )}
    
            <TouchableOpacity
              onPress={() => navigation.navigate('AddressCart')}
              style={{
                backgroundColor: colors.background_theme2,
                alignItems: 'center',
                marginTop: 10,
                marginBottom: Sizes.fixPadding * 5,
                paddingVertical: Sizes.fixPadding,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text numberOfLines={1} style={{ ...FontsStyle.font}}>
                Add Address
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        )
      }
}

const mapDispatchToProps =  dispatch => ({ dispatch });

const mapStateToProps = state => ({
    ecommerceCartData: state.ecommerce.ecommerceCartData,
    customerData: state.customer.customerData,
    ecommerceAddressData: state.ecommerce.ecommerceAddressData,
    addressVisible: state.customer.addressVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(PujaCart)

const styles = StyleSheet.create({
    cartContainer: {
        marginTop: 20,
        paddingHorizontal: 15,
      },
      pujaCard: {
        backgroundColor: Colors.white,
        padding: Sizes.fixPadding,
        borderRadius: 8,
        elevation: 3,
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderWidth: 0.5,
        borderColor: '#DFDFDF',
        marginBottom: 15,
      },
      pujaImage: {
        height: SCREEN_WIDTH * 0.2,
        width: SCREEN_WIDTH * 0.2,
        borderRadius: 7,
        marginRight: 15,
        borderWidth:1,
        borderColor:'black',
        objectFit:'fill'
        
      },
      pujaAllDescription: {
        flex: 1,
      },
      pujaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      pujaName: {
        ...Fonts.primaryHelvetica,
        color: 'black',
        fontSize: 16,
      },
      crossIcon: {
        height: 20,
        width: 20,
      },
      crossImage: {
        height: '100%',
        width: '100%',
      },
      pujaDescription: {
        ...Fonts.primaryHelvetica,
        color: Colors.gray,
        marginVertical: 5,
      },
      cartQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0C987',
        borderRadius: 10,
        backgroundColor: '#F1B646',
        paddingHorizontal: 8,
        paddingVertical: 2,
        width: SCREEN_WIDTH * 0.3,
      },
      quantityBtn: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      quantityText: {
        ...Fonts.primaryHelvetica,
        color: '#000',
        fontSize: 14,
        marginHorizontal: 5,
      },
      finalPriceMainContainer: {
        marginTop: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 0.5,
        borderColor: '#F1B646',
      },
      finalPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DFDFDF',
      },
      priceLabel: {
        ...Fonts.primaryHelvetica,
        color: Colors.black,
      },
      priceValue: {
        ...Fonts.primaryHelvetica,
        color: Colors.black,
      },
      mainView: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 0.4,
        padding: 10,
        borderRadius: 10,
        gap: 30,
        marginBottom: 10,
      },
      PujaText: {
        ...FontsStyle.fontfamily,
        color: "#000",
        fontSize: normalize(14),
        borderRadius: 10,
        // width: responsiveScreenWidth(50),
      },
      crossBtn: {
        position: "absolute", right: 0,
      },
      cartBtn: {
        borderWidth: 1,
        borderColor: colors.background_theme2,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        paddingVertical: 2,
        borderRadius: 10,
        width: responsiveScreenWidth(25),
        marginTop: 10,
      },
      quantityText: {
        color: "#000",
        fontSize: 19
      },
      paymentView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // position:'absolute',
        // bottom:10,
    
      },
      payBtn:{
        backgroundColor:colors.background_theme2,
        padding:15,
        borderRadius:10,
      },
      priceText:{
        color:"#000",
        fontSize:normalize(16),
        fontWeight:"800"
      }
})