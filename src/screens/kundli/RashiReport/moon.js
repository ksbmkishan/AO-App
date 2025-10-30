import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, fonts, getFontSize } from '../../../config/Constants1';
import axios from 'axios';
import MyLoader from '../../../components/MyLoader';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliAction from '../../../redux/actions/KundliActions';
import { Fonts } from '../../../assets/style';

const { width, height } = Dimensions.get('screen');

const MoonRashi = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({});
  }, []);

  useEffect(() => {
    const fetchRashiReports = async () => {
      setIsLoading(true);
      try {
        const payload = {
          lang: t('lang'),
        };
        await props.dispatch(KundliAction.getRashiReports(payload));
      } catch (error) {
        console.error('Error fetching Rashi Reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRashiReports();
  }, []);

  console.log('kundliRashiReport:', props.kundliRashiReport);

  const renderContent = () => {
    if (isLoading) {
      return <MyLoader isVisible={true} />;
    }

    if (
      props.kundliRashiReport &&
      props.kundliRashiReport.moonReports
    ) {
      return (
        <View style={styles.itemContainer}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {props.kundliRashiReport.moonReports.planet}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              padding: 10,
              textAlign: 'justify',
              ...Fonts.primaryHelvetica,
              color: 'black',
              fontSize: 18,
              lineHeight: 25,
            }}
          >
            {props.kundliRashiReport.moonReports.rashi_report}
          </Text>
        </View>
      );
    }

    return (
      <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
        Data not available
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: '#fafdf6',
            marginVertical: 10,
            borderRadius: 15,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 6,
          }}
        >
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  customerData: state.customer.customerData,
  isLoading: state.setting.isLoading,
  AshtakvargaReport: state.kundli.AshtakvargaReport,
  kundliRashiReport: state.kundli.kundliRashiReport,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MoonRashi);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    alignSelf: 'center',
    borderWidth:1
  },
  itemText: {
    color: 'red',
    textAlign: 'center',
    ...Fonts.primaryHelvetica,
    fontWeight: '700',
    fontSize: 20
  },
});
