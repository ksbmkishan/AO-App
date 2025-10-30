import { requireNativeComponent } from 'react-native';
import React from 'react';

const NativeMedia3View = requireNativeComponent('Media3PlayerView');

const Media3PlayerView = ({ source, paused = false, muted = false, style }) => {
  return <NativeMedia3View source={source} paused={paused} muted={muted} style={style} />;
};

export default Media3PlayerView;
