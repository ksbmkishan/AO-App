import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, SCREEN_WIDTH } from '../../../config/Screen';
import moment from 'moment';
import { BarChart } from "react-native-gifted-charts";
import MyLoader from '../../../components/MyLoader';
import RenderHTML from 'react-native-render-html';
import { FontsStyle } from '../../../config/constants';

const Daily = ({ basicDetails, dispatch, MYallhoroscope, isLoading }) => {

  const [selectedTab, setSelectedTab] = useState('daily');
  const navigation = useNavigation();
  const { t } = useTranslation();
  const route = useRoute();
  const sign = route.params?.horoscope || 'aries';

  // console.log("signsign", MYallhoroscope?.monthly)
  console.log("MYallhoroscope", MYallhoroscope?.dailytag?.business)

  useEffect(() => {
    const payload = {
      lat: basicDetails?.lat || 28.6139,
      lon: basicDetails?.lon || 77.2090,
      planet_name: sign[0].toUpperCase() + sign.slice(1).toLowerCase(),
      lang: t('lang')
    };
    console.log("payload", payload)
    dispatch(KundliActions.getMyallHoroscope(payload));
  }, [sign]);

  if (isLoading) {
    return <MyLoader />;
  }

  const TodaybarData = [
    { value: MYallhoroscope?.dailytag?.love || 0, label: t('Love'),name:'love', frontColor: "#FF4500" },
    { value: MYallhoroscope?.dailytag?.wealth || 0, label: t('Wealth'),name:'wealth', frontColor: "green" },
    { value: MYallhoroscope?.dailytag?.health || 0, label: t('Health'),name:'health', frontColor: "blue" },
    { value: MYallhoroscope?.dailytag?.business || 0, label: t('Business'),name:'business', frontColor: "purple" },
    { value: MYallhoroscope?.dailytag?.career || 0, label: t('Career'),name:'career', frontColor: "#FFA500" },
    { value: MYallhoroscope?.dailytag?.luck || 0, label: t('Luck'),name:'luck', frontColor: "#53cb8b" },
  ];


  const WeeklybarData = [
    { value: MYallhoroscope?.weeklytag?.love || 0, label: t('Love'),name:'love', frontColor: "#FF4500" },
    { value: MYallhoroscope?.weeklytag?.wealth || 0, label: t('Wealth'),name:'wealth', frontColor: "green" },
    { value: MYallhoroscope?.weeklytag?.health || 0, label: t('Health'),name:'health', frontColor: "blue" },
    { value: MYallhoroscope?.weeklytag?.business || 0, label: t('Business'),name:'business', frontColor: "purple" },
    { value: MYallhoroscope?.weeklytag?.career || 0, label: t('Career'),name:'career', frontColor: "#FFA500" },
    { value: MYallhoroscope?.weeklytag?.luck || 0, label: t('Luck'),name:'luck', frontColor: "#53cb8b" },
  ];


  const MonthlybarData = [
    { value: MYallhoroscope?.monthlytag?.love || 0, label: t('Love'),name:'love', frontColor: "#FF4500" },
    { value: MYallhoroscope?.monthlytag?.wealth || 0, label: t('Wealth'),name:'wealth', frontColor: "green" },
    { value: MYallhoroscope?.monthlytag?.health || 0, label: t('Health'),name:'health', frontColor: "blue" },
    { value: MYallhoroscope?.monthlytag?.business || 0, label: t('Business'),name:'business', frontColor: "purple" },
    { value: MYallhoroscope?.monthlytag?.career || 0, label: t('Career'),name:'career', frontColor: "#FFA500" },
    { value: MYallhoroscope?.monthlytag?.luck || 0, label: t('Luck'),name:'luck', frontColor: "#53cb8b" },
  ];


  const YearlybarData = [
    { value: MYallhoroscope?.yearlytag?.love || 0, label: t('Love'),name:'love', frontColor: "#FF4500" },
    { value: MYallhoroscope?.yearlytag?.wealth || 0, label: t('Wealth'),name:'wealth', frontColor: "green" },
    { value: MYallhoroscope?.yearlytag?.health || 0, label: t('Health'),name:'health', frontColor: "blue" },
    { value: MYallhoroscope?.yearlytag?.business || 0, label: t('Business'),name:'business', frontColor: "purple" },
    { value: MYallhoroscope?.yearlytag?.career || 0, label: t('Career'),name:'career', frontColor: "#FFA500" },
    { value: MYallhoroscope?.yearlytag?.luck || 0, label: t('Luck'),name:'luck', frontColor: "#53cb8b" },
  ];

  const cleanHtml = (text) => {
  const cleanHTML = text
    ?.replace(/<font[^>]*>/g, '<span style="color:green">')
    ?.replace(/<\/font>/g, '</span>');
  
  console.log('Text Html: ', cleanHTML);
  return cleanHTML;
};


  return (
    <ScrollView style={{ backgroundColor: '#F8E8D9', flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('Daily Horoscope')}</Text>
      </View>

      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03, alignItems: "center" }}>
        <Text style={{ ...Fonts.PoppinsBold }}>
          {t("rashi")} : {sign[0].toUpperCase() + sign.slice(1).toLowerCase()}
        </Text>
      </View>



      <View style={styles.toggleContainer}>
        {['daily', 'weekly', 'monthly', 'yearly'].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setSelectedTab(item)}
            style={[
              styles.toggleButton,
              selectedTab === item && styles.toggleButtonActive,
            ]}
          >
            <Text style={[
              styles.toggleText,
              selectedTab === item && styles.toggleTextActive
            ]}>
              {t(`${item.charAt(0).toUpperCase() + item.slice(1)}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab === 'daily' && (
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
          <View style={{ alignItems: "center", paddingBottom: SCREEN_HEIGHT * 0.02 }}>
            <Text style={styles.title}>{t("Today’s Horoscope")}</Text>
            <Text style={styles.title}>( {moment(new Date()).format('DD-MM-YYYY')} )</Text>
          </View>
          {/* <Text style={styles.content}>
            {MYallhoroscope?.daily?.replace(/<[^>]+>/g, '')}
          </Text> */}
          <RenderHTML
            contentWidth={SCREEN_WIDTH}
            baseStyle={styles.content}
            source={{ html: MYallhoroscope?.daily }}
            tagsStyles={{
              h1: { fontSize: 24, fontWeight: 'bold', color: 'red', marginBottom: 10, ...FontsStyle.font, },
              h2: { fontSize: 22, fontWeight: 'bold', color: 'red', marginBottom: 8, ...FontsStyle.font, },
              h3: { fontSize: 20, fontWeight: 'bold', color: 'red', marginBottom: 6, ...FontsStyle.font, },
              p: { fontSize: 14, color: 'black', marginBottom: 5, ...FontsStyle.font, },
              li: { fontSize: 16, color: 'black', marginBottom: 5, ...FontsStyle.font, },
              ol: { fontSize: 16, color: 'black', marginBottom: 5, ...FontsStyle.font, },
              font: { fontSize: 16, color: 'black', marginBottom: 5, ...FontsStyle.font, },
              b: { fontSize: 16, color: 'black', marginBottom: 5, ...FontsStyle.font, },
            }}
            renderersProps={{
              font: {
                enableUserStyles: true, // allow inline color
              }
            }}
          />



          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>

              <View style={styles.percentageRow}>
                {TodaybarData.map((item, index) => {
                  const key = item.name?.toLowerCase?.(); // normalize key
                  const value = MYallhoroscope?.dailytag?.[key] ?? 0;
                  console.log('value ', value)
                  return (
                    <View key={index} style={styles.barWrapper}>
                      <Text style={styles.percentageText}>
                        {value}%
                      </Text>
                    </View>
                  );
                })}
              </View>


              <BarChart
                barWidth={35}
                noOfSections={4}
                barBorderRadius={4}
                frontColor="lightblue"
                data={TodaybarData}
                yAxisThickness={1}
                xAxisThickness={1}
                xAxisLabelTextStyle={styles.chartLabel}
                yAxisTextStyle={styles.chartLabel}
                width={TodaybarData.length * 60}
              />
            </View>
          </ScrollView>


        </View>
      )}

      {selectedTab === 'weekly' && (
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
          <View style={{ alignItems: "center", paddingBottom: SCREEN_HEIGHT * 0.02 }}>
            <Text style={styles.title}>{t("This Week’s Horoscope")}</Text>
            <Text style={styles.title}>({`${moment().startOf('week').format('DD-MM-YYYY')}  to  ${moment().endOf('week').format('DD-MM-YYYY')}`})</Text>
          </View>

          <RenderHTML
            contentWidth={SCREEN_WIDTH}
            baseStyle={styles.content}
            source={{ html: MYallhoroscope?.weekly }}
             tagsStyles={{
                   p: { fontSize: 14, color: 'black', marginBottom: 5, ...FontsStyle.font, },
                  // b: { fontWeight: 'bold', color: 'red' },
                  span: { fontSize: 16, ...FontsStyle.font, }, // will be used for <span style="color:...">
                  ol: { paddingLeft: 20, ...FontsStyle.font, },
                  li: { marginBottom: 5, ...FontsStyle.font,},
                }}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>

              <View style={styles.percentageRow}>
                {WeeklybarData.map((item, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <Text style={styles.percentageText}>
                      {MYallhoroscope?.weeklytag?.[item.name.toLowerCase()] ?? 0}%
                    </Text>
                  </View>
                ))}
              </View>


              <BarChart
                barWidth={35}
                noOfSections={4}
                barBorderRadius={4}
                frontColor="lightblue"
                data={WeeklybarData}
                yAxisThickness={1}
                xAxisThickness={1}
                xAxisLabelTextStyle={styles.chartLabel}
                yAxisTextStyle={styles.chartLabel}
                width={WeeklybarData.length * 60}
              />
            </View>
          </ScrollView>
          <View style={{ paddingVertical: SCREEN_HEIGHT * 0.04 }}></View>


        </View>
      )}

      {selectedTab === 'monthly' && (
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.06 }}>
          <View style={{ alignItems: "center", paddingBottom: SCREEN_HEIGHT * 0.02 }}>
            <Text style={styles.title}>{t("This Month’s Horoscope")}</Text>
            <Text style={styles.title}> ({`${moment().startOf('month').format('DD-MM-YYYY')}  to  ${moment().endOf('month').format('DD-MM-YYYY')}`})</Text>
          </View>


          <RenderHTML
            contentWidth={SCREEN_WIDTH}
            baseStyle={styles.content}
            source={{ html: MYallhoroscope?.monthly }}
             tagsStyles={{
                   p: { fontSize: 14, color: 'black', marginBottom: 5 , ...FontsStyle.font,},
                  // b: { fontWeight: 'bold', color: 'red' },
                  span: { fontSize: 16, ...FontsStyle.font, }, // will be used for <span style="color:...">
                  
                }}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>

              <View style={styles.percentageRow}>
                {MonthlybarData.map((item, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <Text style={styles.percentageText}>
                      {MYallhoroscope?.monthlytag?.[item.name.toLowerCase()] ?? 0}%
                    </Text>
                  </View>
                ))}
              </View>


              <BarChart
                barWidth={35}
                noOfSections={4}
                barBorderRadius={4}
                frontColor="lightblue"
                data={MonthlybarData}
                yAxisThickness={1}
                xAxisThickness={1}
                xAxisLabelTextStyle={styles.chartLabel}
                yAxisTextStyle={styles.chartLabel}
                width={MonthlybarData.length * 60}
              />
            </View>
          </ScrollView>

          <View style={{ paddingVertical: SCREEN_HEIGHT * 0.04 }}>

          </View>


        </View>
      )}

      {selectedTab === 'yearly' && (
        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
          <View style={{ alignItems: "center", paddingBottom: SCREEN_HEIGHT * 0.02 }}>
            <Text style={styles.title}>{t("This Year’s Horoscope")}</Text>
            <Text style={styles.title}>({`01-01-${moment().format('YYYY')}  to  31-12-${moment().format('YYYY')}`})</Text>
          </View>

          <RenderHTML
            contentWidth={SCREEN_WIDTH}
            baseStyle={styles.content}
            source={{ html: cleanHtml(MYallhoroscope?.yearly) }}
             tagsStyles={{
                   p: { fontSize: 14, color: 'black', marginBottom: 5, ...FontsStyle.fontfamily, },
                  b: { fontWeight: 'bold', color: 'green', ...FontsStyle.fontfamily, },
                  span: { fontSize: 16, fontWeight:'bold', ...FontsStyle.fontfamily , }, // will be used for <span style="color:...">
                  ol: { paddingLeft: 20 },
                  li: { marginBottom: 5 },
                }}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>

              <View style={styles.percentageRow}>
                {YearlybarData.map((item, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <Text style={styles.percentageText}>
                      {MYallhoroscope?.yearlytag?.[item.name.toLowerCase()] ?? 0}%
                    </Text>
                  </View>
                ))}
              </View>


              <BarChart
                barWidth={35}
                noOfSections={4}
                barBorderRadius={4}
                frontColor="lightblue"
                data={YearlybarData}
                yAxisThickness={1}
                xAxisThickness={1}
                xAxisLabelTextStyle={styles.chartLabel}
                yAxisTextStyle={styles.chartLabel}
                width={YearlybarData.length * 60}
              />
            </View>
          </ScrollView>
          <View style={{ paddingVertical: SCREEN_HEIGHT * 0.04 }}>

          </View>
        </View>
      )}
    </ScrollView>

  );
};

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  MYallhoroscope: state.kundli.MYallhoroscope,
  isLoading: state.setting.isLoading,
});

export default connect(mapStateToProps)(Daily);

const styles = StyleSheet.create({
  title: {
    ...FontsStyle.font,
    fontWeight:'bold',
    fontSize: responsiveFontSize(2),
    textAlign: "justify",
    marginTop: 10,
  },
  content: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.5),
    alignSelf: "center"
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.06,
    marginBottom: 10,
    backgroundColor: "white", paddingVertical: SCREEN_HEIGHT * 0.02
  },
  headerText: {
    ...FontsStyle.font,
    fontWeight:'bold'
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    gap: SCREEN_WIDTH * 0.03,
    flexWrap: 'wrap',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E0D4C3',
  },
  toggleButtonActive: {
    backgroundColor: '#B67E5E',
  },
  toggleText: {
    ...FontsStyle.font,
    fontWeight:'700',
    fontSize: responsiveFontSize(1.7),
    color: '#000',
  },
  toggleTextActive: {
    color: '#fff',
     ...FontsStyle.fontfamily,
  },
  percentageRow: {
    flexDirection: 'row',
    gap: SCREEN_WIDTH * 0.08,
    left: SCREEN_WIDTH * 0.12,
    paddingVertical: 10,

  },
  percentageText: {
     ...FontsStyle.font,
    fontSize: responsiveFontSize(1.3)
  },
  chartLabel: {
    ...FontsStyle.font,
    fontSize: responsiveFontSize(1.5)
  },
});
