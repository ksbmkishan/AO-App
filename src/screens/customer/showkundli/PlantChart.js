import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as KundliActions from '../../../redux/actions/KundliActions'
import { Sizes } from '../../../assets/style'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'

const PlantChart = ({chartData, dispatch}) => {

    const [current,setCurrent] = useState('sun');

    useEffect(() => {
        dispatch(KundliActions.getKundliChartData('sun'));
    },[]);
    const dataarray = [{name: "sun"}, {name: "moon"}, {name: "mars"}, {name: "mercury"}, {name:"jupiter"}, {name: "venus"} , {name:"saturn"}, {name: "rahu"}, {name:"ketu"}]

    const handleKundliCharts = (item) => {
        setCurrent(item);
        dispatch(KundliActions.getKundliChartData(item));
    }

  return (
    <View style={{ flex: 1, padding: Sizes.fixPadding }}>
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }}>
                    {dataarray.map((item, index) => (
                        <TouchableOpacity key={index} 
                        style={{ paddingHorizontal: 10, paddingVertical: 5,borderWidth:current == item.name ? 2 : 1, borderRadius:10,margin:10 }}
                        onPress={() => handleKundliCharts(item.name)}>
                            <Text style={{ color: 'black' }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <Image
                source={{ uri: chartData?.url }}
                style={{
                    width: SCREEN_WIDTH * 0.95,
                    height: SCREEN_HEIGHT * 0.335,
                    resizeMode: 'contain',
                }}
            />
        </View>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch})

const mapStateToProps = state => ({
    chartData: state.kundli.chartData
})

export default connect(mapStateToProps,mapDispatchToProps)(PlantChart)

const styles = StyleSheet.create({})