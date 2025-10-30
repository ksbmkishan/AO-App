import React, { useRef, useEffect, useState, } from 'react';
import { StatusBar, Text, TouchableOpacity, View, ActivityIndicator, Alert, NativeModules } from 'react-native';
import UnityView, { UnityModule } from '@artmajeur/react-native-unity';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AudioManager from '../../utils/AudioManager';
import { SCREEN_HEIGHT } from '../../config/Screen';

const VrUnity = ({ route }) => {
  const unityRef = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [unityReady, setUnityReady] = useState(true);
  const { KeepAwake } = NativeModules;
  const customerData = useSelector(state => state.customer.customerData);

  // Get panorama data from route params with fallback
  const { data } = route?.params || {};
  const panoramaData = (Array.isArray(data) ? data : data ? [data] : []);

 const prevModeRef = useRef(null);


  // Orientation handling
  useEffect(() => {
   
    Orientation.lockToLandscape();
    KeepAwake.activate();

    return () => {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
      KeepAwake.deactivate(); 
    };
  }, []);

  // AudioManager handling
  useEffect(() => {
    const timer = setTimeout(() => {
      AudioManager.getRingerMode().then(mode => {
        prevModeRef.current = mode;   // ✅ store safely
        AudioManager.setRingerMode("vibrate");
      });
    }, 10000);

    return () => {
      clearTimeout(timer);
      if (prevModeRef.current) {
        AudioManager.setRingerMode(prevModeRef.current); // ✅ restore
      }
    };
  }, []);

  // Handle Unity ready state
  const handleUnityReady = () => {
    console.log('Unity is ready');
    setUnityReady(false);
  };

  // Send data to Unity when both Unity is ready and data is available
  useEffect(() => {
    console.log('unityReady ', unityReady);
    if (!unityReady || panoramaData.length === 0) return;

    const sendDataToUnity = () => {
      try {
        setIsLoading(true);
        console.log('Sending panorama data to Unity:', panoramaData);

        unityRef.current.postMessage(
          'SkyboxManager',
          'LoadPanoramaData',
          JSON.stringify(panoramaData)
        );

        unityRef.current.postMessage(
          'SkyboxSpriteButton',
          'SetCustomerData',
          JSON.stringify(customerData)
        )

        

        // Set timeout to handle cases where Unity doesn't respond
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timeout);
      } catch (error) {
        console.error('Failed to send data to Unity:', error);
        setIsLoading(false);
        Alert.alert('Error', 'Failed to load VR experience');
      }
    };

    // Small delay to ensure Unity is fully ready
    const timer = setTimeout(sendDataToUnity, 500);
    return () => clearTimeout(timer);
  }, [unityReady, panoramaData]);

  // Handle messages from Unity
  const handleUnityMessage = (event) => {
    const message = event.nativeEvent.message;
    console.log('Message from Unity:', message);

    if (message === 'LOADING_COMPLETE') {
      setIsLoading(false);
    } else if (message.startsWith('ERROR:')) {
      Alert.alert('VR Error', message.replace('ERROR:', ''));
      setIsLoading(false);
    }
  };

  const handleExit = async () => {
    try {
      // if (UnityModule && typeof UnityModule.quit === 'function') {
        UnityModule.quit();
      // }
    } catch (e) {
      console.warn('Unity quit failed:', e);
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />

      {/* Close button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 10,
          backgroundColor: 'rgba(255,0,0,0.7)',
          padding: 10,
          borderRadius: 20,
          top: 20,
          left: 20,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          handleExit();
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>

        <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: SCREEN_HEIGHT * 0.2,
            left: 0,
            right: 0,
            paddingHorizontal: 10,
            zIndex: 100,}}>
          <TouchableOpacity>
            <MaterialIcons name='arrow-back-ios' size={20} color={'white'} />
           </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name='arrow-forward-ios' size={20} color={'white'} />
          </TouchableOpacity>
        </View>
     


      {/* Loading indicator */}
      {isLoading && (
        <View style={{
          position: 'absolute',
          zIndex: 5,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={{ color: 'white', marginTop: 10 }}>Loading VR Experience...</Text>
        </View>
      )}

      {/* Unity View */}
      <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={handleUnityMessage}
        onUnityReady={handleUnityReady}
      />
    </View>
  );
};

export default VrUnity;