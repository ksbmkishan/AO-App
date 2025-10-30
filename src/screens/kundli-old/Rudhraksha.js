import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

// Function to strip HTML tags from a string
const stripHtmlTags = (html) => {
    return html?.replace(/<[^>]*>?/gm, '');
};

const Rudhraksha = ({ basicDetails, dispatch, Rudhrakshadata }) => {
    console.log("Rudhrakshadata", Rudhrakshadata);

    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon
        };
        console.log(payload, 'payload');
        dispatch(KundliActions.getRudhraksha(payload));
    }, [dispatch]);

    return (
        <ScrollView style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
            <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, gap: 10 }}>
                <Text style={{ ...Fonts.PoppinsBold, fontSize: responsiveFontSize(1.9), textAlign: "justify" }}>
                    {stripHtmlTags(Rudhrakshadata?.heading)}
                </Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>
                    {stripHtmlTags(Rudhrakshadata?.rudraksha)}
                </Text>
            </View>

            <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>
                {stripHtmlTags(Rudhrakshadata?.resp)}
            </Text>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Rudhrakshadata: state.kundli.Rudhrakshadata,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Rudhraksha);

const styles = StyleSheet.create({
    textstyle: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.5)
    }
});
