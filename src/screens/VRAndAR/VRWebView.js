import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Button,
  Platform,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { WebView } from 'react-native-webview';

const VRWebView = ({ image = '' }) => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Orientation.lockToLandscape(); // Lock to landscape for VR headset
    return () => Orientation.unlockAllOrientations();
  }, []);

  const skyImage = image
    ? image
    : 'https://l13.alamy.com/360/T258GN/full-seamless-spherical-panorama.jpg';

  const vrUrl = `https://vr.fashionflick.in/`;

  useEffect(() => {
    StatusBar.setHidden(true); // Hide status bar for full screen
    return () => StatusBar.setHidden(false);
  }, []);

  const reloadWebView = () => {
    setLoading(true);
    if (webViewRef.current) webViewRef.current.reload();
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: vrUrl }}
        style={StyleSheet.absoluteFillObject}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onLoadEnd={() => setLoading(false)}
        androidHardwareAccelerationDisabled={false}
        allowsFullscreenVideo={true}
        containerStyle={{ flex: 1 }}
        injectedJavaScript={`
    console.log = function(msg) {
        window.ReactNativeWebView.postMessage(msg);
      }
    `}
        onMessage={(event) => {
          console.log('HTML log:', event.nativeEvent.data);
        }}
        originWhitelist={['*']}
      />
     
      <View style={styles.controls}>
        <Button title="Reload VR" onPress={reloadWebView} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }]
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 10
  },
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  }
});

export default VRWebView;
