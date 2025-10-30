import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import { api_url, customer_home_banner, get_gifsanatan, get_active_astrologer, get_gift_data, get_astro_companion, get_call_astrologer, get_chat_astrologer, get_delete_account_data, get_notification_data, get_video_call_astrologer, get_referres, get_mudra, get_lota_mudra, get_baghwan, get_pooja_category, get_gift, get_Search, get_Send_Gift, send_wallet_request, get_wallet_request, respond_wallet_request, get_puja_details, get_astro_blogs } from '../../config/constants';
import { showToastMessage } from '../../utils/services';
import { resetToScreen } from '../../navigations/NavigationServices';
import { query } from '@react-native-firebase/database';
import { Alert } from 'react-native';

function* getHomeData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: true })

        const bannerResponse = yield getRequest({
            url: api_url + customer_home_banner,
        })

        const callResponse = yield postRequest({
            url: api_url + get_call_astrologer,
            data: {
                page: 1
            }
        })

        const templeFoundation = yield getRequest({
            url: api_url + 'admin/get-all-temple-foundation'
        })

        const teerthResponse = yield getRequest({
            url: api_url + `admin/get-app-Teerth-dham`,
        })

        const chatResponse = yield postRequest({
            url: api_url + get_chat_astrologer,
            data: {
                page: 1
            }
        })

        const videoTempleResponse = yield getRequest({
            url: api_url + 'admin/get_temple_videos'
        })
        
        if (videoTempleResponse?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_VIDEOS, payload: videoTempleResponse?.data });
        }

        const videoResponse = yield postRequest({
            url: api_url + get_video_call_astrologer,
            data: {
                page: 1
            }
        })

        const poojaDataResponse = yield getRequest({
            url: api_url + get_puja_details,
        })

        if (poojaDataResponse?.success) {
            yield put({ type: actionTypes.SET_POOJA_DATA, payload: poojaDataResponse?.pooja })
        }

        const response3 = yield getRequest({
            url: api_url + get_astro_blogs
        })

        if (response3?.success) {
            yield put({ type: actionTypes.SET_ASTRO_BLOGS, payload: response?.blogs })
        }

        const response = yield getRequest({
            url: "https://api.astroone.in/api/admin/get_Darshan",
        })

        console.log("Response for Live Temple Data", response);

        if (response?.success) {
            yield put({ type: actionTypes.SET_LIVE_TEMPLE_DATA, payload: response?.data });

            console.log("Response for Live Temple Data", response?.data);

        }


        if (bannerResponse?.success) {
            yield put({ type: actionTypes.SET_HOME_BANNER, payload: bannerResponse?.banners })
        }

        if(teerthResponse?.success) {
            yield put({ type: actionTypes.SET_HOME_TREERTH_DHAM, payload: teerthResponse?.teerthDham});
        }
        if (callResponse?.success) {
            yield put({ type: actionTypes.SET_CALL_ASTROLOGER, payload: callResponse?.astrologer })
        }

        if(templeFoundation?.success) {
            yield put({ type: actionTypes.SET_HOME_TEMPLE_FOUNDATION, payload: templeFoundation?.testimonial});
        }

        if (chatResponse?.success) {
            yield put({ type: actionTypes.SET_CHAT_ASTROLOGER, payload: chatResponse?.astrologer })
        }

        if (videoResponse?.success) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_ASTROLOGER, payload: videoResponse?.astrologer })
        }

        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getHomeDataOnRefresh(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true })


        const callResponse = yield postRequest({
            url: api_url + get_call_astrologer,
            data: {
                page: 1
            }
        })

        const chatResponse = yield postRequest({
            url: api_url + get_chat_astrologer,
            data: {
                page: 1
            }
        })
        const videoResponse = yield postRequest({
            url: api_url + get_video_call_astrologer,
            data: {
                page: 1
            }
        })

        yield put({ type: actionTypes.GET_CUSTOMER_DATA, payload: null })


        if (callResponse?.success) {
            yield put({ type: actionTypes.SET_CALL_ASTROLOGER, payload: callResponse?.astrologer })
        }

        if (chatResponse?.success) {
            yield put({ type: actionTypes.SET_CHAT_ASTROLOGER, payload: chatResponse?.astrologer })
        }
        if (videoResponse.response) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_ASTROLOGER, payload: videoResponse?.astrologer })
        }

        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false })
        console.log('hii', e);
    }
}

