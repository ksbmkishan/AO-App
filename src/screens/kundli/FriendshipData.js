import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { colors } from '../../config/Constants1'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import TranslateText from '../language/TranslateText'
import MyLoader from '../../components/MyLoader'
import { FontsStyle } from '../../config/constants'

const FriendshipData = ({ basicDetails, dispatch, MyFriendData, isLoading }) => {

    console.log("Prrrrrrr", MyFriendData?.fivefoldTable?.[0]?.relationList?.[1]?.relation?.charAt(0))
    console.log("Prrrrrrr", MyFriendData)

    console.log("PPPPPP", basicDetails)


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
        dispatch(KundliActions.getFriendshipData(payload))
    }, [dispatch])




    return (
        <View style={{ flex: 1, gap: SCREEN_HEIGHT * 0.02, paddingVertical: SCREEN_HEIGHT * 0.02, marginHorizontal: SCREEN_WIDTH * 0.02 }}>


            <View style={{}}>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, backgroundColor: colors.background_theme2, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Text style={{ color: colors.white_color }}>{t('Five Fold Friendship')}</Text>
                </View>

                <View style={{ borderLeftWidth: 0.5, borderRightWidth: 0.5, borderBottomWidth: 0.5, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingBottom: SCREEN_HEIGHT * 0.01, borderColor: colors.background_theme2 }}>

                    <View style={{ flexDirection: "row", gap: 13, justifyContent: "space-between", paddingLeft: SCREEN_WIDTH * 0.2, borderBottomWidth: 1, paddingVertical: SCREEN_HEIGHT * 0.01 }}>

                        <Text style={styles.heading}>{t('SU')}</Text>
                        <Text style={styles.heading}>{t('MO')}</Text>
                        <Text style={styles.heading}>{t('MA')}</Text>
                        <Text style={styles.heading}>{t('ME')}</Text>
                        <Text style={styles.heading}>{t('JU')}</Text>
                        <Text style={styles.heading}>{t('VE')}</Text>
                        <Text style={styles.heading}>{t('SA')}</Text>

                    </View>



                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.01 }}>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>

                            <Text style={styles.heading}>{t('Sun')}</Text>
                            <Text style={styles.heading}>{t('Moon')}</Text>
                            <Text style={styles.heading}>{t('Mars')}</Text>
                            <Text style={styles.heading}>{t('Mercury')}</Text>
                            <Text style={styles.heading}>{t('Jupiter')}</Text>
                            <Text style={styles.heading}>{t('Venus')}</Text>
                            <Text style={styles.heading}>{t('Saturn')}</Text>

                        </View>


                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[0]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.fivefoldTable[1]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[2]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[3]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[4]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[5]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[6]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[0]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.fivefoldTable[1]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[2]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[3]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[4]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[5]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[6]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[0]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.fivefoldTable[1]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[2]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[3]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[4]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[5]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[6]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[0]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.fivefoldTable[1]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[2]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[3]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[4]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[5]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[6]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[0]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.fivefoldTable[1]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[2]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[3]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[4]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[5]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[6]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[0]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.fivefoldTable[1]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[2]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[3]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[4]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[5]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[6]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[0]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.fivefoldTable[1]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[2]?.relationList?.[6]?.relation.charAt(0)}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[3]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[4]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[5]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.fivefoldTable[6]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                        </View>


                    </View>

                </View>














            </View>




            <View style={{}}>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, backgroundColor: colors.background_theme2, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Text style={{ color: colors.white_color }}> {t('Permanent Friendship')}</Text>
                </View>

                <View style={{ borderLeftWidth: 0.5, borderRightWidth: 0.5, borderBottomWidth: 0.5, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingBottom: SCREEN_HEIGHT * 0.01, borderColor: colors.background_theme2 }}>

                    <View style={{ flexDirection: "row", gap: 13, justifyContent: "space-between", paddingLeft: SCREEN_WIDTH * 0.2, borderBottomWidth: 1, paddingVertical: SCREEN_HEIGHT * 0.01 }}>

                        <Text style={styles.heading}>{t('SU')}</Text>
                        <Text style={styles.heading}>{t('MO')}</Text>
                        <Text style={styles.heading}>{t('MA')}</Text>
                        <Text style={styles.heading}>{t('ME')}</Text>
                        <Text style={styles.heading}>{t('JU')}</Text>
                        <Text style={styles.heading}>{t('VE')}</Text>
                        <Text style={styles.heading}>{t('SA')}</Text>

                    </View>



                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.01 }}>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.heading}>{t('Sun')}</Text>
                            <Text style={styles.heading}>{t('Moon')}</Text>
                            <Text style={styles.heading}>{t('Mars')}</Text>
                            <Text style={styles.heading}>{t('Mercury')}</Text>
                            <Text style={styles.heading}>{t('Jupiter')}</Text>
                            <Text style={styles.heading}>{t('Venus')}</Text>
                            <Text style={styles.heading}>{t('Saturn')}</Text>
                        </View>


                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[0]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.permanentFriedshipTable[1]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[2]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[3]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[4]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[5]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[6]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[0]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.permanentFriedshipTable[1]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[2]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[3]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[4]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[5]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[6]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[0]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.permanentFriedshipTable[1]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[2]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[3]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[4]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[5]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[6]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[0]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.permanentFriedshipTable[1]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[2]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[3]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[4]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[5]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[6]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[0]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.permanentFriedshipTable[1]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[2]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[3]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[4]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[5]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[6]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[0]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.permanentFriedshipTable[1]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[2]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[3]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[4]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[5]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[6]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[0]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.permanentFriedshipTable[1]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[2]?.relationList?.[6]?.relation.charAt(0)}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[3]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[4]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[5]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.permanentFriedshipTable[6]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                        </View>


                    </View>

                </View>














            </View>



            <View style={{}}>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.03, backgroundColor: colors.background_theme2, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Text style={{ color: colors.white_color }}> {t('Temporal Friendship')}</Text>
                </View>

                <View style={{ borderLeftWidth: 0.5, borderRightWidth: 0.5, borderBottomWidth: 0.5, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingBottom: SCREEN_HEIGHT * 0.01, borderColor: colors.background_theme2 }}>

                    <View style={{ flexDirection: "row", gap: 13, justifyContent: "space-between", paddingLeft: SCREEN_WIDTH * 0.2, borderBottomWidth: 1, paddingVertical: SCREEN_HEIGHT * 0.01 }}>

                        <Text style={styles.heading}>{t('SU')}</Text>
                        <Text style={styles.heading}>{t('MO')}</Text>
                        <Text style={styles.heading}>{t('MA')}</Text>
                        <Text style={styles.heading}>{t('ME')}</Text>
                        <Text style={styles.heading}>{t('JU')}</Text>
                        <Text style={styles.heading}>{t('VE')}</Text>
                        <Text style={styles.heading}>{t('SA')}</Text>
                    </View>



                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.01 }}>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.heading}>{t('Sun')}</Text>
                            <Text style={styles.heading}>{t('Moon')}</Text>
                            <Text style={styles.heading}>{t('Mars')}</Text>
                            <Text style={styles.heading}>{t('Mercury')}</Text>
                            <Text style={styles.heading}>{t('Jupiter')}</Text>
                            <Text style={styles.heading}>{t('Venus')}</Text>
                            <Text style={styles.heading}>{t('Saturn')}</Text>
                        </View>


                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[0]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.temporalFriedshipTable[1]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[2]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[3]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[4]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[5]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[6]?.relationList?.[0]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[0]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.temporalFriedshipTable[1]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[2]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[3]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[4]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[5]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[6]?.relationList?.[1]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[0]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.temporalFriedshipTable[1]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[2]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[3]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[4]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[5]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[6]?.relationList?.[2]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[0]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.temporalFriedshipTable[1]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[2]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[3]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[4]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[5]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[6]?.relationList?.[3]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[0]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.temporalFriedshipTable[1]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[2]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[3]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[4]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[5]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[6]?.relationList?.[4]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[0]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.temporalFriedshipTable[1]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[2]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[3]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[4]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[5]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[6]?.relationList?.[5]?.relation.charAt(0) || '-'}</Text>
                        </View>

                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.03 }}>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[0]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days} >{MyFriendData?.temporalFriedshipTable[1]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[2]?.relationList?.[6]?.relation.charAt(0)}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[3]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[4]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[5]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                            <Text style={styles.Days}>{MyFriendData?.temporalFriedshipTable[6]?.relationList?.[6]?.relation.charAt(0) || '-'}</Text>
                        </View>


                    </View>

                </View>














            </View>


            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, gap: 10 }}>
                <Text style={{ ...FontsStyle.font,fontWeight:'bold', fontSize: responsiveFontSize(2), paddingHorizontal: SCREEN_WIDTH * 0.01 }}>
                    {t('Info*')}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={styles.Days}> {t('B  Bitter')}</Text>
                    <Text style={styles.Days}> {t('E  Enemy')}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={styles.Days}> {t('N  Neutral')}</Text>
                    <Text style={styles.Days}> {t('F  Friend')}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={styles.Days}> {t('I  Intimate')}</Text>
                    <Text style={styles.Days}> {t('-  Nothing')}</Text>
                </View>
            </View>


        </View>
    )
}




const mapStateToProps = state => ({

    isLoading: state.setting.isLoading,

    basicDetails: state.kundli.basicDetails,

    MyFriendData: state.kundli.MyFriendData,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(FriendshipData);

const styles = StyleSheet.create({

    suMoon: {
        ...FontsStyle.font,
        fontSize: responsiveFontSize(1.5)
    },
    Hedertxt: {
        ...FontsStyle.font,
        fontSize: responsiveFontSize(1.7),

    },
    Days: {
        ...FontsStyle.font,
    },
    heading: {
        ...FontsStyle.font,

        color: "red"
    }
})