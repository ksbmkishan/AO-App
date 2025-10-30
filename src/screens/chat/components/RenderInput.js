import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import * as ChatActions from '../../../redux/actions/ChatActions';
import * as SettingActions from '../../../redux/actions/SettingActions'
import { Sizes } from '../../../assets/style';
import { t } from 'i18next';
import { showToastMessage } from '../../../utils/services';

const RenderInput = React.memo(({ onSend }) => {
  const [textMessage, setTextMessage] = useState('');
  const dispatch = useDispatch();
  const chatReplay = useSelector((state) => state.chat.chatReplay);
  const chatImageData = useSelector((state) => state.chat.chatImageData);

  // Animation value
  const slideY = useSharedValue(100);

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

  const customOnPress = (text) => {
    const regex = /\d{4,}/;
    if (regex.test(text)) {
      return showToastMessage({ message: 'Maximum 3 digits can be sent' });
    }
    if (text && onSend) {
      onSend({ text: text.trim() }, true);
      setTextMessage('');
    }
  };

  const handleSendImage = () => {
    if (chatImageData) {
      onSend([{ image: chatImageData }]);
      dispatch(ChatActions.setChatImageData(null));
    }
  };

  return (
   
   <View style={styles.container}>
    
      {chatReplay && (
        <Animated.View style={[styles.replyContainer, animatedStyle]}>
          <TouchableOpacity
            onPress={() => dispatch(ChatActions.setChatReplay(null))}
            style={styles.closeButton}
          >
            <Ionicons name="close" color={'black'} size={20} />
          </TouchableOpacity>
          <Text style={{ color: 'black' }}>{chatReplay}</Text>
        </Animated.View>
      )}

      {/* Input Container */}
      <View style={styles.containerInput}>
        {/* Image Picker */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.imagePickerButtonInput}
          onPress={() => dispatch(SettingActions.setImagePickerVisible(true))}
        >
          <Image source={require('../../../assets/astroOneImages/chat_do.png')} style={styles.imageInput} resizeMode='contain' />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          value={textMessage}
          placeholderTextColor={'grey'}
          placeholder={t("Enter Text .....")}
          multiline
          onChangeText={(value) => setTextMessage(value)}
        />

        {/* Send Button */}
        {chatImageData ? (
          <TouchableOpacity onPress={handleSendImage}>
            <Ionicons name="send" size={24} color={'#007AFF'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => customOnPress(textMessage)} style={styles.sendButtonInput}>
            <Ionicons name="send" color="#33363F" size={32} />
          </TouchableOpacity>
        )}
      </View>
  </View>
  );
});

const styles = {
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
    alignSelf: 'flex-start',
    borderRadius: 100,
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
  },
  imagePickerButtonInput: {
    marginRight: 10,
  },
  imageInput: {
    width: 20,
    height: 20,
    tintColor: '#007AFF',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    color: '#000',
    minHeight: 40,
    maxHeight: 100, // LIMIT HEIGHT

  },
  sendButtonInput: {
    marginLeft: 10,
  },
};

export default RenderInput;
