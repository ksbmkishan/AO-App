// ForceUpdateChecker.js
import React, { useEffect } from 'react';
import { Alert, View, ActivityIndicator, Linking } from 'react-native';
import InAppUpdates from 'sp-react-native-in-app-updates'; // package
// if default export differs, import { InAppUpdates } from '...'

const ForceUpdateChecker = () => {
  useEffect(() => {
    const checkUpdate = async () => {
      try {
        // create instance
        const inAppUpdates = new InAppUpdates(false); // pass true to enable logs

        // check if update needed
        const result = await inAppUpdates.checkNeedsUpdate();

        console.log('InAppUpdates result:', result);

        if (result.shouldUpdate) {
          // Force update (IMMEDIATE)
          const updateOptions = {
            updateType: IAUUpdateKind.IMMEDIATE,
          };

          await inAppUpdates.startUpdate(updateOptions);
        }
      } catch (err) {
        console.warn('In-app update error:', err);
        // Alert.alert(
        //   'Update Required',
        //   'Please update the app from the Play Store.',
        //   [
        //     {
        //       text: 'Update Now',
        //       onPress: () => {
        //         const pkg = 'com.ksbm.astrooneapp'; // replace with your package name
        //         const url = `https://play.google.com/store/apps/details?id=${pkg}`;
        //         Linking.openURL(url);
        //       },
        //     },
        //   ],
        //   { cancelable: false }
        // );
      }
    };

    checkUpdate();
  }, []);
};

export default ForceUpdateChecker;
