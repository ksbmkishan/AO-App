import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import TranslateText from '../language/TranslateText';
import { useTranslation } from 'react-i18next';
import RNSpeedometer from 'react-native-speedometer';
import { FontsStyle } from '../../config/constants';

const Astkoota = ({ dispatch, NewAstakootadata, navigation, matchingAshtakootPointsData }) => {
  useEffect(() => {
    dispatch(KundliActions.getNewAstkootadata());
    dispatch(KundliActions.getKundliMatchingAshtakootPoints());
  }, []);

  const { t } = useTranslation();

  const matchData = NewAstakootadata?.matchData || [];

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, { width: SCREEN_WIDTH * 0.22 }]}>{t("Guna")}</Text>
      <Text style={[styles.headerCell, { width: SCREEN_WIDTH * 0.22 }]}>{t("Maximum")}</Text>
      <Text style={[styles.headerCell, { width: SCREEN_WIDTH * 0.22 }]}>{t("Obtained")}</Text>
      <Text style={[styles.headerCell, { width: SCREEN_WIDTH * 0.22 }]}>{t("Area")}</Text>
    </View>
  );

  const renderRow = ({ item, index }) => (
    <View>
        {index === 0 && 
         <ImageBackground
        resizeMode="cover"
        source={require('../../assets/images/KundliMatchingBack.png')}
        style={styles.headerBg}
      >
        <Text allowFontScaling={false} style={styles.scoreTitle}>
          {t('Compatibility_Score')}
        </Text>
        {matchingAshtakootPointsData && (
          <RNSpeedometer
            value={matchingAshtakootPointsData[0]?.matchData[8]?.obtained ?? 0}
            size={SCREEN_WIDTH * 0.7}
            maxValue={36}
            allowedDecimals={1}
            innerCircleStyle={{ backgroundColor: colors.background_theme2 }}
            labelWrapperStyle={styles.labelWrapper}
            labelStyle={{ color: 'grey' }}
          />
        )}
      </ImageBackground>}
        {index === 0 && renderHeader()}
         <View
      style={[
        styles.dataRow,
        {
          backgroundColor: index % 2 === 0 ? '#fff' : '#fff',
          borderBottomLeftRadius: index === matchData.length - 1 ? 10 : 0,
          borderBottomRightRadius: index === matchData.length - 1 ? 10 : 0,
        },
      ]}
    >
     
      <Text style={[styles.cell, { width: SCREEN_WIDTH * 0.22 }]}>
        <TranslateText title={item?.name} />
      </Text>
      <Text style={[styles.cell, { width: SCREEN_WIDTH * 0.22 }]}>{item?.maximum}</Text>
      <Text style={[styles.cell, { width: SCREEN_WIDTH * 0.22 }]}>{item?.obtained}</Text>
      <Text style={[styles.cell, { width: SCREEN_WIDTH * 0.22 }]}>
        <TranslateText title={item?.area} />
      </Text>
    </View>
    </View>
   
  );

  return (
    <View style={styles.container}>
     

      <View style={{ marginHorizontal: 10, width: SCREEN_WIDTH * 0.95, marginVertical: 10,flex:1 }}>
       
        <FlatList
          data={matchData.slice(0, 8)} // सिर्फ़ 8 rows
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E8D9',
  },
  headerBg: {
    flex: 0,
    backgroundColor: colors.background_theme2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 40,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  scoreTitle: {
    ...FontsStyle.fontfamily,
    color: 'white',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
  },
  labelWrapper: {
    backgroundColor: colors.white_color,
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.green_color2,
    marginTop: 25,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.background_theme2,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  headerCell: {
    ...FontsStyle.fontfamily,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    ...FontsStyle.fontfamily,
    fontSize: 13,
    textAlign: 'center',
    color: '#333',
  },
});

const mapStateToProps = (state) => ({
  NewAstakootadata: state.kundli.NewAstakootadata,
  matchingAshtakootPointsData: state.kundli.matchingAshtakootPointsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Astkoota);
