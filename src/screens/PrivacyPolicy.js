import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import MyHeader from '../components/MyHeader';
import { Fonts } from '../assets/style';

const PrivacyPolicy = ({ navigation }) => {
    return (
        <View style={{ flex: 1,paddingBottom:10 }}>
            <MyHeader title={'Privacy Policy'} navigation={navigation} />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Personal Information:</Text> Name, email, date of birth, and relevant details, when you create an account.
                </Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Birth Information:</Text> Date, time, and place of birth for accurate astrological insights.
                </Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Usage Data:</Text> Interaction data with our website and services.
                </Text>

                <Text style={styles.sectionTitle}>2. How We Use Your Information ?</Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Astrological Services:</Text> To generate personalized readings and guidance.
                </Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Communication:</Text> Sending updates and information, with the option to unsubscribe.
                </Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Improvement:</Text> Enhancing services through usage analysis.
                </Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Customer Support:</Text> Assisting you effectively.
                </Text>

                <Text style={styles.sectionTitle}>3. Data Security</Text>
                <Text style={styles.bodyText}>
                    We implement robust measures to safeguard your data; however, no system can offer absolute security. Your trust is our priority, and we are committed to continually enhancing our defences.
                </Text>

                <Text style={styles.sectionTitle}>4. Data Sharing and Disclosure</Text>
                <Text style={styles.bodyText}>
                    We do not sell your information. We may share it with service providers or disclose it as required by law.
                </Text>

                <Text style={styles.sectionTitle}>5. Your Choices</Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Account Settings:</Text> Update your information anytime.
                </Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Opting Out:</Text> Unsubscribe from communications via email.
                </Text>
                <Text style={styles.bodyText}>
                    <Text style={styles.bold}>Cookies:</Text> Manage through browser settings.
                </Text>

                <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
                <Text style={styles.bodyText}>
                    Our services are not for children under 13. Contact us if you believe a child or your child has provided personal information.
                </Text>

                <Text style={styles.sectionTitle}>7. Changes to this Policy</Text>
                <Text style={styles.bodyText}>
                    Updates will be communicated via email or website notice. Continued use indicates acceptance of changes.
                </Text>

                <Text style={styles.sectionTitle}>8. Contact Us</Text>
                <Text style={styles.bodyText}>
                    For questions, email us at <Text style={styles.bold}>contact@astroone.in</Text>
                </Text>
                <Text style={styles.bodyText}>
                and contact us on <Text style={styles.bold}>9654443667</Text>.
                </Text>
                <Text style={styles.footerText}>By using Astro One, you accept this Privacy Policy. Thank you for choosing us for your astrological journey.</Text>
            </ScrollView>
        </View>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
       
        paddingHorizontal:10,
    },
    title: {
        ...Fonts.PoppinsSemiBold,
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        ...Fonts.PoppinsMedium,
        marginVertical: 10,
        textAlign:'justify'
    },
    bodyText: {
        ...Fonts.PoppinsRegular,
        marginBottom: 10,
        lineHeight: 22,
         textAlign:'justify'
    },
    bold: {
        ...Fonts.PoppinsMedium
    },
    footerText: {
        ...Fonts.PoppinsMedium,
        textAlign: 'center',
        marginTop: 4,
        color: '#888',
    },
});
