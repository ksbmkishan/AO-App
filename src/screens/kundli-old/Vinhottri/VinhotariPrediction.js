import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const VinhotariPrediction = ({ basicDetails, dispatch, Vinhottaripridiction }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState('sun');

    const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

    useEffect(() => {

        if (basicDetails?.lat && basicDetails?.lon) {
            const payload = {
                lat: basicDetails?.lat,
                lon: basicDetails?.lon,
                planet_name: selectedPlanet
            };
            dispatch(KundliActions.getVinhottripridiction(payload));
        }
    }, [basicDetails?.lat, basicDetails?.lon, dispatch]);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const handlePlanetSelect = (planet) => {
        setSelectedPlanet(planet);
        setDropdownVisible(false);

        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
            planet_name: planet
        };
        dispatch(KundliActions.getVinhottripridiction(payload));
    }

    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <TouchableOpacity
                style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                onPress={toggleDropdown}
            >
                <Text style={{
                    ...Fonts.black11InterMedium,
                    fontSize: responsiveFontSize(1.6),
                    textAlign: "justify"
                }}>
                    {selectedPlanet}
                </Text>
            </TouchableOpacity>

            {dropdownVisible && (
                <View style={styles.dropdown}>
                    {planets.map((planet, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePlanetSelect(planet)}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownText}>{planet}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                <Text style={{
                    ...Fonts.PoppinsBold,
                    fontSize: responsiveFontSize(2),
                    textAlign: "justify",
                    alignSelf: "center"
                }}>
                    {Vinhottaripridiction?.planet_name}
                </Text>

                <Text style={{
                    ...Fonts.black11InterMedium,
                    fontSize: responsiveFontSize(1.7),
                    textAlign: "justify"
                }}>
                    {Vinhottaripridiction?.report}
                </Text>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Vinhottaripridiction: state.kundli.Vinhottaripridiction,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VinhotariPrediction);

const styles = StyleSheet.create({
    textstyle: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.5)
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginTop: 5,
        borderRadius: 5
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    dropdownText: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.5)
    }
});
