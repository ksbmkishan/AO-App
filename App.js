/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { GlobalContextProvider } from './src/config/context';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Alert,
  DeviceEventEmitter,
  Text,
  PermissionsAndroid,
  View,
} from 'react-native';

import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PushNotificationManager } from 'react-native-notifications';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { api_url, astrologer_dashboard, colors } from './src/config/Constants1';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import database from '@react-native-firebase/database';
import * as ProviderActions from './src/redux/actions/ProviderActions';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import firebase from '@react-native-firebase/app';
import Notifee, {
  AndroidChannel,
  AndroidImportance,
  Notification,
  EventType,
  Event,
  AuthorizationStatus,
  TimestampTrigger,
  RepeatFrequency,
} from '@notifee/react-native';
import { navigate, setTopLevelNavigator } from './src/navigations/NavigationServices';
import { Provider } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import socketServices from './src/utils/socket';
import AstroRating from './src/screens/astrologers/components/AstroRating';
import CallInvoice from './src/screens/chat/components/CallInvoice';
import { onNotification } from './src/Notifications/NotificationManager';
import ChatInvoice from './src/screens/chat/components/ChatInvoice';
import LiveCallInvoice from './src/screens/live/components/LiveCallInvoice';
import VideocallInvoice from './src/screens/chat/components/VideocallInvoice';
// const isTablet = Dimensions.get('window').width >= 468;
import { AppEventsLogger } from 'react-native-fbsdk-next';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://159c78e3969ed82cede208795c80e708@o4510266021969920.ingest.us.sentry.io/4510266025377792',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,
  integrations: [Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
const App = ({ route, data, dispatch }) => {


  const { i18n } = useTranslation();
  const [miniVideoId, setMiniVideoId] = useState("mNYaXQXI6nY");

  // if (isTablet) {
  //   return (
  //     <View style={{alignSelf:'center',justifyContent:'center',flex:1}}><Text style={{color:'black',fontSize:18}}>Tablet not supported</Text></View>
  //   );
  // }

  const logFacebookEvent = () => {
    // Simple custom event
    AppEventsLogger.logEvent('test_event_triggered');


    console.log('✅ Facebook Event Logged');
  };

  useEffect(() => {
    logFacebookEvent();
    // Load the saved language from AsyncStorage
    const loadLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

        if (selectedLanguage) {
          // Set the loaded language as the initial language
          i18n.changeLanguage(selectedLanguage);
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected || !state.isInternetReachable) {
        Alert.alert(
          "No Internet Connection",
          "Please check your network and try again.",
          [
            {
              text: "Try Again",
              onPress: () => {
                NetInfo.fetch().then((newState) => {
                  if (!newState.isConnected || !newState.isInternetReachable) {
                    Alert.alert("Still no connection 😞", "Check again later.");
                  }
                });
              },
            },
          ],
          { cancelable: false }
        );
      } else if (state.details?.cellularGeneration === "2g") {
        Alert.alert(
          "Slow Network",
          "You are on 2G. The app may run slower than usual."
        );
      }
    });

    

    // Call the function to load the language
    loadLanguage();
    return () => unsubscribe(); // cleanup

  }, []);

  const [sendnotification, setnotification] = useState(null);


  useEffect(() => {


    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // onNotifeeMessageReceived(remoteMessage);
      onNotification(remoteMessage, dispatch)
    });


  }, []);

  // Handle foreground notification clicks
  Notifee.onForegroundEvent(({ type, detail }) => {
    if (detail?.notification?.data?.type == 'Redirect' && type === EventType.PRESS) {  // Adjust based on event type
      console.log('asdfasdadf');
      navigate('notifications');
    }
  });

  Notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification } = detail;
    console.log("ghfghnghgh fffffffffff", type, EventType.PRESS)
    // Check if the notification requires a redirect action
    if (notification?.data?.type === 'Redirect' && type === EventType.ACTION_PRESS) {
      await Notifee.launchActivity('default'); // Wakes the app and brings it to the foreground
      navigate('notifications'); // Navigates to the specific screen after the app is launched
    }
  });

  const isVisible = false;

  const toastConfig = {
    success: props =>
      isVisible ? (
        <BaseToast
          text1NumberOfLines={1}
          text2NumberOfLines={2}
          style={{ borderLeftColor: colors.background_theme2 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 14,
            fontWeight: '400',
          }}
          text2Style={{
            fontSize: 12,
          }}
        />
      ) : null,
    error: props => (
      <ErrorToast
        text1NumberOfLines={1}
        text2NumberOfLines={2}
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text allowFontScaling={false}>{text1}</Text>
        <Text allowFontScaling={false}>{props.uuid}</Text>
      </View>
    ),
    transparentToast: ({ text1 }) => (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)', // transparent black
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 12,
          marginBottom: 50,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>{text1}</Text>
      </View>
    ),
  };

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];
        // Calling the permission function
        const granted = await PermissionsAndroid.requestMultiple(permissions, {
          title: 'Example App Permissions',
          message: 'Example App needs access to certain features.',
        });

        if (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.CALL_PHONE] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED
          //  &&
          // granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          // PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Permission Granted
          console.log('permissions');
        } else {
          // Permission Denied
          console.log('CAMERA Permission Denied');
        }
        Notifee.requestPermission();
      } else {
        Notifee.requestPermission();
      }
    }

    requestPermissions();
  }, []);


 const linking = {
  prefixes: ['astroone-9f4d9-user://'],
  config: {
    screens: {
      GodVideo: 'GodVideo',
      home: {
        path: 'home',
        parse: {
          data: (data) => {
            console.log('deeplink data:', data);
            try {
              return JSON.parse(decodeURIComponent(data));
            } catch (e) {
              return null;
            }
          },
        },
      },
    },
  },
};

  console.log('linking :: ', JSON.stringify(linking));



  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GlobalContextProvider>
              <NavigationContainer ref={c => setTopLevelNavigator(c)} linking={linking}>
                <StackNavigator
                  data1={sendnotification}
                />
              </NavigationContainer>
              <AstroRating />
              <Toast config={toastConfig} />
            </GlobalContextProvider>
            <CallInvoice />
            <ChatInvoice />
            <VideocallInvoice />
            <LiveCallInvoice />
          
            {/* Mini floating player always on top */}
            {/* {miniVideoId && <FloatingMiniPlayer videoId={miniVideoId} onClose={() => setMiniVideoId(null)}/>} */}
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


const mapDispatchToProps = dispatch => ({ dispatch })

export default Sentry.wrap(connect(null, mapDispatchToProps)(App));