import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { colors } from '../../config/Constants1'
import moment from 'moment';
import TranslateText from '../language/TranslateText'

const UpGrahaPlanet = ({ basicDetails, dispatch, UPgrahadata }) => {

    console.log("dah", UPgrahadata)

    const { t } = useTranslation();

    useEffect(() => {
        const payload = {
            lang: t('lang'),


        }
        dispatch(KundliActions.getKundliBirthDetails(payload))
    }, [dispatch])

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

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place

        }
        console.log("Mahadev", payload)
        dispatch(KundliActions.getUpgraha(payload))
    }, [dispatch])


    const renderItem = ({ item }) => {
        return (
            <View style={styles.Container}>
                <Text style={[styles.texthhh, { color: 'red',  }]}> <TranslateText title={item?.name}/></Text>
                <Text style={styles.texthhh}>{item?.degree}</Text>
                <Text style={[styles.texthhh, { color: 'purple',  }]}><TranslateText title={item?.rashi}/></Text>
                <Text style={styles.texthhh}>
    <TranslateText title={`House ${item?.house}`} />
</Text>

            </View>
        )
    }

    return (
        <View style={{ paddingTop: SCREEN_HEIGHT * 0.02 }}>

<View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
            </View>

            <FlatList
                data={UPgrahadata}
                renderItem={renderItem}
            />

        </View>
    )
}



const mapStateToProps = state => ({

    isLoading: state.setting.isLoading,

    basicDetails: state.kundli.basicDetails,

    UPgrahadata: state.kundli.UPgrahadata,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(UpGrahaPlanet);

const styles = StyleSheet.create({
    Container:
    {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        elevation: 1,
        paddingVertical: SCREEN_HEIGHT * 0.023,
        borderRadius: 10, marginVertical: SCREEN_HEIGHT * 0.01,
        backgroundColor:colors.mybackground
    },
    texthhh: {
        ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7)
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),

    }
})