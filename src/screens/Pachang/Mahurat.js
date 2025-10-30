import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as KundliActions from '../../redux/actions/KundliActions';
import { connect } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import { Fonts, Sizes } from '../../assets/style';
import MyLoader from '../../components/MyLoader2';
import { showToastMessage } from '../../utils/services';
import moment from 'moment';
import { GET_CYRUS_FLIGHT_LIST_DATA } from '../../redux/actionTypes';
import RenderHTML from 'react-native-render-html';
import { FontsStyle } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const Muhurat = ({ dispatch, isLoading, muhuratData, panchangMuhuratVivah }) => {

  const {t} = useTranslation();

  const [buttonStatus, setButtonStatus] = useState(0);
  const [dob, setDob] = useState(new Date());
  const [show,setShow] = useState(false);
  const [date,setDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('vivah');


  useEffect(() => {
    dispatch(KundliActions.getPachangMuhurat({ year: moment(new Date()).format('YYYY'), lang: t('lang')}));
  }, []);

  const handleMuhuratsSelection = (muhurat, status) => {
    setSelectedOption(muhurat);
    setButtonStatus(status);
    
  };

  const handleFetchKundli = (muhurat, selectedDate) => {
    if (!muhurat) {
      showToastMessage({ message: 'Please Select Muhurat' });
      return;
    }

    const month = selectedDate ? selectedDate.getMonth() + 1 : null;
    const year = selectedDate ? selectedDate.getFullYear() : null;

    if (!month || month < 1 || month > 12 || !year || year < 1900 || year > new Date().getFullYear()) {
      console.warn('Please select a valid date');
      return;
    }

    const payload = {
      muhurat: muhurat,
      month: month,
      year: year,
      lat: 25.15,
      lon: 82.5,
      tz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33',
    };

    console.log("mahurat sing payload", payload);

    dispatch(KundliActions.getMuhurat(payload));
  };

  const date_handle = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
    console.log('Year ', event);
    if(event?.type == 'set') {
      console.log('year ', moment(selectedDate).format('YYYY'));

      dispatch(KundliActions.getPachangMuhurat({ year: moment(selectedDate).format('YYYY'), lang: t('lang')}));
    }

  }

  const renderButton = (text, muhurat, status) => (
    <TouchableOpacity
      onPress={() => handleMuhuratsSelection(muhurat, status)}
      style={{
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.06,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          buttonStatus === status
            ? colors.background_theme2
            : colors.background_theme1,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color:
            buttonStatus === status
              ? colors.white_color
              : colors.background_theme2,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          paddingVertical: SCREEN_HEIGHT * 0.02,
          paddingHorizontal: SCREEN_WIDTH * 0.02,
          borderWidth: 1,
          marginHorizontal: Sizes.fixPadding,
          borderRadius: 6,
          gap: 10,
          marginVertical: SCREEN_HEIGHT * 0.015
        }}
      >
        {item.muhuratstart && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 4,
            }}
          >
            <Text style={{ ...Fonts.PoppinsMedium, color: 'black' }}>
              Muhurat Start:
            </Text>
            <Text style={{ ...Fonts.PoppinsMedium, color: 'red' }}>
              {item.muhuratstart}
            </Text>
          </View>
        )}

        {item.muhuratend && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 4,
            }}
          >
            <Text style={{ ...Fonts.PoppinsMedium, color: 'black' }}>
              Muhurat End:
            </Text>
            <Text style={{ ...Fonts.PoppinsMedium, color: 'red' }}>
              {item.muhuratend}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8E8D9' }}>
      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1, backgroundColor: '#F8E8D9' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => setShow(true)}>
            <MaterialIcons name="date-range" size={25} color={'black'} />
          </TouchableOpacity>

          <ScrollView
            style={{ height: SCREEN_HEIGHT * 0.1 }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: SCREEN_WIDTH * 0.015,
                alignItems: 'center',
              }}
            >
              {renderButton(t('Vivah'), 'vivah', 0)}
              {renderButton(t('Grahpravesh'), 'grihpravesh', 1)}
              {renderButton(t('Vaahan'), 'vaahan', 2)}
              {renderButton(t('Sampatti'), 'sampatti', 3)}
            </View>
          </ScrollView>
        </View>
{/* 
        <View
          style={{
            backgroundColor: colors.background_theme2,
            padding: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding,
            alignSelf: 'center',
            marginVertical: Sizes.fixPadding,
          }}
        >
          <Text style={{ color: colors.white_color, fontWeight: 'bold' }}>
            {moment(dob).format('DD-MM-YYYY')}
          </Text>
        </View> */}

        {show && (
         <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={date_handle}
          minimumDate={new Date(2025, 0, 1)}   // Jan 1, 2025
          maximumDate={new Date(2027, 11, 31)} // Dec 31, 2027

        />

        )}

        {/* <FlatList
          data={muhuratData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{ alignItems: 'center', marginTop: SCREEN_HEIGHT * 0.2 }}
            >
              <Text
                style={{
                  ...Fonts.PoppinsSemiBold,
                  fontSize: 16,
                  color: 'white',
                }}
              >
                No Shubh/Auspicious Muhurat available during this time.
              </Text>
            </View>
          )}
        /> */}
        <FlatList
        data={[]}
        ListHeaderComponent={() => {
          const Text = selectedOption == 'vivah' ? panchangMuhuratVivah?.vivah?.description : selectedOption == 'grihpravesh' ? panchangMuhuratVivah?.griha?.description : selectedOption == 'vaahan' ? panchangMuhuratVivah?.vaahan?.description : panchangMuhuratVivah?.sampatti?.description;
          return (
            <View style={{ padding: 20, backgroundColor: '#f8f8f8', borderRadius: 10 }}>
              <RenderHTML
                contentWidth={SCREEN_WIDTH}
                source={{ html: Text || '<p style="text-align:center;height:400px">No Found Data</p>' }}
                baseStyle={{ fontSize: 14, color: '#000',...FontsStyle.fontfamily }}
                tagsStyles={{
                  p: { margin:SCREEN_HEIGHT * 0.01,...FontsStyle.fontfamily}
                }}
              />
            </View>
          );
        }}
        
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  yogdata: state.kundli.yogdata,
  muhuratData: state.kundli.muhuratData,
  panchangMuhuratVivah: state.kundli.panchangMuhuratVivah
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Muhurat);
