import {
    View,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { colors, fonts } from '../../../../config/Constants1';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { connect } from 'react-redux';
import MyLoader from '../../../../components/MyLoader2';
import { useTranslation } from 'react-i18next';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import { Colors, Fonts, Sizes } from '../../../../assets/style';
import { SCREEN_WIDTH } from '../../../../config/Screen';
import MyHeader from '../../../../components/MyHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import KundliMatch from '../../../kundli/KundliMatch';
import Astkoota from '../../../Match/Astkoota';
import BasicMatch from '../../../Match/BasicMatch';
import AstroMatching from '../../../Match/AstroMatching';
import { FontsStyle } from '../../../../config/constants';

const Tab = createMaterialTopTabNavigator();

const BasicMatching = ({ dispatch, MatchBasicDetails, femaleKundliData, maleKundliData, navigation }) => {
    console.log("maleKundliData", maleKundliData)
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        dispatch(KundliActions.getKundliMatchingAshtakootPoints());
    }, []);
    console.log(MatchBasicDetails?.female_astro_details, 'Bascis match')
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyLoader isVisible={isLoading} />
            <MyHeader title={'Match Report'} navigation={navigation} />
            <Tab.Navigator
                      screenOptions={{
                        tabBarScrollEnabled: true,
                        tabBarLabelStyle: {fontSize: 13, ...FontsStyle.font},
                        tabBarGap: 0,
                        tabBarStyle: {flex: 0},
                        tabBarItemStyle: {flex: 0, paddingHorizontal: 0, margin: 0},
                      }}>
                      <Tab.Screen name={t("Ashtkoot Predictions")} component={KundliMatch} />
                      <Tab.Screen name={t("Ashtkoot Report")} component={Astkoota} />
                      <Tab.Screen name={t("Astro Details")} component={AstroMatching} />
                      <Tab.Screen name={t("Basic Details")} component={BasicMatch} />
                    </Tab.Navigator>
            
        </View>
    );
};



const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    birthDetailsData: state.kundli.birthDetailsData,
    maleKundliData: state.kundli.maleKundliData,
    femaleKundliData: state.kundli.femaleKundliData,
    matchingAshtakootPointsData: state.kundli.matchingAshtakootPointsData,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BasicMatching);

const styles = StyleSheet.create({
    itmeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-between'
    },
    itemText: {
        flex: 0.5,
        fontSize: 12,
        color: colors.black_color8,
        fontFamily: fonts.medium,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonContainer: {
        width: '45%',
        backgroundColor: "#F7F6FE",
        borderRadius: Sizes.fixPadding,
        height: SCREEN_WIDTH * 0.3,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2
    },
    buttonText: {
        ...Fonts.PoppinsRegular,
        color: 'black',
        textAlign: 'center'
    },
});
