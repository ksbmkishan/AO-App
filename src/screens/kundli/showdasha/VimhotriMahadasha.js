import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../config/Constants1';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TranslateText from '../../language/TranslateText';
import MyLoader from '../../../components/MyLoader';
import { FontsStyle, normalize } from '../../../config/constants';
import Loader from '../../../components/Loader';

const VimhotriMahadasha = ({ basicDetails,
    dispatch,
    myVimhotri,
    MyANTAR,
    PratshyaamData,
    SookhamData,
    Pranamdata,
    CurrentVimdata,
    isLoading
}) => {





    console.log("sumit_harami", myVimhotri)
    console.log("sumit_harami2", MyANTAR)
    console.log("sumit_harami3", PratshyaamData)
    console.log("sumit_harami4", Pranamdata)
    console.log("sumit_harami5", SookhamData)



    {
        (
            !myVimhotri?.length ||
            !MyANTAR?.vimshottaryAntarDashaList?.length ||
            !PratshyaamData?.length ||
            !Pranamdata?.vimshottaryPranDashaList?.length ||
            !SookhamData?.vimshottarySookshmaDashaList?.length
        ) && (

                <Loader />

            )
    }



    const [selectedButton, setSelectedButton] = useState(1);

    const [isPlanetsVisible, setIsPlanetsVisible] = useState(true);
    const [isAntarDashaVisible, setisAntarDashaVisible] = useState(true);
    const [isPriyantradashaVisible, setisPriyantradashaVisible] = useState(true);
    const [isSookshmaDashaVisible, setIsSookshmaDashaVisible] = useState(true);


    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [selectedAntarPlanet, setselectedAntarPlanet] = useState(null);
    const [selectedPriyantradashaPlanet, setselectedPriyantradashaPlanet] = useState(null);
    const [selectedSookshmaDashaPlanet, setselectedSookshmaDashaPlanet] = useState(null);

    const navigation = useNavigation();



    const { t } = useTranslation();


    const RenderItem = ({ item }) => {
        return (
            <View>
                <View style={{ width: SCREEN_WIDTH * 0.8, borderWidth: 1, borderRadius: 10, overflow: "hidden", borderColor: colors.background_theme2, marginVertical: SCREEN_HEIGHT * 0.02 }}>

                    <View style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.05, alignItems: "center", justifyContent: "center", backgroundColor: colors.background_theme2 }}>

                        <Text style={{  ...FontsStyle.fontfamily, color:'black', fontSize: normalize(15), color: colors.white_color }}> {item?.name} </Text>
                    </View>
                    <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <Text style={{  ...FontsStyle.fontfamily, color:'black', fontSize: normalize(15), color: colors.red_color1 }}>{item?.planet}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                        <Text style={{  ...FontsStyle.fontfamily, color:'black', fontSize: normalize(15) }}>{item?.startDate}</Text>
                        <Text style={{  ...FontsStyle.fontfamily, color:'black', fontSize: normalize(15) }}>{item?.startDate
                        }</Text>
                    </View>

                </View>
            </View>
        )
    }


    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place

        }
        console.log("Mahadev", payload)
        dispatch(KundliActions.getCurrentVimhotri(payload))
    }, [dispatch])



    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place
        };
        dispatch(KundliActions.getvimhotrimahadasha(payload));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
            mahaDashaLord: selectedPlanet
        };
        dispatch(KundliActions.getAntarvim(payload));
    }, [dispatch, selectedPlanet]);

    const handlepressAntardasha = (planet) => {
        const payload = {
            lang: t('lang'),
            gender: basicDetails?.gender,
            name: basicDetails?.name,
            place: basicDetails?.place,
            mahaDashaLord: planet,
        };
        console.log("MAHADGG", payload)
        dispatch(KundliActions.getAntarvim(payload));
    };



    const HandlepressPRANAM = (planet) => {

        setselectedSookshmaDashaPlanet(planet);
    }

    useEffect(() => {
        if (selectedSookshmaDashaPlanet) {
            const payload = {
                lang: t('lang'),
                gender: basicDetails?.gender,
                name: basicDetails?.name,
                place: basicDetails?.place,
                mahaDashaLord: selectedPlanet,
                antarDashaLord: selectedAntarPlanet,
                pratyantarDashaLord: selectedPriyantradashaPlanet,
                sookshmaDashaLord: selectedSookshmaDashaPlanet
            };
            console.log("SHIVRATRII", payload)
            dispatch(KundliActions.getPranamDASHA(payload));
        }
    }, [selectedSookshmaDashaPlanet]);






    const HandlepressSookshmadasha = (planet) => {

        setselectedPriyantradashaPlanet(planet);
    }





    const handlepressPriyantradasha = (planet) => {

        setselectedAntarPlanet(planet);


    };


    useEffect(() => {
        if (selectedPriyantradashaPlanet) {
            const payload = {
                lang: t('lang'),
                gender: basicDetails?.gender,
                name: basicDetails?.name,
                place: basicDetails?.place,
                mahaDashaLord: selectedPlanet,
                antarDashaLord: selectedAntarPlanet,
                pratyantarDashaLord: selectedPriyantradashaPlanet
            };
            dispatch(KundliActions.getSookhamDasha(payload));
        }
    }, [selectedPriyantradashaPlanet]);
  


    useEffect(() => {
        if (selectedAntarPlanet) {
            const payload = {
                lang: t('lang'),
                gender: basicDetails?.gender,
                name: basicDetails?.name,
                place: basicDetails?.place,
                mahaDashaLord: selectedPlanet,
                antarDashaLord: selectedAntarPlanet,
            };
            console.log("Payload in useEffect", payload);
            dispatch(KundliActions.getPratyantradesh(payload));
        }
    }, [selectedAntarPlanet]);

    useEffect(() => {
        const payload = {
            lang: t('lang'),
        };
        dispatch(KundliActions.getKundliBirthDetails(payload));
    }, [dispatch]);

    return (
        <View>

            {/* <View style={{ alignItems: "flex-end", elevation: 1, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.01, backgroundColor: colors.mybackground, borderRadius: 5, gap: 2 }}>
                <Text style={styles.Hedertxt}>  {basicDetailsame} /></Text>
                <Text style={styles.Hedertxt}>
                    <TranslateText
                        title={`${moment(basicDetails?.dob).format('DD MMM YYYY')} ${moment(basicDetails?.tob).format('hh:mm A')}`}
                    />
                </Text>

                <Text style={styles.Hedertxt}> {basicDetailslace} /></Text>
            </View> */}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.viewButton, selectedButton === 1 && styles.selectedButton]}
                    onPress={() => setSelectedButton(1)}
                >
                    <Text style={{  ...FontsStyle.fontfamily,color:'black', fontSize: normalize(15) }}> {t('Mahadasha')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.viewButton, selectedButton === 2 && styles.selectedButton]}
                    onPress={() => setSelectedButton(2)}
                >
                    <Text style={{  ...FontsStyle.fontfamily, color:'black', fontSize: normalize(15) }}> {t('Current Dasha')}</Text>
                </TouchableOpacity>


            </View>




            <View style={styles.contentContainer}>
                {selectedButton === 1 && (
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.02 }}>
                        {
                            isPlanetsVisible ? (
                                Planets()
                            ) : isAntarDashaVisible ? (
                                AntarDasha()
                            ) : isPriyantradashaVisible ? (
                                Pratyantradasha()
                            ) : isSookshmaDashaVisible ? (
                                Sookshmadasha()
                            ) : (
                                Prandasha()
                            )
                        }
                    </View>
                )}

                {selectedButton === 2 && (
                    <View>


                        <View style={{ borderBottomWidth: 1, borderColor: colors.black_color4, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.015 }}>
                            <Text style={{  ...FontsStyle.fontfamily, color:'black', fontSize: normalize(15) }}> {t('Current Dasha')} </Text>
                        </View>


                        <View style={{ paddingTop: SCREEN_HEIGHT * 0.02, alignItems: "center", }}>


                            <FlatList data={CurrentVimdata?.vimshottaryCurrentDashaList} renderItem={RenderItem} />

                        </View>

                    </View>
                )}

            </View>













        </View>
    );

    function Planets() {

        const RenderItem = ({ item }) => {
            return (
                <View>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedPlanet(item.planet);
                                handlepressAntardasha(item.planet);
                                setIsPlanetsVisible(false);
                            }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottomWidth: 1,
                                paddingVertical: SCREEN_HEIGHT * 0.02,
                                paddingHorizontal: SCREEN_WIDTH * 0.03
                            }}
                        >
                            <Text style={styles.MYTEXT}> {item.planet}</Text>
                            <Text style={styles.MYTEXT}>{item.startDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View>
                <View style={{ backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.025, borderRadius: 10, alignItems: "center" }}>
                    <Text style={{  ...FontsStyle.fontfamily, color: colors.white_color, fontSize: responsiveFontSize(2) }}> {t('Major Vimshari Dasha')}</Text>
                </View>
                <FlatList data={myVimhotri} renderItem={RenderItem} />
            </View>
        );
    }

    function AntarDasha() {
        const AnterRenderItem = ({ item }) => {
            return (
                <View>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setselectedAntarPlanet(item.planet);
                                handlepressPriyantradasha(item.planet);
                                setisAntarDashaVisible(false);
                            }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottomWidth: 1,
                                paddingVertical: SCREEN_HEIGHT * 0.02,
                                paddingHorizontal: SCREEN_WIDTH * 0.03
                            }}
                        >
                            <Text style={styles.MYTEXT}>
                                {`${selectedPlanet}/${item.planet}`}

                            </Text>
                            <Text style={styles.MYTEXT}>{item.startDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View>
                <View style={{
                    backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.025, borderRadius: 10, alignItems: 'center',
                    flexDirection: "row",
                    gap: SCREEN_WIDTH * 0.25,
                    paddingHorizontal: SCREEN_WIDTH * 0.035
                }}>
                    <TouchableOpacity

                        onPress={() => {
                            setIsPlanetsVisible(true);
                        }}

                    >
                        <AntDesign name='left' color={"white"} size={18} />
                    </TouchableOpacity>
                    <Text style={{  ...FontsStyle.fontfamily, color: colors.white_color, fontSize: responsiveFontSize(2) }}> {t('Antardasha')}</Text>
                </View>
                <FlatList data={MyANTAR?.vimshottaryAntarDashaList} renderItem={AnterRenderItem} />
            </View>
        );
    }

    function Pratyantradasha() {
        const PritarRenderItem = ({ item }) => {
            return (
                <View>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <TouchableOpacity
                            onPress={() => {

                                setselectedPriyantradashaPlanet(item.planet);
                                HandlepressSookshmadasha(item.planet);
                                setisPriyantradashaVisible(false);

                            }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottomWidth: 1,
                                paddingVertical: SCREEN_HEIGHT * 0.02,
                                paddingHorizontal: SCREEN_WIDTH * 0.03
                            }}
                        >
                            <Text style={styles.MYTEXT}>
                                {` ${selectedPlanet}/${selectedAntarPlanet}/${item.planet}`} 

                            </Text>
                            <Text style={styles.MYTEXT}>{item.startDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View>
                <View style={{
                    backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.025, borderRadius: 10, alignItems: "center"
                    , flexDirection: "row",
                    gap: SCREEN_WIDTH * 0.25,
                    paddingHorizontal: SCREEN_WIDTH * 0.035
                }}>
                    <TouchableOpacity

                        onPress={() => {
                            setisAntarDashaVisible(true);

                        }}

                    >
                        <AntDesign name='left' color={"white"} size={18} />
                    </TouchableOpacity>
                    <Text style={{  ...FontsStyle.fontfamily, color: colors.white_color, fontSize: responsiveFontSize(2) }}> {t('Pratyantarda')}</Text>
                </View>
                <FlatList data={PratshyaamData} renderItem={PritarRenderItem} />
            </View>
        );
    }

    function Sookshmadasha() {
        const SookshmadashaRenderItem = ({ item }) => {
            return (
                <View>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setselectedSookshmaDashaPlanet(item.planet);
                                HandlepressPRANAM(item.planet);
                                setIsSookshmaDashaVisible(false);


                            }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottomWidth: 1,
                                paddingVertical: SCREEN_HEIGHT * 0.02,
                                paddingHorizontal: SCREEN_WIDTH * 0.03
                            }}
                        >
                            <Text style={styles.MYTEXT}>
                                {` ${selectedPlanet}/${selectedAntarPlanet}/${selectedPriyantradashaPlanet}/`}
                                {item.planet}
                            </Text>
                            <Text style={styles.MYTEXT}>{item.startDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return (
            <View>
                <View style={{
                    backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.025, borderRadius: 10, alignItems: "center"
                    , flexDirection: "row",
                    gap: SCREEN_WIDTH * 0.25,
                    paddingHorizontal: SCREEN_WIDTH * 0.035
                }}>
                    <TouchableOpacity

                        onPress={() => {
                            setisPriyantradashaVisible(true);
                        }}

                    >
                        <AntDesign name='left' color={"white"} size={18} />
                    </TouchableOpacity>
                    <Text style={{  ...FontsStyle.font, color: colors.white_color, fontSize: responsiveFontSize(2) }}> {t('Sookshmadasha')}</Text>
                </View>
                <FlatList data={SookhamData?.vimshottarySookshmaDashaList} renderItem={SookshmadashaRenderItem} />
            </View>
        )
    }


    function Prandasha() {

        const PrashanaRenderItem = ({ item }) => {
            return (
                <View>
                    <View style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setselectedSookshmaDashaPlanet(item.planet);
                                HandlepressPRANAM(item.planet);
                                setIsSookshmaDashaVisible(false);


                            }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottomWidth: 1,
                                paddingVertical: SCREEN_HEIGHT * 0.02,
                                paddingHorizontal: SCREEN_WIDTH * 0.03
                            }}
                        >
                            <View>
                                <Text style={styles.MYTEXT}>
                                    {` ${selectedPlanet}/${selectedAntarPlanet}/${selectedPriyantradashaPlanet}/${selectedSookshmaDashaPlanet}`}

                                </Text>
                                <Text style={styles.MYTEXT}>
                                    / {item.planet}

                                </Text>
                            </View>
                            <Text style={styles.MYTEXT}>{item.startDate}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View>
                <View style={{
                    backgroundColor: colors.background_theme2, paddingVertical: SCREEN_HEIGHT * 0.025, borderRadius: 10, alignItems: "center"
                    , flexDirection: "row",
                    gap: SCREEN_WIDTH * 0.25,
                    paddingHorizontal: SCREEN_WIDTH * 0.035
                }}>
                    <TouchableOpacity

                        onPress={() => {
                            setIsSookshmaDashaVisible(true);
                        }}

                    >
                        <AntDesign name='left' color={"white"} size={18} />
                    </TouchableOpacity>
                    <Text style={{  ...FontsStyle.font, color: colors.white_color, fontSize: responsiveFontSize(2) }}> {t('Prandasha')}</Text>
                </View>
                <FlatList data={Pranamdata?.vimshottaryPranDashaList} renderItem={PrashanaRenderItem} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.setting.isLoading,
    basicDetails: state.kundli.basicDetails,
    myVimhotri: state.kundli.myVimhotri,
    MyANTAR: state.kundli.MyANTAR,
    PratshyaamData: state.kundli.PratshyaamData,
    SookhamData: state.kundli.SookhamData,
    Pranamdata: state.kundli.Pranamdata,
    CurrentVimdata: state.kundli.CurrentVimdata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VimhotriMahadasha);

const styles = StyleSheet.create({
    MYTEXT: {
         ...FontsStyle.font, fontSize: responsiveFontSize(1.7)
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
        borderBottomColor: colors.background_theme2
    },

    Hedertxt: {
        ...FontsStyle.font,
        fontSize: normalize(18),

    }
});
