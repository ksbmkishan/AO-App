import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Colors } from '../../config/Screen';
import { Fonts, Sizes } from '../../assets/style';
import * as SanatanActions from '../../redux/actions/sanatanActions'
import { useDispatch } from 'react-redux';
import { colors } from '../../config/Constants1';
import MyHeader from '../../components/MyHeader';
import { FontsStyle, normalize } from '../../config/constants';
import { signSecrets } from '../../json/signSecrets';
import { useTranslation } from 'react-i18next';
import { signSecretsHindi } from '../../json/signHindi';



const englishToHindiMap = {
  Aries: 'मेष राशि',
  Taurus: 'वृषभ राशि',
  Gemini: 'मिथुन राशि',
  Cancer: 'कर्क राशि',
  Leo: 'सिंह राशि',
  Virgo: 'कन्या राशि',
  Libra: 'तुला राशि',
  Scorpio: 'वृश्चिक राशि',
  Sagittarius: 'धनु राशि',
  Capricorn: 'मकर राशि',
  Aquarius: 'कुंभ राशि',
  Pisces: 'मीन राशि',
};



const SignSecret = ({ navigation }) => {
  const route = useRoute();
  const { signName } = route.params || {};
  const dispatch = useDispatch();
  const {t} = useTranslation();

  // Convert English name to Hindi if needed
  const hindiSignName = englishToHindiMap[signName] || signName;
  console.log('sign hindi ', hindiSignName)
  const descriptionData = t('lang') == 'en' ? signSecrets[hindiSignName] : signSecretsHindi[hindiSignName];

  console.log('Received signName:', signName);
  console.log('Mapped to Hindi:', hindiSignName);
  console.log('Sign Description:', descriptionData);
  console.log('Details::', descriptionData?.details);

  if (!descriptionData || !descriptionData.details) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No details available for {hindiSignName}
        </Text>
      </View>
    );
  }

  const details = descriptionData.details;

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={'Sign Secret'} navigation={navigation} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={{ ...FontsStyle.font, bottom: 4 }}>
            {details?.title}
          </Text>
          <View style={{ gap: 10 }}>
            <Text style={styles.description}>{descriptionData.description}</Text>

            <Text style={styles.sectionHeader}>🌟 Basic Profile</Text>
            <Text style={styles.detailText}>🔹 Nature: {details.nature}</Text>
            <Text style={styles.detailText}>
              🔹 Ruling Planet: {details.rulingPlanet}
            </Text>
            <Text style={styles.detailText}>
              🔹 Zodiac Number: {details.zodiacNumber}
            </Text>
            <Text style={styles.detailText}>🔹 Symbol: {details.symbol}</Text>
            <Text style={styles.detailText}>
              🔹 Lucky Colors: {details.luckyColors}
            </Text>
            <Text style={styles.detailText}>
              🔹 Lucky Numbers: {details.luckyNumbers}
            </Text>
            <Text style={styles.detailText}>
              🔹 Day of Power: {details.dayOfPower}
            </Text>

            <Text style={styles.sectionHeader}>💖 Compatibility</Text>
            <Text style={styles.detailText}>
              ✅ Best Matches: {details.compatibility.bestMatches}
            </Text>
            <Text style={styles.detailText}>
              🚫 Challenging Matches: {details.compatibility.challengingMatches}
            </Text>

            <Text style={styles.sectionHeader}>⚡ Key Personality Traits</Text>
            {details.personalityTraits.map((trait, index) => (
              <Text key={index} style={styles.detailText}>
                ✔ {trait}
              </Text>
            ))}

            <Text style={styles.sectionHeader}>🏆 Strengths & Weaknesses</Text>
            <Text style={styles.detailText}>✅ Strengths:</Text>
            {details.strengths.map((strength, index) => (
              <Text key={index} style={styles.detailText}>
                • {strength}
              </Text>
            ))}
            <Text style={styles.sectionHeader}>❌ Weaknesses:</Text>
            {details.weaknesses.map((weakness, index) => (
              <Text key={index} style={styles.detailText}>
                • {weakness}
              </Text>
            ))}

            <Text style={styles.sectionHeader}>🔥 Do’s & Don’ts for Aries</Text>
            {
              details.dos.map((dos, index) => (
                <Text key={index} style={styles.detailText}> • {dos}</Text>
              ))
            }
            <Text style={styles.sectionHeader}>❌ Don’ts:</Text>

            {
              details.donts.map((donts, index) => (
                <Text key={index} style={styles.detailText}> • {donts}</Text>
              ))
            }

            <Text style={styles.sectionHeader}>🔮 Fun & Catchy Aries Facts</Text>

            {
              details.funFacts.map((funFacts, index) => (
                <Text key={index} style={styles.detailText}> • {funFacts}</Text>
              ))
            }

            <Text style={styles.sectionHeader}>✨ Final Thought</Text>

            {
              details.finalThought.map((finalThought, index) => (
                <Text key={index} style={styles.detailText}> • {finalThought}</Text>
              ))
            }

            <Text style={styles.sectionHeader}>🔮 Unlock Your Zodiac Power! ✨</Text>
            <Text style={styles.detailText}>  {details?.ZodicPower}</Text>
            <Text style={[styles.detailText]}>Ruling Planet: {details?.RulingPlanet}</Text>

            <Text style={[styles.detailText]}> God: {details?.God}</Text>
            <TouchableOpacity
            onPress={() => {
              dispatch(SanatanActions.setSantanVisibleIndex(details?.link));
              dispatch(SanatanActions.setSantanCurrentIndex(0));
              navigation.navigate('Sanatan');
            }}
            style={{alignSelf: 'center',backgroundColor:colors.background_theme2,borderRadius:Sizes.fixPadding, padding:Sizes.fixPadding}}
            >
              <Text style={{color:'white'}}>{details?.God}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignSecret;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.fixPadding,
    backgroundColor: Colors.white,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 15,
    textAlign: 'center',
    ...FontsStyle.font
  },
  description: {
    ...FontsStyle.font,
    fontSize: normalize(15),
  },
  sectionHeader: {
    ...FontsStyle.font,
    fontSize: normalize(15),
  },
  detailText: {
    ...FontsStyle.font,
    fontSize: normalize(15),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: Colors.red,
  },
});
