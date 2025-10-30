import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,  // Import FlatList
    Image
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { RenderHTML } from 'react-native-render-html';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import MyLoader from '../../../components/MyLoader';
import { FontsStyle } from '../../../config/constants';
import { NativeModules } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from '@d11/react-native-fast-image';

const { TTSModule } = NativeModules;

const BhavPrediction = ({ basicDetails, dispatch, MyPrediction }) => {
    const { t } = useTranslation();
    const [speakingIndex, setSpeakingIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (basicDetails) {
            const payload = {
                lang: t('lang'),
                gender: basicDetails?.gender,
                name: basicDetails?.name,
                place: basicDetails?.place,
            };
            dispatch(KundliActions.getPredictionData2(payload));
        } else {
            setIsLoading(false);
        }
    }, [dispatch, basicDetails, t]);

    const cleanHtml = useCallback((html) => {
        if (!html) return '';

        let renderHtml = html
            .replace(/<font[^>]*color="([^"]+)"[^>]*>/g, '<span style="color:$1">')
            .replace(/<\/font>/g, "</span>")
            .replace(/<br\s*\/?>/g, "")
            .replace(/\s*style="[^"]*"/g, "");

        return renderHtml;
    }, []);

    const stripHtml = useCallback((text) => text?.replace(/<\/?[^>]+(>|$)/g, "").trim(), []);

    const getFullSpeechText = useCallback((data) => {
        if (!data) return "";
        return stripHtml(data);
    }, [stripHtml]);

    const speakFullData = useCallback((htmlContent, index) => {
        const text = getFullSpeechText(htmlContent?.prediction);

        if (speakingIndex === index) {
            TTSModule.stop();
            setSpeakingIndex(null);
        } else {
            if (text) {
                TTSModule.stop();
                TTSModule.speak(text, "male", t("lang"));
                setSpeakingIndex(index);
            }
        }
    }, [speakingIndex, getFullSpeechText, t]);

    useEffect(() => {
        return () => {
            TTSModule.stop();
            setSpeakingIndex(null);
        };
    }, []);

    // Memoize the prediction item renderer
    const renderPredictionItem = useCallback(({ item, index }) => (
        <View style={styles.predictionBox}>
            <TouchableOpacity
                onPress={() => speakFullData(item, index)}
                style={{ alignItems: "flex-end", marginBottom: 6 }}
            >
                {!speakingIndex ? <MaterialCommunityIcons
                    name={"volume-high"}
                    size={24}
                    color={"#B75D00"} // ya theme.colors.primary
                /> : <Image source={require('../../../assets/astroOneImages/rishi.png')} style={{ height: 25, width: 25 }} />}
            </TouchableOpacity>
            <RenderHTML
                source={{ html: cleanHtml(item?.prediction) }}
                contentWidth={SCREEN_WIDTH}
            />
        </View>
    ), [speakingIndex, speakFullData, cleanHtml]);

    // Memoize the key extractor
    const keyExtractor = useCallback((item, index) => index.toString(), []);

    // Show loader while data is loading

    // Check if we have data to display
    const hasData = MyPrediction &&
        MyPrediction.prediction &&
        MyPrediction.prediction.bhav &&
        MyPrediction.prediction.bhav.length > 0;

    return (
        <View style={styles.container}>
            {hasData ? (
                <FlatList
                    data={MyPrediction.prediction.bhav}
                    renderItem={renderPredictionItem}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                objectFit: 'contain',
                            }}
                            source={require('../../../assets/images/om.gif')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    }
                    // Performance optimizations
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={10}
                    removeClippedSubviews={true}
                />
            ) : (
                <View style={styles.centerContainer}>
                    <View style={styles.fallbackContainer}>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                objectFit: 'contain',
                            }}
                            source={require('../../../assets/images/om.gif')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const mapStateToProps = (state) => ({
    basicDetails: state.kundli.basicDetails,
    MyPrediction: state.kundli.MyPrediction,
});

export default connect(mapStateToProps)(BhavPrediction);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8E8D9',
    },
    listContent: {
        paddingBottom: 20,
    },
    predictionBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF9F0',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.6,
    },
    fallbackContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    noPredictionText: {
        fontSize: responsiveFontSize(2),
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),
    },
});