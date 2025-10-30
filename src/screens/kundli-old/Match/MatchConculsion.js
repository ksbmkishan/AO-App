import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as KundliActions from '../../../redux/actions/KundliActions'
import MyHeader from '../../../components/MyHeader'
import { Fonts } from '../../../assets/style'

const MatchConculsion = ({ dispatch, matchconlusion, navigation, MatchBasicDetails }) => {

  const hour = MatchBasicDetails?.female_astro_details?.hour?.toString().padStart(2, '0');
  const minute = MatchBasicDetails?.female_astro_details?.minute?.toString().padStart(2, '0');
  const ft = `${hour}:${minute}`;
  const hourMale = MatchBasicDetails?.male_astro_details?.hour?.toString().padStart(2, '0');
  const minuteMale = MatchBasicDetails?.male_astro_details?.minute?.toString().padStart(2, '0');
  const mt = `${hourMale}:${minuteMale}`;

  useEffect(() => {
    const payload = {
      ft: ft,
      mt: mt
    }
    console.log("payloadanuj", payload)
    dispatch(KundliActions.getmatchconclusion(payload))
  }, [dispatch])
  console.log("MYmatchconlusion", matchconlusion)

  return (
    <ScrollView style={{backgroundColor: '#F8E8D9',}}>
      <MyHeader title={'Match Report'} navigation={navigation} />
      <View style={{ padding: 10 }}>

        <Text style={{ marginVertical: 4, color: 'black', textAlign: 'justify', ...Fonts.PoppinsMedium }}>{matchconlusion?.data?.['ashtkoot-conclusion']}</Text>
      </View>
    </ScrollView>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch })
const mapStateToProps = state => ({
  matchconlusion: state.kundli.matchconlusion,
  MatchBasicDetails: state.kundli.MatchBasicDetails,
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchConculsion)
