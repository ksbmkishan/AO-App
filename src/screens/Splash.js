import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';
import * as SettingActions from '../redux/actions/SettingActions'
import socketServices from '../utils/socket';
import { colors } from '../config/Constants1';
import MyStatusBar from '../components/MyStatusbar';
import WebView from 'react-native-webview';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Colors } from '../assets/style';

const Splash = ({ navigation, dispatch }) => {
  const SoundRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    // Sound play
    const sound = new Sound(
      require('../../src/assets/audio/splash.mp3'),
      (error) => {
        if (error) {
          console.log('Failed to load sound:', error);
          return;
        }
        SoundRef.current = sound;
        sound?.play((success) => {
          if (!success) console.log('Sound playback failed');
          sound?.release();
          SoundRef.current = null;
        });
      }
    );

    // Start API / socket after splash
    const splashTimer = setTimeout(() => {
      socketServices.initializeSocket(dispatch);
      dispatch(SettingActions.getSplash(dispatch));
      
    }, 10000);

    return () => {
      clearTimeout(splashTimer);
      if (SoundRef.current) {
        SoundRef.current?.stop(() => {
          SoundRef.current?.release();
          SoundRef.current = null;
        });
      }
    };
  }, []);


   const html = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;background:#000;">
        <video autoplay playsinline muted width="100%" height="100%" style="object-fit:cover;">
          <source src="file:///android_asset/videoSplash.mp4" type="video/mp4" />
        </video>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }}>
      {/* <MyStatusBar backgroundColor={colors.black_color} barStyle="dark-content" /> */}

      <View style={{  flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          javaScriptEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />

        
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  requestData: state.provider.requestData,
  providerData: state.provider.providerData,
});
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
