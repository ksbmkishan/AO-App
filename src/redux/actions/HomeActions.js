import * as actionTypes from '../actionTypes';

export const getHomeData = payload =>({
    type: actionTypes.GET_HOME_DATA,
    payload,
})

export const setHomeBanner = payload =>({
    type: actionTypes.SET_HOME_BANNER,
    payload,
})

export const setCallAstrologer = payload =>({
    type: actionTypes.SET_CALL_ASTROLOGER,
    payload,
})

export const setChatAstrologer = payload =>({
    type: actionTypes.SET_CHAT_ASTROLOGER,
    payload,
})
export const setVideoCallAstrologer = payload =>({
    type: actionTypes.SET_VIDEO_CALL_ASTROLOGER,
    payload,
})

export const getHomeDataOnRefresh = payload =>({
    type: actionTypes.GET_HOME_DATA_ON_REFRESH,
    payload,
})

export const getAstroCompanionData = payload =>({
    type: actionTypes.GET_ASTRO_COMPANION_DATA,
    payload,
})

export const setAstroCompanionData = payload =>({
    type: actionTypes.SET_ASTRO_COMPANION_DATA,
    payload,
})
export const getNotificationData = payload =>({
    type: actionTypes.GET_NOTIFICATION_DATA,
    payload,
})
export const setNotificationData = payload =>({
    type: actionTypes.SET_NOTIFICATION_DATA,
    payload,
})
export const getGiftDataByID = payload =>({
    type: actionTypes.GET_GIFT_DATA__BY_ID,
    payload,
})
export const setGiftDataByID = payload =>({
    type: actionTypes.SET_GIFT_DATA__BY_ID,
    payload,
})
export const getDeleteAccount = payload =>({
    type: actionTypes.GET_DELETE_ACCOUNT_DATA,
    payload,
})
export const setDeleteAccount = payload =>({
    type: actionTypes.SET_DELETE_ACCOUNT_DATA,
    payload,
})
export const getTemplegif = payload =>({
    type: actionTypes.GET_TEMPLE_GIF,
    payload,
})

export const getSanatangif = payload =>({
    type: actionTypes.GET_SANATAN_TEMPLE_GIF,
    payload,
})


export const getAbijitMuhurt = payload => {
    return {
        type: actionTypes.GET_ABHIJIT_MUHURT,
        payload,
    };
};
export const setAbijitMuhurt = payload =>({
    type: actionTypes.SET_ABHIJIT_MUHURT,
    payload,
})

export const getDurMuhurat = payload => {
    return {
        type: actionTypes.GET_DUR_MUHURAT,
        payload,
    };
};
export const setDurMuhurat = payload =>({
    type: actionTypes.SET_DUR_MUHURAT,
    payload,
})

export const getGulikMuhurat = payload => {
    return {
        type: actionTypes.GET_GULIK_MUHURAT,
        payload,
    };
};
export const setGulikMuhurat = payload =>({
    type: actionTypes.SET_GULIK_MUHURAT,
    payload,
})

export const getYamMuhurat = payload => {
    return {
        type: actionTypes.GET_YAM_MUHURAT,
        payload,
    };
};

export const setYamMuhurat = payload =>({
    type: actionTypes.SET_YAM_MUHURAT,
    payload,
})

export const getLiveTempleData = payload =>({
    type: actionTypes.GET_LIVE_TEMPLE_DATA,
    payload,
})

export const setLiveTempleData = payload =>({
    type: actionTypes.SET_LIVE_TEMPLE_DATA,
    payload,
})


// Aj ka pradhan
export const getAjKaPradhan = payload => {
    console.log("getAjKaPradhan payload:", payload); // Logs the payload
    return {
        type: actionTypes.GET_PRADHAN_DATA,
        payload,
    };
};

export const setAjKaPradhan = payload => {
    console.log("setAjKaPradhan payload:", payload); // Logs the payload
    return {
        type: actionTypes.SET_PRADHAN_DATA,
        payload,
    };
};
export const getAllMudra = payload => {
    return {
        type: actionTypes.GET_MUDRA_DATA,
        payload,
    };
};

export const setAllMudra = payload => {
    return {
        type: actionTypes.SET_MUDRA_DATA,
        payload,
    };
};


export const getLotaMudra = payload => {
    return {
        type: actionTypes.GET_LOTA_MUDRA_DATA,
        payload,
    };
};

export const setLotaMudra = payload => {
    return {
        type: actionTypes.SET_LOTA_MUDRA_DATA,
        payload,
    };
};


export const getBaghwanData = payload => {
    return {
        type: actionTypes.GET_BAGHWAN_DATA,
        payload,
    };
};


export const setBaghwanData = payload =>({
    type: actionTypes.SET_BAGHWAN_DATA,
    payload,
})

export const setBaghwandataNavgrah = payload => {
    return {
        type: actionTypes.SET_BAGHWAN_DATA_NAVGRAH,
        payload,
    };
};

export const getBaghwanDataVrMode = payload => ({
    type: actionTypes.GET_BAGHWAN_DATA_VR_MODE,
    payload
})

export const getBaghwandataNavgrah = payload => {
    return {
        type: actionTypes.GET_BAGHWAN_DATA_NAVGRAH,
        payload,
    };
};

export const getPoojaCategory = payload => {
    return {
        type: actionTypes.GET_POOJA_CATEGORY,
        payload,
    };
};
export const setPoojaCategory = payload =>({
    type: actionTypes.SET_POOJA_CATEGORY,
    payload,
})

export const getGiftsData = payload => {
    return {
        type: actionTypes.GET_GIFTS_DATA,
        payload,
    };
};
export const setGiftsData = payload =>({
    type: actionTypes.SET_GIFTS_DATA,
    payload,
})

export const getSearchData = payload => {
    return {
        type: actionTypes.GET_SEARCH_DATA,
        payload,
    };
};
export const setSearchData = payload =>({
    type: actionTypes.SET_SEARCH_DATA,
    payload,
})

export const getSendUserData = payload => {
    return {
      type: actionTypes.GET_SEND_GIFTS_DATA,
      payload,
    };
  };
export const setSendUserData = payload => ({
    type: actionTypes.SET_SEND_GIFTS_DATA,
    payload,
});

export const getSendRequest = payload => ({
    type: actionTypes.GET_SEND_GIFT_REQUEST,
    payload
})

export const getSendRequestData = payload => ({
    type: actionTypes.GET_SEND_REQUEST_DATA,
    payload
})

export const onRespondWalletRequest = payload => ({
    type: actionTypes.ON_RESPOND_WALLET_REQUEST,
    payload
})


