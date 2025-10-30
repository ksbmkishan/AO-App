import * as actionTypes from '../actionTypes';

export const createKundli = payload => ({
    type: actionTypes.CREATE_KUNDLI,
    payload,
});

export const getcreateKundli = payload => ({
    type: actionTypes.GET_CREATE_KUNDLI,
    payload,
})


export const setcreateKundli = payload => ({
    type: actionTypes.SET_CREATE_KUNDLI,
    payload,
})

export const resetKundliData = payload => ({
    type: actionTypes.RESET_KUNDLI_DATA,
    payload,
});

export const getAllKundli = payload => ({
    type: actionTypes.GET_ALL_KUNDLI,
    payload,
});

export const setAllKundli = payload => ({
    type: actionTypes.SET_ALL_KUNDLI,
    payload,
});

export const setAllMasterKundli = payload => ({
    type: actionTypes.SET_ALL_MASTRER_KUNDLI,
    payload,
});

export const deleteKundli = payload => ({
    type: actionTypes.DELETE_KUNDLI,
    payload,
});

export const getKundliData = payload => ({
    type: actionTypes.GET_KUNDLI_DATA,
    payload,
});

export const setKundliId = payload => ({
    type: actionTypes.SET_KUNDLI_ID,
    payload,
});

export const getKundliBirthDetails = payload => ({
    type: actionTypes.GET_KUNDLI_BIRTH_DETAILS,
    payload,
});

export const setKundliBirthDetails = payload => ({
    type: actionTypes.SET_KUNDLI_BIRTH_DETAILS,
    payload,
});

export const getKundliChartData = payload => ({
    type: actionTypes.GET_KUNDLI_CHART_DATA,
    payload,
});
export const getKundliChartimage = payload => ({
    type: actionTypes.GET_KUNDLI_CHARTS_IMAGE,
    payload,
});
export const setKundliChartimage = payload => ({
    type: actionTypes.SET_KUNDLI_CHARTS_IMAGE,
    payload,
});

export const setKundliCharts = payload => ({
    type: actionTypes.SET_KUNDLI_CHARTS,
    payload,
});

export const setKundliBasicDetails = payload => ({
    type: actionTypes.SET_KUNDLI_BASIC_DETAILS,
    payload,
});

export const setPlanetData = payload => ({
    type: actionTypes.SET_PLANET_DATA,
    payload,
});

export const getPlanetData = payload => ({
    type: actionTypes.GET_PLANET_DATA,
    payload,
});

export const setKpPlanetData = payload => ({
    type: actionTypes.SET_KP_PLANET_DATA,
    payload,
});

export const getKpPlanetData = payload => ({
    type: actionTypes.GET_KP_PLANET_DATA,
    payload,
});

export const setKpHouseCupsData = payload => ({
    type: actionTypes.SET_KP_HOUSE_CUPS_DATA,
    payload,
});

export const getKpHouseCupsData = payload => ({
    type: actionTypes.GET_KP_HOUSE_CUPS_DATA,
    payload,
});

export const getKpPlanetCupsData = payload => ({
    type: actionTypes.GET_KP_PLANET_CUPS_DATA,
    payload,
});
export const setKpPlanetCupsData = payload => ({
    type: actionTypes.SET_KP_PLANET_CUPS_DATA,
    payload,
});
export const getKpBirthDetails = payload => ({
    type: actionTypes.GET_KP_BIRTH_DETAILS,
    payload,
});
export const setKpBirthDetails = payload => ({
    type: actionTypes.SET_KP_BIRTH_DETAILS,
    payload,
});

export const getKundliMajorDasha = payload => ({
    type: actionTypes.GET_KUNDLI_MAJOR_DASHA,
    payload,
});

export const setKundliMajorDasha = payload => ({
    type: actionTypes.SET_KUNDLI_MAJOR_DASHA,
    payload,
});

export const getKundliSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_V_DASHA,
    payload,
});

export const setKundliSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_V_DASHA,
    payload,
});

export const setKundliDashaVisible = payload => ({
    type: actionTypes.SET_KUNDLI_DAHSA_VISIBLE,
    payload,
});

export const setKundliSubSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA,
    payload,
});

export const getKundliSubSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_SUB_V_DASHA,
    payload,
});

export const setKundliDashaPath = payload => ({
    type: actionTypes.SET_KUNDLI_DASHA_PATH,
    payload,
});

