import { Image, View } from 'react-native'
import { FoldPhone, RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen'
import FastImage from "@d11/react-native-fast-image";
import { useSantanLocal } from '../../../utils/DownloadFile/downloadHome';


const MandirTemple = () => {

     const { localUri } = useSantanLocal('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/temple/mandir.png');

    return(
        <View style={{ zIndex: 1, }}>
       
        <FastImage
                source={{
                    uri: localUri,
                    priority: FastImage.priority.high,
                }}
                style={{
                    width: FoldPhone ? RESPONSIVE_WIDTH(50) : RESPONSIVE_WIDTH(100), height: RESPONSIVE_HEIGHT(100), aspectRatio: 1,
                }}
                resizeMode={FastImage.resizeMode.contain} // cover use करो contain की जगह
            />
    </View>
    )
}

export default MandirTemple