import * as actionTypes from '../actionTypes';

export const setCustomerData = payload => ({
  type: actionTypes.SET_CUSTOMER_DATA,
  payload,
});

export const getCustomerData = payload => ({
  type: actionTypes.GET_CUSTOMER_DATA,
  payload,
})

export const setFirebaseId = payload => ({
  type: actionTypes.SET_FIREBASE_ID,
  payload,
});

export const setWallet = payload => ({
  type: actionTypes.SET_WALLET,
  payload,
});

export const setCallInvoiceId = payload => ({
  type: '',
  payload,
})

export const setNotifications = payload => ({
  type: actionTypes.SET_NOTIFICATIONS,
  payload,
})

export const setNotificationCounts = payload => ({
  type: actionTypes.SET_NOTIFICATION_COUNTS,
  payload,
})

export const onWalletRecharge = payload => ({
  type: actionTypes.ON_WALLET_RECHARGE,
  payload,
})

export const setFollowingList = payload => ({
  type: actionTypes.SET_FOLLOWING_LIST,
  payload,
})

export const getFollowingList = payload => ({
  type: actionTypes.GET_FOLLOWING_LIST,
  payload,
})

export const getWalletRechargeOfferList = payload => ({
  type: actionTypes.GET_WALLET_RECHARGE_OFFER_LIST,
  payload,
})

export const setWalletRechargeOfferList = payload => ({
  type: actionTypes.SET_WALLET_RECHARGE_OFFER_LIST,
  payload,
})

export const onVARDANSHIVALYADEDUCT = payload => ({
  type: actionTypes.ON_VARDAN_SHIVALYA_DEDUCT,
  payload
})

export const onShivalyaDeduct = payload => ({
  type: actionTypes.ON_SHIVALYA_DEDUCT,
  payload
})

export const onCustomerReferralCode= payload => ({
  type: actionTypes.ON_CUSTOMER_REFERRAL_CODE,
  payload
})

export const setAddressModalVisible = payload => ({
  type: actionTypes.SET_ADDRESS_MODAL_VISIBLE,
  payload
})

export const onVardanDayReset = payload => ({
  type: actionTypes.ON_VARDAN_DAY_RESET,
  payload
})

export const onShivalyaDayReset = payload => ({
  type: actionTypes.ON_SHIVALYA_DAY_RESET,
  payload
})

export const getDivyaHistory = payload => ({
  type: actionTypes.GET_DIVYA_HISTORY,
  payload
})

