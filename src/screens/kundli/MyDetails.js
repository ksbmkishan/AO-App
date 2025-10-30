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


const MyDetails = ({ basicDetails, dispatch, Dhasambhav }) => {
    const { t } = useTranslation();
    console.log("jjk", basicDetails)

    useEffect(() => {
        const payload = { lang: t('lang') };
        console.log("jhjjk",payload)
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch]);


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

    return (
        <View>
            <Text>MyDetails</Text>
        </View>
    )
}



const mapStateToProps = state => ({

    isLoading: state.setting.isLoading,

    basicDetails: state.kundli.basicDetails,

    Dhasambhav: state.kundli.Dhasambhav,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(MyDetails)


const styles = StyleSheet.create({})
