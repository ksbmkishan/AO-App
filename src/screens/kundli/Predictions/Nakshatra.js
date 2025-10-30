import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import HTML, { RenderHTML } from 'react-native-render-html';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../config/Screen';
import moment from 'moment';
import { colors } from '../../../config/Constants1';
import { Fonts } from '../../../assets/style';
import TranslateText from '../../language/TranslateText';
import { Translated } from '../../language/Translated';
import { FontsStyle, normalize } from '../../../config/constants';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { TTSModule } = NativeModules;



const AscendantPrediction = ({ basicDetails, dispatch, MyPrediction }) => {
    const { t } = useTranslation();

    useEffect(() => {
        const payload = { lang: t('lang') };
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch, t]);


    const [isSpeaking, setIsSpeaking] = useState(false);

    const stripHtml = (html) => {
        if (!html) return '';
        // Replace tags with space and collapse multiple spaces
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
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




    useEffect(() => {
        if (basicDetails) {
            const payload = {
                lang: t('lang'),
                gender: basicDetails?.gender,
                name: basicDetails?.name,
                place: basicDetails?.place,
            };
            dispatch(KundliActions.getPredictionData2(payload));
        }
    }, [dispatch, basicDetails, t]);

    const [datahtml, setDataHtml] = useState('');



    useEffect(() => {
        const fetchHtmlLanguage = async () => {
            console.log('asfsdddddsss')
            const data = await cleanHtml(MyPrediction.prediction.nakshatra);
            console.log('data ', data);
            setDataHtml(data);

        }

        fetchHtmlLanguage();
    }, [MyPrediction]);


    const cleanHtml = async (html) => {
        const data = html
            ?.replace(/<font[^>]*color="([^"]+)"[^>]*>/g, '')
            .replace(/<\/font>/g, '</span>')
            .replace(/<br>/g, '<br/>');
        console.log('daaaa ', data);
        const language = await Translated(data);

        return language;
    };


    return (
        <ScrollView style={styles.container}>

            <TouchableOpacity
                onPress={() => {
                    if (isSpeaking) {
                        TTSModule.stop();
                        setIsSpeaking(false);
                    } else {
                        const text = stripHtml(datahtml); // ✅ strip HTML
                        if (!text) return;

                        console.log('Speaking full content:', text);
                        TTSModule.speak(text, 'male', 'en'); // or t('lang') if available
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


            {MyPrediction?.prediction?.nakshatra ? (
                <RenderHTML
                    source={{ html: datahtml }}
                    contentWidth={SCREEN_WIDTH}
                    tagsStyles={{
                        h4: { alignSelf: 'center', ...FontsStyle.fontBold, color: 'red', fontSize: normalize(18) },
                    }}
                />
            ) : (
                <Text style={styles.noPredictionText}><TranslateText title={'No Prediction Available'} /> </Text>
            )}
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.1 }}>

            </View>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    MyPrediction: state.kundli.MyPrediction,
});

export default connect(mapStateToProps)(AscendantPrediction);

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 10,

        backgroundColor: '#F8E8D9',
    },
    noPredictionText: {
        fontSize: responsiveFontSize(2),
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),

    }
});