import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { FoldPhone, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SanatanActions from '../../../redux/actions/sanatanActions';
import { connect } from 'react-redux';
import { FontsStyle, normalize } from '../../../config/constants';
import TranslateText from '../../language/TranslateText';
import TrackPlayer from 'react-native-track-player';


const headerSantan = ({
  localBalance,
  navigation,
  showLottieMudra,
  dispatch,
  getbaghwandata,
  visibleIndex,
  show = false,
  customerData
}) => {

  // console.log('visible index : ',visibleIndex,getbaghwandata)
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

  const backHandle = () => {
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
          width: FoldPhone ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH * 0.95
        }}>

        <View>
          <TouchableOpacity
            style={{ width: SCREEN_WIDTH * 0.18 }}
            onPress={async () => {
              try {
                const currentState = await TrackPlayer.getState();

                // Reset only if player is not idle
                if (currentState === State.Playing || currentState === State.Paused) {
                  await TrackPlayer.reset();
                }

                backHandle();
              } catch (error) {
                console.log('Error resetting player:', error);
                backHandle();
              }
            }}>
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        {show &&
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: 'black', ...FontsStyle.fontfamily, fontSize: FoldPhone ? normalize(11) : normalize(16), }}>
              <TranslateText title=
                {getbaghwandata?.[visibleIndex]?.title
                  ? getbaghwandata[visibleIndex].title.length > 15
                    ? `${getbaghwandata[visibleIndex].title.slice(0, 15)}...`
                    : getbaghwandata[visibleIndex].title
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
            alignItems: 'center'
          }}
          onPress={() => {
            navigation.navigate('wallet');
          }}>
          <Text style={{ fontWeight: '700', fontSize: normalize(11), color: '#000' }}>
            {showNumber0(customerData?.wallet_balance || 0)}
          </Text>


          <Image
            source={require('../../../assets/images/mudra.png')}
            style={{
              width: SCREEN_WIDTH * 0.08,
              height: SCREEN_HEIGHT * 0.016,
              objectFit: 'contain',
            }}
          />


        </TouchableOpacity>

        {showLottieMudra && (
          <LottieView
            source={require('../../../assets/lottie/mudra.json')}
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
  getbaghwandata: state.home.getbaghwandata,
  visibleIndex: state.sanatan.visibleIndex,
  customerData: state.customer.customerData,
})

export default connect(mapStateToProps, mapDispatchToProps)(headerSantan);

const styles = StyleSheet.create({});
