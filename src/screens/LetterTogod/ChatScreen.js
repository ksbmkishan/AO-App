import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Platform,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    NativeModules,
    Keyboard
} from 'react-native';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Text,
    TextInput,
    IconButton,
    Surface,
    ActivityIndicator,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as SettingActions from '../../redux/actions/SettingActions';
import { useMemo } from 'react';
import { gradients, theme } from './theme';
import { connect } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../config/Constants1';
import { showToastMessage } from '../../utils/services';
import Sound from 'react-native-sound';
import WebView from 'react-native-webview';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons'




Sound.setCategory('Playback');

const ChatScreen = ({ navigation, route, dispatch, WelcomeMessage, ChatGptReponse, DivyaRashiPlans, customerData, ChatHistoryletter, UserDataSave }) => {

    const { TTSModule } = NativeModules;
    const { userData, SavedprofileId, languagehandle, } = route.params;
    const [messages, setMessages] = useState([]);
    const [ChatgptinputText, setChatGptInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showKrishnaModal, setShowKrishnaModal] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [playingId, setPlayingId] = useState(null);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [speaker, setSpeaker] = useState(true);

    const flatListRef = useRef(null);
    const webViewRef = useRef(null);
    const soundRef = useRef(null);

    const hasShownWelcome = useRef(false);

    console.log('User data ', UserDataSave?.gender?.toLowerCase(),);

    useEffect(() => {
        // when TTS finishes, clear playingId
        const showSub = Keyboard.addListener("keyboardDidShow", () => {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false }); // false = instant bottom 0
            }, 100);
        });
        return () => {
            TTSModule.stop().then(res => console.log(res));
            showSub.remove();
        }
    }, []);

    useEffect(() => {
        // Load sound only once
        const sound = new Sound('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/OmSound.mpeg', (error) => {
            if (error) {
                console.log('Error loading sound:', error);
                return;
            }
            sound.setNumberOfLoops(-1); // loop forever
            if (speaker) {
                sound.play();
            }
        });

        soundRef.current = sound;

        return () => {
            if (soundRef.current) {
                soundRef.current.release();
            }
        };
    }, []);

    useEffect(() => {
        if (soundRef.current) {
            if (speaker) {
                soundRef.current.play();
            } else {
                soundRef.current.stop();
            }
        }
    }, [speaker]);


    useFocusEffect(
        useCallback(() => {
            if (!hasShownWelcome.current) {
                initializeChat();
                hasShownWelcome.current = true;
            }

            return () => {

                Tts.stop();
            };
        }, [])
    );

    const toggleVoiceInput = async () => {

        if (playingId) return true;
        if (isRecording) {
            await Voice.stop();
            setIsRecording(false);
        } else {
            try {
                await Voice.start('en-US'); // Change locale to "hi-IN" for Hindi
                setIsRecording(true);
            } catch (e) {
                console.log('Voice Start Error: ', e);
            }
        }
    };


    useEffect(() => {
        const remaining = customerData?.remainingMessages ? customerData?.remainingMessages : 0;
        console.log('remaining :::: ', customerData?.remainingMessages)
        if (remaining === 0 || remaining == null) {
            setShowKrishnaModal(true);
        } else {
            setShowKrishnaModal(false);
        }
    }, [customerData?.remainingMessages]);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (showKrishnaModal) {
                    navigation.navigate('Welcome');
                    return true;
                }
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [showKrishnaModal, navigation])
    );

    const sendGptMessage = (messageText) => {
        if (!messageText.trim()) return;

        if (isRecording) {
            setIsRecording(false);
        }

        setIsLoading(true);

        const userMessage = {
            id: Date.now().toString(),
            text: messageText,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setChatGptInputText('');

        dispatch(SettingActions.getChatGptSearch({
            userId: UserDataSave?._id,
            message: messageText,
            language: languagehandle,
        }));
    };


    useEffect(() => {
        if (ChatGptReponse?.response?.answer) {
            const botReply = {
                id: Date.now().toString(),
                text: ChatGptReponse?.response?.answer,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prevMessages => [...prevMessages, botReply]);
            setIsLoading(false);

        }
    }, [ChatGptReponse]);


    useEffect(() => {
        const hasHistory = ChatHistoryletter?.data?.length > 0;

        if (!hasHistory) {
            const welcomeText = getWelcomeMessage();

            const dummyWelcome = {
                id: 'welcome-1',
                text: welcomeText,
                isUser: false,
                timestamp: new Date(),
            };


            setMessages([dummyWelcome]);
            setIsHistoryLoading(false);
        } else {
            setIsHistoryLoading(false);
        }
    }, [ChatHistoryletter]);


    const speakAnswer = async (text, id) => {
        if (!text) return;


        if (playingId === id) {
            TTSModule.stop().then(res => console.log(res));
            setPlayingId(null);
            return;
        }

        await Voice.stop();
        setIsRecording(false);

        setSpeaker(false);
        if (webViewRef.current) {
            webViewRef.current.postMessage(false ? 'unmute' : 'mute');
        }


        TTSModule.stop().then(res => console.log(res));

        setPlayingId(id);
        const gender = UserDataSave?.gender?.toLowerCase()
        TTSModule.speak(text, "male", languagehandle)
            .then(res => {
                console.log('res ', res);
                setPlayingId(null);
                setSpeaker(true);
                if (webViewRef.current) {
                    webViewRef.current.postMessage(true ? 'unmute' : 'mute');
                }
            }
            )
            .catch(err => console.error(err));


        // Tts.speak(text);
    };


    useEffect(() => {
        const payload = {
            name: userData.fullName,
        };
        dispatch(SettingActions.getDivyaPlansData(payload));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            name: userData?.fullName,
        };

        console.log("WelcomeMessage payload:", payload);


        dispatch(SettingActions.getWelcomeMessage(payload));
    }, [dispatch]);


    const combinedMessages = useMemo(() => {
        const historyMessages = ChatHistoryletter?.data?.flatMap(chat => chat.messages) || [];
        const newMessages = messages || [];
        const all = [...historyMessages, ...newMessages];
        return all.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }, [ChatHistoryletter, messages]);

    useEffect(() => {
        const payload = {
            userId: UserDataSave?._id,
        };

        console.log("historyscreen", payload)

        dispatch(SettingActions.getChatHistory(payload));
    }, [dispatch, UserDataSave]);

    useEffect(() => {
        if (ChatHistoryletter?.data?.length > 0) {
            setIsHistoryLoading(false);
        }
    }, [ChatHistoryletter]);

    const handleBuyPlans = (item) => {
        const walletBalance = customerData?.wallet_balance || 0;
        const requiredAmount = item?.divyaRashi || 0;
        console.log(requiredAmount)
        if (walletBalance < requiredAmount) {
            showToastMessage({ message: "कृपया पहले दिव्य राशि जोड़ें" });
            return;
        }

        const payload = {
            planId: item?._id,
            chatBotUserId: UserDataSave?._id,
            onSuccess: () => setShowKrishnaModal(false),
        };

        console.log("Buy plans payload:", payload);
        dispatch(SettingActions.getBuyPlans(payload));
    }

    useEffect(() => {
        initializeChat();
    }, []);

    const initializeChat = async () => {
        const welcomeMessage = getWelcomeMessage();
        setMessages([
            {
                id: '1',
                text: welcomeMessage,
                isUser: false,
                timestamp: new Date(),
            },
        ]);


    };

    useEffect(() => {
        if (combinedMessages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [combinedMessages]);

    const getWelcomeMessage = () => {
        switch (languagehandle) {
            case 'hindi':
                return `"हे प्रिय ${userData?.fullName}, मेरे आशीर्वाद सदा तुम्हारे साथ हैं… बताओ, तुम कौन-सा सत्य या मार्गदर्शन चाहते हो?"`;
            case 'english':
                return `"O beloved ${userData?.fullName}, my blessings are ever with you… tell Me, what truth or guidance do you seek?"`;
            case 'hinglish':
                return `"O priya ${userData?.fullName}, mere aashirvaad sada tumhare saath hain… batao, tum kaun-sa satya ya margdarshan chahte ho?"`;
            default:
                return WelcomeMessage?.welcomeMessage?.hindi || `🙏 Welcome to Priya customer!`;
        }
    };

    const getPlaceholder = () => {
        switch (languagehandle) {
            case 'hindi':
                return 'भगवान से कुछ पूछना चाहते हैं? यहाँ लिखें...';
            case 'English':
                return 'Want to ask something from God? Type here...';
            case 'hinglish':
                return 'Bhagwan se kuch puchna chahte hai? Yahan likhe...';
            default:
                return 'Type your message...';
        }
    };

    // Toggle mute/unmute
    const toggleSpeaker = () => {
        const newSpeakerState = !speaker;
        setSpeaker(newSpeakerState);
        if (webViewRef.current) {
            webViewRef.current.postMessage(newSpeakerState ? 'unmute' : 'mute');
        }
    };

    const html = `
    <html>
    <body style="margin:0;padding:0;overflow:hidden;background:#000;">
        <video 
            id="bgVideo"
            autoplay
            playsinline
            muted
            loop
            width="100%" 
            height="100%" 
            style="object-fit:cover;">
            <source src="file:///android_asset/chatscreen.mp4" type="video/mp4" />
        </video>
        <script>
       
        </script>
    </body>
    </html>
`;


    return (
        <LinearGradient colors={gradients.background} style={styles.container}>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: SCREEN_HEIGHT * 0.02,
                backgroundColor: colors.background_theme2
            }}>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.navigate("Welcome")} >
                        <AntDesign name='left' size={24} color='white' />
                    </TouchableOpacity>

                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>
                        {
                            languagehandle === 'hindi'
                                ? 'भगवान'
                                : languagehandle === 'english'
                                    ? 'Lord'
                                    : 'Bhagwan'
                        }
                    </Text>
                </View>

                <TouchableOpacity style={{ right: 10 }} onPress={() => toggleSpeaker()}>
                    {speaker ?
                        <Ionicons name='volume-high' color={'white'} size={20} /> :
                        <Ionicons name='volume-mute' color={'white'} size={20} />}
                </TouchableOpacity>

                {/* Right Section: Emoji */}
                <TouchableOpacity style={{ right: 10 }} onPress={() => { navigation.navigate("PlaningHistory", { ID: UserDataSave?._id }) }}>
                    <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>
                        {
                            languagehandle === 'hindi'
                                ? `शेष संदेश : ${customerData?.remainingMessages ? customerData?.remainingMessages : 0}`
                                : languagehandle === 'english'
                                    ? `Remaining : ${customerData?.remainingMessages ? customerData?.remainingMessages : 0}`
                                    : `Shesh  : ${customerData?.remainingMessages ? customerData?.remainingMessages : 0}`
                        }
                    </Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 40} // 👈 Add this line
                style={styles.chatContainer}
            >
                <View style={styles.videoContainer}>

                    <WebView
                        ref={webViewRef}
                        originWhitelist={['*']}
                        source={{ html }}
                        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
                        javaScriptEnabled
                        allowsInlineMediaPlayback
                        mediaPlaybackRequiresUserAction={false}
                        onMessage={(event) => {
                            const data = event.nativeEvent.data;
                            console.log('Message from WebView:', data);

                            if (data === 'video-ended') {
                                // Example: react to video end
                                console.log('Video finished playing');
                            }
                        }}
                    />
                </View>
                {isHistoryLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={{ marginTop: 10, color: 'white' }}>
                            {languagehandle === 'hindi'
                                ? 'इतिहास लोड हो रहा है...'
                                : languagehandle === 'english'
                                    ? 'Loading history...'
                                    : 'Itihas load ho raha hai...'}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={combinedMessages}
                        renderItem={({ item }) => {
                            const isUser = item.role === 'user' || item.isUser;
                            const content = item.content || item.text || '';
                            const isPlaying = playingId === item.id;
                            const time = new Date(item.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            });

                            return (
                                <View style={[styles.messageContainer, isUser ? styles.user : styles.assistant]}>
                                    <Text style={[styles.messageText, { color: isUser ? 'white' : 'black' }]}>
                                        {content}
                                    </Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                                        {
                                            !isUser && (
                                                <TouchableOpacity
                                                    onPress={() => speakAnswer(content, item.id)}
                                                    style={{ marginLeft: 8 }}
                                                >
                                                    <MaterialCommunityIcons
                                                        name={isPlaying ? 'stop-circle-outline' : 'volume-high'}
                                                        size={20}
                                                        color={theme.colors.primary}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                        <Text style={[styles.messageText, { fontSize: 10, color: isUser ? 'white' : 'black' }]}>
                                            {time}
                                        </Text>
                                    </View>


                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => item._id || item.id || index.toString()}
                        contentContainerStyle={{ padding: 10 }}
                        onContentSizeChange={() => {
                            setTimeout(() => {
                                flatListRef.current?.scrollToEnd({ animated: false }); // false = instant bottom 0
                            }, 100);
                        }}
                        ListFooterComponent={
                            isLoading && (
                                <View style={styles.loadingContainer}>
                                    <Surface style={styles.loadingBubble} elevation={2}>
                                        <ActivityIndicator size="small" color={theme.colors.primary} />
                                        <Text style={styles.loadingText}>
                                            {languagehandle === 'hindi'
                                                ? 'ब्रह्मांड अपने दिव्य वचन प्रकट कर रहा है… मेरी पवित्र आत्मा।'
                                                : languagehandle === 'english'
                                                    ? 'The Cosmos is unveiling its Divine Words… my sacred soul.'
                                                    : 'Brahmand apne Divya Vachan prakat kar raha hai… meri pavitra atma.'}
                                        </Text>
                                    </Surface>
                                </View>
                            )
                        }
                    />
                )}




                <View style={styles.inputRow}>

                    <View style={styles.inputBox}>
                        <TextInput
                            // mode="outlined"
                            placeholder={getPlaceholder()}
                            placeholderTextColor="#888"
                            value={ChatgptinputText}
                            onChangeText={(text) => {
                                setChatGptInputText(text);
                            }}
                            multiline
                            style={styles.textInput}
                            outlineColor="transparent"
                            activeOutlineColor={theme.colors.primary}
                            contentStyle={{
                                color: 'black',
                                fontSize: 16,
                            }}
                            disabled={isLoading}
                        // onFocus={() => {
                        //     // Give the keyboard a moment to appear, then scroll to bottom
                        //     setTimeout(() => {
                        //         flatListRef.current?.scrollToEnd({ animated: false });
                        //     }, 100);
                        // }}
                        />
                        <IconButton
                            icon={isRecording ? "microphone-off" : "microphone"}
                            onPress={toggleVoiceInput}
                            style={styles.micButton}
                            iconColor={isRecording ? "#d32f2f" : "#666"}
                        />
                    </View>

                    <IconButton
                        icon="send"
                        mode="contained"
                        onPress={() => sendGptMessage(ChatgptinputText)}
                        disabled={!ChatgptinputText.trim() || isLoading}
                        style={styles.sendButton}
                        iconColor="white"
                    />

                </View>

            </KeyboardAvoidingView>
            <Modal
                visible={showKrishnaModal}
                transparent
                animationType="fade"
            // onRequestClose={() => setShowKrishnaModal(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 24,
                        borderRadius: 16,
                        width: '80%',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginBottom: 16,
                            color: theme.colors.primary
                        }}>
                            {
                                languagehandle === 'hindi'
                                    ? '🙏 भगवान का संदेश'
                                    : languagehandle === 'english'
                                        ? '🙏 Message from God'
                                        : '🙏 Bhagwaan ka Sandesh'
                            }
                        </Text>
                        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20, color: "black" }}>
                            {
                                languagehandle === 'hindi'
                                    ? 'आपका फ्री लिमिट समाप्त हो चुका है। कृपया दिव्य राशि खरीदें।'
                                    : languagehandle === 'english'
                                        ? "Your free message limit is over. Please purchase more Divya Rashi to continue."
                                        : 'Jo hua, achha hua. Jo ho raha hai, wo bhi achha ho raha hai. Jo hoga, wo bhi achha hi hoga.'
                            }
                        </Text>
                        <View style={{ width: '100%' }}>
                            <FlatList
                                data={DivyaRashiPlans ? DivyaRashiPlans.slice(1) : []}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            backgroundColor: '#fff',
                                            padding: 16,
                                            borderRadius: 12,
                                            marginBottom: 16,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 4,
                                            elevation: 4, // Android shadow
                                            width: 260,
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
                                            {item?.title}
                                        </Text>
                                        <Text style={{ fontSize: 15, color: '#666', marginBottom: 2 }}>
                                            📩 Messages: {item?.messages}
                                        </Text>
                                        <Text style={{ fontSize: 15, color: '#666' }}>
                                            💠 Divya Rashi: 💰 {item?.divyaRashi}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => handleBuyPlans(item)}
                                            style={{ elevation: 1, paddingVertical: SCREEN_HEIGHT * 0.01, alignItems: "center", width: SCREEN_WIDTH * 0.3, alignSelf: "center", borderRadius: 10, backgroundColor: theme.colors.primary, marginTop: 10 }}>
                                            <Text style={{ color: "white", fontWeight: "500" }}> 💰 Buy Now</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                                contentContainerStyle={{ alignItems: 'center' }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16 }}>
                                {languagehandle === 'hindi' ? 'बाहर जाएं' : 'Exit'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    WelcomeMessage: state.setting.WelcomeMessage,
    rechargeOfferList: state.customer.rechargeOfferList,
    CategoryData: state.setting.CategoryData,
    Questionslist: state.setting.Questionslist,
    Answersdata: state.setting.Answersdata,
    ReletedQuestions: state.setting.ReletedQuestions,
    ChatGptReponse: state.setting.ChatGptReponse,
    DivyaRashiPlans: state.setting.DivyaRashiPlans,
    customerData: state.customer.customerData,
    Savemessages: state.setting.Savemessages,
    ChatHistoryletter: state.setting.ChatHistoryletter,
    UserDataSave: state.setting.UserDataSave,




});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: theme.colors.primary,
        elevation: 4,
    },
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    headerIcon: {
        marginRight: 8,
        justifyContent: 'center',
    },
    headerEmoji: {
        fontSize: 24,
    },
    chatContainer: {
        flex: 1,

    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 16,

    },
    messagesContent: {
        paddingVertical: 16,
        paddingBottom: 40,


    },
    messageContainer: {
        marginVertical: 4,
    },
    userMessageContainer: {
        alignItems: 'flex-end',
    },
    botMessageContainer: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    userMessage: {
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 4,
    },
    botMessage: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
        color: 'white'
    },
    userMessageText: {
        color: 'white',
    },
    botMessageText: {
        color: theme.colors.onSurface,
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
        opacity: 0.7,
    },
    userTimestamp: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'right',
    },
    botTimestamp: {
        color: theme.colors.onSurface,
    },
    loadingContainer: {
        alignItems: 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 16,
    },
    loadingBubble: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderBottomLeftRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingText: {
        marginLeft: 8,
        color: theme.colors.onSurface,
        fontSize: 14,
    },
    suggestionsContainer: {
        padding: 16,
        marginTop: 8,
    },
    suggestionsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.primary,
        marginBottom: 12,
    },
    suggestionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    suggestionChip: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: theme.colors.outline,
    },
    suggestionChipText: {
        fontSize: 12,
        color: theme.colors.onSurface,
    },
    inputContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    inputContent: {
        paddingHorizontal: 16,
        color: 'black',
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        margin: 0,
    },
    videoContainer: {
        width: '100%',
        height: SCREEN_HEIGHT,
        marginBottom: 8,
        position: 'absolute'
    },

    video: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        // bottom: SCREEN_HEIGHT * 0.04
    },

    inputBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 24,
        paddingHorizontal: 6,
        // bottom:8

    },

    textInput: {
        flex: 1,
        fontSize: 16,
        // minHeight: 40,
        maxHeight: 120,
        backgroundColor: 'transparent',
        paddingTop: 6,
    },

    inputContent: {
        padding: 0,
    },

    micButton: {
        margin: 0,
    },

    sendButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 24,
        marginBottom: 4,
    },

    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 12,
        maxWidth: '80%',
    },
    user: {
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-end',
    },
    assistant: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: 'black',

    },
});



