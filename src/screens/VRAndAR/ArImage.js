import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import AnimatedBell from './AnimatedBell';
import WebView from 'react-native-webview';
import * as VrActions from '../../redux/actions/VrActions';
import { useDispatch, useSelector } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import MyHeader from '../../components/MyHeader';
import ArHeader from './ArHeader';

export default function ARImage(props) {
  const { changeVrImageCount } = useSelector(state => state.VRAndAR);
  const { route } = props;
  const { data = [] } = route?.params || {};
  const dispatch = useDispatch();

  const customerData = useSelector(state => state.customer.customerData);

  useEffect(() => {
    dispatch(VrActions.getVrItems());
    // requestStoragePermission
  }, [dispatch]);


  useEffect(() => {
    if (data.length > 0) {
      const payload = {
        realUserCount: 1,
        darshanId: data[0]?._id,
        vr_title: data[0]?.vr_title,
      };
      dispatch(VrActions.updateVrUserCount(payload));
    }
  }, [data, dispatch]);

  const imageUrl = data.length > 0 && changeVrImageCount < data.length
    ? data[changeVrImageCount]?.vr_image
    : 'https://cloudflare1.360gigapixels.com/pano/hemant3d/00905632_hampi2_cube_3_equi.jpg/equirect_crop_3_1/6.jpg';

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

  return (
    <View style={styles.container}>
      <MyHeader title={'AR Viewer'} navigation={props.navigation} />
      <ArHeader data={data} customerData={customerData} />
      <WebView
        originWhitelist={['*']}
        source={{ html: pannellumHTML }}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mixedContentMode="always"
        allowFileAccess
        allowUniversalAccessFromFileURLs
        allowFileAccessFromFileURLs
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('HTTP error: ', nativeEvent.statusCode, nativeEvent.description);
        }}
      />

      <AnimatedBell />


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
    left: 10,
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
  }
});