export const setKundliSubSubSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA,
    payload,
});

export const getKundliSubSubSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_SUB_SUB_V_DASHA,
    payload,
});
export const setKundliSubSubSubSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA,
    payload,
});

export const getKundliSubSubSubSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA,
    payload,
});

export const setHouseReports = payload => ({
    type: actionTypes.SET_HOUSE_REPORTS,
    payload,
});

export const getHouseReports = payload => ({
    type: actionTypes.GET_HOUSE_REPORTS,
    payload,
});

export const setMaleKundliData = payload => ({
    type: actionTypes.SET_MALE_KUNDLI_DATA,
    payload,
});

export const setFemaleKundliData = payload => ({
    type: actionTypes.SET_FEMALE_KUNDLI_DATA,
    payload,
});

export const getKundliMatchingReport = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_REPORT,
    payload,
});

export const getKundliMatchingAshtakootPoints = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS,
    payload,
});

export const setKundliMatchingAshtakootPoints = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS,
    payload,
});
export const getMatchBasicAstro = payload => ({
    type: actionTypes.GET_BASIC_ASTRO_POINTS,
    payload,
});
export const setMatchBasicAstro = paylod => ({
    type: actionTypes.SET_BASIC_ASTRO_POINTS,
    paylod,
});

//////
export const getDaskootapoint = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_DSHKOOT_POINTS,
    payload,
});
export const setDaskootapoint = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS,
    payload,
});

export const getMatchConclusionpoint = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_CONCLUSION_POINTS,
    payload,
});

export const setMatchConclusionpoint = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS,
    payload,
});
export const getMatchReport = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_REPORT_POINTS,
    payload,
});
export const setMatchReport = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS,
    payload,
});

///
export const viewKundliFromKundliMatching = payload => ({
    type: actionTypes.VIEW_KUNDLI_FROM_KUNDLI_MATCHING,
    payload,
});

export const setRashiReports = payload => ({
    type: actionTypes.SET_RASHI_REPORTS,
    payload,
});

export const getRashiReports = payload => ({
    type: actionTypes.GET_RASHI_REPORTS,
    payload,
});

export const getAstakReports = payload => ({
    type: actionTypes.GET_ASTAK_REPORTS,
    payload,
});
export const setAstakReports = payload => ({
    type: actionTypes.SET_ASTAK_REPORTS,
    payload,
});
export const getSarvaReports = payload => ({
    type: actionTypes.GET_SARVA_REPORTS,
    payload,
});

export const getAscedentReport = payload => ({
    type: actionTypes.GET_ASCEDENT_REPORTS,
    payload,
});

export const getMatchAscedentReport = payload => ({
    type: actionTypes.GET_ASCEDENT_MATCHING_REPORTS,
    payload,
});
export const setMatchAscedentReport = payload => ({
    type: actionTypes.SET_ASCEDENT_MATCHING_REPORTS,
    payload,
});

export const getbasicpanchange = payload => ({
    type: actionTypes.GET_BASIC_PANCHANGE,
    payload,
});

export const getnumero = payload => ({
    type: actionTypes.GET_NUMERO_REPORT,
    payload,
});

export const getSaptmashaChart = payload => ({
    type: actionTypes.GET_KUNDLI_D7_CHARTS,
    payload,
});

export const getNavmashaChart = payload => ({
    type: actionTypes.GET_KUNDLI_D9_CHARTS,
    payload,
});
export const getOpenNumerology = payload => ({
    type: actionTypes.GET_OPEN_NUMEROLOGY,
    payload,
});
export const setOpenNumerology = payload => ({
    type: actionTypes.SET_OPEN_NUMEROLOGY,
    payload,
});
export const getDeleteNumerology = payload => ({
    type: actionTypes.GET_DELETE_NUMEROLOGY,
    payload,
});
export const setDeleteNumerology = payload => ({
    type: actionTypes.SET_DELETE_NUMEROLOGY,
    payload,
});

export const getRulingPlanets = payload => ({
    type: actionTypes.GET_RULING_PLANETS,
    payload,
});
export const setRulingPlanets = payload => ({
    type: actionTypes.SET_RULING_PLANETS,
    payload,
});

export const getKpCuspsData = payload => ({
    type: actionTypes.GET_KP_CUSPS,
    payload,
});
export const setKpCuspsData = payload => ({
    type: actionTypes.SET_KP_CUSPS,
    payload,
});

