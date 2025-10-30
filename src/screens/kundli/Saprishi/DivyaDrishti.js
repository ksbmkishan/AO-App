import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Fonts } from '../../../assets/style';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';

import MyHeader from '../../../components/MyHeader';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { connect } from 'react-redux';
import TransitChart from '../TransitChart';
import TransitMoonChart from '../TransitMoonChart';
import { FontsStyle } from '../../../config/constants';
import TranslateText from '../../language/TranslateText';
import { useTranslation } from 'react-i18next';




const Tab = createMaterialTopTabNavigator();
const DivyaDrishti = ({ route, dispatch, isLoading, basicDetails, kundliListData, kundliId }) => {
    const navigation = useNavigation()
    console.log("basicDetailskk", basicDetails)

    const {t} = useTranslation();

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
                    <Text style={{ ...FontsStyle.fontBold, color: 'white' }}>
                       {t("TRANSITS")}:
                    </Text>
                </LinearGradient>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...FontsStyle.fontBold},
                    tabBarGap: 0,
                    tabBarStyle: { backgroundColor: '#fff' },
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53 },
                }}
            >
                {/* {/* <Tab.Screen name="Planet Transit Predictions" component={Transit} /> */}
                <Tab.Screen name={t("lagna")} component={TransitChart} />
                  <Tab.Screen name={t("moon")} component={TransitMoonChart} />
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