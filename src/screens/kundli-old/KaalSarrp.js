import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import MyLoader from '../../components/MyLoader2';
import { Fonts } from '../../assets/style';
import { NativeModules } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { TTSModule } = NativeModules;

const KaalSarrp = ({ kaalSarpYog, dispatch, isLoading }) => {
    useEffect(() => {
        dispatch(KundliActions.getKaalSarpYogData());
    }, [dispatch]);

    console.log('checkKalSarpData:::KKK', kaalSarpYog);

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

    const getFullSpeechText = (data) => {
        if (!data) return '';
        const fields = [
            'mantra',
            'summary',
            'destiny',
            'do',
            'dont',
            'shine',
            'caution',
            'wisdom',
            'remedy'
        ];

        let text = '';
        fields.forEach(f => {
            if (data[f]) text += stripHtml(data[f]) + '. ';
        });

        return text.trim();
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => {
                    const report = LuckReportData?.luckReportData;
                    if (!report) return;

                    if (isSpeaking) {
                        TTSModule.stop();
                        setIsSpeaking(false);
                    } else {
                        const text = getFullSpeechText(report);
                        if (!text) return;
                        TTSModule.stop();
                        TTSModule.speak(text, 'male', t('lang'));
                        setIsSpeaking(true);
                    }
                }}
                style={{ alignItems: 'flex-end', padding: 10 ,borderWidth}}
            >
                <MaterialCommunityIcons
                    name={isSpeaking ? 'stop-circle-outline' : 'volume-high'}
                    size={24}
                    color="#B75D00"
                />
            </TouchableOpacity>
            <MyLoader isVisible={isLoading} />

            {/* Title Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Kaalsarp Yog Report</Text>
            </View>

            {/* Data Display Section */}
            {kaalSarpYog && (
                <View style={styles.content}>
                    <Text style={styles.title}>{kaalSarpYog.title}</Text>

                    <Text style={styles.subtitle}>Present:</Text>
                    <Text style={styles.text}>{kaalSarpYog.present}</Text>

                    <Text style={styles.subtitle}>Reason:</Text>
                    <Text style={styles.text}>{kaalSarpYog.reason}</Text>

                    <Text style={styles.subtitle}>Note:</Text>
                    <Text style={styles.text}>{kaalSarpYog.note}</Text>
                </View>
            )}
        </View>
    );
};

const mapStateToProps = (state) => ({
    kaalSarpYog: state.kundli.kaalSarpYog,
    isLoading: state.setting.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(KaalSarrp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#AB0001',
    },
    headerText: {
        ...Fonts.PoppinsMedium,
        color: 'white',
    },
    content: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
        marginVertical: 5,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginBottom: 10,
        color: '#333',
    },
});