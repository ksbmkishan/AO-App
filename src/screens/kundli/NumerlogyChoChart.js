import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { FontsStyle, normalize } from '../../config/constants'


const NumerlogyChoChart = ({ basicDetails, dispatch, Expressionsdata, Loshugriddata, Arrowsdata }) => {
  const { t } = useTranslation();

  console.log("Expressionsdata", Expressionsdata)

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place
    };
    dispatch(KundliActions.getLoshuGrid(payload));
    dispatch(KundliActions.getArrows(payload));
    dispatch(KundliActions.getExpressions(payload));
  }, [dispatch]);


  if (
    !Loshugriddata?.data ||
    !Arrowsdata?.data ||
    !Expressionsdata?.data
  ) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8E8D9', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3 }}>
         
        </View>
      </View>
    );
  }


  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.02, backgroundColor: '#F8E8D9' }}>
      <View style={{ paddingBottom: SCREEN_HEIGHT * 0.04 }}>
        <Text style={{ ...FontsStyle.font, fontSize: normalize(16), textAlign: "justify" }}>
          {t("The Lo Shu Grid is a 3×3 grid (the “magic square” of Chinese numerology) used to chart the presence of numbers in one’s birth date. The classic Lo Shu arrangement is")}:
        </Text>
      </View>

      {/* Loshu Grid */}
      <View
        style={{
          flexDirection: 'column',
          borderWidth: 1,
          borderColor: '#000',
          alignSelf: 'center',
        }}
      >
        {Loshugriddata?.data?.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: 'row',
            }}
          >
            {row.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={{
                  width: SCREEN_WIDTH * 0.2,
                  height: SCREEN_WIDTH * 0.2,
                  borderWidth: 1,
                  borderColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: normalize(20), color: '#000' }}>
                  {cell}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Interpretation Section */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.interpretTitle}>{t("Interpreting the Lo Shu Grid")}:</Text>

        <Text style={styles.interpretText}>
          {t("Each row, column, and diagonal of this grid is called a Plane or Arrow, carrying significance")}:
        </Text>

        <Text style={styles.interpretText}>
          {t("Horizontal Planes")}:
          {'\n'}{t("Top row : Mental Plane (Intellect) – presence of these indicates intellectual strength, good memory and analytical ability. Missing any may show gaps in reasoning or memory.")}
          {'\n'}{t("Middle row : Emotional (Soul) Plane – relates to feelings, intuition, and spiritual inclination. Full presence often denotes strong faith or compassion, sometimes called the Arrow of Spirituality or Emotion.")}
          {'\n'}{t("Bottom row : Practical/Material Plane – relates to the physical world, success, and action. Full presence is known as the Arrow of Prosperity, showing drive for wealth and achievement.")}
        </Text>

        <Text style={styles.interpretText}>
          {t("Vertical Planes")}:
          {'\n'}{t("First column : Thought Plane – planning and thinking capacity")}.
          {'\n'}{t("Middle column : Willpower Plane – determination and inner strength.")}
          {'\n'}{t("Last column : Action Plane – ability to act and execute plans.")}
        </Text>

        <Text style={styles.interpretText}>
          {t("Diagonal Planes")}:
          {'\n'}{t("Main diagonal : Sometimes called “Golden Yog” or Success Plane 1, considered a very fortunate combination bringing name, fame, and success.")}
          {'\n'}{t("Other diagonal : “Silver Yog” or Success Plane 2, related to property, stability and grounded energy.")}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.interpretTitle}>{t("Planes of Expression")}</Text>

        <Text style={styles.interpretText}>
          {t("Planes of Expression reflect the dominant traits of a person’s personality and how they express themselves in the world.")}
        </Text>

        <Text style={styles.arrowItemText}>
          • {t("Mental Plane")}: {Expressionsdata?.data?.mental ?? '-'}
        </Text>
        <Text style={styles.arrowItemText}>
          • {t("Emotional Plane")}: {Expressionsdata?.data?.emotional ?? '-'}
        </Text>
        <Text style={styles.arrowItemText}>
          • {t("Physical Plane")}: {Expressionsdata?.data?.physical ?? '-'}
        </Text>
        <Text style={styles.arrowItemText}>
          • {t("Intuitive Plane")}: {Expressionsdata?.data?.intuitive ?? '-'}
        </Text>
      </View>

      {/* Arrow Summary */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.interpretTitle}>{t("Your Arrows")}</Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.arrowSectionTitle}>{t("Strengths")}</Text>
          {Arrowsdata?.data?.strengths?.length > 0 ? (
            Arrowsdata.data.strengths.map((item, index) => (
              <Text key={index} style={styles.arrowItemText}>
                • {item}
              </Text>
            ))
          ) : (
            <Text style={styles.arrowItemText}>{t("No strengths found")}.</Text>
          )}
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.arrowSectionTitle}>{t("Weaknesses")}</Text>
          {Arrowsdata?.data?.weaknesses?.length > 0 ? (
            Arrowsdata.data.weaknesses.map((item, index) => (
              <Text key={index} style={styles.arrowItemText}>
                • {item}
              </Text>
            ))
          ) : (
            <Text style={styles.arrowItemText}>{t("No weaknesses found")}.</Text>
          )}
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.arrowSectionTitle}>{t("Minor Arrows")}</Text>
          {Arrowsdata?.data?.minors?.length > 0 ? (
            Arrowsdata.data.minors.map((item, index) => (
              <Text key={index} style={styles.arrowItemText}>
                • {item}
              </Text>
            ))
          ) : (
            <Text style={styles.arrowItemText}>{t("No minor arrows found")}.</Text>
          )}
        </View>
      </View>
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.1 }}>

      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  Loshugriddata: state.kundli.Loshugriddata,
  Arrowsdata: state.kundli.Arrowsdata,

  Expressionsdata: state.kundli.Expressionsdata,

});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NumerlogyChoChart);

const styles = StyleSheet.create({
  heading: {
    ...FontsStyle.fontBold,
    fontSize: normalize(16),
    marginBottom: SCREEN_HEIGHT * 0.02,
   
  },
  section: {
    marginBottom: SCREEN_HEIGHT * 0.025,
  },
  title: {
    ...FontsStyle.fontfamily,
    fontSize: normalize(16),
    marginVertical: 2,
  },
  subheading: {
    fontSize: normalize(15),
    fontWeight: '600',
    marginBottom: 5,
    color: "black"
  },
  item: {
    fontSize: normalize(16),
    marginLeft: 10,
    color: "black",
    paddingVertical: 2,
  },
  interpretTitle: {
    
    color: 'black',
    marginBottom: 6,
    ...FontsStyle.fontBold,
    fontSize: normalize(16),
  },
  interpretText: {
    color: 'black',
    marginBottom: 10,
    lineHeight: 24,
    ...FontsStyle.fontfamily,
    fontSize: normalize(16),
  },
  arrowSectionTitle: {
    marginBottom: 4,
    color: 'black',
    ...FontsStyle.fontBold,
    fontSize: normalize(14),
  
  },
  arrowItemText: {
    color: 'black',
    lineHeight: 22,
    marginLeft: 8,
    ...FontsStyle.font,
    fontSize: normalize(15),
  },
});
