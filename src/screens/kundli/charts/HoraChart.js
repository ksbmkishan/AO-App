import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { colors } from '../../../config/Constants1';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from 'moment';
import TranslateText from '../../language/TranslateText';
import MyLoader from '../../../components/MyLoader';
import Loader from '../../../components/Loader';

const HoraChart = ({ basicDetails, dispatch, HoraChartDta,isLoading }) => {
    console.log("arpit", HoraChartDta);

    const { t } = useTranslation();

    useEffect(() => {
        const payload = {
            lang: t('lang'),
        };
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
        };
        console.log("Mahadev", payload);
        dispatch(KundliActions.getHoraChart(payload));
    }, [dispatch]);

      if (isLoading || !HoraChartDta) {
              return <Loader />;
          }

    return (
        <View>
            {/* <View style={{
                alignItems: "flex-end",
                elevation: 1,
                paddingHorizontal: SCREEN_WIDTH * 0.02,
                paddingVertical: SCREEN_HEIGHT * 0.01,
                backgroundColor: colors.mybackground,
                borderRadius: 5,
                gap: 2
            }}>
                <Text style={styles.Hedertxt}>
                    <TranslateText title={basicDetails?.name} />
                </Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText title={basicDetails?.place} />
                </Text>
            </View> */}

            <View style={{
                borderWidth: 1,
                paddingVertical: SCREEN_HEIGHT * 0.07,
                alignItems: "center",
                backgroundColor: colors.mybackground,
                borderColor: colors.background_theme2
            }}>
                <View style={{ flexDirection: "row", gap: 5, paddingVertical: 5 }}>
                    {HoraChartDta?.chart[0]?.planets?.map((planet, index) => (
                        <Text
                            key={index}
                            style={{ fontWeight: "500", color: getColor(index) }}
                        >
                            <TranslateText title={planet?.name} />
                        </Text>
                    ))}
                </View>
                <Text style={styles.Hedertxt}>
                    <TranslateText title={HoraChartDta?.chart[0]?.rashiIndex} />
                </Text>
            </View>

            <View style={{
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderRightWidth: 1,
                paddingVertical: SCREEN_HEIGHT * 0.07,
                alignItems: "center",
                backgroundColor: colors.mybackground,
                borderColor: colors.background_theme2
            }}>
                <View style={{ flexDirection: "row", gap: 5, paddingVertical: 5 }}>
                    {HoraChartDta?.chart[1]?.planets?.map((planet, index) => (
                        <Text
                            key={index}
                            style={{ fontWeight: "500", color: getColor(index) }}
                        >
                            <TranslateText title={planet?.name} />
                        </Text>
                    ))}
                </View>
                <Text style={styles.Hedertxt}>
                    <TranslateText title={HoraChartDta?.chart[1]?.rashiIndex} />
                </Text>
            </View>
            
        </View>
    );
};

// Helper function to assign colors dynamically
const getColor = (index) => {
    const colorArray = [
        "red", "blue", "green", "green", "green",
        "green", "green", "green", "green", "green",
    ];
    return colorArray[index] || "gray";
};

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    HoraChartDta: state.kundli.HoraChartDta,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HoraChart);

const styles = StyleSheet.create({
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),
    }
});
