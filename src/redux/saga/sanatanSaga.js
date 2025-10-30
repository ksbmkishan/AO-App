import * as actionTypes from '../actionTypes'
import Sound from 'react-native-sound';
import { call, cancel, delay, fork, put, select, take, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { accept_chat } from '../../config/Constants1';
import { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import TrackPlayer, { State, Capability } from 'react-native-track-player';
import { eventChannel } from 'redux-saga';
import { getRequest, postRequest } from '../../utils/apiRequests';
import { api_url, temple_wallet_add_deduct } from '../../config/constants';
import * as SanatanActions from '../../redux/actions/sanatanActions'
import { showToastMessage } from '../../utils/services';

function* getSanatanSoundaarti() {
    try {
        const sound = new Sound('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/aartisound.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
            }
        });

        yield put({ type: actionTypes.SET_SANTAN_SOUND_AARTI, payload: sound });

        return () => {
            if (sound) {
                sound.release();
            }
        };

    } catch (e) {
        console.log(e);
    }
}

function* getSanatanSoundshankh() {
    try {
        const sound = new Sound('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/shankh_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
            }
        });

        yield put({ type: actionTypes.SET_SANTAN_SOUND_SHANKH, payload: sound });

        return () => {
            if (sound) {
                sound.release();
            }
        };
    } catch (e) {
        console.log(e);
    }
}

function* getSanatanSoundCocount() {
    try {
        const sound = new Sound('https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/audio/coconut.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
            }
        });
        yield put({ type: actionTypes.SET_SANTAN_SOUND_COCOUNT, payload: sound });
        return () => {
            if (sound) {
                sound.release();
            }
        };
    } catch (e) {
        console.log(e);
    }
}




function* getSanatanSOundBell(actions) {
    try {
        const { payload } = actions;
        console.log('Payload ::: Bell ', payload)
        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE, payload: false });

        //  Animated.loop(
        //     Animated.sequence([
        //         Animated.timing(payload, {
        //             toValue: 1, // Rotate right (20°)
        //             duration: 1500,
        //             useNativeDriver: true,
        //         }),
        //         Animated.timing(payload, {
        //             toValue: 0, // Rotate left (-20°)
        //             duration: 1500,
        //             useNativeDriver: true,
        //         }),
        //     ])
        // ).start();

        yield delay(3000);

        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE, payload: true });


    } catch (e) {
        console.log(e);
    }
}

function* getSantanSoundBell2() {
    try {

        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE_2, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE_2, payload: false });

        yield delay(3000);

        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE_2, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE_2, payload: true });


    } catch (e) {
        console.log(e);
    }
}

function* getSantanSelectedTop(actions) {
    try {
        const { payload } = actions;
        // console.log(' Payload ::::: ', payload)
        yield put({ type: actionTypes.SET_SANTAN_SELECTED_TOP, payload: payload });
    } catch (e) {
        console.log(e);
    }
}

function* getSantanShowThali(actions) {

    try {
        const { payload } = actions
        console.log(payload, ' ====== ')

        const customer = yield select(state => state.customer.customerData);

        const response = yield postRequest({
            url: api_url + temple_wallet_add_deduct,
            data: {
                customerId: customer?._id,
                amount: payload?.data?.itemPrice,
                name: 'Thali'
            }
        });

        console.log('Response ::: ', response);

        if (response?.animation) {
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: true });
            yield delay(2000);
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: false });
        }

        if (response?.success) {
            if (response?.show) {
                showToastMessage({ message: response?.message, longduration: false });
            }


            yield call(() => payload?.startAnimation());
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: true });
            console.log('Payload Temple ::: ', payload?.data)
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
            yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
            yield put({ type: actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE, payload: true });
            yield put({ type: actionTypes.SET_SANTAN_MY_THALI, payload: payload?.data?.itemImage })
            yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: false });
            yield put({ type: actionTypes.SET_SANTAN_SPIN_VALUE, payload: payload?.data?.spinValue });




            payload?.data?.spinValue.setValue(0);

            // Start the rotation animation
            const spinAnimation = Animated.loop(
                Animated.timing(payload?.data?.spinValue, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );

            spinAnimation.start();

            yield delay(payload?.data?.duration);


            spinAnimation.stop();
            payload?.data?.spinValue?.setValue(0);

            yield put({ type: actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE, payload: false });
            yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
            yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: true });
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: false });
        } else {
            showToastMessage({ message: response?.message });
        }




    } catch (e) {
        console.log(e);
    }
}

