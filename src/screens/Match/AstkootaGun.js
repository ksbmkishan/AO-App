import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import MyHeader from '../../components/MyHeader';
import { Fonts, Sizes } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';

const AstkootaGun = ({ navigation, dispatch, matchgun }) => {
    useEffect(() => {
        dispatch(KundliActions.getgundata());
    }, [dispatch]);

    const gunData = matchgun ? [
        { name: 'bhakoot', title: 'Love' },
        { name: 'gana', title: 'Temperament' },
        { name: 'grahmaitri', title: 'Friendliness' },
        { name: 'naadi', title: 'Health' },
        { name: 'tara', title: 'Destiny' },
        { name: 'varna', title: 'Work' },
        { name: 'vashya', title: 'Dominance' },
        { name: 'yoni', title: 'Mentality' },
    ] : [];

    const renderHeader = () => (
        <View style={styles.headings}>
            <Text style={[styles.heading, { width: SCREEN_WIDTH * 0.26 }]}>Area</Text>
            <Text style={[styles.heading, { width: SCREEN_WIDTH * 0.26 }]}>Male Value</Text>
            <Text style={[styles.heading, { width: SCREEN_WIDTH * 0.26 }]}>Female Value</Text>
            <Text style={[styles.heading, { width: SCREEN_WIDTH * 0.26 }]}>Points Obtained</Text>
            <Text style={[styles.heading, { width: SCREEN_WIDTH * 0.26 }]}>Total Points</Text>
        </View>
    );

    const renderItem = (item, index) => (
        <View key={index} style={[styles.itemContainer, { backgroundColor: index % 2 === 0 ? '#F7F6FE' : 'white' }]}>
            <Text style={[styles.dataText, { width: SCREEN_WIDTH * 0.24 }]}>{item.title}</Text>
            <Text style={[styles.dataText, { width: SCREEN_WIDTH * 0.24 }]}>{matchgun[item.name]?.maleval}</Text>
            <Text style={[styles.dataText, { width: SCREEN_WIDTH * 0.24 }]}>{matchgun[item.name]?.femaleval}</Text>
            <Text style={[styles.dataText, { width: SCREEN_WIDTH * 0.24 }]}>{matchgun[item.name]?.pointsobtained}</Text>
            <Text style={[styles.dataText, { width: SCREEN_WIDTH * 0.24 }]}>{matchgun[item.name]?.totalpoints}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <MyHeader title={'Gun Milan'} navigation={navigation} />
            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollContent}>
                <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                    {renderHeader()}
                    <ScrollView>
                        {gunData.map((item, index) => renderItem(item, index))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    horizontalScrollContent: {
        flexDirection: 'column',
        paddingBottom: 20,
    },
    headings: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    heading: {
        ...Fonts.PoppinsMedium,
        padding: 10,

    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dataText: {
        ...Fonts.PoppinsRegular,
        textAlign: 'center',
    },
});

const mapStateToProps = (state) => ({
    matchgun: state.kundli.matchgun,
    isLoading: state.kundli.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstkootaGun);