import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { connect } from 'react-redux';
import * as SantanActions from '../../../redux/actions/sanatanActions';
import WebView from 'react-native-webview';
import RenderHTML from 'react-native-render-html';
import { api_url, normalize } from '../../../config/constants';
import YoutubePlayer from "react-native-youtube-iframe";
import { useTranslation } from 'react-i18next';
import TranslateText from '../../language/TranslateText';
import Video from 'react-native-video';
import { SetupService } from '../../../components/SetupService';
import TrackPlayer from 'react-native-track-player';


const MusicPlayer = ({ onClose, audioSelected, dispatch, currentSongIndex,
  currentSongState, visibleIndex, getbaghwandata, isPlaying, setIsPlaying, }) => {

  const playerRef = useRef(null);

  const { t } = useTranslation();

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      console.log("Video has finished playing!");
    }
  }, []);

  console.log('getbaghwandata', getbaghwandata[visibleIndex]?.aarti_mp3);

  useEffect(() => {
    if (audioSelected && audioSelected.length > 0) {
      dispatch(SantanActions.setSantanCurrentSongIndex(0));
    }
  }, [audioSelected]);


  const playVideoWithTrackPlayer = async (url, title) => {
    try {
      // 1️⃣ Setup player if not already
      const state = await TrackPlayer.getState().catch(() => null);
      if (!state) {
        SetupService();
      }

      // 2️⃣ Add the track to TrackPlayer
      await TrackPlayer.reset();

      await TrackPlayer.add({
        id: 'hanuman-audio',
        url: url,
        title: 'Hanuman Ji',
        artist: 'Unknown',
        artwork: "https://customer-r78atu9owo9votjm.cloudflarestream.com/bffd2d543d7ce7228566899c272b6411/thumbnails/thumbnail.jpg",
      });



      console.log('TrackPlayer setup and track added', url);

      // 3️⃣ Start playing in background
      const data = await TrackPlayer.play();
      console.log('TrackPlayer play response:', data);

      const state1 = await TrackPlayer.getState();
      console.log('Current state:', state1)
    } catch (err) {
      console.log('TrackPlayer error:', err);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      console.log("Audio playing...");
      // यहाँ Sound/TrackPlayer या WebView play कराओ
    } else {
      console.log("Audio paused...");
      // यहाँ pause/stop logic
    }
  }, [isPlaying]);

  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  const handleText = (data) => {
    console.log('data ', data);
    setText(data);
    setShow(true);
  }

  function getYouTubeVideoId(url) {
    if (url.includes("youtube.com/watch?v=")) {
      return url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url.split("embed/")[1].split("?")[0];
    }
    return null;
  }

  const renderWebView = (url, label, lyricsUrl, urlMp3) => {
    if (!url) return null;

    let embedUrl = '';
    let videoId;
    if (url.includes('soundcloud.com')) {
      // Encode the track URL for SoundCloud
      const trackUrl = encodeURIComponent(url);
      embedUrl = `https://w.soundcloud.com/player/?url=${trackUrl}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true&sharing=false&show_teaser=false&buying=false&show_artwork=false`;
    } else if (url.includes('cloudflarestream.com')) {
      // Extract the video ID from the Cloudflare Stream URL
      embedUrl = url;
    } else {
      videoId = getYouTubeVideoId(url);
    }

    return (
      <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
        {!show ? (<View style={{ paddingVertical: 10, width: '95%' }}>
          {embedUrl ? (
            <Video
              source={{ uri: embedUrl }}
              style={{ width: '100%', height: 250 }}
              resizeMode="contain"
              ignoreSilentSwitch="ignore"
              playInBackground={true}
              muted={false}
              onLoad={() => urlMp3 && playVideoWithTrackPlayer('https://api.astroone.in' + urlMp3, 'Audio Title')}
              onError={(error) => console.log('Video error:', error)}
            />
          ) : (
            <View style={{ height: SCREEN_HEIGHT * 0.25, borderRadius: 10, overflow: 'hidden' }}>
              <YoutubePlayer
                ref={playerRef}
                height={250}
                play={true} // autoplay
                videoId={videoId} // just the videoId, not the whole URL
                onChangeState={onStateChange}
              />
            </View>
          )}

          <TouchableOpacity
            onPress={() => handleText(lyricsUrl)}
            style={{ marginHorizontal: 10, borderRadius: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: normalize(20), color: 'black', fontWeight: 'bold', }}>{label}</Text>
          </TouchableOpacity>
        </View>) : (

          <View>
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
          </View>)}
      </View>
    )
  };

  const renderText = () => (
    <View style={{ margin: 20 }}>
      <RenderHTML
        contentWidth={SCREEN_WIDTH}
        source={{
          html: `
                  ${text}
              `,
        }}
      />
    </View>
  )

  const handle = () => {
    console.log('show', show)
    if (!show) {
      onClose();
    } else {
      setShow(false);
    }

  }



  return (
    <View style={{ flex: 1, backgroundColor: '#faedcd', zIndex: 10, }}>
      <View style={styles.overlay} />
      <View style={styles.musicHeader}>
        <TouchableOpacity onPress={() => handle()}>
          <Ionicons name="arrow-back-circle-outline" size={normalize(25)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.text}>
          <TranslateText title={getbaghwandata[visibleIndex]?.title || 'Loading...'} />
        </Text>
        <View></View>

      </View>
      <FlatList
        removeClippedSubviews={true}
        ListHeaderComponent={
          <>
            {!show && renderWebView(getbaghwandata[visibleIndex]?.aarti, t('Aarti Lyrics'), getbaghwandata[visibleIndex]?.aartilyrics, getbaghwandata[visibleIndex]?.aarti_mp3)}
            {!show && renderWebView(getbaghwandata[visibleIndex]?.chalisa, t('Chalisa Lyrics'), getbaghwandata[visibleIndex]?.chalisalyrics, getbaghwandata[visibleIndex]?.chalisa_mp3)}
            {!show && renderWebView(getbaghwandata[visibleIndex]?.mantralink, t('Mantra Lyrics'), getbaghwandata[visibleIndex]?.mantralyrics, getbaghwandata[visibleIndex]?.mantralink_mp3)}
            {!show && renderWebView(getbaghwandata[visibleIndex]?.bhajan, t('Bhajan Lyrics'), getbaghwandata[visibleIndex]?.bhjanlyrics, getbaghwandata[visibleIndex]?.bhajan_mp3)}
            {show && renderText()}
            <Text style={{
              textAlign: 'center',
              fontSize: normalize(20),
              fontWeight: 'bold',
              color: 'black',
              marginVertical: SCREEN_HEIGHT * 0.05,
            }}>{t("Courtesy: Youtube")}</Text>
          </>
        }
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  audioSelected: state.sanatan.audioSelected,
  currentSongIndex: state.sanatan.currentSongIndex,
  currentSongState: state.sanatan.currentSongState,
  visibleIndex: state.sanatan.visibleIndex,
  getbaghwandata: state.home.getbaghwandata,
  currentSong: state.sanatan.currentSong,
  isPlayingSong: state.sanatan.isPlayingSong,
  sliderValue: state.sanatan.sliderValue,
  druationSound: state.sanatan.druationSound
});

export default connect(mapStateToProps)(MusicPlayer);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_HEIGHT * 0.9
    // backgroundColor: 'rgba(0, 0, 0, 0.49)',
  },
  text: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },
  musicHeader: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  whatsapp: {
    height: 30,
    width: 30,
  },
  textOne: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
  textAuthor: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  playerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  playView: {
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: "center",
    padding: 5,
    height: 70,
    width: 70,
  },
  secondView: {
    backgroundColor: "#fff",
    flex: 0.54,
  },
  playerMainView: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginVertical: 10,
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listName: {
    fontSize: 18,
    fontWeight: "500",
  },
  listAuthor: {
    fontSize: 15,
    fontWeight: "400",
  },
  webview: {
    height: '100%',
    width: '100%',
    borderRadius: 8
  }
});
