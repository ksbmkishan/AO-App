import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';


import MyHeader from '../../components/MyHeader';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as KundliActions from '../../redux/actions/KundliActions'
import { connect } from 'react-redux';
import BaiscGemstone from '../kundli-old/GemsStone/BaiscGemstone';
import HealthStone from '../kundli-old/GemsStone/HealthStone';
import Mantra from '../kundli-old/Mantra';
import EducationStone from '../kundli-old/GemsStone/EducationStone';
import { FontsStyle, normalize } from '../../config/constants';
import { useTranslation } from 'react-i18next';




const Tab = createMaterialTopTabNavigator();
const LuckyGemstone = ({ route, dispatch, isLoading, basicDetails, kundliListData, kundliId }) => {
    const navigation = useNavigation()
    console.log("basicDetailskk", basicDetails)
    const {t} = useTranslation();

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
                    <Text style={{ ...FontsStyle.fontBold, color: 'white' }}>
                        {t("Lucky Charm")}:
                    </Text>
                </LinearGradient>
            </View>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...FontsStyle.font,fontSize:normalize(11) },
                    tabBarGap: 0,

                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>

                     <Tab.Screen
                    name={t("Lucky Stone Suggestion")}
                    component={BaiscGemstone}

                />

                <Tab.Screen
                    name={t("Health Stone Suggestion")}
                    component={HealthStone}

                />

                <Tab.Screen
                    name={t("Education Stone Suggestion")}
                    component={EducationStone}

                />

               


                <Tab.Screen
                    name={t("Mantra Suggestion")}
                    component={Mantra}

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