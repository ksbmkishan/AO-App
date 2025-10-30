import * as actionTypes from '../actionTypes';
const initialState = {
    // add your initial state properties here, e.g.:
   
    isDiyaAnimating: false,
    vrItems: [],
    isBellRinging: false,
    isPujaGif: false,
    isCoconutGif: false,
    isShowAnimation: false,
    isImageAnimation: null,
    changeVrImageCount: 0
};

const VRAndAR = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        
        case actionTypes.SET_DIYA_ANIMATION:
       
            return {
                ...state,
                isDiyaAnimating: payload,
            };
        case actionTypes.SET_VR_ITEAMS:
            return {
                ...state,
                vrItems: payload,
            };
        case actionTypes.SET_BELL_GIF:
            return {
                ...state,
                isBellRinging: payload,
            };
        case actionTypes.SET_PUJA_GIF:
            return {
                ...state,
                isPujaGif: payload,
            };
        case actionTypes.SET_COCOUNT_GIF:
            return {
                ...state,
                isCoconutGif: payload,
            };
        case actionTypes.SET_SHOW_ANIMATION:
            return {
                ...state,
                isShowAnimation: payload,
            };
        case actionTypes.SET_IMAGE_ANIMATION:
            return {
                ...state,
                isImageAnimation: payload,
            };
        case actionTypes.CHANGE_VR_IMAGE:
            return {
                ...state,
                changeVrImageCount: payload
            }
        default:
            return state;
    }
};

export default VRAndAR;
