import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Draggable from "react-native-draggable";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config/Screen";

export default function FloatingMiniPlayer({ videoId, onClose }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false); // start paused

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <Draggable x={SCREEN_WIDTH * 0.5} y={SCREEN_HEIGHT * 0.7}>
      <View style={styles.playerBox}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <YoutubePlayer
          ref={playerRef}
          height={150}
          width={200}
          play={playing}   // controlled by state
          videoId={videoId}
          onChangeState={onStateChange}
        />

        {/* Play / Pause button overlay */}
        <Button
          title={playing ? "Pause" : "Play"}
          onPress={() => setPlaying((prev) => !prev)}
        />
      </View>
    </Draggable>
  );
}

const styles = StyleSheet.create({
  playerBox: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 5,
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontSize: 18,
    lineHeight: 18,
  },
});
