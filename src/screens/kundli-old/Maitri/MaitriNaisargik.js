import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';

const MaitriNaisargik = ({ dispatch, maitriData, route }) => {
    useEffect(() => {
        dispatch(KundliActions.getKundliMaitri('naisargik'));
    }, [dispatch, route.params]);


    return (
        <View style={styles.container}>
            {/* Header Row */}
            {maitriData && <>
                <View style={styles.headerRow}>
                    <Text style={[styles.headerCell, styles.fixedColumn]}>Planets</Text>

                    {/* {maitriData.map((item, index) => (
                    <Text key={index} style={styles.headerCell}>{item.name}</Text>
                ))} */}

                </View>

                {/* Data Rows */}
                <FlatList
                    data={maitriData}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            {/* Planet Name Column */}
                            <Text style={[styles.cell, styles.fixedColumn]}>{item.name}</Text>
                            {/* Values */}
                            {item.val.map((value, index) => (
                                <Text key={index} style={styles.cell}>{value}</Text>
                            ))}
                        </View>
                    )}
                />

            </>}
        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    maitriData: state.kundli.maitriData
})

export default connect(mapStateToProps, mapDispatchToProps)(MaitriNaisargik);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff'
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        ...Fonts.PoppinsMedium,
        color: 'black',
        padding: 5
    },
    fixedColumn: {
        width: SCREEN_WIDTH * 0.2,
        backgroundColor: '#ccc',
        ...Fonts.PoppinsMedium
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        padding: 5,
        color: 'black',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9'
    }
});