function* getAstroCompanionData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })


        const response = yield postRequest({
            url: api_url + get_astro_companion,
            data: {
                type: payload
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_ASTRO_COMPANION_DATA, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
    }
}

function* getNotificationData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const customerData = yield select(state => state.customer.customerData);
        console.log(customerData?._id);

        const response = yield postRequest({
            url: api_url + get_notification_data,
            data: {
                customerId: customerData?._id
            }
        });

        console.log(response?.data, 'notification data');
        if (response?.success) {
            // Sort notifications by '_id' in descending order
            const sortedNotifications = response?.data.sort(
                (a, b) => b._id.localeCompare(a._id)
            );

            yield put({ type: actionTypes.SET_NOTIFICATION_DATA, payload: sortedNotifications });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getDeleteAccountData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?._id)

        const response = yield postRequest({
            url: api_url + get_delete_account_data,
            data: {
                customerId: customerData?._id
            }
        })
        console.log(response?.message, 'notification data')
        if (response?.success) {
            console.log(response?.message, 'notification data')
            yield put({ type: actionTypes.SET_DELETE_ACCOUNT_DATA, payload: response?.data })
            showToastMessage({ message: response?.message })
            yield call(resetToScreen, 'login')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getTemplegif(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_TEMPLE_GIF, payload: true })

        const templegifResponse = yield getRequest({
            // url: api_url + customer_home_banner,
            url: 'https://api.astroone.in/api/customers/gifs'
        })

        if (templegifResponse?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_GIF, payload: templegifResponse?.gifs })
        }

        console.log(templegifResponse, 'hiiii')

        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getSanatangif(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_SANATAN_TEMPLE_GIF, payload: true })

        const sanatanMandirgif = yield getRequest({
            // url: api_url + get_gifsanatan,
            url: 'https://api.astroone.in/api/admin/get_temple'
        })
        if (sanatanMandirgif?.success) {
            yield put({ type: actionTypes.SET_SANATAN_TEMPLE_GIF, payload: sanatanMandirgif })
        }
        console.log(sanatanMandirgif, 'SanatanGifCheck12')
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getAbijitMuhurt(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;

        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";

        const LANGUAGE = "hi";

        const requestData = {
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        console.log("Data being sent to API:", requestData);

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/muhurat-abhijit",
            data: requestData,
            header: 'post'
        });

        console.log("API Response:", response);

        if (response) {
            yield put({ type: actionTypes.SET_ABHIJIT_MUHURT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getDurMuhurat(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";
        const LANGUAGE = "hi";

        const durmuhuratTypes = "rahukaal";

        const requestData = {
            durmuhurat: durmuhuratTypes,
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/durmuhurat",
            data: requestData,
            header: 'post',
        });

        console.log("Response for durmuhurat", response);

        if (response) {
            yield put({ type: actionTypes.SET_DUR_MUHURAT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getGulikMuhurat(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";
        const LANGUAGE = "hi";

        const durmuhuratTypes = "gulikkaal";

        const requestData = {
            durmuhurat: durmuhuratTypes,
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/durmuhurat",
            data: requestData,
            header: 'post',
        });

        console.log("Response for durmuhurat", response);

        if (response) {
            yield put({ type: actionTypes.SET_GULIK_MUHURAT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getYamghantMuhurat(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";
        const LANGUAGE = "hi";

        const durmuhuratTypes = "yamgantakkaal";

        const requestData = {
            durmuhurat: durmuhuratTypes,
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/durmuhurat",
            data: requestData,
            header: 'post',
        });

        console.log("Response for durmuhurat", response);

        if (response) {
            yield put({ type: actionTypes.SET_YAM_MUHURAT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getLiveTempleData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield getRequest({
            url: "https://api.astroone.in/api/admin/get_Darshan",
        })

        console.log("Response for Live Temple Data", response);

        if (response?.success) {
            yield put({ type: actionTypes.SET_LIVE_TEMPLE_DATA, payload: response?.data });

            console.log("Response for Live Temple Data", response?.data);

        }

    } catch (error) {

        console.log("Something went wrong:::::", error);

    }
}



function* getPradhan(actions) {
    try {
        const { payload } = actions
        const response = yield getRequest({
            url: api_url + get_referres,
        })
        console.log("response:>>>", response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_PRADHAN_DATA, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getMudra(actions) {
    try {
        const { payload } = actions
        console.log(payload, "oisadhfdosahoh")
        const response = yield postRequest({
            url: api_url + get_mudra,
            data: payload
        })
        console.log("responsepradhan>>>:::", response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_MUDRA_DATA, payload: response })
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}
function* getLotaMudra(actions) {
    try {
        const { payload } = actions
        console.log(payload, "oisadhfdosahoh")
        const response = yield postRequest({
            url: api_url + get_lota_mudra,
            data: payload
        })
        console.log("responsepradhan>>>:::", response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_LOTA_MUDRA_DATA, payload: response })
            yield put({ type: actionTypes.GET_MUDRA_DATA });
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getBaghwandata(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_SANATAN_TEMPLE_GIF, payload: true });

        const baghwanData = yield getRequest({
            url: api_url + get_baghwan,
        });

        // console.log("baghwanData", baghwanData);

        if (baghwanData?.success && Array.isArray(baghwanData.data)) {
            const filteredData = baghwanData.data.filter(
                (item) => item.temple === "Sanatan"
            );
            yield put({ type: actionTypes.SET_BAGHWAN_DATA, payload: filteredData });
        } else {
            console.log("Invalid data received:", baghwanData);
        }


        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false });

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false });
        console.log("Error in getBaghwandata:", e);
    }
}


function* getBaghwandataNavgrah(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_SANATAN_TEMPLE_GIF, payload: true });

        const baghwanDataNav = yield getRequest({
            url: api_url + get_baghwan,
        });

        console.log("baghwanDataNavgrah::", baghwanDataNav?.success);

        if (baghwanDataNav?.success) {
            const filteredDataNav = baghwanDataNav.data.filter(
                (item) => item.temple === "Navgrah"
            );

            console.log("filteredDataNav::", filteredDataNav?.length);

            yield put({ type: actionTypes.SET_BAGHWAN_DATA_NAVGRAH, payload: filteredDataNav });
        }

        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false });

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false });
        console.log("Error in getBaghwandata:", e);
    }
}

