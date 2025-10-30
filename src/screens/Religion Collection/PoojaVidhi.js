import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import { useNavigation, } from '@react-navigation/native'
import { Fonts } from '../../assets/style';


const images = {
  Image1: require('../../assets/icons/kushpavitra.png'),
  Image2: require('../../assets/icons/samanya.png'),
  Image3: require('../../assets/icons/aachan.png'),
  Image4: require('../../assets/icons/ganeshsambhik.png'),
  Image5: require('../../assets/icons/sikhabandhan.png'),
  Image6: require('../../assets/icons/suddhikaran.png'),
  

};

const DATA = [
  { id: '1', image: images.Image1, AartiName: 'Ganesh ji Aarti', },
  { id: '2', image: images.Image2, AartiName: 'Om Jai Jagdish Hare Aarti', },
  { id: '3', image: images.Image3, AartiName: 'Durga Mata Aarti', },
  { id: '4', image: images.Image4, AartiName: 'Mata Laxmi Aarti', },
  { id: '5', image: images.Image5, AartiName: 'Aarti Hanuman lala ki', },
  { id: '6', image: images.Image6, AartiName: 'Shri Satya Narayan Aarti', },
 
];


const PoojaVidhi = () => {
  const navigation = useNavigation();


  const renderitem = ({ item }) => {
    return (
  
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.015,paddingLeft:SCREEN_WIDTH*0.02}} >
  
  
        <TouchableOpacity 
          onPress={() => navigation.navigate('PoojaVidhiDetails')}
        style={styles.aartiConatiner}>
  
          
            <Image
              style={styles.photostyles}
              source={item.image} />
          
  
          
         
  
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

export default PoojaVidhi



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  backIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
   
  },

  aartiConatiner: {
    height: SCREEN_HEIGHT * 0.28,
    width: SCREEN_WIDTH * 0.42, 
    alignItems:"center",
    overflow:"hidden",
      borderRadius: 20,
       marginHorizontal: SCREEN_WIDTH * 0.025, 
       backgroundColor: colors.white_color, 
       alignItems: "center", elevation: 15,
    
  },
  photostyles:{
    height: SCREEN_HEIGHT * 0.28,
     width: SCREEN_WIDTH * 0.42, 
    
      borderRadius: 20
  }
 
})