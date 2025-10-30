import { useEffect } from 'react';
import { PermissionsAndroid, Platform, NativeModules, NativeEventEmitter, Linking } from 'react-native';

const { CallDetection } = NativeModules;
const callEvents = new NativeEventEmitter(CallDetection);

async function ensurePhoneStatePermission() {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: 'Phone State Permission',
        message: 'This app needs access to your phone state to detect calls.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    console.log('Permission result:', granted);

    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Linking.openSettings(); // opens app settings
    }

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export function useCallDetection(onState) {
  useEffect(() => {
    let sub;

    (async () => {
    //   const ok = await ensurePhoneStatePermission();
    //   if (!ok) { console.log('Telephone Permission denied'); return; }

      try {
        await CallDetection.startListener(); // start native listener
      } catch (e) {
        console.log('CallDetection start error:', e);
      }

      sub = callEvents.addListener('CallState', (state) => {
        if (onState) onState(state);
      });
    })();

    return () => {
      if (sub) sub.remove();
      if (CallDetection.stopListener) {
        CallDetection.stopListener().catch((e) =>
          console.log('CallDetection stop error:', e)
        );
      }
    };
  }, [onState]);
}
