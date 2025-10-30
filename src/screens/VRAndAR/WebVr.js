import React from "react";
import { View, Image, Dimensions, FlatList } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const data = [
  "https://picsum.photos/id/1/800/1600",
  "https://picsum.photos/id/10/800/1600",
  "https://picsum.photos/id/20/800/1600",
];

export default function WebVr() {
  const renderItem = ({ item }) => (
    <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
      <Image
        source={{ uri: item }}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal={false} // 👈 vertical scroll
      pagingEnabled      // 👈 full screen swipe (TikTok/Reels style)
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToAlignment="start"
      snapToInterval={SCREEN_HEIGHT} // हर item पूरी screen लेगा
      getItemLayout={(_, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
      })}
    />
  );
}
