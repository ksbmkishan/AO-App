import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import MyHeader from '../../components/MyHeader';
import RenderHTML from 'react-native-render-html';
import { SCREEN_WIDTH } from '../../config/Screen';
const PanchangMonthlys = ({ navigation}) => {

    const {panchangMonthly} = useSelector(state => state.kundli);

    console.log("Panchang Monthly Data: ", panchangMonthly);

  return (
    <View style={{ flex: 1,  }}>
      <MyHeader title="Yearly Festival" navigation={navigation} />
        <View style={{ flex: 1, }}>
            <FlatList 
            ListHeaderComponent={() => (
                <View style={{ padding: 20, backgroundColor: '#f8f8f8', borderRadius: 10, width: '100%' }}>
                    {panchangMonthly ? (
                        <RenderHTML
                        contentWidth={SCREEN_WIDTH}
                        source={{ html: panchangMonthly?.description || '' }}
                        baseStyle={{ fontSize: 16, color: '#000' }}
                        />
                    ) : (
                        <Text style={{ fontSize: 16, color: '#000' }}>No data available</Text>
                    )}
                </View>
            )}
            />
        </View>
        <View style={{ height: 50 }} />
    </View>
  )
}

export default PanchangMonthlys

const styles = StyleSheet.create({})
  


