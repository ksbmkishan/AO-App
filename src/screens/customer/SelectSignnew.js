import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import MyLoader from '../../components/MyLoader2';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, SCREEN_WIDTH } from '../../config/Screen';
import MyStatusBar from '../../components/MyStatusbar';
import { useNavigation } from '@react-navigation/native';
import { colors, Fonts, Sizes } from '../../assets/style';
import { signData } from '../../config/data';
import { FontsStyle } from '../../config/constants';

const { width } = Dimensions.get('screen');

const SelectSignnew = props => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const get_horoscope_data = async (horoscope, images) => {
    const zodiacMapping = {
      'मेष राशि': 'Aries',
      'वृषभ राशि': 'Taurus',
      'मिथुन राशि': 'Gemini',
      'कर्क राशि': 'Cancer',
      'सिंह राशि': 'Leo',
      'कन्या राशि': 'Virgo',
      'तुला राशि': 'Libra',
      'वृश्चिक राशि': 'Scorpio',
      'धनु राशि': 'Sagittarius',
      'मकर राशि': 'Capricorn',
      'कुंभ राशि': 'Aquarius',
      'मीन राशि': 'Pisces',
    };

    const englishHoroscope = (zodiacMapping[horoscope] || horoscope).toLowerCase();

    navigate.navigate('dailyhoro', {
      horoscope: englishHoroscope,
      image: images,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/sangrahalay_bg.jpg')}
      style={styles.container}>
      <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons name="chevron-back" size={30} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t("horoscope")}</Text>
      </View>
      <MyLoader isVisible={isLoading} />

      <FlatList
        data={signData()}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.img} style={styles.image} />
            <Text style={styles.title}>{item.text}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => get_horoscope_data(item.text, item.img)}>
              <Text style={styles.buttonText}>{t("horoscope")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secretButton}
              onPress={() =>
                navigate.navigate('SignSecret', { signName: item.text })
              }>
              <Text style={styles.secretButtonText}>{t("Sign Secret")}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default SelectSignnew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.fixPadding,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.06,
    marginBottom: 10,
  },
  headerText: {
    ...FontsStyle.font,
    fontWeight:'bold',
    fontsize:15
  },
  listContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  card: {
    width: width * 0.42,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 10,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    marginVertical: 5,
    ...FontsStyle.font
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  buttonText: {
   ...FontsStyle.font
  },
  secretButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 0.5,
    marginTop: 10,
  },
  secretButtonText: {
    ...FontsStyle.font
  },
});
