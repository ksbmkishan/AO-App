import * as actionTypes from '../actionTypes';

const initialState = {
    bannerData: null,
    callAstrologer: null,
    chatAstrologer: null,
    videoCallAstrolgoer: null,
    homeSimmer: false,
    companionData: null,
    notificationData: null,
    deleteAccount: null,
    templegif: null,
    sanatangif: null,
    getabhijitdata: null,
    getdurmuhurtdata: null,
    getgulikdata: null,
    getyamgantakdata: null,
    liveTempleData: null,
    ajkapradhandata: null,
    mudradata: null,
    getlotamudra: null,
    getbaghwandata: null,
    getbaghwandatanavgrah: null,
    getbaghwandatavrmode: [],
    getcategorydata: null,
    Mygiftdata: null,
    SearchData: null,
    SendUser: null,
    getGiftDataByID: null,
    getRequestData: [],
    templeFoundation: [],
    teerthDham: [],
    templeVideos: []
};

const home = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_HOME_BANNER:
            return {
                ...state,
                bannerData: payload,
            };
        case actionTypes.SET_CALL_ASTROLOGER:
            return {
                ...state,
                callAstrologer: payload,
            };
        case actionTypes.SET_CHAT_ASTROLOGER:
            return {
                ...state,
                chatAstrologer: payload,
            };
        case actionTypes.SET_VIDEO_CALL_ASTROLOGER:
            return {
                ...state,
                videoCallAstrolgoer: payload,
            };

        case actionTypes.SET_HOME_SIMMER:
            return {
                ...state,
                homeSimmer: payload,
            };
        case actionTypes.SET_ASTRO_COMPANION_DATA:
            return {
                ...state,
                companionData: payload,
            };
        case actionTypes.SET_NOTIFICATION_DATA:
            return {
                ...state,
                notificationData: payload,
            };
        case actionTypes.SET_DELETE_ACCOUNT_DATA:
            return {
                ...state,
                deleteAccount: payload,
            };
        case actionTypes.SET_TEMPLE_GIF:
            return {
                ...state,
                templegif: payload,
            };
        case actionTypes.SET_SANATAN_TEMPLE_GIF:
            return {
                ...state,
                sanatangif: payload,
            };
        case actionTypes.SET_ABHIJIT_MUHURT:
            return {
                ...state,
                getabhijitdata: payload,
            };
        case actionTypes.SET_DUR_MUHURAT:
            return {
                ...state,
                getdurmuhurtdata: payload,
            };
        case actionTypes.SET_GULIK_MUHURAT:
            return {
                ...state,
                getgulikdata: payload,
            };
        case actionTypes.SET_YAM_MUHURAT:
            return {
                ...state,
                getyamgantakdata: payload,
            };
        case actionTypes.SET_LIVE_TEMPLE_DATA:
            return {
                ...state,
                liveTempleData: payload,
            }
        case actionTypes.SET_PRADHAN_DATA:
            return {
                ...state,
                ajkapradhandata: payload,
            };
        case actionTypes.SET_MUDRA_DATA:
            return {
                ...state,
                mudradata: payload,
            };
        case actionTypes.SET_LOTA_MUDRA_DATA:
            return {
                ...state,
                getlotamudra: payload,
            };
        case actionTypes.SET_BAGHWAN_DATA:
            return {
                ...state,
                getbaghwandata: payload,
            };
        case actionTypes.SET_BAGHWAN_DATA_NAVGRAH:
            return {
                ...state,
                getbaghwandatanavgrah: payload,
            };
        case actionTypes.SET_BAGHWAN_DATA_VR_MODE:
            return {
                ...state,
                getbaghwandatavrmode: payload
            }
        case actionTypes.SET_POOJA_CATEGORY:
            return {
                ...state,
                getcategorydata: payload,
            };
        case actionTypes.SET_GIFTS_DATA:
            return {
                ...state,
                Mygiftdata: payload,
            };
        case actionTypes.SET_SEARCH_DATA:
            return {
                ...state,
                SearchData: payload,
            };

        case actionTypes.SET_SEND_GIFTS_DATA:
            return {
                ...state,
                sendGiftData: action.payload,
            };
        case actionTypes.SET_GIFT_DATA__BY_ID:
            return {
                ...state,
                getGiftDataByID: action.payload,
            };

        case actionTypes.SET_SEND_REQUEST_DATA:
            return {
                ...state,
                getRequestData: payload
            }
        case actionTypes.SET_HOME_TEMPLE_FOUNDATION:
            return {
                ...state,
                templeFoundation: payload
            }
        case actionTypes.SET_HOME_TREERTH_DHAM:
            return {
                ...state,
                teerthDham: payload
            }
        case actionTypes.SET_TEMPLE_VIDEOS:
            return {
                ...state,
                templeVideos: payload
            }
        default:
            return state;
    }
};

export default home;
