import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { colors } from '../../../config/Constants1';
import ChartSvg from './ChartSvg';
import moment from 'moment';
import TranslateText from '../../language/TranslateText';
import MyLoader from '../../../components/MyLoader';
import Loader from '../../../components/Loader';

const DwadasmanshaChart = ({ basicDetails, dispatch, DwadasmanshaChart, isLoading }) => {

    console.log("arpit", DwadasmanshaChart)

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
        dispatch(KundliActions.getDwadasmanshaChart(payload))
    }, [dispatch])

    if (isLoading || !DwadasmanshaChart) {
              return <Loader />;
          }

    return (
        <View>
           {/* <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
            </View> */}

            <View style={{paddingVertical:SCREEN_HEIGHT*0.03}}>
                <ChartSvg data={DwadasmanshaChart} />
            </View>

        </View>
    )
}




const mapStateToProps = state => ({

    isLoading: state.setting.isLoading,

    basicDetails: state.kundli.basicDetails,

    DwadasmanshaChart: state.kundli.DwadasmanshaChart,




})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(DwadasmanshaChart);

const styles = StyleSheet.create({

    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),

    }
})