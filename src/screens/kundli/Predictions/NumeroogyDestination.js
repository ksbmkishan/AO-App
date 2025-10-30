import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { t } from 'i18next';
import { FontsStyle, normalize } from '../../../config/constants';

const NumerologyDestination = ({ basicDetails, dispatch, Mynum2 }) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
        };
        console.log("Dispatching Numerology Payload:", payload);
        dispatch(KundliActions.getKundliBirthDetails({ lang: t('lang') }));
        dispatch(KundliActions.getMyNumerology(payload));
    }, [basicDetails]);

    const destinyNumber = Mynum2?.numerlogy?.destinyNumber?.toString() || '--';

    return (
        <View style={{flex:1, padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <Text style={{  ...FontsStyle.font, fontSize: normalize(16), textAlign: "justify" }}>
                {t("Your Destiny Number reveals your life’s greater purpose — a guiding force behind your actions. It shapes your path, showing what you're meant to achieve in this lifetime.")}
            </Text>

            <Text style={{  ...FontsStyle.fontBold, fontSize: normalize(18), textAlign: "center", marginTop: 20 }}>
                {t("Today's Numerology Destiny Number is")}
            </Text>

            <Text style={{ ...FontsStyle.fontBold, fontSize: normalize(28), textAlign: "center", marginVertical: SCREEN_HEIGHT * 0.03, color: "#AB0001" }}>
                {destinyNumber}
            </Text>

            {/* <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>
                The Life Path Number is essentially the same as the Destiny/Bhagyank calculated earlier – the sum of the full date of birth reduced to one digit. In Western terms, this is the most significant number, revealing the overall theme of one’s life. The logic for calculation was given under Bhagyank; our implementation can reuse the `calculateBhagyank()` function or have a clear alias:
                {'\n\n'}


                {'\n\n'}
              
            </Text> */}
        </View>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Mynum2: state.kundli.Mynum2,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerologyDestination);

const styles = StyleSheet.create({
    textstyle: {
        ...FontsStyle.font,
        fontSize: normalize(15),
    },
});
