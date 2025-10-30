import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { SCREEN_WIDTH } from '../../config/Screen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import GrahDirshti from './GrahDirshti'
import BrahDirshti from './BrahDirshti'
import { fonts, getFontSize } from '../../config/Constants1'

const Tab = createMaterialTopTabNavigator();

const Dirshti = ({ dispatch, drishti }) => {
    return (
        <View style={styles.container}>
            <Tab.Navigator

                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: { fontSize: getFontSize(1.5), fontFamily: fonts.medium },
                    tabBarGap: 0,
                    tabBarStyle: { flex: 0 },
                    tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
                }}>
                <Tab.Screen
                    name={"Grah Dirshti"}
                    component={GrahDirshti}
                    initialParams={'grah'}

                />
                <Tab.Screen
                    name={"Bhav Dirshti"}
                    component={BrahDirshti}
                    initialParams={'brah'}

                />
            </Tab.Navigator>

        </View>
    );
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    drishti: state.kundli.drishti
});

export default connect(mapStateToProps, mapDispatchToProps)(Dirshti);

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