export const getvimhotrimahadasha = payload => ({
    type: actionTypes.GET_MY_VIMHOTRI,
    payload
})
export const setvimhotrimahadasha = payload => ({
    type: actionTypes.SET_MY_VIMHOTRI,
    payload
})

export const getAntarvim = payload => ({
    type: actionTypes.GET_ANTAR_VIM,
    payload
})
export const setAntarvim = payload => ({
    type: actionTypes.SET_ANTAR_VIM,
    payload
})

export const getPratyantradesh = payload => ({
    type: actionTypes.GET_PRATYANTRADESH_DATA,
    payload
})
export const setPratyantradesh = payload => ({
    type: actionTypes.SET_PRATYANTRADESH_DATA,
    payload
})

export const getSookhamDasha = payload => ({
    type: actionTypes.GET_SOOKHAMDASAHA_DATA,
    payload
})
export const setSookhamDasha = payload => ({
    type: actionTypes.SET_SOOKHAMDASAHA_DATA,
    payload
})


export const getPranamDASHA = payload => ({
    type: actionTypes.GET_PRANAMDASA_DATA,
    payload
})
export const setPranamDASHA = payload => ({
    type: actionTypes.SET_PRANAMDASA_DATA,
    payload
})



export const getMyPlanetsData = payload => ({
    type: actionTypes.GET_PLANETS,
    payload,
});

export const setMyPlanetsData = payload => ({
    type: actionTypes.SET_PLANETS,
    payload,
});

export const getPredictionData = payload => ({
    type: actionTypes.GET_PREDICTION,
    payload,
});

export const setPredictionData = payload => ({
    type: actionTypes.SET_PREDICTION,
    payload,
});

export const getSadhesatiData = payload => ({
    type: actionTypes.GET_SADHESATI,
    payload,
});

export const setSadhesatiData = payload => ({
    type: actionTypes.SET_SADHESATI,
    payload,
});

export const getKaalsarpDosha = payload => ({
    type: actionTypes.GET_KAALSARPDOSHA,
    payload,
});



export const setKaalsarpDosha = payload => ({
    type: actionTypes.SET_KAALSARPDOSHA,
    payload,
});

export const getMyNumerology = payload => ({
    type: actionTypes.GET_MY_NUM,
    payload,
});

export const setMyNumerology = payload => ({
    type: actionTypes.SET_MY_NUM,
    payload,
});



export const getLuckyGemstonedata = payload => ({
    type: actionTypes.GET_LUCKY_GEMSTONE,
    payload,
});

export const setLuckyGemstonedata = payload => ({
    type: actionTypes.SET_LUCKY_GEMSTONE,
    payload,
});


export const getHealthstone = payload => ({
    type: actionTypes.GET_HEALTH_GEMSTONE,
    payload,
});

export const setHealthstone = payload => ({
    type: actionTypes.SET_HEALTH_GEMSTONE,
    payload,
});

export const getEducationstone = payload => ({
    type: actionTypes.GET_EDUCATION_GEMSTONE,
    payload,
});

export const setEducationstone = payload => ({
    type: actionTypes.SET_EDUCATION_GEMSTONE,
    payload,
});


//Numerology Section


export const getLoshuGrid = payload => ({
    type: actionTypes.GET_LOSHU_GRID,
    payload,
});

export const setLoshuGrid = payload => ({
    type: actionTypes.SET_LOSHU_GRID,
    payload,
});


export const getArrows = payload => ({
    type: actionTypes.GET_ARROWS,
    payload,
});

export const setArrows = payload => ({
    type: actionTypes.SET_ARROWS,
    payload,
});


export const getExpressions = payload => ({
    type: actionTypes.GET_EXPRESSIONS,
    payload,
});

export const setExpressions = payload => ({
    type: actionTypes.SET_EXPRESSIONS,
    payload,
});


export const getNewLaalkitaab = payload => ({
    type: actionTypes.GET_NEW_LAALKITAAB,
    payload,
});

export const setNewLaalkitaab = payload => ({
    type: actionTypes.SET_NEW_LAALKITAAB,
    payload,
});


export const getPersnalyear = payload => ({
    type: actionTypes.GET_PERSNAL_YEAR,
    payload,
});

export const setPersnalyear = payload => ({
    type: actionTypes.SET_PERSNAL_YEAR,
    payload,
});


