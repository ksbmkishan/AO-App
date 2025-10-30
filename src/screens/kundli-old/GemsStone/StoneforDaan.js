import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const StoneforDaan = ({ basicDetails, dispatch, DaanStoneData }) => {
    console.log("DaanStoneData", DaanStoneData)

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getDAANStone(payload))
    }, [dispatch])
    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>

            <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, gap: 10 }}>

                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>{DaanStoneData?.heading}</Text>

                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>Stone for Daan  :  {DaanStoneData?.stone}</Text>
            </View>
            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>
                {DaanStoneData?.resp}
            </Text>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    DaanStoneData: state.kundli.DaanStoneData,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(StoneforDaan);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})