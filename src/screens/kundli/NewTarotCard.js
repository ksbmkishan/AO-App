import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import MyHeader from '../../components/MyHeader'
import { useNavigation } from '@react-navigation/native'
import { FontsStyle, normalize } from '../../config/constants'
import tarotData from "../../assets/tarot_cards.json";
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next';
const NewTarotCard = ({ route, basicDetails, dispatch, kundliId }) => {
    const navigation = useNavigation();
    console.log("basicDetailskk", basicDetails);

    const {t} = useTranslation();


    useEffect(() => {

        dispatch(KundliActions.getKundliData(kundliId))
    }, [dispatch, kundliId]);

    const [card, setCard] = useState(null);

    useEffect(() => {
        if (tarotData && Object.keys(tarotData).length > 0) {
            const lang = t('lang'); // 'en' या 'hi'
            const tarotList = tarotData[lang];
            if (!tarotList || tarotList.length === 0) return;

            const randomIndex = Math.floor(Math.random() * tarotList.length);
            const selected = tarotList[randomIndex];

            let decision = "Maybe";
            const resultLower = selected.result.toLowerCase();

            if (positiveKeywords.some(word => resultLower.includes(word))) {
                decision = lang === 'hi' ? "हाँ ✅" : "Yes ✅";
            } else if (negativeKeywords.some(word => resultLower.includes(word))) {
                decision = lang === 'hi' ? "नहीं ❌" : "No ❌";
            }

            setCard({ ...selected, decision });
        }
    }, [tarotData, t]);


    const positiveKeywords = ["joy", "success", "new", "hope", "love", "harmony", "abundance", "power", "growth", "inspiration"];
    const negativeKeywords = ["fear", "loss", "conflict", "chaos", "restriction", "end", "death", "addiction", "betrayal", "deception"];

    return (
        <View style={{ backgroundColor: '#F8E8D9', flex: 1 }}>
            <MyHeader title={"TAROT"} navigation={navigation} />
            <View style={{ elevation: 1, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, overflow: "hidden", marginVertical: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: Colors.background_theme1 }}>
                    <Text style={{ ...FontsStyle.fontfamily, color: "white", fontSize:  normalize(16) }}>{t("Tarot Card")}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>{t("Card Direction")}</Text>
                    <Text style={styles.textstyle}>{card?.direction}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>{t("Card Name")} </Text>
                    <Text style={styles.textstyle}>{card?.name}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>{t("Card Number")}</Text>
                    <Text style={styles.textstyle}>{card?.number}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>{t("Card Result")}:</Text>
                    <Text style={styles.textstyle}>{card?.result}</Text>
                </View>
                 <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={styles.textstyle}>{t("Card Response")}:</Text>
                    <Text style={styles.textstyle}>{card?.decision}</Text>
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
    kundliId: state.kundli.kundliId,
    kundliListData: state.kundli.kundliListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NewTarotCard);

const styles = StyleSheet.create({

    textstyle: {
        ...FontsStyle.font, fontSize: normalize(15),
        width: SCREEN_WIDTH * 0.4
    }
})