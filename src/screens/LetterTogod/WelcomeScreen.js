import React, { useEffect, useState, } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Text,
    TextInput,
    Button,
    Card,
    SegmentedButtons,
    ActivityIndicator,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { gradients, theme } from './theme';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import * as SettingActions from '../../redux/actions/SettingActions';
import * as KundliActions from '../../redux/actions/KundliActions';
import moment from 'moment';
import { Fonts } from '../../assets/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../language/i18n';
import TranslateText from '../language/TranslateText';
import SetPinModal from './SetPinModal';
import { showToastMessage } from '../../utils/services';
import { useTranslation } from 'react-i18next';
import OTPModal from './OtpModel';
import NewPinModal from './NewPinModel';
import axios from 'axios';
import { api_url } from '../../config/constants';
import * as CustomerActions from '../../redux/actions/CustomerActions'



const WelcomeScreen = ({ navigation, customerData, locationData, dispatch, SavedProfilesData, LetterLagnachart, LetterNavmanshachart, LetterDashmanshachart, LetterBIRTHchart, LETTERallPlanets }) => {

    const [userData, setUserData] = useState({
        name: customerData?.customerName || '',
        mobile: customerData?.phoneNumber || '',
        language: 'hindi',
    });
    const { t } = useTranslation();
    const languagehandle = userData?.language;
    const [Fullname, setFullname] = useState("");
    const [Phonenumber, setPhonenumber] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const serverGender = customerData?.gender ? `${customerData?.gender[0]?.toUpperCase()}${customerData?.gender.slice(1)}` : '';
    const [gender, setGender] = useState(serverGender || '');
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dob, setDob] = useState(null);
    const [tob, setTob] = useState(null);
    const [userCategory, setUserCategory] = useState('');
    const [showUserCategoryDropdown, setShowUserCategoryDropdown] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [otp, setOtp] = useState(null);


    const fullDateTime = customerData?.timeOfBirth || "";

    if (fullDateTime.includes(" ")) {
        const timePart = fullDateTime.split(" ")[1]; // "11:10"
        const [hour, minute] = timePart.split(":");
        birthHour = hour;
        birthMinute = minute;
    }

    useEffect(() => {
        dispatch(SettingActions.getSavedProfiles());
    }, [dispatch]);


    useEffect(() => {
        const payload = {
            place: customerData?.address?.birthPlace,
            latitude: customerData?.address?.birthPlace,
            longitude: customerData?.address?.birthPlace,
            timezone: "5.5",
        }
        console.log("payload letter birth", payload)
        dispatch(KundliActions.getLetterPanchang(payload))
    }, [dispatch])


    useEffect(() => {
        if (customerData?.phoneNumber || customerData?.customerName) {
            setUserData((prev) => ({
                ...prev,
                name: customerData.customerName || '',
                mobile: customerData.phoneNumber || '',
            }));
        }
    }, [customerData])

    const formattedDob = dob ? moment(dob).format('YYYY-MM-DD') : '';
    const formattedTob = tob ? moment(tob).format('HH:mm') : '';

    const SaveuserdataDB = () => {
        if (!validateForm()) return;
        setIsSaving(true); // show loader

        const payload = {
            lang: t("lang"),
            gender: gender,
            name: Fullname,
            place: locationData?.address,
            lat: locationData?.lat || 34.1642836,
            dob: dob,
            tob: formattedTob,
            long: locationData?.lon || -118.5248938,
        };

        console.log("lgnachartpayload", payload);
        dispatch(KundliActions.getLetterDashmanshaChart(payload));
        dispatch(KundliActions.getLetterLagnaChart(payload));
        dispatch(KundliActions.getLetterNavmanshaChart(payload));
        dispatch(KundliActions.getLetterBIRTHChart(payload));
        dispatch(KundliActions.getLetterKPALLPALNETS(payload));
    };

    useEffect(() => {
        if (isSaving &&
            LetterLagnachart?.chart &&
            LetterNavmanshachart?.chart &&
            LetterDashmanshachart?.chart &&
            LetterBIRTHchart?.chart &&
            LETTERallPlanets


        ) {
            const data = {
                createdBy: customerData?._id,
                fullName: Fullname,
                gender: gender,
                dateOfBirth: formattedDob,
                timeOfBirth: formattedTob,
                placeOfBirth: locationData?.address,
                preferredLanguage: "English",
                userCategory: userCategory,
                kundliData: {
                    name: Fullname,
                    date_of_birth: formattedDob,
                    time_of_birth: formattedTob,
                    place_of_birth: locationData?.address,
                    gender: gender,
                    lagna_chart: LetterLagnachart?.chart,
                    navamsa_chart: LetterNavmanshachart?.chart,
                    dashamsha_chart: LetterDashmanshachart?.chart,
                    birth_chart: LetterBIRTHchart?.chart,
                    plantery_position: LETTERallPlanets,
                },
            };
            if (!data?.kundliData?.lagna_chart) {
                console.log("Lagna chart missing. Aborting save...");
                setIsSaving(false);
                return;
            }

            const payload = {
                data: {
                    ...data,
                },
                onComplete: () => navigation.navigate("Chat", {
                    languagehandle,
                    userData: data,
                    profileId: selectedProfileId,
                }),
            }

            dispatch(SettingActions.getUserDatasaveDB(payload));

        }
    }, [isSaving,
        LetterLagnachart,
        LetterNavmanshachart,
        LetterDashmanshachart,
        LetterBIRTHchart,
        LETTERallPlanets,

    ]);

    {
        isSaving && (
            <View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: 'white', marginTop: 10 }}>Please wait...</Text>
            </View>
        )
    }

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!Fullname.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!Phonenumber.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(Phonenumber.replace(/\D/g, ''))) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }

        if (!gender) {
            newErrors.gender = 'Gender is required';
        }

        if (!dob) {
            newErrors.dob = 'Date of Birth is required';
        }

        if (!tob) {
            newErrors.tob = 'Time of Birth is required';
        }

        if (!locationData?.address) {
            newErrors.placeOfBirth = 'Place of Birth is required';
        }

        if (!userCategory) {
            newErrors.userCategory = 'User category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const languageOptions = [
        { value: 'hindi', label: 'हिंदी', i18nCode: 'hi' },
        { value: 'english', label: 'English', i18nCode: 'en' },
        { value: 'hinglish', label: 'हिंग्लिश', i18nCode: 'hi-en' }, // assume this is your Hinglish code
    ];

    const getTexts = () => {
        switch (userData.language) {
            case 'hindi':
                return {
                    title: 'भगवान से जुड़ें',
                    subtitle: 'आपके मन में जो भी है भगवान से उसका उत्तर पाएं',
                    nameLabel: 'नाम',
                    Genderlabel: "लिंग",
                    Doblable: "जन्म तिथि",
                    toblabel: "जन्म का समय",
                    placelable: "जन्म स्थान",
                    userCat: "उपयोगकर्ता श्रेणी",
                    namePlaceholder: 'अपना नाम लिखें',
                    mobileLabel: 'मोबाइल नंबर',
                    mobilePlaceholder: 'अपना मोबाइल नंबर लिखें',
                    languageLabel: 'भाषा चुनें',
                    connectButton: '🙏 भगवान से मिलें',
                    Savedprofile: "प्रोफ़ाइल सहेजी",
                    lettergod: "ईश्वर को पत्र",
                    catplaceholder: "श्रेणी चुनें"
                };
            case 'english':
                return {
                    title: 'Connect with Divine',
                    subtitle: 'Get answers from God for whatever is in your heart',
                    nameLabel: 'Name',
                    Genderlabel: "Gender",
                    Doblable: "Date of Birth",
                    toblabel: "Time of Birth",
                    userCat: "User Category",
                    placelable: "Place of Birth",
                    namePlaceholder: 'Enter your name',
                    mobileLabel: 'Mobile Number',
                    mobilePlaceholder: 'Enter your mobile number',
                    languageLabel: 'Choose Language',
                    connectButton: '🙏 Connect with Divine',
                    Savedprofile: "Saved Profiles",
                    lettergod: "Letter To God",
                    catplaceholder: "Select Category"


                };
            case 'hinglish':
                return {
                    title: 'Bhagwan se Jude',
                    subtitle: 'Aapke mann mein jo bhi hai Bhagwan se uska answer paaye',
                    nameLabel: 'Naam',
                    namePlaceholder: 'Apna naam likhe',
                    Savedprofile: "Profile save hue",
                    Genderlabel: "Ling",
                    Doblable: "Janm ki Tareek",
                    toblabel: "Janm ka Time",
                    userCat: "User ki Category",
                    mobileLabel: 'Mobile Number',
                    mobilePlaceholder: 'Apna mobile number likhe',
                    languageLabel: 'Language Choose Kare',
                    connectButton: '🙏 Bhagwan se Mile',
                    Savedprofile: "Profile save hai",
                    lettergod: "Bhagwan ko patra",
                    catplaceholder: "Category Select kare",
                    placelable: "Janm kah staan",
                };
            default:
                return {};
        }
    };

    const showLanguageConfirmAlert = async (newLang) => {
        if (newLang === userData.language) return;

        const selectedOption = languageOptions.find(opt => opt.value === newLang);
        const selectedLangLabel = selectedOption?.label;
        const i18nLangCode = selectedOption?.i18nCode;

        Alert.alert(
            'Change Language',
            `Switch to "${selectedLangLabel}"?`,
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await AsyncStorage.setItem('selectedLanguage', i18nLangCode);
                            await i18n.changeLanguage(i18nLangCode);

                            // update screen UI language also
                            setUserData(prev => ({
                                ...prev,
                                language: newLang,
                            }));
                        } catch (err) {
                            console.error("Language change error:", err);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };
    useEffect(() => {
        const initializeLanguage = async () => {
            const storedLangCode = await AsyncStorage.getItem('selectedLanguage');

            const defaultLangCode = 'hi';
            const defaultAppLang = 'hindi';

            const selectedLangCode = storedLangCode || defaultLangCode;
            const selectedAppLang =
                languageOptions.find(opt => opt.i18nCode === selectedLangCode)?.value || defaultAppLang;

            await i18n.changeLanguage(selectedLangCode);

            setUserData(prev => ({
                ...prev,
                language: selectedAppLang,
            }));
        };

        initializeLanguage();
    }, []);
    const texts = getTexts();

    const handlePinConfirm = (pin) => {
        console.log("Your PIN:", pin, customerData?.pin);
        if (customerData?.pin == 0) {
            dispatch(SettingActions.onUpdatePin({ pin }));
            setModalVisible(false);
        } else if (customerData?.pin == pin) {
            setModalVisible(false);
        } else {
            showToastMessage({ message: "Invalid PIN. Please try again." });
        }

    };

    const handleForget = async() => {
        setModalVisible(false);
        if (customerData?.phoneNumber) {
            try {

                // api request
                const ressponse = await axios.post(api_url + 'customers/forget-pin-otp', { mobile: customerData?.phoneNumber });
                console.log(ressponse, 'response');
                if (ressponse?.data?.success) {
                    setShow(true);
                    setOtp(ressponse?.data?.otp);
                }

            } catch (e) {
                console.log('error ',e);
            }
        } else {
            showToastMessage({ message: "Please Update Your Profile" });
        }
        



    }

    const handleOtpSubmit = (data) => {
        console.log('rrrr',data);
        if (otp == data) {
            setShow(false);
            setVisible(true);
        } else {
            showToastMessage({ message: "OTP invalid" });
        }

    }

    const handleSavePin = async(pin) => {
        setVisible(false);
        try {
            const ressponse = await axios.post(api_url + 'customers/update-set-pin', {customerId: customerData?._id, pin: pin});
            if(ressponse?.data?.success) {
                Alert.alert(
            "PIN Saved Successfully",
            `Your new PIN is: ${pin}`,
            [
                {
                    text: "OK",
                    onPress: () => {setModalVisible(true),
                        dispatch(CustomerActions.getCustomerData())
                    }, // 👈 reopen modal or perform desired action
                },
            ],
            { cancelable: false }
        );
            }
        } catch(e) {
            console.log('error',e);
        }
        
    };

    return (
        <LinearGradient colors={gradients.background} style={styles.container}>


            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <MyHeader title={'Letter to God'} navigation={navigation} />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.omSymbol}>🕉️</Text>
                        </View>
                        <Text style={styles.title}>{texts.lettergod}</Text>
                        <Text style={styles.subtitle}>{texts.subtitle}</Text>

                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" duration={1000} delay={300}>
                        <Card style={styles.formCard}>
                            <Card.Content style={styles.cardContent}>
                                <Text style={styles.formTitle}>{texts.title}</Text>

                                <View style={styles.inputGroup}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: SCREEN_HEIGHT * 0.02 }}>
                                        <Text style={styles.label}>{texts.languageLabel}</Text>
                                        <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
                                            <Text style={{ ...Fonts.PoppinsMedium }}>{texts.Savedprofile}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <SegmentedButtons
                                        value={userData.language}
                                        onValueChange={(value) => showLanguageConfirmAlert(value)}
                                        buttons={languageOptions.map(option => ({
                                            ...option,
                                            style: {
                                                backgroundColor: userData.language === option.value ? theme.colors.primary : "white",
                                            },
                                            labelStyle: {
                                                color: userData.language === option.value ? "white" : "black", // white for selected, black for unselected
                                                fontWeight: "bold",
                                            },
                                        }))}
                                        style={styles.segmentedButtons}
                                    />
                                </View>

                                <View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>{texts.nameLabel}</Text>

                                        <TextInput

                                            value={Fullname}
                                            onChangeText={(text) => setFullname(text)}
                                            placeholder={texts.namePlaceholder}
                                            placeholderTextColor="#ccc"
                                            style={{
                                                borderWidth: 1,
                                                borderColor: theme.colors.primary,
                                                color: '#000',
                                                backgroundColor: "#fff",
                                                paddingHorizontal: SCREEN_WIDTH * 0.025,
                                                borderRadius: 5,

                                            }}
                                        />
                                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>{texts.mobileLabel}</Text>
                                        <TextInput
                                            value={Phonenumber}
                                            onChangeText={(text) => setPhonenumber(text)}
                                            placeholder={texts.mobilePlaceholder}
                                            placeholderTextColor="#ccc"
                                            keyboardType='numeric'
                                            maxLength={10}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: theme.colors.primary,
                                                backgroundColor: "white",
                                                paddingHorizontal: SCREEN_WIDTH * 0.025,
                                                borderRadius: 5,
                                                color: "black",
                                            }}
                                        />
                                        {errors.mobile && <Text style={styles.errorText}>{"Phone Number is Required"}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>{texts.Genderlabel}</Text>
                                        <View style={{
                                            borderWidth: 1,
                                            paddingVertical: SCREEN_HEIGHT * 0.025,
                                            paddingHorizontal: SCREEN_WIDTH * 0.03,
                                            borderRadius: 5,
                                            backgroundColor: 'white',
                                            borderColor: theme.colors.primary,
                                        }}>
                                            <TouchableOpacity
                                                style={styles.dropdown}
                                                onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                                            >
                                                <Text style={styles.dropdownText}>
                                                    {gender ? <TranslateText title={gender} /> : <TranslateText title={'Select Gender'} />}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {showGenderDropdown && (
                                            <View style={styles.dropdownOptions}>
                                                {['Male', 'Female', 'Other'].map((item) => (
                                                    <TouchableOpacity
                                                        key={item}
                                                        style={styles.dropdownItem}
                                                        onPress={() => {
                                                            setGender(item);
                                                            setShowGenderDropdown(false);
                                                        }}
                                                    >
                                                        <Text style={{ color: "black" }}><TranslateText title={item} /></Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>{texts.Doblable}</Text>
                                        <TouchableOpacity
                                            onPress={() => setShowDatePicker(true)}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: theme.colors.primary,
                                                paddingVertical: SCREEN_HEIGHT * 0.023,
                                                backgroundColor: "white",
                                                paddingHorizontal: SCREEN_WIDTH * 0.025,
                                                borderRadius: 5
                                            }}
                                        >
                                            <Text style={{ color: dob ? 'black' : '#aaa' }}>
                                                {dob ? moment(dob).format('YYYY-MM-DD') : <TranslateText title={'Select Date'} />}
                                            </Text>
                                        </TouchableOpacity>

                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={dob || new Date()}
                                                mode="date"
                                                display="default"
                                                maximumDate={new Date()}
                                                onChange={(event, selectedDate) => {
                                                    setShowDatePicker(Platform.OS === 'ios'); // keep open in iOS
                                                    if (selectedDate) {
                                                        setDob(selectedDate);
                                                    }
                                                }}
                                            />
                                        )}

                                        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>{texts.toblabel}</Text>

                                        <TouchableOpacity
                                            onPress={() => setShowTimePicker(true)}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: theme.colors.primary,
                                                paddingVertical: SCREEN_HEIGHT * 0.023,
                                                backgroundColor: "white",
                                                paddingHorizontal: SCREEN_WIDTH * 0.025,
                                                borderRadius: 5
                                            }}
                                        >
                                            <Text style={{ color: tob ? 'black' : '#aaa' }}>
                                                {tob ? moment(tob).format('hh:mm A') : <TranslateText title={'Select Time'} />}
                                            </Text>
                                        </TouchableOpacity>

                                        {showTimePicker && (
                                            <DateTimePicker
                                                value={tob || new Date()}
                                                mode="time"
                                                display="default"
                                                onChange={(event, selectedTime) => {
                                                    setShowTimePicker(false);
                                                    if (selectedTime) {
                                                        setTob(selectedTime);
                                                    }
                                                }}
                                            />
                                        )}

                                        {errors.tob && <Text style={styles.errorText}>{errors.tob}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>{texts.placelable}</Text>
                                        <TouchableOpacity

                                            onPress={() => { navigation.navigate("placeOfBirth") }}
                                            style={styles.dateInput}

                                        >
                                            <Text style={styles.dropdownText}>
                                                {!locationData ? <TranslateText title={"Select birth place"} /> : <TranslateText title={locationData?.address} />}
                                            </Text>
                                        </TouchableOpacity>
                                        {errors.placeOfBirth && <Text style={styles.errorText}>{errors.placeOfBirth}</Text>}
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>{texts.userCat}</Text>
                                        <View style={{
                                            borderWidth: 1,
                                            paddingVertical: SCREEN_HEIGHT * 0.025,
                                            paddingHorizontal: SCREEN_WIDTH * 0.03,
                                            borderRadius: 5,
                                            backgroundColor: 'white',
                                            borderColor: theme.colors.primary,
                                        }}>
                                            <TouchableOpacity
                                                style={styles.dropdown}
                                                onPress={() => setShowUserCategoryDropdown(!showUserCategoryDropdown)}
                                            >
                                                <Text style={styles.dropdownText}>
                                                    {userCategory ? <TranslateText title={userCategory} /> : texts.catplaceholder}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {showUserCategoryDropdown && (
                                            <View style={styles.dropdownOptions}>
                                                {[
                                                    'Job',
                                                    'Business',
                                                    'Study',
                                                    'Marriage',
                                                    'Health',
                                                    'Finance',
                                                    'Spirituality',
                                                    'Family',
                                                ].map((item) => (
                                                    <TouchableOpacity
                                                        key={item}
                                                        style={styles.dropdownItem}
                                                        onPress={() => {
                                                            setUserCategory(item);
                                                            setShowUserCategoryDropdown(false);
                                                        }}
                                                    >
                                                        <Text style={{ color: "black" }}><TranslateText title={item} /></Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                        {errors.userCategory && <Text style={styles.errorText}>{errors.userCategory}</Text>}
                                    </View>

                                </View>


                                <Button
                                    mode="contained"
                                    onPress={SaveuserdataDB}
                                    style={styles.submitButton}
                                    contentStyle={styles.submitButtonContent}
                                    labelStyle={styles.submitButtonLabel}
                                >
                                    {texts.connectButton}
                                </Button>
                            </Card.Content>
                        </Card>
                    </Animatable.View>
                </ScrollView>

            </KeyboardAvoidingView>
            <Modal
                visible={isProfileModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setProfileModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>

                    {/* Touchable for closing when tapped outside */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPressOut={() => setProfileModalVisible(false)}
                    />

                    {/* Actual Modal Bottom Sheet */}
                    <View
                        style={{
                            height: SCREEN_HEIGHT * 0.5,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingHorizontal: 20,
                            paddingTop: 16,
                        }}
                    >
                        {/* Header with Close Icon */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: "black" }}>{texts.Savedprofile}</Text>
                            <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>✖</Text>
                            </TouchableOpacity>
                        </View>

                        {/* FlatList Scrollable Content */}
                        <FlatList
                            data={SavedProfilesData}
                            keyExtractor={(item, index) => item._id || index.toString()}
                            style={{ marginTop: 10 }}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={true}
                            ListEmptyComponent={() => (
                                <Text style={{
                                    fontSize: 16,
                                    color: 'gray',
                                    marginTop: 20,
                                    textAlign: 'center',
                                    ...Fonts.PoppinsMedium,
                                }}>
                                    <TranslateText title={"No saved profiles"} />
                                </Text>
                            )}
                            renderItem={({ item }) => (
                                <TouchableOpacity


                                    onPress={() => {
                                        setProfileModalVisible(false);
                                        setSelectedProfileId(item?._id);
                                        // Auto-fill the form fields
                                        setFullname(item?.fullName || "");
                                        setPhonenumber(item?.phoneNumber || "9069590284");
                                        setGender(item?.gender || "");
                                        setDob(item?.dateOfBirth ? new Date(item.dateOfBirth) : null);
                                        setTob(item?.timeOfBirth ? moment(item.timeOfBirth, 'HH:mm').toDate() : null);
                                        setUserCategory(item?.userCategory || "");
                                        if (item?.placeOfBirth) {
                                            dispatch(SettingActions.setLocationData({
                                                address: item.placeOfBirth,
                                                latitude: 28.5355,
                                                longitude: 77.3910,
                                            }));
                                        }

                                    }}

                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 8,
                                        padding: 10,
                                        marginBottom: 10,
                                    }}>
                                    <Text style={{ ...Fonts.PoppinsMedium }}>
                                        <TranslateText title={item?.fullName} /> | <TranslateText title={item?.gender} /> | {item?.phoneNumber || "9069590284"} | <TranslateText title={item?.dateOfBirth?.substring(0, 10)} />
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            <SetPinModal
                visible={modalVisible}
                onClose={() => navigation.goBack()}
                onConfirm={handlePinConfirm}
                handleForget={handleForget}
            />

            <OTPModal
                visible={show}
                onClose={() => { setShow(false), setModalVisible(true) }}
                onSubmit={handleOtpSubmit}
                phoneNumber={customerData?.phoneNumber}
            />

            <NewPinModal
                visible={visible}
                onClose={() => setVisible(false)}
                onSubmit={handleSavePin}
            />

        </LinearGradient>
    );
};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    rechargeOfferList: state.customer.rechargeOfferList,
    locationData: state.setting.locationData,
    SavedProfilesData: state.setting.SavedProfilesData,
    LetterLagnachart: state.kundli.LetterLagnachart,
    LetterNavmanshachart: state.kundli.LetterNavmanshachart,
    LetterDashmanshachart: state.kundli.LetterDashmanshachart,
    LetterBIRTHchart: state.kundli.LetterBIRTHchart,
    LETTERallPlanets: state.kundli.LETTERallPlanets,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoContainer: {
        marginBottom: 15,
    },
    omSymbol: {
        fontSize: 60,
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.onBackground,
        textAlign: 'center',
        opacity: 0.8,
    },
    formCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        elevation: 8,
        borderRadius: 16,
    },
    cardContent: {
        padding: 24,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.onBackground,
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: "gray",

    },
    segmentedButtons: {
        backgroundColor: 'white',


    },
    errorText: {
        color: theme.colors.error,
        fontSize: 12,
        marginTop: 4,
    },
    submitButton: {
        marginTop: 16,
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
    },
    submitButtonContent: {
        paddingVertical: 8,
    },
    submitButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    dropdownOptions: {
        borderWidth: 1,
        borderColor: theme.colors.outline,
        borderRadius: 8,
        marginTop: 4,
        backgroundColor: 'white',
        elevation: 3,
    },

    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: theme.colors.outline,
        borderRadius: 8,
        paddingVertical: SCREEN_HEIGHT * 0.025,
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        backgroundColor: 'white',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    dropdownText: {
        color: 'black'
    }
});

