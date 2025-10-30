import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../config/Screen';
import * as KundliActions from '../../redux/actions/KundliActions'
import { Fonts } from '../../assets/style';

const BrahDirshti = ({ dispatch, drishti, route }) => {

    useEffect(() => {
        dispatch(KundliActions.getKundliDrishti('bhav'));
    }, [route.params, dispatch]);

    const plantName = [
        { name: "PL" },
        { name: "SU" },
        { name: "MO" },
        { name: "MA" },
        { name: "ME" },
        { name: "JU" },
        { name: "VE" },
        { name: "SA" },
        { name: "RA" },
        { name: "KE" }
    ];

    // Filtering the data to remove "note" and "planets" keys
    const filteredDrishti = drishti && Object.keys(drishti)
        .filter(key => key !== "note" && key !== "planets")
        .reduce((obj, key) => {
            obj[key] = drishti[key];
            return obj;
        }, {});

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                {plantName.map((item, index) => (
                    <Text key={index} style={styles.headerCell}>{item?.name}</Text>
                ))}
            </View>

            {/* Data Rows */}
            {drishti && (
                <FlatList
                    data={Object.values(filteredDrishti)}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            {item.map((value, index) => (
                                <Text key={index} style={styles.cell}>{value}</Text>
                            ))}
                        </View>
                    )}
                    contentContainerStyle={styles.flatListContainer}
                    ListEmptyComponent={
                        <View>
                            <Text style={{ ...Fonts.PoppinsMedium, textAlign: 'center' }}>No Data found </Text>
                        </View>
                    }
                />
            )}
        </View>
    )
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    drishti: state.kundli.drishti
});

export default connect(mapStateToProps, mapDispatchToProps)(BrahDirshti)

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerCell: {
        width: SCREEN_WIDTH * 0.095,
        textAlign: 'center',
        padding: 5,
        ...Fonts.PoppinsMedium
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
        ...Fonts.PoppinsRegular,
        fontSize: 10,
        borderWidth: 0.5
    },
    flatListContainer: {
        paddingBottom: 10,
    }
})