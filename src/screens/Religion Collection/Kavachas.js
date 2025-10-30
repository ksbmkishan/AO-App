import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { colors } from '../../config/Constants1'

import { useNavigation, } from '@react-navigation/native'

const images = {
  Image1: require('../../assets/icons/rahoo.png'),
  Image2: require('../../assets/icons/nazarbattoo.png'),
  Image3: require('../../assets/icons/devichanda.png'),
  Image4:require('../../assets/icons/durgakavach.png'),
  Image5: require('../../assets/icons/kavach2.png'),
  
 


};



const DATA = [
  { id: '1', image: images.Image1, AartiName: 'Rahu kavach', },
  { id: '2', image: images.Image2, AartiName: 'Nazar Raksha kavach', },
  { id: '3', image: images.Image3, AartiName: 'Devi Chanda kavach', },
  { id: '4', image: images.Image4, AartiName: ' Laxmi Mata Chalisa', },
  { id: '5', image: images.Image5, AartiName: 'Shree Hanuman chalisa', },
 


];

const Kavach = () => {
  const navigation = useNavigation();


  const renderitem = ({ item }) => {
    return (

      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.015 }} >


        <TouchableOpacity
          onPress={() => navigation.navigate('KavachDetails')}
          style={styles.aartiConatiner}>

          <View style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.45, justifyContent: "center", alignItems: "center" }}>
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
        keyExtractor={(item) => item}
        renderItem={renderitem}
        numColumns={2}


      />
    </SafeAreaView >
  )
}

export default Kavach



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
      marginHorizontal:SCREEN_WIDTH*0.023,
    
       backgroundColor: colors.white_color, 
       alignItems: "center", elevation: 15
       ,
       overflow:"hidden"
  },
  photostyles:{
    height: SCREEN_HEIGHT * 0.23,
    width: SCREEN_WIDTH * 0.45,
     
      borderRadius: 20,
      alignSelf:"center"
      
  }

})