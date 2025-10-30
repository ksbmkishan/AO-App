import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen'
import { colors } from '../../config/Constants1'
import { useNavigation, } from '@react-navigation/native'
import { Fonts } from '../../assets/style'


const images = {
  Image1: require('../../assets/icons/thursday.png'),
  Image2: require('../../assets/icons/purnima.png'),
  Image3: require('../../assets/icons/ekadashi.png'),
  Image4: require('../../assets/icons/moksh.png'),
  Image5: require('../../assets/icons/vratekadashi.png'),
  Image6: require('../../assets/icons/moksh.png'),
 

};


const DATA = [
  { id: '1', image: images.Image1, AartiName: 'बृहस्पतिवार की कथा', },
  { id: '2', image: images.Image2, AartiName: 'पूर्णिमा व्रत कथा', },
  { id: '3', image: images.Image3, AartiName: 'एकादशी व्रत कथा', },
  { id: '4', image: images.Image4, AartiName: 'मोक्ष एकादशी', },
  { id: '5', image: images.Image5, AartiName: 'Aarti Hanuman lala ki', },
  { id: '6', image: images.Image6, AartiName: 'Shri Satya Narayan Aarti', },
 
];




const VratKathas = () => {
  const navigation = useNavigation();

  const renderitem = ({ item }) => {
    return (

      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.015 }} >


        <TouchableOpacity
          onPress={() => navigation.navigate('BeejMantraDetails')}
          style={styles.aartiConatiner}>

          <View style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.45, alignItems: "center" }}>
            <Image
              style={styles.photostyles}
              source={item.image} />
          </View>

          <View style={{ paddingTop: SCREEN_HEIGHT * 0.028 }}>
            <Text style={{ ...Fonts.PoppinsBold, fontSize: 13 }}>
              {item.AartiName}
            </Text>
          </View>

        </TouchableOpacity >



      </View>

    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderitem}
        
      />
    </SafeAreaView >
  )
}

export default VratKathas



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: colors.white_color
  },
  backIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    
  },
  aartiConatiner: {
    height: SCREEN_HEIGHT * 0.3,
     width: SCREEN_WIDTH * 0.45,
      borderRadius: 20,
       marginHorizontal: SCREEN_WIDTH * 0.025, 
       backgroundColor: colors.white_color, 
       alignItems: "center", elevation: 15
  },
  photostyles:{
    height: SCREEN_HEIGHT * 0.23,
     width: SCREEN_WIDTH * 0.45, 
    
      borderRadius: 20
  }
 
})