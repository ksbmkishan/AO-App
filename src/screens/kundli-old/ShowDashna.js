import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../assets/style';
import MyLoader from '../../components/MyLoader2';
import { colors } from '../../config/Constants1';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from 'moment';

const VimhotriMahadasha = ({
  basicDetails,
  dispatch,
  AntarDasha,
  PranAntarDashadata,
  SookhamDashadata,
  isLoading,
  majorDashaData,
}) => {
  const { t } = useTranslation();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedSubPlanet, setSelectedSubPlanet] = useState(null);
  const [selectedPratyantarPlanet, setSelectedPratyantarPlanet] = useState(null);
  const [isSubDashaVisible, setIsSubDashaVisible] = useState(false);
  const [isPratyantarVisible, setIsPratyantarVisible] = useState(false);
  const [isSookshmaVisible, setIsSookshmaVisible] = useState(false);

  console.log("basicDetailsmahadsha", basicDetails)

  console.log("majorDashaData", majorDashaData)

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getKundliMajorDasha(payload));
  }, [dispatch]);


  // setKundliBasicDetails

  const handlePlanetPress = (planet, index) => {
    setSelectedPlanet(planet);
    setIsSubDashaVisible(true);
    setSelectedSubPlanet(null);
    setSelectedPratyantarPlanet(null);
    setIsPratyantarVisible(false);
    setIsSookshmaVisible(false);

    const payload = {
      lang: t('lang'),
      lat: basicDetails?.lat,
      lon: basicDetails?.lon,
      mahadasha: index,
    };

    console.log("raam raam", payload)

    dispatch(KundliActions.getAntarDasha(payload));
  };

  const handleSubPlanetPress = (planet, index) => {
    setSelectedSubPlanet(planet);
    setIsPratyantarVisible(true);
    setIsSookshmaVisible(false);
    setSelectedPratyantarPlanet(null);

    const payload = {
      lang: t('lang'),
      lat: basicDetails?.lat,
      lon: basicDetails?.lon,
      mahadasha: majorDashaData.findIndex(d => d.planet === selectedPlanet),
      antardasha: index,
    };

    dispatch(KundliActions.getPrayantarDasha(payload));
  };

  const handlePratyantarPress = (planet, index) => {
    setSelectedPratyantarPlanet(planet);
    setIsSookshmaVisible(true);

    const payload = {
      lang: t('lang'),
      lat: basicDetails?.lat,
      lon: basicDetails?.lon,
      mahadasha: majorDashaData.findIndex(d => d.planet === selectedPlanet),
      antardasha: AntarDasha?.ad?.findIndex(d => d.planet === selectedSubPlanet),
      pratyantardasha: index,
    };

    dispatch(KundliActions.getSookhamdata(payload));
  };

  const handleBackPress = () => {
    if (isSookshmaVisible) {
      setIsSookshmaVisible(false);
      setSelectedPratyantarPlanet(null);
    } else if (isPratyantarVisible) {
      setIsPratyantarVisible(false);
      setSelectedSubPlanet(null);
    } else if (isSubDashaVisible) {
      setIsSubDashaVisible(false);
      setSelectedPlanet(null);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { backgroundColor: selectedPlanet === item.planet ? '#ffd' : '#fcefb4' },
      ]}
      onPress={() => handlePlanetPress(item.planet, index)}
    >
      <Text style={styles.itemText}>{item.planet}</Text>
      <Text style={styles.itemText}>{moment(item.from, 'DD-MM-YYYY').format('DD-MM-YYYY')}</Text>
      <Text style={styles.itemText}>{moment(item.to, 'DD-MM-YYYY').format('DD-MM-YYYY')}</Text>
    </TouchableOpacity>
  );

  const renderItemAntardasha = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { backgroundColor: selectedSubPlanet === item.planet ? '#ffd' : '#fcefb4' },
      ]}
      onPress={() => handleSubPlanetPress(item.planet, index)}
    >
      <Text style={styles.itemText}>{item.planet}</Text>
      <Text style={styles.itemText}>{moment(item.from, 'DD-MM-YYYY').format('DD-MM-YYYY')}</Text>
      <Text style={styles.itemText}>{moment(item.to, 'DD-MM-YYYY').format('DD-MM-YYYY')}</Text>
    </TouchableOpacity>
  );

  const renderItemPratyantar = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: '#fcefb4' }]}
      onPress={() => handlePratyantarPress(item.planet, index)}
    >
      <Text style={styles.itemText}>{item.planet}</Text>
      <Text style={styles.itemText}>{moment(item.from, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm')}</Text>
      <Text style={styles.itemText}>{moment(item.to, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm')}</Text>
    </TouchableOpacity>
  );

  const renderItemSookshma = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: '#fcefb4' }]}>
      <Text style={styles.itemText}>{item.planet}</Text>
      <Text style={styles.itemText}>{moment(item.from, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm')}</Text>
      <Text style={styles.itemText}>{moment(item.to, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm')}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyLoader isVisible={isLoading} />

        <View style={styles.headingWrapper}>
          <Text style={{ ...Fonts.PoppinsSemiBold, color: 'white' }}>
            {isSookshmaVisible
              ? 'Sookshmadasha'
              : isPratyantarVisible
                ? 'Pratyantar Dasha'
                : isSubDashaVisible
                  ? 'Vinshottari Antardasha'
                  : 'Vinshottari Maha Dasha'}
          </Text>
        </View>

        <View style={styles.container}>
          <LinearGradient
            colors={['#1E68B9', '#123A62']}
            locations={[0, 0.41]}
            style={styles.gradientHeader}
          >
            <Text style={styles.headerText}>Planet</Text>
            <Text style={styles.headerText}>Start Date</Text>
            <Text style={styles.headerText}>End Date</Text>
          </LinearGradient>

          {isSookshmaVisible ? (
            <>
              <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.backButtonText}>⬅ Back</Text>
              </TouchableOpacity>

              <Text style={{ ...Fonts.PoppinsBold }}>
                Selected Pratyantar Planet: {selectedPratyantarPlanet}
              </Text>

              <FlatList
                data={SookhamDashadata || []}
                renderItem={renderItemSookshma}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          ) : isPratyantarVisible ? (
            <>
              <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.backButtonText}>⬅ Back</Text>
              </TouchableOpacity>

              <Text style={{ ...Fonts.PoppinsBold }}>
                Selected Sub-Planet: {selectedSubPlanet}
              </Text>

              <FlatList
                data={PranAntarDashadata?.pd || []}
                renderItem={renderItemPratyantar}
              />
            </>
          ) : isSubDashaVisible ? (
            <>
              <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.backButtonText}>⬅ Back</Text>
              </TouchableOpacity>

              <Text style={{ ...Fonts.PoppinsBold }}>
                Selected Planet: {selectedPlanet}
              </Text>

              <FlatList data={AntarDasha?.ad || []} renderItem={renderItemAntardasha} />
            </>
          ) : (
            <FlatList data={majorDashaData || []} renderItem={renderItem} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  majorDashaData: state.kundli.majorDashaData,
  AntarDasha: state.kundli.AntarDasha,
  PranAntarDashadata: state.kundli.PranAntarDashadata,
  SookhamDashadata: state.kundli.SookhamDashadata,
  basicDetails: state.kundli.basicDetails,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VimhotriMahadasha);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  headingWrapper: {
    alignSelf: 'center',
    backgroundColor: '#AB0001',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 10,
  },
  gradientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    ...Fonts.PoppinsMedium,
    color: 'white',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  itemText: {
    flex: 0.3,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    color: 'red',
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
