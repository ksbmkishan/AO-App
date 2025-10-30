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
import NumerologyPridiction from './Pridictions/NumerologyPridiction';
import NumeroogyDestination from './Pridictions/NumeroogyDestination';
import NumerologyNameAlphabet from './Pridictions/NumerologyNameAlphabet';
import HousePridiction from './Pridictions/HousePridiction';
import NumerologyPersonalDay from './Pridictions/NumerologyPersonalDay';
import NumerologyPersonalYear from './Pridictions/NumerologyPersonalYear';
import MonthlyNumero from './Pridictions/MonthlyNumero';
import * as KundliActions from '../../redux/actions/KundliActions'
import { connect } from 'react-redux';






const Tab = createMaterialTopTabNavigator();
const NewNumerology = ({ route, dispatch, isLoading, basicDetails, kundliListData, kundliId }) => {
    const navigation = useNavigation()
    console.log("basicDetailsnumero", basicDetails)

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
                    <Text style={{ ...Fonts.PoppinsBold, color: 'white' }}>
                        CHART ANALYSIS:
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
                    name={"Lo-Shu Grid/ Chart"}
                    component={NumerlogyChoChart}

                />

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

                />
                <Tab.Screen
                    name={"Ank-kundli (planets prediction)"}
                    component={HousePridiction}

                />

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

                />




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