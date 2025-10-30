import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../config/Screen'
import FastImage from "@d11/react-native-fast-image";
import { useSantanLocal } from '../../../../utils/DownloadFile/downloadHome';

const MandirBackgroundNavgrah = () => {

      const { localUri } = useSantanLocal('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/innernavgarh3.png');

    return (
        <>
            <View style={{
                position: 'absolute',
                
                
            }}>
                <FastImage
                    source={{
                        uri: localUri,
                        priority: FastImage.priority.high,
                    }}
                    style={{ width: SCREEN_WIDTH * 1.05, height: SCREEN_HEIGHT * 1}}
                    resizeMode={FastImage.resizeMode.contain} 
                />

            </View>
        </>

    )
}

export default MandirBackgroundNavgrah

const styles = StyleSheet.create({})