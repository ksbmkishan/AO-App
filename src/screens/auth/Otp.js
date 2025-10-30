import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/MyStatusbar';
import {
  colors,
  fonts,
  getFontSize
} from '../../config/Constants1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import MyLoader from '../../components/MyLoader2';
import CountDown from './components/CountDown';
import * as AuthActions from '../../redux/actions/AuthActions'
import { getFcmToken } from '../../utils/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';

const { width, height } = Dimensions.get('screen');
const CELL_COUNT = 4;

const Otp = props => {

  console.log('props :: ',props.route.params.otp);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [otpError, setOtpError] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [serverOtp, setServerOtp] = useState(props.route.params.otp);
  const [counter, setCounter] = useState(59);
  const [otpProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {    
  // Initialize with the OTP from server
    if (props.route.params.otp) {
      setServerOtp(props.route.params.otp);
    }
  }, []);

  console.log('server OTP ::: ',counter);

  // Verify OTP when user enters all digits
  useEffect(() => {

    if (value.length === CELL_COUNT) {
      console.log('Value ',value)
      verifyOtp(value);
    }
  }, [value]);

  const verifyOtp = async (enteredOtp) => {
    if (!enteredOtp || enteredOtp.length !== CELL_COUNT) {
      setOtpError(true);
      return;
    }

    // Always verify against server OTP
    if (String(enteredOtp) === String(serverOtp))  {
      setIsLoading(true);
      try {
        const payload = {
          data: {
            phoneNumber: props.route.params.phoneNumber,
            fcmToken: await getFcmToken(),
            device_id: 'device-id-placeholder' // Replace with actual device ID logic
          },
          dispatch: props.dispatch
        };
        props.dispatch(AuthActions.onOtpVerification(payload));
      } catch (error) {
        console.error('OTP verification error:', error);
        warnign_toast('OTP verification failed');
      } finally {
        setIsLoading(false);
      }
    } else {
      setOtpError(true);
      warnign_toast('Please enter correct OTP');
    }
  };

  const handleResendOtp = () => {
    setCounter(60);
    setValue('');
    setOtpError(false);
    props.dispatch(AuthActions.onLogin({ 
      phoneNumber: props.route?.params?.phoneNumber 
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }}>
      <MyStatusBar
        backgroundColor={colors.background_theme1}
        barStyle="dark-content"
      />
      <MyLoader isVisible={isLoading} />
      
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Image
            style={{ 
              transform: [{ rotate: '180deg' }], 
              height: SCREEN_HEIGHT * 0.4, 
              width: SCREEN_WIDTH 
            }}
            source={require('../../assets/images/design.png')} 
          />
        </View>
        
        <View style={{
          flex: 0,
          backgroundColor: colors.white_color,
          padding: 15,
          width: '100%'
        }}>
          <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.2),
                textAlign: 'center',
                color: colors.background_theme2,
                fontFamily: fonts.medium,
                marginBottom: 20
              }}>
              Kindly check and fill the confirmation code sent to +91-{props.route.params.phoneNumber}
            </Text>
            
            {otpError && (
              <Text allowFontScaling={false}
                style={{
                  color: 'red',
                  marginBottom: 10,
                  fontSize: getFontSize(1.1)
                }}>
                Invalid OTP. Please try again.
              </Text>
            )}

            <View style={{ alignItems: 'center' }}>
              <View style={{ flex: 0 }}>
                <CodeField
                  ref={ref}
                  {...otpProps}
                  value={value}
                  onChangeText={(text) => {
                    setValue(text);
                    setOtpError(false);
                  }}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text allowFontScaling={false}
                      key={index}
                      style={[
                        styles.cell,
                        isFocused && styles.focusCell,
                        otpError && styles.errorCell
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </View>
              
              <View style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.2),
                    color: colors.background_theme2,
                  }}>
                  Resend OTP in{' '}
                </Text>
                
                {counter !== 0 ? (
                  <Text allowFontScaling={false}
                    style={{
                      fontSize: getFontSize(1.2),
                      color: colors.black_color7,
                    }}>
                    <CountDown 
                      duration={counter} 
                      onComplete={() => setCounter(0)} 
                    /> Seconds
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: getFontSize(1.2),
                        color: colors.background_theme2,
                        fontFamily: fonts.medium,
                      }}>
                      Resend
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Otp);

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: width * 0.13,
    height: width * 0.12,
    lineHeight: 32,
    fontSize: 18,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRadius: 10,
    borderColor: colors.background_theme2,
    textAlign: 'center',
    marginRight: 5,
    marginHorizontal: 20,
    shadowColor: colors.black_color6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    color: "black",
    paddingTop: 10
  },
  focusCell: {
    borderColor: colors.background_theme2,
  },
  errorCell: {
    borderColor: 'red',
  },
});