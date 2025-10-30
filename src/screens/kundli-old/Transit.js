import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { calendarFormat } from 'moment'

const Transit = ({ basicDetails, dispatch, TransitDATA }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState('sun');
    console.log("TransitDATA",TransitDATA)

    const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

    useEffect(() => {
        if (basicDetails?.lat && basicDetails?.lon && selectedPlanet) {
            const payload = {
                lat: basicDetails.lat,
                lon: basicDetails.lon,
                planet_name: selectedPlanet
            };
            dispatch(KundliActions.getTransit(payload));
        }
    }, [basicDetails?.lat, basicDetails?.lon, selectedPlanet, dispatch]);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const handlePlanetSelect = (planet) => {
        setSelectedPlanet(planet);
        setDropdownVisible(false);
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

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
                    {capitalizeFirstLetter(selectedPlanet)}
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
                            <Text style={styles.dropdownText}>{capitalizeFirstLetter(TransitDATA?.planet)}</Text>
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
                    {capitalizeFirstLetter(TransitDATA?.planet_name)}
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: SCREEN_HEIGHT * 0.02, height: SCREEN_HEIGHT * 0.6 }}>
                    <Text style={{
                        ...Fonts.black11InterMedium,
                        fontSize: responsiveFontSize(1.7),
                        textAlign: "justify"
                    }}>
                        {TransitDATA?.report || 'Loading...'}
                    </Text>
                    <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02 }}>

                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    TransitDATA: state.kundli.TransitDATA,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Transit);

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
