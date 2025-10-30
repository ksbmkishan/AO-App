
import * as actionTypes from '../actionTypes';
import { call, put, select, takeLatest, takeLeading, } from 'redux-saga/effects';
import { showToastMessage } from '../../utils/services';
import { api_url, api_url_recharge, app_api_url, cyrus_recharge, get_dth_data, get_dth_operators, get_electric_city_operator, get_fastag_operator, get_gas_operator, get_metro_operators, get_mobile_plans, get_operator_bill_info, get_operators_fields, recharge_fastag_recharge } from '../../config/constants';
import { getRequest, postRequest } from '../../utils/apiRequests';
import { razorpayPayment, razorpayPaymentTest, razorpayPaymentWebsite, razorpayRefund } from '../../utils/RazorpayService';
import uuid from 'react-native-uuid';
import { navigate, resetToScreen } from '../../navigations/NavigationServices';
import Contacts from 'react-native-contacts';

function* getDeviceContacts() {
    try {
        const response = yield Contacts.getAll()
        // console.log(response)
        if (response) {
            const contacts = [];
            response.forEach(item => {
                const number = item.phoneNumbers[0]?.number
                if (number) {
                    contacts.push({
                        phoneNumber: item.phoneNumbers[0]?.number,
                        name: item?.displayName,
                        image: item?.thumbnailPath
                    });

                    const data = item.phoneNumbers.filter(ele => ele.number != number)

                    data.forEach(ele => {
                        contacts.push({
                            phoneNumber: ele.number,
                            name: item?.displayName,
                            image: item?.thumbnailPath
                        });
                    });
                }

            });

            contacts.sort((a, b) => {
                const nameA = a.name?.toUpperCase() || ''; // ignore upper and lowercase
                const nameB = b.name?.toUpperCase() || ''; // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            yield put({ type: actionTypes.SET_DEVICE_CONTACTS, payload: contacts.reverse() })
            yield put({ type: actionTypes.SET_MASTER_DEVICE_CONTACTS, payload: contacts.reverse() })
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchServicesList(actions) {
    try {
        const { payload } = actions;
        console.log("payloadpayload", payload)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield getRequest({
            url: `https://rechargeapi.astrosetalk.com/api/recharge/get_services_list`,
        });

        console.log('CheckResponse:::KKK', response)

        if (response.status === 1) {
            yield put({
                type: actionTypes.SET_SERVICES_LIST,
                payload: response?.data,
            });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e, "error");
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getpostpaidoperator(actions) {
    const { payload } = actions;

    console.log('CheckPayload:::KKK', payload)
    try {


        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });



        const response = yield postRequest({
            url: api_url_recharge + 'recharge/get_product_list',
            data: { service_id: payload.serviceId },
        })
        console.log("CheckIssue::KKK", response)
        if (response?.status == 1) {
            yield put({ type: actionTypes.SET_ALL_SERVICE_PROVIDERS, payload: response?.data });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });


        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* checkOfferSaga(action) {
    const { payload } = action;
    console.log('CheckOfferPayload:::KK', payload)

    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url_recharge + 'recharge/get_recharge_offer',
            data: {
                number: payload.data.number,
                product_code: payload.data.product_code
            },
        });

        console.log('CheckResponseOffer:::KKK', response)

        if (response?.status == 1) {
            yield call(() => payload?.onComplete());
            yield put({ type: actionTypes.SET_CHECK_OFFER, payload: response?.data });
        } else {
            showToastMessage({ message: response?.message });
        }


        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error in checkOfferSaga');
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


// function* getHlrLookup(actions) {
//     try {
//         const { payload } = actions
//         console.log('payload :::', payload);
//         const response = yield postRequest({
//             url: api_url_recharge + `recharge/hlr_lookup`,
//             data: payload?.data
//         })
//         console.log('resonse ::::::', response);
//         if (response.status == 1) {
//             yield put({ type: actionTypes.SET_HLR_LOOKUP, payload: response?.data });
//             const responseMobile = yield postRequest({
//                 url: api_url_recharge + 'recharge/getBrowsePlan',
//                 data: {
//                     circle_code: response.data.circle_code,
//                     product_code: response.data.product_code
//                 },
//             })
//             console.log(">>>>>>>>>>>>>>>>>>>>>>>>", responseMobile)
//             if (responseMobile?.status) {
//                 yield put({ type: actionTypes.SET_MOBILE_PLANS, payload: responseMobile?.data });
//                 yield call(() => payload?.onComplete());

//             }



//         } else if (response.status == 2) {
//             showToastMessage({ message: response?.message });
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }



function* getHlrLookup(actions) {
    try {
        const { payload } = actions
        console.log('payload :::', payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: api_url_recharge + `recharge/hlr_lookup`,
            data: payload?.data
        })
        console.log('resonse ::::::', response);
        if (response.status == 1) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            yield put({ type: actionTypes.SET_HLR_LOOKUP, payload: response?.data });

            // Call onComplete with the full response
            if (payload?.onComplete) {
                yield call(payload.onComplete, response); // Pass response here
            }

            const responseMobile = yield postRequest({
                url: api_url_recharge + 'recharge/getBrowsePlan',
                data: {
                    circle_code: response.data.circle_code,
                    product_code: response.data.product_code
                },
            })
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>", responseMobile)
            if (responseMobile?.status) {
                yield put({ type: actionTypes.SET_MOBILE_PLANS, payload: responseMobile?.data });
            }
        } else if (response.status == 2) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            showToastMessage({ message: response?.message });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

export const GetSafeMessageText = (message) => {
    if (typeof message !== "string") return "Unknown error";

    try {
        const parsed = JSON.parse(message);
        return parsed?.text || message;
    } catch {
        return message;
    }
};

// function* getFetchBillInfo(actions) {
//     try {
//         const { payload } = actions
//         console.log('Bill Info Payload ', payload)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
//         const customerData = yield select(state => state.customer.customerData);



//         console.log('Payload Fetch Bill ', payload)
//         // For GET request
//         const response = yield postRequest({
//             url: api_url_recharge + 'recharge/billFetch',
//             data: {
//                 ...payload?.data,
//                 customer_number: customerData?.phoneNumber,
//                 pincode: "201303",
//             }
//         });

//         console.log('billFetch  Response:', response);

//         if (response?.status == 1) {
//             yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//             yield put({ type: actionTypes.SET_FETCH_BILL_INFO, payload: response });
//             yield call(() => payload?.onComplete())
//         } else {
//             yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//             let errorMessage = '';

//             try {
//                 const msg = response?.message;

//                 // Try to parse if it's a JSON string
//                 const parsed = typeof msg === 'string' && msg.startsWith('{') ? JSON.parse(msg) : msg;

//                 errorMessage = typeof parsed === 'object' ? parsed?.text : parsed || 'Something went wrong';
//             } catch (err) {
//                 errorMessage = 'Something went wrong';
//             }
//             showToastMessage({ message: errorMessage })


//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

//     } catch (e) {
//         console.log('Error in getCircleListSaga:', e.message);
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//     }
// }


function* getFetchBillInfo(actions) {
    try {
        const { payload } = actions;
        console.log('Bill Info Payload ', payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const customerData = yield select(state => state.customer.customerData);

        console.log('Payload Fetch Bill ', payload);
        const response = yield postRequest({
            url: api_url_recharge + 'recharge/billFetch',
            data: {
                ...payload?.data,
                customer_number: customerData?.phoneNumber,
                pincode: "201303",
            }
        });

        console.log('billFetch Response:', response);

        if (response?.status == 1) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            yield put({ type: actionTypes.SET_FETCH_BILL_INFO, payload: response });
            yield call(() => payload?.onComplete());
        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            let errorMessage = '';

            try {
                const msg = response?.message;
                // Try to parse if it's a JSON string
                const parsed = typeof msg === 'string' && msg.startsWith('{') ? JSON.parse(msg) : msg;
                errorMessage = typeof parsed === 'object' ? parsed?.text : parsed || 'Something went wrong';
            } catch (err) {
                errorMessage = 'Something went wrong';
            }

            console.log('testeeeee');

            // Show modal with error message
            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'error',
                    title: 'Error',
                    message: errorMessage,
                    actions: [{
                        text: 'OK',
                        onPress: () => resetToScreen('home')
                    }],
                    details: {
                        'Service': 'Bill Fetch',
                        'Date': new Date().toLocaleString()
                    }
                }
            });
        }

    } catch (e) {
        console.log('Error in getFetchBillInfo:', e.message);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        // Show error modal for exceptions
        yield put({
            type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
            payload: {
                visible: true,
                type: 'error',
                title: 'Error',
                message: 'Failed to fetch bill information',
                actions: [{
                    text: 'OK',
                    onPress: () => resetToScreen('home')
                }],
                details: {
                    'Error': e.message || 'Unknown error',
                    'Service': 'Bill Fetch',
                    'Date': new Date().toLocaleString()
                }
            }
        });
    }
}


function* getDthOperator(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield postRequest({
            url: api_url_recharge + `recharge/get_product_list`,
            data: {
                service_id: 3
            }
        })


        if (response?.status) {
            yield put({ type: actionTypes.SET_DTH_OPERATOR, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log(e, 'error')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

//new bharatdarshan 

function* getDTHInfo(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        console.log('payload?.data?.number.length', payload?.data?.number.length)
        if (payload?.data?.number.length == 10) { // mobile
            const responseget = yield postRequest({
                url: api_url_recharge + 'recharge/dthInfoByMobileNumber',
                data: payload?.data
            });

            if (responseget.status == 1) {
                // For GET request
                const response = yield postRequest({
                    url: api_url_recharge + 'recharge/getDThInfo',
                    data: {
                        number: responseget?.data?.customer_id,
                        product_code: payload?.data?.product_code
                    }
                });

                console.log('getDThInfo  Response:', response);

                if (response?.status == 1) {

                    yield put({ type: actionTypes.SET_DTH_INFO, payload: response });
                    yield call(() => payload?.onComplete())
                    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
                } else {
                    showToastMessage({ message: response?.message })
                    console.log("response?.message", response?.message);
                    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
                }
            }

        } else { //  id  11 g
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            const response = yield postRequest({
                url: api_url_recharge + 'recharge/getDThInfo',
                data: {
                    number: payload?.data?.number,
                    product_code: payload?.data?.product_code
                }
            });

            console.log('getDThInfo  Response:', response);

            if (response?.status == 1) {

                yield put({ type: actionTypes.SET_DTH_INFO, payload: response });
                yield call(() => payload?.onComplete())
            } else {
                showToastMessage({ message: response?.message })
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.log('Error in getCircleListSaga:', e.message);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });


    }
}

function* getRechargeBanner() {
    try {
        const response = yield getRequest({
            url: 'https://api.astroone.in/api/admin/get-app-banners'
        });

        yield put({ type: actionTypes.SET_RECHARGE_BANNER, payload: response?.banners });
    } catch (e) {
        console.log(e);
    }
}

// function* getRechargeData(actions) {
//     try {
//         const { payload } = actions;
//         console.log("payload", payload)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

//         const customerData = yield select(state => state.customer.customerData);
//         const walletBalance = parseFloat(customerData?.wallet_balance || 0);
//         const rechargeAmount = parseFloat(payload?.amount || 0);

//         const balanceCheck = yield getRequest({
//             url: api_url_recharge + 'recharge/getBalance',
//         });

//         console.log("balanceCheck", balanceCheck)

//         if (balanceCheck?.balance < payload?.amount) {
//             showToastMessage({ message: 'Your balance is low, Check Lock Balance or Surcharge by Admin Pay2New.' });
//             yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//             return false;
//         }

//         let razorpayResponse = null;
//         let walletUsed = 0;

//         if (walletBalance >= rechargeAmount) {
//             // Full wallet
//             yield call(postRequest, {
//                 url: api_url + 'customers/deduct_wallet_balance',
//                 data: { customerId: customerData?._id, amount: String(rechargeAmount) }
//             });
//             walletUsed = rechargeAmount;

//         } else if (walletBalance === 0) {
//             // Full Razorpay
//             yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//             razorpayResponse = yield call(razorpayPayment, {
//                 amount: rechargeAmount,
//                 email: customerData?.email,
//                 contact: customerData?.phoneNumber,
//                 name: customerData?.customerName,
//                 dispatch: payload?.dispatch,
//             });

//             yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

//             if (!razorpayResponse?.razorpay_order_id) {
//                 yield call(postRequest, {
//                     url: api_url + 'recharge/failed-recharge',
//                     data: {
//                         userId: customerData?._id,
//                         number: payload?.number,
//                         mobile: customerData?.phoneNumber,
//                         operatorId: payload?.product_code,
//                         amount: rechargeAmount,
//                         razorpayOrderId: null,
//                         billType: payload?.billType,
//                         productName: payload?.productName,
//                         status: 'CANCEL'
//                     },
//                 });
//                 yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//                 showToastMessage({ message: 'Payment cancelled.' });
//                 resetToScreen('home');
//                 return;
//             }

//         } else {
//             // Partial wallet + Razorpay
//             const remaining = (rechargeAmount - walletBalance).toFixed(2);
//             console.log('customer ', customerData?._id, walletBalance, rechargeAmount);

//             walletUsed = walletBalance;

//             yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

//             razorpayResponse = yield call(razorpayPayment, {
//                 amount: remaining,
//                 email: customerData?.email,
//                 contact: customerData?.phoneNumber,
//                 name: customerData?.customerName,
//                 dispatch: payload?.dispatch,
//             });
//             yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
//             if (!razorpayResponse?.razorpay_order_id) {


//                 yield call(postRequest, {
//                     url: api_url + 'recharge/failed-recharge',
//                     data: {
//                         userId: customerData?._id,
//                         number: payload?.number,
//                         mobile: customerData?.phoneNumber,
//                         operatorId: payload?.product_code,
//                         amount: rechargeAmount,
//                         razorpayOrderId: null,
//                         billType: payload?.billType,
//                         productName: payload?.productName,
//                         status: 'CANCEL'
//                     },
//                 });
//                 yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//                 showToastMessage({ message: 'Payment cancelled.' });
//                 resetToScreen('home');
//                 return;
//             }
//         }
//         console.log("responsesingh", razorpayResponse);




//         const response = yield call(postRequest, {
//             url: api_url_recharge + 'recharge/rechargeData',
//             data: {
//                 number: payload?.number,
//                 amount: rechargeAmount,
//                 product_code: payload?.product_code,
//                 customer_number: customerData?.phoneNumber,
//                 pincode: '201303',
//                 latitude: payload?.latitude,
//                 longitude: payload?.longitude,
//             },
//         });

//         if (response?.status === 1) {

//             yield call(postRequest, {
//                 url: api_url + 'customers/deduct_wallet_balance',
//                 data: { customerId: customerData?._id, amount: String(walletBalance) }
//             });


//             yield call(postRequest, {
//                 url: api_url + 'recharge/success-recharge',
//                 data: {
//                     userId: customerData?._id,
//                     number: response?.number,
//                     mobile: customerData?.phoneNumber,
//                     operator_reference: response?.operator_reference,
//                     operatorId: payload?.product_code,
//                     amount: response?.amount,
//                     razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
//                     rechargeOrderId: response?.order_id,
//                     request_id: response?.request_id,
//                     message: response?.message,
//                     billType: payload?.billType,
//                     productName: payload?.productName,
//                 },
//             });

//             showToastMessage({ message: response?.message });
//             console.log("success messages", response?.message)
//             yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//             resetToScreen('home');
//         } else {
//             if (razorpayResponse?.razorpay_payment_id) {
//                 const refundResponse = yield call(razorpayRefund, {
//                     amount: rechargeAmount - walletUsed,
//                     paymentId: razorpayResponse?.razorpay_payment_id,
//                 });

//                 if (refundResponse?.data?.entity === 'refund') {
//                     yield call(postRequest, {
//                         url: api_url + 'recharge/refund-success-recharge',
//                         data: {
//                             userId: customerData?._id,
//                             number: payload?.number,
//                             mobile: customerData?.phoneNumber,
//                             operatorId: payload?.product_code,
//                             amount: rechargeAmount,
//                             razorpayOrderId: razorpayResponse?.razorpay_order_id,
//                             billType: payload?.billType,
//                             productName: payload?.productName,
//                         },
//                     });
//                 }
//             } else {
//                 yield call(postRequest, {
//                     url: api_url + 'recharge/failed-recharge',
//                     data: {
//                         userId: customerData?._id,
//                         number: payload?.number,
//                         mobile: customerData?.phoneNumber,
//                         operatorId: payload?.product_code,
//                         amount: rechargeAmount,
//                         razorpayOrderId: null,
//                         billType: payload?.billType,
//                         productName: payload?.productName,
//                         status: 'FAILURE'
//                     },
//                 });
//             }

//             showToastMessage({ message: 'Recharge failed. Refund processed if applicable.' });
//             yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//             resetToScreen('home');
//         }

//     } catch (e) {
//         console.log('Saga Error:', e);
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//         showToastMessage({ message: 'Something went wrong.' });
//     }
// }




function* getRechargeData(actions) {
    try {
        const { payload } = actions;
        console.log("payload", payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const customerData = yield select(state => state.customer.customerData);
        const walletBalance = parseFloat(customerData?.wallet_balance || 0);
        const rechargeAmount = parseFloat(payload?.amount || 0);

        console.log('CheckRechargeAmout::KKK', rechargeAmount)

        const balanceCheck = yield getRequest({
            url: api_url_recharge + 'recharge/getBalance',
        });

        console.log("balanceCheck:::KKKK", balanceCheck);

        const checkLimit = yield postRequest({
            url: `https://rechargeapi.astrosetalk.com/api/recharge/check-recharge-limit`,
            data: {
                appName: "astroone"
            }
        });

        if (checkLimit?.remaining < rechargeAmount) {
            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'error',
                    title: 'Limit',
                    message: 'Something went wrong!',
                    actions: [{
                        text: 'OK',
                        onPress: () => resetToScreen('home')
                    }]
                }
            });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            return false;

        }

        if (balanceCheck?.balance < payload?.amount) {
            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'error',
                    title: 'Insufficient Balance',
                    message: 'Your balance is low, Check Lock Balance or Surcharge by Admin Pay2New.',
                    actions: [{
                        text: 'OK',
                        onPress: () => resetToScreen('home')
                    }]
                }
            });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            return false;
        }

        let razorpayResponse = null;
        let walletUsed = 0;
        let paymentMethod = '';

        if (walletBalance >= rechargeAmount) {
            // Full wallet
            const deductResponse = yield call(postRequest, {
                url: api_url + 'customers/deduct_wallet_balance',
                data: { customerId: customerData?._id, amount: String(rechargeAmount) }
            });

            console.log(deductResponse, 'checkDeductResponse:::KKK')

            if (!deductResponse?.success) {
                throw new Error('Wallet deduction failed....');
            }

            walletUsed = rechargeAmount;
            paymentMethod = 'Wallet';
        } else if (walletBalance === 0) {
            // Full Razorpay
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            razorpayResponse = yield call(razorpayPayment, {
                amount: rechargeAmount,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                dispatch: payload?.dispatch,
            });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

            if (!razorpayResponse?.razorpay_order_id) {
                yield call(postRequest, {
                    url: api_url + 'recharge/failed-recharge',
                    data: {
                        userId: customerData?._id,
                        number: payload?.number,
                        mobile: customerData?.phoneNumber,
                        operatorId: payload?.product_code,
                        amount: rechargeAmount,
                        razorpayOrderId: null,
                        billType: payload?.billType,
                        productName: payload?.productName,
                        status: 'CANCEL'
                    },
                });

                yield put({
                    type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                    payload: {
                        visible: true,
                        type: 'error',
                        title: 'Payment Cancelled',
                        message: 'Payment process was cancelled by user',
                        actions: [{
                            text: 'OK',
                            onPress: () => resetToScreen('home')
                        }]
                    }
                });

                yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
                return;
            }

            paymentMethod = 'UPI/Card/NetBanking';
        } else {
            // Partial wallet + Razorpay
            const remaining = (rechargeAmount - walletBalance).toFixed(2);
            walletUsed = walletBalance;

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            razorpayResponse = yield call(razorpayPayment, {
                amount: remaining,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                dispatch: payload?.dispatch,
            });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

            if (!razorpayResponse?.razorpay_order_id) {
                yield call(postRequest, {
                    url: api_url + 'recharge/failed-recharge',
                    data: {
                        userId: customerData?._id,
                        number: payload?.number,
                        mobile: customerData?.phoneNumber,
                        operatorId: payload?.product_code,
                        amount: rechargeAmount,
                        razorpayOrderId: null,
                        billType: payload?.billType,
                        productName: payload?.productName,
                        status: 'CANCEL'
                    },
                });

                yield put({
                    type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                    payload: {
                        visible: true,
                        type: 'error',
                        title: 'Payment Cancelled',
                        message: 'Payment process was cancelled by user',
                        actions: [{
                            text: 'OK',
                            onPress: () => resetToScreen('home')
                        }]
                    }
                });

                yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
                return;
            }

            paymentMethod = `Wallet (₹${walletBalance}) + UPI/Card (₹${remaining})`;
        }
        const data = {
            number: payload?.number,
            amount: rechargeAmount,
            product_code: payload?.product_code,
            customer_number: customerData?.phoneNumber,
            pincode: '201303',
            latitude: payload?.latitude,
            longitude: payload?.longitude,
            appName: 'astroone',
            serviceType: payload?.serviceType,
        };

        console.log('data ', data);
        const response = yield call(postRequest, {
            url: api_url_recharge + 'recharge/rechargeData',
            data: {
                number: payload?.number,
                amount: rechargeAmount,
                product_code: payload?.product_code,
                customer_number: customerData?.phoneNumber,
                pincode: '201303',
                latitude: payload?.latitude,
                longitude: payload?.longitude,
                appName: 'astroone',
                serviceType: payload?.serviceType,
            },
        });

        console.log("response data", response);

        if (response?.status === 1) {
            yield call(postRequest, {
                url: api_url + 'customers/deduct_wallet_balance',
                data: { customerId: customerData?._id, amount: String(walletBalance) }
            });

            yield call(postRequest, {
                url: api_url + 'recharge/success-recharge',
                data: {
                    userId: customerData?._id,
                    number: response?.number,
                    mobile: customerData?.phoneNumber,
                    operator_reference: response?.operator_reference,
                    operatorId: payload?.product_code,
                    amount: response?.amount,
                    razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                    rechargeOrderId: response?.order_id,
                    request_id: response?.request_id,
                    message: response?.message,
                    billType: payload?.billType,
                    productName: payload?.productName,
                },
            });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'success',
                    title: 'Recharge Successful!',
                    message: response?.message || 'Your recharge was processed successfully',
                    orderId: response?.order_id,
                    amount: rechargeAmount,
                    details: {
                        'Transaction ID': response?.operator_reference || 'N/A',
                        'Payment Method': paymentMethod,
                        'Date': new Date().toLocaleString(),
                        'Mobile Number': payload?.number,
                        'Operator': payload?.productName,
                    },
                    actions: [
                        {
                            text: 'View Receipt',
                            onPress: () => {
                                // Navigate to receipt screen if needed
                            }
                        },
                        {
                            text: 'Done',
                            onPress: () => resetToScreen('home')
                        }
                    ]
                }
            });
        } else {
            if (razorpayResponse?.razorpay_payment_id) {
                console.log('Processing refund for failed recharge:', razorpayResponse);
                console.log('Wallet Used:', walletUsed);
                console.log('Recharge Amount:', rechargeAmount);
                const refundResponse = yield call(razorpayRefund, {
                    amount: rechargeAmount - walletUsed,
                    paymentId: razorpayResponse?.razorpay_payment_id,
                });

                console.log('Refund Response:', refundResponse);

                if (refundResponse?.data?.entity === 'refund') {
                    yield call(postRequest, {
                        url: api_url + 'recharge/refund-success-recharge',
                        data: {
                            userId: customerData?._id,
                            number: payload?.number,
                            mobile: customerData?.phoneNumber,
                            operatorId: payload?.product_code,
                            amount: rechargeAmount,
                            razorpayOrderId: razorpayResponse?.razorpay_order_id,
                            billType: payload?.billType,
                            productName: payload?.productName,
                        },
                    });
                }

                yield put({
                    type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                    payload: {
                        visible: true,
                        type: 'error',
                        title: 'Recharge Refund',
                        message: 'Recharge failed. Refund processed if applicable.',
                        actions: [
                            {
                                text: 'OK',
                                onPress: () => resetToScreen('home')
                            },
                            {
                                text: 'Try Again',
                                onPress: () => {
                                }
                            }
                        ]
                    }
                });
            } else {
                yield call(postRequest, {
                    url: api_url + 'recharge/failed-recharge',
                    data: {
                        userId: customerData?._id,
                        number: payload?.number,
                        mobile: customerData?.phoneNumber,
                        operatorId: payload?.product_code,
                        amount: rechargeAmount,
                        razorpayOrderId: null,
                        billType: payload?.billType,
                        productName: payload?.productName,
                        status: 'FAILURE'
                    },

                });
                console.log('checkPayloadFaildRechare:::KK', data)

                yield put({
                    type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                    payload: {
                        visible: true,
                        type: 'error',
                        title: 'Recharge Failed',
                        message: 'Recharge failed. Please try again later.',
                        actions: [
                            {
                                text: 'OK',
                                onPress: () => resetToScreen('home')
                            },
                            {
                                text: 'Try Again',
                                onPress: () => {
                                }
                            }
                        ]
                    }
                });
            }


        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log('Saga Error:', e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        yield put({
            type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
            payload: {
                visible: true,
                type: 'error',
                title: 'Error',
                message: 'Something went wrong during recharge process',
                actions: [{
                    text: 'OK',
                    onPress: () => resetToScreen('home')
                }]
            }
        });
    }
}


