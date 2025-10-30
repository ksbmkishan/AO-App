import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import BaiscGemstone from './GemsStone/BaiscGemstone';
// import HealthStone from './GemsStone/HealthStone';
// import EducationStone from './GemsStone/EducationStone';
// import StoneforDaan from './GemsStone/StoneforDaan';
// import Yantra from './Yantra';
// import Mantra from './Mantra';
// import Rudhraksha from './Rudhraksha';
import MyHeader from '../../components/MyHeader';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as KundliActions from '../../redux/actions/KundliActions'
import { connect } from 'react-redux';



const Tab = createMaterialTopTabNavigator();
const LuckyGemstone = ({ route, dispatch, isLoading, basicDetails, kundliListData, kundliId }) => {
    const navigation = useNavigation()
    console.log("basicDetailskk", basicDetails)

    console.log("kundliIddddd", kundliId)
    useEffect(() => {

        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);
    return (
        <View style={{ backgroundColor: "F8E8D9", flex: 1 }}>
            <MyHeader title={"GEMSTONE BABA"} navigation={navigation} />
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
                        Lucky Charm:
                    </Text>
                </LinearGradient>
            </View>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,

                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>

                <Tab.Screen
                    name={"Lucky Stone Suggestion"}
                    component={BaiscGemstone}

                />
{/* 
                <Tab.Screen
                    name={"Health Stone Suggestion"}
                    component={HealthStone}

                />
                <Tab.Screen
                    name={"Education Stone Suggestion"}
                    component={EducationStone}

                />
                <Tab.Screen
                    name={"Stone for Daan"}
                    component={StoneforDaan}

                />

                <Tab.Screen
                    name={"Yantra Suggestion"}
                    component={Yantra}

                />
                <Tab.Screen
                    name={"Mantra Suggestion"}
                    component={Mantra}

                />
                <Tab.Screen
                    name={"Rudraksha Suggestion"}
                    component={Rudhraksha}

                /> */}

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


export default connect(mapStateToProps, mapDispatchToProps)(LuckyGemstone);

const styles = StyleSheet.create({})