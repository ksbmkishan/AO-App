import { StyleSheet, Text, View ,ScrollView ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Fonts } from '../../assets/style'
import { colors } from '../../config/Constants1'
import { useNavigation } from '@react-navigation/native'

const PoojaVidhiDetails = () => {
  return (
    <View style={{flex:1}}>
       {Header()}
       <ScrollView>
       
       {imageContainer()}
       {Description()}
       </ScrollView>
    </View>
  )
  function Header(){
    return(
      <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:SCREEN_WIDTH*0.03,paddingVertical:SCREEN_HEIGHT*0.02,alignItems:"center"}}> 
      <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name='left' size={22} color={colors.black_color9}/>
                </TouchableOpacity>         
                <Text style={{...Fonts.PoppinsMedium,color:colors.black_color9,fontSize:16}}>Rahoo Mantra                           </Text>
                <Image 
                style={{height:SCREEN_HEIGHT*0.03,width:SCREEN_WIDTH*0.06}}
                source={require('../../assets/images/whatsapp_logo.png')}/>
      </View>
    )
  }
      function imageContainer(){
        return(
          <View style={{alignItems:"center",paddingVertical:SCREEN_HEIGHT*0.02}}>
                          <View style={{width:SCREEN_WIDTH*0.9,height:SCREEN_HEIGHT*0.27,backgroundColor:colors.white_color ,borderRadius:8,justifyContent:"center",alignItems:"center"}}>

                                    <Image 
                                    style={{height:SCREEN_HEIGHT*0.265,width:SCREEN_WIDTH*0.88,borderRadius:50     }}
                                    source={require('../../assets/icons/kushpavitra.png')}/>


                          </View>
          </View>
        )
      } 
      function Description(){
        return(
          <View style={{paddingHorizontal:SCREEN_WIDTH*0.05}}>
                <View style={{paddingVertical:SCREEN_HEIGHT*0.03}}>
                  <Text style={{...Fonts.PoppinsBold,fontSize:14}}>Kush Pavitra Vidhi</Text>
                </View>
                <View>
                  <Text>||Shri गायत्री मंत्र Description||</Text>
                </View>
          </View>
        )
      }
}

export default PoojaVidhiDetails

const styles = StyleSheet.create({})