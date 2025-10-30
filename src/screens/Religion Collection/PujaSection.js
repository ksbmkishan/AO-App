import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect } from 'react';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import { useNavigation } from '@react-navigation/native';
import * as PoojaActions from '../../redux/actions/PoojaActions';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { Fonts } from '../../assets/style';
import { img_url } from '../../config/constants';
import SvgOrImage from '../../components/SvgOrImage';
import { useTranslation } from 'react-i18next';
import TranslateText from '../language/TranslateText';


const PujaSection = ({ dispatch, getallReligionCollection }) => {
  const firstSixgetallReligionCollection = getallReligionCollection ? getallReligionCollection?.filter(value => value?.categoryName !== 'Devotional Songs') : []
  const lastOnegetallReligionCollection = getallReligionCollection ? getallReligionCollection?.filter(value => value?.categoryName == 'Devotional Songs') : []
  const navigation = useNavigation();

  const {t} = useTranslation();

  useEffect(() => {


    dispatch(PoojaActions.getAllReligionCollection());

  }, [dispatch]);

  console.log('checktheAllReligioscollection:::KKK', getallReligionCollection)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/sangrahalay_bg.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign
              name="left"
              size={25}
              color={colors.black_color9}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.txt}>{t("Pooja Section Sangrahlaya")}</Text>
          </View>
        </View>

        <FlatList
          data={firstSixgetallReligionCollection}
          keyExtractor={item => item._id}
          numColumns={3}
          renderItem={({ item }) => (
            console.log('checkItemData::KKK', item),

            <TouchableOpacity
              style={styles.touchable}
              onPress={() => navigation.navigate('DetailPujaScreens', { itemName: item._id, categoryName: item.categoryName })}
            >

              <View style={{ borderWidth: 1, alignItems: 'center', borderRadius: 8, marginTop: 8, }}>

                <View style={{
                  width: responsiveScreenWidth(30),
                  height: responsiveScreenWidth(30),
                  borderRadius: 8
                }}>
                  
                  <SvgOrImage 
                  uri={item?.image}
                    style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 8 }}
                  />
                </View>


                <Text style={styles.touchableText}><TranslateText title={item.categoryName} /></Text>

              </View>

            </TouchableOpacity>

          )}
          contentContainerStyle={styles.flatListContainer}
          ListFooterComponent={
            <View>
              <BookVirtualPuja />
              <DevotionalSongs lastOnegetallReligionCollection={lastOnegetallReligionCollection} />
              <Mahurat />
            </View>
          }
        />


      </ImageBackground>
    </SafeAreaView>
  );
};

const BookVirtualPuja = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={{ padding: SCREEN_WIDTH * 0.02 }}>
      <View
        style={{
          paddingVertical: SCREEN_HEIGHT * 0.01,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 5,
          marginBottom: responsiveScreenHeight(2),
        }}>
        <Text
          style={{
            color: colors.background_theme2,
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: SCREEN_WIDTH * 0.01,
          }}>
          |
        </Text>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
         {t("Book Virtual Pooja")}
        </Text>
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('BookPooja')}
        onPress={() => {
          navigation.navigate('AllPujaByCategory', {
            id: '68b542ba483c3a4d0cd8c8bf',
            name: t('Pavitra e-Pooja Sankalp')
            
          });
        }}
        style={{ alignItems: 'center', borderRadius: 15, overflow: 'hidden' }}>
        <Image
          style={{
            height: SCREEN_HEIGHT * 0.24,
            width: SCREEN_WIDTH * 0.98,
            elevation: 1,
          }}
          source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/bookpooj.png'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const DevotionalSongs = ({ lastOnegetallReligionCollection }) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View
      style={{
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        paddingBottom: SCREEN_HEIGHT * 0.05,
      }}>
      <View
        style={{
          paddingVertical: SCREEN_HEIGHT * 0.01,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 5,
          marginBottom: responsiveScreenHeight(2),
        }}>
        <Text
          style={{
            color: colors.background_theme2,
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: SCREEN_WIDTH * 0.01,
          }}>
          |
        </Text>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
          {t("Devotional Songs")}
        </Text>
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('PujaSection')}
        onPress={() => navigation.navigate('DetailPujaScreens', { itemName: lastOnegetallReligionCollection[0]?._id, categoryName: lastOnegetallReligionCollection[0]?.categoryName })}
        style={{ alignItems: 'center', borderRadius: 15, overflow: 'hidden' }}>
        <Image
          style={{
            height: SCREEN_HEIGHT * 0.24,
            width: SCREEN_WIDTH * 0.98,
            elevation: 1,
          }}
          source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/newdesong.png'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const Mahurat = () => {
  const navigation = useNavigation();
  const {t} =useTranslation();
  return (
    <View
      style={{
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        paddingBottom: SCREEN_HEIGHT * 0.05,
      }}>
      <View
        style={{
          paddingVertical: SCREEN_HEIGHT * 0.01,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 5,
          marginBottom: responsiveScreenHeight(2),
        }}>
        <Text
          style={{
            color: colors.background_theme2,
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: SCREEN_WIDTH * 0.01,
          }}>
          |
        </Text>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
          {t("Muhurat")}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewPanchang', { screen: 'Mahurat' })}
        style={{ alignItems: 'center', borderRadius: 15, overflow: 'hidden' }}>
        <Image
          style={{
            height: SCREEN_HEIGHT * 0.24,
            width: SCREEN_WIDTH * 0.98,
            elevation: 1,
          }}
          source={{ uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/mahurat.png'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  getallReligionCollection: state.pooja.getallReligionCollection,
  poojaData: state.pooja.poojaData,
  newPoojaData: state.pooja.newPoojaData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PujaSection);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: colors.white_color,
  },
  backIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    marginTop: responsiveScreenHeight(0.2),
    marginLeft: responsiveScreenWidth(1),
  },
  txt: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.black_color9,
    fontSize: SCREEN_HEIGHT * 0.02,
    marginLeft: responsiveScreenWidth(12),
  },
  touchable: {
    flex: 1,
    alignItems: 'center',

  },
  touchableImage: {

    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1

  },
  touchableText: {
    ...Fonts.PoppinsMedium,
    color: 'white',
    position: 'absolute',
    top: SCREEN_WIDTH * 0.23
  },
  flatListContainer: {
    paddingTop: responsiveScreenHeight(2),
  },
});
