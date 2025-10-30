import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import MyHeader from "../../components/MyHeader";
import { colors } from "../../config/Constants1";
import { Sizes } from "../../assets/style";
import { showToastMessage } from "../../utils/services";
import * as EcommerceActions from "../../redux/actions/ecommerceActions";

const AddressCart = ({ navigation, dispatch, customerData }) => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");

    const handleSubmit = () => {
        if (!name || !mobile || !houseNo || !city || !pincode || !state) {
            showToastMessage({ message: "Please fill in all required fields!" });
            return;
        }

        const payload = {
            customerId: customerData?._id,
            name,
            phone: mobile,
            house: houseNo,
            area: landmark,
            city,
            pincode,
            state
        };
        
        console.log("payload :: ", payload);
        dispatch(EcommerceActions.onEcommerceAddAddress(payload));
    };

    return (
        <View style={styles.container}>
            <MyHeader title="Add Address" navigation={navigation} />
            <View style={{ margin: 10 }}></View>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="grey"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                keyboardType="phone-pad"
                placeholderTextColor="grey"
                value={mobile}
                maxLength={10}
                onChangeText={setMobile}
            />

            <Text style={styles.label}>House/Flat Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter house/flat number"
                placeholderTextColor="grey"
                value={houseNo}
                onChangeText={setHouseNo}
            />

            <Text style={styles.label}>Landmark</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., Near Temple, School"
                placeholderTextColor="grey"
                value={landmark}
                onChangeText={setLandmark}
            />

            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your city"
                placeholderTextColor="grey"
                value={city}
                onChangeText={setCity}
            />

            <Text style={styles.label}>Pincode</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your pincode"
                keyboardType="number-pad"
                placeholderTextColor="grey"
                maxLength={6}
                value={pincode}
                onChangeText={setPincode}
            />

            <Text style={styles.label}>State</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your state"
                placeholderTextColor="grey"
                value={state}
                onChangeText={setState}
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        color: "#000",
    },
    submitButton: {
        backgroundColor: colors.background_theme2,
        alignSelf: "center",
        padding: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 4,
        borderRadius: Sizes.fixPadding,
        marginTop: 10,
    },
    submitText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

const mapStateToProps = (state) => ({
    customerData: state.customer.customerData,
});

export default connect(mapStateToProps)(AddressCart);
