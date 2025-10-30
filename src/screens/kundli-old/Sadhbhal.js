import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

const Sadhbhal = ({ basicDetails, dispatch, sadhbhalData }) => {

    console.log(sadhbhalData, "sadhbhalData")

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getShdbhal(payload))
    }, [dispatch])
    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>



            <View style={[styles.CONTIANER, { backgroundColor: "#AB0001", borderBottomWidth: 0, borderRadius: 10 }]}>
                <Text style={[styles.textstyle, { color: "white", fontSize: 17 }]}>Shadbal </Text>
                <Text style={[styles.textstyle, { color: "white", fontSize: 17 }]}>Degree </Text>

            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>1 </Text>
                <Text style={styles.textstyle}>{sadhbhalData?.data?.[1]}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>2 </Text>
                <Text style={styles.textstyle}>{sadhbhalData?.data?.[2]}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>3 </Text>
                <Text style={styles.textstyle}>{sadhbhalData?.data?.[3]}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>4 </Text>
                <Text style={styles.textstyle}>{sadhbhalData?.data?.[4]}</Text>
            </View>
            <View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>5 </Text>
                <Text style={styles.textstyle}>{sadhbhalData?.data?.[5]}</Text>
            </View><View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>6 </Text>
                <Text style={styles.textstyle}>{sadhbhalData?.data?.[6]}</Text>
            </View><View style={styles.CONTIANER}>
                <Text style={styles.textstyle}>7 </Text>
                <Text style={styles.textstyle}>{sadhbhalData?.data?.[7]}</Text>
            </View>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    sadhbhalData: state.kundli.sadhbhalData,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Sadhbhal);

const styles = StyleSheet.create({


    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    },
    CONTIANER: {
        flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1
    }
})