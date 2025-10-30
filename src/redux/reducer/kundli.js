
import { getNamenumerology } from '../actions/KundliActions';
import * as actionTypes from '../actionTypes'

const initialState = {
    kundliId: null,
    kundliPayloads: null,
    kundliListData: null,
    masterKundliListData: null,
    birthDetailsData: null,
    chartImage: null,
    chartData: null,
    basicDetails: null,
    planetData: null,
    kpPlanetData: null,
    kpHouseCupsData: null,
    dashaVisible: 'MAJOR',
    dashaPath: '',
    majorDashaData: null,
    subVDashaData: null,
    subSubVDashaData: null,
    subSubSubVDashaData: null,
    subSubSubSubVDashaData: null,
    houseReportData: null,
    maleKundliData: null,
    femaleKundliData: null,
    matchingAshtakootPointsData: null,
    kundliRashiReport: null,
    AshtakvargaReport: null,
    SarvaReport: null,
    AscedentReport: null,
    Panchang: null,
    MatchBasicDetails: null,
    BasicAstroMatching: null,
    MatchingReport: null,
    ConclusionReport: null,
    DashKootReport: null,
    MatchAscedentReport: null,
    Saptamanshachart: null,
    Navamanshachart: null,
    openNumerologyData: null,
    deleteNumerologyData: null,
    kpPlanetCupsData: null,
    kpBirthDetails: null,
    RulingData: null,
    MyCuspsData: null,
    Mynum2: null,
    myPlanets: null,
    myVimhotri: null,
    myPrediction: null,
    sadhesatiData: null,
    kaalsarpDoshaData: null,
    geminiData: null,
    charDashaData: null,
    karkanshaChartData: null,
    MyANTAR: null,
    PratshyaamData: null,
    SookhamData: null,
    Yoginadata: null,
    Pranamdata: null,
    CurrentVimdata: null,
    Currentyoginidata: null,
    AntarYoginiDasha: null,
    MangalDosha: null,
    PitrDosha: null,
    kpBirthChart: null,
    kpcupschart: null,
    TransitChart: null,
    SwanshaChart: null,
    DashaManshaChart: null,
    DwadasmanshaChart: null,
    TrishamanshaChart: null,
    ShashtymanshaChart: null,
    Navamanshachart: null,
    DreshkanChart: null,
    ChalitChart: null,
    SunChart2: null,
    MoonChart: null,
    MYlagnaCHART: null,
    HoraChartDta: null,
    UPgrahadata: null,
    myAstrokundli: null,
    MyFriendData: null,
    MyPrediction: null,
    MYBIRTHJII: null,
    MySarvsatkdata: null,
    MyAstakvarga: null,
    MycharCurrent: null,
    NewAstromatching: null,
    NewAstakootadata: null,
    MYallhoroscope: null,
    NewPanchang: null,
    NewPanchangyesterday: null,
    NewPanchangTommorow: null,
    LetterBirth: null,
    kUNDLIRESPONSE: null,
    NewChogadiya: null,
    MysimpleMahurat: null,
    Arrowsdata: null,
    Expressionsdata: null,
    Personalday: null,
    getNamenumerology: null,
    Pythagorusnamenum: null,
    MyYear: null,
    MyMonth: null,
    kitaablaaldata: null,
    LuckyGemstone: null,
    DataHealth: null,
    Educationstonedata: null,
    LetterLagnachart: null,
    LetterNavmanshachart:null,
    LetterDashmanshachart:null,
    LetterBIRTHchart:null,
    LETTERallPlanets:null,
    FinancejiData: null,
    RomanacejiData: null,
    ProfessionjiData: null,
    HealthmindjiData: null,
    LuckReportData: null,
    PhilosphyjidataData: null,
    yogdata: null,
    panchangData:  null,
    muhuratData: null,
    Durmahuratdata:  null,
    Abhijeetmahurat:   null,
    chogadiyaData:  null,
    muhuratDD: null,
    Panchang:  null,
    PanchangData:  null,
    Tarrotcarddata: null,
    matchmanglik: null,
    astkootdosa: null,
    matchconlusion: null,
    MatchingPrediction:  null,
    Astakootdosharemedies: null,
    matchgun:   null,
    panchangMonthly: null,
    panchangMuhuratVivah: null,
    NewMatchingData: null,
}

