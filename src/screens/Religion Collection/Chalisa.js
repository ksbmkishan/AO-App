import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useNavigation, } from '@react-navigation/native'
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen'
import { colors } from '../../config/Constants1'

import { Fonts } from '../../assets/style'









const DATA = [
  { id: '1', image: images.Image1, AartiName: 'Shree Ganesh Chalisa', },
  { id: '2', image: images.Image2, AartiName: 'Shree Vishnu Chalisa', },
  { id: '3', image: images.Image3, AartiName: 'Durga Mata Chalisa', },
  { id: '4', image: images.Image4, AartiName: ' Laxmi Mata Chalisa', },
  { id: '5', image: images.Image5, AartiName: 'Shree Hanuman chalisa', },
  { id: '6', image: images.Image6, AartiName: 'Shri Shiv chalisa', },
  { id: '7', image: images.Image7, AartiName: 'Shree krishna Chalisa', },
  { id: '8', image: images.Image8, AartiName: 'Shri Sai Chalisa', },
  { id: '9', image: images.Image9, AartiName: 'Kali Mata Chalisa', },
  { id: '10', image: images.Image10, AartiName: 'Shri Ram Chalisa', },
 

];





 

const Chalisa = () => {

      const navigation=useNavigation();

  const renderitem = ({ item }) => {
    return (
  
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.015 }} >
  
  
        <TouchableOpacity 
        onPress={()=> navigation.navigate('ChalisaDetails')}
        style={styles.aartiConatiner}>
  
          <View style={{ height: SCREEN_HEIGHT * 0.23,  width: SCREEN_WIDTH * 0.45 ,justifyContent:"center",alignItems:"center" }}>
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
        numColumns={2}
       renderItem={renderitem}
       
      />
    </SafeAreaView >
  )
}

export default Chalisa



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor:"white"
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