import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { colors } from '../../config/Constants1'
import moment from 'moment'
import TranslateText from '../language/TranslateText'

const AstroDetailes = ({ basicDetails, dispatch, myAstrokundli }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString().slice(-2);

        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? ("0" + hours).slice(-2) : 12;

        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    };

    console.log("gjhgjkhj", myAstrokundli)

    console.log("HARIRAAMRAAM", basicDetails)

    const { t } = useTranslation();

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
            place: basicDetails?.place

        }
        console.log("Mahadev", payload)
        dispatch(KundliActions.getAstroData(payload))
    }, [dispatch])





    return (
        <View style={{ flex: 1, paddingTop: SCREEN_HEIGHT * 0.02 }}>

            <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
            </View>


            <View style={{ elevation: 5, backgroundColor: "white", paddingVertical: SCREEN_HEIGHT * 0.015, paddingHorizontal: SCREEN_WIDTH * 0.025, borderRadius: 10 }}>
                <View style={styles.row}>
                    <Text style={styles.Textrow}> <TranslateText title={'Ascendant'} /></Text>
                    <Text style={styles.Textrow}> <TranslateText title={myAstrokundli?.ascendant} /></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.Textrow}> <TranslateText title={'Sign'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.sign} /></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.Textrow}> <TranslateText title={'Sign Lord'} /></Text>
                    <Text style={styles.Textrow}> <TranslateText title={myAstrokundli?.signLord} /></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Nakshatra'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.naksahtra} /></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Nakshatra Lord '} /> </Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.nakshatraLord} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}>
                        <TranslateText title={'Charan'} />
                    </Text>
                    <Text style={styles.Textrow}>
                        <TranslateText title={myAstrokundli?.charan} />
                    </Text>
                </View>


                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Karan'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.karan?.name} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Yog'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.yog?.name} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Varna'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.varna} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Vashya'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.vashya} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Yoni'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.yoni} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Gana'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.gana} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Paya'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.paya} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Nadi'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.nadi} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Yunja'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.yunja} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Tatva'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.tatva} /></Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.Textrow}><TranslateText title={'Name Alphabet (English)'} /></Text>
                    <Text style={styles.Textrow}><TranslateText title={myAstrokundli?.nameAlphabetEnglish} /></Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                    , paddingVertical: SCREEN_HEIGHT * 0.02,
                    paddingHorizontal: SCREEN_WIDTH * 0.02,

                }}>
                    <Text style={styles.Textrow}>Name Alphabet  (Hindi)</Text>
                    <Text style={styles.Textrow}>{myAstrokundli?.nameAlphabetHindi}</Text>
                </View>

            </View>





        </View>
    )
}



const mapStateToProps = state => ({

    isLoading: state.setting.isLoading,

    basicDetails: state.kundli.basicDetails,

    myAstrokundli: state.kundli.myAstrokundli,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(AstroDetailes);


const styles = StyleSheet.create({
    Textrow: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7)
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
        , paddingVertical: SCREEN_HEIGHT * 0.025,
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        borderBottomWidth: 0.5
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),

    }
})