function* getSantaThali(actions) {
    try {
        const { payload } = actions
        console.log(payload, ' puja thali ')

        const customer = yield select(state => state.customer.customerData);


        yield call(() => payload?.startAnimation());
        yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: true });
        console.log('Payload Temple ::: ', payload?.data)
        yield put({ type: actionTypes.GET_CUSTOMER_DATA });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_MY_THALI, payload: payload?.data?.itemImage })
        yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SPIN_VALUE, payload: payload?.data?.spinValue });


        payload?.data?.spinValue.setValue(0);

        // Start the rotation animation
        const spinAnimation = Animated.loop(
            Animated.timing(payload?.data?.spinValue, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        spinAnimation.start();

        yield delay(payload?.data?.duration);


        spinAnimation.stop();
        payload?.data?.spinValue?.setValue(0);

        yield put({ type: actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: true });
        yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: false });


    } catch (e) {
        console.log(e);
    }
}

function* getSantanShowThaliAnimation(actions) {
    try {
        const { payload } = actions
        console.log('payload animation :: ', payload);
        payload?.spinValue.setValue(0);

        // Start the rotation animation
        const spinAnimation = Animated.loop(
            Animated.timing(payload?.spinValue, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        spinAnimation.start();

        yield delay(payload?.duration);


        spinAnimation.stop();
        payload?.spinValue?.setValue(0);

        yield put({ type: actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: true });
    } catch (e) {
        console.log(e);
    }
}

function* getSantanSoundPlaySOund(actions) {
    try {
        console.log('actions :: ', actions);
        const { payload } = actions;
        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE_2, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE_2, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_FLOWER_VISIBLE, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: false });

        yield delay(payload);

        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_GIFT_BELL_VISIBLE_2, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_IMAGE_BELL_VISIBLE_2, payload: true });
        yield put({ type: actionTypes.SET_SANTAN_FLOWER_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_SHOW_ROTATE_THALI_VISIBLE, payload: false });
        yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: true });
    } catch (e) {
        console.log(e);
    }
}

function* getSantanFoolArpan(actions) {
    try {

        const { payload } = actions;

        const customer = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + temple_wallet_add_deduct,
            data: {
                customerId: customer?._id,
                amount: payload?.data?.itemPrice,
                name: 'Flower'
            }
        });

        console.log('Response ::: ', response);

        if (response?.animation) {
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: true });
            yield delay(2000);
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: false });
        }

        if (response?.success) {
            if (response?.show) {
                showToastMessage({ message: response?.message })
            }
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: true });
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
            yield put({ type: actionTypes.GET_LOTA_MUDRA_DATA, payload: payload });
            // if(payload?.amount != 0) {
            //     yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload:true});
            // }

            yield delay(1500);
            yield put({ type: actionTypes.SET_SHOW_SHOWER_VISIBLE, payload: true });
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: false });
            yield delay(payload?.duration);
            yield put({ type: actionTypes.SET_SHOW_SHOWER_VISIBLE, payload: false });
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: false });


        } else {
            showToastMessage({ message: response?.message })
        }



    } catch (e) {
        console.log(e);
    }

}

