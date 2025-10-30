import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import WebView from 'react-native-webview';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Colors } from '../../assets/style';

const GodVideo = ({ navigation, route }) => {

  let videoLink = '';
  try {
    const parsedData = JSON.parse(route?.params?.data || '{}');
    videoLink = parsedData?.video || '';
  } catch (e) {
    console.log('Invalid JSON in route params:', e);
  }

  const html = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;background:#000;">
        <video id="videoPlayer" autoplay playsinline width="100%" height="100%" style="object-fit:cover;">
          <source src="${videoLink}" type="video/mp4" />
        </video>
        <script>
          const video = document.getElementById('videoPlayer');
          video.onended = function() {
            window.ReactNativeWebView.postMessage('videoEnded');
          }
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event) => {
    if (event.nativeEvent.data === 'videoEnded') {
      navigation.replace('home'); // Navigate when video ends
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
        javaScriptEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onMessage={handleMessage} // Listen for video end event
      />
    </View>
  );
};

const mapStateToProps = state => ({
  requestData: state.provider.requestData,
  providerData: state.provider.providerData,
});
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GodVideo);
