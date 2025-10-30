import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

const NumerologyTable = ({ basicDetails, dispatch, NumTable }) => {
    // console.log("NumTable", NumTable)

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getNumerologyTable(payload))
    }, [dispatch])
    return (
        <ScrollView style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Created AT : </Text>
                <Text style={styles.textstyle}>{NumTable?.date}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Destiny Number: </Text>
                <Text style={styles.textstyle}>{NumTable?.destiny_number}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Evil Number : </Text>
                <Text style={styles.textstyle}>{NumTable?.evil_num}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Fav color : </Text>
                <Text style={styles.textstyle}>{NumTable?.fav_color}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Created AT : </Text>
                <Text style={styles.textstyle}>{NumTable?.fav_day}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Fav God : </Text>
                <Text style={styles.textstyle}>{NumTable?.fav_god}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Fav Mantra : </Text>
                <Text style={styles.textstyle}>{NumTable?.fav_mantra}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Fav metal : </Text>
                <Text style={styles.textstyle}>{NumTable?.fav_metal}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Fav Stone : </Text>
                <Text style={styles.textstyle}>{NumTable?.fav_stone}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Friendly Number : </Text>
                <Text style={styles.textstyle}>{NumTable?.friendly_num}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Name Number : </Text>
                <Text style={styles.textstyle}>{NumTable?.name_number}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Neutral number : </Text>
                <Text style={styles.textstyle}>{NumTable?.neutral_num}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Radical number : </Text>
                <Text style={styles.textstyle}>{NumTable?.radical_number}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>Redical Ruler : </Text>
                <Text style={styles.textstyle}>{NumTable?.radical_ruler}</Text>
            </View>
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.03 }}>

            </View>

        </ScrollView>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    NumTable: state.kundli.NumTable,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyTable);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    },
    CONTIANER: {
        flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1
    }
})