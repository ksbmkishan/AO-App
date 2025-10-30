import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { Fonts } from '../../../../assets/style';
import { SCREEN_HEIGHT } from '../../../../config/Screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const MatchingConclusivePrediction = ({ navigation, dispatch, MatchingPrediction, maleKundliData, femaleKundliData, MatchBasicDetails }) => {

    console.log("MatchBasicDetails", MatchBasicDetails)
    console.log("MatchingPrediction", MatchingPrediction)


    const hour = MatchBasicDetails?.female_astro_details?.hour?.toString().padStart(2, '0');
    const minute = MatchBasicDetails?.female_astro_details?.minute?.toString().padStart(2, '0');
    const ft = `${hour}:${minute}`;
    const hourMale = MatchBasicDetails?.male_astro_details?.hour?.toString().padStart(2, '0');
    const minuteMale = MatchBasicDetails?.male_astro_details?.minute?.toString().padStart(2, '0');
    const mt = `${hourMale}:${minuteMale}`;

    console.log("femalietime", ft),
        useEffect(() => {

            dispatch(KundliActions.MartchingPridiction());
        }, [dispatch]);



    console.log('MatchingPrediction ::  ', MatchingPrediction)



    return (
        <View style={styles.container}>
            <MyHeader title={'Matching Conclusive Prediction'} navigation={navigation} />
            <ScrollView style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9', paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                {MatchingPrediction && MatchingPrediction?.plan != 3 ?
                    <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.6), textAlign: "justify" }}>{MatchingPrediction?.['ashtkoot-conclusion']}</Text>
                    :
                    <View style={{
                        alignSelf: 'center',
                        marginVertical: 40
                    }}>
                        <Text style={{ color: 'black' }}>Coming Soon..</Text>
                    </View>}
                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.05 }}>

                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F6FE',
    },
    scrollContainer: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    doshaContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#F7F6FE',
        borderWidth: 1,
        borderColor: '#F7F6FE'
    },
    title: {

        marginBottom: 10,
        ...Fonts.PoppinsSemiBold,
        fontSize: 21,
    },
    comment: {
        ...Fonts.PoppinsMedium
    },
});

const mapStateToProps = (state) => ({
    MatchingPrediction: state.kundli.MatchingPrediction,
    isLoading: state.kundli.isLoading,
    maleKundliData: state.kundli.maleKundliData,
    femaleKundliData: state.kundli.femaleKundliData,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MatchingConclusivePrediction);
