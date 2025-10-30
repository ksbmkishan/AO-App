import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

const NewPinModal = ({ visible, onClose, onSubmit }) => {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    Keyboard.dismiss();

    if (newPin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    if (newPin !== confirmPin) {
      setError("Both PINs must match");
      return;
    }

    setError("");
    onSubmit && onSubmit(newPin);
    setNewPin("");
    setConfirmPin("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Set Your New PIN</Text>

          <TextInput
            placeholder="Enter New PIN"
            value={newPin}
            onChangeText={(t) => setNewPin(t.replace(/[^0-9]/g, ""))}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={6}
            style={styles.input}
          />

          <TextInput
            placeholder="Retype PIN"
            value={confirmPin}
            onChangeText={(t) => setConfirmPin(t.replace(/[^0-9]/g, ""))}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={6}
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.row}>
           

            <TouchableOpacity style={[styles.btn, styles.saveBtn]} onPress={handleSave}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Save PIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewPinModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 4,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#eee",
  },
  saveBtn: {
    backgroundColor: "#007AFF",
  },
});
