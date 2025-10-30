import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Sizes } from '../../assets/style';
import { useDispatch, useSelector } from 'react-redux';
import * as EcommerceActions from '../../redux/actions/ecommerceActions';
import SvgOrImage from '../../components/SvgOrImage';
import {  FontsStyle, normalize } from '../../config/constants';
import RenderHTML from 'react-native-render-html';
import MyHeader from '../../components/MyHeader';
import { colors } from '../../config/Constants1';
import TranslateText from '../language/TranslateText';
import { useTranslation } from 'react-i18next';

const AllPujaByCategory = ({ route, navigation }) => {
  const { id, name, description,description_hi } = route.params;
  
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const productData = useSelector(state => state.ecommerce.ecommerceProductData);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(EcommerceActions.getEcommerceProduct({ categoryId: id }));
  }, [id]);

  const _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PujaDetails', { data: item })}
      style={styles.itemWrapper}>
      <View style={styles.imgContainer}>
        <SvgOrImage uri={item?.image} style={styles.image} resizeMode='stretch'/>
      </View>
      <Text style={styles.title}><TranslateText title={item?.name} /></Text>
    </TouchableOpacity>
  );

  // Agar showAll false hai to sirf pehle 4 hi lo
  const dataToRender = productData ? productData?.slice(0, 4) : [];

  console.log('name ', name);

  return (
    <View style={styles.container}>
      <MyHeader title={name} navigation={navigation} puja={true} />

      <FlatList
        data={dataToRender}
        renderItem={_renderItem}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        contentContainerStyle={{ padding: Sizes.fixPadding, gap: 20 }}
        ListFooterComponent={
          <>
            {productData && productData.length > 4 && (
              <TouchableOpacity
                style={styles.viewAllBtn}
                onPress={() => navigation.navigate('AllCategory',{ name: name, productData: productData})}>
                <Text style={styles.viewAllText}>
                  {showAll ? 'View Less' : 'View All'}
                </Text>
              </TouchableOpacity>
            )}
            {description ? (
              <View style={{ padding: 10, borderWidth:1, borderColor:'black', borderRadius:10 }}>
                <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: t('lang') === 'en' ? description : description_hi}} />
              </View>
            ) : null}
          </>
        }
      />
    </View>
  );
};

export default AllPujaByCategory;

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemWrapper: {
    alignItems: 'center',
    flexBasis: RESPONSIVE_WIDTH(46),
    marginVertical: Sizes.fixPadding,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FontsStyle.font,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
    color: 'black',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  imgContainer: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewAllBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: colors.white_color,
    marginVertical: 10,
    borderWidth:1,
    borderColor:'gray'
  },
  viewAllText: {
    color: 'black',
    fontWeight: '600',
    fontSize: normalize(10)
  },
});
