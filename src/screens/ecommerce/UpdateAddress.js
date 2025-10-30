import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import MyStatusBar from '../../components/MyStatusbar';
import MyHeader from '../../components/MyHeader';
import { Colors, Sizes } from '../../assets/style';
import * as EcommerceActions from '../../redux/actions/ecommerceActions'

const UpdateAddress = ({ navigation, dispatch,customerData,route }) => {
 
    const updateData = route?.params?.addressId
    const [name, setName] = useState(updateData?.name);
    const [phone, setPhone] = useState(updateData?.phone);
    const [pincode, setPincode] = useState(updateData?.pincode);
    const [state, setState] = useState(updateData?.state);
    const [city, setCity] = useState(updateData?.city);
    const [houseNo, setHouseNo] = useState(updateData?.house);
    const [area, setArea] = useState(updateData?.area);
    const [select, setSelect] = useState('');
     console.log(updateData?.pincode,"sdfsdf>>>:>")
    // Function to validate phone numbers (10 digits)
    const validatePhone = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    // Function to validate pincode (6 digits)
    const validatePincode = (pincode) => {
        const pincodePattern = /^[0-9]{6}$/;
        return pincodePattern.test(pincode);
    };

    const handleAddAddress = () => {
        // Check if all fields are filled
        if (!name || !phone || !pincode || !state || !city || !houseNo || !area || !select) {
            Alert.alert("Validation Error", "All fields are required.");
            return;
        }

        // Validate phone number
        if (!validatePhone(phone)) {
            Alert.alert("Validation Error", "Please enter a valid 10-digit phone number.");
            return;
        }

        // Validate pincode
        if (!validatePincode(pincode)) {
            Alert.alert("Validation Error", "Please enter a valid 6-digit pincode.");
            return;
        }

        // Perform API call or form submission
        console.log({
            name, phone, pincode, state, city, houseNo, area, select
        });
        const payload = {
            phone: phone,
            name: name,
            pincode: pincode,
            state: state,
            city: city,
            houseno: houseNo,
            area: area,
            id:updateData?._id
        };
    console.log(payload,"payload")
        dispatch(EcommerceActions.getupdateaddressCart(payload));
    };

    return (
        <View>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <MyHeader title={'Update Address'} navigation={navigation} />
            <ScrollView contentContainerStyle={styles.container}>


                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#666" 
                />

                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    maxLength={10}
                    value={phone}
                    keyboardType="phone-pad"
                    onChangeText={setPhone}
                    placeholderTextColor="#666" 
                />

                <TextInput
                    style={styles.input}
                    placeholder="Pincode"
                    maxLength={6}
                    value={pincode}
                    keyboardType="numeric"
                    onChangeText={setPincode}
                    placeholderTextColor="#666" 
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        style={{ ...styles.input, width: '49%' }}
                        placeholder="State"
                        value={state}
                        onChangeText={setState}
                        placeholderTextColor="#666" 
                    />

                    <TextInput
                        style={{ ...styles.input, width: '49%' }}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                        placeholderTextColor="#666" 
                    />
                </View>


                <TextInput
                    style={styles.input}
                    placeholder="House No"
                    value={houseNo}
                    onChangeText={setHouseNo}
                    placeholderTextColor="#666" 
                />

                <TextInput
                    style={styles.input}
                    placeholder="Area"
                    value={area}
                    onChangeText={setArea}
                    placeholderTextColor="#666" 
                />

                {/* Buttons for Home and Work */}
                <View style={styles.selectContainer}>
                    <TouchableOpacity
                        style={[styles.selectButton, select === 'Home' && styles.selectedButton]}
                        onPress={() => setSelect('Home')}
                    >
                        <Text style={styles.selectButtonText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.selectButton, select === 'Work' && styles.selectedButton]}
                        onPress={() => setSelect('Work')}
                    >
                        <Text style={styles.selectButtonText}>Work</Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleAddAddress}>
                    <Text style={styles.submitButtonText}>Add Address</Text>
                </TouchableOpacity>
                <View style={{paddingVertical:30,}}></View>
            </ScrollView>
        </View>
    )
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddress);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f2f2f2',
        flexGrow: 1,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        // backgroundColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        color:"#000",
        borderWidth:0.3,

    },
    submitButton: {
        backgroundColor: Colors.primaryDark,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    selectContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    selectButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 40,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: Sizes.fixPadding * 2,
        margin:2
    },
    selectedButton: {
        borderColor: Colors.primaryDark,
        borderWidth: 2,
    },
    selectButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})