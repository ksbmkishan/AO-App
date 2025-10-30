import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import MyHeader from '../../components/MyHeader'
import { useNavigation } from '@react-navigation/native'

const NewTarotCard = ({ route, basicDetails, dispatch, Tarrotcarddata }) => {
    console.log("Tarrotcarddata", Tarrotcarddata)
    const navigation = useNavigation()
    console.log("basicDetailskk", basicDetails)
    const { kundliId } = route.params || {};
    console.log("kundliidtarot", kundliId)
    useEffect(() => {
        if (typeof route?.params?.type == 'undefined') {
            dispatch(KundliActions.getKundliData(route?.params?.kundliId))
        }
        return () => {
            dispatch(KundliActions.resetKundliData())
        }
    }, [dispatch]);

    useEffect(() => {
        const payload = {

            lat: basicDetails?.lat,
            lon: basicDetails?.lon

        }
        console.log(payload, 'payload')
        dispatch(KundliActions.getTarrortCard(payload))
    }, [dispatch])

     const [card, setCard] = useState({
    direction: "Upright",
    name: "The Fool",
    number: 0,
    result: "New beginnings, spontaneity, and free spirit",
  });

    return (
        <View style={{ backgroundColor: '#F8E8D9', flex: 1 }}>
            <MyHeader title={"TAROT"} navigation={navigation} />
            <View style={{ elevation: 1, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, overflow: "hidden", marginVertical: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: "#AB0001" }}>
                    <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>Tarot Card</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5) }}>Card Direction</Text>
                    <Text style={styles.textstyle}>{card.direction}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>Card Name </Text>
                    <Text style={styles.textstyle}>{Tarrotcarddata?.card_name}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>Card Number</Text>
                    <Text style={styles.textstyle}>{Tarrotcarddata?.card_number}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>Card Result</Text>
                    <Text style={styles.textstyle}>{Tarrotcarddata?.card_result}</Text>
                </View>



            </View>
        </View>
    )
}
const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Tarrotcarddata: state.kundli.Tarrotcarddata,
    isLoading: state.setting.isLoading,
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    isLoading: state.setting.isLoading,

    kundliListData: state.kundli.kundliListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NewTarotCard);

const styles = StyleSheet.create({

    textstyle: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    }
})