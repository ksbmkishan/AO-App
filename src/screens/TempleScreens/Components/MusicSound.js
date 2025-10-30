import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { connect } from 'react-redux';
import RenderHTML from 'react-native-render-html';
import axios from 'axios';
import Sound from 'react-native-sound';
import { colors } from '../../../config/Constants1';
import Fontisto from 'react-native-vector-icons/Fontisto';

Sound.setCategory('Playback');

const CLIENT_ID = "QH0sodO4QzbRjYm1f4FpCtEJvOB3PbaU";

const MusicSound = ({ onClose, visibleIndex, getbaghwandata, visible }) => {
    const [tracks, setTracks] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentKey, setCurrentKey] = useState(null); // कौन सा play हो रहा है
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);

    const soundRef = useRef(null);

    // 🔹 common loader for any url
    const fetchTrack = async (url, key) => {
        if (!url || !url.includes('soundcloud.com')) return null;
        try {
            const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${CLIENT_ID}`;
            const { data } = await axios.get(resolveUrl);

            const transcodings = data.media?.transcodings || [];
            const progressive = transcodings.find(t => t.format.protocol === 'progressive');

            if (progressive) {
                const { data: streamData } = await axios.get(`${progressive.url}?client_id=${CLIENT_ID}`);
                return { ...data, stream: streamData.url }; // playable mp3
            }
        } catch (e) {
            console.log("Error fetching track:", e.message);
        }
        return null;
    };

    // 🔹 load all 4 tracks once index changes
    useEffect(() => {
        const loadAll = async () => {
            const item = getbaghwandata[visibleIndex];
            if (!item) return;

            const aarti = await fetchTrack(item.aarti, "aarti");
            const chalisa = await fetchTrack(item.chalisa, "chalisa");
            const mantra = await fetchTrack(item.mantralink, "mantra");
            const bhajan = await fetchTrack(item.bhajan, "bhajan");

            setTracks({ aarti, chalisa, mantra, bhajan });
        };

        loadAll();

        return () => {
            soundRef.current?.release();
            setIsPlaying(false);
            setCurrentKey(null);
        };
    }, [visibleIndex, getbaghwandata]);

    // 🔹 Play / Stop
    const playSound = (track, key) => {
        if (!track?.stream) return;
        console.log('track ', JSON.stringify(track));
        // stop previous
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.release();
        }

        soundRef.current = new Sound(track.stream, null, (error) => {
            if (error) {
                console.log("Load error", error);
                return;
            }
            soundRef.current.play((success) => {
                if (!success) console.log("Playback failed");
                setIsPlaying(false);
                setCurrentKey(null);
            });
            setIsPlaying(true);
            setCurrentKey(key);
        });
    };

    const stopSound = () => {
        soundRef.current?.stop();
        setIsPlaying(false);
        setCurrentKey(null);
    };

    const handleBack = () => {
        if (!show) {
            onClose();
        } else {
            setShow(false);
        }
    };

    const handleText = (data) => {
        console.log('data ', data);
        setText(data);
        setShow(true);
    }

    const renderText = () => (
        <View style={{ margin: 20 }}>
            <RenderHTML
                contentWidth={SCREEN_WIDTH}
                source={{
                    html: `
                  <div style="color: black; font-family: 'Arial', sans-serif; font-size: 16px; max-width: 100%; word-wrap: break-word;text-align: justify;">
                    ${text}
                  </div>
                `,
                }}
            />
        </View>
    )

    const renderTrackView = (track, label, key, lyricsUrl) => {
        if (!track) return null;

        return (
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                {track?.artwork_url ? (
                    <Image
                        source={{ uri: track.artwork_url.replace("-large", "-t500x500") }}
                        style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.2, borderRadius: 10, resizeMode: 'stretch' }}
                    />
                ) :
                    // <Image
                    //     source={require('../../../assets/astroOneImages/play.png')}
                    //     style={{ width: SCREEN_WIDTH * 0.21, height: SCREEN_HEIGHT * 0.1, borderRadius: 10, }}
                    // />
                    <View style={{backgroundColor:colors.background_theme2,width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.2,borderRadius:10, alignItems:'center',justifyContent:'center' }}>
                        <Fontisto name='applemusic' size={100} color={'white'} />
                    </View>
                }
                <Text style={{ marginVertical: 10 }}>{track?.title || label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', width:'80%' }}>
                    {isPlaying && currentKey === key ? (
                          <TouchableOpacity
                        onPress={() => stopSound()}
                        style={{ marginHorizontal: 10, borderRadius: 10, backgroundColor:colors.background_theme2, padding:10  }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold', }}>{'Stop'}</Text>
                    </TouchableOpacity>
                    ) : (
                          <TouchableOpacity
                        onPress={() => playSound(track, key)}
                        style={{ marginHorizontal: 10, borderRadius: 10, backgroundColor:colors.background_theme2, padding:10  }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold', }}>{'Play'}</Text>
                    </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => handleText(lyricsUrl)}
                        style={{ marginHorizontal: 10, borderRadius: 10, backgroundColor:colors.background_theme2, padding:10  }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold', }}>{'Lryics'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    };



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#faedcd',
                display: visible ? 'flex' : 'none',
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 1000,
            }}
        >
            <View style={styles.musicHeader}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons name="arrow-back-circle-outline" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.text}>
                    {getbaghwandata[visibleIndex]?.title || 'Loading...'}
                </Text>
                <View />
            </View>

            <FlatList
                ListHeaderComponent={
                    <>
                        {!show && renderTrackView(tracks.aarti, 'Aarti', 'aarti', getbaghwandata[visibleIndex]?.aartilyrics)}
                        {!show && renderTrackView(tracks.chalisa, 'Chalisa', 'chalisa', getbaghwandata[visibleIndex]?.chalisalyrics)}
                        {!show && renderTrackView(tracks.mantra, 'Mantra', 'mantra', getbaghwandata[visibleIndex]?.mantralyrics)}
                        {!show && renderTrackView(tracks.bhajan, 'Bhajan', 'bhajan', getbaghwandata[visibleIndex]?.bhjanlyrics)}
                        {show && renderText()}
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'black',
                                marginVertical: 10,
                            }}
                        >
                            Courtesy: SoundCloud
                        </Text>
                    </>
                }
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    audioSelected: state.sanatan.audioSelected,
    currentSongIndex: state.sanatan.currentSongIndex,
});

export default connect(mapStateToProps)(MusicSound);

const styles = StyleSheet.create({
    text: { color: "#000", fontSize: 20, fontWeight: "700" },
    musicHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
    },
});
