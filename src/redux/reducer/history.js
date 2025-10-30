import * as actionTypes from '../actionTypes'

const initialState = {
    chatHistoryData: null,
    callHistoryData: null,
    liveVedioCallHistoryData: null,
    walletHistory: null,
    videocallHistory: null,
    purusharthaHistory:[],
    rechargeHistory:[]
};

const history = (state = initialState, actions)=>{
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_CHAT_HISTORY:
            return {
               ...state,
               chatHistoryData: payload,
            };
        case actionTypes.SET_CALL_HISTORY:
            return {
               ...state,
               callHistoryData: payload,
            };
        case actionTypes.SET_LIVE_VEDIO_CALL_HISTORY:
            return {
               ...state,
               liveVedioCallHistoryData: payload,
            };
        case actionTypes.SET_WALLET_HISTORY:
            return {
               ...state,
               walletHistory: payload,
            };
            case actionTypes.SET_VIDEO_CALL_HISTORY:
            return {
               ...state,
               videocallHistory: payload,
            };
            case actionTypes.SET_PURUSHARTHA_HISTORY:
                return {
                    ...state,
                    purusharthaHistory:payload
                }
            case actionTypes.SET_RECHARGE_HISTORY:
                return {
                    ...state,
                    rechargeHistory: payload
                }
        default:{
            return state
        }
    }
}

export default history;