import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import NumerologyTable from './NumerologyTable';
import NumerlogyChoChart from './NumerlogyChoChart';
import MyHeader from '../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


import * as KundliActions from '../../redux/actions/KundliActions'
import { connect } from 'react-redux';
import NumerologyPridiction from './Predictions/NumerologyPridiction';
import NumeroogyDestination from './Predictions/NumeroogyDestination';
import NumerologyNameAlphabet from './Predictions/NumerologyNameAlphabet';
import HousePridiction from '../kundli-old/Pridictions/HousePridiction';
import NumerologyPersonalDay from './Predictions/NumerologyPersonalDay';
import NumerologyPersonalYear from './Predictions/NumerologyPersonalYear';
import MonthlyNumero from './Predictions/MonthlyNumero';
import { FontsStyle } from '../../config/constants';
import { useTranslation } from 'react-i18next';






const Tab = createMaterialTopTabNavigator();
const NewNumerology = ({ route, dispatch, isLoading, basicDetails, kundliListData, kundliId }) => {
    const navigation = useNavigation()
    console.log("basicDetailsnumero", basicDetails)
    const {t} = useTranslation();

    console.log("kundliIdnumero", kundliId)
    useEffect(() => {

        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);
    return (
        <View style={{ backgroundColor: "F8E8D9", flex: 1 }}>
            <MyHeader title={"NUMEROLOGY"} navigation={navigation} />
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
                        {t("CHART ANALYSIS")}:
                    </Text>
                </LinearGradient>
            </View>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...FontsStyle.fontBold },
                    tabBarGap: 0,
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>

                 <Tab.Screen
                    name={t("Life Path Compatibility")}
                    component={NumerologyTable}

                />

                <Tab.Screen
                    name={t("Lo-Shu Grid/ Chart")}
                    component={NumerlogyChoChart}

                />
               

                <Tab.Screen
                    name={t("Destiny number calculation")}
                    component={NumeroogyDestination}

                />
                <Tab.Screen
                    name={t("Name Alphabets Prediction")}
                    component={NumerologyNameAlphabet}

                />
                <Tab.Screen
                    name={t("Personal Day Number")}
                    component={NumerologyPersonalDay}

                />

                <Tab.Screen
                    name={t("Personal Month Number")}
                    component={MonthlyNumero}

                />

                <Tab.Screen
                    name={t("Personal Year Number")}
                    component={NumerologyPersonalYear}

                />






                {/* 
                <Tab.Screen
                    name={"Radical/life path number table"}
                    component={NumerologyTable}

                />


                <Tab.Screen
                    name={"Radical/life path number report"}
                    component={NumerologyPridiction}

                />
                <Tab.Screen
                    name={"Destiny number calculation"}
                    component={NumeroogyDestination}

                />


                <Tab.Screen
                    name={"Name Alphabets Prediction"}
                    component={NumerologyNameAlphabet}

                /> */}
                {/* <Tab.Screen
                    name={"Ank-kundli (planets prediction)"}
                    component={HousePridiction}

                /> */}
                {/* 
                <Tab.Screen
                    name={"Daily Prediction"}
                    component={NumerologyPersonalDay}

                />
                <Tab.Screen
                    name={"Monthly Prediction"}
                    component={MonthlyNumero}

                />


                <Tab.Screen
                    name={"Yearly  Prediction"}
                    component={NumerologyPersonalYear}

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


export default connect(mapStateToProps, mapDispatchToProps)(NewNumerology);

const styles = StyleSheet.create({})