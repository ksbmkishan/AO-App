import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

const ImageComponent = ({ uri, style }) => {
  const isSvg = uri?.toLowerCase().endsWith('.svg');

  return (
    <View style={[styles.container, style]}>
      {isSvg ? (
        <SvgUri
          uri={uri}
          width="100%"
          height="100%"
        />
      ) : (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill} // Fills parent container
          resizeMode="cover"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default ImageComponent;
