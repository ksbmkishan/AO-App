import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const planets = [
    'sun',
    'moon',
    'mars',
    'mercury',
    'jupiter',
    'venus',
    'saturn',
    'rahu',
    'ketu',
];


//YE PLANET IN HOUSE KAH CONETENT DALVAYA HAI GAURAV BHAI 16-05-25

const Lalkitaab = ({ kundliId, basicDetails, dispatch, Housepridiction }) => {
    const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);

    useEffect(() => {
        if (basicDetails?.lat && basicDetails?.lon && selectedPlanet) {
            const payload = {
                lat: basicDetails.lat,
                lon: basicDetails.lon,
                planet_name: selectedPlanet,
            };
            console.log('planet_name_payload', payload);

            dispatch(KundliActions.gethousepridiction(payload));
        }
    }, [selectedPlanet, basicDetails]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={Fonts.PoppinsBold}>Reports of Planet in Each House</Text>
            </View>

            <View style={styles.pickerContainer}>

                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedPlanet}
                        onValueChange={(itemValue) => setSelectedPlanet(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#333"
                    >
                        {planets.map((planet) => (
                            <Picker.Item
                                key={planet}
                                label={planet.charAt(0).toUpperCase() + planet.slice(1)}
                                value={planet}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.reportContainer}>
                <Text style={Fonts.PoppinsBold}>House: {Housepridiction?.house}</Text>
                <Text style={Fonts.PoppinsBold}>Planet: {Housepridiction?.planet}</Text>
                <Text style={styles.reportText}>{Housepridiction?.report}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SCREEN_HEIGHT * 0.02,
        backgroundColor: '#F8E8D9',
        height: '100%',
    },
    header: {
        paddingBottom: SCREEN_HEIGHT * 0.02,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    pickerLabel: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#000',
        paddingHorizontal: 10,
    },
    reportContainer: {
        marginTop: 10,
    },
    reportText: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.6),
        textAlign: 'justify',
        marginTop: 10,
    },
});

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Housepridiction: state.kundli.Housepridiction,
    isLoading: state.setting.isLoading,
});

export default connect(mapStateToProps)(Lalkitaab);
