import * as actionTypes from '../actionTypes'

export const getSplash = payload => ({
    type: actionTypes.GET_SPLASH,
    payload,
})

export const setLocationData = payload => ({
    type: actionTypes.SET_LOCATION_DATA,
    payload,
})

export const setSubLocationData = payload => ({
    type: actionTypes.SET_SUB_LOCATION_DATA,
    payload,
})

export const setImagePickerVisible = payload => ({
    type: actionTypes.SET_IMAGE_PICKER_VISIBLE,
    payload,
})

export const setIsMoreLoading = payload => ({
    type: actionTypes.SET_IS_MORE_LOADING,
    payload,
})

// chat AI

export const getWelcomeMessage = payload => ({
    type: actionTypes.GET_WELCOME_MESSAGE,
    payload,
})

export const setWelcomeMessage = payload => ({
    type: actionTypes.SET_WELCOME_MESSAGE,
    payload,
})



export const getSavedProfiles = payload => ({
    type: actionTypes.GET_SAVED_PROFILES,
    payload,
})

export const setSavedProfiles = payload => ({
    type: actionTypes.SET_SAVED_PROFILES,
    payload,
})



export const getCategory = payload => ({
    type: actionTypes.GET_CATEGORY_DATA,
    payload,
})

export const setCategory = payload => ({
    type: actionTypes.SET_CATEGORY_DATA,
    payload,
})


export const getChatHistory = payload => ({
    type: actionTypes.GET_CHAT_HISTORY_LETTER,
    payload,
})

export const setChatHistory = payload => ({
    type: actionTypes.SET_CHAT_HISTORY_LETTER,
    payload,
})









export const getQuestionslist = payload => ({
    type: actionTypes.GET_QUESTIONS_DATA,
    payload,
})

export const setQuestionslist = payload => ({
    type: actionTypes.SET_QUESTIONS_DATA,
    payload,
})


export const getAnswersdata = payload => ({
    type: actionTypes.GET_ANSWERS_DATA,
    payload,
})

export const setAnswersdata = payload => ({
    type: actionTypes.SET_ANSWERS_DATA,
    payload,
})


export const getrelatedQuestions = payload => ({
    type: actionTypes.GET_RELATED_QUESTIONS,
    payload,
})

export const setrelatedQuestions = payload => ({
    type: actionTypes.SET_RELATED_QUESTIONS,
    payload,
})

export const getChatGptSearch = payload => ({
    type: actionTypes.GET_CHAT_GPT_SEARCH,
    payload,
})

export const setChatGptSearch = payload => ({
    type: actionTypes.SET_CHAT_GPT_SEARCH,
    payload,
})


export const getSaveMessages = payload => ({
    type: actionTypes.GET_SAVE_MESSAGES,
    payload,
})

export const setSaveMessages = payload => ({
    type: actionTypes.SET_SAVE_MESSAGES,
    payload,
})


export const getDivyaPlansData = payload => ({
    type: actionTypes.GET_DIVYA_PLANS,
    payload,
})

export const setDivyaPlansData = payload => ({
    type: actionTypes.SET_DIVYA_PLANS,
    payload,
})

export const getBuyPlans = payload => ({
    type: actionTypes.GET_BUY_PLANS,
    payload,
})

export const setBuyPlans = payload => ({
    type: actionTypes.SET_BUY_PLANS,
    payload,
})


export const getPlansHistory = payload => ({
    type: actionTypes.GET_PLANS_HISTORY,
    payload,
})

export const setPlansHistory = payload => ({
    type: actionTypes.SET_PLANS_HISTORY,
    payload,
})


export const setKundliUsername = payload => ({
    type: actionTypes.SET_NAME_INKUNDLI,
    payload,
});
export const setGender = payload => ({
    type: actionTypes.SET_GENDER_INKUNDLI,
    payload,
});
export const setDob = payload => ({
    type: actionTypes.SET_DateOFBIRTH_INKUNDLI,
    payload,
});
export const setTime = payload => ({
    type: actionTypes.SET_DateOFTIME_INKUNDLI,
    payload,
});



export const getUserDatasaveDB = payload => ({
    type: actionTypes.GET_USER_DATA_DB,
    payload,
})

export const SetUserDatasaveDB = payload => ({
    type: actionTypes.SET_USER_DATA_DB,
    payload,
})

export const onUpdatePin = payload => ({
    type: actionTypes.ON_UPDATE_PIN,
    payload,
})

export const setVideoId = payload => ({
    type: actionTypes.SET_VIDEO_ID,
    payload
})

export const onJoin = payload => ({
    type: actionTypes.ON_JOIN,
    payload
})

export const setVisibleHomeModal = payload => ({
    type: actionTypes.SET_VISIBLE_HOME_MODAL,
    payload
});