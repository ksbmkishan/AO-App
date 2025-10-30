import React, { useRef, useEffect, useState } from 'react';
import { Camera, useCameraDevice,useCameraFormat } from 'react-native-vision-camera';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ChatActions from '../redux/actions/ChatActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showToastMessage } from './services';
const CameraVision = ({ dispatch }) => {
  
  const [flip,setFlip] = useState('back')
  const camera = useRef(null);

  const device = useCameraDevice(flip)
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      
      const cameraPermission = await Camera.requestCameraPermission();
      console.log('Camera Permission ::: ', cameraPermission)
      setHasPermission(cameraPermission === 'authorized');
    };

    requestPermission();
  }, []);

  const format = useCameraFormat(device, [
    { photoResolution: { width: 1280, height: 720 } }
  ]);


  const photo = async() => {
   const data =  await camera.current.takePhoto();
   
   const image = `file://${data?.path}`;
   console.log('data camera ::: ',image);
   dispatch(ChatActions.setChatImageData([image]))
   dispatch(ChatActions.setCameraVisionVisible(false));
  };

  const Flip = () => {
    if(flip == 'back') {
      setFlip('front')
    } else {
      setFlip('back')
    }
    
  }

  const exitCamera = () => {
    dispatch(ChatActions.setCameraVisionVisible(false));
  }

  if (!device) return showToastMessage({ message: 'loading....'});

  return (
    <View style={styles.absoluteFill}>
      <Camera
        ref={camera}
        style={styles.absoluteFill}
        device={device}
        isActive={true}
        format={format}
        photo={true}
      />
      <TouchableOpacity 
      onPress={() => photo()}
      style={{
        alignSelf:'center',
        bottom:20,
        position:'absolute'
      }}>
      <Entypo name='circle' size={50} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => Flip()}
      style={{
        alignSelf:'flex-end',
        bottom:20,
        position:'absolute',
        paddingRight:20
      }}>
        <MaterialIcons name='flip-camera-ios' size={50} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
      style={{alignSelf:'flex-end', position:'absolute',padding:10}}
      onPress={() => exitCamera()}>
        <AntDesign name='closecircle' size={40} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
  requestedData: state.chat.requestedData,
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraVision);

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
