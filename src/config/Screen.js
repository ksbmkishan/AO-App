import { Dimensions } from "react-native";
let scale = Dimensions.get('screen').scale / Dimensions.get('window').scale;
let SCREEN_HEIGHT =  Dimensions.get('screen').height * scale;
let SCREEN_WIDTH =  Dimensions.get('screen').width * scale;

import {widthPercentageToDP as RESPONSIVE_WIDTH, heightPercentageToDP as RESPONSIVE_HEIGHT} from 'react-native-responsive-screen';

const isFoldOpen = SCREEN_WIDTH > SCREEN_HEIGHT * 1.2;  // ratio threshold
const isPortrait = SCREEN_HEIGHT >= SCREEN_WIDTH;

if (isFoldOpen) {
  console.log("📖 Fold Phone (open)");
} else if (isPortrait) {
  console.log("📱 Normal Portrait Phone");
} else {
   
  console.log("📱 Landscape Phone");
}
let FoldPhone = false;
 if (SCREEN_WIDTH > SCREEN_HEIGHT) {
    FoldPhone = false;
    } 

export {SCREEN_HEIGHT, SCREEN_WIDTH,RESPONSIVE_WIDTH,RESPONSIVE_HEIGHT,FoldPhone}



export const Colors = {
    primaryTheme: '#D56A14',
    secondryTheme: '#D56A14',
    secondryLight: '#aad576',
    white: '#fff',
    black: '#000',
    lightBlack:'#8B8B8B',
    grayA: '#6c757d',
    grayB: '#adb5bd',
    grayC: '#E2DEDE',
    grayD: '#dee2e6',
    grayE: '#e9ecef',
    grayF: '#f8f9fa',
    grayG: '#F7F7F7',
    grayDark: '#4A4A4A',
    redA: '#e76f51',
    wine: '#610F06',
    orange: '#FC4702',
    background_theme1:"#D56A14",
    green:"#03C04A",
    
}