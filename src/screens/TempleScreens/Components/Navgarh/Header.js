import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../config/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SanatanActions from '../../../../redux/actions/sanatanActions';
import { connect } from 'react-redux';
import { FontsStyle, normalize } from '../../../../config/constants';
import TranslateText from '../../../language/TranslateText';


const headerNavgarh = ({
  localBalance,
  navigation,
  showLottieMudra,
  dispatch,
  getbaghwandatanavgrah,
  headerNavgarh,
  show = false,
  customerData,
  visibleNavgarhIndex
}) => {

  // console.log('visible index : ',visibleNavgarhIndex,getbaghwandatanavgrah)

  const showNumber0 = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toFixed(2);
    }
  };

  const handleBack = () => {
      dispatch(SanatanActions.getSatnaSongCurrentState());
      navigation.goBack();
  }

  return (
    <View>
      <View
        style={{
          zIndex: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: SCREEN_HEIGHT * 0.03,
          width: SCREEN_WIDTH * 0.95
        }}>

        <View>
          <TouchableOpacity
            style={{ width: SCREEN_WIDTH * 0.2 }}
            onPress={() => {
              handleBack();
            }}>
            <Ionicons name="chevron-back" size={normalize(30)} color="#000" />
          </TouchableOpacity>
        </View>

        {show &&
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ ...FontsStyle.fontfamily,fontSize: normalize(16), color:'black' }}>
             <TranslateText title={getbaghwandatanavgrah?.[visibleNavgarhIndex]?.title
                ? getbaghwandatanavgrah[visibleNavgarhIndex].title.length > 15
                  ? `${getbaghwandatanavgrah[visibleNavgarhIndex].title.slice(0, 15)}...`
                  : getbaghwandatanavgrah[visibleNavgarhIndex].title
                : 'No Title Available'} />
            </Text>
          </View>
        }

        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#fff',
            borderRadius: 30,
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'space-around',
            paddingLeft: 15,
            alignSelf: 'flex-end',
            width: SCREEN_WIDTH * 0.2,
            alignItems:'center'
          }}
          onPress={() => {
            navigation.navigate('wallet');
          }}>
          <Text style={{ fontWeight: '700', fontSize: normalize(12), color: '#000' }}>
            {showNumber0(customerData?.wallet_balance || 0)}
          </Text>


          <Image
            source={require('../../../../assets/images/mudra.png')}
            style={{
              width: SCREEN_WIDTH * 0.08,
              height: SCREEN_HEIGHT * 0.016,
              objectFit: 'contain',
            }}
          />


        </TouchableOpacity>

        {showLottieMudra && (
          <LottieView
            source={require('../../../../assets/lottie/mudra.json')}
            autoPlay
            loop
            style={{
              position: 'absolute',
              top: SCREEN_HEIGHT * 0.1,
              zIndex: 99999,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT * 0.3,
              left: SCREEN_WIDTH * 0.3,
              top: 10,
            }}
          />
        )}

      </View>

    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
  getbaghwandatanavgrah: state.home.getbaghwandatanavgrah,
  visibleNavgarhIndex: state.sanatan.visibleNavgarhIndex,
  customerData: state.customer.customerData,
})

export default connect(mapStateToProps, mapDispatchToProps)(headerNavgarh);

const styles = StyleSheet.create({});
