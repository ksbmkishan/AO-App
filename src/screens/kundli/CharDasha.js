import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { Fonts } from '../../assets/style';
import moment from 'moment';
import { colors } from '../../config/Constants1';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TranslateText from '../language/TranslateText';

const CharDasha = ({ basicDetails, dispatch, charDashaData, MycharCurrent }) => {
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState(1);
  const [isYoginimahadashaVisible, setIsYoginimahadashaVisible] = useState(true);
  const [selectedAntarDasha, setSelectedAntarDasha] = useState(null);

  useEffect(() => {
    const payload = { lang: t('lang') };
    dispatch(KundliActions.getKundliBirthDetails(payload));
  }, [dispatch]);

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getCharDashaData(payload));
  }, [dispatch]);

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place,
    };
    dispatch(KundliActions.getCharcurrent(payload));
  }, [dispatch]);

  const CurrentRenderItem = ({ item }) => (
    <View>

<View style={styles.cardContainer}>
  <View style={styles.cardHeader}>
    <Text style={styles.cardHeaderText}>
      <TranslateText title={item?.name} />
    </Text>
  </View>
  <View style={styles.cardContent}>
    <Text style={styles.rashiText}>
      <TranslateText title={item?.rashi} />
    </Text>
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>
        <TranslateText title={item?.start} />
      </Text>
      <Text style={styles.dateText}>
        <TranslateText title={item?.end} />
      </Text>
    </View>
  </View>
</View>


    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Text style={styles.Hedertxt}>{basicDetails?.name}</Text>
        <Text style={styles.Hedertxt}>{moment(basicDetails?.dob).format('DD MMM YYYY')} {moment(basicDetails?.tob).format('hh:mm A')}</Text>
        <Text style={styles.Hedertxt}>{basicDetails?.place}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.viewButton, selectedButton === 1 && styles.selectedButton]} onPress={() => setSelectedButton(1)}>
          <Text style={styles.buttonText}> <TranslateText title={'Mahadasha'}/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.viewButton, selectedButton === 2 && styles.selectedButton]} onPress={() => setSelectedButton(2)}>
          <Text style={styles.buttonText}> <TranslateText title={'Current Dasha'}/></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {selectedButton === 1 && (
          <View>
            {isYoginimahadashaVisible ? ChARDASHA() : CharAntardasha()}
          </View>
        )}
        {selectedButton === 2 && (
          <View>
            <Text style={styles.sectionTitle}><TranslateText title={'Current Dasha'}/></Text>
            <FlatList data={MycharCurrent?.currentDashaList} renderItem={CurrentRenderItem} />
          </View>
        )}
      </View>
      
    </View>
  );

  function ChARDASHA() {
    const RenderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedAntarDasha(item?.antarDasha);
          setIsYoginimahadashaVisible(false);
        }}
        style={styles.dashaItem}
      >
        <Text style={styles.MYTEXT}> <TranslateText title={item?.rashi}/></Text>
        <Text style={styles.MYTEXT}>{item?.end}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={{paddingVertical:SCREEN_HEIGHT*0.02}}>
        <Text style={styles.sectionTitle}> <TranslateText title={'Major Char Dasha'}/></Text>
        <FlatList data={charDashaData?.charDashaList} renderItem={RenderItem} />
      </View>
    );
  }

  function CharAntardasha() {
    const RenderItem = ({ item }) => (
      <View style={{ borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}> <TranslateText title={item?.rashi}/></Text>
        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}>{item?.end}</Text>
      </View>
    );

    return (
      <View>


        <TouchableOpacity
          style={{ flexDirection: "row",gap:SCREEN_WIDTH*0.1,paddingHorizontal:SCREEN_WIDTH*0.03,paddingVertical:SCREEN_HEIGHT*0.02 }}
          onPress={() => setIsYoginimahadashaVisible(true)}

        >
          <AntDesign name='left' color={"black"} size={18} />
          <Text style={styles.sectionTitle}><TranslateText title={'Antar Dasha'}/></Text>
        </TouchableOpacity>


        <FlatList data={selectedAntarDasha} renderItem={RenderItem} />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails,
  charDashaData: state.kundli.charDashaData,
  MycharCurrent: state.kundli.MycharCurrent
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CharDasha);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: SCREEN_HEIGHT * 0.01 },
  userDetails: { alignSelf: 'flex-end', alignItems: 'center', marginBottom: 10 },
  cardContainer: { borderWidth: 1, borderRadius: 10, borderColor: colors.background_theme2, marginVertical: SCREEN_HEIGHT * 0.02 },
  cardHeader: { backgroundColor: colors.background_theme2, padding: 10 },
  cardHeaderText: { color: colors.white_color, fontSize: responsiveFontSize(1.7) },
  cardContent: { alignItems: 'center', padding: 10 },
  rashiText: { color: colors.red_color1, fontSize: responsiveFontSize(1.5) },
  dateContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  dateText: { fontSize: responsiveFontSize(1.5) },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  viewButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  selectedButton: { borderBottomWidth: 2, borderBottomColor: colors.background_theme2 },
  buttonText: { ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) },
  sectionTitle: { fontSize: responsiveFontSize(1.8), fontWeight: 'bold', marginBottom: 10, color: "black" },
  dashaItem: { borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: SCREEN_HEIGHT * 0.025, paddingHorizontal: SCREEN_WIDTH * 0.02 },
  backButton: { padding: 10 },
  backButtonText: { fontSize: responsiveFontSize(1.5), color: colors.blue_color },
  MYTEXT: { ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) },
  Hedertxt: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.7),

  }
});