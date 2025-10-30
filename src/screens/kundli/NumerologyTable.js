import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { colors } from '../../config/Constants1'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import TranslateText from '../language/TranslateText'
import { FontsStyle, normalize } from '../../config/constants'

const Numerology2 = ({ basicDetails, dispatch, Mynum2 }) => {

    console.log("Mynum2", Mynum2)

    const { t } = useTranslation();

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place

        }
        console.log("Mahadev", payload)
        dispatch(KundliActions.getMyNumerology(payload))
    }, [dispatch])


    const friendlyNumbers = Mynum2?.numerlogy?.details?.friendlyNumbers;
    const enemyNumbers = Mynum2?.numerlogy?.details?.enemyNumbers;
    const neutralNumbers = Mynum2?.numerlogy?.details?.neutralNumbers;

    const favcolor = Mynum2?.numerlogy?.details?.favourablecolor
    const favmetal = Mynum2?.numerlogy?.details?.favourableMetal
    const favdirection = Mynum2?.numerlogy?.details?.favourabledirection
    const favthings = Mynum2?.numerlogy?.details?.favourableThings?.slice(0, 3);
    const favdays = Mynum2?.numerlogy?.details?.favourableDays

    const formatNumbers = (numbers) => {
        return Array.isArray(numbers)
            ? numbers.join(",")
            : numbers?.split(" ").join(",");
    };


    return (
        <View style={{ flex: 1, overflow: "hidden", backgroundColor: '#F8E8D9' }}>

            {/* 
            <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  {basicDetails?.name} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> {basicDetails?.place} /></Text>
            </View> */}


            {/* {Top()} */}
            {Content()}

        </View>
    )

    function Top() {
        return (

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: SCREEN_WIDTH * 0.1,
                    elevation: 1,
                    paddingVertical: SCREEN_HEIGHT * 0.02,
                    backgroundColor: colors.background_theme2,
                    borderRadius: 10,
                    top: 10,
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Text style={{ ...FontsStyle.font, fontSize: 20, color: colors.white_color }}>
                        {Mynum2?.numerlogy?.radicalNumber?.toString()}
                    </Text>
                    <Text style={{ ...FontsStyle.font, color: colors.white_color }}>
                        "Radical"
                    </Text>
                    <Text style={{ ...FontsStyle.font, color: colors.white_color }}>
                        "Number" 
                    </Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ ...FontsStyle.font, fontSize: 20, color: colors.white_color }}>
                        {Mynum2?.numerlogy?.destinyNumber?.toString()} 
                    </Text>
                    <Text style={{ ...FontsStyle.font, color: colors.white_color }}>
                        "Destiny"
                    </Text>
                    <Text style={{ ...FontsStyle.font, color: colors.white_color }}>
                        "Number"
                    </Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ ...FontsStyle.font, fontSize: 20, color: colors.white_color }}>
                        {Mynum2?.numerlogy?.nameNumber?.toString()} 
                    </Text>
                    <Text style={{ ...FontsStyle.font, color: colors.white_color }}>
                        "Name" 
                    </Text>
                    <Text style={{ ...FontsStyle.font, color: colors.white_color }}>
                        "Number" 
                    </Text>
                </View>
            </View>


        )
    }

    function Content() {
        return (

            <ScrollView style={{ paddingTop: SCREEN_HEIGHT * 0.035 }}>
                <View
                    style={{
                        borderWidth: 0.5,
                        paddingHorizontal: SCREEN_WIDTH * 0.02,
                        paddingVertical: SCREEN_HEIGHT * 0.02,
                        borderRadius: 10,
                    }}
                >
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Owner")}
                        </Text>
                        <Text style={styles.textown}>
                            {Mynum2?.numerlogy?.details?.owner}
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Name")} 
                        </Text>
                        <Text style={styles.textown}>
                            {basicDetails?.name} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Birth Date")} 
                        </Text>
                        <Text style={styles.textown}>
                            <TranslateText
                                title={
                                    basicDetails?.dob
                                        ? new Date(basicDetails.dob).toLocaleDateString('en-GB')
                                        : ''
                                }
                            />
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Friendly Numbers")} 
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(friendlyNumbers)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Evil Numbers")} 
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(enemyNumbers)}
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Neutral Numbers")}
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(neutralNumbers)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                           {t("Favourable Numbers" )}
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(friendlyNumbers)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Favourable Metal")} 
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(favmetal)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Favourable Color" )}
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(favcolor)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Favourable Things")}
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(favthings)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Favourable Direction")}
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(favdirection)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Grains")}
                        </Text>
                        <Text style={styles.textown}>
                            {Mynum2?.numerlogy?.details?.grains} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Substance")}
                        </Text>
                        <Text style={styles.textown}>
                            {Mynum2?.numerlogy?.details?.substance} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Stone")}
                        </Text>
                        <Text style={styles.textown}>
                            {Mynum2?.numerlogy?.details?.stone} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Sub Stone")}
                        </Text>
                        <Text style={styles.textown}>
                            {Mynum2?.numerlogy?.details?.subStone} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Herb")} 
                        </Text>
                        <Text style={styles.textown}>
                            {Mynum2?.numerlogy?.details?.herb} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Favourable Days" )}
                        </Text>
                        <Text style={styles.textown}>
                            {formatNumbers(favdays)} 
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Favourable Mantra")} 
                        </Text>
                        <Text style={styles.textown}>
                            <TranslateText
                                title={
                                    Mynum2?.numerlogy?.details?.favourableMantra
                                        
                                }
                            />
                        </Text>
                    </View>
                    <View style={styles.ROWE}>
                        <Text style={[styles.textown, { color: '#026135' }]}>
                            {t("Jap Number")}
                        </Text>
                        <Text style={styles.textown}>
                            {Mynum2?.numerlogy?.details?.japnumber} 
                        </Text>
                    </View>
                </View>
            </ScrollView>


        )
    }

}

const mapStateToProps = state => ({

    isLoading: state.setting.isLoading,

    basicDetails: state.kundli.basicDetails,
    Mynum2: state.kundli.Mynum2,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(Numerology2);

const styles = StyleSheet.create({
    textown: {
        ...FontsStyle.fontBold,
        fontSize: normalize(15),
       width:SCREEN_WIDTH * 0.4
    },
    ROWE: {
        flexDirection: "row", justifyContent: "space-between",
        paddingVertical: SCREEN_HEIGHT * 0.02,
        borderBottomWidth: 1,
        
    },
    Hedertxt: {
        ...FontsStyle.font,
        fontSize: normalize(15),
      

    }
})