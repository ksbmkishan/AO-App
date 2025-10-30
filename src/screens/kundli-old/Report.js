import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { Fonts } from '../../assets/style';
import GhatChakra from './Report/GhatChakra';
import Sarvashtakvarga from './Report/Sarvashtakvarga';

const Report = ({ dispatch, drishti }) => {
    const [selectedTab, setSelectedTab] = useState('ghatChakra');

    useEffect(() => {
        dispatch(KundliActions.getKundliReport());
    }, [dispatch]);

   

    return (
        <View style={styles.container}>
            {/* Toggle Buttons */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, selectedTab === 'ghatChakra' && styles.selectedButton]}
                    onPress={() => setSelectedTab('ghatChakra')}
                >
                    <Text style={[styles.toggleButtonText, selectedTab === 'ghatChakra' && styles.selectedText]}>GHAT CHAKRA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, selectedTab === 'sarvashtakvarga' && styles.selectedButton]}
                    onPress={() => setSelectedTab('sarvashtakvarga')}
                >
                    <Text style={[styles.toggleButtonText, selectedTab === 'sarvashtakvarga' && styles.selectedText]}>SARVASHTAKVARGA</Text>
                </TouchableOpacity>
            </View>

            {selectedTab === 'ghatChakra' ? <GhatChakra /> : <Sarvashtakvarga />}
        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    drishti: state.kundli.drishti,
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);

const styles = StyleSheet.create({
    container: {
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 20,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'red',
    },
    toggleButtonText: {
        ...Fonts.PoppinsMedium
    },
    selectedText: {
        color: 'white',
    },
    commanText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    }
});
