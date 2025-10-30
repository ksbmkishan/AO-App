import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, Colors } from '../assets/style';
import Button from '../screens/Recharge/Button';

const PaymentResultModal = ({ 
    visible, 
    type, 
    title, 
    message, 
    orderId, 
    amount,
    details,
    primaryAction,
    secondaryAction,
    onClose
}) => {
    // Format date and time separately
    let dateStr = '';
    let timeStr = '';
    
    if (details?.date) {
        const dateObj = new Date(details.date);
        dateStr = dateObj.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
    
    if (details?.time) {
        const timeObj = new Date(`1970-01-01T${details.time}`);
        timeStr = timeObj.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // Filter out date and time from details to avoid duplicate display
    const filteredDetails = details ? {...details} : null;
    if (filteredDetails) {
        delete filteredDetails.date;
        delete filteredDetails.time;
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            {/* Header Icon */}
                            <View style={[
                                styles.iconContainer,
                                type === 'success' ? styles.successIcon : styles.errorIcon
                            ]}>
                                <Icon 
                                    name={type === 'success' ? 'check-circle' : 'alert-circle'} 
                                    size={40} 
                                    color="white" 
                                />
                            </View>
                            
                            {/* Title */}
                            <Text style={styles.modalTitle}>{title}</Text>
                            
                            {/* Message */}
                            <Text style={styles.modalMessage}>{message}</Text>
                            
                            {/* Transaction Details */}
                            {orderId && (
                                <View style={styles.detailBox}>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Order ID:</Text>
                                        <Text style={styles.detailValue}>{orderId}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Amount:</Text>
                                        <Text style={styles.detailValue}>₹{amount}</Text>
                                    </View>
                                    {dateStr && (
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Date:</Text>
                                            <Text style={styles.detailValue}>{dateStr}</Text>
                                        </View>
                                    )}
                                    {timeStr && (
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Time:</Text>
                                            <Text style={styles.detailValue}>{timeStr}</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            
                            {/* Additional Details */}
                            {filteredDetails && Object.keys(filteredDetails).length > 0 && (
                                <View style={styles.detailsContainer}>
                                    {Object.entries(filteredDetails).map(([key, value]) => (
                                        <View key={key} style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>{key}:</Text>
                                            <Text style={styles.detailValue}>{value}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                            
                            {/* Action Buttons */}
                            <View style={styles.buttonContainer}>
                                {primaryAction && (
                                    <TouchableOpacity 
                                        style={[
                                            styles.actionButton,
                                            styles.primaryButton,
                                            type === 'success' ? { backgroundColor: Colors.primaryTheme } : { backgroundColor: '#F44336' }
                                        ]}
                                        onPress={primaryAction.onPress}
                                    >
                                        <Text style={styles.buttonText}>{primaryAction.text}</Text>
                                    </TouchableOpacity>
                                )}
                                
                                {secondaryAction && (
                                    <TouchableOpacity 
                                        style={[styles.actionButton, styles.secondaryButton]}
                                        onPress={secondaryAction.onPress}
                                    >
                                        <Text style={[styles.buttonText, { color: Colors.primaryTheme }]}>
                                            {secondaryAction.text}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                
                                {/* Close Button */}
                                <Button 
                                    title="Close" 
                                    onPress={onClose}
                                    buttonStyle={styles.closeButtonStyle}
                                    textStyle={styles.closeButtonText}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60,
        marginBottom: 20,
    },
    successIcon: {
        backgroundColor: '#4CAF50',
    },
    errorIcon: {
        backgroundColor: '#F44336',
    },
    modalTitle: {
        ...Fonts.PoppinsBold,
        fontSize: 20,
        color: Colors.black,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalMessage: {
        ...Fonts.PoppinsRegular,
        fontSize: 14,
        color: Colors.grayA,
        textAlign: 'center',
        marginBottom: 20,
    },
    detailBox: {
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        ...Fonts.PoppinsSemiBold,
        fontSize: 14,
        color: Colors.grayA,
        textTransform: 'capitalize',
    },
    detailValue: {
        ...Fonts.PoppinsRegular,
        fontSize: 14,
        color: Colors.black,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
    },
    actionButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    primaryButton: {
        backgroundColor: Colors.primaryTheme,
    },
    secondaryButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.primaryTheme,
    },
    closeButtonStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.grayC,
        width: '100%',
    },
    closeButtonText: {
        color: Colors.primaryTheme,
    },
    buttonText: {
        ...Fonts.PoppinsSemiBold,
        fontSize: 16,
        color: 'white',
    },
});

export default PaymentResultModal;