import * as actionTypes from '../actionTypes';

const initialState = {
  customerData: null,
  followingListData: null,
  rechargeOfferList: null,
  addressVisible: false,
  divyaHistory: []
};

const customer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CUSTOMER_DATA:
      return {
        ...state,
        customerData: payload,
      };
    case actionTypes.SET_FOLLOWING_LIST:
      return {
        ...state,
        followingListData: payload,
      };
    case actionTypes.SET_WALLET_RECHARGE_OFFER_LIST:
      return {
        ...state,
        rechargeOfferList: payload,
      };
    case actionTypes.SET_ADDRESS_MODAL_VISIBLE: 
      return {
        ...state,
        addressVisible: payload
      }
    case actionTypes.SET_DIVYA_HISTORY:
      return {
        ...state,
        divyaHistory: payload
      }
    default:
      return state;
  }
};

export default customer;
