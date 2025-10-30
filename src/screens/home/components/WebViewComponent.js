import React, { useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const webViewRef = useRef(null);
  const { width, height } = Dimensions.get('window');

  if (!url) {
    Alert.alert('Error', 'Video URL is not available');
    return null;
  }

  // JavaScript injection for optimal video rendering and event reporting
  const injectedJS = `
    (function() {
      // Always operate inside 'video-container'
      const container = document.getElementById('video-container');
      if(!container) return;

      // Clear previous videos
      container.innerHTML = '';

      // Make video element
      const video = document.createElement('video');
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      video.setAttribute('autoplay', 'true');
      video.setAttribute('muted', 'true');
      video.setAttribute('loop', 'true');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('preload', 'auto');
      video.src = '${url}';

      // Event listeners
      video.addEventListener('loadstart', function() {
        window.ReactNativeWebView.postMessage('loadstart');
      });
      video.addEventListener('loadeddata', function() {
        window.ReactNativeWebView.postMessage('loadeddata');
      });
      video.addEventListener('canplay', function() {
        window.ReactNativeWebView.postMessage('canplay');
      });
      video.addEventListener('playing', function() {
        window.ReactNativeWebView.postMessage('playing');
      });
      video.addEventListener('error', function(e) {
        window.ReactNativeWebView.postMessage('error:' + (video.error ? video.error.code : 'unknown'));
      });

      container.appendChild(video);

      // Play
      setTimeout(function() {
        video.play().catch(function(error) {
          window.ReactNativeWebView.postMessage('play-error:' + error.message);
        });
      }, 100);

      true;
    })();
  `;

  const handleMessage = (event) => {
  const message = event.nativeEvent.data;
  // console.log('WebView message:', message);

  if (message === 'loadeddata' || message === 'canplay' || message === 'playing') {
    setLoading(false);
    setHasError(false); // reset any errors if video starts playing
  } else if (message.startsWith('error') || message.startsWith('play-error')) {
    // if (!loading) setHasError(true);
    setLoading(false);
    console.error('Video error:', message);
  }
};

  const handleLoadEnd = () => {
    // setTimeout(() => {
    //   if (loading) {
    //     setHasError(true);
    //     setLoading(false);
    //   }
    // }, 5000);
  };

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load video</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <style>
                  body, html {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    background: #000;
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  #video-container {
                    width: 100vw;
                    height: 100vh;
                    background: #000;
                  }
                </style>
              </head>
              <body>
                <div id="video-container"></div>
                <script>
                  // Fallback in case injectedJavaScript is blocked
                  setTimeout(function() {
                    if (!document.querySelector('video')) {
                      const container = document.getElementById('video-container');
                      const video = document.createElement('video');
                      video.style.width = '100%';
                      video.style.height = '100%';
                      video.style.objectFit = 'cover';
                      video.setAttribute('autoplay', 'true');
                      video.setAttribute('muted', 'true');
                      video.setAttribute('loop', 'true');
                      video.setAttribute('playsinline', 'true');
                      video.setAttribute('webkit-playsinline', 'true');
                      video.src = '${url}';
                      container.appendChild(video);

                      video.play().catch(e => {
                        window.ReactNativeWebView.postMessage('fallback-error:' + e.message);
                      });
                    }
                  }, 500);
                </script>
              </body>
            </html>
          `,
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={false}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        injectedJavaScript={injectedJS}
        onMessage={handleMessage}
        onLoadEnd={handleLoadEnd}
        onError={() => {
          setHasError(true);
          setLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WebViewComponent;
