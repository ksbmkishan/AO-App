// import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
// import { colors } from '../../config/Constants1'
// import { useNavigation, } from '@react-navigation/native'

// import { Fonts } from '../../assets/style'



// const images = {
//   Image1: require('../../assets/icons/GANESSHAARTI.png'),
//   Image2: require('../../assets/icons/omjai.png'),
//   Image3: require('../../assets/icons/duragamata.png'),
//   Image4: require('../../assets/icons/Laxmiji.png'),
//   Image5: require('../../assets/icons/hanuman.png'),
//   Image7: require('../../assets/icons/shivarti.png'),
//   Image8: require('../../assets/icons/kunjbihari.png'),
//   Image9: require('../../assets/icons/khatu.png'),
//   Image10: require('../../assets/icons/sia.png'),
//   Image11: require('../../assets/icons/shreeram.png'),
//   Image12: require('../../assets/icons/saraswati.png'),
//   Image13: require('../../assets/icons/kaalimata.png'),
//   Image14: require('../../assets/icons/sanidev.png'),

// };


// const DATA = [
//   { id: '1', image: images.Image1, AartiName: 'Ganesh ji Aarti', },
//   { id: '2', image: images.Image2, AartiName: 'Om Jai Jagdish Hare Aarti', },
//   { id: '3', image: images.Image3, AartiName: 'Durga Mata Aarti', },
//   { id: '4', image: images.Image4, AartiName: 'Mata Laxmi Aarti', },
//   { id: '5', image: images.Image5, AartiName: 'Aarti Hanuman lala ki', },
//   { id: '6', image: images.Image6, AartiName: 'Shri Satya Narayan Aarti', },
//   { id: '7', image: images.Image7, AartiName: 'Shiv Ji ki Aarti', },
//   { id: '8', image: images.Image8, AartiName: 'Aarti Kunj Bihari', },
//   { id: '9', image: images.Image9, AartiName: 'Shri Khatu Shyam Arti', },
//   { id: '10', image: images.Image10, AartiName: 'Aarti Sai Baba ki', },
//   { id: '11', image: images.Image11, AartiName: 'Jai shree Ram', },
//   { id: '12', image: images.Image12, AartiName: 'Aarti Saraswati Mata ki', },
//   { id: '13', image: images.Image13, AartiName: 'Kali Mata Aarti', },
//   { id: '14', image: images.Image14, AartiName: 'Aarti Shani devji', },

// ];









// const Aarti = () => {
//   const navigation = useNavigation();

//   const renderitem = ({ item }) => {
//     return (
  
//       <View style={{ paddingVertical: SCREEN_HEIGHT * 0.015 }} >
  
  
//         <TouchableOpacity 
//          onPress={() =>
//           navigation.navigate('AartiDetails', {
//             aartiName: item.AartiName,
//             image: item.image,
//           })
//         }
//         style={styles.aartiConatiner}>
  
//           <View style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.4, paddingTop: SCREEN_HEIGHT * 0.01 }}>
//             <Image
//               style={styles.photostyles}
//               source={item.image} />
//           </View>
  
//           <View style={{ paddingTop: SCREEN_HEIGHT * 0.028 }}>
//             <Text style={{ ...Fonts.PoppinsBold, fontSize: 13 }}>
//               {item.AartiName}
//             </Text>
//           </View>
  
//         </TouchableOpacity >
  
  
  
//       </View>
  
//     )
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>


//       <FlatList
//         data={DATA}
//         keyExtractor={(item) => item}
//         numColumns={2}
//         renderItem={renderitem}

//         contentContainerStyle={styles.flatListContainer}
//       />
//     </SafeAreaView >
//   )
// }

// export default Aarti



// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   headerContainer: {
//     padding: 12,
//     flexDirection: 'row',
//     backgroundColor: colors.white
//   },
//   backIcon: {
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 1,

//   },

//   aartiConatiner: {
//     height: SCREEN_HEIGHT * 0.3,
//      width: SCREEN_WIDTH * 0.45,
//       borderRadius: 20,
//        marginHorizontal: SCREEN_WIDTH * 0.025, 
//        backgroundColor: colors.white_color, 
//        alignItems: "center", elevation: 15
//   },
//   photostyles:{
//     height: SCREEN_HEIGHT * 0.23,
//      width: SCREEN_WIDTH * 0.4, 
//      resizeMode: "contain",
//       borderRadius: 20
//   }


// })




import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from '../../assets/style'

const Aarti = () => {
  return (
    <View>
      <Text style={{...Fonts.PoppinsBold}}>Aarti</Text>
    </View>
  )
}

export default Aarti

const styles = StyleSheet.create({})