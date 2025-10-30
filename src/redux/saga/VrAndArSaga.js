import axios from 'axios';
import { api_url, get_vr_items, onVrMode } from '../../config/constants';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes'
import { call, delay, put, takeLeading } from 'redux-saga/effects';

function* onBellRing(actions) {
    try {
        const {payload} = actions
        yield put({ type: actionTypes.SET_BELL_RING, payload: true });
        yield delay(3000); // Wait for 5 seconds
        yield put({ type: actionTypes.SET_BELL_RING, payload: false });
    } catch (e) {
        console.log(e,'asdfasdf')
    }
}

function* onDiyaAnimation(actions) {
    try {
        console.log(actions, 'actions')
        const {payload} = actions
        yield put({ type: actionTypes.SET_DIYA_ANIMATION, payload: true });
        yield delay(5000); // Wait for 5 seconds
        yield put({ type: actionTypes.SET_DIYA_ANIMATION, payload: false });
    } catch (e) {
        console.log(e,'asdfasdf')
    }
}

function* getVrItems(actions) {
    try {
        const {payload} = actions;

        console.log("getVrItems payload");
        // Simulate an API call to fetch VR items
        const response = yield axios.get(
            api_url + get_vr_items,
        ); // Replace with your API endpoint
        
        console.log("getVrItems response", response?.data);
       
        if(response?.data?.success) {
            yield put({ type: actionTypes.SET_VR_ITEAMS, payload: response?.data?.data });
            return;
        } else {
            yield put({ type: actionTypes.SET_VR_ITEAMS, payload: [] });
        }
       
    } catch (e) {
        console.log(e,'asdfasdf')
    }
}

function* showGif(actions) {
    try {
        const {payload} = actions;
        console.log("showGif payload", payload);
        yield put({ type: actionTypes.SET_SHOW_ANIMATION, payload: true });
        yield put({ type: actionTypes.SET_IMAGE_ANIMATION, payload: payload });
        yield delay(payload?.duration * 1000 || 3000); // Wait for specified duration or default to 3 seconds
        yield put({ type: actionTypes.SET_SHOW_ANIMATION, payload: false });
       
       
    } catch (e) {
        console.log(e,'asdfasdf')
    }
}

function* onVrDeductAdd(actions) {
    try {
        const {payload} = actions;
        console.log("onVrDeductAdd payload", payload);
        const response = yield postRequest({
            url: api_url + onVrMode,
            data: payload?.data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("onVrDeductAdd response", response);
        if(response?.success) {
           yield call(() => payload?.onComplete()); 
        } else {
            console.log("Error in onVrDeductAdd", response?.message);
        }
    }
    catch (e) {
        console.log(e, 'onVrDeductAdd error');
    }
}

function* updateVrUserCount(actions) {
    try {
        const {payload} = actions;
        console.log("updateVrUserCount payload", payload);
        const response = yield postRequest({
            url: api_url + 'customers/updateRealVrCount',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("updateVrUserCount response", response);
        if(response?.success) {
          console.log("updateVrUserCount success", response?.data);
        } else {
            console.log("Error in updateVrUserCount", response?.message);
        }
    }
    catch (e) {
        console.log(e, 'updateVrUserCount error');
    }
}

export default function* VrAndArSaga() {
    yield takeLeading(actionTypes.ON_BELL_RING, onBellRing);
    yield takeLeading(actionTypes.ON_DIYA_ANIMATION, onDiyaAnimation);  
    yield takeLeading(actionTypes.GET_VR_ITEAMS, getVrItems);
    yield takeLeading(actionTypes.SHOW_GIF, showGif);
    yield takeLeading(actionTypes.ON_VR_DEDUCT_ADD, onVrDeductAdd);
    yield takeLeading(actionTypes.UPDATE_VR_USER_COUNT, updateVrUserCount);
}