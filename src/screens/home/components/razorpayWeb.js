import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';
import { resetToScreen } from '../../../navigations/NavigationServices';

export default function RazorpayWeb({ route, navigation }) {
  const { orderId, amount, email, contact, name } = route.params;
  const webViewRef = useRef(null);

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'PAYMENT_DONE') {
        setTimeout(() => {
          resetToScreen('home');
        }, 1000); // ✅ 3 seconds delay
      }
    } catch (e) {
      console.log('Invalid message:', e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{
          uri: `https://api.astroone.in/razorpay.html?order_id=${orderId}&amount=${amount}&email=${email}&contact=${contact}&name=${name}`,
        }}
        onMessage={handleMessage}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#000" />}
      />
    </View>
  );
}
