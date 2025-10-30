import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { Sizes } from '../../assets/style';
import { useDispatch, useSelector } from 'react-redux';
import * as EcommerceActions from '../../redux/actions/ecommerceActions';
import SvgOrImage from '../../components/SvgOrImage';
import {  FontsStyle } from '../../config/constants';
import RenderHTML from 'react-native-render-html';
import MyHeader from '../../components/MyHeader';
import { colors } from '../../config/Constants1';

const AllCategory = ({ route, navigation }) => {
  const {  name, productData } = route.params;


  const _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PujaDetails', { data: item })}
      style={styles.itemWrapper}>
      <View style={styles.imgContainer}>
        <SvgOrImage uri={item?.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{item?.name}</Text>
    </TouchableOpacity>
  );

  // Agar showAll false hai to sirf pehle 4 hi lo


  return (
    <View style={styles.container}>
      <MyHeader title={name} navigation={navigation} puja={true} />

      <FlatList
        data={productData}
        renderItem={_renderItem}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        contentContainerStyle={{ padding: Sizes.fixPadding, gap: 20 }}
        ListFooterComponent={
          <>
            
          
          </>
        }
      />
    </View>
  );
};

export default AllCategory;

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemWrapper: {
    alignItems: 'center',
    flexBasis: RESPONSIVE_WIDTH(46),
    marginVertical: Sizes.fixPadding,
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
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imgContainer: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewAllBtn: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: colors.background_theme2,
    marginVertical: 10,
  },
  viewAllText: {
    color: 'white',
    fontWeight: '600',
  },
});
