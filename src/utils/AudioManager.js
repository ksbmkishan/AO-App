import { NativeModules } from 'react-native';

const { RnAudioManager } = NativeModules;

export default {
  // Volume methods
  getVolume: (streamType) => RnAudioManager.getVolume(streamType),
  setVolume: (streamType, volume, showUI = false) => 
    RnAudioManager.setVolume(streamType, volume, showUI),
  adjustVolume: (streamType, direction, showUI = false) => 
    RnAudioManager.adjustVolume(streamType, direction, showUI),

  // Ringer mode methods
  getRingerMode: () => RnAudioManager.getRingerMode(),
  setRingerMode: (mode) => RnAudioManager.setRingerMode(mode),

  // DND methods
  hasDndPermission: () => RnAudioManager.hasDndPermission(),
  openDndSettings: () => RnAudioManager.openDndSettings(),

  // Vibration methods
  vibrate: (durationMs) => RnAudioManager.vibrate(durationMs),
  vibratePattern: (pattern, repeat = -1) => RnAudioManager.vibratePattern(pattern, repeat),
  cancelVibration: () => RnAudioManager.cancelVibration(),
};