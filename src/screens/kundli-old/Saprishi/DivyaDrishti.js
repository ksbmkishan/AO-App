import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';

import Transit from '../Transit';
import LifeForecastPrediction from '../Vinhottri/LifeForecastPrediction';
import MyHeader from '../../../components/MyHeader';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { connect } from 'react-redux';
import VinhotariPrediction from '../Vinhottri/VinhotariPrediction';



const Tab = createMaterialTopTabNavigator();
const DivyaDrishti = ({ route, dispatch, isLoading, basicDetails, kundliListData, kundliId }) => {
    const navigation = useNavigation()
    console.log("basicDetailskk", basicDetails)

    console.log("kundliIddddd", kundliId)
    useEffect(() => {

        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);

    return (
        <View style={{ flex: 1, backgroundColor: '#F8E8D9' }}>
            <MyHeader title={"DIVYA DRISHTA"} navigation={navigation} />
            <View style={{}}>
                <LinearGradient
                    colors={['#1E68B9', '#123A62']}
                    locations={[0, 0.41]}
                    style={{
                        paddingVertical: SCREEN_HEIGHT * 0.015,
                        paddingHorizontal: SCREEN_WIDTH * 0.025,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...Fonts.PoppinsBold, color: 'white' }}>
                        TRANSITS :
                    </Text>
                </LinearGradient>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                    tabBarStyle: { backgroundColor: '#fff' },
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53 },
                }}
            >
                <Tab.Screen name="Planet Transit Predictions" component={Transit} />
                <Tab.Screen name="Life Forecast Prediction" component={VinhotariPrediction} />
            </Tab.Navigator>
        </View>
    )
}



const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    kundliListData: state.kundli.kundliListData,
    kundliId: state.kundli.kundliId,
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(DivyaDrishti);

const styles = StyleSheet.create({})