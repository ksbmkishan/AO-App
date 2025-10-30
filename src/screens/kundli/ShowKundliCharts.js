import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import LagnaChart from './charts/LagnaChart';
import MoonChart from './charts/MoonChart';
import ChalitChart from './charts/ChalitChart';
import NavamanshaChart from './charts/NavamanshaChart';
import HoraChart from './charts/HoraChart';
import DreshkanChart from './charts/DreshkanChart';
import DashamanshaChart from './charts/DashamanshaChart';
import Shashtymansha from './charts/Shashtymansha';
import DwadasmanshaChart from './charts/DwadasmanshaChart';
import TrishamanshaChart from './charts/TrishamanshaChart';
import KarkanshaChart from './KarkanshaChart';
import SwanshaChart from './SwanshaChart';
import { FontsStyle, normalize } from '../../config/constants';
import { useTranslation } from 'react-i18next';



const ShowKundliCharts = () => {
  const [activeChart, setActiveChart] = useState(1);

  const {t} = useTranslation();

  const charts = [
  { id:1,label: t('lagna'), component: <LagnaChart /> },
  { id:2,label: t('navamansha'), component: <NavamanshaChart /> },
  { id:3,label: t('moon'), component: <MoonChart /> },
  { id:4,label: t('chalit'), component: <ChalitChart /> },
  { id:5,label: t('Hora'), component: <HoraChart /> },
  { id:6,label: t('dreshkan'), component: <DreshkanChart /> },
  { id:7,label: t('Dwadasmansha'), component: <DwadasmanshaChart /> },
  { id:8,label: t('Shashtymansha'), component: <Shashtymansha /> },
  { id:9,label: t('dashamansha'), component: <DashamanshaChart /> },
  { id:10,label: t('trishamansha'), component: <TrishamanshaChart /> },
  { id:11,label: t('Karkansha'), component: <KarkanshaChart /> },
  { id:12,label: t('Swansha'), component: <SwanshaChart /> },
];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {charts.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setActiveChart(item.id)}
            style={[
              styles.tabButton,
              activeChart === item.id && styles.activeTabButton,
            ]}
          >
            <Text style={[styles.tabText, activeChart === item.id && styles.activeTabText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ flex: 1 }}>
        {charts.find((item) => item.id === activeChart)?.component}
      </View>
    </View>
  );
};

export default ShowKundliCharts;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeTabButton: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#000',
    fontWeight: '600',
     ...FontsStyle.fontfamily,
  },
  activeTabText: {
    color: '#fff',
     ...FontsStyle.fontfamily,
     
  },
});
