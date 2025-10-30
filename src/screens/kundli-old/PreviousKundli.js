import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts, getFontSize } from '../../config/Constants1'
import { Fonts, Sizes } from '../../assets/style'
import { RefreshControl } from 'react-native-gesture-handler'
import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import * as KundliActions from '../../redux/actions/KundliActions';
import { useNavigation } from '@react-navigation/native'
const PreviousKundli = ({ kundliMatching, dispatch }) => {

  console.log("kundliMatching",kundliMatching)

  const navigation = useNavigation();

  const { t } = useTranslation();



  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(KundliActions.getKundliMatching());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(KundliActions.getKundliMatching());
  }

  const _listEmpty = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: getFontSize(1.4), color: colors.black_color7, fontFamily: Fonts.medium }}>No previous Kundli found.</Text>
      </View>
    )
  }

  const handleMatching = (item) => {
    const femaleKundliData = {
      name: item.FemaleName,
      gender: 'female',
      dob: item.FemaledateOfBirth,
      tob: item.FemaletimeOfBirth,
      place: item?.FemaleplaceOfBirth,
      lat: item?.Femalelatitude,
      lon: item?.Femalelongitude,
    };

    const maleKundliData = {
      name: item.MaleName,
      gender: 'male',
      dob: item.MaledateOfBirth,
      tob: item.MaletimeOfBirth,
      place: item?.MaleplaceOfBirth,
      lat: item?.Malelatitude,
      lon: item?.Malelongitude,
    };

    const matchingPayload = {
      m_day: parseInt(moment(item.MaledateOfBirth).format('D')),
      m_month: parseInt(moment(item.MaledateOfBirth).format('M')),
      m_year: parseInt(moment(item.MaledateOfBirth).format('YYYY')),
      m_hour: parseInt(moment(item.MaletimeOfBirth).format('hh')),
      m_min: parseInt(moment(item.MaletimeOfBirth).format('mm')),
      m_lat: item.Malelatitude,
      m_lon: item.Malelongitude,
      m_tzone: 5.5,
      f_day: parseInt(moment(item.FemaledateOfBirth).format('D')),
      f_month: parseInt(moment(item.FemaledateOfBirth).format('M')),
      f_year: parseInt(moment(item.FemaledateOfBirth).format('YYYY')),
      f_hour: parseInt(moment(item.FemaletimeOfBirth).format('hh')),
      f_min: parseInt(moment(item.FemaletimeOfBirth).format('mm')),
      f_lat: item.Femalelatitude,
      f_lon: item.Femalelongitude,
      f_tzone: 5.5,
    }
    dispatch(KundliActions.setFemaleKundliData(femaleKundliData))
    dispatch(KundliActions.setMaleKundliData(maleKundliData))
    navigation.navigate("basicmatch")

  }

  const handel_delete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'No',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Perform delete action here
            handel_confirm(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handel_confirm = (id) => {

    const payload = {
      id: id,
    }
    console.log('payload', payload)
    dispatch(KundliActions.deleteKundliMatching(payload));
  }

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
            marginVertical: 15,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: '#ccc',
            padding: 2,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 4,
          }}>
          <TouchableOpacity style={{ height: 20, width: 20 }}>
            {/* <Image source={require('../../assets/images/Search.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} /> */}
          </TouchableOpacity>

          <TextInput
            placeholder={t("s_k_b_n")}
            placeholderTextColor={colors.black_color5}
            // onChangeText={text => searchFilterFunction(text)}
            style={{
              fontSize: getFontSize(1.5),
              color: colors.black_color7,
              ...Fonts.primaryHelvetica,
              padding: 5,
              flex: 1
            }}
          />



        </View>

        <View style={{ paddingHorizontal: Sizes.fixPadding }}>
          <Text
            style={{
              ...Fonts.primaryHelvetica,
              color: 'black'
            }}>
            {t("recent_kundli")}
          </Text>

          <FlatList
            data={kundliMatching}
            ListEmptyComponent={_listEmpty}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#007AFF']} // Customize the loading spinner color
              />
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleMatching(item)}
                activeOpacity={0.6}
                key={index}
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: colors.background_theme1,
                  marginBottom: 15,
                  borderRadius: 5,
                  shadowColor: colors.black_color4,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                }}>
                <View
                  style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>

                  <View style={{ marginLeft: 10, width: '35%' }}>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: 14,
                        color: colors.black_color,
                        fontFamily: fonts.bold,
                        fontWeight: 'bold'
                      }}>
                      {item.MaleName}
                    </Text>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: 11,
                        color: colors.black_color7,
                        fontFamily: fonts.medium,
                      }}>
                      {`${moment(item.MaledateOfBirth).format("DD-MM-YYYY")} ${moment(item.MaletimeOfBirth).format("hh:mm A")}`}
                    </Text>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: 12,
                        color: colors.black_color7,
                        fontFamily: fonts.medium,
                      }}>
                      {item.MaleplaceOfBirth}
                    </Text>
                  </View>
                  <View style={{ paddingHorizontal: Sizes.fixPadding * 2 }}>
                    <FontAwesome name='heart' size={20} color={'red'} />
                  </View>
                  <View style={{ marginLeft: 10, width: '35%' }}>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: 14,
                        color: colors.black_color,
                        fontFamily: fonts.bold,
                        fontWeight: 'bold'
                      }}>
                      {item.FemaleName}
                    </Text>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: 11,
                        color: colors.black_color7,
                        fontFamily: fonts.medium,
                      }}>
                      {`${moment(item.FemaledateOfBirth).format("DD-MM-YYYY")} ${moment(item.FemaletimeOfBirth).format("hh:mm A")}`}
                    </Text>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: 12,
                        color: colors.black_color7,
                        fontFamily: fonts.medium,
                      }}>
                      {item.FemaleplaceOfBirth}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={{ right: 10, position: 'absolute' }}
                  onPress={() => handel_delete(item._id)}>
                  <MaterialIcons
                    name="delete"
                    color={colors.black_color7}
                    size={25}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />


        </View>

      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  kundliMatching: state.kundli.kundliMatching
})

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PreviousKundli)

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center"
  }
})