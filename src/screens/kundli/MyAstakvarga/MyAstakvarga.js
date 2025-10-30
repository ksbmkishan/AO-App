import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../config/Constants1';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import AstakCharts from '../AstakCharts';
import TranslateText from '../../language/TranslateText';
import MyLoader from '../../../components/MyLoader'; // ✅ Add loader
import { FontsStyle } from '../../../config/constants';

const MyAstakvarga = ({ basicDetails, dispatch, MyAstakvarga, isLoading }) => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState(t('lang') == 'en' ? 'lagan' : 'लग्न');

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
    dispatch(KundliActions.getMyAstakvargadata(payload));
  }, [dispatch, basicDetails]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
  };

  const getSelectedTableData = () => {
    return MyAstakvarga?.prastarakListData?.prastarakList?.find(p => p.name === selectedItem)?.prastaraks || [];
  };

  const getSelectedChartData = () => {
    const index = MyAstakvarga?.prastarakListData?.prastarakList?.findIndex(p => p.name === selectedItem);
    return MyAstakvarga?.prastarakListData?.charts[index] || null;
  };

  // ✅ Show loader while data is loading
  if (isLoading || !MyAstakvarga) {
    return <MyLoader />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8E8D9" }}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.viewButton, selectedButton === 1 && styles.selectedButton]}
          onPress={() => setSelectedButton(1)}>
          <Text style={{ ...FontsStyle.fontBold, fontSize: responsiveFontSize(2) }}>
            {t('Table')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewButton, selectedButton === 2 && styles.selectedButton]}
          onPress={() => setSelectedButton(2)}>
          <Text style={{ ...FontsStyle.fontBold, fontSize: responsiveFontSize(2) }}>
            {t('Chart')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)} style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>{selectedItem}</Text>
          <AntDesign name='down' size={15} color={'black'} />
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropdownContent}>
            {MyAstakvarga?.prastarakListData?.prastarakList?.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelectItem(item.name)}>
                <Text style={styles.dropdownItem}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView>
        <View style={styles.contentContainer}>
          {selectedButton === 1 && (
            <View>
              <View style={styles.headerRow}>
                <Text style={styles.sideLabel}></Text>
                {[...Array(12).keys()].map((i) => (
                  <Text key={i} style={styles.Hedertxt}>{i + 1}</Text>
                ))}
              </View>
              {getSelectedTableData().map((row, index) => (
                <View key={index} style={styles.dataRow}>
                  <Text style={styles.sideLabel}>
                    {row.name}
                  </Text>
                  {row.prastarak.map((val, valIndex) => (
                    <Text key={valIndex} style={styles.dataCell}>{val}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
          {selectedButton === 2 && getSelectedChartData() && (
            <AstakCharts data={getSelectedChartData()} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  MyAstakvarga: state.kundli.MyAstakvarga,
  basicDetails: state.kundli.basicDetails,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MyAstakvarga);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.background_theme2,
  },
  viewButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  dropdownButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  dropdownText: {
    fontSize: responsiveFontSize(1.4),
    ...FontsStyle.font,
  },
  dropdownContent: {
    position: 'absolute',
    top: 1,
    left: SCREEN_WIDTH * 0.6,
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    width: SCREEN_WIDTH * 0.28,
    alignItems: 'flex-start',
    gap: SCREEN_HEIGHT * 0.02,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 5,
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.8),
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: SCREEN_HEIGHT * 0.02,
    borderBottomWidth: 1,
  },
  sideLabel: {
    width: SCREEN_WIDTH * 0.15,
    textAlign: 'center',
    ...FontsStyle.fontBold,
  },
  Hedertxt: {
    width: SCREEN_WIDTH * 0.065,
    textAlign: 'center',
    ...FontsStyle.fontBold,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: SCREEN_HEIGHT * 0.01,
    borderBottomWidth: 1,
  },
  dataCell: {
    width: SCREEN_WIDTH * 0.065,
    textAlign: 'center',
    ...FontsStyle.font,
  },
});
