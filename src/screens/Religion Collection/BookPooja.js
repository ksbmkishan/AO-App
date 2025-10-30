import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { api_url, colors, img_url } from '../../config/Constants1';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as PoojaActions from '../../redux/actions/PoojaActions';
import FastImage from "@d11/react-native-fast-image";;

const BookPooja = ({ dispatch, pujaDetails }) => {
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(PoojaActions.getPujaDetails());
  }, [dispatch]);

  console.log("book puja details::::::", pujaDetails?.image);

  // Render function for each item in FlatList
  const renderItem = ({ item }) => {

    const truncateDescription = (description) => {
      const words = description.split(' ');
      if (words.length > 30) {
        return words.slice(0, 5).join(' ') + '...';
      }
      return description;
    };

    console.log("dsf;ksdljf;klas",item?.image);
    
    return (
      <View style={styles.touchable}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: api_url + item?.image || "N/A" }}
            style={styles.touchableImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.touchableText}>{item?.pujaName}</Text>
          <Text style={styles.touchableText1}>{truncateDescription(item?.description)}</Text>
          <Text style={styles.priceText}>{item?.price}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.3}
          style={styles.buttonContainer}
          onPress={() =>

            navigation.navigate('poojaDetails', {
              pujaName: item?.pujaName,
              price: item?.price,
              image: item?.image,
              description: item?.description,
              itemId: item?.id,
            })
          }
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/sangrahalay_bg.jpg')}
        style={styles.backgroundImage}
      >
        <MyHeader title={"Book Puja"} navigation={navigation}/>

        <FlatList
          data={pujaDetails}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  pujaDetails: state.pooja.pujaDetails,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BookPooja);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: "white",
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
    fontSize: SCREEN_HEIGHT * 0.020,
    marginLeft: responsiveScreenWidth(12),
  },
  touchable: {
 
    alignItems: 'center',
    height: responsiveScreenHeight(30),
   
  },
  imageContainer: {
    width: responsiveScreenWidth(45),
    height: responsiveScreenWidth(60),
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderRadius: 5,
    borderWidth: 0.2,
  },
  touchableImage: {
    width: responsiveScreenWidth(44),
    height: responsiveScreenWidth(40),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 4,
  },
  textContainer: {
    width: responsiveScreenWidth(44),
    alignItems: 'flex-start',
    paddingLeft: responsiveScreenWidth(2),
    bottom: responsiveScreenHeight(9),
  },
  touchableText: {
    fontSize: responsiveScreenFontSize(1.4),
    color: colors.black_color9,
    fontWeight: 'bold',
  },
  touchableText1: {
    fontSize: responsiveScreenFontSize(1.2),
    color: colors.black_color9,
    fontWeight: 'semibold',
  },
  priceText: {
    fontSize: responsiveScreenFontSize(1.1),
    color: colors.black_color9,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: responsiveScreenWidth(44),
    bottom: responsiveScreenHeight(9.3),
    alignItems: 'flex-end',
    marginRight: responsiveScreenWidth(4),
  },
  bookText: {
    borderColor: colors.green_color1,
    color: colors.green_color1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: responsiveScreenWidth(2),
    paddingHorizontal: responsiveScreenWidth(7),
    fontSize: responsiveScreenFontSize(1.4),
  },
  flatListContainer: {
    paddingTop: responsiveScreenHeight(2),
  },
});
