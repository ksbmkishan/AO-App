import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import {
  getRequest,
  kundliRequest,
  postRequest,
  postRequestNew,
} from '../../utils/apiRequests';
import {
  add_kundli,
  api_url,
  delete_kundli,
  delete_numerology,
  get_customer_kundli,
  get_kundli_basic_details,
  get_numerology,
  KP_Birth_Detailes,
  KP_PLANETS,
  match_data,
  match_save,
  Shivam_Api_Url,
} from '../../config/constants';
import { showToastMessage } from '../../utils/services';
import { navigate } from '../../navigations/NavigationServices';
import moment from 'moment';
import axios from 'axios';

function* createKundli(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const customerData = yield select(state => state.customer.customerData);
    const response = yield postRequest({
      url: api_url + add_kundli,
      data: { ...payload, customerId: customerData?._id },
    });
    console.log("response?.kundli?._id", response?.kundli?._id)
    if (response?.success) {
      showToastMessage({ message: 'Kundli created successfully' });
      yield put({ type: actionTypes.SET_CREATE_KUNDLI, payload: response?.kundli });
      yield call(navigate, 'NewShowKundli', { kundliId: response?.kundli?._id });
      yield put({ type: actionTypes.GET_ALL_KUNDLI, payload: null });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAllKundli(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const customerData = yield select(state => state.customer.customerData);
    const response = yield postRequest({
      url: api_url + get_customer_kundli,
      data: { customerId: customerData?._id },
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_KUNDLI, payload: response?.kundli });
      yield put({
        type: actionTypes.SET_ALL_MASTRER_KUNDLI,
        payload: response?.kundli,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteKundli(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield postRequest({
      url: api_url + delete_kundli,
      data: { kundliId: payload },
    });

    if (response?.success) {
      showToastMessage({ message: 'Kundli deleted successfully' });
      yield put({ type: actionTypes.GET_ALL_KUNDLI, payload: null });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliData(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    yield put({ type: actionTypes.SET_KUNDLI_ID, payload: payload?.kundliId });
    console.log('payload ::: Kundli adf ', payload);
    const basicDetailsResponse = yield postRequest({
      url: api_url + get_kundli_basic_details,
      data: {
        kundliId: payload?.kundliId ? payload?.kundliId : payload,
      },
    });

    console.log('basicDetailsResponse ', basicDetailsResponse);

    const data = {
      ...basicDetailsResponse?.payload,
      hour: parseInt(moment(basicDetailsResponse?.data?.tob).format('HH')),
      min: parseInt(moment(basicDetailsResponse?.data?.tob).format('mm')),
      gender: basicDetailsResponse?.data?.gender,
      name: basicDetailsResponse?.data?.name,
      place: basicDetailsResponse?.data?.place
    };

    if (basicDetailsResponse.success) {
      yield put({
        type: actionTypes.SET_KUNDLI_BASIC_DETAILS,
        payload: basicDetailsResponse?.data,
      });
      yield put({
        type: actionTypes.SET_KUNDLI_PAYLOADS,
        payload: {
          ...basicDetailsResponse?.payload,
          hour: parseInt(moment(basicDetailsResponse?.data?.tob).format('HH')),
          min: parseInt(moment(basicDetailsResponse?.data?.tob).format('mm')),
          gender: basicDetailsResponse?.data?.gender,
          name: basicDetailsResponse?.data?.name,
          place: basicDetailsResponse?.data?.place
        },
      });

      const payload3 = {
        ...basicDetailsResponse?.payload,
        hour: parseInt(moment(basicDetailsResponse?.data?.tob).format('HH')),
        min: parseInt(moment(basicDetailsResponse?.data?.tob).format('mm')),
        gender: basicDetailsResponse?.data?.gender,
        name: basicDetailsResponse?.data?.name,
        place: basicDetailsResponse?.data?.place
      }

      yield put({ type: actionTypes.GET_MY_BIRTH_DETAILES, payload: payload3 })

      yield put({ type: actionTypes.GET_KUNDLI_BIRTH_DETAILS, payload: data });
    }
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getPlanetData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log('kundliPayloads', kundliPayloads);
    console.log('payload:::>>', payload);

    const data = {
      name: String(kundliPayloads?.name),
      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),
      hour: String(kundliPayloads?.hour),
      min: String(kundliPayloads?.min),
      place: 'noida',
      latitude: String(kundliPayloads?.lat),
      longitude: String(kundliPayloads?.lon),
      timezone: String(kundliPayloads?.tzone),
      gender: String(kundliPayloads?.gender),
    };
    console.log('data>>>ravi', data);

    const planetResponse = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/planet/get_all_planet_data',
      data: {
        name: String(kundliPayloads?.name),
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: String(kundliPayloads?.place),
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: String(kundliPayloads?.gender),
      },
    });
    console.log('planetResponse>>>>>122333', responseData?.data[0]);
    if (planetResponse) {
      yield put({
        type: actionTypes.SET_PLANET_DATA,
        payload: response?.responseData?.data[0],
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// function* getKpPlanetData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         console.log("kundliPayloads::::>>",kundliPayloads)
//         const response = yield kundliRequest({
//             url: 'https://json.astrologyapi.com/v1/kp_horary',
//             data: {
//                 ...kundliPayloads,
//                 horary_number: 2
//             },
//             lang: payload?.lang
//         })
//    console.log("kpresponse::>",response)
//         if (response) {
//             yield put({ type: actionTypes.SET_KP_PLANET_DATA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }
function* getKpPlanetData(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const data = {
      name: String(kundliPayloads?.name),
      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),
      hour: String(kundliPayloads?.hour),
      min: String(kundliPayloads?.min),
      place: String(kundliPayloads?.place),
      latitude: String(kundliPayloads?.lat),
      longitude: String(kundliPayloads?.lon),
      timezone: String(kundliPayloads?.tzone),
      gender: String(kundliPayloads?.gender),
    };
    console.log('data', data);

    const response = yield kundliRequest({
      url: Shivam_Api_Url + KP_PLANETS,
      data: {
        name: String(kundliPayloads?.name),
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: String(kundliPayloads?.place),
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: String(kundliPayloads?.gender),
      },
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KP_PLANET_DATA,
        payload: response?.responseData?.data[0]?.planetData?.planetList,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
// function* getKpHouseCupsData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const response = yield kundliRequest({
//             url: 'https://json.astrologyapi.com/v1/kp_horary',
//             data: {
//                 ...kundliPayloads,
//                 horary_number: 2
//             },
//             lang: payload?.lang
//         })
//         console.log("response::>>",response)
//         if (response) {
//             yield put({ type: actionTypes.SET_KP_HOUSE_CUPS_DATA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

function* getKpHouseCupsData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/kp/get_house_significators',
      data: {
        name: String(kundliPayloads?.name),
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: String(kundliPayloads?.place),
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: String(kundliPayloads?.gender),
        lang: payload?.lang
      },
    });
    if (response) {
      yield put({
        type: actionTypes.SET_KP_HOUSE_CUPS_DATA,
        payload:
          response?.responseData?.data[0]?.houseSignificatorsData
            ?.houseSignificators,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getKpPlanetCupsData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/kp/get_planet_significators',
      data: {
        name: String(kundliPayloads?.name),
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: String(kundliPayloads?.place),
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: String(kundliPayloads?.gender),
        lang: payload?.lang
      },
    });
    console.log('KPplanetsignificators', response);
    if (response) {
      yield put({
        type: actionTypes.SET_KP_PLANET_CUPS_DATA,
        payload:
          response?.responseData?.data[0]?.planetSignificatorsData
            ?.planetSignificators,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getKpBirthDetails(actions) {
  try {
    const { payload } = actions;
    console.log('PALANUJ', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    const response = yield kundliRequest({
      url: Shivam_Api_Url + KP_Birth_Detailes,
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });
    console.log('kpbirthdetails....///', response);
    if (response) {
      yield put({
        type: actionTypes.SET_KP_BIRTH_DETAILS,
        payload: response?.responseData?.data,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* RashiReportData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const moonReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_rashi_report/moon`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const mercuryReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_rashi_report/mercury`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const marsReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_rashi_report/mars`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const venusReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_rashi_report/venus`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const saturnReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_rashi_report/saturn`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const jupiterReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_rashi_report/jupiter`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const data = {
      moonReports,
      mercuryReports,
      marsReports,
      saturnReports,
      venusReports,
      jupiterReports,
    };

    yield put({ type: actionTypes.SET_RASHI_REPORTS, payload: data });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* AstakVargaData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    console.log(kundliPayloads);

    const ascendantReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/ascendant`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const sunReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/sun`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const moonReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/moon`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const mercuryReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/mercury`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const marsReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/mars`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const venusReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/venus`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const saturnReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/saturn`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const jupiterReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak/jupiter`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const ascendantchart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/ascendant`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const sunchart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/sun`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const moonchart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/moon`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const mercurychart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mercury`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const marschart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mars`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const venuschart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/venus`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const saturnchart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/saturn`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const jupiterchart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/planet_ashtak_image/jupiter`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const data = {
      sunReports,
      ascendantReports,
      moonReports,
      mercuryReports,
      marsReports,
      saturnReports,
      venusReports,
      jupiterReports,
      sunchart,
      ascendantchart,
      moonchart,
      mercurychart,
      marschart,
      saturnchart,
      venuschart,
      jupiterchart,
    };

    yield put({ type: actionTypes.SET_ASTAK_REPORTS, payload: data });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* SarVargaData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log('adfas', kundliPayloads);
    const sarvashtak = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/sarvashtak`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const sarvashtakchart = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/sarvashtak_image`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const data = {
      sarvashtak,
      sarvashtakchart,
    };

    yield put({ type: actionTypes.SET_SARVA_REPORTS, payload: data });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* AscendantData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log('adfas', kundliPayloads);
    const AscedentReport = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const data = {
      AscedentReport,
    };

    yield put({ type: actionTypes.SET_ASCEDENT_REPORTS, payload: data });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* MatchingAscendantData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log('adfas', kundliPayloads);
    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const m_data = {
      day: parseInt(moment(kundliDataMale?.dob).format('D')),
      month: parseInt(moment(kundliDataMale?.dob).format('M')),
      year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
      hour: parseInt(moment(kundliDataMale.tob).format('hh')),
      min: parseInt(moment(kundliDataMale.tob).format('mm')),
      lat: kundliDataMale.lat,
      lon: kundliDataMale.lon,
      tzone: 5.5,
    };
    const f_data = {
      day: parseInt(moment(kundliDataFemale?.dob).format('D')),
      month: parseInt(moment(kundliDataFemale?.dob).format('M')),
      year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
      hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
      min: parseInt(moment(kundliDataFemale.tob).format('mm')),
      lat: kundliDataFemale?.lat,
      lon: kundliDataFemale?.lon,
      tzone: 5.5,
    };
    const AscedentReportM = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
      data: {
        ...m_data,
      },
      lang: payload?.lang,
    });
    const AscedentReporF = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
      data: {
        ...f_data,
      },
      lang: payload?.lang,
    });

    const data = {
      AscedentReportM,
      AscedentReporF,
    };

    yield put({ type: actionTypes.SET_ASCEDENT_MATCHING_REPORTS, payload: data });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* NumerologyData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log('adfas', kundliPayloads);
    const Numero = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/numero_table`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const data = {
      Numero,
    };

    yield put({ type: actionTypes.SET_BASIC_PANCHANGE, payload: data });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliChart(actions) {
  try {
    const { payload } = actions;
    // console.log('payload ::::', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const chartResponse = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    // console.log(chartResponse)
    if (chartResponse) {
      yield put({ type: actionTypes.SET_KUNDLI_CHARTS, payload: chartResponse });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getChartImage(actions) {
  const { payload } = actions;
  yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
  const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

  const kundliRequestData = {
    ...kundliPayloads,
    lang: payload?.lang,
  };
  console.log('kundliRequestData', kundliRequestData);
  const url = `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`;
  console.log('payload :::', kundliRequestData, url);
  try {
    if (payload?.data == 'chalit') {
      const data = yield kundliRequest({
        url: `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`,
        data: kundliRequestData,
        lang: payload?.lang,
      });
      console.log(data, 'kundliRequestData::::::');

      // const modifiedChartData = data.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
      // const chartData1 = modifiedChartData.replace('<text font-size="14" x="158.5" y="179.95" style="fill: black;">', '<text font-size="15" x="148.5" y="179.95" style="fill: black;">');
      // const newchart = chartData1.replace('</g>', '<path d="M340,175L340,340L257.5,257.5" stroke="black" stroke-width="1" fill="none"></path></g>');

      if (data) {
        yield put({ type: actionTypes.SET_KUNDLI_CHARTS_IMAGE, payload: data });
      }
    } else {
      const data = yield kundliRequest({
        url: `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`,
        data: kundliRequestData,
        lang: payload?.lang,
      });

      // const modifiedChartData = data.svg.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
      // const chartData1 = modifiedChartData.replace('<text font-size="15" x="158.5" y="179.95" style="fill: black;">', '<text font-size="15" x="148.5" y="179.95" style="fill: black;">');
      // const newchart = chartData1.replace('</g>', '<path d="M340,175L340,340L257.5,257.5" stroke="black" stroke-width="1" fill="none"></path></g>');
      if (data) {
        yield put({ type: actionTypes.SET_KUNDLI_CHARTS_IMAGE, payload: data });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getSaptmashaChart(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const dataM = {
      day: parseInt(moment(kundliDataMale?.dob).format('D')),
      month: parseInt(moment(kundliDataMale?.dob).format('M')),
      year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
      hour: parseInt(moment(kundliDataMale.tob).format('hh')),
      min: parseInt(moment(kundliDataMale.tob).format('mm')),
      lat: kundliDataMale.lat,
      lon: kundliDataMale.lon,
      tzone: 5.5,
    };
    const dataF = {
      day: parseInt(moment(kundliDataFemale?.dob).format('D')),
      month: parseInt(moment(kundliDataFemale?.dob).format('M')),
      year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
      hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
      min: parseInt(moment(kundliDataFemale.tob).format('mm')),
      lat: kundliDataFemale?.lat,
      lon: kundliDataFemale?.lon,
      tzone: 5.5,
    };

    const chartResponseMA = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/horo_chart/D7`,
      data: dataM,
      lang: payload?.lang,
    });
    console.log('res ==', chartResponseMA);

    const chartResponseFA = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/horo_chart/D7`,
      data: dataF,
      lang: payload?.lang,
    });

    const response = {
      chartResponseMA,
      chartResponseFA,
    };

    console.log(chartResponseFA, 'this response of chart');
    if (response) {
      yield put({ type: actionTypes.SET_KUNDLI_D7_CHARTS, payload: response });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getNavmashaChart(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const dataM = {
      day: parseInt(moment(kundliDataMale?.dob).format('D')),
      month: parseInt(moment(kundliDataMale?.dob).format('M')),
      year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
      hour: parseInt(moment(kundliDataMale.tob).format('hh')),
      min: parseInt(moment(kundliDataMale.tob).format('mm')),
      lat: kundliDataMale.lat,
      lon: kundliDataMale.lon,
      tzone: 5.5,
    };
    const dataF = {
      day: parseInt(moment(kundliDataFemale?.dob).format('D')),
      month: parseInt(moment(kundliDataFemale?.dob).format('M')),
      year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
      hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
      min: parseInt(moment(kundliDataFemale.tob).format('mm')),
      lat: kundliDataFemale?.lat,
      lon: kundliDataFemale?.lon,
      tzone: 5.5,
    };

    const chartResponseM = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/horo_chart/D9`,
      data: {
        ...dataM,
      },
      lang: payload?.lang,
    });
    const chartResponseF = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/horo_chart/D9`,
      data: {
        ...dataF,
      },
      lang: payload?.lang,
    });

    const response = {
      chartResponseM,
      chartResponseF,
    };

    console.log('navamashaa cart', response);
    if (response) {
      yield put({ type: actionTypes.SET_KUNDLI_D9_CHARTS, payload: response });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliBirthDetails(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'getKundliBirthDetails kundli payload');

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/birth_details`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_BIRTH_DETAILS,
        payload: response,
      });
    }
    console.log('CheckTheKundliBirtDetailsData:::', response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliMajorDasha(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/major_vdasha`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({ type: actionTypes.SET_KUNDLI_MAJOR_DASHA, payload: response });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliSubVDasha(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/sub_vdasha/${payload}`,
      data: {
        ...kundliPayloads,
      },
    });

    if (response?.status) {
      yield put({
        type: actionTypes.SET_KUNDLI_DASHA_PATH,
        payload: `${payload?.plant}/`,
      });
      yield put({ type: actionTypes.SET_KUNDLI_SUB_V_DASHA, payload: response });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliSubSubVDasha(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    const dashaPath = yield select(state => state.kundli.dashaPath);
    console.log(dashaPath);
    console.log(
      `https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload?.plant}`,
    );
    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload?.plant}`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_DASHA_PATH,
        payload: `${dashaPath}${payload}/`,
      });
      yield put({
        type: actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliSubSubSubVDasha(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    const dashaPath = yield select(state => state.kundli.dashaPath);
    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/sub_sub_sub/vdasha/${dashaPath}${payload?.plant}`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_DASHA_PATH,
        payload: `${dashaPath}${payload}`,
      });
      yield put({
        type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliSubSubSubSubVDasha(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    const dashaPath = yield select(state => state.kundli.dashaPath);
    console.log(payload?.plant);
    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/sub_sub_sub_sub/vdasha/${dashaPath}${payload?.plant}`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_DASHA_PATH,
        payload: `${dashaPath}${payload}`,
      });
      yield put({
        type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliHouseReports(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log('YUILUYUIOY', kundliPayloads);

    const sunReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_house_report/sun`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const moonReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_house_report/moon`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const mercuryReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_house_report/mercury`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const marsReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_house_report/mars`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const venusReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_house_report/venus`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const saturnReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_house_report/saturn`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });
    const jupiterReports = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/general_house_report/jupiter`,
      data: {
        ...kundliPayloads,
      },
      lang: payload?.lang,
    });

    const data = {
      sunReports,
      moonReports,
      mercuryReports,
      marsReports,
      saturnReports,
      venusReports,
      jupiterReports,
    };

    yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAsstkoota(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const data = {
      boyName: kundliDataMale?.name,
      boyDay: parseInt(moment(kundliDataMale?.dob).format('DD')).toString(),
      boyMonth: parseInt(moment(kundliDataMale?.dob).format('MM')).toString(),
      boyYear: parseInt(moment(kundliDataMale?.dob).format('YYYY')).toString(),
      boyHour: parseInt(moment(kundliDataMale.tob).format('HH')).toString(),
      boyMin: parseInt(moment(kundliDataMale.tob).format('mm')).toString(),
      boyPlace: kundliDataMale?.place,
      boyLatitude: kundliDataMale?.lat?.toString() || '',
      boyLongitude: kundliDataMale?.lon?.toString() || '',
      boyTimezone: "5.5",
      boyGender: 'male',

      girlName: kundliDataFemale?.name,
      girlDay: parseInt(moment(kundliDataFemale?.dob).format('DD')).toString(),
      girlMonth: parseInt(moment(kundliDataFemale?.dob).format('MM')).toString(),
      girlYear: parseInt(moment(kundliDataFemale?.dob).format('YYYY')).toString(),
      girlHour: parseInt(moment(kundliDataFemale.tob).format('HH')).toString(),
      girlMin: parseInt(moment(kundliDataFemale.tob).format('mm')).toString(),
      girlPlace: kundliDataFemale?.place,
      girlLatitude: kundliDataFemale?.lat?.toString() || '',
      girlLongitude: kundliDataFemale?.lon?.toString() || '',
      girlTimezone: "5.5",
      girlGender: 'female',
      lang: payload?.lang
    };

    console.log('match data :: ', data);

    const response = yield kundliRequest({
      url: Shivam_Api_Url + 'kundali/get_asthakoota_data',
      data: {
        ...data,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS,
        payload: response?.responseData?.data,
      });
      console.log('CheckTheGetAstkootData:::', response);
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getDaskoota(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const data = {
      m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
      m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
      m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
      m_hour: parseInt(moment(kundliDataMale.tob).format('HH')),
      m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
      m_lat: kundliDataMale.lat,
      m_lon: kundliDataMale.lon,
      m_tzone: 5.5,
      f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
      f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
      f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
      f_hour: parseInt(moment(kundliDataFemale.tob).format('HH')),
      f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
      f_lat: kundliDataFemale?.lat,
      f_lon: kundliDataFemale?.lon,
      f_tzone: 5.5,
    };

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/match_dashakoot_points`,
      data: {
        ...data,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS,
        payload: response,
      });
      // yield call(navigate, 'basicmatch')
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getMatchConclusion(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const data = {
      m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
      m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
      m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
      m_hour: parseInt(moment(kundliDataMale.tob).format('HH')),
      m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
      m_lat: kundliDataMale.lat,
      m_lon: kundliDataMale.lon,
      m_tzone: 5.5,
      f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
      f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
      f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
      f_hour: parseInt(moment(kundliDataFemale.tob).format('HH')),
      f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
      f_lat: kundliDataFemale?.lat,
      f_lon: kundliDataFemale?.lon,
      f_tzone: 5.5,
    };

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/match_manglik_report`,
      data: {
        ...data,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getMatchReport(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const data = {
      m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
      m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
      m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
      m_hour: parseInt(moment(kundliDataMale.tob).format('HH')),
      m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
      m_lat: kundliDataMale.lat,
      m_lon: kundliDataMale.lon,
      m_tzone: 5.5,
      f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
      f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
      f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
      f_hour: parseInt(moment(kundliDataFemale.tob).format('HH')),
      f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
      f_lat: kundliDataFemale?.lat,
      f_lon: kundliDataFemale?.lon,
      f_tzone: 5.5,
    };

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/match_ashtakoot_points`,
      data: {
        ...data,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS,
        payload: response,
      });
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getMatchBasicAstro(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataMale, 'sdfsdfsdf');
    const data = {
      m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
      m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
      m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
      m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
      m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
      m_lat: kundliDataMale.lat,
      m_lon: kundliDataMale.lon,
      m_tzone: 5.5,
      f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
      f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
      f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
      f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
      f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
      f_lat: kundliDataFemale?.lat,
      f_lon: kundliDataFemale?.lon,
      f_tzone: 5.5,
    };

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/match_astro_details
`,
      data: {
        ...data,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({ type: actionTypes.SET_BASIC_ASTRO_POINTS, payload: response });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKundliMatchingReport(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    console.log(payload);

    const response = yield kundliRequest({
      url: `https://json.astrologyapi.com/v1/match_birth_details`,
      data: {
        ...payload,
      },
      lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KUNDLI_BASIC_DETAILS_MATCHING,
        payload: response,
      });
      console.log('Matching report dispatched to store:', response);
      // yield call(navigate, 'basicmatch')
      // yield call(navigate, 'MyMatching');
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* viewKundliFromKundliMatching(actions) {
  try {
    const { payload } = actions;
    if (payload === 'male') {
      const kundliData = yield select(state => state.kundli.maleKundliData);
      console.log('kundliData', kundliData);
      const data = {
        day: parseInt(moment(kundliData.dob).format('D')),
        month: parseInt(moment(kundliData.dob).format('M')),
        year: parseInt(moment(kundliData.dob).format('YYYY')),
        hour: parseInt(moment(kundliData.tob).format('hh')),
        min: parseInt(moment(kundliData.tob).format('mm')),
        lat: kundliData.lat,
        lon: kundliData.lon,
        tzone: 5.5,
        name: kundliData.name,
        place: kundliData.place,
        gender: kundliData.gender,
      };
      yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data });
      yield put({
        type: actionTypes.SET_KUNDLI_BASIC_DETAILS,
        payload: kundliData,
      });
      yield call(navigate, 'showKundli', { type: 'matching' });
    } else {
      const kundliData = yield select(state => state.kundli.femaleKundliData);
      console.log('kundliData', kundliData);
      const data = {
        day: parseInt(moment(kundliData.dob).format('D')),
        month: parseInt(moment(kundliData.dob).format('M')),
        year: parseInt(moment(kundliData.dob).format('YYYY')),
        hour: parseInt(moment(kundliData.tob).format('hh')),
        min: parseInt(moment(kundliData.tob).format('mm')),
        lat: kundliData.lat,
        lon: kundliData.lon,
        tzone: 5.5,
        name: kundliData.name,
        place: kundliData.place,
        gender: kundliData.gender,
      };
      yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data });
      yield put({
        type: actionTypes.SET_KUNDLI_BASIC_DETAILS,
        payload: kundliData,
      });
      yield call(navigate, 'showKundli', { type: 'matching' });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getOpenNumerology(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const customerData = yield select(state => state.customer.customerData);
    const response = yield postRequestNew({
      url: api_url + get_numerology,
      data: {
        customerId: customerData?._id,
      },
    });
    console.log('Get Open Num Saga Response ::: ', response);
    console.log('Get Open Num Saga Response Data ::: ', response?.data);
    if (response?.success) {
      yield put({
        type: actionTypes.SET_OPEN_NUMEROLOGY,
        payload: response?.data,
      });
    } else {
      yield put({ type: actionTypes.SET_OPEN_NUMEROLOGY, payload: [] });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_OPEN_NUMEROLOGY, payload: [] });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* getDeleteNumerology(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield postRequestNew({
      url: api_url + delete_numerology,
      data: {
        ...payload,
      },
    });
    console.log('Delete Numerology Saga ::: ', response);
    console.log(response?.message, 'delete data ');
    if (response?.success) {
      // yield put({ type: actionTypes.SET_DELETE_NUMEROLOGY, payload: response?.data })
      yield put({ type: actionTypes.GET_OPEN_NUMEROLOGY, payload: null });
      showToastMessage({ message: response?.message });
    } else {
      yield put({ type: actionTypes.GET_OPEN_NUMEROLOGY, payload: null });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    yield put({ type: actionTypes.GET_OPEN_NUMEROLOGY, payload: null });
  }
}

// function* getRulingPlanets(actions) {
//     try {
//         const { payload } = actions
//         console.log("shibbuu", payload)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         console.log(kundliPayloads, "HYUILHI")
//         const response = yield kundliRequest({
//             url: "https://kundli2.astrosetalk.com/api/kp/get_ruling_planets",
//             data: {
//                 name: payload?.name,
//                 day: String(kundliPayloads?.day),
//                 month: String(kundliPayloads?.month),
//                 year: String(kundliPayloads?.year),
//                 hour: String(kundliPayloads?.hour),
//                 min: String(kundliPayloads?.min),
//                 place: payload?.place,
//                 latitude: String(kundliPayloads?.lat),
//                 longitude: String(kundliPayloads?.lon),
//                 timezone: String(kundliPayloads?.tzone),
//                 gender: payload?.gender,
      
//             }
//         })
//         console.log("Ruling Planets Data", JSON.stringify(response?.responseData?.data[0]?.rulingPlanetsData?.rulingPlanets));
//         if (response) {
//             yield put({ type: actionTypes.SET_RULING_PLANETS, payload: JSON.stringify(response?.responseData?.data[0]?.rulingPlanetsData?.rulingPlanets) })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

function* getRulingPlanets(actions) {
  try {
    const { payload } = actions;
    console.log('shibbuu', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI');

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/kp/get_ruling_planets',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'Ruling Planets Data',
      response?.responseData?.data[0]?.rulingPlanetsData?.rulingPlanets,
    );

    if (response) {
      yield put({
        type: actionTypes.SET_RULING_PLANETS,
        payload:
          response?.responseData?.data[0]?.rulingPlanetsData?.rulingPlanets,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKpCusps(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/kp/get_cusps_data',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'Cuspsdata',
      response?.responseData?.data[0]?.cuspsData?.cuspsList,
    );

    if (response) {
      yield put({
        type: actionTypes.SET_KP_CUSPS,
        payload: response?.responseData?.data[0]?.cuspsData?.cuspsList,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getMyNum2(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {
      name: payload?.name,
      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),
      hour: String(kundliPayloads?.hour),
      min: String(kundliPayloads?.min),
      place: payload?.place,
      latitude: String(kundliPayloads?.lat),
      longitude: String(kundliPayloads?.lon),
      timezone: String(kundliPayloads?.tzone),
      gender: payload?.gender,
        lang: payload?.lang
    }
    console.log("shreegoverdhanmaharaj", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get_details',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log('Mynumwwwwwww', response?.responseData?.data[0]);

    if (response) {
      yield put({
        type: actionTypes.SET_MY_NUM,
        payload: response?.responseData?.data[0],
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getMyluckyGemstonedata(actions) {
  try {
    const { payload } = actions;
    console.log('Luckypayloadsaga', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {
      zodiacNumber: payload?.zodiacNumber
    }
    console.log("sambhajimaharajdata", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/gemstone/recommendation',
      data: {
        zodiacNumber: payload?.zodiacNumber,
        lang: payload?.lang
      },
    });

    console.log('responseresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_LUCKY_GEMSTONE,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getMyHealthstonedata(actions) {
  try {
    const { payload } = actions;
    console.log('Healthpayloadsaga', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {
      zodiacNumber: payload?.zodiacNumber
    }
    console.log("Healthdatajiii", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/gemstone/recommendation',
      data: {
        zodiacNumber: payload?.zodiacNumber,
        lang: payload?.lang
      },
    });

    console.log('responseresponseresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_HEALTH_GEMSTONE,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getEducationstonedata(actions) {
  try {
    const { payload } = actions;
    console.log('Educationpayloadsaga', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {
      zodiacNumber: payload?.zodiacNumber
    }
    console.log("EDUCATIONJIIII", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/gemstone/recommendation',
      data: {
        zodiacNumber: payload?.zodiacNumber,
        lang: payload?.lang
      },
    });

    console.log('responseresponseresponseresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_EDUCATION_GEMSTONE,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* getLoshuGrid(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),

    }
    console.log("Loshupaylaod", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get_loshu_grid',
      data: {

        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        lang: payload?.lang

      },
    });

    console.log('LoshuGriddata', response);

    if (response) {
      yield put({
        type: actionTypes.SET_LOSHU_GRID,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getArrowsdata(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),

    }
    console.log("shree", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get_arrows',
      data: {

        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        lang: payload?.lang

      },
    });

    console.log('Arrowssagaresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_ARROWS,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getExpressionsdata(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      name: String(payload?.name,),

    }
    console.log("shreegoverdhanmaharaj", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get-planes-of-expression',
      data: {
        fullName: String(payload?.name,),
        lang: payload?.lang
      },
    });

    console.log('sihhuuu', response);

    if (response) {
      yield put({
        type: actionTypes.SET_EXPRESSIONS,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getLaalkitabnew(actions) {
  try {
    const { payload } = actions;
    console.log('kitabsagapayload', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {
      planet: payload?.planet,
      house: payload?.house,
      lang: payload?.lang

    }
    console.log("laalkitabwaaladata", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/planet/GetSpecificPlanethousePlacement',
      data: {

        planet: payload?.planet,
        house: payload?.house,
        lang: payload?.lang

      },
    });

    console.log('laalkitabkahresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_NEW_LAALKITAAB,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}




function* getNAMEnumerology(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      name: String(payload?.name),
      system: payload?.system

    }
    console.log("shreemaankahnaam", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get_name_number',
      data: {
        fullName: String(payload?.name),
        system: payload?.system
      },
    });

    console.log('shreemaankahnaamresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_NAME_NUMEROLOGY,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getNAMEnumerology2(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      name: String(payload?.name),
      system: payload?.system

    }
    console.log("shreemaankahnaam", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get_name_number',
      data: {
        fullName: String(payload?.name),
        system: payload?.system
      },
    });

    console.log('shreemaankahnaamresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_NAME_NUMEROLOGY2,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* getYearnumber(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),

    }
    console.log("shreeDATAYEAR", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get-personal-year',
      data: {

        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        targetYear: String(kundliPayloads?.year),

      },
    });

    console.log('yearresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_PERSNAL_YEAR,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getMonthNumber(actions) {
  try {
    const { payload } = actions;
    console.log('monthpaylaodsaga', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {


      month: String(kundliPayloads?.month),
      personalYearNumber: String(payload?.personalYearNumber)

    }
    console.log("shreeDATAMonth", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get-personal-month',
      data: {


        month: String(kundliPayloads?.month),
        personalYearNumber: String(payload?.personalYearNumber)
      },
    });

    console.log('Monthresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_PERSNAL_MONTH,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getPersnalday(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      day: kundliPayloads?.day,
      month: kundliPayloads?.month,
      year: kundliPayloads?.year,

    }
    console.log("Loshupaylaod", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get-personal-day',
      data: {

        day: kundliPayloads?.day,
        month: kundliPayloads?.month,
        year: kundliPayloads?.year,


      },
    });

    console.log('Persnalday', response);

    if (response) {
      yield put({
        type: actionTypes.SET_LOSHU_GRID,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* getDayNumber(actions) {
  try {
    const { payload } = actions;
    console.log('DAYpaylaodsaga', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {

      day: String(kundliPayloads?.day),

      personalMonthNumber: String(payload?.personalMonthNumber)

    }
    console.log("DAYDATADAY", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/numerlogy/get-personal-day',
      data: {


        day: String(kundliPayloads?.day),

        personalMonthNumber: String(payload?.personalMonthNumber)
      },
    });

    console.log('DAYresponse', response);

    if (response) {
      yield put({
        type: actionTypes.SET_NUM_DAY,
        payload: response,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}






function* getAllPlanets(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/planet//get_all_planet_data',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'Mygrah------',
      response?.responseData?.data[0]?.planetData?.planetList,
    );

    if (response) {
      yield put({
        type: actionTypes.SET_PLANETS,
        payload: response?.responseData?.data[0]?.planetData?.planetList,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetMyVimhotri(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_maha_dasha',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'Mygrah------',
      response?.responseData?.data[0]?.vimshottaryMahaDashaData
        ?.vimshottaryMahaDashaList,
    );

    if (response) {
      yield put({
        type: actionTypes.SET_MY_VIMHOTRI,
        payload:
          response?.responseData?.data[0]?.vimshottaryMahaDashaData
            ?.vimshottaryMahaDashaList,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetMyAntarDasha(actions) {
  try {
    const { payload } = actions;
    console.log("shibajiii", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_antar_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang,
        mahaDashaLord: payload?.mahaDashaLord
      }
    });

    console.log("---->>????", response?.responseData?.data[0]?.vimshottaryAntarDashaData);

    if (response) {
      yield put({ type: actionTypes.SET_ANTAR_VIM, payload: response?.responseData?.data[0]?.vimshottaryAntarDashaData });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetPratiyatamData(actions) {
  try {
    const { payload } = actions;
    console.log("123456789", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_pratyantar_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang,
        mahaDashaLord: payload?.mahaDashaLord,
        antarDashaLord: payload?.antarDashaLord

      }
    });

    console.log("7042180899", response?.responseData?.data[0]?.vimshottaryPratyantarDashaData?.vimshottaryPratyantarDashaList);

    if (response) {

      yield put({ type: actionTypes.SET_PRATYANTRADESH_DATA, payload: response?.responseData?.data[0]?.vimshottaryPratyantarDashaData?.vimshottaryPratyantarDashaList });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}




function* getAllPredictions(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/prediction/get_prediction',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'CheckPredicionResponse',
      response?.responseData?.data[0]?.prediction,
    );

    if (response) {
      yield put({
        type: actionTypes.SET_PREDICTION,
        payload: response?.responseData?.data[0]?.prediction,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetSun2Chart(actions) {
  try {
    const { payload } = actions;
    console.log("hareraam222", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_sun_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("arpikllll", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_SUN2_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetMoon2Chart(actions) {
  try {
    const { payload } = actions;
    console.log("anujjj", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_moon_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
        
      }
    });


    console.log("arpikllll", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_MOON2_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getAllSadeSati(actions) {
  try {
    const { payload } = actions;
    console.log('shibajiii', payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, 'HYUILHI>>>???');

    const data = {
      name: payload?.name,
      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),
      hour: String(kundliPayloads?.hour),
      min: String(kundliPayloads?.min),
      place: payload?.place,
      latitude: String(kundliPayloads?.lat),
      longitude: String(kundliPayloads?.lon),
      timezone: String(kundliPayloads?.tzone),
      gender: payload?.gender,
        lang: payload?.lang
    }
    console.log("pallavitesting", data)

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/dosha/sadhesati_analysis',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'CheckPredicionResponse',
      response?.responseData?.data
    );

    if (response) {
      yield put({
        type: actionTypes.SET_SADHESATI,
        payload: response?.responseData?.data
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getKaalSarpDoshaData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/dosha/kalsharp_dosh_analysis',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'CheckPredicionResponse',
      response?.responseData?.data
    );

    if (response) {
      yield put({
        type: actionTypes.SET_KAALSARPDOSHA,
        payload: response?.responseData?.data
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getGeminiData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/gemini/get_gemini_data',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
        
      },
    });

    console.log(
      'CheckGeminiData::KKK',
      response?.responseData?.data
    );

    if (response) {
      yield put({
        type: actionTypes.SET_GEMINIDATA,
        payload: response?.responseData?.data
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* getCharDashData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/gemini/get_char_dasha_data',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      
      },
    });

    console.log(
      'CheckGeminiData::KKK',
      response?.responseData?.data
    );

    if (response) {
      yield put({
        type: actionTypes.SET_CHARDASHA,
        payload: response?.responseData?.data[0]?.charDashaData
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getKarkanshaChartData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const response = yield kundliRequest({
      url: 'https://kundli2.astrosetalk.com/api/gemini/get_karkansha_chart',
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    console.log(
      'CheckGeminiData::KKK',
      response?.responseData?.data
    );

    if (response) {
      yield put({
        type: actionTypes.SET_KARKANSHA_CHART,
        payload: response?.responseData?.data[0]?.chartData
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* GetSookhamData(actions) {
  try {
    const { payload } = actions;
    console.log("9069590284", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_sookshma_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang,
        mahaDashaLord: payload?.mahaDashaLord,
        antarDashaLord: payload?.antarDashaLord,
        pratyantarDashaLord: payload?.pratyantarDashaLord

      }
    });

    console.log("pal124566", response?.responseData?.data[0]?.vimshottarySookshmaDashaData);

    if (response) {

      yield put({ type: actionTypes.SET_SOOKHAMDASAHA_DATA, payload: response?.responseData?.data[0]?.vimshottarySookshmaDashaData });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetYoginaData(actions) {
  try {
    const { payload } = actions;
    console.log("HJ78988", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_yogini_maha_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang


      }
    });

    console.log("sadjjjjj", response?.responseData?.data[0]?.yoginiMahaDashaData);

    if (response) {

      yield put({ type: actionTypes.SET_YOGINA_DASHA, payload: response?.responseData?.data[0]?.yoginiMahaDashaData });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetPranamData(actions) {
  try {
    const { payload } = actions;
    console.log("7042180899", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_pran_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang,
        mahaDashaLord: payload?.mahaDashaLord,
        antarDashaLord: payload?.antarDashaLord,
        pratyantarDashaLord: payload?.pratyantarDashaLord,
        sookshmaDashaLord: payload?.sookshmaDashaLord

      }
    });

    console.log("lllll45465454", response?.responseData?.data[0]?.vimshottaryPranDashaData);

    if (response) {

      yield put({ type: actionTypes.SET_PRANAMDASA_DATA, payload: response?.responseData?.data[0]?.vimshottaryPranDashaData });
      console.log("ghjhgj", payload)
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetCurrentVimData(actions) {
  try {
    const { payload } = actions;
    console.log("9319995366", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_vimshottary_current_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang


      }
    });

    console.log("898976456687", response?.responseData?.data[0]?.vimshottaryCurrentDashaData);

    if (response) {

      yield put({ type: actionTypes.SET_CURRENT_VIM_DASHA, payload: response?.responseData?.data[0]?.vimshottaryCurrentDashaData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* GetCurrentYoginiData(actions) {
  try {
    const { payload } = actions;
    console.log("bhole", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_yogini_current_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang


      }
    });

    console.log("maaataa", response?.responseData?.data[0]?.yoginiCurrentDashaData);

    if (response) {

      yield put({ type: actionTypes.SET_CURRENT_YOGINI_DASHA, payload: response?.responseData?.data[0]?.yoginiCurrentDashaData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetAnterYoginiData(actions) {
  try {
    const { payload } = actions;
    console.log("bhole", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dasha/get_yogini_antar_dasha",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang,
        mahaDashaYogini: payload?.mahaDashaYogini
      }
    });


    console.log("baapu", response?.responseData?.data[0]);

    if (response) {

      yield put({ type: actionTypes.SET_ANTAR_YOGINI_DASHA, payload: response?.responseData?.data[0] });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetMybIRTHDETA(actions) {
  try {
    const { payload } = actions;
    console.log("GetMybIRTHDETA Payload", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "uuuuuuu");

    console.log('GetMybIRTHDETA ::: ', {
      name: payload?.name,
      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),
      hour: String(kundliPayloads?.hour),
      min: String(kundliPayloads?.min),
      place: payload?.place,
      latitude: String(kundliPayloads?.lat),
      longitude: String(kundliPayloads?.lon),
      timezone: String(kundliPayloads?.tzone),
      gender: payload?.gender,
        lang: payload?.lang
    })

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/astro/get_birth_data",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      }
    });

    if (response) {
      yield put({ type: actionTypes.SET_MY_BIRTH_DETAILES, payload: response?.responseData?.data[0] });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetMangalDosha(actions) {
  try {
    const { payload } = actions;
    console.log("bhole", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dosha/mangal_dosh_analysis",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("bbbbbb", response?.responseData?.data[0]?.mangalDosha);

    if (response) {

      yield put({ type: actionTypes.SET_MANGAL_DOSHA, payload: response?.responseData?.data[0]?.mangalDosha });
      console.log("hhhh", payload);
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetPitardosh(actions) {
  try {
    const { payload } = actions;
    console.log("bhole", payload);


    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/dosha/pitra_dosh_analysis",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("bbbbbb>>???", response?.responseData?.data[0]);

    if (response) {

      yield put({ type: actionTypes.SET_PITR_DOSHA, payload: response?.responseData?.data[0] });
      console.log("hhhh<<LLLL", payload);
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* GetKpBirthChart(actions) {
  try {
    const { payload } = actions;
    console.log("SUMITJJJJJJJ", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/kp/get_birth_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("KKKKKKKKKKKKKKK", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_KP_BIRTH_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetKpCupsChart(actions) {
  try {
    const { payload } = actions;
    console.log("SUMITJJJJJJJ?????", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/kp/get_cusps_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("KKKKKKKKKKKKKKK>>::::", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_KP_CUPS_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetTransitChart(actions) {
  try {
    const { payload } = actions;
    console.log("SUUUUUUUUU?????", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/planet/get_transit_data",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("KKKKIIIIIIIIIIIIIOPK>>::::", response?.responseData?.data[0]?.transitData);

    if (response) {

      yield put({ type: actionTypes.SET_TRANSIT_CHART, payload: response?.responseData?.data[0] });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* GetswanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log("huvan", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/gemini/get_swansha_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("-----------juhik", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_SWANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetMyAstroKundli(actions) {
  try {
    const { payload } = actions;
    console.log("CHANDAN", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/astro/get_astro_data",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang,
        mahaDashaLord: payload?.mahaDashaLord
      }
    });

    console.log("////SHSJSHKJ", response?.responseData?.data[0]?.astrodata);

    if (response) {

      yield put({ type: actionTypes.SET_MY_ASTRO, payload: response?.responseData?.data[0]?.astrodata });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetMyFriendData(actions) {
  try {
    const { payload } = actions;
    console.log("CHnduuuuu", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/astro/get_friendship_data",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });

    console.log("////SHSJSHKJ", response?.responseData?.data[0]);

    if (response) {

      yield put({ type: actionTypes.SET_MY_FRIENDDATA, payload: response?.responseData?.data[0] });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetUpGrahaData(actions) {
  try {
    const { payload } = actions;
    console.log("shreegaarrrr", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/planet/get_all_upgraha_data",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });

    console.log("////kkkkk", response?.responseData?.data[0]?.upgrahaData?.upgrahaList);

    if (response) {

      yield put({ type: actionTypes.SET_PLANETS_UPGRAHA, payload: response?.responseData?.data[0]?.upgrahaData?.upgrahaList });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetDhasambhavData(actions) {
  try {
    const { payload } = actions;
    console.log("////=====", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/planet/get_dasham_bhav_madhya",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });

    console.log("///----;;;;;", response?.responseData?.data[0]?.dashamBhavData?.dashamBhavList);

    if (response) {

      yield put({ type: actionTypes.SET_PLANETS_DASHAMBHAV, payload: response?.responseData?.data[0]?.dashamBhavData?.dashamBhavList });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetMyAstakVargadata(actions) {
  try {
    const { payload } = actions;
    console.log("CHnduuuuu", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/planet/get_ashtak_varga_data",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang


      }
    });

    console.log("////SHSJSHKJ", response?.responseData?.data[0]);

    if (response) {

      yield put({ type: actionTypes.SET_MY_ASTAKVARGA, payload: response?.responseData?.data[0] });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetMySaravsatkdata(actions) {
  try {
    const { payload } = actions;
    console.log("CHnduuuuu", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/planet/get_sarvashtak_data",
      data: {
        name: "Satya Tiwari",
        day: "31",
        month: "3",
        year: "1987",
        hour: "0",
        min: "55",
        place: "Motihari",
        latitude: "26.6550589",
        longitude: "84.8986636",
        timezone: "5.5",
        gender: "male",

      }
    });

    console.log("////SHSJSHKJ", response?.responseData?.data[0]);

    if (response) {

      yield put({ type: actionTypes.SET_MY_SARVASATK, payload: response?.responseData?.data[0] });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetLagnaChart(actions) {
  try {
    const { payload } = actions;
    console.log("anujjjpallll", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");




    const data = {
      name: payload?.name,
      day: String(kundliPayloads?.day),
      month: String(kundliPayloads?.month),
      year: String(kundliPayloads?.year),
      hour: String(kundliPayloads?.hour),
      min: String(kundliPayloads?.min),
      place: payload?.place,
      latitude: String(kundliPayloads?.lat),
      longitude: String(kundliPayloads?.lon),
      timezone: String(kundliPayloads?.tzone),
      gender: payload?.gender,
      lang: payload?.lang

    }
    console.log("datapayload", data);


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_lagna_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
       
      }
    });


    console.log("arpikllll", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_LAGNA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}






function* GetLetterLagnaChart(actions) {
  try {
    const { payload } = actions;
    console.log("SagaLagnaBirth", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });



    const dateString = payload?.dob;
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const timeString = payload?.tob;
    const [hour, min] = timeString?.split(":") || [];


    const data = {
      name: payload?.name,
      day: String(day),
      month: String(month),
      year: String(year),
      hour: String(hour),
      min: String(min),
      place: payload?.place,
      latitude: String(payload?.lat),
      longitude: String(payload?.long),  // ✅ spelling was wrong earlier
      timezone: "5.5",
      gender: payload?.gender,
        lang: payload?.lang

    }

    console.log("dataletterlagna", data)


    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_lagna_chart",
      data: {
        name: payload?.name,
        day: String(day),
        month: String(month),
        year: String(year),
        hour: String(hour),
        min: String(min),
        place: payload?.place,
        latitude: String(payload?.lat),
        longitude: String(payload?.long),  // ✅ spelling was wrong earlier
        timezone: "5.5",
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("lagnaanujguykgigilli", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_LETTER_LAGNA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    console.log('CheckResponseHere::::', response)

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* GetLetternavamanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log("kklklklklkl", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const dateString = payload?.dob;
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const timeString = payload?.tob;
    const [hour, min] = timeString?.split(":") || [];

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const data = {
      name: payload?.name,
      day: String(day),
      month: String(month),
      year: String(year),
      hour: String(hour),
      min: String(min),
      place: payload?.place,
      latitude: String(payload?.lat),
      longitude: String(payload?.long),  // ✅ spelling was wrong earlier
      timezone: "5.5",
      gender: payload?.gender,
        lang: payload?.lang

    }


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_navamansha_chart",
      data: {
        name: payload?.name,
        day: String(day),
        month: String(month),
        year: String(year),
        hour: String(hour),
        min: String(min),
        place: payload?.place,
        latitude: String(payload?.lat),
        longitude: String(payload?.long),  // ✅ spelling was wrong earlier
        timezone: "5.5",
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("arpitbhai", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_LETTER_NAVMANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetLetterDashamanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log("shreekishabbbb", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });


    const dateString = payload?.dob;
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const timeString = payload?.tob;
    const [hour, min] = timeString?.split(":") || [];

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_dashamansha_chart",
      data: {
        name: payload?.name,
        day: String(day),
        month: String(month),
        year: String(year),
        hour: String(hour),
        min: String(min),
        place: payload?.place,
        latitude: String(payload?.lat),
        longitude: String(payload?.long),  // ✅ spelling was wrong earlier
        timezone: "5.5",
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log(">>><<<<<<<>>>>", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_LETTER_DASHMANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getKpPlanetDatalETTERWAALA(actions) {
  try {
    const { payload } = actions;


    const dateString = payload?.dob;
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const timeString = payload?.tob;
    const [hour, min] = timeString?.split(":") || [];

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);

    const data = {
      name: payload?.name,
      day: String(day),
      month: String(month),
      year: String(year),
      hour: String(hour),
      min: String(min),
      place: payload?.place,
      latitude: String(payload?.lat),
      longitude: String(payload?.long),  // ✅ spelling was wrong earlier
      timezone: "5.5",
      gender: payload?.gender,
        lang: payload?.lang
    };
    console.log('data', data);

    const response = yield kundliRequest({
      url: Shivam_Api_Url + KP_PLANETS,
      data: {
        name: payload?.name,
        day: String(day),
        month: String(month),
        year: String(year),
        hour: String(hour),
        min: String(min),
        place: payload?.place,
        latitude: String(payload?.lat),
        longitude: String(payload?.long),  // ✅ spelling was wrong earlier
        timezone: "5.5",
        gender: payload?.gender,
        lang: payload?.lang
      },
    });

    if (response) {
      yield put({
        type: actionTypes.SET_KP_PLANETS_LETTERWAALA,
        payload: response?.responseData?.data[0]?.planetData?.planetList,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log('Planet Data Letter ', e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetKpBirthChartLETTER(actions) {
  try {
    const { payload } = actions;
    console.log("SUMITJJJJJJJ", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });


    const dateString = payload?.dob;
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const timeString = payload?.tob;
    const [hour, min] = timeString?.split(":") || [];

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/kp/get_birth_chart",
      data: {
        name: payload?.name,
        day: String(day),
        month: String(month),
        year: String(year),
        hour: String(hour),
        min: String(min),
        place: payload?.place,
        latitude: String(payload?.lat),
        longitude: String(payload?.long),  // ✅ spelling was wrong earlier
        timezone: "5.5",
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("SHREEMAAN", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_LETTER_BIRTH_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}






function* GetHoraChart(actions) {
  try {
    const { payload } = actions;
    console.log("anujjjpallll?????", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_hora_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("arpikllll", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_HORA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetChalitChart(actions) {
  try {
    const { payload } = actions;
    console.log("hareraam", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_chalit_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      }
    });


    console.log("arpikllll", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_CHALIT_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetDreshkanChart(actions) {
  try {
    const { payload } = actions;
    console.log(">>>>", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_dreshkan_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("arpitkkkk", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_DRESHKAN_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetnavamanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log("kklklklklkl", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_navamansha_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("arpitbhai", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_NAVAMANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetSashtymanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log("shreeeekrihgsna", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_shashtymsha_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("kriudhnaaa", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_SHASHTYMANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetDashamanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log("shreekishabbbb", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_dashamansha_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log(">>><<<<<<<>>>>", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_DASHAMANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetDwadasmanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log(">>>><<<??????II", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_dwadashamansha_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("hjhghghgf", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_DWADASHAMANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetTrishamanshaChart(actions) {
  try {
    const { payload } = actions;
    console.log("shreeeekrihgsna", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");


    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/chart/get_trishamansha_chart",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });


    console.log("kriudhnaaa", response?.responseData?.data[0]?.chartData);

    if (response) {

      yield put({ type: actionTypes.SET_TRISHAMANSHA_CHART, payload: response?.responseData?.data[0]?.chartData });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* GetMyCHARCurrent(actions) {
  try {
    const { payload } = actions;
    console.log("CHnduuuuu", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/gemini/get_current_char_dasha_data",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang


      }
    });

    console.log("////SHSJSHKJ", response?.responseData?.data[0]?.charCurrentDashaData);

    if (response) {

      yield put({ type: actionTypes.SET_MY_CHARANTAR, payload: response?.responseData?.data[0]?.charCurrentDashaData });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetMyPrediction(actions) {
  try {
    const { payload } = actions;
    console.log("CHnduuuuu", payload);


    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/prediction/get_prediction",
      data: {
        name: payload?.name,
        day: String(kundliPayloads?.day),
        month: String(kundliPayloads?.month),
        year: String(kundliPayloads?.year),
        hour: String(kundliPayloads?.hour),
        min: String(kundliPayloads?.min),
        place: payload?.place,
        latitude: String(kundliPayloads?.lat),
        longitude: String(kundliPayloads?.lon),
        timezone: String(kundliPayloads?.tzone),
        gender: payload?.gender,
        lang: payload?.lang

      }
    });

    console.log("////SHSJSHKJ", response?.responseData?.data[0]);

    if (response) {

      yield put({ type: actionTypes.SET_MY_PREDICTION, payload: response?.responseData?.data[0] });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



function* getMynewAstroMatching(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataFemale, 'sdfsdfsdf');
    const data = {
      boyName: String(kundliDataMale?.name),
      boyDay: String(parseInt(moment(kundliDataMale?.dob).format('D'))),
      boyMonth: String(parseInt(moment(kundliDataMale?.dob).format('M'))),
      boyYear: String(parseInt(moment(kundliDataMale?.dob).format('YYYY'))),
      boyHour: String(parseInt(moment(kundliDataMale?.tob).format('HH'))),
      boyMin: String(parseInt(moment(kundliDataMale?.tob).format('mm'))),
      boyPlace: String(kundliDataMale?.place),
      boyLatitude: String(kundliDataMale?.lat),
      boyLongitude: String(kundliDataMale?.lon),
      boyTimezone: "5.5",
      boyGender: "male",
      girlName: String(kundliDataFemale?.name),
      girlDay: String(parseInt(moment(kundliDataFemale?.dob).format('D'))),
      girlMonth: String(parseInt(moment(kundliDataFemale?.dob).format('M'))),
      girlYear: String(parseInt(moment(kundliDataFemale?.dob).format('YYYY'))),
      girlHour: String(parseInt(moment(kundliDataFemale?.tob).format('HH'))),
      girlMin: String(parseInt(moment(kundliDataFemale?.tob).format('mm'))),
      girlPlace: String(kundliDataFemale?.place),
      girlLatitude: String(kundliDataFemale?.lat),
      girlLongitude: String(kundliDataFemale?.lon),
      girlTimezone: "5.5",
      girlGender: "female",
      lang: payload?.lang

    };

    console.log('data Matching Prediction. ',  data);

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/kundali/get_astro_data`,
      data: {
        ...data,
      },
    });

    if (response) {
      yield put({
        type: actionTypes.SET_MY_ASTRO_MATCHING_NEW,
        payload: response?.responseData?.data[0],
      });
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getMyAstakootaData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData);
    const kundliDataFemale = yield select(
      state => state.kundli.femaleKundliData,
    );

    console.log(kundliDataFemale, 'sdfsdfsdf');
    const data = {




      boyName: String(kundliDataMale?.name),
      boyDay: String(parseInt(moment(kundliDataMale?.dob).format('DD'))),
      boyMonth: String(parseInt(moment(kundliDataMale?.dob).format('MM'))),
      boyYear: String(parseInt(moment(kundliDataMale?.dob).format('YYYY'))),
      boyHour: String(parseInt(moment(kundliDataMale?.tob).format('HH'))),
      boyMin: String(parseInt(moment(kundliDataMale?.tob).format('mm'))),
      boyPlace: String(kundliDataMale?.place),
      boyLatitude: String(kundliDataMale?.lat),
      boyLongitude: String(kundliDataMale?.lon),
      boyTimezone: "5.5",
      boyGender: "male",
      girlName: String(kundliDataFemale?.name),
      girlDay: String(parseInt(moment(kundliDataFemale?.dob).format('DD'))),
      girlMonth: String(parseInt(moment(kundliDataFemale?.dob).format('MM'))),
      girlYear: String(parseInt(moment(kundliDataFemale?.dob).format('YYYY'))),
      girlHour: String(parseInt(moment(kundliDataFemale?.tob).format('HH'))),
      girlMin: String(parseInt(moment(kundliDataFemale?.tob).format('mm'))),
      girlPlace: String(kundliDataFemale?.place),
      girlLatitude: String(kundliDataFemale?.lat),
      girlLongitude: String(kundliDataFemale?.lon),
      girlTimezone: "5.5",
      girlGender: "female"
    };

    console.log("???llllllll", data)

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/kundali/get_asthakoota_data`,
      data: {
        ...data,
      },

    });

    if (response) {
      yield put({
        type: actionTypes.SET_MY_ASTAKOOTA_DATA,
        payload: response?.responseData?.data[0],
      });
      console.log('????......', response);
    }


    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetMyallhoroscope(actions) {
  try {
    const { payload } = actions;
    console.log("CHnduuuuuchutiya", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "HYUILHI>>>???");
    const data = {
      sign: payload?.planet_name || "Aries",
      lang: payload?.lang


    }

    console.log("datahorojiiiii", data)

    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/horoscope/get_horoscope",
      data: {
        sign: payload?.planet_name || "Aries",
        lang: payload?.lang
      }
    });

    console.log("hariom", response?.responseData?.data[0]?.horoscope);

    if (response) {

      yield put({ type: actionTypes.SET_MY_ALL_HOROSCOPE, payload: response?.responseData?.data[0]?.horoscope });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getNewPanchang(actions) {
  try {
    const { payload, } = actions;
    const today = new Date();
    const day = today.getDate().toString();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const customerData = yield select(state => state.customer.customerData);

    const data = {
      day: payload?.day || day,
      month: payload?.month || month,
      year: payload?.year || year,
      timezone: "5.5",
      latitude: customerData?.address?.latitude,
      longitude: customerData?.address?.longitude,
      place: customerData?.address?.birthPlace,
    };

    console.log("anujjjjjpalpanchang", data)

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/panchang/get_panchang`,
      data: {
        day: payload?.day,
        month: payload?.month,
        year: payload?.year,
        timezone: "5.5",
        latitude: customerData?.address?.latitude || "28.3456",
        longitude: customerData?.address?.longitude || "77.2345",
        place: customerData?.address?.birthPlace || "NOIDA",
        lang: payload?.lang
      },

    });
    console.log("responseji", response)

    if (response) {
      yield put({
        type: actionTypes.SET_MY_PANCHANG_DATA,
        payload: response?.responseData?.data[0],
      });
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getChogadiya(actions) {
  try {
    const { payload, } = actions;
    console.log("chandudost", payload)
    const today = new Date();
    const day = today.getDate().toString();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();
    console.log("payloadsagapanchnag", payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const customerData = yield select(state => state.customer.customerData);

    console.log(customerData, 'customerDatapanchang');
    const data = {
      day: payload?.day || day,
      month: payload?.month || month,
      year: payload?.year || year,
      timezone: "5.5",
      latitude: customerData?.address?.latitude,
      longitude: customerData?.address?.longitude,
      place: customerData?.address?.birthPlace,
    };

    console.log("anujjjjjpalpanchang", data)

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/panchang/get_choghadiya_data`,
      data: {
        day: payload?.day,
        month: payload?.month,
        year: payload?.year,
        timezone: "5.5",
        latitude: customerData?.address?.latitude || "28.4567",
        longitude: customerData?.address?.longitude || "77.3456",
        place: customerData?.address?.birthPlace || "NOIDA",
      },

    });
    console.log("responsejiaheeee", response)

    if (response) {
      yield put({
        type: actionTypes.SET_MY_CHOGADIYA_DATA,
        payload: response?.responseData?.data[0],
      });
      console.log('.hahhh', response);
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getNewMahuratjii(actions) {
  try {
    const { payload, } = actions;
    console.log("chandudost", payload)
    const today = new Date();
    const day = today.getDate().toString();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();
    console.log("payloadsagapanchnag", payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const customerData = yield select(state => state.customer.customerData);

    console.log(customerData, 'customerDatapanchang');
    const data = {
      day: payload?.day || day,
      month: payload?.month || month,
      year: payload?.year || year,
      timezone: "5.5",
      latitude: customerData?.address?.latitude,
      longitude: customerData?.address?.longitude,
      place: customerData?.address?.birthPlace,
    };

    console.log("anujjjjjpalpanchang", data)

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/panchang/get_hora_muhurta`,
      data: {
        day: payload?.day || day,
        month: payload?.month || month,
        year: payload?.year || year,
        timezone: "5.5",
        latitude: customerData?.address?.latitude || 28.4567,
        longitude: customerData?.address?.longitude || 77.3456,
        place: customerData?.address?.birthPlace || "NOIDA",
      },

    });
    console.log("responseji", response)

    if (response) {
      yield put({
        type: actionTypes.SET_MY_MAHURAT_DATA,
        payload: response?.responseData?.data[0],
      });
      console.log('ResponsePnchnag', response);
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getNewPanchangYesterday(actions) {
  try {
    const { payload } = actions;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const day = yesterday.getDate().toString();
    const month = (yesterday.getMonth() + 1).toString();
    const year = yesterday.getFullYear().toString();
    console.log("payloadsagapanchnag", payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const customerData = yield select(state => state.customer.customerData);

    console.log(customerData, 'customerDatapanchangyesterday');
    const data = {
      day: day,
      month: month,
      year: year,
      timezone: "5.5",
      latitude: customerData?.address?.latitude,
      longitude: customerData?.address?.longitude,
      place: customerData?.address?.birthPlace,
    };

    console.log("Yesterdaypanchnag", data)

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/panchang/get_panchang`,
      data: {
        day: day,
        latitude: customerData?.address?.latitude,
        longitude: customerData?.address?.longitude,
        month: month,
        place: customerData?.address?.birthPlace,
        timezone: "5.5",
        year: year
      },

    });
    console.log("responseji", response)

    if (response) {
      yield put({
        type: actionTypes.SET_MY_PANCHANG_YESTERDAY,
        payload: response?.responseData?.data[0],
      });
      console.log('ResponsePnchnag', response);
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getNewPanchangTommorow(actions) {
  try {
    const { payload } = actions;
    const today = new Date();
    const tommorow = new Date(today);
    tommorow.setDate(today.getDate() + 1);

    const day = tommorow.getDate().toString();
    const month = (tommorow.getMonth() + 1).toString();
    const year = tommorow.getFullYear().toString();
    console.log("payloadsagapanchnag", payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const customerData = yield select(state => state.customer.customerData);

    console.log(customerData, 'customerDatapanchangyesterday');
    const data = {
      day: day,
      month: month,
      year: year,
      timezone: "5.5",
      latitude: customerData?.address?.latitude,
      longitude: customerData?.address?.longitude,
      place: customerData?.address?.birthPlace,
    };

    console.log("Yesterdaypanchnag", data)

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/panchang/get_panchang`,
      data: {
        day: day,
        latitude: customerData?.address?.latitude,
        longitude: customerData?.address?.longitude,
        month: month,
        place: customerData?.address?.birthPlace,
        timezone: "5.5",
        year: year
      },

    });
    console.log("responseji", response)

    if (response) {
      yield put({
        type: actionTypes.SET_MY_PANCHANG_TOMMOROW,
        payload: response?.responseData?.data[0],
      });
      console.log('ResponsePnchnag', response);
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* GetLetterBirthdata(actions) {
  try {
    const { payload } = actions;
    console.log("Letter to God", payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
    console.log(kundliPayloads, "uuuuuuu");



    const response = yield kundliRequest({
      url: "https://kundli2.astrosetalk.com/api/astro/get_birth_data",
      data: {
        name: payload?.name,
        day: String(payload?.day),
        month: String(payload?.month),
        year: String(payload?.year),
        hour: String(payload?.hour),
        min: String(payload?.min),
        place: payload?.place,
        latitude: String(payload?.lat),
        longitude: String(payload?.lon),
        timezone: String(payload?.tzone),
        gender: payload?.gender,
        lang: payload?.lang
      }
    });

    console.log("responseletterbirth", response)

    if (response) {
      yield put({ type: actionTypes.SET_LETTER_BIRTH, payload: response?.responseData?.data[0] });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getLetterPanchang(actions) {
  try {
    const { payload } = actions;
    const today = new Date();
    const day = today.getDate().toString();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();
    console.log("payloadsagapanchnag", payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const customerData = yield select(state => state.customer.customerData);

    console.log(customerData, 'customerDatapanchang');
    const data = {
      day: day,
      month: month,
      year: year,
      timezone: "5.5",
      latitude: customerData?.address?.latitude,
      longitude: customerData?.address?.longitude,
      place: customerData?.address?.birthPlace,
    };

    console.log("anujjjjjpalpanchang", data)

    const response = yield kundliRequest({
      url: `https://kundli2.astrosetalk.com/api/panchang/get_panchang`,
      data: {
        day: day,
        latitude: customerData?.address?.latitude,
        longitude: customerData?.address?.longitude,
        month: month,
        place: customerData?.address?.birthPlace,
        timezone: "5.5",
        year: year
      },

    });
    console.log("responseji", response)

    if (response) {
      yield put({
        type: actionTypes.SET_MY_LETTER_PANCHANG,
        payload: response?.responseData?.data[0],
      });
      console.log('ResponsePnchnagletter', response);
    }

    // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, 'hi');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getFinanacejiidata(actions) {
  const { payload } = actions;
  console.log("finanacesaga", payload)

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const response = yield getRequest({
      url: `https://kundli2.astrosetalk.com/api/planet/getFinanceReport/${payload?.Planet}/2?lang=${payload?.lang}`
    })

    console.log("responsekundlifinanace", response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_NEW_FINANCE_DATA, payload: response })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}



function* getRomanacejiidata(actions) {
  const { payload } = actions;
  console.log("Roamancesaga", payload)

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const response = yield getRequest({
      url: `https://kundli2.astrosetalk.com/api/planet/getRomanceData/${payload?.Planet}?lang=${payload?.lang}`
    })

    console.log("responsekundliRomanace", response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_NEW_ROMANACE_DATA, payload: response })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}


function* getPROFESSIONjiidata(actions) {
  const { payload } = actions;
  console.log("Professionsaga", payload)

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const response = yield getRequest({
      url: `https://kundli2.astrosetalk.com/api/planet/getProfessionReport/${payload?.Planet}/10?lang=${payload?.lang}`


    })

    console.log("responsekundliProfession", response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_NEW_PROFESSION_DATA, payload: response })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}


function* getHealthandMINDjiidata(actions) {
  const { payload } = actions;
  console.log("healthmindsaga", payload)

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const response = yield getRequest({
      url: `https://kundli2.astrosetalk.com/api/planet/getHealthmindReport/${payload?.Planet}/1?lang=${payload?.lang}`


    })

    console.log("responsekundlihealthandmind", response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_NEW_HEALTH_MIND_DATA, payload: response })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}

function* getLuckReportdata(actions) {
  const { payload } = actions;
  console.log("luckreportysaga", payload)

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const response = yield getRequest({
      url: `https://kundli2.astrosetalk.com/api/planet/getLuckReport/${payload?.Planet}/9?lang=${payload?.lang}`


    })

    console.log("responsekundliLuckreport", response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_LUCK_REPORT_DATA, payload: response })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}

function* getPhiloshpydata(actions) {
  const { payload } = actions;
  console.log("PHilopshuysaga", payload)

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const response = yield getRequest({
      url: `https://kundli2.astrosetalk.com/api/planet/getEducationReport/${payload?.Planet}/5?lang=${payload?.lang}`


    })

    console.log("responsekundliPhilosphy", response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_PHILOSPHY_DATA, payload: response })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}

function* getPachangData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    console.log(payload, "Panchang payload::::")

    const data = {
      d: payload?.d,
      t: payload?.t,
      lat: +25.15,
      lon: +82.50,
      tz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };


    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_tathastujy_v0.4/panchang',
      data,
      { headers: header }
    );

    console.log('pachang data ::::', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_PANCHANG_DATA, payload: response?.data?.panchang });
      navigate('panchdata')
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getMuhuratData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    console.log(payload, 'muhurat helo world')
    const data = {
      muhurat: payload?.muhurat,
      month: payload?.month,
      year: payload?.year,
      lat: +25.15,
      lon: +82.50,
      tz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };
    console.log('muhurat data::::', data);


    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_tathastujy_v0.4/muhurat',
      data,
      { headers: header }
    );

    console.log('official mahurat::::', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_MUHURAT_DATA, payload: response?.data });
      // navigate('muhurat');

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, "Error fetching Muhurat data");
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* BasicPanchangData(actions) {
  try {
    const { payload } = actions
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const kundliPayloads = yield select(state => state.kundli.basicDetails)

    const payloadData = {
      d: payload?.month ? payload?.month : moment(kundliPayloads?.dob).format('DD/MM/YYYY'),
      t: payload?.time ? payload?.time : moment(kundliPayloads?.tob).format('HH:mm:ss'),
      lat: +25.15,
      lon: +82.50,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    }
    console.log('rites', payloadData);
    const Panchang = yield postRequest({
      url: `https://api.kundli.click/cust_tathastujy_v0.4/panchang`,
      data: {
        ...payloadData
      },
      header: 'post'
    });

    console.log('Panchage :: ', Panchang)

    const data = {
      Panchang
    }

    yield put({ type: actionTypes.SET_BASIC_PANCHANGE, payload: data })

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e, 'hi')
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}

function* getChogadiyaData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const customerData = yield select(state => state.customer.customerData);
    console.log(payload, 'chogadiya payload::::')
    const data = {
      ...payload,
      latitude: customerData?.address?.latitude || "25.15",
      longitude: customerData?.address?.longitude || "77.50",
      place: customerData?.address?.birthPlace || "Noida",
      timezone: "5.5"
    };

    console.log('chogadiya data::::  ', data);
    const response = yield postRequest({
      url: `https://kundli2.astrosetalk.com/api/panchang/get_choghadiya_data`,
      data: {
        ...data,

      },

    });

    console.log('chogadiya ::::', response);

    if (response.success) {
      yield put({ type: actionTypes.SET_CHOGADIYA_DATA, payload: response?.responseData });
      // navigate('muhurat');

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e, "weeeee");
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getDurMuhuratData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    console.log(moment(payload?.month, 'DD/MM/YYYY').format('MM'), 'muhurat payload::::');
    const dataArray = ['rahukaal', 'gulikkaal', 'yamgantakkaal', 'varjyam'];

    // Collect responses
    const responses = yield Promise.all(

      dataArray.map((element) => {
        console.log('El;emet:::: ', element)
        const data = {
          durmuhurat: element,
          d: payload?.month,
          lat: +25.15,
          lon: +82.50,
          tz: 5.5,
          userid: 'tathastujy',
          authcode: '86ce34784bfc07a39392bf690995ef33',
        };

        const header = {
          "Content-Type": "multipart/form-data",
        };

        // Return the axios promise for each request
        return axios.post(
          'https://api.kundli.click/cust_tathastujy_v0.4/durmuhurat',
          data,
          { headers: header }
        );
      })
    );

    // Process successful responses
    const responseData = responses.map((res) => res.data);
    console.log('Response DATA :::: ', responseData);
    if (responseData) {
      yield put({ type: actionTypes.SET_MUHURAT_DUR_DATA, payload: responseData });
      // navigate('muhurat');
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getPachangMonthData(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const selectedDate = moment(payload?.month, 'DD-MM-YYYY')
    console.log('Selected Date :::: ', payload)
    // Prepare a list of dates for the given month
    const daysInMonth = selectedDate.daysInMonth();
    let monthData = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = selectedDate.date(day).format('DD/MM/YYYY');

      const payloadData = {
        d: formattedDate,
        t: payload?.time,
        lat: 25.15,
        lon: 82.50,
        userid: 'tathastujy',
        authcode: '86ce34784bfc07a39392bf690995ef33'
      };

      console.log('Fetching data for: ', formattedDate);

      const Panchang = yield postRequest({
        url: `https://api.kundli.click/cust_tathastujy_v0.4/panchang`,
        data: payloadData,
        header: 'post'
      });

      console.log('Panchang Response :: ', Panchang);

      // Push formatted data into the monthData array
      monthData.push({
        id: day,
        title: formattedDate,
        event: Panchang?.panchang?.karanname || "No Event"
      });
    }

    yield put({ type: actionTypes.SET_PANCHANG_MONTH_DATA, payload: monthData });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (e) {
    console.log(e, 'Error fetching Panchang data');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getYogdata(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log(payload, 'payloadata:::KKK')

    const data = {
      yog: payload?.yog,
      month: payload?.month,
      year: payload?.year,
      lat: +25.15,
      lon: +82.50,
      tz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };






    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_tathastujy_v0.4/yog',
      data,
      { headers: header }
    );

    console.log('Yog data KKK:::', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_YOG_DATA, payload: response?.data });
      // navigate('yogdata')
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getDurmahuratdata(actions) {
  try {
    const { payload } = actions
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const kundliPayloads = yield select(state => state.kundli.basicDetails)
    const payloadData = {
      year: Number(moment(kundliPayloads?.dob).format('yyyy')),
      month: Number(moment(kundliPayloads?.dob).format('MM')),
      date: Number(moment(kundliPayloads?.dob).format('DD')),
      hours: Number(moment(kundliPayloads?.tob).format('HH')),
      minutes: Number(moment(kundliPayloads?.tob).format('mm')),
      seconds: Number(moment(kundliPayloads?.tob).format('ss')),
      latitude: 17.38333,
      longitude: 78.4666,
      timezone: 5.5,
      config: {
        observation_point: "topocentric",
        ayanamsha: "lahiri"
      }
    }
    console.log("dumahuratpayload", payloadData)

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': 'H4hdrNug0e6YNn8EPQ46r4FYgfDpMm8k9baSTd9w'
    }

    const response = yield axios.post(
      'https://json.freeastrologyapi.com/dur-muhurat',
      payloadData,
      { headers }
    )

    console.log("response dur ", response?.data)

    if (response) {
      yield put({ type: actionTypes.SET_DURMAHURAT, payload: response?.data })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e, 'hi')
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}

function* getTarrotCardData(actions) {
  try {
    const { payload } = actions
    console.log('Tarrot', payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
    const kundliPayloads = yield select(state => state.kundli.basicDetails)
    console.log(kundliPayloads, "PAYLOAD_Tarrot")
    const payloadData = {
      // d: moment(kundliPayloads?.dob).format('DD/MM/YYYY'),
      // t: moment(kundliPayloads?.tob).format('HH:mm:ss'),
      // // lat: +25.15,
      // // lon: +82.50,
      // lat: payload?.lat,
      // lon: payload?.lon,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33',
      lang: "en"
    }
    console.log(payloadData, 'payloadTarrot')
    const Response = yield postRequest({
      url: 'https://api.kundli.click/cust_tathastujy_v0.4/tarot-yesno',
      data: {
        ...payloadData
      },
      header: 'post'

    })
    console.log(Response, 'ResponseTarrot')

    if (Response) {
      yield put({ type: actionTypes.SET_TARROT_DATA, payload: Response })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  } catch (e) {
    console.log(e)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
  }
}

function* getMaglidos(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const kundliDataMale = yield select(state => state.kundli.maleKundliData)
    const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

    console.log(kundliDataMale, 'Male data::', kundliDataFemale, 'female kundali ::')
    const data = {
      boyName: kundliDataMale?.name,
      boyDay: parseInt(moment(kundliDataMale?.dob).format('D')).toString(),
      boyMonth: parseInt(moment(kundliDataMale?.dob).format('M')).toString(),
      boyYear: parseInt(moment(kundliDataMale?.dob).format('YYYY')).toString(),
      boyHour: parseInt(moment(kundliDataMale.tob).format('hh')).toString(),
      boyMin: parseInt(moment(kundliDataMale.tob).format('mm')).toString(),
      boyPlace: kundliDataMale?.place,
      boyLatitude: kundliDataMale?.lat?.toString() || '',
      boyLongitude: kundliDataMale?.lon?.toString() || '',
      boyTimezone: "5.5",
      boyGender: 'male',

      girlName: kundliDataFemale?.name,
      girlDay: parseInt(moment(kundliDataFemale?.dob).format('D')).toString(),
      girlMonth: parseInt(moment(kundliDataFemale?.dob).format('M')).toString(),
      girlYear: parseInt(moment(kundliDataFemale?.dob).format('YYYY')).toString(),
      girlHour: parseInt(moment(kundliDataFemale.tob).format('hh')).toString(),
      girlMin: parseInt(moment(kundliDataFemale.tob).format('mm')).toString(),
      girlPlace: kundliDataFemale?.place,
      girlLatitude: kundliDataFemale?.lat?.toString() || '',
      girlLongitude: kundliDataFemale?.lon?.toString() || '',
      girlTimezone: "5.5",
      girlGender: 'female'
    };

    const response = yield kundliRequest({
      url: Shivam_Api_Url + 'kundali/get_asthakoota_data',
      data: {
        ...data,
      },
      // lang: payload?.lang,
    });

    if (response) {
      yield put({
        type: actionTypes.SET_MATCH_MAGLIK,
        payload: response?.responseData?.data[0]?.mangalDoshaAnalysis,
      });
      console.log('CheckTheGetAstkootData:::', response);
    }


    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAtakDosa(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const maleKundliData = yield select(state => state.kundli.maleKundliData)
    const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

    console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
    const data = {
      md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
      mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
      mlat: maleKundliData?.lat,
      mlon: maleKundliData?.lon,
      mtz: 5.5,
      fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
      ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
      flat: femaleKundliData?.lat,
      flon: femaleKundliData?.lon,
      ftz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };


    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_tathastujy_v0.4/ashtkoot-doshas',
      data,
      { headers: header }
    );

    // console.log('DoSA data ::::', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_ASTKOOT_DOSA, payload: response?.data });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getMaatchcon(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const maleKundliData = yield select(state => state.kundli.maleKundliData)
    const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

    console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
    const data = {
      md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
      mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
      mlat: maleKundliData?.lat,
      mlon: maleKundliData?.lon,
      mtz: 5.5,
      fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
      ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
      flat: femaleKundliData?.lat,
      flon: femaleKundliData?.lon,
      ftz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };


    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtkoot-conclusion',
      data,
      { headers: header }
    );

    console.log('Conclusion dosa data ::::', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_MATCH_CONCLUSION, payload: response?.data['ashtkoot-conclusion'] });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getMatchingPrediction(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const maleKundliData = yield select(state => state.kundli.maleKundliData)
    const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

    console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
    const data = {
      md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
      mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
      mlat: maleKundliData?.lat,
      mlon: maleKundliData?.lon,
      mtz: 5.5,
      fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
      ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
      flat: femaleKundliData?.lat,
      flon: femaleKundliData?.lon,
      ftz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };

    console.log("datadata", data)


    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_tathastujy_v0.4/ashtkoot-conclusion',
      data,
      { headers: header }
    );

    console.log('Matching data response', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_MATCHING_PREDICTION, payload: response?.data });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAstakootremediesdosha(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const maleKundliData = yield select(state => state.kundli.maleKundliData)
    const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

    console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
    const data = {
      md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
      mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
      mlat: maleKundliData?.lat,
      mlon: maleKundliData?.lon,
      mtz: 5.5,
      fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
      ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
      flat: femaleKundliData?.lat,
      flon: femaleKundliData?.lon,
      ftz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };

    console.log("Remediesdoshadata", data)


    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_tathastujy_v0.4/ashtkoot-doshas-remedies',
      data,
      { headers: header }
    );

    console.log('DOSHAREMEDIES data response', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_DOSHA_REMEDIES, payload: response?.data });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAtakGunmilan(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const maleKundliData = yield select(state => state.kundli.maleKundliData)
    const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

    console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
    const data = {
      md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
      mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
      mlat: maleKundliData?.lat,
      mlon: maleKundliData?.lon,
      mtz: 5.5,
      fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
      ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
      flat: femaleKundliData?.lat,
      flon: femaleKundliData?.lon,
      ftz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33'
    };


    const header = {
      "Content-Type": "multipart/form-data"
    };

    const response = yield axios.post('https://api.kundli.click/cust_tathastujy_v0.4/ashtkoot-points',
      data,
      { headers: header }
    );

    // console.log('Gun data ::::', response?.data);

    if (response.data) {
      yield put({ type: actionTypes.SET_GUN_DATA, payload: response?.data });

    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getPanchangMonthly(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = action;
    const response = yield getRequest({
      url: api_url + `admin/get_all_pachang?lang=${payload?.lang}`,

    });

    yield put({ type: actionTypes.SET_PANCHANG_MONTHLY, payload: response?.data });
    yield call(navigate, 'PanchangMonthly');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getPanchangMuhurat(actions) {
  try {

    const { payload }  = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });


    const responseVivah = yield postRequest({
      url: api_url + `admin/get_muhurat_by_year`,
      data: payload
    });

    const responseGriha = yield postRequest({
      url: api_url + `admin/get_muhurat_grahpravesh`,
      data: payload
    });

    const responseVaahan = yield postRequest({
      url: api_url + `admin/get_muhurat_vaahan`,
      data: payload
    });

    const responseSampatti = yield postRequest({
      url: api_url + `admin/get_muhurat_sampatti`,
      data: payload
    });



    const data = {
      vivah: responseVivah?.data,
      griha: responseGriha?.data,
      vaahan: responseVaahan?.data,
      sampatti: responseSampatti?.data,
    };

    console.log('Muhurat data:', data);
    yield put({ type: actionTypes.SET_PANCHANG_MUHURAT, payload: data });
    // yield call(navigate, 'PanchangMonthly');
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getMatchingData(actions) {
  try {
    const customerData = yield select(state => state.customer.customerData);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield postRequest({
      url: api_url + 'customers/match_data',
      data: {
        customerId: customerData?._id,
      },
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_MATCHING_DATA, payload: response?.data });

    }
  } catch (e) {
    console.log(e);
  }
}

function* onMatchingData(actions) {
  try {
    const { payload } = actions;
    console.log('payload :::: ', payload);
    const customerData = yield select(state => state.customer.customerData);
    const response = yield postRequest({
      url: api_url + match_save,
      data: {
        maleKundliData: payload?.maleKundliData,
        femaleKundliData: payload?.femaleKundliData,
        customerId: customerData?._id,
      }
    });

    console.log('Response :::: ', response);
    if (response?.success) {
      yield call(navigate, 'BasicMatching');
    }
  } catch (e) {
    console.log(e);

  }

}

function* onMatchingDelete(actions) {
  try {
    const { payload } = actions;
    const response = yield postRequest({
      url: api_url + `customers/match_delete`,
      data: {
        id: payload?.id
      }
    });

    if (response.success) {
      showToastMessage({ message: response?.message });
      yield put({ type: actionTypes.GET_MATCHING_DATA })
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* kundliSaga() {
  yield takeLeading(actionTypes.GET_CREATE_KUNDLI, createKundli);
  yield takeLeading(actionTypes.GET_ALL_KUNDLI, getAllKundli);
  yield takeLeading(actionTypes.DELETE_KUNDLI, deleteKundli);
  yield takeLeading(actionTypes.GET_KUNDLI_DATA, getKundliData);
  yield takeLeading(actionTypes.GET_KUNDLI_BIRTH_DETAILS, getKundliBirthDetails,);

  // yield takeLeading(actionTypes.CREATE_KUNDLI, createKundli);
  yield takeLeading(actionTypes.GET_ALL_KUNDLI, getAllKundli);
  yield takeLeading(actionTypes.DELETE_KUNDLI, deleteKundli);
  // yield takeLeading(actionTypes.GET_KUNDLI_DATA, getKundliData);

  yield takeLeading(actionTypes.GET_PLANET_DATA, getPlanetData);
  yield takeLeading(actionTypes.GET_KP_PLANET_DATA, getKpPlanetData);
  yield takeLeading(actionTypes.GET_KP_HOUSE_CUPS_DATA, getKpHouseCupsData);
  yield takeLeading(actionTypes.GET_KP_PLANET_CUPS_DATA, getKpPlanetCupsData);
  yield takeLeading(actionTypes.GET_KP_BIRTH_DETAILS, getKpBirthDetails);
  yield takeLeading(actionTypes.GET_KUNDLI_CHART_DATA, getKundliChart);
  yield takeLeading(actionTypes.GET_KUNDLI_CHARTS_IMAGE, getChartImage);
  yield takeLeading(actionTypes.GET_KUNDLI_MAJOR_DASHA, getKundliMajorDasha);
  yield takeLeading(actionTypes.GET_KUNDLI_SUB_V_DASHA, getKundliSubVDasha);
  yield takeLeading(
    actionTypes.GET_KUNDLI_SUB_SUB_V_DASHA,
    getKundliSubSubVDasha,
  );
  yield takeLeading(
    actionTypes.GET_KUNDLI_SUB_SUB_SUB_V_DASHA,
    getKundliSubSubSubVDasha,
  );
  yield takeLeading(
    actionTypes.GET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA,
    getKundliSubSubSubSubVDasha,
  );
  yield takeLeading(actionTypes.GET_HOUSE_REPORTS, getKundliHouseReports);
  yield takeLeading(
    actionTypes.GET_KUNDLI_MATCHING_REPORT,
    getKundliMatchingReport,
  );
  yield takeLeading(
    actionTypes.VIEW_KUNDLI_FROM_KUNDLI_MATCHING,
    viewKundliFromKundliMatching,
  );
  yield takeLeading(actionTypes.GET_RASHI_REPORTS, RashiReportData);
  yield takeLeading(actionTypes.GET_ASTAK_REPORTS, AstakVargaData);
  yield takeLeading(actionTypes.GET_SARVA_REPORTS, SarVargaData);
  yield takeLeading(actionTypes.GET_ASCEDENT_REPORTS, AscendantData);
  yield takeLeading(actionTypes.GET_NUMERO_REPORT, NumerologyData);
  yield takeLeading(
    actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS,
    getAsstkoota,
  );
  yield takeLeading(actionTypes.GET_BASIC_ASTRO_POINTS, getMatchBasicAstro);
  yield takeLeading(
    actionTypes.GET_KUNDLI_MATCHING_DSHKOOT_POINTS,
    getDaskoota,
  );
  yield takeLeading(
    actionTypes.GET_KUNDLI_MATCHING_CONCLUSION_POINTS,
    getMatchConclusion,
  );
  yield takeLeading(
    actionTypes.GET_KUNDLI_MATCHING_REPORT_POINTS,
    getMatchReport,
  );
  yield takeLeading(
    actionTypes.GET_ASCEDENT_MATCHING_REPORTS,
    MatchingAscendantData,
  );
  yield takeLeading(actionTypes.GET_KUNDLI_D7_CHARTS, getSaptmashaChart);
  yield takeLeading(actionTypes.GET_KUNDLI_D9_CHARTS, getNavmashaChart);
  yield takeLeading(actionTypes.GET_OPEN_NUMEROLOGY, getOpenNumerology);
  yield takeLeading(actionTypes.GET_DELETE_NUMEROLOGY, getDeleteNumerology);
  yield takeLeading(actionTypes.GET_RULING_PLANETS, getRulingPlanets);
  yield takeLeading(actionTypes.GET_KP_CUSPS, getKpCusps);
  yield takeLeading(actionTypes.GET_MY_NUM, getMyNum2);


  yield takeLeading(actionTypes.GET_LUCKY_GEMSTONE, getMyluckyGemstonedata);

  yield takeLeading(actionTypes.GET_HEALTH_GEMSTONE, getMyHealthstonedata);

  yield takeLeading(actionTypes.GET_EDUCATION_GEMSTONE, getEducationstonedata);

  yield takeLeading(actionTypes.GET_LOSHU_GRID, getLoshuGrid);

  yield takeLeading(actionTypes.GET_ARROWS, getArrowsdata);
  yield takeLeading(actionTypes.GET_EXPRESSIONS, getExpressionsdata);
  yield takeLeading(actionTypes.GET_NEW_LAALKITAAB, getLaalkitabnew);

  yield takeLeading(actionTypes.GET_NAME_NUMEROLOGY, getNAMEnumerology);

  yield takeLeading(actionTypes.GET_NAME_NUMEROLOGY2, getNAMEnumerology2);

  yield takeLeading(actionTypes.GET_NUM_DAY, getPersnalday);
  yield takeLeading(actionTypes.GET_PERSNAL_YEAR, getYearnumber);

  yield takeLeading(actionTypes.GET_NUM_DAY, getDayNumber);
  yield takeLeading(actionTypes.GET_PERSNAL_MONTH, getMonthNumber);

  yield takeLeading(actionTypes.GET_PLANETS, getAllPlanets);
  yield takeLeading(actionTypes.GET_MY_VIMHOTRI, GetMyVimhotri);
  yield takeLeading(actionTypes.GET_ANTAR_VIM, GetMyAntarDasha);
  yield takeLeading(actionTypes.GET_PREDICTION, getAllPredictions);
  yield takeLeading(actionTypes.GET_SADHESATI, getAllSadeSati);
  yield takeLeading(actionTypes.GET_KAALSARPDOSHA, getKaalSarpDoshaData);
  yield takeLeading(actionTypes.GET_GEMINIDATA, getGeminiData)
  yield takeLeading(actionTypes.GET_CHARDASHA, getCharDashData)
  yield takeLeading(actionTypes.GET_KARKANSHA_CHART, getKarkanshaChartData)
  yield takeLeading(actionTypes.GET_PRATYANTRADESH_DATA, GetPratiyatamData);
  yield takeLeading(actionTypes.GET_SOOKHAMDASAHA_DATA, GetSookhamData);
  yield takeLeading(actionTypes.GET_YOGINA_DASHA, GetYoginaData);
  yield takeLeading(actionTypes.GET_PRANAMDASA_DATA, GetPranamData);
  yield takeLeading(actionTypes.GET_CURRENT_VIM_DASHA, GetCurrentVimData);
  yield takeLeading(actionTypes.GET_CURRENT_YOGINI_DASHA, GetCurrentYoginiData);
  yield takeLeading(actionTypes.GET_ANTAR_YOGINI_DASHA, GetAnterYoginiData);
  yield takeLeading(actionTypes.GET_MANGAL_DOSHA, GetMangalDosha);
  yield takeLeading(actionTypes.GET_PITR_DOSHA, GetPitardosh);
  yield takeLeading(actionTypes.GET_KP_BIRTH_CHART, GetKpBirthChart);
  yield takeLeading(actionTypes.GET_KP_CUPS_CHART, GetKpCupsChart);

  yield takeLeading(actionTypes.GET_TRANSIT_CHART, GetTransitChart);
  yield takeLeading(actionTypes.GET_SWANSHA_CHART, GetswanshaChart);
  yield takeLeading(actionTypes.GET_MY_ASTRO, GetMyAstroKundli);
  yield takeLeading(actionTypes.GET_MY_FRIENDDATA, GetMyFriendData);
  yield takeLeading(actionTypes.GET_PLANETS_UPGRAHA, GetUpGrahaData);
  yield takeLeading(actionTypes.GET_PLANETS_DASHAMBHAV, GetDhasambhavData);
  yield takeLeading(actionTypes.GET_MY_ASTAKVARGA, GetMyAstakVargadata);
  yield takeLeading(actionTypes.GET_MY_SARVASATK, GetMySaravsatkdata);
  yield takeLeading(actionTypes.GET_HORA_CHART, GetHoraChart);
  yield takeLeading(actionTypes.GET_DRESHKAN_CHART, GetDreshkanChart);
  yield takeLeading(actionTypes.GET_CHALIT_CHART, GetChalitChart);
  yield takeLeading(actionTypes.GET_NAVAMANSHA_CHART, GetnavamanshaChart);
  yield takeLeading(actionTypes.GET_MOON2_CHART, GetMoon2Chart);
  yield takeLeading(actionTypes.GET_LAGNA_CHART, GetLagnaChart);

  yield takeLeading(actionTypes.GET_LETTER_LAGNA_CHART, GetLetterLagnaChart);
  yield takeLeading(actionTypes.GET_LETTER_NAVMANSHA_CHART, GetLetternavamanshaChart);
  yield takeLeading(actionTypes.GET_LETTER_DASHMANSHA_CHART, GetLetterDashamanshaChart);
  yield takeLeading(actionTypes.GET_LETTER_BIRTH_CHART, GetKpBirthChartLETTER);

  yield takeLeading(actionTypes.GET_KP_PLANETS_LETTERWAALA, getKpPlanetDatalETTERWAALA
  );









  yield takeLeading(actionTypes.GET_SHASHTYMANSHA_CHART, GetSashtymanshaChart);
  yield takeLeading(actionTypes.GET_DASHAMANSHA_CHART, GetDashamanshaChart);
  yield takeLeading(actionTypes.GET_DWADASHAMANSHA_CHART, GetDwadasmanshaChart);
  yield takeLeading(actionTypes.GET_TRISHAMANSHA_CHART, GetTrishamanshaChart);
  yield takeLeading(actionTypes.GET_MY_CHARANTAR, GetMyCHARCurrent);
  yield takeLeading(actionTypes.GET_MY_BIRTH_DETAILES, GetMybIRTHDETA);
  yield takeLeading(actionTypes.GET_SUN2_CHART, GetSun2Chart);
  yield takeLeading(actionTypes.GET_MY_PREDICTION, GetMyPrediction);
  yield takeLeading(actionTypes.GET_MY_ASTRO_MATCHING_NEW, getMynewAstroMatching);
  yield takeLeading(actionTypes.GET_MY_ASTAKOOTA_DATA, getMyAstakootaData);
  yield takeLeading(actionTypes.GET_MY_ALL_HOROSCOPE, GetMyallhoroscope);
  yield takeLeading(actionTypes.GET_MY_PANCHANG_DATA, getNewPanchang);
  yield takeLeading(actionTypes.GET_MY_CHOGADIYA_DATA, getChogadiya);
  yield takeLeading(actionTypes.GET_MY_MAHURAT_DATA, getNewMahuratjii);

  yield takeLeading(actionTypes.GET_MY_LETTER_PANCHANG, getLetterPanchang);

  yield takeLeading(actionTypes.GET_MY_PANCHANG_YESTERDAY, getNewPanchangYesterday);
  yield takeLeading(actionTypes.GET_MY_PANCHANG_TOMMOROW, getNewPanchangTommorow);
  // yield takeLeading(actionTypes.GET_LETTER_BIRTH, GetLetterBirthdata);

  yield takeLeading(actionTypes.GET_NEW_FINANCE_DATA, getFinanacejiidata);
  yield takeLeading(actionTypes.GET_NEW_ROMANACE_DATA, getRomanacejiidata);
  yield takeLeading(actionTypes.GET_NEW_PROFESSION_DATA, getPROFESSIONjiidata);
  yield takeLeading(actionTypes.GET_NEW_HEALTH_MIND_DATA, getHealthandMINDjiidata);
  yield takeLeading(actionTypes.GET_LUCK_REPORT_DATA, getLuckReportdata);
  yield takeLeading(actionTypes.GET_PHILOSPHY_DATA, getPhiloshpydata);

  yield takeLeading(actionTypes.GET_YOG_DATA, getYogdata)
  yield takeLeading(actionTypes.GET_PANCHANG_DATA, getPachangData)
  yield takeLeading(actionTypes.GET_PANCHANG_MONTH_DATA, getPachangMonthData);
  yield takeLeading(actionTypes.GET_MUHURAT_DATA, getMuhuratData)
  yield takeLeading(actionTypes.GET_CHOGADIYA_DATA, getChogadiyaData)
  yield takeLeading(actionTypes.GET_MUHURAT_DUR_DATA, getDurMuhuratData);
  yield takeLeading(actionTypes.GET_DURMAHURAT, getDurmahuratdata);
  yield takeLeading(actionTypes.GET_BASIC_PANCHANGE, BasicPanchangData);
  yield takeLeading(actionTypes.GET_TARROT_DATA, getTarrotCardData)

  yield takeLeading(actionTypes.GET_MATCH_MAGLIK, getMaglidos)
  yield takeLeading(actionTypes.GET_ASTKOOT_DOSA, getAtakDosa)
  yield takeLeading(actionTypes.GET_MATCH_CONCLUSION, getMaatchcon)
  yield takeLeading(actionTypes.GET_MATCHING_PREDICTION, getMatchingPrediction)
  yield takeLeading(actionTypes.GET_DOSHA_REMEDIES, getAstakootremediesdosha)
  yield takeLeading(actionTypes.GET_GUN_DATA, getAtakGunmilan)

  yield takeLeading(actionTypes.GET_PANCHANG_MONTHLY, getPanchangMonthly);
  yield takeLeading(actionTypes.GET_PANCHANG_MUHURAT, getPanchangMuhurat);
  yield takeLeading(actionTypes.GET_MATCHING_DATA, getMatchingData);
  yield takeLeading(actionTypes.ON_MATCHING_DATA, onMatchingData);
  yield takeLeading(actionTypes.ON_MATCHING_DELETE, onMatchingDelete);
}