function* getSantanCocountArpan(actions) {
    try {
        const { payload } = actions
        console.log('Payload LL', payload);
        const customer = yield select(state => state.customer.customerData);

        const response = yield postRequest({
            url: api_url + temple_wallet_add_deduct,
            data: {
                customerId: customer?._id,
                amount: payload?.data?.itemPrice,
                name: 'Cocount'
            }
        });

        console.log('Response ::: ', response);

        if (response?.animation) {
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: true });
            yield delay(2000);
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: false });
        }

        if (response?.success) {
            yield call(() => payload?.onCall());
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: true });
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
            if (response?.show) {
                showToastMessage({ message: response?.message })
            }
            yield put({ type: actionTypes.SET_SANTAN_MY_THALI, payload: payload?.data?.itemImage });
            yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: false });
            yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
            yield put({ type: actionTypes.SET_SANTAN_COCOUNT_VISIBLE, payload: true });


            yield delay(6000);
            yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: true });
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: false });
            yield put({ type: actionTypes.SET_SANTAN_COCOUNT_VISIBLE, payload: false });

            yield delay(3000);
            yield put({ type: actionTypes.SET_SANTAN_NORMAL_GIF, payload: true });
            yield put({ type: actionTypes.SET_SANTAN_SHOW_NORMAL_THALI_VISIBLE, payload: false });
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: false });
        } else {
            showToastMessage({ message: response?.message })
        }





    } catch (e) {
        console.log(e);
    }
}

function* getSantanSongCurrentStateUpdate() {
    try {
        const SoundState = yield select(state => state.sanatan.soundCurrentState);
        const sound = yield select(state => state.sanatan.currentSong);
        console.log('Sound ::: ', SoundState);
        sound.stop();
        console.log('Sound STOP');
        yield put({ type: actionTypes.SET_SANTAN_SONG_CURRENT_STATE, payload: SoundState.STOP });


    } catch (e) {
        console.log(e);
    }
}

function* trackSongTime() {
    while (true) {
        const currentSong = yield select(state => state.sanatan.currentSong);
        console.log('Current Song:', JSON.stringify(currentSong));

        if (!currentSong || currentSong._playing) {
            console.warn('No currentSong or song is not playing');
            yield delay(1000);
            continue;
        }
        console.log("test ::: ");
        const songTimeChannel = yield call(createSongTimeChannel, currentSong);
        console.log('Song Time Channel', songTimeChannel);
        try {
            while (true) {
                const { time, error } = yield take(songTimeChannel);
                if (error) {
                    console.error('Error getting current time of the song:', error);
                    break;
                }
                console.log('Song Current Time:', time);
                yield put({ type: actionTypes.SET_SANTAN_SLIDER_VALUE, payload: time });
            }
        } finally {
            songTimeChannel.close();
        }
    }
}