export const getPersnalMonth = payload => ({
    type: actionTypes.GET_PERSNAL_MONTH,
    payload,
});

export const setPersnalMonth = payload => ({
    type: actionTypes.SET_PERSNAL_MONTH,
    payload,
});




export const getNamenumerology = payload => ({
    type: actionTypes.GET_NAME_NUMEROLOGY,
    payload,
});

export const setNamenumerology = payload => ({
    type: actionTypes.SET_NAME_NUMEROLOGY,
    payload,
});

export const getNamenumerologypythgorus = payload => ({
    type: actionTypes.GET_NAME_NUMEROLOGY2,
    payload,
});

export const setNamenumerologypythgorus = payload => ({
    type: actionTypes.SET_NAME_NUMEROLOGY2,
    payload,
});


export const getnumerologyday = payload => ({
    type: actionTypes.GET_NUM_DAY,
    payload,
});

export const setnumerologyday = payload => ({
    type: actionTypes.SET_NUM_DAY,
    payload,
});





export const getGeminiData = payload => ({
    type: actionTypes.GET_GEMINIDATA,
    payload,
});

export const setGeminiData = payload => ({
    type: actionTypes.SET_GEMINIDATA,
    payload
})

export const getCharDashaData = payload => ({
    type: actionTypes.GET_CHARDASHA,
    payload
})

export const setCharDashaData = payload => ({
    type: actionTypes.SET_CHARDASHA,
    payload
})

export const getKarkanshaChartData = payload => ({
    type: actionTypes.GET_KARKANSHA_CHART,
    payload
})

export const setKarkanshaChartData = payload => ({
    type: actionTypes.SET_KARKANSHA_CHART,
    payload
})

export const getYoginaDasha = payload => ({
    type: actionTypes.GET_YOGINA_DASHA,
    payload,
});
export const setYoginaDasha = payload => ({
    type: actionTypes.SET_YOGINA_DASHA,
    payload,
});


export const getCurrentVimhotri = payload => ({
    type: actionTypes.GET_CURRENT_VIM_DASHA,
    payload,
});
export const setCurrentVimhotri = payload => ({
    type: actionTypes.SET_CURRENT_VIM_DASHA,
    payload,
});

export const getCurrentYogini = payload => ({
    type: actionTypes.GET_CURRENT_YOGINI_DASHA,
    payload,
});
export const setCurrentYogini = payload => ({
    type: actionTypes.SET_CURRENT_YOGINI_DASHA,
    payload,
});

export const getAnterYogini = payload => ({
    type: actionTypes.GET_ANTAR_YOGINI_DASHA,
    payload,
});
export const setAnterYogini = payload => ({
    type: actionTypes.SET_ANTAR_YOGINI_DASHA,
    payload,
});

export const getMangalDosha = payload => ({
    type: actionTypes.GET_MANGAL_DOSHA,
    payload,
});
export const setMangalDosha = payload => ({
    type: actionTypes.SET_MANGAL_DOSHA,
    payload,
});

export const getPitrdosh = payload => ({
    type: actionTypes.GET_PITR_DOSHA,
    payload,
});
export const setPitrdosh = payload => ({
    type: actionTypes.SET_PITR_DOSHA,
    payload,
});


export const getBirthChart = payload => ({
    type: actionTypes.GET_KP_BIRTH_CHART,
    payload,
});
export const setBirthChart = payload => ({
    type: actionTypes.SET_KP_BIRTH_CHART,
    payload,
});


export const getKpCupsData = payload => ({
    type: actionTypes.GET_KP_CUPS_CHART,
    payload,
});
export const setKpCupsData = payload => ({
    type: actionTypes.SET_KP_CUPS_CHART,
    payload,
});


export const getTransitChartData = payload => ({
    type: actionTypes.GET_TRANSIT_CHART,
    payload,
});
export const setTransitChartData = payload => ({
    type: actionTypes.SET_TRANSIT_CHART,
    payload,
});


export const getSwanshaChartData = payload => ({
    type: actionTypes.GET_SWANSHA_CHART,
    payload,
});
export const setSwanshaChartData = payload => ({
    type: actionTypes.SET_SWANSHA_CHART,
    payload,
});

export const getDashamanshaChart = payload => ({
    type: actionTypes.GET_DASHAMANSHA_CHART,
    payload,
});
export const setDashamanshaChart = payload => ({
    type: actionTypes.SET_DASHAMANSHA_CHART,
    payload,
});


