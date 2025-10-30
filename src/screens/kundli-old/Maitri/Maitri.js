import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { SCREEN_WIDTH } from '../../../config/Screen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { fonts, getFontSize } from '../../../config/Constants1'
import MaitriTatkalik from './MaitriTatkalik'
import MaitriPanchdaha from './MaitriPanchdaha'
import MaitriNaisargik from './MaitriNaisargik'
import { Fonts } from '../../../assets/style'

const Tab = createMaterialTopTabNavigator();

const Maitri = ({ dispatch, drishti }) => {
    return (
        <View style={styles.container}>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { ...Fonts.PoppinsMedium },
                    tabBarGap: 0,
                    tabBarStyle: { flex: 1 },
                    tabBarItemStyle: { width: SCREEN_WIDTH * 0.53, },
                }}>
                <Tab.Screen
                    name={"Maitri Tatkalik"}
                    component={MaitriTatkalik}
                    initialParams={'tatkalik'}

                />
                 <Tab.Screen
                    name={"Maitri Naisargik"}
                    component={MaitriNaisargik}
                    initialParams={'Naisargik'}
                />
                <Tab.Screen
                    name={"Maitri Panchdaha"}
                    component={MaitriPanchdaha}
                    initialParams={'Panchdaha'}
                />
               
            </Tab.Navigator>

        </View>
    );
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    drishti: state.kundli.drishti
});

export default connect(mapStateToProps, mapDispatchToProps)(Maitri);

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        padding: 2,
        textAlign: 'center',
        color: 'black',
        // borderWidth: 1,
        // borderColor: '#ccc',
        fontSize: 10,
        width: SCREEN_WIDTH * 0.095,
    },
    flatListContainer: {
        paddingBottom: 10,
    }
});
