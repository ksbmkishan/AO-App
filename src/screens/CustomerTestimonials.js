import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/Screen'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { colors } from '../config/Constants1'
import MyHeader from '../components/MyHeader'
import { Fonts, Sizes } from '../assets/style'
import { connect } from 'react-redux';
import { useEffect } from 'react'
import * as BlogActions from '../redux/actions/BlogActions';
import { FontsStyle, img_url } from '../config/constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgOrImage from '../components/SvgOrImage'
import RenderHTML from 'react-native-render-html'
import { useTranslation } from 'react-i18next'
import TranslateText from './language/TranslateText'

const CustomerTestimonials = ({ testmonialData, dispatch, navigation }) => {
    useEffect(() => {

        dispatch(BlogActions.getTestmonial());

    }, [dispatch]);

    const {t} = useTranslation();

    const renderItem = ({ item }) => {
        console.log(' item.image ', item.image);
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    paddingVertical: SCREEN_HEIGHT * 0.035,
                    paddingBottom: SCREEN_HEIGHT * 0.04,
                    backgroundColor: '#FFE4CE',
                    borderRadius: 10,
                    borderColor: '#FFE4CE',
                    borderWidth: 0.5,
                    marginHorizontal: 4,
                    gap: Sizes.fixPadding,
                    marginBottom: 20,
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: SCREEN_WIDTH

                }}>

                <View>

                    <View
                        style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderWidth: 1, borderRadius: 100,overflow:'hidden',alignItems:'center' }}>
                       
                        <Image
                            source={{ uri: item.image}}
                            style={{  width:SCREEN_WIDTH * 0.35,height:SCREEN_HEIGHT * 0.1,resizeMode:'stretch' }}
                        />
                      
                    </View>

                    <View style={{ flexDirection: 'row', left: 10 }}>
                        {[...Array(5)].map((_, index) => {
                            return (
                                <Ionicons
                                    key={index}
                                    name={index < item.rating ? 'star' : 'star-outline'}
                                    size={10}
                                    color={colors.background_theme2}
                                />
                            );
                        })}
                    </View>

                </View>

                <View style={{ width: SCREEN_WIDTH * 0.65 }}>
                    <Text style={{ ...FontsStyle.font,fontWeight:'bold' }}>
                        <TranslateText title={item?.name} /></Text>
                    <RenderHTML
                                 contentWidth={SCREEN_WIDTH}
                                 source={{
                                   html: `<div style="color: black;  text-align:justify;font-size:12px">${t('lang') === 'en' ? item?.description : item?.description_hi}</div>`,
                                 }}
                               />
                </View>






            </TouchableOpacity>
        );
    };
    return (
        <View style={{ flex: 1, }}>
            <MyHeader title={'Customer Testimonials'} navigation={navigation} />

            <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.03 }}>
                <FlatList
                    data={testmonialData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}

                />
            </View>
        </View>
    )
}

// export default CustomerTestimonials

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    testmonialData: state.blogs.testmonialData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTestimonials);


const styles = StyleSheet.create({})