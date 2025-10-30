import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { Fonts } from '../../assets/style';
import GhatChakra from './Report/GhatChakra';
import Sarvashtakvarga from './Report/Sarvashtakvarga';
import Sadhbhal from './Sadhbhal';

const NewAstakvarga = ({ dispatch, drishti }) => {
    const [selectedTab, setSelectedTab] = useState('Sarvashtakvarga');

    useEffect(() => {
        dispatch(KundliActions.getKundliReport());
    }, [dispatch]);



    return (
        <View style={styles.container}>
            {/* Toggle Buttons */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, selectedTab === 'Sarvashtakvarga' && styles.selectedButton]}
                    onPress={() => setSelectedTab('Sarvashtakvarga')}
                >
                    <Text style={[styles.toggleButtonText, selectedTab === 'Sarvashtakvarga' && styles.selectedText]}>
                        Sarvashtak Varga
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleButton, selectedTab === 'shadbhal' && styles.selectedButton]}
                    onPress={() => setSelectedTab('shadbhal')}
                >
                    <Text style={[styles.toggleButtonText, selectedTab === 'shadbhal' && styles.selectedText]}>
                        Shadbal
                    </Text>
                </TouchableOpacity>

            </View>

            {selectedTab === 'Sarvashtakvarga' ? <Sarvashtakvarga /> : <Sadhbhal />}
        </View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    drishti: state.kundli.drishti,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAstakvarga);

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
