import { useRef } from "react";
import { View } from "react-native";
import WebView from "react-native-webview"

const WebViewLyrics = ({ route }) => {
    const url = route.params.url;
    const webViewRef = useRef(null);

    const handleMessage = (event) => {
        const message = event.nativeEvent.data;
        console.log(message);
    };

    return (

        <View style={{ flex: 1 }}>
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                onMessage={handleMessage}
            />
        </View>

    )
}

export default WebViewLyrics;