import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Video from 'react-native-video'


const VideoPlayerComponent = ({ src }) => {
    return (
        <View>
            <Video
                source={{ uri: src }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                repeat
                muted
                paused={false} // ✅ ensures video plays automatically
                controls={false}
            />
        </View>
    )
}

export default VideoPlayerComponent

const styles = StyleSheet.create({})