function* onBillPayment(actions) {
    const { payload } = actions;

    const customerData = yield select(state => state?.customer?.customerData);
    const payableAmount = parseFloat(payload?.amount || 0);
    let razorpayResponse = null;
    let walletUsed = 0;
    let paymentMethod = '';

    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const walletBalance = parseFloat(customerData?.wallet_balance || 0);

        const balanceCheck = yield call(postRequest, {
            url: api_url_recharge + 'recharge/getBalance',
        });

        if (balanceCheck?.balance < payableAmount) {
            throw new Error('Insufficient wallet balance on system. Please contact support.');
        }

        const checkLimit = yield postRequest({
            url: `https://rechargeapi.astrosetalk.com/api/recharge/check-recharge-limit`,
            data: {
                appName: "astroone"
            }
        });

        if (checkLimit?.remaining < payableAmount) {
            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'error',
                    title: 'Limit',
                    message: 'Something went wrong!',
                    actions: [{
                        text: 'OK',
                        onPress: () => resetToScreen('home')
                    }]
                }
            });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            return false;
        }

        // ✅ Full Wallet
        if (walletBalance >= payableAmount) {
            const deductResponse = yield call(postRequest, {
                url: api_url + 'customers/deduct_wallet_balance',
                data: {
                    customerId: customerData?._id,
                    amount: String(payableAmount),
                },
            });

            if (!deductResponse?.success) {
                throw new Error('Wallet deduction failed.');
            }

            walletUsed = payableAmount;
            paymentMethod = 'Wallet';
        }

        // ✅ Full Razorpay
        else if (walletBalance === 0) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

            razorpayResponse = yield call(razorpayPayment, {
                amount: payableAmount,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                dispatch: payload?.dispatch,
            });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

            if (!razorpayResponse?.razorpay_order_id) {
                throw new Error('Payment cancelled by user');
            }

            paymentMethod = 'UPI/Card/NetBanking';
        }

        // ✅ Partial Wallet + Razorpay
        else {
            const remaining = (payableAmount - walletBalance).toFixed(2);
            walletUsed = walletBalance;

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

            razorpayResponse = yield call(razorpayPayment, {
                amount: remaining,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                dispatch: payload?.dispatch,
            });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

            if (!razorpayResponse?.razorpay_order_id) {
                throw new Error('Payment cancelled by user');
            }

            paymentMethod = `Wallet (₹${walletBalance}) + UPI/Card (₹${remaining})`;
        }

        // ✅ Bill Payment API
        const response = yield call(postRequest, {
            url: api_url_recharge + 'recharge/billPayment',
            data: {
                number: payload?.number,
                amount: payableAmount,
                product_code: payload?.product_code,
                customer_number: customerData?.phoneNumber,
                latitude: payload?.latitude,
                longitude: payload?.longitude,
                bill_fetch_ref: payload?.bill_fetch_ref,
                appName: "astroone",
                serviceType: payload?.serviceType || ''
            },
        });

        if (response?.status === 1) {
            yield call(postRequest, {
                url: api_url + 'recharge/success-recharge',
                data: {
                    userId: customerData?._id,
                    number: response?.number,
                    mobile: customerData?.phoneNumber,
                    operator_reference: response?.operator_reference,
                    operatorId: payload?.product_code,
                    amount: response?.amount,
                    razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                    rechargeOrderId: response?.order_id,
                    request_id: response?.request_id,
                    message: response?.message,
                    billType: payload?.billType,
                    productName: payload?.productName,
                },
            });

            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'success',
                    title: 'Payment Successful!',
                    message: response?.message || 'Your payment was processed successfully.',
                    orderId: response?.order_id,
                    amount: payableAmount,
                    details: {
                        'Transaction ID': response?.operator_reference || 'N/A',
                        'Payment Method': paymentMethod,
                        'Date': new Date().toLocaleString(),
                        'Mobile/Account': payload?.number,
                        'Operator': payload?.productName,
                    },
                    actions: [
                        {
                            text: 'View Receipt',
                            onPress: () => { }
                        },
                        {
                            text: 'Done',
                            onPress: () => {
                                resetToScreen('home');
                            }
                        }
                    ]
                }
            });

        } else {
            // ❌ Failed — Try Refund
            let refundDone = false;
            if (razorpayResponse?.razorpay_payment_id) {
                try {
                    const refundResponse = yield call(razorpayRefund, {
                        amount: payableAmount - walletUsed,
                        paymentId: razorpayResponse?.razorpay_payment_id,
                    });

                    if (refundResponse?.data?.entity === 'refund') {
                        refundDone = true;

                        yield call(postRequest, {
                            url: api_url + 'recharge/refund-success-recharge',
                            data: {
                                userId: customerData?._id,
                                number: payload?.number,
                                mobile: customerData?.phoneNumber,
                                operatorId: payload?.product_code,
                                amount: payableAmount,
                                razorpayOrderId: razorpayResponse?.razorpay_order_id,
                                billType: payload?.billType,
                                productName: payload?.productName,
                            },
                        });
                    }
                } catch (err) {
                    console.log('Refund Error:', err);
                }
            }

            // ✅ Show Refund Modal
            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: refundDone ? 'warning' : 'error',
                    title: refundDone ? 'Payment Failed - Refunded' : 'Payment Failed',
                    message: refundDone
                        ? 'Your payment failed, but the amount has been refunded to your account.'
                        : response?.message || 'Bill payment failed. No refund was processed.',
                    actions: [
                        {
                            text: 'OK',
                            onPress: () => {
                                resetToScreen('home');
                            }
                        }
                    ]
                }
            });

            // Log failed transaction
            yield call(postRequest, {
                url: api_url + 'recharge/failed-recharge',
                data: {
                    userId: customerData?._id,
                    number: payload?.number,
                    mobile: customerData?.phoneNumber,
                    operatorId: payload?.product_code,
                    amount: payableAmount,
                    razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                    billType: payload?.billType,
                    productName: payload?.productName,
                    status: refundDone ? 'REFUNDED' : 'FAILURE',
                    errorMessage: response?.message || 'Bill payment failed.',
                },
            });
        }

    } catch (error) {
        console.log('Payment Error:', error);

        yield call(postRequest, {
            url: api_url + 'recharge/failed-recharge',
            data: {
                userId: customerData?._id,
                number: payload?.number,
                mobile: customerData?.phoneNumber,
                operatorId: payload?.product_code,
                amount: payableAmount,
                razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                billType: payload?.billType,
                productName: payload?.productName,
                status: error.message.includes('cancelled') ? 'CANCEL' : 'FAILURE',
                errorMessage: error.message,
            },
        });

        yield put({
            type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
            payload: {
                visible: true,
                type: 'error',
                title: error.message.includes('cancelled') ? 'Payment Cancelled' : 'Payment Failed',
                message: error.message.includes('cancelled')
                    ? 'You cancelled the payment process.'
                    : error.message || 'Your payment could not be processed.',
                actions: [
                    {
                        text: 'OK',
                        onPress: () => {
                            resetToScreen('home');
                        }
                    }
                ]
            }
        });
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* razorpayTest() {
    try {
        const customerData = yield select(state => state.customer.customerData);
        const response = yield razorpayPaymentWebsite({
            amount: 10,
            email: customerData?.email,
            contact: customerData?.phoneNumber,
            name: customerData?.customerName,

        });

        console.log('testing ', response);
        const data = {
            orderId: response.id, amount: 10, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName
        }
        navigate('razorpayweb', data);

    } catch (e) {
        console.log(e);
    }
}


// Razorpay Website by Node js
function* getRechargeDataByWebsite(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const customerData = yield select(state => state.customer.customerData);
        const walletBalance = parseFloat(customerData?.wallet_balance || 0);
        const rechargeAmount = parseFloat(payload?.amount || 0);

        const checkLimit = yield postRequest({
            url: `https://rechargeapi.astrosetalk.com/api/recharge/check-recharge-limit`,
            data: {
                appName: "astroone"
            }
        });

        if (checkLimit?.remaining < rechargeAmount) {
            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'error',
                    title: 'Limit',
                    message: 'Something went wrong!',
                    actions: [{
                        text: 'OK',
                        onPress: () => resetToScreen('home')
                    }]
                }
            });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            return false;

        }


        if (walletBalance >= rechargeAmount) {
            // Full wallet
            const deductResponse = yield call(postRequest, {
                url: api_url + 'customers/deduct_wallet_balance',
                data: { customerId: customerData?._id, amount: String(rechargeAmount) }
            });

            if (!deductResponse?.success) {
                throw new Error('Wallet deduction failed....');
            }

            const response = yield call(postRequest, {
                url: api_url_recharge + 'recharge/rechargeData',
                data: {
                    number: payload?.number,
                    amount: rechargeAmount,
                    product_code: payload?.product_code,
                    customer_number: customerData?.phoneNumber,
                    pincode: '201303',
                    latitude: payload?.latitude,
                    longitude: payload?.longitude,
                    appName: 'astroone',
                    serviceType: payload?.serviceType,
                },
            });

            if (response?.status === 1) {
                yield call(postRequest, {
                    url: api_url + 'customers/deduct_wallet_balance',
                    data: { customerId: customerData?._id, amount: String(walletBalance) }
                });

                yield call(postRequest, {
                    url: api_url + 'recharge/success-recharge',
                    data: {
                        userId: customerData?._id,
                        number: response?.number,
                        mobile: customerData?.phoneNumber,
                        operator_reference: response?.operator_reference,
                        operatorId: payload?.product_code,
                        amount: response?.amount,
                        razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                        rechargeOrderId: response?.order_id,
                        request_id: response?.request_id,
                        message: response?.message,
                        billType: payload?.billType,
                        productName: payload?.productName,
                    },
                });

                yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

                yield put({
                    type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                    payload: {
                        visible: true,
                        type: 'success',
                        title: 'Recharge Successful!',
                        message: response?.message || 'Your recharge was processed successfully',
                        orderId: response?.order_id,
                        amount: rechargeAmount,
                        details: {
                            'Transaction ID': response?.operator_reference || 'N/A',
                            'Payment Method': paymentMethod,
                            'Date': new Date().toLocaleString(),
                            'Mobile Number': payload?.number,
                            'Operator': payload?.productName,
                        },
                        actions: [
                            {
                                text: 'View Receipt',
                                onPress: () => {
                                    // Navigate to receipt screen if needed
                                }
                            },
                            {
                                text: 'Done',
                                onPress: () => resetToScreen('home')
                            }
                        ]
                    }
                });
            }


        } else if (walletBalance === 0) {
            // Full Razorpay
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            razorpayResponse = yield call(razorpayPaymentWebsite, {
                amount: rechargeAmount,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                fullAmount: rechargeAmount,
                number: payload?.number,
                product_code: payload?.product_code,
                customer_number: customerData?.phoneNumber,
                pincode: '201303',
                latitude: payload?.latitude,
                longitude: payload?.longitude,
                appName: 'astroone',
                serviceType: payload?.serviceType,
                customerId: customerData?._id,
                billType: payload?.billType,
                productName: payload?.productName,
                paymentMethod: 'UPI',
                serviceName: 'rechargeData'
            });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

            const data = {
                orderId: razorpayResponse.id, amount: 10, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName
            }
            navigate('razorpayweb', data);

        } else {
            // Partial wallet + Razorpay
            const remaining = (rechargeAmount - walletBalance).toFixed(2);

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            const razorpayResponse = yield call(razorpayPaymentWebsite, {
                amount: remaining,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                fullAmount: rechargeAmount,
                number: payload?.number,
                product_code: payload?.product_code,
                customer_number: customerData?.phoneNumber,
                pincode: '201303',
                latitude: payload?.latitude,
                longitude: payload?.longitude,
                appName: 'astroone',
                serviceType: payload?.serviceType,
                customerId: customerData?._id,
                billType: payload?.billType,
                productName: payload?.productName,
                paymentMethod: 'UPI_Wallet',
                serviceName: 'rechargeData'
            });

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            
            const data = {
                orderId: razorpayResponse.id, amount: 10, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName
            }
            navigate('razorpayweb', data);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log('Saga Error:', e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onBillPaymentByWebsite(actions) {
    const { payload } = actions;

    const customerData = yield select(state => state?.customer?.customerData);
    const payableAmount = parseFloat(payload?.amount || 0);

    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const walletBalance = parseFloat(customerData?.wallet_balance || 0);

        const checkLimit = yield postRequest({
            url: `https://rechargeapi.astrosetalk.com/api/recharge/check-recharge-limit`,
            data: {
                appName: "astroone"
            }
        });

        if (checkLimit?.remaining < payableAmount) {
            yield put({
                type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                payload: {
                    visible: true,
                    type: 'error',
                    title: 'Limit',
                    message: 'Something went wrong!',
                    actions: [{
                        text: 'OK',
                        onPress: () => resetToScreen('home')
                    }]
                }
            });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
            return false;
        }

        // ✅ Full Wallet
        if (walletBalance >= payableAmount) {
            const deductResponse = yield call(postRequest, {
                url: api_url + 'customers/deduct_wallet_balance',
                data: {
                    customerId: customerData?._id,
                    amount: String(payableAmount),
                },
            });

            if (!deductResponse?.success) {
                throw new Error('Wallet deduction failed.');
            }

            // ✅ Bill Payment API
            const response = yield call(postRequest, {
                url: api_url_recharge + 'recharge/billPayment',
                data: {
                    number: payload?.number,
                    amount: payableAmount,
                    product_code: payload?.product_code,
                    customer_number: customerData?.phoneNumber,
                    latitude: payload?.latitude,
                    longitude: payload?.longitude,
                    bill_fetch_ref: payload?.bill_fetch_ref,
                    appName: "astroone",
                    serviceType: payload?.serviceType || ''
                },
            });

            if (response?.status === 1) {
                yield call(postRequest, {
                    url: api_url + 'recharge/success-recharge',
                    data: {
                        userId: customerData?._id,
                        number: response?.number,
                        mobile: customerData?.phoneNumber,
                        operator_reference: response?.operator_reference,
                        operatorId: payload?.product_code,
                        amount: response?.amount,
                        razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                        rechargeOrderId: response?.order_id,
                        request_id: response?.request_id,
                        message: response?.message,
                        billType: payload?.billType,
                        productName: payload?.productName,
                    },
                });

                yield put({
                    type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
                    payload: {
                        visible: true,
                        type: 'success',
                        title: 'Payment Successful!',
                        message: response?.message || 'Your payment was processed successfully.',
                        orderId: response?.order_id,
                        amount: payableAmount,
                        details: {
                            'Transaction ID': response?.operator_reference || 'N/A',
                            'Payment Method': paymentMethod,
                            'Date': new Date().toLocaleString(),
                            'Mobile/Account': payload?.number,
                            'Operator': payload?.productName,
                        },
                        actions: [
                            {
                                text: 'View Receipt',
                                onPress: () => { }
                            },
                            {
                                text: 'Done',
                                onPress: () => {
                                    resetToScreen('home');
                                }
                            }
                        ]
                    }
                });
            } else {
                // Log failed transaction
                yield call(postRequest, {
                    url: api_url + 'recharge/failed-recharge',
                    data: {
                        userId: customerData?._id,
                        number: payload?.number,
                        mobile: customerData?.phoneNumber,
                        operatorId: payload?.product_code,
                        amount: payableAmount,
                        razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                        billType: payload?.billType,
                        productName: payload?.productName,
                        status: refundDone ? 'REFUNDED' : 'FAILURE',
                        errorMessage: response?.message || 'Bill payment failed.',
                    },
                });

            }

        }
        // ✅ Full Razorpay
        else if (walletBalance === 0) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

           const razorpayResponse = yield call(razorpayPaymentWebsite, {
               amount: payableAmount,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                fullAmount: payableAmount,
                number: payload?.number,
                product_code: payload?.product_code,
                customer_number: customerData?.phoneNumber,
                pincode: '201303',
                latitude: payload?.latitude,
                longitude: payload?.longitude,
                appName: 'astroone',
                serviceType: payload?.serviceType,
                customerId: customerData?._id,
                billType: payload?.billType,
                productName: payload?.productName,
                paymentMethod: 'UPI',
                serviceName: 'BillPayment',
                bill_fetch_ref: payload?.bill_fetch_ref,
            });

             const data = {
                orderId: razorpayResponse.id, amount: 10, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName
            }
            navigate('razorpayweb', data);
        }

        // ✅ Partial Wallet + Razorpay
        else {
            const remaining = (payableAmount - walletBalance).toFixed(2);
            walletUsed = walletBalance;

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

           const razorpayResponse = yield call(razorpayPaymentWebsite, {
               amount: remaining,
                email: customerData?.email,
                contact: customerData?.phoneNumber,
                name: customerData?.customerName,
                fullAmount: payableAmount,
                number: payload?.number,
                product_code: payload?.product_code,
                customer_number: customerData?.phoneNumber,
                pincode: '201303',
                latitude: payload?.latitude,
                longitude: payload?.longitude,
                appName: 'astroone',
                serviceType: payload?.serviceType,
                customerId: customerData?._id,
                billType: payload?.billType,
                productName: payload?.productName,
                paymentMethod: 'UPI',
                serviceName: 'BillPayment',
                bill_fetch_ref: payload?.bill_fetch_ref,
            });

             const data = {
                orderId: razorpayResponse.id, amount: 10, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName
            }
            navigate('razorpayweb', data);

            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }
    } catch (error) {
        console.log('Payment Error:', error);

        yield call(postRequest, {
            url: api_url + 'recharge/failed-recharge',
            data: {
                userId: customerData?._id,
                number: payload?.number,
                mobile: customerData?.phoneNumber,
                operatorId: payload?.product_code,
                amount: payableAmount,
                razorpayOrderId: razorpayResponse?.razorpay_order_id || null,
                billType: payload?.billType,
                productName: payload?.productName,
                status: error.message.includes('cancelled') ? 'CANCEL' : 'FAILURE',
                errorMessage: error.message,
            },
        });

        yield put({
            type: actionTypes.SHOW_PAYMENT_RESULT_MODAL,
            payload: {
                visible: true,
                type: 'error',
                title: error.message.includes('cancelled') ? 'Payment Cancelled' : 'Payment Failed',
                message: error.message.includes('cancelled')
                    ? 'You cancelled the payment process.'
                    : error.message || 'Your payment could not be processed.',
                actions: [
                    {
                        text: 'OK',
                        onPress: () => {
                            resetToScreen('home');
                        }
                    }
                ]
            }
        });
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



export default function* rechargeSaga() {
    yield takeLatest(actionTypes.GET_DEVICE_CONTACTS, getDeviceContacts);
    yield takeLeading(actionTypes.GET_DTH_OPERATOR, getDthOperator);
    yield takeLatest(actionTypes.GET_ALL_SERVICE_PROVIDERS, getpostpaidoperator);
    yield takeLatest(actionTypes.CHECK_OFFER, checkOfferSaga)
    yield takeLatest(actionTypes.GET_SERVICES_LIST, fetchServicesList);
    yield takeLatest(actionTypes.GET_HLR_LOOKUP, getHlrLookup);
    yield takeLatest(actionTypes.GET_FETCH_BILL_INFO, getFetchBillInfo);
    yield takeLatest(actionTypes.GET_DTH_INFO, getDTHInfo);
    yield takeLatest(actionTypes.GET_RECHARGE_BANNER, getRechargeBanner);
    yield takeLatest(actionTypes.GET_RECHARGE_DATA, getRechargeDataByWebsite);
    yield takeLeading(actionTypes.ON_BILL_PAYMENT, onBillPaymentByWebsite);
    yield takeLeading(actionTypes.ON_RAZORPAY_TEST, razorpayTest);
}