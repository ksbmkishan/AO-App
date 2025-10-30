import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { colors } from '../../config/Constants1'

const GeoModule = ({ basicDetails, dispatch, Mygeo }) => {
    console.log("Mygeo", Mygeo)
    const [Keyword, setKeyword] = useState('')

    const handlePress = () => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
            keyword: Keyword,
        }
        console.log("Dispatching payload:", payload)
        dispatch(KundliActions.getGeoModule(payload))
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.cityText}>{item.city}, {item.country}</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Latitude:</Text>
                    <Text style={styles.value}>{item.latitude}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Longitude:</Text>
                    <Text style={styles.value}>{item.longitude}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Timezone:</Text>
                    <Text style={styles.value}>UTC {item.timezone}</Text>
                </View>
            </View>
        );
    };


    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <View style={{ elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, borderRadius: 10, backgroundColor: "white" }}>
                <TextInput
                    maxLength={3}
                    value={Keyword}
                    onChangeText={setKeyword}
                    placeholder='Enter Your City in 3 words'
                    placeholderTextColor={colors.black_color9}
                    style={{color:colors.black_color9}}
                />
            </View>

            <TouchableOpacity
                style={{
                    elevation: 1,
                    marginHorizontal: 120,
                    paddingVertical: SCREEN_HEIGHT * 0.01,
                    borderRadius: 100,
                    alignItems: "center",
                    marginVertical: SCREEN_HEIGHT * 0.02,
                    backgroundColor: colors.background_theme2
                }}
                onPress={handlePress}
            >
                <Text style={{ ...Fonts.PoppinsBold,color:"white" }}>Submit</Text>
            </TouchableOpacity>

            <View>
                <FlatList data={Mygeo?.response} renderItem={renderItem} />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Mygeo: state.kundli.Mygeo,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GeoModule);

const styles = StyleSheet.create({
    textstyle: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.5)
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        elevation: 2,
    },

    cityText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },

    label: {
        fontSize: responsiveFontSize(1.6),
        color: '#666',
        fontWeight: '600',
    },

    value: {
        fontSize: responsiveFontSize(1.6),
        color: '#444',
    },
})
