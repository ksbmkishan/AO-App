import * as actionTypes from '../actionTypes';
const initialState = {
    flowerVisible: false,
    aartiSound: null,
    shankhSound: null,
    cocountSound: null,
    bellSound: null,
    bellSound2:null,
    normalVisible: false,
    rotateVisible: false,
    gifBellVisible: false,
    imageBellVisible: true,
    showLottieMudra: false,
    showShowerVisible: false,
    selecteTop: null,
    visibleIndex: 0,
    flowerImage: null,
    gifBellVisible1: false,
    imageBellVisible1: true,
    audioSelected: [],
    activeCategory: null,
    currentIndex: 0,
    mythaliData:null,
    spinValue: 0,
    cocountVisible: false,
    setupPlayer: false,
    currentSongIndex: 0,
    currentSongState: null,
    soundCurrentState: null,
    normalGif: true,
    currentSong: null,
    isPlayingSong: false,
    sliderValue: 0,
    druationSound: 0,
    shankhVisible: false,
    bottomLeft: false,
    visibleNavgarhIndex: 0,
    vardanShivalyaData: null

};
const sanatan = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_SANTAN_FLOWER_VISIBLE:
            return {
                ...state,
                flowerVisible: payload,
            };
        case actionTypes.SET_SANTAN_SOUND_AARTI: 
            return {
                ...state,
                aartiSound: payload
            }
        case actionTypes.SET_SANTAN_SOUND_SHANKH:
            return {
                ...state,
                shankhSound: payload
            }
        case actionTypes.SET_SANTAN_SOUND_COCOUNT:
            return {
                ...state,
                cocountSound: payload
            }
        case actionTypes.SET_SANTAN_SOUND_BELL:
            return {
                ...state,
                bellSound: payload
            }
        case actionTypes.SET_SANTAN_SOUND_BELL_2:
            return {
                ...state,
                bellSound2:payload
            }
        case actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE:
            return {
                ...state,
                normalVisible: payload
            }
        case actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE:
            return {
                ...state,
                rotateVisible: payload
            }
        case actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE:
            return {
                ...state,
                gifBellVisible: payload
            }
        case actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE:
            return {
                ...state,
                imageBellVisible: payload
            }
        case actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE_2:
            return {
                ...state,
                gifBellVisible1: payload

            }
        case actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE_2:
            return {
                ...state,
                imageBellVisible1: payload
            }
        case actionTypes.SET_SHOW_LOTTIE_MUDRA:
            return {
                ...state,
                showLottieMudra: payload
            }
        case actionTypes.SET_SHOW_SHOWER_VISIBLE:
            return {
                ...state,
                showShowerVisible: payload
            }
        case actionTypes.SET_SANTAN_SELECTED_TOP:
            return {
                ...state,
                selecteTop: payload
            }
        case actionTypes.SET_SANTAN_VISIBLE_INDEX:
            return {
                ...state,
                visibleIndex: payload
            }
        case actionTypes.SET_SANTAN_NAVGARH_VISIBLE_INDEX:
            return {
                ...state,
                visibleNavgarhIndex: payload
            }
        case actionTypes.SET_FLOWER_IMAGE:
            return {
                ...state,
                flowerImage: payload
            }
        case actionTypes.SET_SANTAN_AUDIO_SELECTED:
            return {
                ...state,
                audioSelected: payload
            }
        case actionTypes.SET_SANTAN_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: payload
            }
        case actionTypes.SET_SANTAN_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: payload
            }
        case actionTypes.SET_SANTAN_MY_THALI:
            return {
                ...state,
                mythaliData: payload
            }
        case actionTypes.SET_SANTAN_SPIN_VALUE:
            return {
                ...state,
                spinValue: payload
            }
        case actionTypes.SET_SANTAN_COCOUNT_VISIBLE: 
            return {
                ...state,
                cocountVisible: payload
            }
        case actionTypes.SET_SANTAN_SETUP_PLAYER: 
            return {
                ...state,
                setupPlayer: payload
            }
        case actionTypes.SET_SANTAN_CURRENT_SONG_INDEX: 
            return {
                ...state,
                currentSongIndex: payload
            }
        case actionTypes.SET_SANTAN_SONG_CURRENT_STATE:
            return {
                ...state,
                currentSongState: payload
            }
        case actionTypes.SET_SANTAN_SOUND_CURRENT_STATE:
            return {
                ...state,
                soundCurrentState: payload
            }
        case actionTypes.SET_SANTAN_NORMAL_GIF: 
            return {
                ...state,
                normalGif: payload
            }
        case actionTypes.SET_SANTAN_CURRENT_SONG:
            return {
                ...state,
                currentSong: payload
            }
        case actionTypes.SET_SANTAN_IS_PLAYING:
            return {
                ...state,
                isPlayingSong: payload
            }
        case actionTypes.SET_SANTAN_SLIDER_VALUE:
            return {
                ...state,
                sliderValue: payload
            }
        case actionTypes.SET_SANTAN_DURATION_SOUND:
            return {
                ...state,
                druationSound: payload
            }
        case actionTypes.SHOW_SANTAN_SHANKH_VISIBLE:
            return {
                ...state,
                shankhVisible: payload
            }
        case actionTypes.SET_BOTTOM_LEFT: 
            return {
                ...state,
                bottomLeft: payload
            }
        case actionTypes.SET_VARDAN_SHIVALYA_DATA:
            return {
                ...state,
                vardanShivalyaData: payload
            }
        default:
            return state;
    }
};

export default sanatan;
