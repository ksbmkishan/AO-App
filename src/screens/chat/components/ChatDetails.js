import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, PanResponder, Modal, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import * as ChatActions from '../../../redux/actions/ChatActions';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import RenderInput from './RenderInput';


const FullScreenImage = ({ imageUri, onClose }) => {

  return (
    <Modal visible={!!imageUri} transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: imageUri }} style={styles.fullScreenImage} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ChatDetails = ({ dispatch, chatData, customerData, chatImageData, chatReplay }) => {
  const [showImage, setShowImage] = useState(false);
  const [currentImage, setCurrentImage] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const giftedChatRef = useRef(null);

  const handleLoadEarlier = async () => {
    if (!isLoadingEarlier && hasMoreMessages) {
      setIsLoadingEarlier(true);

      // Get the oldest message in the current chat data
      const oldestMessage = chatData[chatData.length - 1];
      const lastMessageTimestamp = oldestMessage?.addedAt; // Use the 'addedAt' field for pagination

      // Dispatch an action to fetch older messages
      const payload = {
        dispatch: dispatch,
        lastMessageTimestamp: lastMessageTimestamp,
        chatData: chatData // Pass the timestamp of the oldest message
      };

      await dispatch(ChatActions.getChatData(payload));

      // Check if there are more messages to load
      if (chatData.length === 0 || chatData.length < 10) {
        setHasMoreMessages(false);
      }

      setIsLoadingEarlier(false);
    }
  };




  const slideY = useSharedValue(100);

  // console.log('chatImageData :: ',chatData)

  useEffect(() => {
    if (chatReplay) {
      slideY.value = withTiming(0, { duration: 300 });
    } else {
      slideY.value = withTiming(100, { duration: 300 });
    }
  }, [chatReplay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideY.value }],
    opacity: chatReplay ? 1 : 0,
  }));

  console.log(chatData.length, ' message :: kkk ');

  const onSend = useCallback((messages = []) => {
    console.log('afsaaa')
    let msg = {
      ...messages[0],
      sent: false,
    };
    console.log(' On Send ::: ', msg);
    console.log('chat Replay ::: ', chatReplay);
    if (chatImageData && chatImageData.length > 0) {
      const image = chatImageData;
      msg = {
        ...msg,
        image: image,
      };
      dispatch(ChatActions.setChatImageData(null));
      dispatch(ChatActions.saveChatMessage(msg));
      dispatch(ChatActions.onChatImageSend({ uris: image, message: msg }));
    } else if (msg.text.length == 0) {
      // Do nothing if the message is empty
    } else {
      if (chatReplay) {
        console.log('chat Replay ::: ', chatReplay);
        msg.text = `Replying to: "${chatReplay}"\n\n${msg.text}`;

      }
      console.log('message :: ', msg);
      dispatch(ChatActions.setChatReplay(null));
      dispatch(ChatActions.saveChatMessage(msg));
      dispatch(ChatActions.sendChatMessage(msg));
    }
  }, [chatImageData, chatReplay]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);



  const RenderMessage = (props) => {
    const { currentMessage, previousMessage } = props;
    // console.log('rtest ',currentMessage?.images)
    const translateX = useRef(new Animated.Value(0)).current;

    const currentDate = moment(currentMessage?.createdAt).format("DD/MM/YYYY");
    const previousDate = previousMessage ? moment(previousMessage?.createdAt).format("DD/MM/YYYY") : null;
    const showDate = currentDate !== previousDate;

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) { // केवल राइट स्वाइप की अनुमति दें
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        console.log(gestureState.dx);
        if (gestureState.dx > 50) {

          if (currentMessage?.text?.match(/Replying to:\s*"([^"]+)"/)) {
            const messageText = currentMessage.text.split('\n').pop().trim();
            dispatch(ChatActions.setChatReplay(messageText));
          } else {
            dispatch(ChatActions.setChatReplay(currentMessage?.text));
          }
        }
        Animated.timing(translateX, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      },
    });

    return (
      <View style={{ marginBottom: Sizes.fixPadding * 2 }}>
        {showDate && (
          <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'center', marginVertical: 5, fontWeight: 'bold' }}>
            {currentDate}
          </Text>
        )}
        <Animated.View
          style={{
            transform: [{ translateX: translateX }],
            margin: Sizes.fixPadding,
            bottom: Sizes.fixPadding * -1
          }}
          {...panResponder.panHandlers}
        >
          {currentMessage?.user?._id !== `customer_${customerData?._id}` ? (
            <View style={{ alignSelf: 'flex-start' }}>
              {/* रिप्लाई वाला मैसेज */}
              {currentMessage?.text?.match(/Replying to:\s*"([^"]+)"/) ? (
                <View style={{ backgroundColor: '#FFF', borderRadius: Sizes.fixPadding, padding: 5 }}>
                  <View
                    style={{
                      backgroundColor: '#d9d9d9',
                      padding: 5,
                      borderRadius: 8,
                      marginBottom: 5,
                      borderLeftWidth: 4,
                      borderLeftColor: '#8a8a8a',
                    }}
                  >
                    <Text style={{ color: '#555', fontSize: 14 }}>
                      {currentMessage.text.match(/Replying to:\s*"([^"]+)"/)[1]}
                    </Text>
                  </View>
                  <Text style={{ color: 'black', fontSize: 14 }}>{currentMessage.text.split('\n').pop().trim()}</Text>
                  <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-end' }}>{moment(currentMessage?.createdAt).format("hh:mm A")}</Text>
                </View>
              ) : currentMessage?.images ? (
                Array.isArray(currentMessage.images) ? (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {currentMessage.images.map((img, index) => (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        style={{ backgroundColor: 'white', padding: 5, borderRadius: Sizes.fixPadding, margin: 5, alignSelf: 'flex-end', }}
                        onPress={() => setSelectedImage(img)}
                      >
                        <Image
                          source={{ uri: img }}
                          style={{
                            width: 100, // Smaller size for multiple images
                            height: 100,
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: Sizes.fixPadding
                          }}
                        />
                        <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-end' }}>{moment(currentMessage?.createdAt).format("hh:mm A")}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ backgroundColor: 'white', padding: 5, borderRadius: Sizes.fixPadding }}
                    onPress={() => setSelectedImage(currentMessage.images)}
                  >
                    <Image
                      source={{ uri: currentMessage.images }}
                      style={{
                        width: 200,
                        height: 100,
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: Sizes.fixPadding,
                        margin: 5
                      }}
                    />
                    <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-end' }}>{`${moment(currentMessage?.createdAt).format("hh:mm A")}`} </Text>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{
                    backgroundColor: '#FFF',
                    padding: 5,
                    borderRadius: Sizes.fixPadding,
                    borderColor: '#FFF',
                    borderWidth: 2,
                    margin: 5,
                  }}
                >
                  <Text style={{ color: 'black', fontSize: 18 }}>{currentMessage?.text}</Text>
                  <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-end' }}>{`${moment(currentMessage?.createdAt).format("hh:mm A")}`}</Text>
                </TouchableOpacity>
              )}

              {/* मुख्य मैसेज */}

            </View>
          ) : (
            <View style={{ alignSelf: 'flex-end', }}>
              {currentMessage?.text?.match(/Replying to:\s*"([^"]+)"/) ? (
                <View
                  style={{
                    backgroundColor: '#AE852C',
                    borderRadius: Sizes.fixPadding,
                    padding: 5
                  }}>
                  {/* रिप्लाई किया गया मैसेज */}
                  <View
                    style={{
                      backgroundColor: '#d9d9d9',
                      padding: 5,
                      borderRadius: 8,
                      marginBottom: 5,
                      borderLeftWidth: 4,
                      borderLeftColor: '#8a8a8a',
                      marginRight: 5
                    }}
                  >
                    <Text style={{ color: '#555', fontSize: 14 }}>
                      {currentMessage.text.match(/Replying to:\s*"([^"]+)"/)[1]}
                    </Text>

                  </View>

                  {/* मुख्य मैसेज */}
                  <Text style={{ color: 'white', fontSize: 18 }}>{currentMessage.text.split('\n').pop().trim()}</Text>
                  <Text style={{ color: 'white', fontSize: 12, alignSelf: 'flex-end' }}>{moment(currentMessage?.createdAt).format("hh:mm A")}</Text>

                </View>
              ) :
                currentMessage?.images ? (
                  Array.isArray(currentMessage.images) ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {currentMessage.images.map((img, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.8}
                          style={{ backgroundColor: 'white', padding: 5, borderRadius: Sizes.fixPadding, margin: 5, alignSelf: 'flex-end', }}
                          onPress={() => setSelectedImage(img)}
                        >
                          <Image
                            source={{ uri: img }}
                            style={{
                              width: 100, // Smaller size for multiple images
                              height: 100,
                              borderWidth: 2,
                              borderColor: 'white',
                              borderRadius: Sizes.fixPadding
                            }}
                          />
                          <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-end' }}>{moment(currentMessage?.createdAt).format("hh:mm A")}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{ backgroundColor: 'white', padding: 5, borderRadius: Sizes.fixPadding }}
                      onPress={() => setSelectedImage(currentMessage.images)}
                    >
                      <Image
                        source={{ uri: currentMessage.images }}
                        style={{
                          width: 200,
                          height: 100,
                          borderWidth: 2,
                          borderColor: 'white',
                          borderRadius: Sizes.fixPadding,
                          margin: 5
                        }}
                      />
                      <Text style={{ color: 'grey', fontSize: 12, alignSelf: 'flex-end' }}>{`${moment(currentMessage?.createdAt).format("hh:mm A")}`}</Text>
                    </TouchableOpacity>
                  )
                ) :
                  (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{
                        backgroundColor: '#AE852C',
                        padding: Sizes.fixPadding,
                        borderRadius: Sizes.fixPadding,
                        borderColor: '#AE852C',
                        borderWidth: 2,
                        margin: 0,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 18 }}>{currentMessage?.text}</Text>
                      <Text style={{ color: 'white', fontSize: 12, alignSelf: 'flex-end' }}>{`${moment(currentMessage?.createdAt).format("hh:mm A")}`}</Text>
                    </TouchableOpacity>
                  )}


            </View>

          )}

        </Animated.View>
      </View>
    );
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 40} 
      style={{flex:1}}
    >
        <ImageBackground
          source={require('../../../assets/astroOneImages/chat_bg.png')}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <GiftedChat
            messageContainerRef={giftedChatRef}
            messages={chatData}



            renderMessage={(props) => {
              // console.log('Message ::', props);
              return <RenderMessage {...props} />;
            }}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: `customer_${customerData?._id}`,
              name: customerData?.customerName,
            }}
            wrapperStyle={{ flex: 1 }}
            isKeyboardInternallyHandled={false}
            renderInputToolbar={(props) => <RenderInput onSend={onSend} {...props} />}
            placeholder="Type your message..."
            alwaysShowSend
            textInputProps={{ style: { ...Fonts.primaryHelvetica, flex: 1, color: '#837F7F' }, placeholderTextColor: Colors.gray, }}
            renderChatFooter={() =>
              chatImageData && chatImageData.length > 0 && (
                <View
                  style={{
                    height: SCREEN_HEIGHT * 0.15,
                    backgroundColor: Colors.primaryLight,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}
                >
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
                    {chatImageData.map((img, index) => (
                      <View key={index} style={{ position: 'relative', marginRight: 10 }}>
                        <Image
                          source={{ uri: img }}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                        />
                        {/* Remove Specific Image */}
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            const updatedImages = chatImageData.filter((_, i) => i !== index);
                            dispatch(ChatActions.setChatImageData(updatedImages));
                          }}
                          style={{
                            position: 'absolute',
                            zIndex: 99,
                            right: 5,
                            top: 5,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            borderRadius: 15,
                            padding: 5,
                          }}
                        >
                          <Ionicons name="close" color={Colors.white} size={16} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )

            }
            onLoadEarlier={handleLoadEarlier}
            isLoadingEarlier={isLoadingEarlier}
            loadEarlier={hasMoreMessages}
          />


          {showImage && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                backgroundColor: 'rgba(0, 0, 0, 1)',
                height: '92%',
                width: SCREEN_WIDTH,
                alignSelf: 'center',
                padding: 10,
                paddingHorizontal: 0,
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
                <TouchableOpacity>
                  <Feather name="download" color="#fff" size={22} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowImage(false)}>
                  <Entypo name="circle-with-cross" color="#fff" size={24} />
                </TouchableOpacity>
              </View>
              <Image source={{ uri: currentImage }} style={{ height: '90%', width: SCREEN_WIDTH, marginTop: 10 }} />
            </View>
          )}
          <FullScreenImage imageUri={selectedImage} onClose={() => setSelectedImage(null)} />
        </ImageBackground>
        </KeyboardAvoidingView>
    
    </TouchableWithoutFeedback>
  );
}

const mapStateToProps = state => ({
  chatData: state.chat.chatData,
  customerData: state.customer.customerData,
  chatImageData: state.chat.chatImageData,
  requestedData: state.chat.requestedData,
  chatReplay: state.chat.chatReplay
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  replyContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding * 5,
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding

  },
  imagePickerButtonInput: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInput: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  sendButtonInput: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreenImage: { width: '90%', height: '90%', resizeMode: 'contain' },
});