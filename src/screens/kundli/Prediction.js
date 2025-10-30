import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Fonts } from '../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import RenderHTML from 'react-native-render-html';

const Prediction = ({ basicDetails, dispatch, myPlanets, myPrediction }) => {
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
    dispatch(KundliActions.getPredictionData(payload));
  }, [dispatch]);

  console.log('GetThePredictionData:::KK', myPrediction);

  const renderHTMLContent = (html) => {
    return (
      <RenderHTML
        contentWidth={SCREEN_WIDTH * 0.9} 
        source={{ html }}
      />
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          paddingTop: SCREEN_HEIGHT * 0.015,
          borderRadius: 10,
          paddingHorizontal: SCREEN_WIDTH * 0.015,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: SCREEN_HEIGHT * 0.02,
            borderBottomWidth: 1,
            paddingHorizontal: SCREEN_WIDTH * 0.02,
          }}>
          <Text style={styles.MyText}>{item?.name}</Text>
          <Text style={styles.MyText}>{item?.rashi || 'N/A'}</Text>
          <Text style={styles.MyText}>{item?.degree || 'N/A'}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SCREEN_HEIGHT * 0.02,
            borderBottomWidth: 1,
            paddingHorizontal: SCREEN_WIDTH * 0.02,
          }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>Sign</Text>
            <Text style={styles.MyText}>{item?.rashi || 'N/A'}</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>Sign Lord</Text>
            <Text style={styles.MyText}>{item?.rashiLord || 'N/A'}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SCREEN_HEIGHT * 0.02,
            borderBottomWidth: 1,
            paddingHorizontal: SCREEN_WIDTH * 0.02,
          }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>Nakshatra</Text>
            <Text style={styles.MyText}>{item?.nakshatra || 'N/A'}</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>Nakshatra Lord</Text>
            <Text style={styles.MyText}>{item?.nakshatraLord || 'N/A'}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SCREEN_HEIGHT * 0.02,
            borderBottomWidth: 1,
            paddingHorizontal: SCREEN_WIDTH * 0.02,
          }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>House</Text>
            <Text style={styles.MyText}>{item?.house || 'N/A'}</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>Charan</Text>
            <Text style={styles.MyText}>{item?.charan || 'N/A'}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SCREEN_HEIGHT * 0.02,
            paddingHorizontal: SCREEN_WIDTH * 0.02,
          }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>Retrograde</Text>
            <Text style={styles.MyText}>{item?.isRetrograde || 'N/A'}</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={styles.MyText}>Combust</Text>
            <Text style={styles.MyText}>{item?.isCombust || 'N/A'}</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.MyText}>State</Text>
            <Text style={styles.MyText}>{item?.PlanetState || 'N/A'}</Text>
          </View>
        </View>

        {item?.prediction && (
          <View style={{ padding: SCREEN_WIDTH * 0.02 }}>
            {renderHTMLContent(item.prediction)}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: SCREEN_HEIGHT * 0.01 }}>
      <FlatList
        data={myPrediction}
        renderItem={RenderItem}
        ListEmptyComponent={
          <View>
            <Text style={{ textAlign: 'center', color: 'black' }}>
              No Data Available
            </Text>
          </View>
        }
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  myPlanets: state.kundli.myPlanets,
  myPrediction: state.kundli.myPrediction,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);

const styles = StyleSheet.create({
  MyText: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.8),
  },
});