import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import MyHeader from '../components/MyHeader';
import { Fonts } from '../assets/style';
import { Colors } from '../config/Screen';

const TermsofUse = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={'Terms and Conditions'} navigation={navigation} />
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, paddingBottom: 20 }}>
                     <Text style={styles.title}>Terms and Conditions</Text>
                    <Text style={[styles.bodyText, { }]}>
                        Astro One is a premier platform for astrology predictions and guidance.
                    </Text>

                    <Text style={styles.sectionTitle}>1.Who We Are ?</Text>
                    <Text style={styles.bodyText}>
                        Astro One connects users with over 500 expert astrologers, including Vedic astrologers, Tarot readers, and Numerologists, offering insights into Marriage, Love, Career, and Health.
                    </Text>

                    <Text style={styles.sectionTitle}>2.What We Do ?</Text>
                    <Text style={styles.bodyText}>
                        We provide 24/7 access to astrology services, free live sessions, daily horoscopes, and Kundli matching.
                    </Text>

                    <Text style={styles.sectionTitle}>3.Our Mission</Text>
                    <Text style={styles.bodyText}>
                        Our mission is to support individuals seeking astrological insights to navigate life's challenges.
                    </Text>

                    <Text style={styles.sectionTitle}>4.Our Vision</Text>
                    <Text style={styles.bodyText}>
                        We aim to offer astrological remedies to positively guide lives with certified astrologers' support.
                    </Text>

                    <Text style={styles.sectionTitle}>5.We Have Your Back</Text>
                    <Text style={styles.bodyText}>
                        Our astrologers and support team provide a seamless experience, helping users find guidance and fulfilment.
                    </Text>

                    <Text style={styles.sectionTitle}>6.Our Story</Text>
                    <Text style={styles.bodyText}>
                        Founded by Aggarwal & Affiliates, Astro One blends traditional astrology with solutions for modern challenges. With 500 astrologers and daily consultations, we offer live sessions, free Kundli matching, and more. Join us in building a global community of spiritual and well-being experts.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default TermsofUse;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        ...Fonts.PoppinsMedium,
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        ...Fonts.PoppinsMedium,
        marginVertical: 10,

    },
    bodyText: {
        ...Fonts.PoppinsRegular,
        marginBottom: 10,
    },
});
