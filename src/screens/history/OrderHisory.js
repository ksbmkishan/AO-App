import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, Sizes } from '../../assets/style'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { colors, getFontSize } from '../../config/Constants1'
import { connect } from 'react-redux'
import * as ecommerceActions from '../../redux/actions/ecommerceActions';
import { base_url, FontsStyle, img_url } from '../../config/constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { showNumber } from '../../utils/services'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import TranslateText from '../language/TranslateText'



const OrderHisory = ({dispatch,navigation,customerData,ecommerceHistory}) => {
    const [isLoading,setIsLoading] = useState(false)

    const {t} = useTranslation();
    useEffect(() => {

        dispatch(ecommerceActions.getEcommerceOrderHistory())
    },[dispatch]);
    
    const onRefresh = () => {
        return(
            dispatch(ecommerceActions.getEcommerceOrderHistory())
        )
    }


  return (
    <View style={{flex:1}}>
      <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
      <MyHeader title={'My Order'} navigation={navigation} />
      <View style={{flex:1,paddingHorizontal:Sizes.fixPadding}}>
      {orderData()}
      </View>
    </View>
  )
//   function orderData() {

//     const renderItem = ({item}) => {
//       console.log(item.products,'orroor')
//         const getStatusColor = (status) => {
//             switch (status) {
//               case 'INITIATED':
//                 return '#007bff';
//               case 'ACCEPTED':
//                 return '#28a745';
//               case 'REJECTED':
//                 return '#dc3545';
//               case 'PACKED':
//                 return '#ffc107';
//               case 'OUT_FOR_DELIVERY':
//                 return '#17a2b8';
//               case 'DELIVERED':
//                 return '#28a745';
//               case 'CANCELLED':
//                 return '#6c757d';
//               default:
//                 return '#ffffff'; // Default color if status does not match any case
//             }
//           };
//           const itemStatus = item?.status || '';
// const backgroundColor = getStatusColor(itemStatus);
        
//         return(
//             <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10,  borderRadius: 8, backgroundColor: Colors.white, borderColor: 'gray', gap: 20,elevation:2,marginTop:Sizes.fixPadding * 0.8 }} onPress={() => {navigation.navigate('productFull',item)}}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
//                         {/* <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.whiteDark }}></View> */}
//                         <View>
//                             <Text style={{ color: 'black', fontWeight:'700' }}>Order Recived</Text>
//                             <Text style={{ color: 'black', fontSize:12 }}>{moment(item.createdAt).format('MMMM Do YYYY, h:mm')}</Text>

//                         </View>
//                     </View>

//                     <AntDesign name='right' size={20} color={'black'}   onPress={() => {navigation.navigate('productFull',item)}}/>
//                 </View>

//                 <View style={{ flexDirection: 'row', gap: 10 }}>
//                     <View style={{ height: 80, width: 80, borderRadius: 80,overflow:'hidden' }}>
//                         <Image source={{uri : img_url + item?.product?.image}} style={{ height: 80, width: 80}}/>
//                     </View>
//                     <View style={{ gap: 6 }}>
//                         <Text style={{ color: 'black' }}>{item?.product?.productName}</Text>
//                         <View style={{ flexDirection: 'row', gap: 4 }}>
//                             <Text style={{ color: 'red' }}>QTY</Text>
//                             <Text style={{ color: 'black' }}>{item?.quantity}</Text>


//                         </View>
//                         <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between',width:'85%' }}>
//                             <Text style={{ color: 'black' }}>Price({item?.quantity} items)</Text>
//                             <Text style={{ color: 'black', fontWeight: '700' }}>{showNumber(item?.product?.price)}</Text>


//                         </View>

//                     </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
//                     <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, backgroundColor: backgroundColor, justifyContent: 'center', flex: 1 / 2, alignItems: 'center' }}>
//                         <Text style={{ color: Colors.white }}>{item?.status}</Text>

//                     </View>
//                     {/* <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderRadius: 8, backgroundColor: 'white', justifyContent: 'center', flex: 1 / 2, alignItems: 'center', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
//                         <Text style={{ color: 'black' }}>Complete</Text>

//                         <EvilIcons name='refresh' size={20} color={'black'} />

//                     </View> */}
//                 </View>

//             </TouchableOpacity>
//         )
//     }

//     return(
//         <View style={{flex:1,}}>
//             <FlatList 
//             data={mallOrderData}
//             renderItem={renderItem}
//             refreshControl={
//                 <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={Colors.background_theme2} />
//               }
//             />
//         </View>
//     )
//   }
function orderData() {
    const nodatafound = () => {
        return (
          <View style={{ flex: 1,height:SCREEN_HEIGHT * 0.9  }}>
            {imagepart()}
            {purchase()}
            {refreshbtn()}
          </View>
        )
        function refreshbtn() {
            return(
                <View style={{flex:0.1,justifyContent:'center'}}>
                    <TouchableOpacity style={{width:SCREEN_WIDTH*0.4,paddingVertical:Sizes.fixPadding,borderRadius:100,backgroundColor:Colors.primaryLight,alignSelf:'center'}}
                    onPress={onRefresh}
                    >
                    <Text style={{...Fonts.black16RobotoRegular,color:colors.white_color,textAlign:'center'}}>{t("Refresh")}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        function purchase() {
            return(
                <View style={{flex:0.1}}>
                    <Text style={{...Fonts.black16RobotoRegular,color:colors.black_color,textAlign:'center'}}>{t("No Purchase History")}</Text>
                    <Text style={{...Fonts.black16RobotoRegular,color:'#00000070',textAlign:'center'}}>{t("Check back after your next")}</Text>
                    <Text style={{...Fonts.black16RobotoRegular,color:'#00000070',textAlign:'center'}}>{t("shopping trip!")}</Text>
                </View>
            )
        }
        function imagepart() {
            return(
                <View style={{flex:0.6,justifyContent:'flex-end'}}>
                    <Image source={require('../../assets/images/emptycart.png')} style={{resizeMode:'contain',height:SCREEN_WIDTH * 0.8,width:SCREEN_WIDTH,}}/>
                </View>
            )
        }
      }
  const renderItem = ({ item }) => {
      const getStatusColor = (status) => {
          switch (status) {
              case t('Pending'):
                  return '#007bff';
              case t('In-Progress'):
                  return '#28a745';
              case t('Complete'):
                  return '#dc3545';
              default:
                  return '#ffffff'; // Default color if status does not match any case
          }
      };

      const itemStatus = item?.status || '';
      const backgroundColor = getStatusColor(itemStatus);

      return (
          <TouchableOpacity
              style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: Colors.white,
                  borderColor: 'gray',
                  gap: 20,
                  elevation: 2,
                  marginTop: Sizes.fixPadding * 0.8
              }}
              onPress={() => { navigation.navigate('productFull', item) }}
          >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                      <View>
                          <Text style={{ color: 'black', fontWeight: '700', fontSize:17,...FontsStyle.fontfamily }}>{t("Invoice")}: {item?.invoiceId}</Text>
                          <Text style={{ color: 'black', fontSize: 13,...FontsStyle.fontfamily}}>{t("Booking Date")}: {moment(item?.createdAt).format('DD/MM/YYYY, h:mm')}</Text>
                          <Text style={{ color: 'black', fontSize: 15,...FontsStyle.fontfamily }}>{t("Status")}: <TranslateText title={item?.status} /></Text>

                      </View>
                  </View>
                  <AntDesign name='right' size={20} color={'black'} onPress={() => { navigation.navigate('productFull', item) }} />
              </View>

              {/* {item?.items.map((item, index) => (
                  <View key={index} style={{ flexDirection: 'row', gap: 10 }}>
                      <View style={{ height: 80, width: 80, borderRadius: 80, overflow: 'hidden' }}>
                          <Image source={{ uri: base_url + item?.product?.image }} style={{ height: 80, width: 80 }} />
                      </View>
                      <View style={{ gap: 6 }}>
                          <Text style={{ color: 'black' }}>{item?.product?.name}</Text>
                          <View style={{ flexDirection: 'row', gap: 4 }}>
                              <Text style={{ color: 'red' }}>QTY</Text>
                              <Text style={{ color: 'black' }}>{item?.quantity}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between', width: '85%' }}>
                              <Text style={{ color: 'black' }}>Price({item?.quantity} items)</Text>
                              <Text style={{ color: 'black', fontWeight: '700' }}>{showNumber(item?.price)}</Text>
                          </View>
                      </View>
                  </View>
              ))} */}

             
          </TouchableOpacity>
      );
  };

  return (
      <View style={{ flex: 1 }}>
          <FlatList
              data={ecommerceHistory} // Use the provided data here
              renderItem={renderItem}
              keyExtractor={(item) => item.createdAt} // Assuming createdAt is unique for each order
              refreshControl={
                  <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={Colors.background_theme2} />
              }
              ListEmptyComponent={nodatafound}
              showsVerticalScrollIndicator={false}
          />
          {/* <Text style={{textAlign:'center', color:'black',paddingTop:SCREEN_HEIGHT * 0.3}}>Coming Soon...</Text> */}
      </View>
  );
}

}
const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    ecommerceHistory: state.ecommerce.ecommerceHistory
  });
  
  const mapDispatchToProps = dispatch => ({ dispatch });
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrderHisory);


const styles = StyleSheet.create({
    container: {
    elevation:.5,
    padding:Sizes.fixPadding,
   borderRadius:10,
   backgroundColor:Colors.white,
   marginTop:Sizes.fixPadding 
    }
})