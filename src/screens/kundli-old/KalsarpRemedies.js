import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT } from '../../config/Screen';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

const KalsarpRemedies = ({ basicDetails, dispatch, Kaalsarpji }) => {
    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon
        };
        dispatch(KundliActions.getKalsarpRemedies(payload));
    }, [dispatch]);

    const renderRemedyList = (remedies) => {
        return (
            <FlatList
                data={Object.entries(remedies || {}).filter(([key]) => key !== 'heading')}
                keyExtractor={([key], index) => `${key}-${index}`}
                renderItem={({ item }) => (
                    <Text style={styles.textstyle}>• {item[1]}</Text>
                )}
            />
        );
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                {Kaalsarpji?.data?.heading}
            </Text>


            <Text style={styles.subHeading}>
                {Kaalsarpji?.data?.howto?.heading || "How & When to do the Remedies"}
            </Text>
            {renderRemedyList(Kaalsarpji?.data?.howto)}


            <Text style={styles.subHeading}>
                {Kaalsarpji?.data?.nonshastriya?.heading || "Non Shastriya Remedies"}
            </Text>
            {renderRemedyList(Kaalsarpji?.data?.nonshastriya)}


            <Text style={styles.subHeading}>
                {Kaalsarpji?.data?.shastriya?.heading || "Shastriya Remedies"}
            </Text>
            {renderRemedyList(Kaalsarpji?.data?.shastriya)}
            <View style={{paddingVertical:SCREEN_HEIGHT*0.02}}></View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    Kaalsarpji: state.kundli.Kaalsarpji,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KalsarpRemedies);

const styles = StyleSheet.create({
    container: {
        padding: SCREEN_HEIGHT * 0.02,
        backgroundColor: '#F8E8D9',
        flex: 1,
    },
    heading: {
        ...Fonts.PoppinsBold,
        fontSize: responsiveFontSize(2.2),
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeading: {
        ...Fonts.PoppinsBold,
        fontSize: responsiveFontSize(1.8),
        marginTop: 20,
        marginBottom: 10,
        color: '#5A3E36',
    },
    textstyle: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.6),
        marginBottom: 6,
        textAlign: 'justify',
        color: '#2D2D2D',
    }
});
