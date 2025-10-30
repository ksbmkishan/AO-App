import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    ScrollView,
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import RenderHTML from 'react-native-render-html';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { normalize } from '../../../config/constants';

const MusicPlayerModal = ({ visible, onClose, getbaghwandata, visibleIndex }) => {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false);
    const [lyricsText, setLyricsText] = useState('');
    const [miniPlayerVisible, setMiniPlayerVisible] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const pan = useRef(new Animated.ValueXY()).current;

    function getYouTubeVideoId(url) {
        if (!url) return null;
        if (url.includes("youtube.com/watch?v=")) return url.split("v=")[1].split("&")[0];
        if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
        if (url.includes("youtube.com/embed/")) return url.split("embed/")[1].split("?")[0];
        return null;
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            console.log("Video finished");
            setIsPlaying(false);
        } else if (state === "playing") {
            setIsPlaying(true);
        } else if (state === "paused") {
            setIsPlaying(false);
        }
    }, []);

    // PanResponder for draggable mini player
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: pan.x, dy: pan.y }
            ], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            }
        })
    ).current;

    const handlePlayTrack = (url, label, lyrics) => {
        const videoId = getYouTubeVideoId(url);
        if (!videoId) return;

        setCurrentTrack({
            videoId,
            label,
            lyrics,
            url
        });
        setMiniPlayerVisible(true);
        setIsPlaying(true);
    }

    const toggleMiniPlayer = () => {
        setMiniPlayerVisible(!miniPlayerVisible);
        if (!miniPlayerVisible) {
            setIsPlaying(true);
        }
    }

    const closeMiniPlayer = () => {
        setMiniPlayerVisible(false);
        setIsPlaying(false);
        setCurrentTrack(null);
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    const handleShowLyrics = (text) => {
        setLyricsText(text);
        setShowLyrics(true);
        setMiniPlayerVisible(false); // Hide mini player when showing lyrics
    }

    const renderTrack = (url, label, lyrics) => {
        const videoId = getYouTubeVideoId(url);
        if (!videoId) return null;

        return (
            <View style={{ marginVertical: 10, alignItems: 'center' }}>
                {!showLyrics ? (
                    <>
                        <YoutubePlayer
                            ref={playerRef}
                            height={200}
                            width={300}
                            play={isPlaying}
                            videoId={videoId}
                            onChangeState={onStateChange}
                        />
                        <View style={styles.controls}>
                            <TouchableOpacity 
                                onPress={() => handlePlayTrack(url, label, lyrics)} 
                                style={styles.playButton}
                            >
                                <Text style={styles.playButtonText}>🎵 Play in Mini Player</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleShowLyrics(lyrics)} 
                                style={styles.lyricsButton}
                            >
                                <Text style={styles.lyricsButtonText}>📜 Lyrics</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.trackLabel}>{label}</Text>
                    </>
                ) : (
                    <View style={styles.lyricsContainer}>
                        <ScrollView style={{ maxHeight: SCREEN_HEIGHT * 0.5, width: '95%' }}>
                            <RenderHTML
                                contentWidth={SCREEN_WIDTH}
                                source={{ html: lyricsText }}
                            />
                        </ScrollView>
                    </View>
                )}
            </View>
        );
    }

    return (
        <>
            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>Music Player</Text>
                            <View style={{ width: 50 }} />
                        </View>

                        <FlatList
                            data={['aarti', 'chalisa', 'mantra', 'bhajan']}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                const trackData = getbaghwandata && getbaghwandata[visibleIndex];
                                if (!trackData) return null;
                                return renderTrack(
                                    trackData[item],
                                    item.charAt(0).toUpperCase() + item.slice(1),
                                    trackData[item + 'lyrics']
                                )
                            }}
                            ListFooterComponent={
                                <Text style={styles.footerText}>Courtesy: YouTube</Text>
                            }
                            ListHeaderComponent={
                                showLyrics && (
                                    <TouchableOpacity onPress={() => setShowLyrics(false)} style={styles.backButton}>
                                        <Text style={styles.backText}>← Back to Music</Text>
                                    </TouchableOpacity>
                                )
                            }
                        />
                    </View>
                </View>
            </Modal>

            {/* Mini Floating Player */}
            {miniPlayerVisible && currentTrack && (
                <Animated.View
                    style={[
                        styles.miniPlayer,
                        {
                            transform: [{ translateX: pan.x }, { translateY: pan.y }]
                        }
                    ]}
                    {...panResponder.panHandlers}
                >
                    {/* Player Header */}
                    <View style={styles.miniPlayerHeader}>
                        <Text style={styles.miniPlayerTitle} numberOfLines={1}>
                            {currentTrack.label}
                        </Text>
                        <View style={styles.miniPlayerControls}>
                            <TouchableOpacity onPress={togglePlayPause} style={styles.miniControlButton}>
                                <Text style={styles.miniControlText}>
                                    {isPlaying ? '⏸️' : '▶️'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeMiniPlayer} style={styles.miniControlButton}>
                                <Text style={styles.miniControlText}>❌</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* YouTube Player */}
                    <YoutubePlayer
                        height={120}
                        width={200}
                        play={isPlaying}
                        videoId={currentTrack.videoId}
                        onChangeState={onStateChange}
                        webViewProps={{
                            allowsInlineMediaPlayback: true,
                        }}
                    />

                    {/* Additional Controls */}
                    <View style={styles.miniPlayerFooter}>
                        <TouchableOpacity 
                            onPress={() => {
                                setMiniPlayerVisible(false);
                                setShowLyrics(true);
                                setLyricsText(currentTrack.lyrics);
                            }} 
                            style={styles.miniFooterButton}
                        >
                            <Text style={styles.miniFooterText}>📜</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={toggleMiniPlayer} 
                            style={styles.miniFooterButton}
                        >
                            <Text style={styles.miniFooterText}>
                                {miniPlayerVisible ? '📱' : '⬇️'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#faedcd',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: SCREEN_HEIGHT * 0.9,
        paddingVertical: 10,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        fontSize: normalize(16),
        color: 'black',
        fontWeight: '500',
    },
    title: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: 'black',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        gap: 10,
    },
    playButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    playButtonText: {
        fontSize: normalize(12),
        color: 'white',
        fontWeight: 'bold',
    },
    lyricsButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    lyricsButtonText: {
        fontSize: normalize(12),
        color: 'white',
        fontWeight: 'bold',
    },
    trackLabel: {
        fontSize: normalize(14),
        fontWeight: '600',
        color: 'black',
        marginTop: 5,
        textAlign: 'center',
    },
    lyricsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    backButton: {
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
    },
    backText: {
        fontSize: normalize(16),
        color: 'blue',
        fontWeight: '500',
    },
    footerText: {
        textAlign: 'center',
        fontSize: normalize(14),
        marginVertical: 20,
        color: 'gray',
    },
    
    // Mini Player Styles
    miniPlayer: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: 220,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        zIndex: 9999,
    },
    miniPlayerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    miniPlayerTitle: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        marginRight: 10,
    },
    miniPlayerControls: {
        flexDirection: 'row',
        gap: 5,
    },
    miniControlButton: {
        padding: 5,
    },
    miniControlText: {
        fontSize: normalize(12),
    },
    miniPlayerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    miniFooterButton: {
        padding: 5,
    },
    miniFooterText: {
        fontSize: normalize(14),
    },
});

export default MusicPlayerModal;