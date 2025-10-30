import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  // Modal,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import {
  colors,
  fonts,
  getFontSize,
} from '../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader2';
import { connect } from 'react-redux';
const { width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { base_url, img_url } from '../../config/constants';
import { Colors, Sizes, Fonts } from '../../assets/style';
import * as ChatActions from '../../redux/actions/ChatActions';
import { showNumber, showToastMessage } from '../../utils/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import Stars from 'react-native-stars';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AstrologerDetailes = ({
  route,
  navigation,
  dispatch,
  reviewData,
  astroData,
  isFollow
}) => {
  const { t } = useTranslation();
  const purpose = route.params.type;
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    seeMore: false,
    seeMore1: false
  });
  console.log(astroData?.remedies, 'IMage')

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('astrologer_details')}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(AstrologerActions.getAstrologerData(route?.params?._id));
    return () => {
      dispatch(AstrologerActions.setAstrologerReviewData(null));
    }
  }, [dispatch]);

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data }
      return newData
    })
  }

  const { seeMore, seeMore1 } = state
  console.log(seeMore1, 'muskan')
  return (
    <View style={{ flex: 1, backgroundColor: Colors.grayLight }}>
      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {/* {astroData && astroDetailInfo()} */}
              {astroData && astroDetailInfo()}
              {astroData && chatCallPriceInfo()}
              {astroData?.nextOnline?.date && nextOnlineInfo()}
              {astroData && aboutInfo()}
              {/* {astroData && skillsInfo()} */}
              {astroData && mainExpertiesInfo()}
              {astroData && remediesInfo()}
              {reviewData && ratingInfo()}
              {reviewData && reviewInfo()}
            </>
          }
        />
        {chatCallButtonInfo()}
      </View>
    </View>
  );

  function reviewInfo() {
    const noreviewFound = () => {
      return (
        <View>
          <Text style={{ color: Colors.grayDarkA, textAlign: 'center' }}>No Review Found</Text>
        </View>
      )
    }
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.gray,
            marginBottom: 10,
            padding: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: SCREEN_WIDTH * 0.12,
                  height: SCREEN_WIDTH * 0.12,
                  borderRadius: 100,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{ uri: img_url + item?.customer?.image }}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium }}>
                  {item?.customer?.customerName}
                </Text>
                <Text style={{ ...Fonts.gray14RobotoRegular }}>
                  {moment(item?.createdAt).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <View>
              <Stars
                default={parseFloat(item?.ratings)}
                disabled
                count={5}
                half={true}
                starSize={14}
                fullStar={
                  <Ionicons
                    name={'star'}
                    size={14}
                    color={Colors.primaryLight}
                  />
                }
                emptyStar={
                  <Ionicons
                    name={'star-outline'}
                    size={14}
                    color={Colors.primaryLight}
                  />
                }
                halfStar={
                  <Ionicons
                    size={14}
                    name={'star-half'}
                    style={{ color: Colors.primaryLight }}
                  />
                }
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>

            {item?.comments === '' ? (<Text style={{ ...Fonts.gray12RobotoMedium }}>
              No Comments
            </Text>) : (<Text style={{ ...Fonts.black12RobotoRegular }}>
              {item?.comments}
            </Text>)}
          </View>
        </View>
      );
    };
    return (
      <View
        style={{
          backgroundColor: Colors.white,
        }}>

        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium }}>
            {t('Customer Review')}
          </Text>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <FlatList
            data={reviewData?.reviews?.reverse()}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={noreviewFound()}
          />
        </View>
      </View>
    );
  }


  function ratingInfo() {
    const getFillColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.grayLight;
    };

    const getStarColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.gray;
    };

    return (
      <View
        style={{
          // margin: Sizes.fixPadding * 1.5,
          backgroundColor: Colors.white,
        }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium }}>
            {t('Rating_reviews')}<Text style={{ color: Colors.black }}>({reviewData?.summary?.totalReview})</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: Sizes.fixPadding * 1.5,
          }}>
          <Stars
            default={reviewData?.summary?.averageRating ?? astroData?.rating}
            disabled
            count={5}
            half={true}
            starSize={20}
            fullStar={
              <Ionicons name={'star'} size={20} color={getStarColor(reviewData?.summary?.averageRating ?? 0)} />
            }
            emptyStar={
              <Ionicons
                name={'star-outline'}
                size={20}
                color={getStarColor(reviewData?.summary?.averageRating ?? 0)}
              />
            }
            halfStar={
              <Ionicons
                size={20}
                name={'star-half'}
                style={{ color: getStarColor(reviewData?.summary?.averageRating ?? 0) }}
              />
            }
          />
        </View>
        {['five', 'four', 'three', 'two', 'one'].map((rating, index) => {
          const ratingPercentage = reviewData?.summary[`${rating}Percentage`] ?? 0;
          const ratingCount = reviewData?.summary[`${rating}Rating`] ?? 0;
          const starCount = 5 - index;

          return (
            <View
              key={rating}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: Sizes.fixPadding * 1.5,

              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                    {starCount}
                  </Text>
                  <Ionicons name={'star'} size={14} color={getStarColor(ratingPercentage)} />
                </View>
                <View
                  style={{
                    backgroundColor: Colors.grayLight,
                    width: SCREEN_WIDTH * 0.7,
                    height: SCREEN_WIDTH * 0.04,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: getFillColor(ratingPercentage),
                      width: `${ratingPercentage}%`,
                      height: '100%',
                    }}></View>
                </View>
              </View>
              <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
                {ratingCount}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }


  function mainExpertiesInfo() {
    return (
      <View style={{ backgroundColor: Colors.white, }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, }}>{t('Main Expert')}</Text>
        </View>
        <Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, marginTop: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding * 1.5, }}
        >{astroData?.mainExpertise && astroData?.mainExpertise.map(item => item?.mainExpertise).join(', ')}</Text>
      </View>
    )
  }

  // function remediesInfo() {

  //   return (
  //     <View style={{  backgroundColor: Colors.white, }}>
  //       <View style={{padding:Sizes.fixPadding * 0.4,backgroundColor:Colors.grayLight,marginTop:Sizes.fixPadding * 1.5}}>
  //       </View>
  //          <View style={{marginTop:Sizes.fixPadding * 1.5,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:Colors.grayMedium,}}>
  //       <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding }}>Remedies</Text>
  //       </View>
  //       <View style={{flexDirection:'row',alignItems:'center',marginTop:Sizes.fixPadding,paddingHorizontal: Sizes.fixPadding * 1.5, }}>

  //       <Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, }}
  //         >{astroData?.remedies && astroData?.remedies.map(item => item?.title).join(', ')}</Text>
  //        {/* {astroData?.remedies ? (<Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5,}}
  //         >{astroData?.remedies?.description.length > 100 && !seeMore ? astroData?.remedies?.description.slice(0, 100) : astroData?.remedies?.description}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: Colors.primaryLight }}> {astroData?.remedies?.description.length > 350 ? seeMore ? 'See less...' : 'See more...' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>} */}
  //      <Text>- </Text>
  //        <Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, }}
  //         >{astroData?.remedies && astroData?.remedies.map(item => item?.description).join(', ')}</Text>
  //         </View>
  //     </View>
  //   )
  // }

  function remediesInfo() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ backgroundColor: '#F6F5F5', width: SCREEN_WIDTH / 2 - Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, borderRadius: 10, marginTop: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginTop: Sizes.fixPadding, textAlign: 'center' }}>{item?.title}</Text>
          <View style={{ paddingVertical: Sizes.fixPadding * 0.3, backgroundColor: Colors.white }}>

          </View>

          {t('lang') == 'en' && item?.description ? 
          (<Text
            textBreakStrategy='highQuality'
            style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5, }}
          >{item?.description?.length > 10 && !seeMore ? item?.description.slice(0, 90) : item?.description}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: Colors.primaryLight }}> {item?.description.length > 10 ? seeMore ? 'Read less...' : 'Read more...' : ''}</Text></Text>) 
          : t('lang') == 'hi' && item?.description_hi ? 
           (<Text
            textBreakStrategy='highQuality'
            style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5, }}
          >{item?.description_hi?.length > 10 && !seeMore ? item?.description_hi.slice(0, 90) : item?.description_hi}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: Colors.primaryLight }}> {item?.description_hi.length > 10 ? seeMore ? 'Read less...' : 'Read more...' : ''}</Text></Text>) 
          :
          <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>}
        </View>
      )
    }
    return (
      <View style={{ backgroundColor: Colors.white }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, borderBottomWidth: 1, borderColor: Colors.grayMedium, }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding, textAlign: 'center' }}>{t("Rambaan Remedies")}</Text>
        </View>
        <FlatList
          data={astroData?.remedies}
          renderItem={renderItem}

          horizontal
        />
      </View>
    )
  }

  function skillsInfo() {
    return (
      <View style={{ padding: Sizes.fixPadding * 1.5, backgroundColor: Colors.white, }}>
        <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding }}>Skills</Text>
        <Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, }}
        >{astroData?.skill && astroData?.skill.map(item => item?.skill).join(', ')}</Text>
      </View>
    )
  }

  function aboutInfo() {
    console.log(astroData?.long_bio, 'longbio')
    return (
      <View style={{ backgroundColor: Colors.white, }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 0.7, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding * 0.5 }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, color: Colors.primaryLight, paddingVertical: Sizes.fixPadding * 0.2 }}> {t('about')}</Text>
        </View>
        {astroData?.long_bio ? (<Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5, }}
        >{astroData?.long_bio.length > 350 && !seeMore1 ? astroData?.long_bio.slice(0, 350) : astroData?.long_bio}<Text onPress={() => updateState({ seeMore1: !seeMore1 })} style={{ color: Colors.primaryLight }}> {astroData?.long_bio.length > 350 ? seeMore1 ? 'Read less ..' : 'Read more ..' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>}

      </View>
    )
  }

  function nextOnlineInfo() {
    return <View style={{ padding: Sizes.fixPadding * 1.5, backgroundColor: '#fff4e8', marginBottom: Sizes.fixPadding }}>
      <Text style={{ ...Fonts.black18RobotoMedium, marginBottom: Sizes.fixPadding * 0.5 }}>Next Online Time</Text>
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesCol1}>{`${moment(astroData?.nextOnline?.data).format('DD MMMM YYYY')} ${moment(astroData?.nextOnline?.time).format('hh:mm A')}`}</Text>
      </View>
    </View>;
  }

  function chatCallPriceInfo() {
    const chatmultiply2 = (astroData?.chat_price + parseFloat(astroData?.commission_chat_price)) + (astroData?.chat_price + parseFloat(astroData?.commission_chat_price))
    const callmultiply2 = (astroData?.call_price + parseFloat(astroData?.commission_call_price)) + (astroData?.call_price + parseFloat(astroData?.commission_call_price))
    const videocall2 = (astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price)) + (astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price))

    const onChatNow = () => {

      if (astroData?.chat_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.chat_status}` })
        return
      }
      const payload = {
        type: 'chat',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        chatPrice:
          parseFloat(astroData?.chat_price) +
          parseFloat(astroData?.commission_chat_price),
        astrostatus: astroData?.chat_status
      };
      dispatch(ChatActions.onChatNow(payload));


    };
    const onCallNow = () => {

      if (astroData?.call_status != 'online') {
        showToastMessage({ message: ` Astrologer is ${astroData?.call_status}` })
        return
      }
      const payload = {
        type: 'call',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        callPrice:
          parseFloat(astroData?.call_price) +
          parseFloat(astroData?.commission_call_price),
        astrostatus: astroData?.call_status
      };
      dispatch(ChatActions.onChatNow(payload));

    };

    const onVideoCallNow = () => {
      if (astroData?.video_call_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.video_call_status}` })
        return
      }
      const payload = {
        type: 'video call',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        callPrice:
          parseFloat(astroData?.normal_video_call_price) +
          parseFloat(astroData?.commission_normal_video_call_price),
        astrostatus: astroData?.video_call_status
      };
      dispatch(ChatActions.onChatNow(payload));
    }

    return <View style={{ backgroundColor: Colors.white, }}>
      <View style={{ padding: Sizes.fixPadding * 0.5, backgroundColor: Colors.grayLight }}>
      </View>
      <View style={{ marginVertical: Sizes.fixPadding * 1.5, }}>
        <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding * 0.5, color: 'black', textAlign: 'center' }}>{t('Consultant Charge')}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
        <View
          style={{ width: '40%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10, }}
        >
          <TouchableOpacity
            onPress={() => onCallNow()}>
            <View style={{ flexDirection: 'row', alignSelf: 'center', backgroundColor: '#000', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Text style={styles.servicesCol3}>{showNumber(callmultiply2)} /min</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#D56A14", borderRadius: 20 }}>

              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6,
                position: 'absolute',
                top: -SCREEN_WIDTH * 0.04,
                left: SCREEN_WIDTH * -0.04,
                borderWidth: 1,
              }}>
                <Ionicons
                  name={'call'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>

              <View style={{ paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding * 2.5, width: '100%', }}>
                <Text style={styles.servicesCol2}>{showNumber(astroData?.call_price + parseFloat(astroData?.commission_call_price))}/min</Text>

              </View>
            </View>

          </TouchableOpacity>
        </View>
        <View
          style={{ width: '40%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10, }}
        >
          <TouchableOpacity
            onPress={() => onChatNow()}>
            <View style={{ flexDirection: 'row', alignSelf: 'center', backgroundColor: '#000', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Text style={styles.servicesCol3}>{showNumber(callmultiply2)} /min</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#D56A14", borderRadius: 20 }}>

              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6,
                position: 'absolute',
                top: -SCREEN_WIDTH * 0.04,
                left: SCREEN_WIDTH * -0.04,
                borderWidth: 1,
              }}>
                <Ionicons
                  name={'chatbubbles-outline'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>

              <View style={{ paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding * 2.5, width: '100%', }}>
                <Text style={styles.servicesCol2}>{showNumber(astroData?.chat_price + parseFloat(astroData?.commission_chat_price))}/min</Text>

              </View>
            </View>

          </TouchableOpacity>
        </View>
      </View>

    </View>;
  }


  function astroDetailInfo() {

    const getFillColor = percentage => {
      return percentage > 0 ? Colors.primaryLight : Colors.grayLight;
    };

    const getStarColor = percentage => {
      return percentage > 0 ? Colors.primaryLight : Colors.gray;
    };

    return (
      <View style={{}}>
        <View
          style={{
            overflow: 'hidden',
            backgroundColor: 'white',
            paddingVertical: SCREEN_HEIGHT * 0.03,
          }}>
          <View
            style={{

              gap: 20,
              paddingHorizontal: SCREEN_WIDTH * 0.035,
              paddingVertical: SCREEN_HEIGHT * 0.02,
              backgroundColor: 'white',
              alignItems: 'center',

              borderRadius: 8
            }}>
            <View style={{

            }}>
              <TouchableOpacity
                style={{
                  height: SCREEN_HEIGHT * 0.14,
                  width: SCREEN_WIDTH * 0.28,
                  padding: 2,
                  borderWidth: 1,
                  borderRadius: 100,
                  borderColor: 'green',
                  textAlign: 'center',
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',

                    borderRadius: 100,
                  }}
                  source={{ uri: base_url + astroData?.profileImage }}
                />
              </TouchableOpacity>


            </View>

            <View style={{ gap: 2 }}>
              <View
                style={{
                  paddingBottom: SCREEN_HEIGHT * 0.005,
                  paddingLeft: SCREEN_WIDTH * 0.01,
                  alignItems: 'center',
                }}>
                <Text style={{ ...Fonts.PoppinsMedium, fontSize: 16, fontWeight: 'bold' }}>
                  {astroData?.astrologerName}
                </Text>
              </View>
              <View style={{ gap: 6, alignItems: 'center' }}>

                <Text style={{ ...Fonts.PoppinsRegular }}>
                  {astroData?.skill &&
                    astroData?.skill.map(item => item?.skill).join(', ')}
                </Text>
              </View>
              <View style={{ gap: 3, alignItems: 'center', }}>

                <Text style={{ ...Fonts.PoppinsRegular, textAlign: 'center' }}>

                  {[...astroData?.language].join(', ')}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  {/* <EvilIcons name='star' size={20} color={'gray'} />
                      <EvilIcons name='star' size={20} color={'gray'} />
                      <EvilIcons name='star' size={20} color={'gray'} />
                      <EvilIcons name='star' size={20} color={'gray'} />
                      <EvilIcons name='star' size={20} color={'gray'} /> */}
                </View>
                <View>
                  {/* <View style={{ flexDirection: 'row', gap: 7 }}>
                    <EvilIcons name="star" size={20} color={'gray'} />

                    <Text style={{ ...Fonts.PoppinsRegular }}>Free 1 min</Text>
                  </View> */}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,

                  justifyContent: 'center',
                }}>
                <Ionicons
                  name={'star'}
                  size={12}
                  color={getStarColor(reviewData?.summary?.averageRating ?? 0)}
                />
                <Text style={{ ...Fonts.PoppinsRegular }}>
                  {reviewData?.summary?.averageRating ?? astroData?.rating}/5
                  {/* (200+ Rating) */}
                </Text>

                {/* <AntDesign name="clockcircleo" size={13} />
                  <Text style={{...Fonts.PoppinsRegular}}>
                    {astroData?.experience} - Years Exp
                  </Text> */}
              </View>

            </View>
            <View
              style={{


              }}>


              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    AstrologerActions.onFollowUnfollowAstrologer(
                      route?.params?._id,
                    ),
                  )
                }
                style={{
                  paddingHorizontal: 6,

                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 200,
                  backgroundColor: '#ffc300',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{ ...Fonts.PoppinsRegular, color: 'black', fontSize: 15, padding: 10, fontWeight: 'bold' }}>
                  {isFollow ? `${t('following')}` : `${t('follow')} +`}{' '}

                </Text>
              </TouchableOpacity>


            </View>

          </View>




        </View>
      </View>
    );
  }


  function chatCallButtonInfo() {
    const onChatNow = () => {

      if (astroData?.chat_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.chat_status}` })
        return
      }
      const payload = {
        type: 'chat',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        chatPrice:
          parseFloat(astroData?.chat_price) +
          parseFloat(astroData?.commission_chat_price),
        astrostatus: astroData?.chat_status
      };
      dispatch(ChatActions.onChatNow(payload));


    };
    const onCallNow = () => {

      if (astroData?.call_status != 'online') {
        showToastMessage({ message: ` Astrologer is ${astroData?.call_status}` })
        return
      }
      const payload = {
        type: 'call',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        callPrice:
          parseFloat(astroData?.call_price) +
          parseFloat(astroData?.commission_call_price),
        astrostatus: astroData?.call_status
      };
      dispatch(ChatActions.onChatNow(payload));

    };

    const onVideoCallNow = () => {
      if (astroData?.video_call_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.video_call_status}` })
        return
      }
      const payload = {
        type: 'video call',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        callPrice:
          parseFloat(astroData?.normal_video_call_price) +
          parseFloat(astroData?.commission_normal_video_call_price),
        astrostatus: astroData?.video_call_status
      };
      dispatch(ChatActions.onChatNow(payload));
    }
    const comingsoon = () => {
      showToastMessage({ message: 'Feature Coming Soon' })
    }

    const getChatColor = (status) => {
      switch (status) {
        case 'online':
          return Colors.primaryLight;
        case 'offline':
          return Colors.grayA;
        case 'busy':
          return Colors.orange_light;
        default:
          return Colors.primaryLight;
      }
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: "#fbfdff",
          paddingVertical: Sizes.fixPadding,
          paddingHorizontal: 20,
          elevation: 20,
          shadowRadius: 10,
          shadowColor: '#757d85',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>


          {/* Call Now Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onCallNow()}
            style={{
              paddingVertical: Sizes.fixPadding,
              backgroundColor: '#ffffff', // White background for consistency
              borderWidth: 1,
              borderColor: '#fff',
              width: '30%',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 6,
              alignItems: 'center', // Center the content inside the button
              justifyContent: 'center', // Center vertically
              paddingHorizontal: 10, // Add padding for spacing
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <FontAwesome name="phone" size={20} color="#D56A14" />
            <Text style={{ fontSize: 18, textAlign: 'center', color: '#D56A14', fontWeight: '800', fontFamily: 'sans-serif', marginLeft: 5 }}>
              Call
            </Text>
          </TouchableOpacity>

          {/* Chat Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChatNow()}
            style={{
              paddingVertical: Sizes.fixPadding,
              backgroundColor: '#ffffff', // White button background
              borderWidth: 1,
              borderColor: '#fff', // Border color for all buttons
              width: '30%',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 6, // Elevated shadow effect for Android
              alignItems: 'center', // Center the content inside the button
              justifyContent: 'center', // Center vertically
              paddingHorizontal: 10, // Add padding for spacing
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <FontAwesome name="comments" size={20} color="#D56A14" />
            <Text style={{ fontSize: 18, textAlign: 'center', color: '#D56A14', fontWeight: '800', fontFamily: 'sans-serif', marginLeft: 5 }}>
              Chat
            </Text>
          </TouchableOpacity>

          {/* Video Button */}

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={onVideoCallNow}
            style={{
              paddingVertical: Sizes.fixPadding,
              backgroundColor: '#ffffff',
              borderWidth: 1,
              borderColor: '#fff',
              width: '30%',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 6,
              alignItems: 'center', // Center the content inside the button
              justifyContent: 'center', // Center vertically
              paddingHorizontal: 10, // Add padding for spacing
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <FontAwesome name="video-camera" size={20} color="#D56A14" />
            <Text style={{ textAlign: 'center', color: '#D56A14', fontWeight: '800', fontFamily: 'sans-serif', marginLeft: 5, fontSize: 18 }}>
              Video
            </Text>
          </TouchableOpacity> */}



        </View>
      </View>




    );
  }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  astroData: state.astrologer.astroData,
  reviewData: state.astrologer.reviewData,
  isFollow: state.astrologer.isFollow
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerDetailes);

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'column',
    marginBottom: Sizes.fixPadding * 0.5
  },
  servicesCol1: {
    ...Fonts.black14InterMedium,
    flex: 0.6
  },
  servicesCol2: {

    fontWeight: 'bold',
    fontSize: 14,
    color: colors.white_color,
    textAlign: 'center'

  },
  servicesCol3: {
    color: colors.white_color,
    fontSize: 12,
    flex: 0.8,
    textDecorationLine: 'line-through',
    textAlign: 'center'
  }
})  