export const getDwadasmanshaChart = payload => ({
    type: actionTypes.GET_DWADASHAMANSHA_CHART,
    payload,
});
export const setDwadasmanshaChart = payload => ({
    type: actionTypes.SET_DWADASHAMANSHA_CHART,
    payload,
});


export const getTrishamanshaChart = payload => ({
    type: actionTypes.GET_TRISHAMANSHA_CHART,
    payload,
});
export const setTrishamanshaChart = payload => ({
    type: actionTypes.SET_TRISHAMANSHA_CHART,
    payload,
});

export const getShashtymanshaChart = payload => ({
    type: actionTypes.GET_SHASHTYMANSHA_CHART,
    payload,
});
export const setShashtymanshaChart = payload => ({
    type: actionTypes.SET_SHASHTYMANSHA_CHART,
    payload,
});


export const getNavamanshaChart = payload => ({
    type: actionTypes.GET_NAVAMANSHA_CHART,
    payload,
});
export const setNavamanshaChart = payload => ({
    type: actionTypes.SET_NAVAMANSHA_CHART,
    payload,
});


export const getDreshkanChart = payload => ({
    type: actionTypes.GET_DRESHKAN_CHART,
    payload,
});
export const setDreshkanChart = payload => ({
    type: actionTypes.SET_DRESHKAN_CHART,
    payload,
});
export const getChalitChart = payload => ({
    type: actionTypes.GET_CHALIT_CHART,
    payload,
});
export const setChalitChart = payload => ({
    type: actionTypes.SET_CHALIT_CHART,
    payload,
});

export const getSun2Chart = payload => ({
    type: actionTypes.GET_SUN2_CHART,
    payload,
});
export const setSun2Chart = payload => ({
    type: actionTypes.SET_SUN2_CHART,
    payload,
});

export const getMoon2Chart = payload => ({
    type: actionTypes.GET_MOON2_CHART,
    payload,
});
export const setMoon2Chart = payload => ({
    type: actionTypes.SET_MOON2_CHART,
    payload,
});



export const getLagnaChart = payload => ({
    type: actionTypes.GET_LAGNA_CHART,
    payload,
});
export const setLagnaChart = payload => ({
    type: actionTypes.SET_LAGNA_CHART,
    payload,
});



//Letter to god apis actions

export const getLetterLagnaChart = payload => ({
    type: actionTypes.GET_LETTER_LAGNA_CHART,
    payload,
});
export const setLetterLagnaChart = payload => ({
    type: actionTypes.SET_LETTER_LAGNA_CHART,
    payload,
});


export const getLetterNavmanshaChart = payload => ({
    type: actionTypes.GET_LETTER_NAVMANSHA_CHART,
    payload,
});
export const setLetterNavmanshaChart = payload => ({
    type: actionTypes.SET_LETTER_NAVMANSHA_CHART,
    payload,
});


export const getLetterDashmanshaChart = payload => ({
    type: actionTypes.GET_LETTER_DASHMANSHA_CHART,
    payload,
});
export const setLetterDashmanshaChart = payload => ({
    type: actionTypes.SET_LETTER_DASHMANSHA_CHART,
    payload,
});

export const getLetterBIRTHChart = payload => ({
    type: actionTypes.GET_LETTER_BIRTH_CHART,
    payload,
});
export const SetLetterBIRTHChart = payload => ({
    type: actionTypes.SET_LETTER_BIRTH_CHART,
    payload,
});

export const getLetterKPALLPALNETS = payload => ({
    type: actionTypes.GET_KP_PLANETS_LETTERWAALA,
    payload,
});
export const SetLetterKPALLPALNETS = payload => ({
    type: actionTypes.SET_KP_PLANETS_LETTERWAALA,
    payload,
});




export const getHoraChart = payload => ({
    type: actionTypes.GET_HORA_CHART,
    payload,
});
export const setHoraChart = payload => ({
    type: actionTypes.SET_HORA_CHART,
    payload,
});

export const getUpgraha = payload => ({
    type: actionTypes.GET_PLANETS_UPGRAHA,
    payload
})
export const setUpgraha = payload => ({
    type: actionTypes.SET_PLANETS_UPGRAHA,
    payload
})

export const getDashammadhya = payload => ({
    type: actionTypes.GET_PLANETS_DASHAMBHAV,
    payload
})
export const setDashammadhya = payload => ({
    type: actionTypes.SET_PLANETS_DASHAMBHAV,
    payload
})