const kundli = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_KUNDLI_PAYLOADS:
            return {
                ...state,
                kundliPayloads: payload
            }
        case actionTypes.RESET_KUNDLI_DATA:
            return {
                ...initialState,
                kundliListData: state.kundliListData,
                maleKundliData: state.maleKundliData,
                femaleKundliData: state.femaleKundliData,
                matchingAshtakootPointsData: state.matchingAshtakootPointsData
            }
        case actionTypes.SET_KUNDLI_ID:
            return {
                ...state,
                kundliId: payload
            }
        case actionTypes.SET_ALL_KUNDLI:
            return {
                ...state,
                kundliListData: payload,
            }
        case actionTypes.SET_ALL_MASTRER_KUNDLI:
            return {
                ...state,
                masterKundliListData: payload,
            }
        case actionTypes.SET_KUNDLI_BIRTH_DETAILS:
            return {
                ...state,
                birthDetailsData: payload
            }
        case actionTypes.SET_KUNDLI_CHARTS_IMAGE:
            return {
                ...state,
                chartImage: payload
            }
        case actionTypes.SET_KUNDLI_CHARTS:
            return {
                ...state,
                chartData: payload
            }
        case actionTypes.SET_KUNDLI_BASIC_DETAILS:
            return {
                ...state,
                basicDetails: payload
            }
        case actionTypes.SET_PLANET_DATA:
            return {
                ...state,
                planetData: payload
            }
        case actionTypes.SET_KP_PLANET_DATA:
            return {
                ...state,
                kpPlanetData: payload
            }

        case actionTypes.SET_CREATE_KUNDLI:
            return {
                ...state,
                kUNDLIRESPONSE: payload
            }



        case actionTypes.SET_KP_HOUSE_CUPS_DATA:
            return {
                ...state,
                kpHouseCupsData: payload
            }
        case actionTypes.SET_KP_PLANET_CUPS_DATA:
            return {
                ...state,
                kpPlanetCupsData: payload
            }
        case actionTypes.SET_KP_BIRTH_DETAILS:
            return {
                ...state,
                kpBirthDetails: payload
            }
        case actionTypes.SET_KUNDLI_MAJOR_DASHA:
            return {
                ...state,
                majorDashaData: payload
            }
        case actionTypes.SET_KUNDLI_DAHSA_VISIBLE:
            return {
                ...state,
                dashaVisible: payload,
            }
        case actionTypes.SET_KUNDLI_DASHA_PATH:
            return {
                ...state,
                dashaPath: payload,
            }
        case actionTypes.SET_KUNDLI_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'ANTAR',
                subVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRATYANTAR',
                subSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'SOOKSHMA',
                subSubSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRAN',
                subSubSubSubVDashaData: payload
            }
        case actionTypes.SET_HOUSE_REPORTS:
            return {
                ...state,
                houseReportData: payload
            }
        case actionTypes.SET_MALE_KUNDLI_DATA:
            return {
                ...state,
                maleKundliData: payload
            }
        case actionTypes.SET_FEMALE_KUNDLI_DATA:
            return {
                ...state,
                femaleKundliData: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS:
            return {
                ...state,
                matchingAshtakootPointsData: payload
            }
        case actionTypes.SET_RASHI_REPORTS:
            return {
                ...state,
                kundliRashiReport: payload
            }
        case actionTypes.SET_ASTAK_REPORTS:
            return {
                ...state,
                AshtakvargaReport: payload
            }
        case actionTypes.SET_SARVA_REPORTS:
            return {
                ...state,
                SarvaReport: payload
            }
        case actionTypes.SET_ASCEDENT_REPORTS:
            return {
                ...state,
                AscedentReport: payload
            }
        case actionTypes.SET_BASIC_PANCHANGE:
            return {
                ...state,
                Panchang: payload
            }
        case actionTypes.SET_KUNDLI_BASIC_DETAILS_MATCHING:
            return {
                ...state,
                MatchBasicDetails: payload
            }
        case actionTypes.SET_BASIC_ASTRO_POINTS:
            return {
                ...state,
                BasicAstroMatching: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS:
            return {
                ...state,
                MatchingReport: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS:
            return {
                ...state,
                ConclusionReport: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS:
            return {
                ...state,
                DashKootReport: payload
            }
        case actionTypes.SET_ASCEDENT_MATCHING_REPORTS:
            return {
                ...state,
                MatchAscedentReport: payload
            }
        case actionTypes.SET_KUNDLI_D7_CHARTS:
            return {
                ...state,
                Saptamanshachart: payload
            }
        case actionTypes.SET_KUNDLI_D9_CHARTS:

            return {
                ...state,
                Navamanshachart: payload
            }
        case actionTypes.SET_OPEN_NUMEROLOGY:

            return {
                ...state,
                openNumerologyData: payload
            }
        case actionTypes.SET_DELETE_NUMEROLOGY:

            return {
                ...state,
                deleteNumerologyData: payload
            }
        case actionTypes.SET_RULING_PLANETS:

            return {
                ...state,
                RulingData: payload
            }

        case actionTypes.SET_KP_CUSPS:

            return {
                ...state,
                MyCuspsData: payload
            }

        case actionTypes.SET_MY_NUM:

            return {
                ...state,
                Mynum2: payload
            }

        case actionTypes.SET_LUCKY_GEMSTONE:

            return {
                ...state,
                LuckyGemstone: payload
            }
        case actionTypes.SET_HEALTH_GEMSTONE:

            return {
                ...state,
                DataHealth: payload
            }

        case actionTypes.SET_EDUCATION_GEMSTONE:

            return {
                ...state,
                Educationstonedata: payload
            }


        case actionTypes.SET_LOSHU_GRID:

            return {
                ...state,
                Loshugriddata: payload
            }


        case actionTypes.SET_ARROWS:

            return {
                ...state,
                Arrowsdata: payload
            }


        case actionTypes.SET_EXPRESSIONS:

            return {
                ...state,
                Expressionsdata: payload
            }


        case actionTypes.SET_NEW_LAALKITAAB:

            return {
                ...state,
                kitaablaaldata: payload
            }


        case actionTypes.SET_PERSNAL_YEAR:

            return {
                ...state,
                MyYear: payload
            }


        case actionTypes.SET_PERSNAL_MONTH:

            return {
                ...state,
                MyMonth: payload
            }


        case actionTypes.SET_NAME_NUMEROLOGY:

            return {
                ...state,
                getNamenumerology: payload
            }

        case actionTypes.SET_NAME_NUMEROLOGY2:

            return {
                ...state,
                Pythagorusnamenum: payload
            }

        case actionTypes.SET_NUM_DAY:

            return {
                ...state,
                Personalday: payload
            }


        case actionTypes.SET_PLANETS:

            return {
                ...state,
                myPlanets: payload
            }

        case actionTypes.SET_MY_VIMHOTRI:

            return {
                ...state,
                myVimhotri: payload
            }

        case actionTypes.SET_ANTAR_VIM:

            return {
                ...state,
                MyANTAR: payload
            }

        case actionTypes.SET_PRATYANTRADESH_DATA:

            return {
                ...state,
                PratshyaamData: payload
            }

        case actionTypes.SET_PREDICTION:
            return {
                ...state,
                myPrediction: payload
            }
        case actionTypes.SET_SADHESATI:
            return {
                ...state,
                sadhesatiData: payload
            }

        case actionTypes.SET_KAALSARPDOSHA:
            return {
                ...state,
                kaalsarpDoshaData: payload
            }
        case actionTypes.SET_GEMINIDATA:
            return {
                ...state,
                geminiData: payload
            }
        case actionTypes.SET_CHARDASHA:
            return {
                ...state,
                charDashaData: payload
            }
        case actionTypes.SET_KARKANSHA_CHART:
            return {
                ...state,
                karkanshaChartData: payload
            }
        case actionTypes.SET_SOOKHAMDASAHA_DATA:
            return {
                ...state,
                SookhamData: payload
            }

        case actionTypes.SET_YOGINA_DASHA:
            return {
                ...state,
                Yoginadata: payload
            }

        case actionTypes.SET_PRANAMDASA_DATA:
            return {
                ...state,
                Pranamdata: payload
            }

        case actionTypes.SET_CURRENT_VIM_DASHA:
            return {
                ...state,
                CurrentVimdata: payload
            }

        case actionTypes.SET_CURRENT_YOGINI_DASHA:
            return {
                ...state,
                Currentyoginidata: payload
            }

        case actionTypes.SET_ANTAR_YOGINI_DASHA:
            return {
                ...state,
                AntarYoginiDasha: payload
            }

        case actionTypes.SET_MANGAL_DOSHA:
            return {
                ...state,
                MangalDosha: payload
            }

        case actionTypes.SET_PITR_DOSHA:
            return {
                ...state,
                PitrDosha: payload
            }

        case actionTypes.SET_KP_BIRTH_CHART:
            return {
                ...state,
                kpBirthChart: payload
            }

        case actionTypes.SET_KP_CUPS_CHART:
            return {
                ...state,
                kpcupschart: payload
            }

        case actionTypes.SET_TRANSIT_CHART:
            return {
                ...state,
                TransitChart: payload
            }

        case actionTypes.SET_SWANSHA_CHART:
            return {
                ...state,
                SwanshaChart: payload
            }

        case actionTypes.SET_DASHAMANSHA_CHART:
            return {
                ...state,
                DashaManshaChart: payload
            }

        case actionTypes.SET_DWADASHAMANSHA_CHART:
            return {
                ...state,
                DwadasmanshaChart: payload
            }

        case actionTypes.SET_TRISHAMANSHA_CHART:
            return {
                ...state,
                TrishamanshaChart: payload
            }

        case actionTypes.SET_SHASHTYMANSHA_CHART:
            return {
                ...state,
                ShashtymanshaChart: payload
            }

        case actionTypes.SET_NAVAMANSHA_CHART:
            return {
                ...state,
                Navamanshachart: payload
            }

        case actionTypes.SET_DRESHKAN_CHART:
            return {
                ...state,
                DreshkanChart: payload
            }

        case actionTypes.SET_CHALIT_CHART:
            return {
                ...state,
                ChalitChart: payload
            }

        case actionTypes.SET_SUN2_CHART:
            return {
                ...state,
                SunChart2: payload
            }

        case actionTypes.SET_MOON2_CHART:
            return {
                ...state,
                MoonChart: payload
            }

        case actionTypes.SET_LAGNA_CHART:
            return {
                ...state,
                MYlagnaCHART: payload
            }




        case actionTypes.SET_LETTER_LAGNA_CHART:
            return {
                ...state,
                LetterLagnachart: payload
            }

        case actionTypes.SET_LETTER_NAVMANSHA_CHART:
            return {
                ...state,
                LetterNavmanshachart: payload
            }


             case actionTypes.SET_LETTER_DASHMANSHA_CHART:
            return {
                ...state,
                LetterDashmanshachart: payload
            }


              case actionTypes.SET_LETTER_BIRTH_CHART:
            return {
                ...state,
                LetterBIRTHchart: payload
            }



               case actionTypes.SET_KP_PLANETS_LETTERWAALA:
            return {
                ...state,
                LETTERallPlanets: payload
            }



        case actionTypes.SET_HORA_CHART:
            return {
                ...state,
                HoraChartDta: payload
            }
        case actionTypes.SET_PLANETS_UPGRAHA:

            return {
                ...state,
                UPgrahadata: payload
            }
        case actionTypes.SET_PLANETS_DASHAMBHAV:

            return {
                ...state,
                Dhasambhav: payload
            }


        case actionTypes: SET_NUMERO_REPORT
        default: {
            return state;
        }

        case actionTypes.SET_MY_ASTRO:

            return {
                ...state,
                myAstrokundli: payload
            }


        case actionTypes.SET_MY_FRIENDDATA:

            return {
                ...state,
                MyFriendData: payload
            }

        case actionTypes.SET_MY_PREDICTION:

            return {
                ...state,
                MyPrediction: payload
            }

        case actionTypes.SET_MY_BIRTH_DETAILES:

            return {
                ...state,
                MYBIRTHJII: payload
            }



        case actionTypes.SET_LETTER_BIRTH:

            return {
                ...state,
                LetterBirth: payload
            }

        case actionTypes.SET_MY_SARVASATK:

            return {
                ...state,
                MySarvsatkdata: payload
            }

        case actionTypes.SET_MY_ASTAKVARGA:

            return {
                ...state,
                MyAstakvarga: payload
            }


        case actionTypes.SET_MY_CHARANTAR:

            return {
                ...state,
                MycharCurrent: payload
            }


        case actionTypes.SET_MY_ASTRO_MATCHING_NEW:

            return {
                ...state,
                NewAstromatching: payload
            }

        case actionTypes.SET_MY_ASTAKOOTA_DATA:

            return {
                ...state,
                NewAstakootadata: payload
            }

        case actionTypes.SET_MY_ALL_HOROSCOPE:

            return {
                ...state,
                MYallhoroscope: payload
            }
        case actionTypes.SET_MY_PANCHANG_DATA:

            return {
                ...state,
                NewPanchang: payload
            }

        case actionTypes.SET_MY_MAHURAT_DATA:

            return {
                ...state,
                MysimpleMahurat: payload
            }


        case actionTypes.SET_MY_CHOGADIYA_DATA:

            return {
                ...state,
                NewChogadiya: payload
            }

        case actionTypes.SET_MY_LETTER_PANCHANG:

            return {
                ...state,
                LetterPanchang: payload
            }

        case actionTypes.SET_MY_PANCHANG_YESTERDAY:

            return {
                ...state,
                NewPanchangyesterday: payload
            }



        case actionTypes.SET_MY_PANCHANG_TOMMOROW:

            return {
                ...state,
                NewPanchangTommorow: payload
            }

            case actionTypes.SET_NEW_FINANCE_DATA:

            return {
                ...state,
                FinancejiData: payload
            }

        case actionTypes.SET_NEW_ROMANACE_DATA:

            return {
                ...state,
                RomanacejiData: payload
            }

        case actionTypes.SET_NEW_PROFESSION_DATA:

            return {
                ...state,
                ProfessionjiData: payload
            }

        case actionTypes.SET_NEW_HEALTH_MIND_DATA:

            return {
                ...state,
                HealthmindjiData: payload
            }

        case actionTypes.SET_LUCK_REPORT_DATA:

            return {
                ...state,
                LuckReportData: payload
            }

        case actionTypes.SET_PHILOSPHY_DATA:

            return {
                ...state,
                PhilosphyjidataData: payload
            }
        case actionTypes.SET_YOG_DATA:
            return {
                ...state,
                yogdata: payload
            }


        case actionTypes.SET_PANCHANG_DATA:
            return {
                ...state,
                panchangData: payload
            }

        case actionTypes.SET_MUHURAT_DATA:
            return {
                ...state,
                muhuratData: payload
            }
        case actionTypes.SET_DURMAHURAT:
            return {
                ...state,
                Durmahuratdata: payload
            }

        case actionTypes.SET_ABHIJEET_MAHURAT:
            return {
                ...state,
                Abhijeetmahurat: payload
            }

        case actionTypes.SET_CHOGADIYA_DATA:
            return {
                ...state,
                chogadiyaData: payload
            }
        case actionTypes.SET_MUHURAT_DUR_DATA:
            return {
                ...state,
                muhuratDD: payload
            }

        case actionTypes.SET_BASIC_PANCHANGE:
            return {
                ...state,
                Panchang: payload
            }

        case actionTypes.SET_PANCHANG_MONTH_DATA:
            return {
                ...state,
                PanchangData: payload
            }

        case actionTypes.SET_TARROT_DATA:
            return {
                ...state,
                Tarrotcarddata: payload
            }

            case actionTypes.SET_MATCH_MAGLIK:
            return {
                ...state,
                matchmanglik: payload
            }
            case actionTypes.SET_ASTKOOT_DOSA:
            return {
                ...state,
                astkootdosa: payload
            }
              case actionTypes.SET_MATCH_CONCLUSION:
            return {
                ...state,
                matchconlusion: payload
            }
             case actionTypes.SET_MATCHING_PREDICTION:
            return {
                ...state,
                MatchingPrediction: payload
            }  
             case actionTypes.SET_DOSHA_REMEDIES:
                return {
                    ...state,
                    Astakootdosharemedies: payload
                }
                case actionTypes.SET_GUN_DATA:
            return {
                ...state,
                matchgun: payload
            }
            case actionTypes.SET_PANCHANG_MONTHLY:
                return {
                    ...state,
                    panchangMonthly: payload
                }
            case actionTypes.SET_PANCHANG_MUHURAT:
                return {
                    ...state,
                    panchangMuhuratVivah: payload
                }
            case actionTypes.SET_MATCHING_DATA:
                return {
                    ...state,
                    NewMatchingData: payload
                }
        // case actionTypes.SET_PANCHANG_MONTHLY:
    }
}

export default kundli;