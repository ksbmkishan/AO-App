import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import MyHeader from '../../../components/MyHeader';
import MyLoader from '../../../components/MyLoader2';
import { colors } from '../../../config/Constants1';
import * as KundliActions from '../../../redux/actions/KundliActions';
import TranslateText from '../../language/TranslateText';

const YesterdayPachange = ({ dispatch, NewPanchangyesterday, isLoading }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const currentYear = currentDate.getFullYear();
    const currentMonthName = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ][currentDate.getMonth()];

    useEffect(() => {
        dispatch(KundliActions.getMyPanchangYesterday());
    }, []);

    const p = NewPanchangyesterday?.panchang;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyLoader isVisible={isLoading} />
            <ScrollView>
                <View style={{ backgroundColor: '#305da6' }}>
                    <View style={{ padding: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                        <View style={{ width: "45%", backgroundColor: '#4670ab', flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, padding: 18, borderRadius: 15 }}>
                                <Text style={{ color: 'white', fontSize: 60, marginRight: 5 }}>
                                    <TranslateText title={p?.day} />
                                </Text>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 18 }}>
                                        <TranslateText title={p?.vaara} />
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 18 }}>
                                        <TranslateText title={currentMonthName} />
                                    </Text>
                                    <Text style={{ color: 'white', fontSize: 18 }}>
                                        {currentYear}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 13, marginTop: 4 }}>
                                <TranslateText title={`${p?.tithi?.name} Tithi`} />
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: 'white', fontSize: 16, marginHorizontal: 15, marginTop: 15 }}>
                            <TranslateText title={p?.ritu} />
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 10 }}>
                        {[
                            { label: 'Sunrise', time: p?.sunrise, icon: require("../../../assets/images/Panchang/whitesunsrise.png") },
                            { label: 'Sunset', time: p?.sunset, icon: require("../../../assets/images/Panchang/sunsetwhtie.png") },
                            { label: 'Moonrise', time: p?.moonrise, icon: require("../../../assets/images/Panchang/moonrisewhtie.png") },
                            { label: 'Moonset', time: p?.moonset, icon: require("../../../assets/images/Panchang/moonset.png") },
                        ].map((item, index) => (
                            <View key={index} style={{ alignItems: 'center' }}>
                                <Image source={item.icon} style={{ width: 50, height: 50 }} />
                                <Text style={{ color: 'white', fontSize: 18 }}>{item.time}</Text>
                                <Text style={{ color: 'white', fontSize: 12 }}>
                                    <TranslateText title={item.label} />
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ backgroundColor: colors.yellow_color4, alignItems: 'center' }}>
                    <Text style={styles.sectionTitle}>
                        <TranslateText title="Nakshatra" />
                    </Text>
                    <Text style={styles.sectionText}>
                        <TranslateText title={`${p?.nakshatra?.name} upto ${p?.nakshatra?.endDateTime}`} />
                    </Text>
                </View>

                <View style={{ backgroundColor: colors.yellow_color2, padding: 8, alignItems: 'center' }}>
                    <Text style={styles.sectionTitle}>
                        <TranslateText title="Yog" />
                    </Text>
                    <Text style={styles.sectionText}>
                        <TranslateText title={`${p?.yoga?.name} upto ${p?.yoga?.endDateTime}`} />
                    </Text>
                </View>

                <View style={{ backgroundColor: colors.yellow_color4, padding: 10, alignItems: 'center' }}>
                    <Text style={styles.sectionTitle}>
                        <TranslateText title="Karan" />
                    </Text>
                    <Text style={styles.sectionText}>
                        <TranslateText title={`${p?.karan?.name} upto ${p?.karan?.endDateTime}`} />
                    </Text>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.block}>
                        <Text style={styles.sectionTitle}>
                            <TranslateText title="Month Amanta" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.masa} />
                        </Text>
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.sectionTitle}>
                            <TranslateText title="Month Purnimanta" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.masa} />
                        </Text>
                    </View>
                </View>

                <View style={styles.rowBlock(colors.yellow_color1)}>
                    <View>
                        <Text style={styles.sectionText}>
                            <TranslateText title="Sun Sign" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.sunsign} />
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.sectionText}>
                            <TranslateText title="Moon Sign" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.moonsign} />
                        </Text>
                    </View>
                </View>

                <View style={styles.rowBlock(colors.yellow_color2)}>
                    <View>
                        <Text style={styles.sectionText}>
                            <TranslateText title="Season-Ritu" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.ritu} />
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.sectionText}>
                            <TranslateText title="Ayana" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.sun_ayana} />
                        </Text>
                    </View>
                </View>

                <View style={styles.rowBlock(colors.yellow_color1)}>
                    <View>
                        <Text style={styles.sectionText}>
                            <TranslateText title="Disha Shool" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.dishashool} />
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.sectionText}>
                            <TranslateText title="Moon Niwas" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.moonniwas} />
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={{ fontSize: 22, marginHorizontal: 15, fontWeight: 'bold', marginTop: 8, color: 'black' }}>
                        <TranslateText title="Auspicious Timing" />
                    </Text>
                    <View style={{
                        backgroundColor: colors.green_color2,
                        padding: 16,
                        width: "90%",
                        alignItems: 'center',
                        borderRadius: 15,
                        marginVertical: 15,
                        alignSelf: 'center'
                    }}>
                        <Text style={styles.sectionText}>
                            <TranslateText title="Abhijit Muhurat" />
                        </Text>
                        <Text style={styles.sectionText}>
                            <TranslateText title={p?.abhijitkal} />
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: 'black',
        marginBottom: 5
    },
    sectionText: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    rowBlock: (bgColor) => ({
        flexDirection: 'row',
        backgroundColor: bgColor,
        padding: 8,
        justifyContent: 'space-around',
        alignItems: 'center'
    }),
    block: {
        backgroundColor: 'lightgrey',
        marginVertical: 7,
        padding: 13,
        borderRadius: 15
    }
});

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading,
    NewPanchangyesterday: state.kundli.NewPanchangyesterday,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(YesterdayPachange);
