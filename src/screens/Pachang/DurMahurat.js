import { View, Text, Image, ScrollView, FlatList, StyleSheet } from 'react-native';
import React from 'react';

import { useEffect } from 'react';

import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../../config/Constants1';
import moment from 'moment';


const DurMahurat = ({ dispatch, chartData, route, basicDetails, Durmahuratdata }) => {
    // console.log("Durmahuratdata     ", JSON.parse(Durmahuratdata?.output));

    const listData = Durmahuratdata && Durmahuratdata?.output && Object.entries(JSON.parse(Durmahuratdata?.output));

    console.log('list data ', listData)


    useEffect(() => {
        const payload = {
            lat: basicDetails?.lat,
            lon: basicDetails?.lon,
        };

        console.log("Payload sent:door", payload);
        dispatch(KundliActions.getDurmahurat(payload));
    }, [dispatch]);

    const renderItem = ({ item }) => {
    const [id, { starts_at, ends_at }] = item

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Slot {id}</Text>
        <Text>Starts: {moment(starts_at).format('hh:mm A')}</Text>
        <Text>Ends: {moment(ends_at).format('hh:mm A')}</Text>
      </View>
    )
  }

    return (

        <View style={{flex:1}}>
            {/* <View style={{ elevation: 1, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, margin: 15, borderRadius: 10, backgroundColor: colors.background_theme2 }}>

                <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>Rahukaal start</Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2), color: "white" }}>{Durmahuratdata?.rahukaalstart || "Na"}</Text>
            </View>
            <View style={{ elevation: 1, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, margin: 15, borderRadius: 10, backgroundColor: colors.background_theme2 }}>

                <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>Rahukaal End</Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2), color: "white" }}>{Durmahuratdata?.rahukaalend || "Na"}</Text>
            </View>
            <View style={{ elevation: 1, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, margin: 15, borderRadius: 10, backgroundColor: colors.background_theme2 }}>

                <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>Week day</Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2), color: "white" }}>{Durmahuratdata?.weekday || "Na"}</Text>
            </View>
            <View style={{ elevation: 1, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, margin: 15, borderRadius: 10, backgroundColor: colors.background_theme2 }}>

                <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>Sunrise</Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2), color: "white" }}>{Durmahuratdata?.sunrise || "Na"}</Text>
            </View>
            <View style={{ elevation: 1, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, margin: 15, borderRadius: 10, backgroundColor: colors.background_theme2 }}>

                <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>Sun set</Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2), color: "white" }}>{Durmahuratdata?.sunset || "Na"}</Text>
            </View>
            <View style={{ elevation: 1, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, margin: 15, borderRadius: 10, backgroundColor: colors.background_theme2 }}>

                <Text style={{ ...Fonts.PoppinsBold, color: "white" }}>Dinmaan</Text>

                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2), color: "white" }}>{Durmahuratdata?.dinmaan || "Na"}</Text>
            </View> */}

            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={([key]) => key}
                    contentContainerStyle={styles.container}
                    />
            </View>

</View>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    basicDetails: state.kundli.basicDetails,
    Durmahuratdata: state.kundli.Durmahuratdata
});

export default connect(mapStateToProps, mapDispatchToProps)(DurMahurat)

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  }
})