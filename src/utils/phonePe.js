import PhonePePaymentSDK from 'react-native-phonepe-pg'
import base64 from 'react-native-base64';
import sha256 from 'sha256';
import * as CustomerActions from '../redux/actions/CustomerActions';

const merchantId = 'ASTROREMEDYPGONLINE';
const appId = null;
const environmentDropDownValue = 'PRODUCTION';

export const PhonepeWallet = async ({ orderId = '', customerId = '' , amount = '', phone = '' , dispatch }) => {
    console.log('order',orderId, amount,customerId,phone)
        PhonePePaymentSDK.init(
        environmentDropDownValue,
        merchantId,
        appId,
        false
      ).then(result => {
        // setMessage("Message: SDK Initialisation ->" + JSON.stringify(result));
        if(result) {
         const data =  {
            merchantId: merchantId,
            merchantTransactionId: orderId,
            merchantUserId: customerId,
            amount: amount * 100,
            callbackUrl: "https://api.astroone.in/api/customers/callbackPhonepe",
            mobileNumber: phone,
            paymentInstrument: {
              type: "PAY_PAGE"
            }
          }
  
          const salt_key = "ffe16e1d-039e-467a-a6dc-5fa13876c41e";
          const salt_Index = "1";
          const payload = JSON.stringify(data);
          const payload_main = base64.encode(payload);
          const string = payload_main+"/pg/v1/pay"+salt_key;
          const checksum = sha256(string)+"###"+salt_Index;
  
          PhonePePaymentSDK.startTransaction(
            payload_main,
            checksum,
            null,
            null
          ).then(res => {
            console.log('Result ',res);
            dispatch(CustomerActions.getCustomerData());
            return true;
          }).catch(err => {
            console.log('Error',err);
            return false;
          })
        }
      }).catch(error => {
        console.log("error:" + error.message);
        return false;
      })
}
