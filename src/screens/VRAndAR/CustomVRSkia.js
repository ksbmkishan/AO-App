// PanoramaView.js
import React from 'react';
import { View, Button } from 'react-native';
import { NativeModules } from 'react-native';

const { PanoramaViewer } = NativeModules;

const PanoramaView = ({ imageUrl = 'https://storage.googleapis.com/static-temple360/360/jagannathtemple/3.jpg' }) => {
  const show360View = () => {
    PanoramaViewer.showPanorama(imageUrl)
      .then(() => console.log('Panorama viewer launched'))
      .catch(error => console.error('Error:', error));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        title="View 360° Panorama" 
        onPress={show360View} 
      />
    </View>
  );
};

export default PanoramaView;