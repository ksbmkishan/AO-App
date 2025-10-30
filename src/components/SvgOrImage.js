

import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SvgUri } from 'react-native-svg';
import SvgWebView from './SvgWebView';

const SvgOrImage = ({ uri, style, resizeMode = 'contain' }) => {
  const isLocalImage = typeof uri === 'number';
  const isSvg = typeof uri === 'string' && uri.toLowerCase().endsWith('.svg');

  if (isSvg) {
    return <SvgWebView uri={uri} style={style} />;
  }

  return (
    <Image
      source={isLocalImage ? uri : { uri }}
      style={style}
      resizeMode={resizeMode}
    />
  );
};

const styles = StyleSheet.create({
  svgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SvgOrImage;

