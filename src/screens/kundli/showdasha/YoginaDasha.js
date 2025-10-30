import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { Fonts } from '../../../assets/style';
import { colors } from '../../../config/Constants1';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TranslateText from '../../language/TranslateText';

const YoginaDasha = ({ basicDetails, dispatch, Yoginadata, Currentyoginidata, AntarYoginiDasha }) => {
    console.log("kkkkk", AntarYoginiDasha?.yoginiAntarDashaData?.yoginiAntarDashaList[0]?.yogini)
    const { t } = useTranslation();
    const [selectedButton, setSelectedButton] = useState(1);
    const [isYoginimahadashaVisible, setIsYoginimahadashaVisible] = useState(true);
    const [selectedPlanet, setSelectedPlanet] = useState(null);

    console.log("hjhuj", Yoginadata)

    useEffect(() => {
        const payload = {
            lang: t('lang'),
        };
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
        };

        dispatch(KundliActions.getCurrentYogini(payload));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
        };

        dispatch(KundliActions.getYoginaDasha(payload));
    }, [dispatch]);

    const handlepressAntardasha = (yogini) => {

        setSelectedPlanet(yogini);
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
            mahaDashaYogini: yogini,
        };
        console.log("hikhui", payload)
        dispatch(KundliActions.getAnterYogini(payload));
    };

    const RenderItem = ({ item }) => {
        return (
            <View>
                <View
                    style={{
                        width: SCREEN_WIDTH * 0.8,
                        borderWidth: 1,
                        borderRadius: 10,
                        overflow: 'hidden',
                        borderColor: colors.background_theme2,
                        marginVertical: SCREEN_HEIGHT * 0.02,
                    }}>
                    <View
                        style={{
                            width: SCREEN_WIDTH * 0.8,
                            height: SCREEN_HEIGHT * 0.05,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.background_theme2,
                        }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7), color: colors.white_color }}>
                            <TranslateText title={item?.name}/>
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5), color: colors.red_color1 }}>
                            <TranslateText title={item?.yogini}/>
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5) }}>
                            {item?.startDate}
                        </Text>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.5) }}>
                            {item?.endDate}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString().slice(-2);

        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? ("0" + hours).slice(-2) : 12;

        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    };

    return (
        <View style={{ flex: 1 }}>


            <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  <TranslateText title={basicDetails?.name} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> <TranslateText title={basicDetails?.place} /></Text>
            </View>


            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.viewButton, selectedButton === 1 && styles.selectedButton]}
                        onPress={() => setSelectedButton(1)}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}> <TranslateText title={'Mahadasha'}/></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.viewButton, selectedButton === 2 && styles.selectedButton]}
                        onPress={() => setSelectedButton(2)}>
                        <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(2) }}> <TranslateText title={'Current Dasha'}/></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    {selectedButton === 1 && (
                        <View>
                            {isYoginimahadashaVisible ? YoginiMahaDasha() : YoginiAntardasha()}
                        </View>
                    )}
                    {selectedButton === 2 && (
                        <View>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: colors.black_color4,
                                    alignItems: 'center',
                                    paddingVertical: SCREEN_HEIGHT * 0.015,
                                }}>
                                <Text style={{ ...Fonts.black11InterMedium, fontSize: responsiveFontSize(1.7) }}><TranslateText title={'Current Dasha'}/></Text>
                            </View>

                            <View style={{ paddingTop: SCREEN_HEIGHT * 0.02, alignItems: 'center' }}>
                                <FlatList data={Currentyoginidata?.yoginiCurrentDashaList} renderItem={RenderItem} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
            
        </View>
    );

    function YoginiMahaDasha() {
        const RenderItem = ({ item }) => {
            return (
                <View>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedPlanet(item.yogini);
                                handlepressAntardasha(item.yogini);
                                setIsYoginimahadashaVisible(false);
                            }}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                paddingVertical: SCREEN_HEIGHT * 0.02,
                                paddingHorizontal: SCREEN_WIDTH * 0.03,
                            }}>
                            <Text style={styles.MYTEXT}> <TranslateText title={item.yogini}/></Text>
                            <Text style={styles.MYTEXT}>{item.endDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        };

        return (
            <View style={{ paddingTop: SCREEN_HEIGHT * 0.015 }}>
                <View
                    style={{
                        backgroundColor: colors.background_theme2,
                        paddingVertical: SCREEN_HEIGHT * 0.025,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                    <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color, fontSize: responsiveFontSize(2) }}> <TranslateText title={'Major Yogini Dasha'}/></Text>
                </View>
                <FlatList data={Yoginadata?.yoginiMahaDashaList} renderItem={RenderItem} />
            </View>
        );
    }

    function YoginiAntardasha() {
        const RenderItem2 = ({ item }) => {



            return (
                <View>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                paddingVertical: SCREEN_HEIGHT * 0.02,
                                paddingHorizontal: SCREEN_WIDTH * 0.03,
                            }}>
                            <Text style={styles.MYTEXT}> <TranslateText title={`${selectedPlanet}/${item.yogini}`}/></Text>
                            <Text style={styles.MYTEXT}>{item.endDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        };

        return (
            <View style={{ paddingTop: SCREEN_HEIGHT * 0.015 }}>
                <View
                    style={{
                        backgroundColor: colors.background_theme2,
                        paddingVertical: SCREEN_HEIGHT * 0.025,
                        borderRadius: 10,
                        alignItems: 'center',
                        flexDirection: "row",
                        gap: SCREEN_WIDTH * 0.25,
                        paddingHorizontal: SCREEN_WIDTH * 0.035
                    }}>
                    <TouchableOpacity

                        onPress={() => {
                            setIsYoginimahadashaVisible(true);
                        }}

                    >
                        <AntDesign name='left' color={"white"} size={18} />
                    </TouchableOpacity>
                    <Text style={{ ...Fonts.black11InterMedium, color: colors.white_color, fontSize: responsiveFontSize(2) }}>
                         <TranslateText title={'Antardasha'}/>
                    </Text>
                </View>
                <View style={{ paddingTop: SCREEN_HEIGHT * 0.02, }}>
                    <View style={{}}>
                        <FlatList data={AntarYoginiDasha?.yoginiAntarDashaData?.yoginiAntarDashaList} renderItem={RenderItem2} />
                    </View>
                </View>
            </View>
        );
    }
};

const mapStateToProps = (state) => ({
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    Yoginadata: state.kundli.Yoginadata,
    Currentyoginidata: state.kundli.Currentyoginidata,
    AntarYoginiDasha: state.kundli.AntarYoginiDasha,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(YoginaDasha);

const styles = StyleSheet.create({
    MYTEXT: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    viewButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    selectedButton: {
        borderBottomWidth: 2,
        borderBottomColor: colors.background_theme2,
    },
    Hedertxt: {
        ...Fonts.black11InterMedium,
        fontSize: responsiveFontSize(1.7),

    }
});
