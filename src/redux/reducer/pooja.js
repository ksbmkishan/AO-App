import * as actionTypes from '../actionTypes';
const initialState = {
    poojaData: null,
    newPoojaData: null,
    allpoojadata: null,
    bookPoojaData: null,
    bookpujaHistoryData: null,
    isVisible: false,
    pujaDetails: null,
    getallReligionCollection: null,
    getallReligionCollectionsubCategoryData: null
};
const pooja = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_POOJA_DATA:
            return {
                ...state,
                poojaData: payload,
            };
        case actionTypes.SET_NEW_POOJA_DATA:
            return {
                ...state,
                newPoojaData: payload,
            };
        case actionTypes.SET_BOOK_POOJA:
            return {
                ...state,
                bookPoojaData: payload
            }
        case actionTypes.GET_BOOK_POOJA_HISTORY_DATA:
            return {
                ...state,
                // bookpujaHistoryData : payload
            }
        case actionTypes.SET_BOOK_POOJA_HISTORY_DATA:
            return {
                ...state,
                bookpujaHistoryData: payload
            }

        case actionTypes.SET_PUJA_DETAILS:
            return {
                ...state,
                pujaDetails: payload
            }
        case actionTypes.SET_ALL_RELIGION_COLLECTION:
            return {
                ...state,
                getallReligionCollection: payload
            }
        case actionTypes.SET_ALL_RELIGION_COLLECTION_SUB_CATGORY:
            return {
                ...state,
                getallReligionCollectionsubCategoryData: payload
            }
        case actionTypes.OPEN_MODAL:
            return { ...state, isVisible: true };
        case actionTypes.CLOSE_MODAL:
            return { ...state, isVisible: false };

        default:
            return state;
    }
};

export default pooja;
