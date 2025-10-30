import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { getRequest, postRequest } from '../../utils/apiRequests';
import { api_url, get_customer_all_recharge_plan, get_customer_detail, get_customer_following, getDivyaHistory, phonepeWallet, recharge_customer_wallet, shivalya_deduct, vardan_shivalya_deduct } from '../../config/constants';
import { resetToScreen,navigate } from '../../navigations/NavigationServices';
import { razorpayPayment } from '../../utils/razorpay';
import { showToastMessage } from '../../utils/services';
import axios from 'axios';
import { PhonepeWallet } from '../../utils/phonePe';

function* getCustomerData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + get_customer_detail,
            header: 'json',
            data: {
                customerId: customerData?._id,
                unique_id: 'sdfsfsd'
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.customersDetail })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* onWalletRecharge(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?.phoneNumber,'this customer data')
        console.log(' Amont ::: ', payload);
        const getamountdata = parseFloat(payload?.data?.amount);
        const gstadd = parseFloat(getamountdata * 0.18)
        const totalpay = parseFloat(getamountdata + gstadd)
        console.log(totalpay, '  price')
     
        const razorpayResponse = yield razorpayPayment({ amount: totalpay, email: customerData?.email, name: customerData?.customerName , contact: customerData?.phoneNumber })
        
        console.log(razorpayResponse, "razorpayResponse")
        if (razorpayResponse) {

            
            const response = yield postRequest({
                url: api_url + recharge_customer_wallet,
                header: 'json',
                data: payload?.data
            })

            if (response?.success) {
                yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.updatedCustomer })
                yield call(resetToScreen, 'home')
            }


        }else{
            showToastMessage({message: 'Payment Failed'})
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('fourth')
        console.log(e)
    }
}

function* getFollowingList(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + get_customer_following,
            header: 'json',
            data: {
                customerId: customerData?._id,
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_FOLLOWING_LIST, payload: response?.following })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getWalletRechargeOfferList(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_customer_all_recharge_plan,
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_WALLET_RECHARGE_OFFER_LIST, payload: response?.allRechargePlan })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* onVardanShivalyaDeduct(actions) {
    try {
       const { payload } = actions

       const customer = yield select(state => state.customer.customerData);

        const response = yield postRequest({
            url: api_url + vardan_shivalya_deduct,
            data: {
                customerId: customer?._id,
                amount: 1,
            }
        });

        if(response?.success) {
            if(response?.show) {
                yield call(() => payload?.handleAnimated());
            }
            
            yield put({ type: actionTypes.GET_CUSTOMER_DATA});
        } else {
            yield put({ type: actionTypes.GET_CUSTOMER_DATA});
            // showToastMessage({ message: response?.message });
        }
    } catch(e) {
        console.log(e);
    }
}

function* onShivalyaDeduct(actions) {
    try {
        const { payload } = actions;
        const customer = yield select(state => state.customer.customerData);

        const response = yield postRequest({
            url: api_url + shivalya_deduct,
            data: {
                customerId: customer?._id,
                amount: 1,
            }
        });

        console.log('response ::: ',response);

        if(response?.success) {
            if(response?.show) {
                yield call(() => payload?.onAnimated());
            }
            yield call(() => payload?.onClick());
            yield put({ type: actionTypes.GET_CUSTOMER_DATA});
        } else {
            yield put({ type: actionTypes.GET_CUSTOMER_DATA});
            showToastMessage({ message: response?.message });
        }
    } catch(e) {
        console.log(e);
    }
}

function* onCustomerReferralCode(actions) {
    try {
        const { payload } = actions;

        const response = yield postRequest({
            url: api_url + 'customers/referral_code',
            data: payload,
        });

        if(response?.success) {
            showToastMessage({ message: response?.message });
        } else {
            showToastMessage({ message: response?.message });
        }
    } catch(e) {
        console.log(e);
    }
}

function* onVardanDayReset() {
    try {
        const customer = yield select(state => state.customer.customerData);
        console.log('vhghghgm')
        const respons = yield postRequest({
            url: api_url + 'customers/vardanDayReset',
            data: {
                customerId: customer?._id,
            }
        })

        console.log('response :: ',respons)

        if(respons?.success) {
            showToastMessage({ message: respons?.message});
            yield put({ type: actionTypes.GET_CUSTOMER_DATA});
        }
    } catch(e) {
        console.log(e);
    }
}

function* onShivalyaDayReset() {
    try {
        const customer = yield select(state => state.customer.customerData);

        const respons = yield postRequest({
            url: api_url + 'customers/shivalyaDayReset',
            data: {
                customerId: customer?._id,
            }
        })

        if(respons?.success) {
            showToastMessage({ message: respons?.message});
            yield put({ type: actionTypes.GET_CUSTOMER_DATA});
        }
    } catch(e) {
        console.log(e);
    }
}

function* getHistory() {
    try {
        const customer = yield select(state => state.customer.customerData);

        const response = yield postRequest({
            url: api_url + getDivyaHistory,
            data: {
                customerId: customer?._id,
            }
        })

        console.log('response ::',response)

        if(response?.success) {
           
            yield put({ type: actionTypes.SET_DIVYA_HISTORY, payload:response?.data});
        } else {
            yield put({ type: actionTypes.SET_DIVYA_HISTORY, payload:[]});
        }
    } catch(e) {
        console.log(e);
    }
}

export default function* customerSaga() {
    yield takeLeading(actionTypes.ON_WALLET_RECHARGE, onWalletRecharge);
    yield takeLeading(actionTypes.GET_CUSTOMER_DATA, getCustomerData);
    yield takeLeading(actionTypes.GET_FOLLOWING_LIST, getFollowingList);
    yield takeLeading(actionTypes.GET_WALLET_RECHARGE_OFFER_LIST, getWalletRechargeOfferList);
    yield takeLeading(actionTypes.ON_VARDAN_SHIVALYA_DEDUCT,onVardanShivalyaDeduct);
    yield takeLeading(actionTypes.ON_SHIVALYA_DEDUCT,onShivalyaDeduct );
    yield takeLeading(actionTypes.ON_CUSTOMER_REFERRAL_CODE, onCustomerReferralCode);
    yield takeLeading(actionTypes.ON_VARDAN_DAY_RESET, onVardanDayReset);
    yield takeLeading(actionTypes.ON_SHIVALYA_DAY_RESET, onShivalyaDayReset);
    yield takeLeading(actionTypes.GET_DIVYA_HISTORY, getHistory);
}