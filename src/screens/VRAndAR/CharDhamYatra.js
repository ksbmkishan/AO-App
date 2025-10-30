import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Image, Modal, Linking } from 'react-native';
import HeaderWithBell from './header';
import AnimatedBell from './AnimatedBell';
import WebView from 'react-native-webview';
import * as VrActions from '../../redux/actions/VrActions';
import * as HomeActions from '../../redux/actions/HomeActions';
import { useDispatch, useSelector } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import MyHeader from '../../components/MyHeader';
import RenderHTML from 'react-native-render-html';
import AudioManager from '../../utils/AudioManager';
import { Alert } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

export default function ChatDhamYatra(props) {
  const {  getbaghwandatavrmode } = useSelector(state => state.home);
  const { customerData } = useSelector(state => state.customer);

  const [visible, setVisible] = useState(true); 
  const [infoVisible, setInfoVisible] = useState(false);
  // const refRBSheet = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let prevMode;
    dispatch(VrActions.getVrItems());
    dispatch(HomeActions.getBaghwanDataVrMode())
   AudioManager.getRingerMode()
  .then(mode => {
    console.log('Current mode:', mode);
    prevMode = mode;
    
    // Set to vibrate mode
    return AudioManager.setRingerMode('vibrate');
  })
  .then(success => {
    console.log('Ringer mode changed to vibrate:', success);
  })
  .catch(error => {
    console.error('Error:', error);
    
    // If it's a permission error, guide user to settings
    if (error.code === 'E_NO_PERMISSION') {
      Alert.alert(
        'Permission Required',
        'Please grant Do Not Disturb access to change ringer mode',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => AudioManager.openDndSettings() }
        ]
      );
    }
  });
  
    return () => {
      if (prevMode) {
        AudioManager.setRingerMode(prevMode);
      }
    };
  }, [dispatch]);

  const openAppNotificationSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings(); // Opens Android settings for the app
    }
    setVisible(false);
  };

  const firstImage = getbaghwandatavrmode.map(item => item?.vr_image);

  const imageUrl =  firstImage[0];


  const pannellumHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css">
      <script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
    </head>
    <body style="margin:0;">
      <div id="panorama" style="width:100%; height:100vh;"></div>
      <script>
        pannellum.viewer('panorama', {
          type: 'equirectangular',
          panorama: '${imageUrl}',
          autoLoad: true,
          autoRotate: -2,
          compass: true 
        });
      </script>
    </body>
    </html>
  `;

  const htmlContent = `
<h3>
  
   VR Temple Activity Voice Commands
</h3>
<ul>
  <li>One One One (1 1 1) → Offer Flowers 🌸</li>
  <li>Two Two Two (2 2 2) → Blow Conch (Shankh) 📯</li>
  <li>Three Three Three (3 3 3) → Offer Coconut 🥥</li>
  <li>Four Four Four (4 4 4) → Perform Aarti 🪔</li>
  <li>Five Five Five (5 5 5) → Ring Bell 🔔</li>
</ul>
<h4>Navigation:</h4>
<ul>
  <li>Say <b>9 9 9</b> → Go to Next Temple ⏩</li>
  <li>Say <b>8 8 8</b> → Go to Previous Temple ⏪</li>
</ul>
`;



 
  return (
    <View style={styles.container}>
      <MyHeader title={'Panorama Viewer'} navigation={props.navigation} />
      <HeaderWithBell data={getbaghwandatavrmode} customerData={customerData}/>
      <WebView
        originWhitelist={['*']}
        source={{ html: pannellumHTML }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        style={{ flex: 1 }}
        mediaPlaybackRequiresUserAction={false}
      />
      <AnimatedBell />
      
      
      
      {/* Title Button */}
      <View style={styles.titleButtonContainer}>
        <TouchableOpacity
          onPress={() => setInfoVisible(true)}
          style={styles.titleButton}
        >
          <Text style={styles.titleButtonText}>Info</Text>
        </TouchableOpacity>
      </View>

    


    <Modal visible={infoVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <RenderHTML 
          contentWidth={SCREEN_WIDTH}
          baseStyle={{color:'black'}}
          source={{ html: htmlContent }} />

          <View style={styles.buttons}>
           

            <TouchableOpacity onPress={() => setInfoVisible(false)} style={[styles.button]}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
      
      {/* Bottom Sheet */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  userCountContainer: {
    position: 'absolute',
    top: 10,
    left: SCREEN_WIDTH * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCountText: {
    color: 'white', 
    padding: 4, 
    fontSize: 11
  },
  titleButtonContainer: {
    position: 'absolute',
    top: 60,
    // left: 10,
    right:10,
    flexDirection: 'row',
  },
  titleButton: {
    backgroundColor: colors.background_theme2, 
    padding: 10
  },
  titleButtonText: {
    color: 'white'
  },
  sheetContent: {
    padding: 8
  },
  sheetHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  categoryTab: {
    backgroundColor: colors.background_theme2,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold'
  },
  activeTab: {
    // Add your active tab styles here
  },
  activeText: {
    // Add your active text styles here
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2e7d32',
    borderRadius: 5,
  },
  cancel: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});