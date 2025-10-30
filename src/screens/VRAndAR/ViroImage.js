import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import HeaderWithBell from './header';
import AnimatedBell from './AnimatedBell';
import WebView from 'react-native-webview';
import * as VrActions from '../../redux/actions/VrActions';
import { useDispatch, useSelector } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import { colors } from '../../config/Constants1';
import { Fonts } from '../../assets/style';
import MyHeader from '../../components/MyHeader';
const { width: screenWidth } = Dimensions.get('window');

export default function PanoramaViewer(props) {
  const { vrItems, changeVrImageCount } = useSelector(state => state.VRAndAR);
  const { route } = props;
  const { data = [] } = route?.params || {};
  const refRBSheet = useRef(null);
  const dispatch = useDispatch();

   const customerData = useSelector(state => state.customer.customerData);

   console.log('customer data ',customerData)

  useEffect(() => {
    dispatch(VrActions.getVrItems());
    // requestStoragePermission
  }, [dispatch]);

  console.log('data. :: ',data);

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
    ?  data[changeVrImageCount]?.vr_image 
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

  const userCount = data.length > 0 
    ? (Number(data[0]?.vr_darshan_fake_user) || 0) + (Number(data[0]?.vr_darshan_real_user) || 0)
    : 0;

  return (
    <View style={styles.container}>
      <MyHeader title={'Panorama Viewer'} navigation={props.navigation} />
      <HeaderWithBell data={data} customerData={customerData}/>
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
      
      {/* User Count View */}
      <View style={styles.userCountContainer}>
        {/* <Ionicons name="eye" size={20} color="white" /> */}
        <Image
          source={{uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/male.jpeg'}}
          style={{ width: 20, height: 20 }}
        />
        <Text style={styles.userCountText}>{userCount}</Text>
      </View>
      
      {/* Title Button */}
      <View style={styles.titleButtonContainer}>
        <TouchableOpacity
          onPress={() => refRBSheet.current?.open()}
          style={styles.titleButton}
        >
          <Text style={styles.titleButtonText}>Explore more</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Sheet */}
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        closeOnPressBack
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.2)'
          },
          container: {
            height: SCREEN_HEIGHT * 0.2,
            backgroundColor: '#faedcd',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        keyboardAvoidingViewEnabled={true}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={Fonts.PoppinsSemiBold}>
              Explore another section
            </Text>
          </View>
          <FlatList
            horizontal
            data={data}
            keyExtractor={(item) => item._id || Math.random().toString()}
            renderItem={({ index, item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryTab,
                  changeVrImageCount === index && styles.activeTab,
                ]}
                onPress={() => {dispatch(VrActions.changeVrImage(index)),
                  refRBSheet.current?.close()
                }}
              >
                <Text style={[
                  styles.categoryText,
                  changeVrImageCount === index && styles.activeText,
                ]}>
                  {item.vr_title}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </RBSheet>
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