export const getAstroData = payload => ({
    type: actionTypes.GET_MY_ASTRO,
    payload
})
export const setAstroData = payload => ({
    type: actionTypes.SET_MY_ASTRO,
    payload
})

export const getFriendshipData = payload => ({
    type: actionTypes.GET_MY_FRIENDDATA,
    payload
})
export const setFriendshipData = payload => ({
    type: actionTypes.SET_MY_FRIENDDATA,
    payload
})

export const getPredictionData2 = payload => ({
    type: actionTypes.GET_MY_PREDICTION,
    payload
})
export const setPredictionData2 = payload => ({
    type: actionTypes.GET_MY_PREDICTION,
    payload
})


export const getMyBirthDetailesData2 = payload => ({
    type: actionTypes.GET_MY_BIRTH_DETAILES,
    payload
})
export const setMyBirthDetailesData2 = payload => ({
    type: actionTypes.GET_MY_BIRTH_DETAILES,
    payload
})


export const getMYsarvastakdata = payload => ({
    type: actionTypes.GET_MY_SARVASATK,
    payload
})
export const setMYsarvastakdata = payload => ({
    type: actionTypes.SET_MY_SARVASATK,
    payload
})

export const getMyAstakvargadata = payload => ({
    type: actionTypes.GET_MY_ASTAKVARGA,
    payload
})
export const setMyAstakvargadata = payload => ({
    type: actionTypes.SET_MY_ASTAKVARGA,
    payload
})

export const getCharcurrent = payload => ({
    type: actionTypes.GET_MY_CHARANTAR,
    payload
})
export const setCharcurrent = payload => ({
    type: actionTypes.SET_MY_CHARANTAR,
    payload
})

export const getNewAstromatching = payload => ({
    type: actionTypes.GET_MY_ASTRO_MATCHING_NEW,
    payload
})
export const setNewAstromatching = payload => ({
    type: actionTypes.SET_MY_ASTRO_MATCHING_NEW,
    payload
})


export const getNewAstkootadata = payload => ({
    type: actionTypes.GET_MY_ASTAKOOTA_DATA,
    payload
})
export const setNewAstkootadata = payload => ({
    type: actionTypes.SET_MY_ASTAKOOTA_DATA,
    payload
})


export const getMyallHoroscope = payload => ({
    type: actionTypes.GET_MY_ALL_HOROSCOPE,
    payload
})
export const setMyallHoroscope = payload => ({
    type: actionTypes.SET_MY_ALL_HOROSCOPE,
    payload
})

export const getMyPanchang = payload => ({
    type: actionTypes.GET_MY_PANCHANG_DATA,
    payload
})
export const setMyPanchang = payload => ({
    type: actionTypes.SET_MY_PANCHANG_DATA,
    payload
})



export const getMySimpleMahurat = payload => ({
    type: actionTypes.GET_MY_MAHURAT_DATA,
    payload
})
export const setMySimpleMahurat = payload => ({
    type: actionTypes.SET_MY_MAHURAT_DATA,
    payload
})




export const getMyChogadiya = payload => ({
    type: actionTypes.GET_MY_CHOGADIYA_DATA,
    payload
})
export const setMyChogadiya = payload => ({
    type: actionTypes.GET_MY_CHOGADIYA_DATA,
    payload
})





export const getLetterPanchang = payload => ({
    type: actionTypes.GET_MY_LETTER_PANCHANG,
    payload
})
export const setLetterPanchang = payload => ({
    type: actionTypes.SET_MY_LETTER_PANCHANG,
    payload
})




export const getMyPanchangYesterday = payload => ({
    type: actionTypes.GET_MY_PANCHANG_YESTERDAY,
    payload
})
export const setMyPanchangYesterday = payload => ({
    type: actionTypes.SET_MY_PANCHANG_YESTERDAY,
    payload
})

export const getMyPanchangTommorow = payload => ({
    type: actionTypes.GET_MY_PANCHANG_TOMMOROW,
    payload
})
export const setMyPanchangTommorow = payload => ({
    type: actionTypes.GET_MY_PANCHANG_TOMMOROW,
    payload
})

export const getLettertogodbirth = payload => ({
    type: actionTypes.GET_LETTER_BIRTH,
    payload
})
export const setLettertogodbirth = payload => ({
    type: actionTypes.SET_LETTER_BIRTH,
    payload
})

