import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {  SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { Colors } from '../../config/Screen'
import Icon from 'react-native-vector-icons/FontAwesome'
import { responsiveFontSize, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { launchCamera } from 'react-native-image-picker';


const CameraCard = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SCREEN_WIDTH * 0.04, justifyContent: 'space-between' }}>
            <View style={styles.card}>
                <Icon name="camera" size={20} color="gray" style={styles.icon} />
                <Text style={styles.cardTxt}>Open camera for face capture</Text>
                <TouchableOpacity onPress={() => openCamera('photo')} style={styles.button}>
                    <Text style={styles.buttonText}>Click</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Icon name="video-camera" size={20} color="gray" style={styles.icon} />
                <Text style={styles.cardTxt}>Open camera for face video</Text>
                <TouchableOpacity onPress={() => openCamera('video')} style={styles.button}>
                    <Text style={styles.buttonText}>Click</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Submit = () => {
    return (
        <View style={{paddingHorizontal: SCREEN_WIDTH * 0.04,marginTop:SCREEN_HEIGHT*0.05}}>
            <TouchableOpacity style={{ paddingVertical: SCREEN_HEIGHT * 0.01, borderRadius: 50, alignItems: 'center', backgroundColor: Colors.primaryTheme }}>
                <Text style={{ color: Colors.white, fontSize: responsiveScreenFontSize(2.5), fontWeight: 'bold' }}>Submit Request</Text>
            </TouchableOpacity>
        </View>
    )
}

const openCamera = (mediaType) => {
    let options = {
        mediaType: mediaType,
        cameraType: 'front',
    };

    launchCamera(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            console.log('Image captured successfully');
        }
    });
};

const FormField = ({ value, onChangeText, placeholder, keyboardType }) => (
    <View style={styles.fieldContainer}>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            selectionColor={Colors.lightBlack}
        />
    </View>
);

const VerfiedAstrologer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        location: '',
        language: '',
        expertise: '',
        skills: '',
        experience: ''
    });

    const formFields = [
        { key: 'name', placeholder: 'Full Name', keyboardType: 'default' },
        { key: 'email', placeholder: 'Email Address', keyboardType: 'email-address' },
        { key: 'number', placeholder: 'WhatsApp Number', keyboardType: 'numeric' },
        { key: 'location', placeholder: 'Current Location', keyboardType: 'default' },
        { key: 'language', placeholder: 'Language', keyboardType: 'default' },
        { key: 'expertise', placeholder: 'Expertise', keyboardType: 'default' },
        { key: 'skills', placeholder: 'Skills', keyboardType: 'default' },
        { key: 'experience', placeholder: 'Experience in Year', keyboardType: 'numeric' }
    ];

    const handleInputChange = (key, value) => {
        setFormData(prevState => ({ ...prevState, [key]: value }));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryTheme }}>
            <StatusBar backgroundColor={Colors.primaryTheme} barStyle={'dark-content'} />
            <View style={{ paddingHorizontal: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ marginTop: SCREEN_HEIGHT * 0.02 }}>
                    <Text style={styles.txt}>Only For Astrologer</Text>
                </View>
                <View style={styles.container}>
                    <View style={{ marginBottom: SCREEN_HEIGHT * 0.01 }}>
                        <Text style={styles.txt1}>New astrologer registration form</Text>
                    </View>
                    <FlatList
                       showsVerticalScrollIndicator={false}
                        data={formFields}
                        renderItem={({ item }) => (
                            <FormField
                                value={formData[item.key]}
                                placeholder={item.placeholder}
                                keyboardType={item.keyboardType}
                                onChangeText={(value) => handleInputChange(item.key, value)}
                            />
                        )}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.flatListContent}
                        ListFooterComponent={
                            <View>
                                <CameraCard />
                                <Submit />
                            </View>
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default VerfiedAstrologer

const styles = StyleSheet.create({
    txt: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.white,
        fontSize: 20
    },
    txt1: {
        alignSelf: 'center',
        fontWeight: "500",
        color: Colors.primaryTheme,
        elevation:2,
        fontSize: responsiveScreenFontSize(1.8)
    },
    container: {
        backgroundColor: Colors.white,
     paddingHorizontal:SCREEN_HEIGHT*0.025,
        borderRadius: 20,
        marginTop: SCREEN_HEIGHT * 0.04,
        height: SCREEN_HEIGHT * 0.89,paddingVertical:SCREEN_HEIGHT*0.02
    },
    flatListContent: {
        paddingBottom: SCREEN_HEIGHT * 0.02,
    },
    fieldContainer: {
        marginBottom: SCREEN_HEIGHT * 0.015,
        // paddingHorizontal: SCREEN_WIDTH * 0.04
    },
    input: {

        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius:30,
        paddingHorizontal:SCREEN_WIDTH*0.06,
       
     
        fontSize: responsiveFontSize(1.5),
    },
    card: {
        borderWidth: 1,
        paddingVertical:SCREEN_HEIGHT*0.02,
        height: SCREEN_HEIGHT * 0.15,
        width: SCREEN_WIDTH * 0.35,
        borderRadius: 20
        ,gap:5
    },
    icon: {
        alignSelf: 'center',
        color: Colors.black,
        fontSize: responsiveScreenFontSize(5),
      
    },
    cardTxt: {
        fontSize: responsiveScreenFontSize(1.2),
        textAlign: 'center',
        paddingHorizontal: responsiveScreenHeight(1)
    },
    button: {
        backgroundColor: Colors.primaryTheme,
        alignSelf: 'center',
        paddingVertical: SCREEN_HEIGHT * 0.003,
        paddingHorizontal: SCREEN_HEIGHT * 0.02,
        borderRadius: 5,
       
    },
    buttonText: {
        color: Colors.white,
        fontSize: responsiveScreenFontSize(1.5),
    },
})