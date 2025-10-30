import { all } from "redux-saga/effects";
import settingSaga from "./settingSaga";
import authSaga from "./authSaga";
import homeSaga from "./homeSaga"
import astrologerSaga from "./astrologerSaga";
import customerSaga from "./customerSaga";
import chatSaga from "./chatSaga";
import historySaga from "./historySaga";
import kundliSaga from "./kundliSaga";
import blogSaga from "./blogSaga";
import ecommerceSaga from "./ecommerceSaga";
import astromallSaga from "./astromallSaga";
import poojaSaga from "./poojaSaga";
import sanatanSaga from "./sanatanSaga";
import VrAndArSaga from "./VrAndArSaga";
import rechargeSaga from "./rechargeSaga";

export default function* rootSaga() {
    yield all([
        settingSaga(),
        authSaga(),
        homeSaga(),
        astrologerSaga(),
        customerSaga(),
        chatSaga(),
        historySaga(),
        kundliSaga(),
        blogSaga(),
        ecommerceSaga(),
        astromallSaga(),
        poojaSaga(),
        sanatanSaga(),
        VrAndArSaga(), // Assuming you have imported VrAndArSaga
        rechargeSaga(),
        ]);
}
