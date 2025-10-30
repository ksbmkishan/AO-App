import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { img_url } from '../../../config/constants';
import * as HomeActions from '../../../redux/actions/HomeActions';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';


const AjkaPradhan = ({ dispatch, ajkapradhandata }) => {

    const navigation = useNavigation()
    useEffect(() => {
        dispatch(HomeActions.getAjKaPradhan());
    }, [dispatch]);
    const pradhanData = ajkapradhandata?.sort((a, b) => b.referral_count - a.referral_count);

    const reorderData = (data) => {
        const reordered = [];
        for (let i = 0; i < data?.length; i++) {
            i % 2 === 0 ? reordered.push(data[i]) : reordered.unshift(data[i]);
        }
        return reordered;
    };

    const finalData = reorderData(pradhanData?.slice(0, 5));
    console.log("ljaisdhfoiashod:>>.", ajkapradhandata)

    return (
        <View style={{}}>
            <Text style={{
                color: "red",
                textAlign: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                borderRadius: 3,
                paddingBottom: 2,
                fontWeight: "700",
                alignSelf:'center',
                position:'absolute'
            }}>
                आज का प्रधान
            </Text>
            <FlatList
                horizontal
                data={finalData}
                keyExtractor={(item, index) => `${item._id}-${index}`}
                contentContainerStyle={{ justifyContent: 'space-between' }}

                renderItem={({ item, index }) => {
                    const isCenter = index === Math.floor(finalData.length / 2);
                    return (
                        <>

                            <TouchableOpacity style={{
                                marginHorizontal: SCREEN_WIDTH * 0.04,
                                alignItems: 'center',
                                paddingTop: 30,

                            }} onPress={() => {
                                navigation.navigate('ShowTotalPradhan')
                            }} >
                                {/* {isCenter && (
                                   
                                )} */}

                                <Image
                                    source={
                                        item?.image
                                            ? { uri: `${img_url}${item.image}` }
                                            : item?.gender == 'female' ? {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/female.jpeg'} : {uri: 'https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Images/male.jpeg'}
                                    }
                                    style={{
                                        width: SCREEN_WIDTH * 0.1,
                                        height: SCREEN_HEIGHT * 0.05,
                                        borderRadius: 30,
                                        backgroundColor: "#000", marginBottom: 5,
                                    }}
                                />

                            </TouchableOpacity>

                        </>
                    );
                }}
            />
        </View>
    )
}



const mapStateToProps = state => ({
    ajkapradhandata: state.home.ajkapradhandata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AjkaPradhan);

const styles = StyleSheet.create({})