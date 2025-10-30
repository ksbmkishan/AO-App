import DivyaRashi from '../../screens/history/DivyaRashi';
import * as actionTypes from '../actionTypes';
const initialState = {
    isLoading: false,
    isRefreshing: false,
    locationData: null,
    subLocationData: null,
    imagePickerVisible: false,
    isMoreLoading: false,
    WelcomeMessage: null,
    CategoryData: null,
    Questionslist: null,
    Answersdata: null,
    ReletedQuestions: null,
    ChatGptReponse: null,
    Savemessages: null,
    DivyaRashiPlans: null,
    Buyplans: null,
    PlansHistory: null,
    UserDataSave: null,
    ChatHistoryletter: null,
    SavedProfilesData: null,
    HomeModalVisible: false,
};
const setting = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload,
            };

        case actionTypes.SET_IS_REFRESHING:
            return {
                ...state,
                isRefreshing: payload,
            };

        case actionTypes.SET_LOCATION_DATA:
            return {
                ...state,
                locationData: payload,
            };
        case actionTypes.SET_SUB_LOCATION_DATA:
            return {
                ...state,
                subLocationData: payload,
            };
        case actionTypes.SET_IMAGE_PICKER_VISIBLE:
            return {
                ...state,
                imagePickerVisible: payload,
            };
        case actionTypes.SET_IS_MORE_LOADING:
            return {
                ...state,
                isMoreLoading: payload,
            };
        case actionTypes.SET_WELCOME_MESSAGE:
            return {
                ...state,
                WelcomeMessage: payload,
            };


        case actionTypes.SET_SAVED_PROFILES:
            return {
                ...state,
                SavedProfilesData: payload,
            };


        case actionTypes.SET_CATEGORY_DATA:
            return {
                ...state,
                CategoryData: payload,
            };


        case actionTypes.SET_QUESTIONS_DATA:
            return {
                ...state,
                Questionslist: payload,
            };

        case actionTypes.SET_ANSWERS_DATA:
            return {
                ...state,
                Answersdata: payload,
            };


        case actionTypes.SET_RELATED_QUESTIONS:
            return {
                ...state,
                ReletedQuestions: payload,
            };


        case actionTypes.SET_CHAT_GPT_SEARCH:
            return {
                ...state,
                ChatGptReponse: payload,
            };

        case actionTypes.SET_SAVE_MESSAGES:
            return {
                ...state,
                Savemessages: payload,
            };


        case actionTypes.SET_DIVYA_PLANS:
            return {
                ...state,
                DivyaRashiPlans: payload,
            };

        case actionTypes.SET_BUY_PLANS:
            return {
                ...state,
                Buyplans: payload,
            };

        case actionTypes.SET_PLANS_HISTORY:
            return {
                ...state,
                PlansHistory: payload,
            };

        case actionTypes.SET_NAME_INKUNDLI:
            return {
                ...state,
                kundliusername: payload,
            };
        case actionTypes.SET_GENDER_INKUNDLI:
            return {
                ...state,
                kundligender: payload,
            };
        case actionTypes.SET_DateOFBIRTH_INKUNDLI:
            return {
                ...state,
                kundlidob: payload,
            };
        case actionTypes.SET_DateOFTIME_INKUNDLI:
            return {
                ...state,
                kundlidot: payload,
            };

        case actionTypes.SET_USER_DATA_DB:
            return {
                ...state,
                UserDataSave: payload,
            };

        case actionTypes.SET_CHAT_HISTORY_LETTER:
            return {
                ...state,
                ChatHistoryletter: payload,
            };


        case actionTypes.SET_LOGIN:
            return {
                ...state,
                loginData: payload
            }
        case actionTypes.SET_VISIBLE_HOME_MODAL:
            return {
                ...state,
                HomeModalVisible: payload
            }


        default:
            return state;
    }
};

export default setting;
