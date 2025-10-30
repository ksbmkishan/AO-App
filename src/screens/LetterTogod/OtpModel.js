// OTPModal.js
import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function OTPModal({
  visible,
  onClose,
  onSubmit,        // function(otpString)
  phoneNumber,     // optional display
  autoFocus = true,
  secureText = false,
}) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    setDigits(["", "", "", ""]);
    if (visible && autoFocus) {
      setTimeout(() => inputs[0].current && inputs[0].current.focus(), 100);
      setSecondsLeft(60);
      setResendDisabled(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    if (secondsLeft <= 0) {
      setResendDisabled(false);
      return;
    }
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, visible]);

  const updateDigit = (text, idx) => {
    // Handle paste of full OTP or multiple characters
    if (text.length > 1) {
      const chars = text.replace(/\s+/g, "").slice(0, 4).split("");
      const merged = [...digits];
      for (let i = 0; i < chars.length; i++) merged[i] = chars[i];
      setDigits(merged);
      // focus next empty or submit
      const firstEmpty = merged.findIndex(d => d === "");
      if (firstEmpty !== -1) {
        inputs[firstEmpty].current && inputs[firstEmpty].current.focus();
      } else {
        Keyboard.dismiss();
        onSubmit && onSubmit(merged.join(""));
      }
      return;
    }

    const newDigits = [...digits];
    newDigits[idx] = text;
    setDigits(newDigits);

    if (text && idx < 3) {
      inputs[idx + 1].current && inputs[idx + 1].current.focus();
    }
    if (!text && idx > 0) {
      // if cleared, move focus back
      inputs[idx - 1].current && inputs[idx - 1].current.focus();
    }

    // If all filled, submit
    if (newDigits.every(d => d !== "")) {
      Keyboard.dismiss();
      onSubmit && onSubmit(newDigits.join(""));
    }
  };

  const handleKeyPress = ({ nativeEvent }, idx) => {
    if (nativeEvent.key === "Backspace" && digits[idx] === "" && idx > 0) {
      inputs[idx - 1].current && inputs[idx - 1].current.focus();
    }
  };

  const resendOtp = () => {
    // you should call your resend API here
    setResendDisabled(true);
    setSecondsLeft(60);
    // example: props.onResend && props.onResend()
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Enter 4-digit OTP</Text>
          {phoneNumber ? <Text style={styles.subtitle}>Sent to {phoneNumber}</Text> : null}

          <View style={styles.row}>
            {digits.map((d, i) => (
              <TextInput
                key={i}
                ref={inputs[i]}
                value={d}
                onChangeText={t => updateDigit(t.replace(/[^0-9]/g, ""), i)}
                onKeyPress={e => handleKeyPress(e, i)}
                maxLength={4} // allow paste >1, but single-digit typing is typical
                keyboardType="number-pad"
                textContentType="oneTimeCode" // iOS SMS autofill
                secureTextEntry={secureText}
                style={styles.input}
                returnKeyType="done"
                accessible
                accessibilityLabel={`OTP digit ${i + 1}`}
              />
            ))}
          </View>

          <View style={styles.rowBetween}>
            <TouchableOpacity onPress={onClose} style={styles.link}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={resendOtp}
                disabled={resendDisabled}
                style={[styles.resendBtn, resendDisabled && styles.resendDisabled]}>
                <Text style={styles.resendText}>
                  {resendDisabled ? `Resend in ${secondsLeft}s` : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 22,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  subtitle: { color: "#666", marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 12 },
  input: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 6,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 18 },
  link: { padding: 8 },
  resendBtn: { padding: 6 },
  resendDisabled: { opacity: 0.6 },
  resendText: { fontSize: 14 },
});
