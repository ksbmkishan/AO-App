import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Fonts } from '../../assets/style'
import { colors } from '../../config/Constants1'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import TranslateText from '../language/TranslateText'

const Numerology2 = ({ basicDetails, dispatch, Mynum2 }) => {

  console.log("TGIULY;OI", basicDetails)

  const { t } = useTranslation();


  useEffect(() => {
    const payload = {
      lang: t('lang'),


    }
    dispatch(KundliActions.getKundliBirthDetails(payload))
  }, [dispatch])

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? ("0" + hours).slice(-2) : 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    const payload = {
      lang: t('lang'),
      gender: basicDetails?.gender,
      name: basicDetails?.name,
      place: basicDetails?.place

    }
    console.log("Mahadev", payload)
    dispatch(KundliActions.getMyNumerology(payload))
  }, [dispatch])


  const friendlyNumbers = Mynum2?.numerlogy?.details?.friendlyNumbers;
  const enemyNumbers = Mynum2?.numerlogy?.details?.enemyNumbers;
  const neutralNumbers = Mynum2?.numerlogy?.details?.neutralNumbers;

  const favcolor = Mynum2?.numerlogy?.details?.favourablecolor
  const favmetal = Mynum2?.numerlogy?.details?.favourableMetal
  const favdirection = Mynum2?.numerlogy?.details?.favourabledirection
  const favthings = Mynum2?.numerlogy?.details?.favourableThings?.slice(0, 3);
  const favdays = Mynum2?.numerlogy?.details?.favourableDays

  const formatNumbers = (numbers) => {
    return Array.isArray(numbers)
      ? numbers.join(",")
      : numbers?.split(" ").join(",");
  };


  return (
    <View style={{ flex: 1, overflow: "hidden" }}>


      <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
        <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
        <Text style={styles.Hedertxt}>
          <TranslateText
            title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
          />
        </Text>

        <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
      </View>


      {Top()}
      {Content()}

    </View>
  )

  function Top() {
    return (

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SCREEN_WIDTH * 0.1,
          elevation: 1,
          paddingVertical: SCREEN_HEIGHT * 0.02,
          backgroundColor: colors.background_theme2,
          borderRadius: 10,
          top: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: 20, color: colors.white_color }}>
            <TranslateText title={Mynum2?.numerlogy?.radicalNumber?.toString()} />
          </Text>
          <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color }}>
            <TranslateText title="Radical" />
          </Text>
          <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color }}>
            <TranslateText title="Number" />
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: 20, color: colors.white_color }}>
            <TranslateText title={Mynum2?.numerlogy?.destinyNumber?.toString()} />
          </Text>
          <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color }}>
            <TranslateText title="Destiny" />
          </Text>
          <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color }}>
            <TranslateText title="Number" />
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ ...Fonts.black11InterMedium, fontSize: 20, color: colors.white_color }}>
            <TranslateText title={Mynum2?.numerlogy?.nameNumber?.toString()} />
          </Text>
          <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color }}>
            <TranslateText title="Name" />
          </Text>
          <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color }}>
            <TranslateText title="Number" />
          </Text>
        </View>
      </View>


    )
  }

  function Content() {
    return (

      <View style={{ paddingTop: SCREEN_HEIGHT * 0.035 }}>
        <View
          style={{
            borderWidth: 0.5,
            paddingHorizontal: SCREEN_WIDTH * 0.02,
            paddingVertical: SCREEN_HEIGHT * 0.02,
            borderRadius: 10,
          }}
        >
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Owner" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={Mynum2?.numerlogy?.details?.owner} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Name" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={basicDetails?.name} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Birth Date" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText
                title={
                  basicDetails?.dob
                    ? new Date(basicDetails.dob).toLocaleDateString('en-GB')
                    : ''
                }
              />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Friendly Numbers" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(friendlyNumbers)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Evil Numbers" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(enemyNumbers)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Neutral Numbers" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(neutralNumbers)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Favourable Numbers" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(friendlyNumbers)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Favourable Metal" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(favmetal)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Favourable Color" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(favcolor)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Favourable Things" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(favthings)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Favourable Direction" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(favdirection)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Grains" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={Mynum2?.numerlogy?.details?.grains} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Substance" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={Mynum2?.numerlogy?.details?.substance} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Stone" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={Mynum2?.numerlogy?.details?.stone} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Sub Stone" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={Mynum2?.numerlogy?.details?.subStone} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Herb" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={Mynum2?.numerlogy?.details?.herb} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Favourable Days" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={formatNumbers(favdays)} />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Favourable Mantra" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText
                title={
                  Mynum2?.numerlogy?.details?.favourableMantra
                    ? Mynum2?.numerlogy?.details?.favourableMantra.slice(0, 19) + '...'
                    : ''
                }
              />
            </Text>
          </View>
          <View style={styles.ROWE}>
            <Text style={[styles.textown, { color: '#026135' }]}>
              <TranslateText title="Jap Number" />
            </Text>
            <Text style={styles.textown}>
              <TranslateText title={Mynum2?.numerlogy?.details?.japnumber} />
            </Text>
          </View>
        </View>
      </View>


    )
  }

}

const mapStateToProps = state => ({

  isLoading: state.setting.isLoading,

  basicDetails: state.kundli.basicDetails,
  Mynum2: state.kundli.Mynum2,



})

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(Numerology2);

const styles = StyleSheet.create({
  textown: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.7),

  },
  ROWE: {
    flexDirection: "row", justifyContent: "space-between",
    paddingVertical: SCREEN_HEIGHT * 0.02,
    borderBottomWidth: 1,
    gap: 35
  },
  Hedertxt: {
    ...Fonts.black11InterMedium,
    fontSize: responsiveFontSize(1.7),

  }
})