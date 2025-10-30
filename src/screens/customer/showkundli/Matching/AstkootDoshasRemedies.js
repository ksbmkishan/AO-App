import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { Fonts } from '../../../../assets/style';
import { SCREEN_HEIGHT } from '../../../../config/Screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const AstkootDoshasRemedies = ({ navigation, dispatch, Astakootdosharemedies, MatchBasicDetails, maleKundliData, femaleKundliData }) => {
    // console.log("maleKundliData", maleKundliData)  

    // console.log("femaleKundliData", femaleKundliData) 

    // console.log("Astakootdosharemedies", Astakootdosharemedies)
    const hour = MatchBasicDetails?.female_astro_details?.hour?.toString().padStart(2, '0');
    const minute = MatchBasicDetails?.female_astro_details?.minute?.toString().padStart(2, '0');
    const ft = `${hour}:${minute}`;
    const hourMale = MatchBasicDetails?.male_astro_details?.hour?.toString().padStart(2, '0');
    const minuteMale = MatchBasicDetails?.male_astro_details?.minute?.toString().padStart(2, '0');
    const mt = `${hourMale}:${minuteMale}`;

    useEffect(() => {
        const payload = {
            ft: ft,
            mt: mt
        }
        console.log("payloadanuj", payload)
        dispatch(KundliActions.Astakootdosharemedies(payload));
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <MyHeader title={'Astkoot Doshas Remedies'} navigation={navigation} />
            <ScrollView
                style={{ padding: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9', paddingVertical: SCREEN_HEIGHT * 0.02 }}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {Astakootdosharemedies && Astakootdosharemedies.bhakootdosha && Astakootdosharemedies.bhakootdosha.present ? (
                    <View style={styles.doshaContainer}>
                        {/* Bhakoot Dosha */}
                        <Text style={styles.title}>🌙 Bhakoot Dosha</Text>
                        <Text style={styles.comment}>
                            <Text style={styles.bold}>Status:</Text> {Astakootdosharemedies.bhakootdosha.present === "yes" ? "Present" : "Not Present"}
                        </Text>
                        <Text style={styles.comment}>
                            <Text style={styles.bold}>Comment:</Text> {Astakootdosharemedies.bhakootdosha.comment}
                        </Text>
                        {/* <Text style={[styles.subTitle]}>🧘 Remedies:</Text>
                        <Text style={styles.comment}>{Astakootdosharemedies.bhakootdosha.remedies.remedies}</Text> */}

                        {/* Gana Dosha */}
                        <Text style={[styles.title, { marginTop: 20 }]}>🔥 Gana Dosha</Text>
                        <Text style={styles.comment}>
                            <Text style={styles.bold}>Status:</Text> {Astakootdosharemedies.ganadosha.present === "yes" ? "Present" : "Not Present"}
                        </Text>
                        <Text style={styles.comment}>
                            <Text style={styles.bold}>Comment:</Text> {Astakootdosharemedies.ganadosha.comment}
                        </Text>
                        {/* <Text style={styles.subTitle}>🧘 Remedies:</Text>
                        <Text style={styles.comment}>{Astakootdosharemedies.ganadosha.remedies.remedies}</Text> */}

                        {/* Nadi Dosha */}
                        <Text style={[styles.title, { marginTop: 20 }]}>💧 Nadi Dosha</Text>
                        <Text style={styles.comment}>
                            <Text style={styles.bold}>Status:</Text> {Astakootdosharemedies.naadidosha.present === "yes" ? "Present" : "Not Present"}
                        </Text>
                        <Text style={styles.comment}>
                            <Text style={styles.bold}>Comment:</Text> {Astakootdosharemedies.naadidosha.comment}
                        </Text>
                    </View>
                ): 
                <View style={{
                    alignSelf:'center',
                    marginVertical:40
                }}>
                    <Text style={{color:'black'}}>Coming Soon..</Text>
                </View>
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F6FE',
    },
    doshaContainer: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0DADA'
    },
    title: {
        ...Fonts.PoppinsSemiBold,
        fontSize: responsiveFontSize(2.2),
        marginBottom: 8,
        color: '#2D2D2D'
    },
    subTitle: {
        ...Fonts.PoppinsMedium,
        fontSize: responsiveFontSize(2),
        marginTop: 10,
        color: '#333'
    },
    comment: {
        ...Fonts.PoppinsRegular,
        fontSize: responsiveFontSize(1.8),
        lineHeight: 24,
        textAlign: 'justify',
        color: '#555'
    },
    bold: {
        fontWeight: 'bold',
        color: '#000'
    }
});

const mapStateToProps = (state) => ({
    Astakootdosharemedies: state.kundli.Astakootdosharemedies,
    isLoading: state.kundli.isLoading,
    MatchBasicDetails: state.kundli.MatchBasicDetails,
    maleKundliData: state.kundli.maleKundliData,
    femaleKundliData: state.kundli.femaleKundliData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstkootDoshasRemedies);
