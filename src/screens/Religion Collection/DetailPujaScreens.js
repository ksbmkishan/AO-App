import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Aarti from './Aarti';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors, fonts } from '../../config/Constants1';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as PoojaActions from '../../redux/actions/PoojaActions';
import { connect } from 'react-redux';
import { normalize } from '../../config/constants';

import { useEffect } from 'react';
import { Fonts, Sizes } from '../../assets/style';
import SvgOrImage from '../../components/SvgOrImage';
import { useTranslation } from 'react-i18next';
import TranslateText from '../language/TranslateText';

const DetailPujaScreens = ({ dispatch, getallReligionCollectionsubCategoryData }) => {
    const route = useRoute();
    const { itemName, categoryName } = route.params;
    const navigation = useNavigation();

    const {t} = useTranslation();

    useEffect(() => {
        console.log('Received params:', route.params);
        console.log('checkId:::KKK', itemName);
        // console.log('checkCategoryName:::KKK', categoryName);
    }, [route.params]);

    useEffect(() => {
        const payload = {
            categoryId: route?.params?.itemName
        };
        dispatch(PoojaActions.getAllReligionCollectionSubCategory(payload));
    }, [dispatch]);

    const image = (item) => {
        let image;
        switch(item) {
            case 'Aarti': image = {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/Aarti.png'};
            break;
            case 'Beej Mantra': image = {uri: "https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/BeejMantra.png"};
            break;
            case 'kavacha': image = {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/Kavacha.png'};
            break;
            case 'Vart Katha': image = {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/VartKatha.png'};
            break;
            case 'Puja Vidhi': image = {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/PujaVidhi.png'};
            break;
            case 'Chalisa': image = {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/Chalisa.png'};
            break;
            default: image = {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/Aarti.png'};
            break;
        }
        console.log('image :: ' ,image)
        return image;
    }

    const renderItem = ({ item, index }) => {
       
       

        return (
            <TouchableOpacity
                key={index}
                style={{
                    flexBasis: '45%',
                    marginHorizontal: 10,
                    // borderWidth: 1,
                    // borderColor: '#ccc',
                    // borderRadius: 10,
                    // backgroundColor: '#fff',
                    // shadowColor: '#000',
                    // shadowOffset: { width: 2, height: 4 },
                    // shadowOpacity: 0.3,
                    // shadowRadius: 4,
                    // elevation: 5, // For Android
                }}
                onPress={() => {
                    navigation.navigate('AartiDetails', {
                        itemData: item,
                    });
                }}
            >
                <ImageBackground source={image(categoryName)} style={{ height: normalize(210), justifyContent: 'center', alignItems: 'center' }}>
                    <SvgOrImage 
                    uri={ item.image} 
                    style={{ height: '100%', width: '100%', objectFit: 'fill', position: 'absolute', zIndex: -1 }}  
                    />
                <View style={{backgroundColor:'white', paddingHorizontal:10,paddingVertical:5,borderRadius:20,position:'absolute',bottom:30}}>
                    <Text style={{color:'black',fontWeight:500,textAlign:'center',fontSize:normalize(14)}}><TranslateText title={item.subCategoryName} /></Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/images/sangrahalay_bg.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="left"
                            size={25}
                            color={colors.black_color9}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.txt}><TranslateText title={t(`${categoryName}`)} /></Text>
                    </View>
                </View>

                <View style={{ top: SCREEN_HEIGHT * 0.01, paddingBottom: SCREEN_HEIGHT * 0.1 }}>
                    <FlatList
                        data={getallReligionCollectionsubCategoryData || []}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={{ columnGap: 20, rowGap: 20 }}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',

    },
    headerContainer: {
        padding: 12,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    backIcon: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        marginTop: responsiveScreenHeight(0.2),
        marginLeft: responsiveScreenWidth(1),
    },
    txt: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: SCREEN_HEIGHT * 0.020,
        marginLeft: responsiveScreenWidth(8),
    },
});

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    getallReligionCollectionsubCategoryData: state.pooja.getallReligionCollectionsubCategoryData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DetailPujaScreens);
