import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes } from '../../assets/style';
import moment from 'moment';
import TranslateText from '../language/TranslateText';
import { colors } from '../../config/Constants1';

const GeminiData = ({ basicDetails, dispatch, geminiData }) => {
  const { t } = useTranslation();

  console.log("JHKJHKJ", geminiData)

  useEffect(() => {
    const payload = { lang: t('lang') };
    dispatch(KundliActions.getKundliBirthDetails(payload));
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? ("0" + hours).slice(-2) : 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getGeminiData(payload));
  }, [dispatch]);

  console.log('CheckGeminiData:::KKK', geminiData);

  if (!geminiData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No Data Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
        <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
        <Text style={styles.Hedertxt}>
          <TranslateText
            title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
          />
        </Text>

        <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
      </View>

      <View style={{ gap: Sizes.fixPadding }}>



        {/* Part 2 */}

        <View
          style={{
            padding: 4,
            borderRadius: 8,
            backgroundColor: 'white',
            gap: 10,
          }}>
          <View
            style={{ borderBottomWidth: 0.5, paddingBottom: Sizes.fixPadding }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={[styles.commanText, { color: '#026135' }]}>
                  <TranslateText title={'Ascendant'} />
                </Text>
                <Text style={styles.commanText}>
                  {geminiData?.[0]?.karakaPlanetData?.karakDetails?.ascendant ? (
                    <TranslateText title={geminiData?.[0]?.karakaPlanetData?.karakDetails?.ascendant} />
                  ) : (
                    <TranslateText title={'No Name Found'} />
                  )}
                </Text>
              </View>
              <View style={{ borderWidth: 0.4, color: 'gray' }} />

              <View>
                <Text style={[styles.commanText, { color: '#026135' }]}>
                  <TranslateText title={'Pad Lagna'} />
                </Text>
                <Text style={styles.commanText}>
                  {geminiData?.[0]?.karakaPlanetData?.karakDetails?.pad_lagna ? (
                    <TranslateText title={geminiData?.[0]?.karakaPlanetData?.karakDetails?.pad_lagna} />
                  ) : (
                    <TranslateText title={'No Name Found'} />
                  )}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ borderBottomWidth: 0.5, paddingBottom: Sizes.fixPadding }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={[styles.commanText, { color: '#026135' }]}>
                  <TranslateText title={'Up Pad Lagna'} />
                </Text>
                <Text style={styles.commanText}>
                  {geminiData?.[0]?.karakaPlanetData?.karakDetails?.up_pad_lagna ? (
                    <TranslateText title={geminiData?.[0]?.karakaPlanetData?.karakDetails?.up_pad_lagna} />
                  ) : (
                    <TranslateText title={'No Name Found'} />
                  )}
                </Text>
              </View>
              <View style={{ borderWidth: 0.5 }} />

              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.commanText, { color: '#026135' }]}>
                  <TranslateText title={'Karamsha Lagna'} />
                </Text>
                <Text style={styles.commanText}>
                  {geminiData?.[0]?.karakaPlanetData?.karakDetails?.karamsha_lagna ? (
                    <TranslateText title={geminiData?.[0]?.karakaPlanetData?.karakDetails?.karamsha_lagna} />
                  ) : (
                    <TranslateText title={'No Name Found'} />
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>


        <FlatList
          data={
            geminiData?.[0]?.karakaPlanetData?.karakDetails?.karakaPlanetList
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <Text style={[styles.value, { color: 'red' }]}>
                  <TranslateText title={item.planet.name} />
                </Text>
                <Text style={[styles.value, { color: 'purple' }]}>
                  <TranslateText title={item.planet.rashi} />
                </Text>
                <Text style={[styles.value, { color: 'black' }]}>
                  {item.planet.degree}
                </Text>
                <Text style={[styles.value, { color: 'blue' }]}>
                  <TranslateText title={item.name} />
                </Text>




              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  geminiData: state.kundli.geminiData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GeminiData);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.01,
  },

  cardContainer: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: SCREEN_HEIGHT * 0.015,
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },

  value: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
  },
  noDataText: {
    textAlign: 'center',
    color: 'black',
    fontSize: responsiveFontSize(2),
  },
  commanText: {
    ...Fonts.primaryHelvetica,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SCREEN_HEIGHT * 0.005,
  },
  title: {
    fontSize: responsiveFontSize(2),
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
  value: {
    fontSize: responsiveFontSize(1.8),
    color: '#555',
  },
  noDataText: {
    textAlign: 'center',
    color: 'black',
    fontSize: responsiveFontSize(2),
  },
  Hedertxt: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.7),

  }
});
