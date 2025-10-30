import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import AstvargAscendant from './ASTVARG/AstvargAscendant';
import AstakSun from './ASTVARG/AstakSun';
import AstakMars from './ASTVARG/AstakMars';
import AstakMoon from './ASTVARG/AstakMoon';
import AstvargVenus from './ASTVARG/AstvargVenus';
import AstvargJupiter from './ASTVARG/AstvargJupiter';
import AstvargSaturn from './ASTVARG/AstvargSaturn';
import AstvargMercury from './ASTVARG/AstvargMercury';
import { Fonts } from '../../assets/style';

const { height } = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const Ashtakvarga = ({ navigation, dispatch }) => {
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(KundliActions.getAstakReports());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, }}>
      <View style={{ gap: 10 }}>
        <Text style={{ ...Fonts.primaryHelvetica, color: 'black', fontWeight: '700' }}>Ashtakvarga Chart</Text>
        <Text style={{ ...Fonts.primaryHelvetica, color: 'gray', fontSize: 14, }}>Ashtakavarga, a key tool in Indian astrology, offers a detailed analysis of planetary influences on individual lives. By examining the points assigned to planets in different houses, astrologers can predict strengths, vulnerabilities, and growth periods accurately</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: { display: 'none' },
          tabBarStyle: { padding: 4 },
          tabBarLabelStyle: { ...Fonts.primaryHelvetica, fontSize: 12 },
          tabBarGap: 10,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name={t('ascendant')} component={AstvargAscendant} />
        <Tab.Screen name={t('sun')} component={AstakSun} />
        <Tab.Screen name={t('mars')} component={AstakMars} />
        <Tab.Screen name={t('moon')} component={AstakMoon} />
        <Tab.Screen name={t('jupiter')} component={AstvargJupiter} />
        <Tab.Screen name={t('mercury')} component={AstvargMercury} />
        <Tab.Screen name={t('saturn')} component={AstvargSaturn} />
        <Tab.Screen name={t('venus')} component={AstvargVenus} />
      </Tab.Navigator>
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[
              styles.tabItem,
              {
                borderColor: isFocused ? '#31CBE2' : 'black',
                backgroundColor: isFocused ? '#31CBE2' : '#F4F4F4',
              },
            ]}
          >
            <Text style={{ color: isFocused ? 'black' : 'black' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  customerData: state.customer.customerData,
  isLoading: state.setting.isLoading,
  getAstakReports: state.kundli.getAstakReports,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Ashtakvarga);

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
