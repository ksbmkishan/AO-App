import React, { useCallback, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import MyHeader from '../../components/MyHeader';
import { Fonts } from '../../assets/style';
import * as KundliActions from '../../redux/actions/KundliActions'
import { connect } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import * as HomeActions from '../../redux/actions/HomeActions';
import { FontsStyle } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');





const NewShowKundli = ({ route, dispatch, isLoading, basicDetails, kundliListData,kundliId }) => {
    console.log("basicDetailsshreeman", basicDetails)
    const navigation = useNavigation();
    console.log("kundliIdaaa", kundliId)
    const {t} = useTranslation();

    const rawData = [
    { id: '1', title: t('VEDIC JYOTISHACHARYA'), subtitle: 'Deep calculations & analysis', navigateTo: 'Vedicjyoti', image: require("../../assets/drawericons/VedicJyotishacharya.jpg") },
    { id: '2', title: t('TRIKAALDARSHI'), subtitle: 'Predictions, Yoga, Dosha, Sadesati & Remedies', navigateTo: 'TRIKAALDARSHI', image: require("../../assets/drawericons/TrikalDarshi.jpg") },
    { id: '3', title: t('GEMSTONE BABA'), subtitle: 'Lucky Gemstones, Yantra, Mantra, Rudraksha', navigateTo: 'LuckyGemstone', image: require("../../assets/drawericons/LuckyGemstone.jpg") },
    { id: '4', title: t('DIVYA DRISHTA'), subtitle: 'Transit & Forecast', navigateTo: 'DivyaDrishti', image: require("../../assets/drawericons/Transit.jpg") },
    { id: '5', title: t('NUMEROLOGY'), subtitle: 'Numbers’ analysis', navigateTo: 'NewNumerology', image: require("../../assets/drawericons/Numerologist.jpg") },
    { id: '6', title: t('TAROT'), subtitle: '', navigateTo: 'NewTarotCard', image: require("../../assets/drawericons/tarrot.jpg") },
    { id: '7', title: t('KRISHNAMURTI PADVATI'), subtitle: '', navigateTo: 'KrsihnaMurti', image: require("../../assets/drawericons/krishnamurti.jpg") },
];



    useEffect(() => {
       
            dispatch(KundliActions.getKundliData(kundliId))
       
    }, [dispatch,kundliId]);



    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                if (item.navigateTo) {
                    navigation.navigate(item.navigateTo, { kundliId });
                }
            }}

            style={styles.cardContainer}
        >
            <ImageBackground
                source={require('../../assets/astroOneImages/VartKatha.png')}
                resizeMode="cover"
                style={styles.card}
                imageStyle={{ borderRadius: 12 }}


            >
                <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.02, zIndex: -1, top: 2 }}>
                    <Image
                        style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3, borderRadius: 10 }}

                        source={item.image} />
                </View>

                <View style={styles.overlay}>

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>

                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <MyHeader title={'SAPTRISHI'} navigation={navigation} />
            <FlatList
                data={rawData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};


const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    kundliListData: state.kundli.kundliListData,
    kundliId: state.kundli.kundliId,
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(NewShowKundli);

const cardWidth = (width - 38) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatListContent: {
        padding: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    cardContainer: {
        width: cardWidth,
    },
    card: {
        borderWidth: 1,
        borderColor: 'white',
        height: 190,
        justifyContent: 'flex-end',
        borderRadius: 12,
        overflow: 'hidden',
    },
    overlay: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 10,
        width: '85%',
        paddingVertical: 4,
        paddingHorizontal: 4,
        bottom: SCREEN_HEIGHT * 0.015,
        margin: 'auto'
    },
    title: {
         ...FontsStyle.font,
        fontSize: 12,
        textAlign: 'center',
    },
    subtitle: {
         ...FontsStyle.font,
        fontSize: 9,
        marginTop: 2,
        textAlign: 'center',
    },
});