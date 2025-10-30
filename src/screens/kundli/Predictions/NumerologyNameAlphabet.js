import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../../config/Screen'
import { Fonts } from '../../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { t } from 'i18next'
import { FontsStyle, normalize } from '../../../config/constants'

const NumerologyNameAlphabet = ({ basicDetails, dispatch, getNamenumerology, Pythagorusnamenum }) => {
    console.log("getNamenumerology", getNamenumerology)
    console.log("Pythagorusnamenum", Pythagorusnamenum)
    useEffect(() => {
        const payload = {
            lang: t('lang'),


        }
        dispatch(KundliActions.getKundliBirthDetails(payload))
    }, [dispatch])

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
            system: "Chaldean"

        }
        console.log("Mahadev", payload)
        dispatch(KundliActions.getNamenumerology(payload))
    }, [dispatch])


    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
            system: "Pythagorean"

        }
        console.log("Mahadev", payload)
        dispatch(KundliActions.getNamenumerologypythgorus(payload))
    }, [dispatch])









    return (
        <View style={{  flex:1,padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9', alignItems: "center", gap: SCREEN_HEIGHT * 0.02 }}>

            {/* Chaldean Section */}
            <View style={{ alignSelf: 'flex-start' }}>
                <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(16), color: '#000', marginBottom: 4 }}>
                    {t("Chaldean Name Number")}
                </Text>
                <Text style={{ color: '#000', marginBottom: 8,...FontsStyle.font,fontSize: normalize(15), }}>
                    {t("Chaldean system uses numbers 1 to 8 (excluding 9) and is believed to be more spiritually accurate. It assigns values based on sound vibrations and is commonly used in India and the Middle East.")}
                </Text>

                <Text style={{  color: '#000',...FontsStyle.font,fontSize: normalize(15), }}>
                    • {t("Total")}: {getNamenumerology?.data?.total ?? '-'}
                </Text>
                <Text style={{ color: '#000',...FontsStyle.font ,fontSize: normalize(15),}}>
                    • {("Reduced")}: {getNamenumerology?.data?.reduced ?? '-'}
                </Text>
            </View>

            {/* Pythagorean Section */}
            <View style={{ alignSelf: 'flex-start', marginTop: SCREEN_HEIGHT * 0.03 }}>
                <Text style={{ ...FontsStyle.fontBold,  color: '#000', marginBottom: 4,fontSize: normalize(16), }}>
                    {t("Pythagorean Name Number")}
                </Text>
                <Text style={{  color: '#000', marginBottom: 8,...FontsStyle.font ,fontSize: normalize(15),}}>
                    {t("Pythagorean numerology is more widely used in the West. It assigns numbers from 1 to 9 to letters in a linear fashion and focuses on the mathematical vibration of names.")}
                </Text>

                <Text style={{  color: '#000',...FontsStyle.font,fontSize: normalize(15), }}>
                    • {t("Total")}: {Pythagorusnamenum?.data?.total ?? '-'}
                </Text>
                <Text style={{  color: '#000',...FontsStyle.font,fontSize: normalize(15), }}>
                    • {t("Reduced")}: {Pythagorusnamenum?.data?.reduced ?? '-'}
                </Text>
            </View>

        </View>

    )
}

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Numdaypridiction: state.kundli.Numdaypridiction,
    isLoading: state.setting.isLoading,
    getNamenumerology: state.kundli.getNamenumerology,
    Pythagorusnamenum: state.kundli.Pythagorusnamenum,

});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyNameAlphabet);

const styles = StyleSheet.create({
    heading: {
        ...FontsStyle.font,
        fontSize: normalize(16),
        marginBottom: 10
    },
    letter: {
        ...FontsStyle.fontBold,
        fontSize: normalize(16),
       
    },
    prediction: {
        ...FontsStyle.font,
        fontSize: normalize(16),
        textAlign: 'justify'
    }
})
