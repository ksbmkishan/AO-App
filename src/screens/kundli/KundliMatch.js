import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { colors, fonts } from '../../config/Constants1';
import RNSpeedometer from 'react-native-speedometer';
import Modal from 'react-native-modal';
import { useState } from 'react';
import ViewShot from 'react-native-view-shot';
import { useRef } from 'react';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import { mainlogo } from '../../assets/images/Images';
import { Fonts, Sizes } from '../../assets/style';
const { width, height } = Dimensions.get('screen');
import { RadioButton } from 'react-native-paper'
import TranslateText from '../language/TranslateText';
import { RESPONSIVE_WIDTH, SCREEN_WIDTH } from '../../config/Screen';
import RenderHTML from 'react-native-render-html';
import { FontsStyle, normalize } from '../../config/constants';

const KundliMatch = ({ navigation, matchingAshtakootPointsData, maleKundliData, femaleKundliData, dispatch, }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackmodalVisible, setFeedbackModalVisible] = useState(false)
  const [checked, setChecked] = React.useState('');
  console.log('CheckTheData:::KKK', JSON.stringify(matchingAshtakootPointsData))
  const ref = useRef();

  useEffect(() => {
    const payload = {
      lang: t("lang")
    }
    dispatch(KundliActions.getKundliMatchingAshtakootPoints(payload));
  }, []);





  const share_matching = async () => {
    setModalVisible(false);
    ref.current.capture().then(uri => {
      console.log(uri);
      let options = {
        title:
          `Checkout the AstroBook marriage compatibility report for ${matchingAshtakootPointsData[0]?.boyName}  and ${matchingAshtakootPointsData[0]?.girlName}.`,
        url: uri,
      };
      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1, }}>
      <StatusBar backgroundColor={'black'} />
      {matchingAshtakootPointsData &&
        <FlatList
          ListHeaderComponent={
            <>
              <View>
                <View style={{ flex: 1, }}>
                  <View style={{ width: '95%', alignSelf: 'center', marginTop: 50 }}>
                    <View style={{ ...styles.containerBox, backgroundColor: '#FFF6F1', borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t("varna")}</Text>
                        <RenderHTML contentWidth={width} 
                        baseStyle={styles.description}
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.varnaFalit  }}
                        />
                         <View style={{ alignSelf:'center',...styles.circle, }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[0]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[0]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                    </View>

                    <View style={{ ...styles.containerBox, backgroundColor: '#FFF2F9',borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t("Vashya")}</Text>
                        <RenderHTML contentWidth={width} 
                        baseStyle={styles.description}
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.vashyaFalit  }}
                        />
                         <View style={{ ...styles.circle, }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[1]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[1]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                    </View>

                     <View style={{ ...styles.containerBox, backgroundColor: '#FCF2FD',borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t("Tara")}</Text>
                         <RenderHTML contentWidth={width} 
                        baseStyle={styles.description}
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.taraFalit  }}
                        />
                         <View style={{ ...styles.circle, }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[2]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[2]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                    </View>

                     <View style={{ ...styles.containerBox, backgroundColor: '#f1a7a9',borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t("Yoni")}</Text>
                         <RenderHTML contentWidth={width} 
                        baseStyle={styles.description}
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.yoniFalit  }}
                        />
                         <View style={{ ...styles.circle }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[3]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[3]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                      
                    </View>

                    
                    <View style={{ ...styles.containerBox, backgroundColor: '#FCF2FD',borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t("Maitri")}</Text>
                        <RenderHTML contentWidth={width} 
                        baseStyle={styles.description}
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.matriFalit  }}
                        />
                         <View style={{ ...styles.circle }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[4]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[4]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                     
                    </View>

                     <View style={{ ...styles.containerBox, backgroundColor: '#EFFAF4',borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t("Gana")}</Text>
                         <RenderHTML contentWidth={width} 
                        baseStyle={styles.description}
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.ganaFalit  }}
                        />
                          <View style={{ ...styles.circle }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[5]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[5]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                     
                    </View>

                    <View style={{ ...styles.containerBox, backgroundColor: '#EFFAF4', borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t('Bhakoot')}</Text>
                         <RenderHTML contentWidth={width} 
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.bhakootFalit  }}
                        />
                          <View style={{ ...styles.circle, }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[6]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[6]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                    
                    </View>


                    <View style={{ ...styles.containerBox, backgroundColor: '#EEF7FE',borderWidth: 1 }}>
                      <View style={styles.childContainerBox}>
                        <Text allowFontScaling={false} style={styles.heading}>{t("Nadi")}</Text>
                        <RenderHTML contentWidth={width} 
                        baseStyle={styles.description}
                        source={{ html:matchingAshtakootPointsData[0]?.falit?.nadiFalit  }}
                        />
                         <View style={{ ...styles.circle }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...styles.circleText,
                        }}>
                        {`${matchingAshtakootPointsData[0]?.matchData[7]?.obtained}/${matchingAshtakootPointsData[0]?.matchData[7]?.maximum}`}
                      </Text>
                    </View>
                      </View>
                      
                    </View>

                    

                   

                   

                   


                    <Text allowFontScaling={false}
                      style={{
                        textAlign: 'center',
                        fontSize: 22,
                        marginVertical: 20,
                         ...FontsStyle.fontfamily,
                        color: 'black'
                      }}>
                      {t("Report")}
                    </Text>







                    {/* AstroBook Conclusion */}

                    <View
                      style={{
                        flex: 0,
                        padding: 10,
                        backgroundColor: '#BD9343',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: '#BD9343'
                      }}>
                      <Text allowFontScaling={false}
                        style={{
                           ...FontsStyle.fontfamily,
                          color: 'white'
                        }}>
                        {t("astrokunj_conclusion")}
                      </Text>
                      {/* <View style={{ flex: 1, marginTop: 10 }}>
                      <Text allowFontScaling={false}
                        style={{
                           ...FontsStyle.fontfamily,
                          fontSize: 14,
                          color: 'white',
                          lineHeight: 20

                        }}>
                        {matchingAshtakootPointsData[0]?.conclusion?.report}
                      </Text>
                    </View> */}
                      {/* <TouchableOpacity
                      onPress={() => navigation.navigate('Astroforcall')}
                      style={{
                        flex: 0,
                        backgroundColor: colors.background_theme1,
                        marginTop: 20,
                        padding: Sizes.fixPadding,
                        borderRadius: 40
                      }}>
                      <Text allowFontScaling={false}
                        style={{
                           ...FontsStyle.fontfamily,
                          color: 'black'
                        }}>
                        {t("chat_with_astrologer")}
                      </Text>
                    </TouchableOpacity> */}

                      <View style={{ height: SCREEN_WIDTH * 0.9, width: SCREEN_WIDTH * 0.9 }}>
                        <Image source={require('../../assets/images/MatchingReportImage.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                      </View>

                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{
                          flex: 0,
                          marginTop: 20,
                          backgroundColor: 'black',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 30,
                          flexDirection: 'row',
                          gap: Sizes.fixPadding,
                          alignItems: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 10
                        }}>
                        <View style={{ height: 30, width: 30, padding: 2, backgroundColor: 'white', borderRadius: 15 }}>
                          <Image source={require('../../assets/images/MatchingShare.png')} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
                        </View>
                        <Text allowFontScaling={false}
                          style={{
                             ...FontsStyle.fontfamily,
                            color: 'white'
                          }}>
                          {t("share_my")}
                        </Text>
                      </TouchableOpacity>
                    </View>


                  </View>
                </View>

              </View>
            </>
          }

        />
      }




      <Modal
        isVisible={modalVisible}
        deviceWidth={width}
        deviceHeight={Dimensions.get('window').height}
        backdropColor={colors.black_color}
        onBackdropPress={() => setModalVisible(false)}
        onDismiss={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <ViewShot
          ref={ref}
          options={{ fileName: 'Your-File-Name', format: 'jpg', quality: 0.9 }}
          style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../assets/images/space-start.jpeg')}
            style={{ width: '100%', height: '100%', alignSelf: 'center' }}>
            <View
              style={{
                flex: 0.2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../../assets/images/astro-booster.png')}
                style={{
                  width: width * 0.08,
                  height: width * 0.08,
                  resizeMode: 'contain',
                }}
              /> */}
              <Text allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: colors.background_theme2,
                  fontFamily: fonts.semi_bold,
                  marginLeft: 5,
                }}>
                AstroOne
              </Text>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={mainlogo}
                  style={{
                    width: width * 0.9,
                    height: width * 0.13,
                    resizeMode: 'contain',
                  }}
                />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.background_theme1,
                    fontFamily: fonts.semi_bold,
                    marginTop: 10,
                  }}>
                  {maleKundliData?.name}
                </Text>
                {/* <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.red_color1,
                    fontFamily: fonts.medium,
                    marginTop: 5,
                  }}>
                  {t("manglik")}
                </Text> */}
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/wedding-hands.png')}
                  style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={mainlogo}
                  style={{
                    width: width * 0.13,
                    height: width * 0.13,
                    resizeMode: 'contain',
                  }}
                />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.background_theme1,
                    fontFamily: fonts.semi_bold,
                    marginTop: 10,
                  }}>
                  {femaleKundliData?.name}
                </Text>
                {/* <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.red_color1,
                    fontFamily: fonts.medium,
                    marginTop: 5,
                  }}>
                 {t("manglik")}
                </Text> */}
              </View>
            </View>

            <View style={{ flex: 0.42 }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.background_theme2,
                  fontFamily: fonts.semi_bold,
                  textAlign: 'center',
                }}>
                {t("Compatibility_Score")}
              </Text>
              {matchingAshtakootPointsData &&
                <RNSpeedometer
                  value={matchingAshtakootPointsData[0]?.matchData[8]?.obtained ?? 0}
                  size={width * 0.5}
                  maxValue={36}
                  allowedDecimals={1}
                  innerCircleStyle={{ backgroundColor: colors.black_color }}
                  labelStyle={{
                    color: colors.background_theme1,
                    fontFamily: fonts.medium,
                    fontSize: 14,
                  }}
                  labelNoteStyle={{ fontSize: 12, fontFamily: fonts.medium }}
                  labelWrapperStyle={{
                    backgroundColor: colors.black_color,
                    alignSelf: 'center',
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: colors.green_color2,
                    marginTop: 25,
                  }}
                />
              }
            </View>

            {/* <LinearGradient
              colors={[colors.background_theme2, colors.background_theme1]}
              style={{
                flex: 0.3,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 10,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: colors.black_color,
                  fontFamily: fonts.bold,
                  textAlign: 'center',
                }}>
                {t("astrokunj_conclusion")}
              </Text>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 12,
                  color: colors.black_color,
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {matchingAshtakootPointsData?.conclusion?.report}
              </Text>
            </LinearGradient> */}

          </ImageBackground>
        </ViewShot>

        <TouchableOpacity
          onPress={share_matching}
          activeOpacity={0.8}
          style={{
            flex: 0,
            backgroundColor: colors.background_theme2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text allowFontScaling={false}
            style={{
              fontSize: 16,
              color: colors.background_theme1,
              fontFamily: fonts.medium,
            }}>
            {t("share")}
          </Text>
        </TouchableOpacity>
      </Modal>

      <Modal
        isVisible={feedbackmodalVisible}
        deviceWidth={width}
        deviceHeight={Dimensions.get('window').height}
        backdropColor={colors.black_color}
        onBackdropPress={() => setFeedbackModalVisible(false)}
        onDismiss={() => setFeedbackModalVisible(false)}
        onBackButtonPress={() => setFeedbackModalVisible(false)}
      >
        <View style={styles.FeedBackModalContainer}>
          <TouchableOpacity style={{ height: 10, width: 10, alignSelf: 'flex-end' }} onPress={() => { setFeedbackModalVisible(false) }}>
            <Image source={require('../../assets/images/cross2.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} tintColor={'black'} />
          </TouchableOpacity>

          <View style={{ gap: 10 }}>
            <Text style={{  ...FontsStyle.fontfamily, color: 'black' }}>{t("How was Your overall experience of Kundli Matching")}</Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <View>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <RadioButton
                  value="average"
                  status={checked === 'average' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('average')}
                />
                <RadioButton
                  value="improvement"
                  status={checked === 'improvement' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('improvement')}
                />
              </View>
              <View style={{ gap: 18 }}>
                <Text style={{  ...FontsStyle.fontfamily, color: '#4F4E4E' }}>{t("Great")}</Text>
                <Text style={{  ...FontsStyle.fontfamily, color: '#4F4E4E' }}>{t("Average")}</Text>
                <Text style={{  ...FontsStyle.fontfamily, color: '#4F4E4E' }}>{t("Need improvement")}</Text>


              </View>

            </View>
            <View style={{ borderWidth: 0.25, borderColor: '#616161' }}></View>
            {(checked === 'first' || checked === 'average' || checked === 'improvement') && (
              < View >
                <Text style={{  ...FontsStyle.fontfamily, fontWeight: '600', color: 'black' }}>{t("Share Your feedback")}</Text>
                <View style={{ borderWidth: 0.5, borderColor: '#616161', borderRadius: 8 }}>
                  <TextInput placeholder='Shreesh Type here..' multiline={true} />

                </View>
              </View>
            )

            }


            <TouchableOpacity style={{ padding: Sizes.fixPadding, borderRadius: 8, borderWidth: 0.5, borderColor: '#31CBE2', gap: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: Sizes.fixPadding, width: '99%', backgroundColor: '#31CBE2', alignSelf: 'center' }}
              onPress={() => setFeedbackModalVisible(false)}
            >
              <Text style={{  ...FontsStyle.fontfamily, textAlign: 'center', color: 'white' }}>{t("Submit")}</Text>
            </TouchableOpacity>


          </View>

        </View>

      </Modal >

    </View >
  );
};

const mapStateToProps = state => ({
  matchingAshtakootPointsData: state.kundli.matchingAshtakootPointsData,
  maleKundliData: state.kundli.maleKundliData,
  femaleKundliData: state.kundli.femaleKundliData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(KundliMatch);

const styles = StyleSheet.create({
  containerBox: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background_theme3,
    borderRadius: 10,
    shadowColor: colors.black_color5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 15,
  },
  childContainerBox: {
    flex: 1,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  heading: {
   
    color: colors.black_color,
     ...FontsStyle.fontfamily,
    marginBottom: 15,
    textAlign:'center',
     fontSize: normalize(16),
  },
  description: {
    color: colors.black_color,
    ...FontsStyle.font
  },
  circle: {
    flex: 0,
    width: RESPONSIVE_WIDTH(95),
    height: width * 0.1,
   
    borderTopWidth: 2,
    borderColor: colors.background_theme2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: colors.background_theme2,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  circleText: {
   
     ...FontsStyle.fontfamily,
    fontSize: 18,
     color: colors.white_color,
  },
  bottomButtonsContainer: {
    paddingHorizontal: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Sizes.fixPadding,
    gap: Sizes.fixPadding


  },
  FeedBackModalContainer: {
    backgroundColor: 'white',
    padding: Sizes.fixPadding,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10
  },

});
