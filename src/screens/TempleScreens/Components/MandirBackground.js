import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { FoldPhone, RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import FastImage from "@d11/react-native-fast-image";
import { useSantanLocal } from '../../../utils/DownloadFile/downloadHome';

const MandirBackground = () => {

    const { localUri } = useSantanLocal('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/mandirbackground.png');
    return (
        <View style={styles.container}>
            {/* <FastImage
                source={{
                    uri: '',
                    priority: FastImage.priority.high,
                }}
                style={{
                    width: FoldPhone ? SCREEN_WIDTH * 0.6 : RESPONSIVE_WIDTH(100),
                    height: RESPONSIVE_HEIGHT(100),
                }}
                resizeMode={FastImage.resizeMode.contain} // cover use करो contain की जगह
            /> */}
            <Image 
                source={{ uri: localUri }}
                 style={{
                    width: RESPONSIVE_WIDTH(100),
                    height: RESPONSIVE_HEIGHT(95),
                    resizeMode:'contain'
                }}
            />
        </View>
    )
}

export default MandirBackground

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: RESPONSIVE_HEIGHT(13.5),
        left: 0,
        right: 0,
        zIndex: -1, // keep background behind
    
    },
});
