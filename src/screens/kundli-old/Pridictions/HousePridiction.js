import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';

const Lalkitaab = ({ basicDetails, dispatch, MyLaalkitaab }) => {

  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat,
      lon: basicDetails?.lon
    };
    if (payload.lat && payload.lon) {
      dispatch(KundliActions.getLaalKitaab(payload));
    }
  }, [basicDetails, dispatch]);

  const renderItem = ({ item }) => {
    const prediction = item?.prediction || {};

    return (
      <View style={styles.card}>
        <Text style={styles.planetTitle}>🌌 ग्रह: {item?.planet || "NA"}</Text>

        <Text style={styles.predictionLabel}>🔴 अशुभ प्रभाव:</Text>
        <Text style={styles.predictionText}>{prediction?.effectsbad || "NA"}</Text>

        <Text style={styles.predictionLabel}>🟢 शुभ प्रभाव:</Text>
        <Text style={styles.predictionText}>{prediction?.effectsgood || "NA"}</Text>

        <Text style={styles.predictionLabel}>⚠ परहेज:</Text>
        <Text style={styles.predictionText}>{prediction?.parhez || "NA"}</Text>

        <Text style={styles.predictionLabel}>📌 स्थिति:</Text>
        <Text style={styles.predictionText}>{prediction?.placed || "NA"}</Text>

        <Text style={styles.predictionLabel}>🪄 उपाय:</Text>
        <Text style={styles.predictionText}>
          {
            prediction?.remedies ||
            prediction?.[" remedies"] ||
            prediction?.["re medies"] ||
            "NA"
          }
        </Text>
      </View>
    );
  };

  const dataArray = MyLaalkitaab ? Object.values(MyLaalkitaab) : [];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8E8D9', marginBottom: SCREEN_HEIGHT * 0.05 }}>
      {dataArray.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 16, color: 'gray' }}>
          कोई जानकारी उपलब्ध नहीं है।
        </Text>
      ) : (
        <FlatList
          data={dataArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: SCREEN_HEIGHT * 0.01 }}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  MyLaalkitaab: state.kundli.MyLaalkitaab,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Lalkitaab);

const styles = StyleSheet.create({
  planetTitle: {
    ...Fonts.black15RobotoMedium,
    fontSize: responsiveFontSize(2.2),
    marginBottom: 8,
    color: '#4B0082',
  },
  predictionLabel: {
    ...Fonts.black13RobotoMedium,
    fontSize: responsiveFontSize(1.8),
    color: '#000',
    marginTop: 8
  },
  predictionText: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.6),
    color: '#333',
    marginBottom: 6
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: SCREEN_HEIGHT * 0.015,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  }
});