function* getBaghwanDataVrMode() {
    try {
        const baghwanDataNav = yield getRequest({
            url: api_url + get_baghwan,
        });

        if (baghwanDataNav?.success) {
            const mergedVrData = baghwanDataNav.data
                .filter(item => Array.isArray(item.vr_mode) && item.vr_mode.length > 0)
                .flatMap(item =>
                    item.vr_mode
                        .filter(vr => vr.vr_image) // remove null or empty
                        .map(vr => ({ ...vr }))
                );
            yield put({ type: actionTypes.SET_BAGHWAN_DATA_VR_MODE, payload: mergedVrData });
        }
    } catch (e) {
        console.log("Error in getBaghwandata:", e);
    }
}

function* getPoojacategory(actions) {
    try {
        const { payload } = actions
        const poojaData = yield getRequest({
            url: api_url + get_pooja_category,

        })

        if (poojaData?.success) {

            const customOrder = ["Flower", "Coconut", "Shankh", "THALI"];

            // Sort based on custom order
            const sortedData = poojaData?.data.sort((a, b) => {
                return customOrder.indexOf(a.title) - customOrder.indexOf(b.title);
            });

            console.log("Sorted Data:", JSON.stringify(sortedData));

            yield put({ type: actionTypes.SET_POOJA_CATEGORY, payload: sortedData });
            yield put({ type: actionTypes.SET_SANTAN_ACTIVE_CATEGORY, payload: sortedData });

            // yield put({ type: actionTypes.SET_POOJA_CATEGORY, payload: poojaData?.data });
            // yield put({ type: actionTypes.SET_SANTAN_ACTIVE_CATEGORY, payload: poojaData?.data });
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getGiftsData(actions) {
    try {
        const { payload } = actions
        const GiftsData = yield getRequest({
            url: api_url + get_gift,

        })
        console.log("GiftsDataanuj:::KKK", GiftsData?.success)
        if (GiftsData?.success) {
            yield put({ type: actionTypes.SET_GIFTS_DATA, payload: GiftsData?.customers })
            showToastMessage({ message: response?.message })
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}



function* giftHistoryData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const customerData = yield select(state => state.customer.customerData);
        console.log(customerData?._id);

        const response = yield postRequest({
            // url: api_url + get_gift_data,
            url: "https://api.astroone.in/api/customers/get-All-wallet-history-customer",
            data: {
                customerId: customerData?._id
            }
        });

        console.log(response?.transactions, 'gifted by data');
        if (response?.success) {
            yield put({ type: actionTypes.SET_GIFT_DATA__BY_ID, payload: response?.transactions });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}




function* getSendUser(action) {
    try {
        console.log("Action received in saga:", action);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + get_Send_Gift,
            data: action.payload,
        });


        if (response?.success) {
            yield put({ type: actionTypes.SET_SEND_GIFTS_DATA, payload: response?.success });
            showToastMessage({ message: response?.message });
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
        } else {
            showToastMessage({ message: response?.message });
        }

    } catch (e) {
        console.error("Error in sending gift:", e);
        alert("An error occurred while sending the gift.");
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getSendGiftRequest(actions) {
    try {

        const { payload } = actions;

        const response = yield postRequest({
            url: api_url + send_wallet_request,
            data: payload
        });

        console.log('response ', response)
        if (response?.success) {
            showToastMessage({ message: response?.message });
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
        }


    } catch (e) {
        console.log('error ', e);
    }
}

function* getSendRequestData(action) {
    try {
        const customerData = yield select(state => state.customer.customerData);
        console.log(`${api_url}${get_wallet_request}${customerData?._id}`);
        const response = yield getRequest({
            url: `${api_url}${get_wallet_request}${customerData?._id}`
        });

        console.log('response data', response);

        yield put({ type: actionTypes.SET_SEND_REQUEST_DATA, payload: response?.requests });
        yield put({ type: actionTypes.GET_CUSTOMER_DATA });
    } catch (e) {
        console.log(e);
    }
}

function* onRespondWalletRequest(actions) {
    try {
        const { payload } = actions;

        const response = yield postRequest({
            url: api_url + respond_wallet_request,
            data: payload
        });

        console.log('response wallet request ', response);

        if (response?.success) {
            showToastMessage({ message: response?.message })
        } else {
            showToastMessage({ message: response?.message })
        }
        yield put({ type: actionTypes.GET_SEND_REQUEST_DATA });
        yield put({ type: actionTypes.GET_CUSTOMER_DATA });
    } catch (e) {
        console.log(e);
    }
}



export default function* homeSaga() {
    yield takeLatest(actionTypes.GET_HOME_DATA, getHomeData);
    yield takeLeading(actionTypes.GET_HOME_DATA_ON_REFRESH, getHomeDataOnRefresh);
    yield takeLeading(actionTypes.GET_ASTRO_COMPANION_DATA, getAstroCompanionData);
    yield takeLeading(actionTypes.GET_NOTIFICATION_DATA, getNotificationData);
    yield takeLeading(actionTypes.GET_DELETE_ACCOUNT_DATA, getDeleteAccountData);
    yield takeLeading(actionTypes.GET_TEMPLE_GIF, getTemplegif);
    yield takeLeading(actionTypes.GET_SANATAN_TEMPLE_GIF, getSanatangif);
    yield takeLeading(actionTypes.GET_ABHIJIT_MUHURT, getAbijitMuhurt);
    yield takeLeading(actionTypes.GET_DUR_MUHURAT, getDurMuhurat);
    yield takeLeading(actionTypes.GET_GULIK_MUHURAT, getGulikMuhurat);
    yield takeLeading(actionTypes.GET_YAM_MUHURAT, getYamghantMuhurat);
    yield takeLeading(actionTypes.GET_LIVE_TEMPLE_DATA, getLiveTempleData);
    yield takeLeading(actionTypes.GET_PRADHAN_DATA, getPradhan);
    yield takeLeading(actionTypes.GET_MUDRA_DATA, getMudra);
    yield takeLeading(actionTypes.GET_LOTA_MUDRA_DATA, getLotaMudra);
    yield takeLeading(actionTypes.GET_BAGHWAN_DATA, getBaghwandata);
    yield takeLeading(actionTypes.GET_BAGHWAN_DATA_NAVGRAH, getBaghwandataNavgrah);
    yield takeLeading(actionTypes.GET_BAGHWAN_DATA_VR_MODE, getBaghwanDataVrMode);
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY, getPoojacategory);
    yield takeLeading(actionTypes.GET_GIFTS_DATA, getGiftsData);
    yield takeLeading(actionTypes.GET_SEND_GIFTS_DATA, getSendUser);
    yield takeLeading(actionTypes.GET_SEND_GIFT_REQUEST, getSendGiftRequest);
    yield takeLeading(actionTypes.GET_SEND_REQUEST_DATA, getSendRequestData);
    yield takeLeading(actionTypes.ON_RESPOND_WALLET_REQUEST, onRespondWalletRequest);
    yield takeLeading(actionTypes.GET_GIFT_DATA__BY_ID, giftHistoryData);

}