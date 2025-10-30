import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { colors } from '../../config/Constants1'
import moment from 'moment'
import TranslateText from '../language/TranslateText'

const Dhasambhavmadhya = ({ basicDetails, dispatch, Dhasambhav }) => {

    console.log("jhjk.yhil", Dhasambhav)

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
        dispatch(KundliActions.getDashammadhya(payload))
    }, [dispatch])


    const renderItem = ({ item }) => {
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: SCREEN_HEIGHT * 0.015,
                paddingHorizontal: SCREEN_WIDTH * 0.02,
                borderBottomWidth: 1,
                paddingBottom: SCREEN_HEIGHT * 0.015,
                paddingTop: SCREEN_HEIGHT * 0.015
            }}>
                <View style={{ width: SCREEN_WIDTH * 0.1, alignItems: "center" }}>
                    <Text style={[styles.normalizeText, { color: 'red' }]}>
                        <TranslateText title={item?.house} />
                    </Text>
                </View>
                <View style={{ flexDirection: "row", gap: SCREEN_WIDTH * 0.25 }}>
                    <View style={{ alignItems: "center", gap: 10 }}>
                        <Text style={styles.normalizeText}>
                            <TranslateText title={item?.madhyaRashi} />
                        </Text>
                        <Text style={styles.normalizeText}>
                            {item?.madhyaDegree}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", gap: 10 }}>
                        <Text style={styles.normalizeText}>
                            <TranslateText title={item?.sandhiRashi} />
                        </Text>
                        <Text style={styles.normalizeText}>
                            {item?.sandhiDegree}
                        </Text>
                    </View>
                </View>
            </View>
            
        )
    }


    return (

        <View style={{ flex: 1 }}>

            <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
            </View>



            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.025, paddingHorizontal: SCREEN_WIDTH * 0.02, borderRadius: 10, backgroundColor: colors.mybackground }}>

                <View style={{flexDirection:'row',gap:SCREEN_WIDTH*0.25 }}>
                    <Text style={[styles.HeadingText, { color: 'red' }]}>
                        <TranslateText title={'House'} />
                    </Text>

                    <View style={{ flexDirection: "row", gap: SCREEN_WIDTH * 0.3 }}>
                        <Text style={styles.HeadingText}>
                            <TranslateText title={'Bhav Madhya'} />
                        </Text>
                        <Text style={styles.HeadingText}>
                            <TranslateText title={'Bhav Sandhi'} />
                        </Text>
                    </View>
                </View>


                <FlatList data={Dhasambhav}
                    renderItem={renderItem} />



            </View>
            
        </View>
    )
}



const mapStateToProps = state => ({

    isLoading: state.setting.isLoading,

    basicDetails: state.kundli.basicDetails,

    Dhasambhav: state.kundli.Dhasambhav,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(Dhasambhavmadhya)

const styles = StyleSheet.create({
    HeadingText: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2)
    },

    normalizeText: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5)
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),

    }
})