function createSongTimeChannel(currentSong) {
    return eventChannel((emit) => {
        if (!currentSong || typeof currentSong.getCurrentTime !== 'function') {
            emit({ error: 'getCurrentTime function not available' });
            return () => { };
        }

        console.log('Started setInterval for tracking song time');

        // Direct Test - Ensure getCurrentTime is working
        currentSong.getCurrentTime((seconds) => {
            console.log('Direct Test - Current Time:', seconds);
        });

        const interval = setInterval(() => {
            console.log('Checking current time...'); // ✅ This should appear now
            currentSong.getCurrentTime((seconds) => {
                console.log('Seconds :: ', seconds);
                if (seconds !== undefined) {
                    emit({ time: seconds });
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            console.log('Interval cleared:', interval);
        };
    });
}

function* getSantanIntervalSoundTime(actions) {

    let task = null;
    try {
        // Listen for the GET_SANTAN_INTERVAL_SOUND_TIME action
        yield takeEvery(actionTypes.GET_SANTAN_INTERVAL_SOUND_TIME, function* () {
            // Get the play state of the song
            const isPlaying = yield select(state => state.sanatan.isPlayingSong);
            console.log('True ::: ', isPlaying)
            if (isPlaying) {
                if (!task) {
                    // If the song is playing and there's no active task, fork the task
                    task = yield fork(trackSongTime);
                }
            } else {
                if (task) {
                    // If the song is not playing, cancel the task
                    yield cancel(task);
                    task = null;
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function* getSantanShankhPlay(actions) {
    try {
        const { payload } = actions;

        const customer = yield select(state => state.customer.customerData);

        const response = yield postRequest({
            url: api_url + temple_wallet_add_deduct,
            data: {
                customerId: customer?._id,
                amount: payload?.data?.itemPrice,
                name: 'Shankh'
            }
        });

        console.log('Response ::: ', response);

        if (response?.animation) {
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: true });
            yield delay(2000);
            yield put({ type: actionTypes.SET_SHOW_LOTTIE_MUDRA, payload: false });
        }

        if (response?.success) {
            if (response?.show) {
                showToastMessage({ message: response?.message })
            }
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: true });
            payload?.dispatch(SanatanActions.setSantanMYthali(payload?.data?.itemImage));
            payload?.dispatch(SanatanActions.setSantanNormalGif(false));
            payload?.dispatch(SanatanActions.setSantanNormalthaliVisible(true));
            yield put({ type: actionTypes.SHOW_SANTAN_SHANKH_VISIBLE, payload: true });

            yield delay(payload?.duration)

            yield put({ type: actionTypes.SHOW_SANTAN_SHANKH_VISIBLE, payload: false });

            payload?.dispatch(SanatanActions.setSantanNormalthaliVisible(false));
            payload?.dispatch(SanatanActions.setSantanNormalGif(true));
            yield put({ type: actionTypes.SET_BOTTOM_LEFT, payload: false });

        } else {
            showToastMessage({ message: response?.message });
        }


    } catch (e) {
        console.log(e);
    }
}

function* getVardanShivalyaData() {
    try {
        const response = yield getRequest({
            url: api_url + 'admin/get-vardani-shivalya',
        });

        console.log('Vardan Shivalya Data Response ::: ', response);

        if (response?.success) {
            yield put({ type: actionTypes.SET_VARDAN_SHIVALYA_DATA, payload: response?.data });
        } else {
            showToastMessage({ message: response?.message });
        }
    } catch (e) {
        console.log(e);
    }
}


export default function* sanatanSaga() {
    yield takeLeading(actionTypes.GET_SANTAN_SOUND_AARTI, getSanatanSoundaarti);
    yield takeLeading(actionTypes.GET_SANTAN_SOUND_SHANKH, getSanatanSoundshankh);
    yield takeLeading(actionTypes.GET_SANTAN_SOUND_COCOUNT, getSanatanSoundCocount);
    yield takeLeading(actionTypes.GET_SANTAN_SOUND_BELL, getSanatanSOundBell);
    yield takeLeading(actionTypes.GET_SANTAN_SOUND_BELL_2, getSantanSoundBell2)
    yield takeLeading(actionTypes.GET_SANTAN_SELECTED_TOP, getSantanSelectedTop);
    yield takeLatest(actionTypes.GET_SANTAN_SHOW_THALI, getSantanShowThali);
    yield takeLeading(actionTypes.GET_SANTAN_THALI, getSantaThali);
    yield takeLatest(actionTypes.GET_SANTAN_SHOW_THALI_ANIMATION, getSantanShowThaliAnimation);
    yield takeLatest(actionTypes.GET_SANTAN_SOUND_PLAY_SOUND, getSantanSoundPlaySOund);
    yield takeLatest(actionTypes.GET_SANTAN_FOOL_ARPAN, getSantanFoolArpan);
    yield takeLatest(actionTypes.GET_SANTAN_COCOUNT_ARPAN, getSantanCocountArpan);
    yield takeLatest(actionTypes.GET_SANTAN_SONG_CURRENT_STATE_UPDATE, getSantanSongCurrentStateUpdate);
    yield takeLatest(actionTypes.GET_SANTAN_INTERVAL_SOUND_TIME, getSantanIntervalSoundTime);
    yield takeLatest(actionTypes.GET_SANTAN_SHANKH_PLAY, getSantanShankhPlay);
    yield takeLatest(actionTypes.GET_VARDAN_SHIVALYA_DATA, getVardanShivalyaData);
}