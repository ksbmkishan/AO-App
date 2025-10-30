import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const NumeroogyDestination = ({ basicDetails, dispatch, MyDestination }) => {
    console.log("MyDestination", MyDestination)

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getDestinationNum(payload))
    }, [dispatch])
    return (
        <View style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>

            <View>
               
                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>Your Destiny Number reveals your life’s greater purpose — a guiding force behind your actions. It shapes your path, showing what you're meant to achieve in this lifetime</Text>
            </View>
            <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.8), textAlign: "justify",alignSelf:"center" }}>Today's Numerlogy Destination Number is </Text>
            <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(3), textAlign: "justify" ,alignSelf:"center",marginVertical:SCREEN_HEIGHT*0.03 ,color:"#AB0001"}}>{MyDestination?.destiny_number}</Text>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    MyDestination: state.kundli.MyDestination,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumeroogyDestination);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})