import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Fonts, Sizes } from '../assets/style';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';

const CustomHeader = ({ backgroundColor = '#F0F0F0' }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const shareContent = async () => {
        try {
            const shareOptions = {
                title: 'Share Horoscope',
                message: 'Check out my daily horoscope: [Insert your horoscope content here]',
                social: Share.Social.WHATSAPP,
                url: 'https://astrofriends.in/horoscope',
            };
            await Share.shareSingle(shareOptions);
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    };

    return (
        <View style={{ paddingHorizontal: Sizes.fixPadding, backgroundColor: backgroundColor }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Image source={require('../assets/astroOneImages/back_navigation.png')} style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>
                    <Text style={{ ...Fonts.primaryHelvetica, fontSize: 18, color: 'black' }}>Daily Horoscope</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>

                </View>
            </View>
        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({});
