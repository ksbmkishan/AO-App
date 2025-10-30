import { StyleSheet, Text, View ,ImageBackground ,Image ,TouchableOpacity ,ScrollView} from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Fonts } from '../../assets/style'
import { colors } from '../../config/Constants1'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { useNavigation } from '@react-navigation/native'

const ChalisaDetails = () => {
  const navigation=useNavigation();
  return (
    <ImageBackground 
    style={{flex:1}}
    source={require('../../assets/images/Chalisabg.png')}>
       {Header()}
      <ScrollView>
       
        {imageContainer()}
        {Description()}
        </ScrollView>

    </ImageBackground>
  )
  function Header(){
    return(
      <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:SCREEN_WIDTH*0.03,paddingVertical:SCREEN_HEIGHT*0.02,alignItems:"center"}}> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name='left' size={22} color={colors.white_color}/>
                </TouchableOpacity>         
                <Text style={{...Fonts.PoppinsMedium,color:colors.white_color,fontSize:16}}>Shri Ganesh Chalisa</Text>
                <Image 
                style={{height:SCREEN_HEIGHT*0.03,width:SCREEN_WIDTH*0.06}}
                source={require('../../assets/images/what.png')}/>
      </View>
    )
  }
      function imageContainer(){
        return(
          <View style={{alignItems:"center",paddingVertical:SCREEN_HEIGHT*0.02}}>
                          <View style={{width:SCREEN_WIDTH*0.9,height:SCREEN_HEIGHT*0.27,backgroundColor:colors.white_color ,borderRadius:8,justifyContent:"center",alignItems:"center"}}>

                                    <Image 
                                    style={{height:SCREEN_HEIGHT*0.265,width:SCREEN_WIDTH*0.88,borderRadius:50     }}
                                    source={require('../../assets/icons/ganeshchalisha.png')}/>


                          </View>
          </View>
        )
      } 
      function Description(){
        return(
          <View style={{paddingHorizontal:SCREEN_WIDTH*0.05}}>
                <View style={{paddingVertical:SCREEN_HEIGHT*0.03}}>
                  <Text style={{...Fonts.PoppinsBold,fontSize:14}}>श्री गणेश चालीसा</Text>
                </View>
                <View>
                  <Text>||Shri Ganesh Chalisa Description||</Text>
                </View>
          </View>
        )
      }
}

export default ChalisaDetails

const styles = StyleSheet.create({})