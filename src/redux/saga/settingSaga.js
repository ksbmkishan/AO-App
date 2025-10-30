import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actionTypes'
import { resetToScreen } from '../../navigations/NavigationServices';
import { getRequest, postRequest } from '../../utils/apiRequests';
import { api_url, base_url, get_customer_detail, Mycategory, welcomeMessage } from '../../config/constants';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { showToastMessage } from '../../utils/services';
function* getSplash(actions) {
    try {
        const { payload } = actions
        const customerData = yield AsyncStorage.getItem('customerData');
        const custData = JSON.parse(customerData);
        if (custData) {
            const response = yield postRequest({
                url: api_url + get_customer_detail,
                data: {
                    customerId: custData?._id,
                    unique_id: 'sdfsfsd'
                }
            })

            if (response?.success) {
                yield AsyncStorage.setItem('customerData', JSON.stringify(response?.customersDetail))
                yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.customersDetail })
                yield call(resetToScreen, 'home')
            } else {
                yield call(resetToScreen, 'login')
            }

        } else {
            yield call(resetToScreen, 'login')
        }
    } catch (e) {
        console.log(e, 'asdfasdf')
    }
}

function* getWelcomeMessagedata(actions) {
    try {
        const { payload } = actions
        console.log("payloadwelcome", payload)

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })


        const Response = yield getRequest({
            url: `https://api.astroone.in/api/chatbot/user/get_welcome_message?name=${payload?.name}`,



        })
        console.log(Response, 'ResponseSingh')

        if (Response) {
            yield put({ type: actionTypes.SET_WELCOME_MESSAGE, payload: Response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


function* getCategoryData(actions) {
    try {
        const { payload } = actions


        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })


        const Response = yield getRequest({
            url: api_url + Mycategory,



        })
        console.log(Response, 'ResponseCategoryData')

        if (Response) {
            yield put({ type: actionTypes.SET_CATEGORY_DATA, payload: Response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


function* getQuestionslist(actions) {
    try {
        const { payload } = actions;
        console.log("payloadQuestionslist", payload);

        const query = typeof payload?.question === 'string' ? payload.question : 'mental health';
        console.log('query', query);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const Response = yield getRequest({
            url: `https://api.astroone.in/api/chatbot/user/qa/related-questions?query=${query}`,
        });
        console.log(Response, 'ResponseQuestionslist');

        if (Response) {
            yield put({ type: actionTypes.SET_QUESTIONS_DATA, payload: Response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAnswerslist(actions) {
    try {
        const { payload } = actions;
        console.log("payloadAnswers", payload);


        const questionId = payload?.questionId
        console.log('questionId', questionId);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const Response = yield getRequest({
            url: `https://api.astroone.in/api/chatbot/user/qa/answer/${questionId}`,

        });
        console.log(Response, 'ResponseAnswerslist');

        if (Response) {
            yield put({ type: actionTypes.SET_ANSWERS_DATA, payload: Response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getRelatedQuestions(actions) {
    try {
        const { payload } = actions;
        console.log("payloadReleatd", payload);




        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const Response = yield getRequest({
            url: `https://api.astroone.in/api/chatbot/user/get_qa/search?keyword=${payload?.keyword}`,

        });
        console.log(Response, 'Responserelated');

        if (Response) {
            yield put({ type: actionTypes.SET_RELATED_QUESTIONS, payload: Response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getChatGptResponsedata(actions) {
    try {
        const { payload } = actions;
        console.log("payloadsagagpt", payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const customerData = yield select(state => state.customer.customerData);
        // const Response = yield postRequest({
        //     url: `https://api.astroone.in/api/chatbot/user/get_chatgpt_response`,
        //     data: {
        //         message: payload?.message,
        //         userId: payload?.userId,
        //         customerId: customerData?._id,
        //     }

        // });

        const Response = yield postRequest({
            url:'https://api.astroone.in/api/chatbot/user/ask_question',
            data:  {
                userId: payload?.userId,
                message:payload?.message,
                 customerId: customerData?._id,
                 language: payload?.language,
            }
        })
        console.log(Response, 'ChatGptResponse');
        if (Response) {
            yield put({ type: actionTypes.SET_CHAT_GPT_SEARCH, payload: Response });
            yield put({ type: actionTypes.GET_CUSTOMER_DATA});
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



function* getSavemesagestoDB(actions) {
    try {
        const { payload } = actions;
        console.log("payloadsave data king", payload);

        const customerData = yield select(state => state.customer.customerData);
        console.log("userIdemployee", customerData?._id);


        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const Response = yield postRequest({
            url: `https://api.astroone.in/api/chatbot/user/save_user_message`,
            data: {
                userId: customerData?._id,
                question: payload?.question,
                answer: payload?.answer,
            }

        });
        console.log(Response, 'haramiresponse');

        if (Response) {
            yield put({ type: actionTypes.SET_SAVE_MESSAGES, payload: Response?.data });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getDivyaRashiPlansdata(actions) {
    try {
        const { payload } = actions


        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })


        const Response = yield getRequest({
            url: `https://api.astroone.in/api/chatbot/admin/get_all_plan`,



        })
        console.log(Response, 'ResponseWelcomeMessage')

        if (Response) {
            yield put({ type: actionTypes.SET_DIVYA_PLANS, payload: Response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


function* getBuyPlansforchat(actions) {
    try {
        const { payload } = actions;
        console.log("payloadsave data", payload);

        const customerData = yield select(state => state.customer.customerData);
        console.log("userIdemployee", customerData?._id);


        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const Response = yield postRequest({
            url: `https://api.astroone.in/api/chatbot/user/purchase_plan`,
            data: {
                userId: customerData?._id,
                planId: payload?.planId,
                chatBotUserId: payload?.chatBotUserId
            }

        });
        console.log(Response, 'buyresponse');

        if (Response) {
            yield put({ type: actionTypes.SET_BUY_PLANS, payload: Response });
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
            showToastMessage({ message: Response?.message })

            if (typeof payload?.onSuccess === 'function') {
                payload.onSuccess();
            }

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getPlansHistory(actions) {
    try {
        const { payload } = actions;


        const customerData = yield select(state => state.customer.customerData);

        const userId = customerData?._id
        console.log("PlanHistoryuserId", userId);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const Response = yield getRequest({
            url: `https://api.astroone.in/api/chatbot/user/purchase_history/${userId}`,


        });
        console.log(Response, 'Historyplansresponse');

        if (Response) {
            yield put({ type: actionTypes.SET_PLANS_HISTORY, payload: Response?.data });



        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getUserDataSaveDB(actions) {
    try {
        const { payload } = actions

        const data = {

            ...payload?.data

        }
        console.log("hanumanadataa", data)


        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const Response = yield postRequest({
            url: `https://api.astroone.in/api/chatbot/user/create_chatbot_user`,
            data: {

                ...payload?.data
            }

        });
        console.log(Response, 'Save to db response');

        if (Response) {
            yield put({ type: actionTypes.SET_USER_DATA_DB, payload: Response?.data });
            // showToastMessage({ message: Response?.message });
            yield call(() => payload?.onComplete());

            // yield call(navigate, 'Chat')
            yield put({ type: actionTypes.GET_SAVED_PROFILES});

            if (payload?.onSuccess && typeof payload.onSuccess === 'function') {
                payload.onSuccess();
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}








function* getChatHistoryletter(actions) {
    try {
        const { payload } = actions;
        console.log("historysagapaylaod", payload);




        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const Response = yield postRequest({
            url: `https://api.astroone.in/api/chatbot/user/get_chat_history`,
            data: {

                userId: payload?.userId,
            }

        });
        console.log(Response, 'historywalaresponse///');

        if (Response) {
            yield put({ type: actionTypes.SET_CHAT_HISTORY_LETTER, payload: Response });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getSavedProfilesdata(actions) {
    try {
        const { payload } = actions;



        const customerData = yield select(state => state.customer.customerData);

        console.log("customerData_iddddd", customerData?._id)

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const Response = yield getRequest({
            url: `https://api.astroone.in/api/chatbot/user/by-creator/${customerData?._id}`,

        });
        console.log(Response, 'ResponseSavedProfiles');

        if (Response) {
            yield put({ type: actionTypes.SET_SAVED_PROFILES, payload: Response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onUpdatePin(actions) {
    try {
        const { payload } = actions;
        console.log("payloadpin", payload);
        
        const customerData = yield select(state => state.customer.customerData);
        console.log("customerDatapin", customerData);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        
        const Response = yield postRequest({
            url: `https://api.astroone.in/api/customers/update-set-pin`,
            data: {
                customerId: customerData?._id,
                pin: payload?.pin,
            }

        });
        console.log(Response, 'Responsepinupdate');
        
        if (Response) {
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
            showToastMessage({ message: Response?.message });
            
        }
        
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* onJoin(actions) {
    try {
        const { payload } = actions;
        console.log("payloadjoin", payload);
        const response = yield postRequest({
            url: `https://api.astroone.in/api/customers/join_temple`,
            data: {
                customerId: payload?.customerId,
            }
    }
        );
        console.log(response, 'Responsejoin');
        
        if (response?.success) {
            showToastMessage({ message: response?.message });
            yield put({ type: actionTypes.GET_CUSTOMER_DATA });
        }
    } catch (e) {
        console.log(e);
    }
}


export default function* settingSaga() {
    yield takeLeading(actionTypes.GET_SPLASH, getSplash);
    yield takeLeading(actionTypes.GET_WELCOME_MESSAGE, getWelcomeMessagedata);
    yield takeLeading(actionTypes.GET_CATEGORY_DATA, getCategoryData);
    yield takeLeading(actionTypes.GET_QUESTIONS_DATA, getQuestionslist);
    yield takeLeading(actionTypes.GET_ANSWERS_DATA, getAnswerslist);
    yield takeLeading(actionTypes.GET_RELATED_QUESTIONS, getRelatedQuestions);
    yield takeLeading(actionTypes.GET_CHAT_GPT_SEARCH, getChatGptResponsedata);
    yield takeLeading(actionTypes.GET_SAVE_MESSAGES, getSavemesagestoDB);
    yield takeLeading(actionTypes.GET_DIVYA_PLANS, getDivyaRashiPlansdata);
    yield takeLeading(actionTypes.GET_BUY_PLANS, getBuyPlansforchat);
    yield takeLeading(actionTypes.GET_PLANS_HISTORY, getPlansHistory);
    yield takeLeading(actionTypes.GET_USER_DATA_DB, getUserDataSaveDB);
    yield takeLeading(actionTypes.GET_CHAT_HISTORY_LETTER, getChatHistoryletter);
    yield takeLeading(actionTypes.GET_SAVED_PROFILES, getSavedProfilesdata);
    yield takeLeading(actionTypes.ON_UPDATE_PIN, onUpdatePin);
    yield takeLeading(actionTypes.ON_JOIN, onJoin);
}