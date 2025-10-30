import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MyAstakvarga from './MyAstakvarga';
import MySarvastak from '../MySarvastak';
import { FontsStyle } from '../../../config/constants';
import { useTranslation } from 'react-i18next';

const LabelAstakvarga = () => {
  const [activeTab, setActiveTab] = useState('Astakvarga');
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === 'Astakvarga' && styles.activeToggleButton
          ]}
          onPress={() => setActiveTab('Astakvarga')}
        >
          <Text style={[
            styles.toggleText,
            activeTab === 'Astakvarga' && styles.activeToggleText
          ]}>
            {t("Astakvarga")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === 'Sarvastakvarga' && styles.activeToggleButton
          ]}
          onPress={() => setActiveTab('Sarvastakvarga')}
        >
          <Text style={[
            styles.toggleText,
            activeTab === 'Sarvastakvarga' && styles.activeToggleText
          ]}>
            {t("Sarvastakvarga")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'Astakvarga' ? <MyAstakvarga /> : <MySarvastak />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  toggleContainer: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    ...FontsStyle.fontfamily,
  },
  activeToggleButton: {
    backgroundColor: 'tomato',
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
    ...FontsStyle.fontBold,
  },
  activeToggleText: {
    color: '#fff',
    ...FontsStyle.fontfamily,
  },
  contentContainer: {
    flex: 1,
  },
});

export default LabelAstakvarga;