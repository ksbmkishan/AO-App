import { View, Text, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts } from '../../config/Constants1';
import { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import RenderHtml from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import { FontsStyle, img_url } from '../../config/constants';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import Carousel from 'react-native-reanimated-carousel';
import SvgOrImage from '../../components/SvgOrImage';
import TranslateText from '../language/TranslateText';
const { width, height } = Dimensions.get('screen');

const BlogDetailes = props => {
  const { t } = useTranslation();
  const [blogData] = useState(props.route.params.blogData);
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <MyHeader
          title={t("blogs")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  console.log('blogs :: ', blogData);

  const renderItem = ({item}) => {
    return(
      <View>
        
          <SvgOrImage 
          uri={ item}
          style={{ width: width, height: height * 0.25, objectFit:'fill' }}
          />
      </View>
    )
  }

  // console.log(`<html><head></head><body><div style="color: black; max-width: 320px;">${blogData.description}</div></body></html>`);
  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <ScrollView>
        {blogData?.image ? (
          <Carousel
            loop
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT * 0.3}
            autoPlay={true}
            data={[blogData?.image]}
            scrollAnimationDuration={1500}
            autoPlayInterval={5000}
            renderItem={renderItem}
          />
        ) : (
          // <Image
          //   source={{ uri: img_url + blogData.image }}
          //   style={{ width: width, height: width * 0.5 }}
          // />
          <SvgOrImage 
            uri={img_url + blogData.image}
            style={{ width: width, height: width * 0.5 }}
          />
        )}

        <View
          style={{
            flex: 0,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          <Text allowFontScaling={false}
            style={{
              fontSize: 16,
              color: colors.black_color8,
              ...FontsStyle.font,
              fontWeight:'bold'
            }}>
            <TranslateText title={blogData.title} />
          </Text>
          <Text allowFontScaling={false}
            style={{
              fontSize: 14,
              color: colors.black_color5,
              ...FontsStyle.font,
              fontStyle: 'italic',
            }}>
            {t("Posted")}: {moment(blogData.createdAt).format('DD/MM/YYY HH:mm')}
          </Text>
          <Text allowFontScaling={false}
            style={{
              fontSize: 14,
              color: colors.black_color6,
              ...FontsStyle.font
            }}>
            {/* Category: {blogData.blogCategory} */}
          </Text>
          <RenderHtml
            contentWidth={SCREEN_WIDTH * 0.9}
            source={{
              html: `<div style="color: black; max-width: 100%; text-align:justify;">${t('lang') === 'en' ? blogData?.description : blogData?.description_hi}</div>`,
            }}
            baseStyle={{...FontsStyle.font}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});

export default BlogDetailes;
