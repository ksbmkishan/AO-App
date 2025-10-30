import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import KpBirthSvg from '../components/KpBirthSvg';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../../../config/Constants1';
import TranslateText from '../../language/TranslateText';
import MyLoader from '../../../components/MyLoader'; // ✅ Import loader
import { FontsStyle } from '../../../config/constants';

const KpBirthChart = ({ basicDetails, dispatch, kpBirthChart, isLoading }) => {

    const { t } = useTranslation();

    useEffect(() => {
        const payload1 = {
            lang: t('lang'),
        };
        dispatch(KundliActions.getKundliBirthDetails(payload1));

        const payload2 = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
        };
        dispatch(KundliActions.getBirthChart(payload2));
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>

            {isLoading || !kpBirthChart?.chart?.length ? (
                <MyLoader /> // ✅ Loader while data is loading
            ) : (
                <>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <KpBirthSvg data={kpBirthChart} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
                        <Text style={{ ...FontsStyle.font, fontSize: responsiveFontSize(1.8) }}>
                            <TranslateText title={'* Retrograde'} />
                        </Text>
                        <Text style={{ ...FontsStyle.font, fontSize: responsiveFontSize(1.8) }}>
                            <TranslateText title={' ~ Combust '} />
                        </Text>
                    </View>
                </>
            )}
        </View>
    )
};

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    kpBirthChart: state.kundli.kpBirthChart,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KpBirthChart);

const styles = StyleSheet.create({
    Hedertxt: {
        ...FontsStyle.font,
        fontSize: responsiveFontSize(1.7),
    }
});
