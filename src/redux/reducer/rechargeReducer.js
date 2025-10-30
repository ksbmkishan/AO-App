import * as actionTypes from '../actionTypes'

const initialState = {
    deviceContacts: null,
    masterDeviceContacts: null,
    mobilePlansData: null,
    masterMobilePlans: null,
    rechargeData: [],
    rechargeRequestFields: null,
    rechargeBillDetailsData: null,
    rechargeRazorpay: null,
    dthOperatorData: null,
    electricityOperators: null,
    gasOperators: null,
    fastagOperators: null,
    dthCircleData: null,
    gasOperatorData: null,
    gasbillDetails: null,
    postpaidOPerator: null,
    electricCityOperators: null,
    metroOperators: null,
    selectedOperator: null,
    rechargeBanner: [],
     paymentResultModal: {
        visible: false,
        type: null,         
        title: '',
        message: '',
        orderId: null,
        amount: null,
        details: null,      
        primaryAction: null, 
        secondaryAction: null 
    }
}

const rechargeReducer = (state = initialState, actions) => {
    const { payload, type } = actions

    switch (type) {

        case actionTypes.SET_DEVICE_CONTACTS: {
            return {
                ...state,
                deviceContacts: payload
            }
        }
        case actionTypes.SET_MASTER_DEVICE_CONTACTS: {
            return {
                ...state,
                masterDeviceContacts: payload
            }
        }
        case actionTypes.SET_MOBILE_PLANS: {
            return {
                ...state,
                mobilePlansData: payload
            }
        }
        case actionTypes.SET_MASTER_MOBILE_PLANS: {
            return {
                ...state,
                masterMobilePlans: payload
            }
        }
        case actionTypes.SET_RECHARGE: {
            return {
                ...state,
                rechargeData: payload
            }
        }
        case actionTypes.SET_RECHARGE_REQUEST_FIELDS: {
            return {
                ...state,
                rechargeRequestFields: payload
            }
        }
        case actionTypes.SET_RECHARGE_BILL_DETAILS: {
            return {
                ...state,
                rechargeBillDetailsData: payload
            }
        }
        case actionTypes.SET_RAZORPAY: {
            return {
                ...state,
                rechargeRazorpay: payload
            }
        }
        case actionTypes.SET_DTH_OPERATOR: {
            return {
                ...state,
                dthOperatorData: payload
            }
        }
        case actionTypes.SET_ELECTRICITY_OPERATOR: {
            return {
                ...state,
                electricityOperators: payload
            }
        }
        case actionTypes.SET_GAS_OPERATOR: {
            return {
                ...state,
                gasOperators: payload
            }
        }
        case actionTypes.SET_FASTTAG_OPERATOR: {
            return {
                ...state,
                fastagOperators: payload
            }
        }
        case actionTypes.SET_OPERATOR: {
            return {
                ...state,
                gasOperatorData: payload
            }
        }
        case actionTypes.SET_BILL_DETAILS: {
            return {
                ...state,
                gasbillDetails: payload
            }
        }
        case actionTypes.SET_POSTPAID_OPERATOR: {
            return {
                ...state,
                postpaidOPerator: payload
            }
        }

        case actionTypes.SET_METRO_OPERATORS: {
            return {
                ...state,
                metroOperators: payload
            }


        }

        case actionTypes.SET_SERVICES_LIST:
            return {
                ...state,
                servicesList: payload,

            };
        case actionTypes.SERVICES_LIST_LOADING:
            return {
                ...state,
                loading: payload
            };
        case actionTypes.SERVICES_LIST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        case actionTypes.SET_ALL_SERVICE_PROVIDERS: {
            return {
                ...state,
                allServiceProviders: payload
            }
        }

        case actionTypes.SET_SELECTED_OPERATOR:
            return {
                ...state,
                selectedOperator: payload
            };



        //rechrihlhik

        case actionTypes.SET_DEVICE_CONTACTS: {
            return {
                ...state,
                deviceContacts: payload
            }
        }
        case actionTypes.SET_MASTER_DEVICE_CONTACTS: {
            return {
                ...state,
                masterDeviceContacts: payload
            }
        }
        case actionTypes.SET_MOBILE_PLANS: {
            return {
                ...state,
                mobilePlansData: payload
            }
        }
        case actionTypes.SET_MASTER_MOBILE_PLANS: {
            return {
                ...state,
                masterMobilePlans: payload
            }
        }
        case actionTypes.SET_RECHARGE: {
            return {
                ...state,
                rechargeData: payload
            }
        }
        case actionTypes.SET_RECHARGE_REQUEST_FIELDS: {
            return {
                ...state,
                rechargeRequestFields: payload
            }
        }
        case actionTypes.SET_RECHARGE_BILL_DETAILS: {
            return {
                ...state,
                rechargeBillDetailsData: payload
            }
        }
        case actionTypes.SET_RAZORPAY: {
            return {
                ...state,
                rechargeRazorpay: payload
            }
        }
        case actionTypes.SET_DTH_OPERATOR: {
            return {
                ...state,
                dthOperatorData: payload
            }
        }
        case actionTypes.SET_ELECTRICITY_OPERATOR: {
            return {
                ...state,
                electricityOperators: payload
            }
        }
        case actionTypes.SET_GAS_OPERATOR: {
            return {
                ...state,
                gasOperators: payload
            }
        }
        case actionTypes.SET_FASTTAG_OPERATOR: {
            return {
                ...state,
                fastagOperators: payload
            }
        }
        case actionTypes.SET_OPERATOR: {
            return {
                ...state,
                gasOperatorData: payload
            }
        }
        case actionTypes.SET_BILL_DETAILS: {
            return {
                ...state,
                gasbillDetails: payload
            }
        }
        case actionTypes.SET_POSTPAID_OPERATOR: {
            return {
                ...state,
                postpaidOPerator: payload
            }
        }

        case actionTypes.SET_METRO_OPERATORS: {
            return {
                ...state,
                metroOperators: payload
            }
        }
        case actionTypes.SET_CHECK_OFFER: {
            return {
                ...state,
                checkOfferData: payload
            }
        }
        case actionTypes.SET_CIRCLE_LIST: {
            return {
                ...state,
                circleList: payload
            }
        }
        case actionTypes.SET_SELECTED_OPERATOR:
            return {
                ...state,
                selectedOperator: payload
            };
        case actionTypes.SET_ALL_SERVICE_PROVIDERS: {
            return {
                ...state,
                allServiceProviders: payload
            }
        }
        case actionTypes.SET_HLR_LOOKUP: {
            return {
                ...state,
                hlrLookup: payload
            }
        }

        case actionTypes.SET_SELECTED_RECHARGE: {
            return {
                ...state,
                selectedRecharge: payload
            }
        }
        case actionTypes.SET_RECHARGE_RUPEE: {
            return {
                ...state,
                rechargeRupees: payload
            }
        }
        case actionTypes.SET_DTH_INFO_MOBILE: {
            return {
                ...state,
                dthInfoMobile: payload
            }
        }
        case actionTypes.SET_FETCH_BILL_INFO: {
            return {
                ...state,
                billInfo: payload
            }
        }
        case actionTypes.SET_DTH_INFO: {
            return {
                ...state,
                billCustomerInfo: payload
            }
        }
        case actionTypes.SET_ORDER_ID: {
            return {
                ...state,
                orderId: payload,
            }
        }
        case actionTypes.SET_DTH_HEAVY_REFRESH: {
            return {
                ...state,
                heavyRefresh: payload
            }
        }

        case actionTypes.SET_RECHARGE_BANNER:
            return {
                ...state,
                rechargeBanner: payload
            }

             case actionTypes.SHOW_PAYMENT_RESULT_MODAL:
            return {
                ...state,
                paymentResultModal: {
                    visible: true,
                    ...payload
                }
            };

        case actionTypes.HIDE_PAYMENT_RESULT_MODAL:
            return {
                ...state,
                paymentResultModal: {
                    visible: false,
                    type: null,
                    title: '',
                    message: '',
                    orderId: null,
                    amount: null,
                    details: null,
                    primaryAction: null,
                    secondaryAction: null
                }
            };

        default: {
            return state
        }
    }
}
export default rechargeReducer;