export const getFinanceData = payload => ({
    type: actionTypes.GET_NEW_FINANCE_DATA,
    payload,
});

export const setFinanceData = payload => ({
    type: actionTypes.SET_NEW_FINANCE_DATA,
    payload,
});



export const getRomanceData = payload => ({
    type: actionTypes.GET_NEW_ROMANACE_DATA,
    payload,
});

export const setRomanceData = payload => ({
    type: actionTypes.SET_NEW_ROMANACE_DATA,
    payload,
});

export const getProfessionData = payload => ({
    type: actionTypes.GET_NEW_PROFESSION_DATA,
    payload,
});

export const setProfessionData = payload => ({
    type: actionTypes.SET_NEW_PROFESSION_DATA,
    payload,
});

export const getHEALTHMINDData = payload => ({
    type: actionTypes.GET_NEW_HEALTH_MIND_DATA,
    payload,
});

export const setHEALTHMINDData = payload => ({
    type: actionTypes.SET_NEW_HEALTH_MIND_DATA,
    payload,
});

export const getLuckreportData = payload => ({
    type: actionTypes.GET_LUCK_REPORT_DATA,
    payload,
});

export const setLuckreportData = payload => ({
    type: actionTypes.SET_LUCK_REPORT_DATA,
    payload,
});

export const getPhilospyEducationData = payload => ({
    type: actionTypes.GET_PHILOSPHY_DATA,
    payload,
});

export const setPhilospyEducationData = payload => ({
    type: actionTypes.SET_PHILOSPHY_DATA,
    payload,
});


export const getYog = payload => ({
    type: actionTypes.GET_YOG_DATA,
    payload
})



export const getPanchangdata = payload => ({
    type: actionTypes.GET_PANCHANG_DATA,
    payload
})


export const getMuhurat = payload => ({
    type: actionTypes.GET_MUHURAT_DATA,
    payload
})

export const getChogadiyadata = payload => ({
    type: actionTypes.GET_CHOGADIYA_DATA,
    payload
})

export const getDurMuhuratData = payload => ({
    type: actionTypes.GET_MUHURAT_DUR_DATA,
    payload
})
export const getKundliPanchangMonthData = payload => ({
    type: actionTypes.GET_PANCHANG_MONTH_DATA,
    payload
})

export const getDurmahurat = payload => ({
    type: actionTypes.GET_DURMAHURAT,
    payload
})

export const setDurmahurat = payload => ({
    type: actionTypes.SET_DURMAHURAT,
    payload
})


export const getAbhijeet = payload => ({
    type: actionTypes.GET_ABHIJEET_MAHURAT,
    payload
})

export const setAbhijeet = payload => ({
    type: actionTypes.SET_ABHIJEET_MAHURAT,
    payload
})


export const getTarrortCard = payload => ({
    type: actionTypes.GET_TARROT_DATA,
    payload
})

export const setTarrortCard = payload => ({
    type: actionTypes.SET_TARROT_DATA,
    payload
})

export const Astakootdosharemedies = payload => ({
    type: actionTypes.GET_DOSHA_REMEDIES,
    payload
})

export const getmatchmanglik = payload => ({
    type: actionTypes.GET_MATCH_MAGLIK,
    payload
})

export const getmatchconclusion = payload => ({
    type: actionTypes.GET_MATCH_CONCLUSION,
    payload
})

export const getastkootdosha = payload => ({
    type: actionTypes.GET_ASTKOOT_DOSA,
    payload
})

export const MartchingPridiction = payload => ({
    type: actionTypes.GET_MATCHING_PREDICTION,
    payload
})

export const getgundata = payload => ({
    type: actionTypes.GET_GUN_DATA,
    payload
})

export const getPanchangMonthly = payload => ({
    type: actionTypes.GET_PANCHANG_MONTHLY,
    payload,
});

export const getPachangMuhurat = payload => ({
    type: actionTypes.GET_PANCHANG_MUHURAT,
    payload,
});

export const onMatchingData = payload => ({
    type: actionTypes.ON_MATCHING_DATA,
    payload,
});

export const getMatchingData = payload => ({
    type: actionTypes.GET_MATCHING_DATA,
    payload,
});

export const onMatchingDelete = payload => ({
    type: actionTypes.ON_MATCHING_DELETE,
    payload,
});


