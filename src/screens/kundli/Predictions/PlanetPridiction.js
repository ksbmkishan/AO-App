import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import HTML from 'react-native-render-html';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../config/Screen';
import { colors } from '../../../config/Constants1';
import moment from 'moment';
import { Fonts } from '../../../assets/style';
import { Translated } from '../../language/Translated'; // ✅ Import your translate utility if needed
import TranslateText from '../../language/TranslateText';

const PlanetPrediction = ({ basicDetails, dispatch, MyPrediction }) => {
    const { t } = useTranslation();
    const [translatedPlanets, setTranslatedPlanets] = useState([]);

    useEffect(() => {
        const payload = { lang: t('lang') };
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch, t]);

    useEffect(() => {
        if (basicDetails) {
            const payload = {
                lang: t('lang'),
                gender: basicDetails?.gender,
                name: basicDetails?.name,
                place: basicDetails?.place,
            };
            dispatch(KundliActions.getPredictionData2(payload));
        }
    }, [dispatch, basicDetails, t]);

    useEffect(() => {
        const translatePlanets = async () => {
            if (MyPrediction?.prediction?.planets) {
                const promises = MyPrediction.prediction.planets.map(async (planet) => {
                    const cleanedHtml = cleanHtml(planet.prediction);
                    const translatedHtml = await Translated(cleanedHtml); // ✅ Assuming Translated() works with HTML
                    return {
                        ...planet,
                        translatedPrediction: translatedHtml,
                    };
                });

                const results = await Promise.all(promises);
                setTranslatedPlanets(results);
            }
        };

        translatePlanets();
    }, [MyPrediction]);

    const cleanHtml = (html) => {
        return html
            ?.replace(/<font[^>]*color="([^"]+)"[^>]*>/g, '<span style="color:$1">')
            .replace(/<\/font>/g, '</span>')
            .replace(/<br>/g, '<br/>');
    };

    return (
        <View style={styles.container}>
            <View style={{
                alignItems: "flex-end",
                elevation: 1,
                paddingHorizontal: SCREEN_WIDTH * 0.02,
                paddingVertical: SCREEN_HEIGHT * 0.01,
                backgroundColor: colors.mybackground,
                borderRadius: 5,
                gap: 2,
                marginBottom: SCREEN_HEIGHT * 0.03
            }}>
                <Text style={styles.Hedertxt}>{basicDetails?.name}</Text>
                <Text style={styles.Hedertxt}>
                    {moment(basicDetails?.dob).format('DD MMM YYYY')} {moment(basicDetails?.tob).format('hh:mm A')}
                </Text>
                <Text style={styles.Hedertxt}>{basicDetails?.place}</Text>
            </View>

            {translatedPlanets.length > 0 ? (
                translatedPlanets.map((planet, index) => (
                    <View key={index} style={styles.planetContainer}>
                        <HTML
                            source={{ html: planet.translatedPrediction }}
                            contentWidth={SCREEN_WIDTH}
                            baseStyle={{color:'black'}}
                            tagsStyles={{
                                h4: { fontSize: responsiveFontSize(2.5), color: '#9c0000', fontWeight: 'bold' },
                                h5: { fontSize: responsiveFontSize(2), color: '#0000ff', fontWeight: 'bold' },
                                p: { fontSize: responsiveFontSize(1.5), color: 'black', marginBottom: 2, textAlign: 'justify' },
                                b: { fontWeight: 'bold' },
                                span: { fontSize: responsiveFontSize(2.3) },
                            }}
                        />
                    </View>
                ))
            ) : (
                <Text style={styles.noPredictionText}><TranslateText title={'No Prediction Available'}/> </Text>
            )}
        </View>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    MyPrediction: state.kundli.MyPrediction,
});

export default connect(mapStateToProps)(PlanetPrediction);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    planetContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    noPredictionText: {
        fontSize: responsiveFontSize(2),
        color: '#666',
        textAlign: 'center',
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),
    }
});
