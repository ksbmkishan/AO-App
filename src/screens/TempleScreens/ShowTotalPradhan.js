import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import { Fonts, Sizes } from '../../assets/style';
import { FontsStyle, img_url } from '../../config/constants';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { useTranslation } from 'react-i18next';
import TranslateText from '../language/TranslateText';

const ShowTotalPradhan = ({ navigation, dispatch, ajkapradhandata, customerData }) => {
    useEffect(() => {
        dispatch(HomeActions.getAjKaPradhan());
    }, [dispatch]);

    const {t} = useTranslation();

    const sortedData = ajkapradhandata?.sort((a, b) => b.referral_count - a.referral_count);

    const topReferral = sortedData ? sortedData[0] : null;

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ borderWidth: 0.5, borderRadius: 8, marginBottom: 10, backgroundColor: 'white' }}>

                <View style={{ padding: 1, borderWidth: 0.5, borderRadius: 20, width: 20, alignSelf: 'flex-start', height: 20, alignItems: 'center', left: 10, top: 10, backgroundColor: '#ecbd98', borderColor: '#ecbd98' }}>
                    <Text style={{ ...FontsStyle.fontfamily, fontWeight:'bold', color: 'white' }}>{index + 1}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 30, padding: 20, gap: 20, alignItems: 'center' }}>
                    <View style={{ height: 80, width: 80, borderRadius: 45 }}>
                        <Image
                            source={item?.image ? { uri: img_url + item?.image } : item?.gender == 'Female' ? {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/female.jpeg'} : {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/male.jpeg'}}
                            style={{ height: '100%', width: '100%', borderRadius: 100 }}
                        />
                    </View>
                    <View>
                        <Text style={styles.commanText}><TranslateText title={item?.customerName ? item?.customerName : 'Unknown Name'} /></Text>
                        <Text style={styles.commanText}>{t("Total Referral")}: {item?.referral_count}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
      };

    const calculatorRank = () => {
        const rankIndex = sortedData?.findIndex(item => item?.phoneNumber === customerData?.phoneNumber);
        console.log('rank index', rankIndex);
        const ordinalRank = getOrdinal(rankIndex + 1);
        return ordinalRank;
        
    }

     const rank = sortedData?.find(item => item?.phoneNumber === customerData?.phoneNumber);

     console.log('rank ',rank)

    return (
        <View style={{ flex: 1, gap: 20, backgroundColor: '#F8E8D9' }}>
            <MyHeader title={'Your Rank'} navigation={navigation} />


            <View style={{
                top: SCREEN_HEIGHT * 0.035,
                backgroundColor: Colors.background_theme1,
                alignSelf: 'center',
                borderRadius: 8,
                position: 'relative',
                paddingTop: SCREEN_HEIGHT * 0.04,
                marginBottom: 10,
                paddingHorizontal: SCREEN_WIDTH * 0.20
            }}>
                {rank && <View style={{position:'absolute', alignSelf:'flex-end',}}>
                    <Image source={require('../../assets/icons/medal.png')} style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1  }} />
                    <Text style={{textAlign:'center',fontWeight:'bold',color:'white'}}>{calculatorRank()}</Text>
                </View>}
                
                {/* Image above the card */}
                <View style={{
                    height: 80,
                    width: 80,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: -40,
                    borderWidth: 2,
                    borderRadius: 100,
                    borderColor: 'white'
                }}>
                    <Image
                        source={customerData?.image ? { uri: img_url + customerData?.image } : require('../../assets/images/avatar_book.png')}
                        style={{ height: '100%', width: '100%', borderRadius: 100, }}
                    />
                </View>

                {/* Card Content */}
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={[styles.commanText, { ...Fonts.PoppinsBold, color: 'white' }]}><TranslateText title={customerData?.customerName} /></Text>

                    {/* <View style={{ paddingVertical: 5, backgroundColor: 'white', borderRadius: 5, paddingHorizontal: 20 }}>
                            <Text style={[styles.commanText, { color: Colors.background_theme1 }]}>आज का प्रधान</Text>
                        </View> */}

                
                    <Text style={[styles.commanText, { ...FontsStyle.fontfamily, fontWeight:'bold', color: 'white' }]}>{t("Referral")}: {customerData?.referral_count}</Text>
                </View>
            </View>



            <View style={{ flexDirection: 'row', alignItems: 'center', width: SCREEN_WIDTH, marginTop: 10 }}>
                <View style={{ borderBottomWidth: 1, flex: 1, borderColor: 'white' }} />

                <View style={{ padding: 4, borderWidth: 0.8, borderRadius: 20, backgroundColor: '#ffd736', borderColor: 'white' }}>
                    <Text style={[styles.commanText, { paddingHorizontal: 10 }]}>{t("Aaj Ka Pradhan")}</Text>
                </View>

                <View style={{ borderBottomWidth: 0.5, flex: 1, borderColor: 'white' }} />
            </View>



            <FlatList
                data={sortedData}
                renderItem={renderItem}
                keyExtractor={(item) => item?.referral_code}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    ajkapradhandata: state.home.ajkapradhandata,
    customerData: state.customer.customerData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ShowTotalPradhan);

const styles = StyleSheet.create({
    commanText: {
        ...FontsStyle.fontfamily, fontWeight:'bold',
    },
});
