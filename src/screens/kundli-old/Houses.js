import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

const Houses = ({ basicDetails, dispatch, HousesData }) => {
    console.log("HousesData", HousesData)
    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getHousesData(payload))
    }, [dispatch])


    console.log('shreeraam', basicDetails)
    const renderitem = ({ item }) => {
        return (
            <View style={{ elevation: 1, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, overflow: "hidden", marginVertical: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "#AB0001" }}>
                    <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>House : {item?.no}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5) }}>Start Sign</Text>
                    <Text style={styles.textstyle}>{item?.start_sign}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>start Dec </Text>
                    <Text style={styles.textstyle}>{item?.start_dec}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>Mid sign</Text>
                    <Text style={styles.textstyle}>{item?.mid_sign}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>Mid</Text>
                    <Text style={styles.textstyle}>{item?.mid}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>Mid Dec</Text>
                    <Text style={styles.textstyle}>{item?.mid_dec}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>End Sign</Text>
                    <Text style={styles.textstyle}>{item?.end_sign}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>End</Text>
                    <Text style={styles.textstyle}>{item?.end}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>End Dec</Text>
                    <Text style={styles.textstyle}>{item?.end_dec}</Text>
                </View>


            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>



            <FlatList
                data={HousesData}
                renderItem={renderitem} />
        </View>
    )
}



const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    HousesData: state.kundli.HousesData,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Houses);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})