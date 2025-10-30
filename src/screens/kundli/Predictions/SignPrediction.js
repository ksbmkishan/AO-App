import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import TranslateText from '../../language/TranslateText';
import { Translated } from '../../language/Translated';
import RenderHTML from 'react-native-render-html';
import { FontsStyle } from '../../../config/constants';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { rashiData } from '../../../json/rashiData';
const { TTSModule } = NativeModules;



const SignPrediction = ({ basicDetails, dispatch, MyPrediction }) => {
    const { t } = useTranslation();
    const [signTitle, setSignTitle] = useState('');
    const [rashiText, setRashiText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);



    const stripHtml = (html) => {
        if (!html) return '';
        return html
            .replace(/<[^>]*>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/\u00a0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    useEffect(() => {
        return () => {
            // ✅ jaise hi page se bahar jaoge, speech band ho jayegi
            TTSModule.stop();
            setIsSpeaking(false);
        };
    }, []);

    const getFullSpeechTextFromContent = (content) => {
        if (!content) return '';

        // Combine all possible HTML fields into one string
        const fields = [
            'TitleMain',
            'whoTitle',
            'whoContent',
            'houseTitle',
            'houseContent',
            'soulTitle',
            'soulContent'
        ];

        let text = '';
        fields.forEach(f => {
            if (content[f]) {
                // Strip HTML and add a period
                text += content[f].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() + '. ';
            }
        });

        return text.trim();
    };



    console.log("signTitle", signTitle)

    useEffect(() => {
        if (MyPrediction?.prediction?.sign) {
            console.log('data ',MyPrediction.prediction.sign)
            const title = extractSignTitle(MyPrediction.prediction.sign);
            console.log('title ', title)
            setSignTitle(title);
            setRashiText(rashiData[title] || '');
        }
    }, [MyPrediction]);

    const extractSignTitle = (html) => {
        const match = html?.match(/<font[^>]*>(.*?)<\/font>/);
        if (match && match[1]) {
            return match[1]
                .replace(/&nbsp;/g, '')  // remove HTML non-breaking space
                .replace(/\u00a0/g, '')  // remove actual unicode non-breaking space
                .trim();                 // remove extra spaces
        }
        return '';
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    if (isSpeaking) {
                        TTSModule.stop();
                        setIsSpeaking(false);
                    } else {
                        const text = stripHtml(rashiText); // Remove all HTML tags
                        if (!text) return;

                        console.log('Speaking full content:', text);
                        TTSModule.speak(text, 'male', t('lang'));
                        setIsSpeaking(true);
                    }
                }}
                style={{ alignItems: 'flex-end', padding: 10 }}
            >
               {!isSpeaking ?   <MaterialCommunityIcons
                             name={"volume-high"}
                             size={24}
                             color={"#B75D00"} // ya theme.colors.primary
                           />: <Image source={require('../../../assets/astroOneImages/rishi.png')} style={{ height:25, width:25}}/>}
            </TouchableOpacity>
            {signTitle ? (
                <Text style={styles.signTitle}>☀️ {signTitle}</Text>
            ) : null}

            {rashiText ? (
                // <Text style={styles.rashiText}>{rashiText}</Text>
                <RenderHTML
                    contentWidth={SCREEN_WIDTH}
                    source={{ html: rashiText }}
                />
            ) : (
                <Text style={styles.noPredictionText}>
                    <TranslateText title={'No Prediction Available'} />
                </Text>
            )}
            <View style={{ paddingVertical: SCREEN_WIDTH * 0.2 }}>

            </View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    MyPrediction: state.kundli.MyPrediction,
});

export default connect(mapStateToProps)(SignPrediction);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8E8D9',
        padding: 16
    },
    signTitle: {
        fontSize: 16,
        color: 'black'
    },
    rashiText: {
        fontSize: 14,
        color: 'black'
    },
    noPredictionText: {
        fontSize: responsiveFontSize(2),
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
        ...FontsStyle.font
    },
});