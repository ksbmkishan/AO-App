import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import KpBirthSvg from '../components/KpBirthSvg';
import TranslateText from '../../language/TranslateText';
import MyLoader from '../../../components/MyLoader'; // ✅ Loader added
import { normalize } from '../../../config/constants';
import Loader from '../../../components/Loader';

const LagnaChart = ({ basicDetails, dispatch, MYlagnaCHART, isLoading }) => {
    const { t } = useTranslation();

    console.log("MYlagnaCHART",MYlagnaCHART)

    useEffect(() => {
        const payload = { lang: t('lang') };
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place
        };
        dispatch(KundliActions.getLagnaChart(payload));
    }, [dispatch]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString().slice(-2);
        let hours = date.getHours();
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? ('0' + hours).slice(-2) : 12;
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    };

    // ✅ Show loader if data not ready
    if (isLoading || !MYlagnaCHART) {
        return <Loader />;
    }

    return (
        <View>

            <View style={{flex:1, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                <KpBirthSvg data={MYlagnaCHART} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SCREEN_WIDTH * 0.04 }}>
                <Text style={{ ...Fonts.black11InterMedium, fontSize: normalize(18) }}>
                    <TranslateText title={'* Retrograde'} />
                </Text>
                <Text style={{ ...Fonts.black11InterMedium, fontSize: normalize(18) }}>
                    <TranslateText title={' ~ Combust '} />
                </Text>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    MYlagnaCHART: state.kundli.MYlagnaCHART,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LagnaChart);

const styles = StyleSheet.create({
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),
    },
});
