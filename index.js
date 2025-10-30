/**
 * @format
 */
import 'react-native-get-random-values'
import 'react-native-gesture-handler';
import { AppRegistry, Linking } from 'react-native';
import App from './App';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import Notifee, {
  EventType
} from '@notifee/react-native';
import store from './src/redux/store';
import { onNotification } from './src/Notifications/NotificationManager';
import { Text,TextInput } from 'react-native';
import TrackPlayer from 'react-native-track-player'
import RenderHTML from 'react-native-render-html';
import { normalize } from './src/config/constants';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://159c78e3969ed82cede208795c80e708@o4510266021969920.ingest.us.sentry.io/4510266025377792", // <-- replace with your DSN
  tracesSampleRate: 1.0, // captures performance data
  debug: false,
});


TrackPlayer.registerPlaybackService(() => require('./src/service'));
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // onNotifeeMessageReceived(remoteMessage);
  onNotification(remoteMessage)
});

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  Text.defaultProps.style = { fontFamily: 'Poppins-Medium' };
}
  
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.style = { fontFamily: 'Poppins-Medium' };
}

// Add systemFonts + baseStyle globally for RenderHTML
if (RenderHTML.defaultProps == null) {
  RenderHTML.defaultProps = {};
}
RenderHTML.defaultProps.systemFonts = [
  'Poppins-SemiBold',
  'Poppins-ExtraBold',
  'Poppins-Medium',
  'Poppins-SemiBold',
];

RenderHTML.defaultProps.baseStyle = {
  fontFamily: 'Poppins-Medium',
  fontSize: normalize(13),
  color: 'black',

};

RenderHTML.defaultProps.tagsStyles = {
  b: {
    fontFamily: 'Poppins-ExtraBold',
    fontWeight: 'normal', // prevent system bold
  },
  strong: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'normal',
  },
  i: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'italic',
  },
};


Notifee.onBackgroundEvent(async ({ type, detail }) => {

  
  const { notification } = detail;
  
  console.log('background notification :: ',notification);
  if (!notification) return;

  const data = notification.data || {};

  // Handle notification press
  if (type === EventType.PRESS) {
    if (data?.type === 'puja') {
      // Open deep link with optional params
    const url = `astroone-9f4d9-user://GodVideo${data ? `?data=${encodeURIComponent(JSON.stringify(data))}` : ''}`;
      Linking.openURL(url).catch(err =>
        console.error('❌ Error opening deep link:', err)
      );
    } else if(data?.type === 'every5minutes') {
      await Notifee.cancelNotification(notification?.id);
      // Open deep link with optional params
         const url = `astroone-9f4d9-user://home${data ? `?data=${encodeURIComponent(JSON.stringify(data))}` : ''}`;
      Linking.openURL(url).catch(err =>
        console.error('❌ Error opening deep link:', err)
      );
    } else {
      console.log('Other notification pressed:', data);
    }
  }


  setTimeout(async () => {
    await Notifee.cancelNotification(notification?.id);
  }, 30000);

});

Notifee.onForegroundEvent(async ({ type, detail }) => {
  console.log('📩 Foreground Notification Event:', type, detail);

  const { notification } = detail;

  if (!notification) return;

  const data = notification.data || {};

  // Handle notification press
  if (type === EventType.PRESS) {
    if (data?.type === 'puja') {
      // Open deep link with optional params
         const url = `astroone-9f4d9-user://GodVideo${data ? `?data=${encodeURIComponent(JSON.stringify(data))}` : ''}`;
      Linking.openURL(url).catch(err =>
        console.error('❌ Error opening deep link:', err)
      );
    } else if(data?.type === 'every5minutes') {
      await Notifee.cancelNotification(notification?.id);
      // Open deep link with optional params
         const url = `astroone-9f4d9-user://home${data ? `?data=${encodeURIComponent(JSON.stringify(data))}` : ''}`;
      Linking.openURL(url).catch(err =>
        console.error('❌ Error opening deep link:', err)
      );
    } else {
      console.log('Other notification pressed:', data);
    }
  }

  // Handle dismiss separately
  if (type === EventType.DISMISSED) {
    console.log('Notification dismissed:', notification.id);
  }
});

const RNRedux = () => {
  return (
    <Provider store={store}>
      <App route={'default'} data={{ data: 1 }} />
    </Provider>
  );
};



AppRegistry.registerComponent(appName, () => RNRedux);

