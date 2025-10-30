import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../components/MyHeader';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../config/Screen'; // Ensure these are defined somewhere in your project
import { Fonts, Sizes } from '../../assets/style';
import { FontsStyle, normalize } from '../../config/constants';
import { colors } from '../../config/Constants1';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { showToastMessage } from '../../utils/services';
import RenderHTML from 'react-native-render-html';
import SvgOrImage from '../../components/SvgOrImage';
import TranslateText from '../language/TranslateText';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');
const PujaDetails = ({ route, navigation, dispatch, customerData }) => {
    const { data } = route.params;
    console.log('CheckInDetailPageData:::KKK', data);

    

    const [date, setDate] = useState(null);
    const [dateVisible, setDateVisible] = useState(false);
    const [time, setTime] = useState(null);
    const [timeVisible, setTimeVisible] = useState(false);

    const {t} = useTranslation();

    const handle_date = (event, selectedDate) => {
        if (event.type == 'set') {
            console.log(selectedDate);
            setDate(selectedDate);

        }
        setDateVisible(false);

    };



    const handle_time = (event, selectedDate) => {
        if (event.type == 'set') {
            setTime(selectedDate);
        }
        setTimeVisible(false);

    };

    const handleCart = () => {

        if (data.category.categoryName == 'E_Puja' && date && time) {
            const payload = {
                userId: customerData?._id,
                productId: data?._id,
                quantity: 1,
                time: time,
                date: date,
            }
            console.log(payload)
            dispatch(EcommerceActions.onEcommerceCartAdd(payload));
        } else if (data.category.categoryName != 'E_Puja' && !date && !time) {
            const payload = {
                userId: customerData?._id,
                productId: data?._id,
                quantity: 1,
            }
            console.log(payload)
            dispatch(EcommerceActions.onEcommerceCartAdd(payload));
        } else {
            showToastMessage({ message: 'Select Date & Time' });
        }


    }

    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    
                    <SvgOrImage uri={item} style={{ width: width * 0.95, height: width / 2.2, borderRadius: 10,objectFit:'fill' }} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                   style={{
                     flex: 0,
                     flexDirection: 'row',
                     justifyContent: 'flex-start',
                     alignItems: 'center',
                     paddingVertical: 12,
                     backgroundColor:colors.background_theme2
                   }}>
                   <TouchableOpacity
                     onPress={() => {
                       navigation.goBack();
                     }}
                     style={{
                       flex: 0,
                       width: '15%',
                       justifyContent: 'center',
                       alignItems: 'center',
                     }}>
                     <Ionicons
                       name="arrow-back"
                       color={colors.white_color}
                       size={normalize(25)}
                     />
                   </TouchableOpacity>
                   <View style={{ flex: 0.9, flexDirection: 'row' }}>
                     <Text allowFontScaling={false}
                       numberOfLines={1}
                       style={{
                         fontSize: normalize(17),
                         color: colors.white_color,
                         ...FontsStyle.fontfamily,
                       }}>
                       <TranslateText title={(`${data?.name}`)} />
                     </Text>
                     </View>
                     </View>

            <FlatList
                ListHeaderComponent={
                    <View style={{ gap: Sizes.fixPadding }}>

                        <View style={{ top: SCREEN_HEIGHT * 0.01 }}>
                            <Carousel
                                loop
                                width={width}
                                height={width / 2.2}
                                autoPlay={true}
                                data={data?.bannerImage}
                                scrollAnimationDuration={1500}
                                autoPlayInterval={5000}
                                renderItem={renderItem}
                            />
                        </View>

                        <View style={{}}>
                            <Text style={styles.title}><TranslateText title={data?.name} /></Text>
                            <Text style={{ color: colors.background_theme2, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>₹ {data?.price}</Text>
                            <View style={{marginHorizontal:20}}>
                            <RenderHTML
                                                contentWidth={SCREEN_WIDTH}
                                                source={{
                                                    html: `<div style="color: black;  text-align:justify">${t('lang') === 'en' ? data?.description : data?.description_hi}</div>`,
                                                }}
                                            />
                            </View>
                            
                        </View>
                        {data.category.categoryName == "E_Puja" &&
                            <View style={{marginVertical:Sizes.fixPadding * 2}}>
                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 16, fontWeight: 'bold',marginVertical:Sizes.fixPadding }}>Select Time & Date</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Date:</Text>
                                        <TouchableOpacity onPress={() => setDateVisible(true)}
                                            style={{
                                                borderRadius: Sizes.fixPadding,
                                                borderWidth: 1,
                                                paddingHorizontal: Sizes.fixPadding * 2,
                                                paddingVertical: Sizes.fixPadding * 0.5
                                            }}>
                                            <Text style={{ color: 'black' }}>{date ? moment(date).format('DD-MM-YYYY') : 'Enter A Date'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Time:</Text>
                                        <TouchableOpacity onPress={() => setTimeVisible(true)}
                                            style={{
                                                borderRadius: Sizes.fixPadding,
                                                borderWidth: 1,
                                                paddingHorizontal: Sizes.fixPadding * 2,
                                                paddingVertical: Sizes.fixPadding * 0.5
                                            }}
                                        >
                                            <Text style={{ color: 'black' }}>{time ? moment(time).format('hh:mm A') : 'Enter A Time'}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        }


                    </View>
                }
            />

            <TouchableOpacity style={{
                padding: 16, backgroundColor: colors.background_theme2, alignItems: 'center',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }}
                onPress={() => {
                    handleCart();
                }}
            >
                <Text style={{...FontsStyle.font, color: 'white' }}><TranslateText title={`Add to Cart`} /></Text>
            </TouchableOpacity>
            {dateVisible && (
                <DateTimePicker
                    value={date instanceof Date ? date : new Date()}
                    mode="date"
                    onChange={handle_date}

                    minimumDate={new Date()}
                   
                />
            )}
            {timeVisible && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                  
                    is24Hour={false}
                    onChange={handle_time}
                />
            )}



        </View>
    );


};

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    customerData: state.customer.customerData
})

export default connect(mapStateToProps, mapDispatchToProps)(PujaDetails);

const styles = StyleSheet.create({
    title: {
       ...FontsStyle.font,

        textAlign: 'center',
        fontSize: normalize(22),
        fontWeight: 'bold'

    },
    description: {
       ...FontsStyle.font,
        fontSize: normalize(16),
        textAlign: 'justify',
        color: '#555',
        marginTop: 10,
        padding: Sizes.fixPadding

    },
});
