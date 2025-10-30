import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';

// 🧹 Function to remove HTML tags from string
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

const Yantra = ({ basicDetails, dispatch, Yantradata }) => {
  console.log("Yantradata", Yantradata);

  useEffect(() => {
    if (basicDetails?.lat && basicDetails?.lon) {
      const payload = {
        lat: basicDetails.lat,
        lon: basicDetails.lon
      };
      console.log(payload, 'payload');
      dispatch(KundliActions.getYantra(payload));
    }
  }, [basicDetails?.lat, basicDetails?.lon, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{Yantradata?.heading}</Text>
        <Text style={styles.todayYantra}>
         Yantra: {Yantradata?.yantra}
        </Text>
      </View>

      <Text style={styles.description}>
        {stripHtmlTags(Yantradata?.resp)}
      </Text>
    </View>
  )
}

const mapStateToProps = (state) => ({
  basicDetails: state.kundli.basicDetails,
  Yantradata: state.kundli.Yantradata,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Yantra);

const styles = StyleSheet.create({
  container: {
    padding: SCREEN_HEIGHT * 0.02,
    backgroundColor: '#F8E8D9'
  },
  header: {
    alignItems: "center",
    paddingVertical: SCREEN_HEIGHT * 0.02,
    gap: 10
  },
  heading: {
    ...Fonts.PoppinsBold,
    fontSize: responsiveFontSize(1.9),
    textAlign: "justify"
  },
  todayYantra: {
    ...Fonts.PoppinsBold,
    fontSize: responsiveFontSize(1.9),
    textAlign: "justify"
  },
  description: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.6),
    textAlign: "justify"
  }
});
