import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useDebugValue, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { colors, fonts } from '../config/Constants1';
import { connect, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('screen');
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Drawer = createDrawerNavigator();
import { useTranslation } from 'react-i18next';
import { FontsStyle, img_url, normalize } from '../config/constants';
import { RESPONSIVE_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { resetToScreen } from './NavigationServices';
import * as SettingActions from '../redux/actions/SettingActions';

const DrawerNavigator = props => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = () => {
    Alert.alert('Wait!', 'Astro One is aligning the stars for you with Pooja, Prarthna & Remedies. Still want to log out?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: 'LOGOUT',
        onPress: () => on_logout(),
      },
    ]);
  };

  const on_logout = async () => {
    await AsyncStorage.clear();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    resetToScreen('login');
  };

  const openWhatsApp = () => {
    const phoneNumber = '+91 9654443667';
    const message = 'Namaskar%2C%20I%20need%20assistance%20regarding%20this%20issue%2C%20e.g.%2C%20booking%2C%20payment%2C%20or%20app%20access.%20Please%20guide%20me%20at%20the%20earliest.%20Om%20Shanti!';
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    Linking.openURL(whatsappURL)
      .then(data => {
        console.log('WhatsApp opened successfully');
      })
      .catch(() => {
        console.error('An error occurred while opening WhatsApp');
      });
  };

  const hasCustomImage = !props.customerData?.image?.includes('user_default.jpg');
  const Imguri = hasCustomImage ? `${props.customerData?.image}` : null;

  const DrawerContent = (drawerProps) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                {Imguri ? (
                  <Image
                    source={{ uri: Imguri }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    source={props.customerData?.gender == 'female'
                      ? {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/female.jpeg'}
                      : {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/male.jpeg'}}
                    style={styles.profileImage}
                  />
                )}

                <TouchableOpacity
                  onPress={() => navigation.navigate('customerAccount')}
                  style={styles.editButton}>
                  <Image
                    source={require('../assets/images/icon/edit.png')}
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SendGifts')}
                style={styles.DrawerRowContainer}>
                <FontAwesome6
                  name='gift'
                  size={18}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Send Divya Rashi")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('walletHistroy')}
                style={styles.DrawerRowContainer}>
                <MaterialCommunityIcons
                  name='message-text-clock'
                  size={18}
                  color={"#D56A14"}
                />
                <Text allowFontScaling={false} style={styles.DrawerText}>
                  {t('payment_bill')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('divyaRashi')}
                style={styles.DrawerRowContainer}>
                <MaterialCommunityIcons
                  name='message-text-clock'
                  size={18}
                  color={"#D56A14"}
                />
                <Text allowFontScaling={false} style={styles.DrawerText}>
                  {t('divya_rashi')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('liveChatCall')}
                style={styles.DrawerRowContainer}>
                <MaterialCommunityIcons
                  name='message-text-clock'
                  size={18}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Order History")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('OrderHistory')}
                style={styles.DrawerRowContainer}>
                <FontAwesome6
                  name='building-columns'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("E-Order History")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Allservices')}
                style={styles.DrawerRowContainer}>
                <Ionicons
                  name='person-add-outline'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Recharge")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Welcome')}
                style={styles.DrawerRowContainer}>
                <MaterialCommunityIcons
                  name='email-newsletter'
                  size={17}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Letter to God")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('following')}
                style={styles.DrawerRowContainer}>
                <Ionicons
                  name='person-add-outline'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Following")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('howUse')}
                style={styles.DrawerRowContainer}>
                <MaterialIcons
                  name='smartphone'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("How to use our App?")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('CustomerTestimonials')}
                style={styles.DrawerRowContainer}>
                <MaterialCommunityIcons
                  name='account-group'
                  size={16}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Customer Testimonials")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ReferEarn')}
                style={styles.DrawerRowContainer}>
                <FontAwesome5
                  name='people-arrows'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Share & Shine: Divine Rewards")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openWhatsApp}
                style={styles.DrawerRowContainer}>
                <MaterialIcons
                  name='support-agent'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Help and Support")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('about')}
                style={styles.DrawerRowContainer}>
                <Entypo
                  name='info-with-circle'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("About AstroOne")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={logout}
                style={styles.DrawerRowContainer}>
                <Entypo
                  name='log-out'
                  size={15}
                  color={"#D56A14"}
                />
                <Text style={styles.DrawerText}>{t("Logout")}</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Content */}
            <View style={styles.bottomContainer}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ ...FontsStyle.fontfamily, color: '#D56A14', fontSize: normalize(18) }}>AstroOne</Text>
              </View>

              <View style={{ alignItems: "center", gap: 4, marginVertical: 10 }}>
                <Text style={{ ...FontsStyle.font, fontSize: normalize(11) }}>TATHASTU JYOTISHALLYA</Text>
                <Text style={{ ...FontsStyle.font, fontSize: normalize(11) }}>{t("Connect the cosmic dots.")}</Text>
                <Text style={{ ...FontsStyle.font, fontSize: normalize(11) }}>{t("Follow AstroOne for exclusive updates on:")}</Text>
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://www.facebook.com/')}
                >
                  <Image
                    resizeMode='contain'
                    style={styles.socialIcon}
                    source={require('../assets/images/facebook1.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://in.linkedin.com/')}
                >
                  <Image
                    resizeMode='contain'
                    style={styles.socialIcon}
                    source={require('../assets/images/linkedin.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://www.instagram.com/accounts/login/')}
                >
                  <Image
                    style={styles.socialIcon}
                    source={require('../assets/icons/Instagram.png')} />
                </TouchableOpacity>
              </View>

              <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>{t("Disclaimer: Predictions and remedies in this app are based on astrological scriptures. Consult a professional astrologer for personalized and accurate results. The creators do not guarantee the effectiveness of the advice provided. Use discretion.")}</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  };

  console.log('Drawer props', props?.route?.params?.data);

  useEffect(() => {
    if (props?.route?.params?.data) {
      dispatch(SettingActions.setVisibleHomeModal(true))
    }
  }, [props?.route?.params?.data]);

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.85,
          alignSelf: 'center',
          elevation: 8,
          shadowColor: colors.black_color6,
        },
      }}>
      <Drawer.Screen name="home2" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  homeSimmer: state.home.homeSimmer,
  isRefreshing: state.setting.isRefreshing,
});

export default connect(mapStateToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
  },
  editButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white_color,
    justifyContent: 'center',
    backgroundColor: colors.background_theme2,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  editIcon: {
    width: 10,
    height: 10,
    tintColor: 'white'
  },
  menuContainer: {
    backgroundColor: colors.white_color,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: colors.white_color,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_WIDTH * 0.12,
    paddingVertical: SCREEN_HEIGHT * 0.02
  },
  socialButton: {
    height: SCREEN_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.125
  },
  socialIcon: {
    height: '100%',
    width: '100%'
  },
  disclaimerContainer: {
    marginTop: 10,
  },
  disclaimerText: {
    color: 'black',
    textAlign: 'center',
    ...FontsStyle.fontfamily,
    fontSize: normalize(7)
  },
  DrawerText: {
    ...FontsStyle.font,
    fontSize: normalize(13),
    fontWeight: '800'
  },
  DrawerRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: SCREEN_HEIGHT * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey_color,
    paddingHorizontal: SCREEN_WIDTH * 0.04
  }
});