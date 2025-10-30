import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';

const KundliHeaders = () => {
    const [dropdownIndex, setDropdownIndex] = useState(null);

    const Data = [
        { id: 1, title: "Numerology", category: "Love Relationship", date: "25-Jan-2023", startTime: "10:30PM", minutes: "45 min" },
        { id: 2, title: "Numerology", category: "Career", date: "26-Jan-2023", startTime: "11:00AM", minutes: "30 min" },
        { id: 3, title: "Numerology", category: "Health", date: "27-Jan-2023", startTime: "2:00PM", minutes: "60 min" },
    ];

    const renderItem = ({ item, index }) => {
        const isDropdownVisible = dropdownIndex === index;

        return (
            <View style={{marginVertical:SCREEN_HEIGHT*0.02}}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => setDropdownIndex(isDropdownVisible ? null : index)}
                >
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Text>{item.title}</Text>
                        <Text>{item.date}</Text>
                        <Text>{item.category}</Text>
                    </View>
                    <View>
                        <Text>{isDropdownVisible ? "▲" : "▼"}</Text>
                    </View>
                </TouchableOpacity>

                {isDropdownVisible && (
                    <View style={styles.dropdownContainer}>
                        <Text>{item.startTime} - {item.minutes}</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: SCREEN_WIDTH * 0.03, paddingTop: SCREEN_HEIGHT * 0.05 }}>
            <FlatList 
                data={Data} 
                renderItem={renderItem} 
                keyExtractor={(item) => item.id.toString()} 
            />
        </View>
    );
};

export default KundliHeaders;

const styles = StyleSheet.create({
    headerButton: {
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        paddingVertical: SCREEN_HEIGHT * 0.02,
        borderRadius: 10,
       
    },
    dropdownContainer: {
        borderWidth: 1,
        paddingVertical: SCREEN_HEIGHT * 0.02,
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        borderRadius: 10,
    },
});
