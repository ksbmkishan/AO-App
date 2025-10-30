import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SetPinModal = ({ visible, onClose, onConfirm,handleForget }) => {
  const [pin, setPin] = useState("");

  const handleConfirm = () => {
    if (pin.length === 4) {
      onConfirm(pin);
      setPin("");
    } else {
      alert("Please enter a 4-digit PIN");
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Set Your 4-Digit PIN</Text>

          <TextInput
            style={styles.input}
            value={pin}
            onChangeText={(text) => {
              if (/^\d{0,4}$/.test(text)) setPin(text); // only allow digits
            }}
            keyboardType="numeric"
            secureTextEntry={true}
            maxLength={4}
            
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          onPress={handleForget}
          style={{alignSelf:'flex-end', padding:10}}>
            <Text style={{color:'blue'}}>Forget PIN?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SetPinModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color:'black'
  },
  input: {
    width: "70%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 10,
    marginBottom: 20,
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#aaa",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
