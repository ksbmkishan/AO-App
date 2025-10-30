import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../config/Screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';
import * as SantanActions from '../../../../redux/actions/sanatanActions';
import { new_img_url } from '../../../../config/Constants1';
import { Sizes } from '../../../../assets/style';
import WebView from 'react-native-webview';
import RenderHTML from 'react-native-render-html';
import { normalize } from '../../../../config/constants';
import YoutubePlayer from "react-native-youtube-iframe";
import { useTranslation } from 'react-i18next';
import TranslateText from '../../../language/TranslateText';

const MusicPlayer = ({ onClose, audioSelected, dispatch, currentSongIndex, currentSongState, visibleNavgarhIndex, getbaghwandatanavgrah }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const sliderRef = useRef(null);

  const {t} = useTranslation();

    const playerRef = useRef(null);

     const onStateChange = useCallback((state) => {
        if (state === "ended") {
          console.log("Video has finished playing!");
        }
      }, []);

  useEffect(() => {
    if (audioSelected && audioSelected.length > 0) {
      dispatch(SantanActions.setSantanCurrentSongIndex(0));
    }
  }, [audioSelected]);

  useEffect(() => {
    if (currentSound) {
      currentSound.release();
    }
    if (audioSelected[currentSongIndex]) {
      playSong(audioSelected[currentSongIndex]);
    }
  }, [currentSongIndex]);

  useEffect(() => {
    let interval = null;

    if (currentSound && isPlaying) {
      interval = setInterval(() => {
        currentSound.getCurrentTime((seconds) => {
          setSliderValue(seconds);
        });
      }, 1000); // Update slider value every second
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentSound, isPlaying]);

  const playSong = (song) => {
    const sound = new Sound(song.url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading sound', error);
        return;
      }
      setDuration(sound.getDuration());
      //   sound.play(() => {
      //     setIsPlaying(false);
      //     dispatch(SantanActions.setSantanCurrentSongState(Sound.PAUSED));
      //   });
    });
    setCurrentSound(sound);
    dispatch(SantanActions.setSantanSoundCurrentState(sound));
    // setIsPlaying(false);
    dispatch(SantanActions.setSantanCurrentSongState(Sound.PLAYING));
  };

  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  console.log('text ::: ', text)

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


  const handleText = (data) => {
    console.log('data ', data);
    setText(data);
    setShow(true);
  }

  const renderWebView = (url, label, lyricsUrl) => {
    let embedUrl = '';
    let videoId;
    if (url.includes('soundcloud.com')) {
      // Encode the track URL for SoundCloud
      const trackUrl = encodeURIComponent(url);
      embedUrl = `https://w.soundcloud.com/player/?url=${trackUrl}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true&sharing=false&show_teaser=false&buying=false&show_artwork=false`;
    } else {
      videoId = getYouTubeVideoId(url);
    }

    return(
    <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
      {!show ? (<View style={{ paddingVertical: 10, width: '95%' }}>
        <View style={{ height: SCREEN_HEIGHT * 0.25, borderRadius: 10, overflow: 'hidden' }}>
          <YoutubePlayer
              ref={playerRef}
              height={250}
              play={true} // autoplay
              videoId={videoId} // just the videoId, not the whole URL
              onChangeState={onStateChange}
            />
        </View>
        <TouchableOpacity
          onPress={() => handleText(lyricsUrl)}
          style={{ marginHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: normalize(20), color: 'black', fontWeight: 'bold' }}>{label}</Text>
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
    if (show) {
      setShow(false);
    } else {
      onClose();
    }
  }


  return (
    <View style={{ backgroundColor: '#faedcd', flex: 1 }}>

      <View style={styles.overlay} />
      <View style={styles.musicHeader}>
        <TouchableOpacity onPress={() => handle()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.text}>
          <TranslateText title={getbaghwandatanavgrah[visibleNavgarhIndex]?.title || 'Loading...'} />
        </Text>
        {/* <Image source={require('../../../../assets/images/what.png')} style={styles.whatsapp} /> */}
        <View></View>
      </View>
      <FlatList
        removeClippedSubviews={true}
        ListHeaderComponent={
          <>
            {!show && renderWebView(getbaghwandatanavgrah[visibleNavgarhIndex]?.aarti, t('Aarti Lyrics'), getbaghwandatanavgrah[visibleNavgarhIndex]?.aartilyrics)}
            {!show && renderWebView(getbaghwandatanavgrah[visibleNavgarhIndex]?.chalisa, t('Chalisa Lyrics'), getbaghwandatanavgrah[visibleNavgarhIndex]?.chalisalyrics)}
            {!show && renderWebView(getbaghwandatanavgrah[visibleNavgarhIndex]?.mantralink, t('Mantra Lyrics'), getbaghwandatanavgrah[visibleNavgarhIndex]?.mantralyrics)}
            {!show && renderWebView(getbaghwandatanavgrah[visibleNavgarhIndex]?.bhajan, t('Bhajan Lyrics'), getbaghwandatanavgrah[visibleNavgarhIndex]?.bhjanlyrics)}
            {show && renderText()}
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
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
  visibleNavgarhIndex: state.sanatan.visibleNavgarhIndex,
  getbaghwandatanavgrah: state.home.getbaghwandatanavgrah,
});

export default connect(mapStateToProps)(MusicPlayer);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 0.46,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.49)',
  },
  text: {
    color: "#000",
    fontSize: normalize(20),
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
});
