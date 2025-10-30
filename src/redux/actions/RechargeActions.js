import * as actionTypes from '../actionTypes';

export const getDeviceContacts = payload => ({
    type: actionTypes.GET_DEVICE_CONTACTS,
    payload
})

export const setDeviceContacts = payload => ({
    type: actionTypes.SET_DEVICE_CONTACTS,
    payload
})

export const setMasterDeviceContacts = payload => ({
    type: actionTypes.SET_MASTER_DEVICE_CONTACTS,
    payload
})

export const getMobilePlans = payload => ({
    type: actionTypes.GET_MOBILE_PLANS,
    payload
})

export const setMobilePlans = payload => ({
    type: actionTypes.SET_MOBILE_PLANS,
    payload
})

export const setMasterMobilePlans = payload => ({
    type: actionTypes.SET_MASTER_MOBILE_PLANS,
    payload
})

export const getrecharge = payload => ({
    type: actionTypes.GET_RECHARGE,
    payload,
});

export const setrecharge = payload => ({
    type: actionTypes.SET_RECHARGE,
    payload,
});

export const onRazorpay = payload => ({
    type: actionTypes.ON_RAZORPAY,
    payload,
});

export const getRechargeRequestFields = payload => ({
    type: actionTypes.GET_RECHARGE_REQUEST_FIELDS,
    payload,
})

export const setRechargeRequestFields = payload => ({
    type: actionTypes.SET_RECHARGE_REQUEST_FIELDS,
    payload,
})

export const getRechargeBillDetails = payload => ({
    type: actionTypes.GET_RECHARGE_BILL_DETAILS,
    payload,
})

export const setRechargeBillDetails = payload => ({
    type: actionTypes.SET_RECHARGE_BILL_DETAILS,
    payload,
});

export const getDthOperator = payload => ({
    type: actionTypes.GET_DTH_OPERATOR,
    payload,
});

export const setDthoperator = payload => ({
    type: actionTypes.SET_DTH_OPERATOR,
    payload,
});

export const getDthBillDetails = payload => ({
    type: actionTypes.GET_DTH_BILL_DETAILS,
    payload,
})

export const getoperator = payload => ({
    type: actionTypes.GET_OPERATOR,
    payload,
})
export const setoperator = payload => ({
    type: actionTypes.SET_OPERATOR,
    payload,
})
export const getbilldetails = payload => ({
    type: actionTypes.GET_BILL_DETAILS,
    payload,
})
export const setbilldetails = payload => ({
    type: actionTypes.SET_BILL_DETAILS,
    payload,
})
export const getpostpaidoperator = payload => ({
    type: actionTypes.GET_POSTPAID_OPERATOR,
    payload,
})
export const setpostpaidopertaor = payload => ({
    type: actionTypes.SET_POSTPAID_OPERATOR,
    payload,
})

export const onFastTagRecharge = payload => ({
    type: actionTypes.ON_FASTTAG_RECHARGE,
    payload,
})

export const getFastTagOperatior = payload => ({
    type: actionTypes.GET_FASTTAG_OPERATOR,
    payload,
})

export const setFastTagOperator = payload => ({
    type: actionTypes.SET_FASTTAG_OPERATOR,
    payload,
})

export const getElectricityOperator = payload => ({
    type: actionTypes.GET_ELECTRICITY_OPERATOR,
    payload
})

export const setElectricityOperator = payload => ({
    type: actionTypes.SET_ELECTRICITY_OPERATOR,
    payload
})

export const getMetroOperators = payload => ({
    type: actionTypes.GET_METRO_OPERATORS,
    payload
})

export const setMetroOperators = payload => ({
    type: actionTypes.SET_METRO_OPERATORS,
    payload
})

export const getGasOperator = payload => ({
    type: actionTypes.GET_GAS_OPERATOR,
    payload
})

export const setGasOperator = payload => ({
    type: actionTypes.SET_GAS_OPERATOR,
    payload
})


export const getDTHValdation = payload => ({
    type: actionTypes.GET_DTH_Validation,
    payload
});

export const onCyrusRecharge = payload => ({
    type: actionTypes.ON_CYRUS_RECHARGE,
    payload
})

export const getServicesList = () => ({
    type: actionTypes.GET_SERVICES_LIST
});

export const setServicesList = (payload) => ({
    type: actionTypes.SET_SERVICES_LIST,
    payload
});

export const setServicesListLoading = (payload) => ({
    type: actionTypes.SERVICES_LIST_LOADING,
    payload
});

export const setServicesListError = (payload) => ({
    type: actionTypes.SERVICES_LIST_ERROR,
    payload
});

export const getAllServiceProviders = payload => ({
    type: actionTypes.GET_ALL_SERVICE_PROVIDERS,
    payload
});

export const setAllServiceProviders = payload => ({
    type: actionTypes.SET_ALL_SERVICE_PROVIDERS,
    payload
});

export const setSelectedOperator = (operator) => {
    return {
        type: actionTypes.SET_SELECTED_OPERATOR,
        payload: operator
    };
};



// Razorpay Test
export const razorpayTest = payload => ({
    type: actionTypes.ON_RAZORPAY_TEST,
    payload
})










export const checkOffer = payload => ({
    type: actionTypes.CHECK_OFFER,
    payload
});

export const setCheckOffer = payload => ({
    type: actionTypes.SET_CHECK_OFFER,
    payload
});

export const getCircleList = payload => ({
    type: actionTypes.GET_CIRCLE_LIST,
    payload
});

export const setCircleList = payload => ({
    type: actionTypes.SET_CIRCLE_LIST,
    payload
});

export const selectOperator = (operator) => ({
    type: actionTypes.SELECT_OPERATOR,
    payload: operator
});





export const getHlrLookup = (payload) => ({
    type: actionTypes.GET_HLR_LOOKUP,
    payload: payload
})

export const setSelectedRecharge = (payload) => ({
    type: actionTypes.SET_SELECTED_RECHARGE,
    payload: payload
})

export const setRechargeRupees = payload => ({
    type: actionTypes.SET_RECHARGE_RUPEE,
    payload
})

export const getRechargeData = payload => ({
    type: actionTypes.GET_RECHARGE_DATA,
    payload
})

export const getBalanceCheck = payload => ({
    type: actionTypes.CHECK_BALANCE_PAY_NEW,
    payload
})

export const getDTHHeavyRefresh = payload => ({
    type: actionTypes.GET_DTH_HEAVY_REFRESH,
    payload
})

export const getDTHInfoMobile = payload => ({
    type: actionTypes.GET_DTH_INFO_MOBILE,
    payload
})

export const getDTHInfo = payload => ({
    type: actionTypes.GET_DTH_INFO,
    payload
})

export const getFetchBillInfo = payload => ({
    type: actionTypes.GET_FETCH_BILL_INFO,
    payload
})

export const onBillPayment = payload => ({
    type: actionTypes.ON_BILL_PAYMENT,
    payload
})

export const setOrderId = payload => ({
    type: actionTypes.SET_ORDER_ID,
    payload
})

export const getRechargeBanner = payload   => ({
    type: actionTypes.GET_RECHARGE_BANNER,
    payload
})

export const showPaymentResultModal = (payload) => ({
  type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
  payload
});

export const hidePaymentResultModal = () => ({
  type: actionTypes.HIDE_PAYMENT_RESULT_MODAL
});
