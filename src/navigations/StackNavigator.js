import { View, Text } from 'react-native';
import React from 'react';
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/auth/Login';
import CustomerLogin from '../screens/CustomerLogin';
import Signup from '../screens/auth/Signup';
import DrawerNavigator from './DrawerNavigator';
import Logout from '../screens/Logout';
import Otp from '../screens/auth/Otp';
import AstrologerLIst from './AstrologerLIst';
import AstrologerDetailes from '../screens/astrologers/AstrologerDetailes';
import AllRemedies from '../screens/customer/AllRemedies';
import Wallet from '../screens/payments/Wallet';
import BillHistory from '../screens/customer/BillHistory';
import CustomerOrderHistory from '../screens/customer/CustomerOrderHistory';
import Following from '../screens/customer/Following';
import HowUse from '../screens/blogs/HowUse';
import AskAstrologer from '../screens/customer/AskAstrologer';
import Testimonials from '../screens/customer/Testimonials';
import HelpSupport from '../screens/customer/HelpSupport';
import Setting from '../screens/customer/Setting';
import Kundli from '../screens/kundli/Kundli';
// import Matching from './Matching';
import SelectSign from '../screens/customer/SelectSign';
import TotalCard from './TotalCard';
import ChatIntakeForm from '../screens/chat/ChatIntakeForm';
import PlaceOfBirth from '../screens/PlaceOfBirth';
import ChatPickup from '../screens/chat/ChatPickup';
import CustomerChat from '../screens/chat/CustomerChat';
import CallIntakeForm from '../screens/customer/CallIntakeForm';
import ChatRating from '../screens/customer/ChatRating';
import ChatInvoice from '../screens/customer/ChatInvoice';
import AstroDateRegister from '../screens/customer/AstroDateRegister';
import ChoosePlan from '../screens/customer/ChoosePlan';
import ConnectWithFriends from './ConnectWithFriends';
import ShowKundli from '../screens/kundli/ShowKundli';
import KundliMatch from '../screens/kundli/KundliMatch';
import ShowHoroscope from '../screens/customer/ShowHoroscope';
import TarotCard from '../screens/customer/TarotCard';
import OneCardReading from '../screens/customer/OneCardReading';
import CustomerAccount from '../screens/auth/CustomerAccount';
import UserGuide from '../screens/customer/UserGuide';
import BlogDetailes from '../screens/customer/BlogDetailes';
import CallInvoice from '../screens/customer/CallInvoice';
import Notifications from '../screens/customer/Notifications';
import NotificationDetailes from '../screens/customer/NotificationDetailes';
import AstrodateChat from '../screens/customer/AstrodateChat';
import editkundli from '../screens/customer/editkundli';
import CallRating from '../screens/customer/CallRating';
import PhoneView from '../screens/customer/PhoneView';
import HowToScreenshots from '../screens/blogs/HowToScreenshots';
import HowToVideo from '../screens/blogs/HowToVideo';
import ViewRemedies from '../screens/customer/ViewRemedies';
// import downloadKundli from './DownloadKundli';
import Webpage from '../screens/customer/Webpage';
import AddNote from '../screens/customer/AddNote';
import HomeNotes from '../screens/customer/HomeNotes';
import Trash from '../screens/customer/Trash';
import UpdateNote from '../screens/customer/UpdateNote';
import Religion from '../screens/blogs/Religion';
import DailyPanchang from '../screens/blogs/DailyPanchang';
import BirhatHoroscope from '../screens/blogs/BirhatHoroscope';
import Magazine from '../screens/blogs/Magazine';
import Remedies from '../screens/blogs/Remedies';
import Language from '../screens/language/language';
import YellowBook from '../screens/customer/YellowBook';
import AuspicionsTime from '../screens/customer/AuspicionsTime';
import AskQuestion from '../screens/customer/AskQuestions';
import { useTranslation } from 'react-i18next';
import ShowPachang from '../screens/kundli/ShowPachang';
import GiftOrderHistory from '../screens/customer/GiftOrderHistory';
import WalletGST from '../screens/customer/WalletGST';
import WalletGstAmount from '../screens/payments/WalletGstAmount';
import WalletGstOffer from '../screens/customer/WalletGstOffer';
import AstroBlogsRedirect from '../screens/customer/AstroBlogsRedirect';
import Year from '../screens/home/Year';
import YearDoucments from '../screens/customer/YearDocuments';
import WalletHistroy from '../screens/history/WalletHistroy';
import ShowKundliBasic from '../screens/kundli/ShowKundliBasic';
import ShowKundliCharts from '../screens/kundli/ShowKundliCharts';
import ShowKundliPlanets from '../screens/kundli/ShowKundliPlanets';
import ShowKundliKpPlanets from '../screens/kundli/ShowKundliKpPlanets';
import ShowKundliKpHouseCusp from '../screens/kundli/ShowKundliKpHouseCusp';
import ShowDashna from '../screens/kundli/ShowDashna';
import HouseReport from '../screens/kundli/HouseReport';
import KundliBirthDetailes from '../screens/kundli/KundliBirthDetailes';
import NewMatching from '../screens/kundli/NewMatching';
import AstrologerSignUp from '../screens/auth/AstrologerSignUp';
import ProductCategory from '../screens/ecommerce/ProductCategory';
import Products from '../screens/ecommerce/Products';
import ProductDetails from '../screens/ecommerce/ProductDetails';
import Cart from '../screens/ecommerce/Cart';
import AstromallCategory from '../screens/astromall/AstromallCategory';
import PoojaDetails from '../screens/astromall/PoojaDetails';
import RegisteredPooja from '../screens/astromall/RegisteredPooja';
import AstromallHistroy from '../screens/astromall/AstromallHistroy';
import BookedPoojaDetails from '../screens/astromall/BookedPoojaDetails';
import Panchange from './Panchange';
import Ashtakvarga from '../screens/kundli/Ashtakvarga';
import Sarvastak from '../screens/kundli/Sarvastak';
import AscedentReport from '../screens/kundli/AscedentReport';
import BasicPanchang from '../screens/kundli/BasicPanchang';
import Numerologynavigation from './Numerologynavigation';
import MatchReport from '../screens/customer/showkundli/Matching/MatchReport';
import Dashakoota from '../screens/customer/showkundli/Matching/Dashakoota';
import Conclusion from '../screens/customer/showkundli/Matching/Conclusion';
import BasicMatching from '../screens/customer/showkundli/Matching/BasicMatching';
import RashiReport from '../screens/kundli/RashiReport';
import BasicAstro from '../screens/customer/showkundli/Matching/BasicAstro';
import Chart from '../screens/customer/showkundli/Matching/Chart';
import Ascendent from '../screens/customer/showkundli/Matching/Ascendent';
import ProductHistory from '../screens/ecommerce/ProductHistory';
import AstroBlogs from '../screens/customer/AstroBlogs';
import Numerology from '../screens/kundli/Numerology';
import NumerologyForU from '../screens/kundli/NumerologyForU';
import NewMatching1 from '../screens/kundli/Match/NewMatching1';
import Matching1 from './Matching1';
import PlaceOfBirth2 from '../screens/kundli/Match/PlaceOfBirth2';
import daily from '../screens/customer/horoscope/daily';
import OrderHisory from '../screens/history/OrderHisory';
import Productfull from '../screens/history/Productfull';
// import Poojainfo from '../screens/pooja/Poojainfo';
import VideocallInvoice from '../screens/chat/components/VideocallInvoice';
import AstroForVideo from '../screens/astrologers/AstroForVideo';
// import PoojaListDetails from '../screens/pooja/PoojaListDetails';
import PoojaDetails2 from '../screens/pooja/PoojaDetails2';
import PoojaStatus from '../screens/pooja/PoojaStatus';
import PaymentModal from '../Modal/PaymentModal';
import Navgrah from '../screens/TempleScreens/Navgrah';
import Sanatan from '../screens/TempleScreens/Sanatan';
import Shivalya from '../screens/TempleScreens/Shivalya';
import VardaniBargad from '../screens/TempleScreens/VardaniBargad';
import Artithali from '../screens/Dragable/Artithali';
import Coconut from '../screens/Dragable/Coconut';
import AstrologerDetailesChat from '../screens/astrologers/components/AstrologerDetailesChat';
import ReferEarn from '../screens/ReferEarn';
import About from '../screens/about';
import AstrologerLogin from '../screens/auth/AstrologerLogin';
import VerfiedAstrologer from '../screens/auth/VerfiedAstrologer';
import ForgotPassword from '../screens/auth/ForgotPassword';
import SendGifts from '../screens/SendGifts';
import CustomerTestimonials from '../screens/CustomerTestimonials';
import PujaSection from '../screens/Religion Collection/PujaSection';
import BookPooja from '../screens/Religion Collection/BookPooja';
import DetailPujaScreens from '../screens/Religion Collection/DetailPujaScreens';
import AartiDetails from '../screens/Religion Collection/AartiDetails';
import PoojaVidhiDetails from '../screens/Religion Collection/PoojaVidhiDetails';
import NewPanchang from '../screens/Pachang/NewPanchang';
import HomeSimmer from '../components/HomeSimmer';
import AddAddress from '../screens/ecommerce/AddAddress';
import Address from '../screens/ecommerce/Address';
import UpdateAddress from '../screens/ecommerce/UpdateAddress';
import NewSanatan from '../screens/TempleScreens/NewSanatan';
import AstroForCall from '../screens/astrologers/AstroForCall';
import signSecret from '../screens/kundli/signSecret';
// import KaalSarrp from '../screens/kundli/KaalSarrp';
import TermsofUse from '../screens/TermsofUse';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Astkoota from '../screens/Match/Astkoota';

import MatchConculsion from '../screens/Match/MatchConculsion';
import ShowReligiosDetails from '../screens/Religion Collection/ShowReligiosDetails';
import ChalitChart from '../screens/customer/showkundli/ChalitChart';
import ShowTotalPradhan from '../screens/TempleScreens/ShowTotalPradhan';
import AllPujaByCategory from '../screens/pooja/AllPujaByCategory';
import PujaDetails from '../screens/pooja/PujaDetails';
import PujaCart from '../screens/pooja/PujaCart';
import AddressCarts from '../screens/pooja/AddressCarts';
// import Houses from '../screens/kundli/Houses';
// import Sadhedati from '../screens/kundli/Sadhesati/Sadhedati';
// import AllPridictions from '../screens/kundli/Pridictions/AllPridictions';
// import Vinhottipredictions from '../screens/kundli/Vinhottri/Vinhottipredictions';
import MatchingConclusivePrediction from '../screens/customer/showkundli/Matching/MatchingConclusivePrediction';
import DivyaRashi from '../screens/history/DivyaRashi';
import WebViewLyrics from '../screens/TempleScreens/Components/WebViewLyrics';
import PursharthaWallet from '../screens/payments/PursharthaWallet';
import NewShowKundli from '../screens/kundli/NewShowKundli';
import Vedicjyoti from '../screens/kundli/Saprishi/Vedicjyoti';
import TRIKAALDARSHI from '../screens/kundli/Saprishi/TRIKAALDARSHI';
// import kaalsarpmain from '../screens/kundli/Kaalsarpmain';
// import Kaalsarpmain from '../screens/kundli/Kaalsarpmain';
import GEMSTONEBABA from '../screens/kundli/Saprishi/Gemstonebaba';
import Gemstonebaba from '../screens/kundli/Saprishi/Gemstonebaba';
import DivyaDrishti from '../screens/kundli/Saprishi/DivyaDrishti';
import NewNumerology from '../screens/kundli/NewNumerology';
import NewTarotCard from '../screens/kundli/NewTarotCard';
import LuckyGemstone from '../screens/kundli/LuckyGemstone';
import KrsihnaMurti from '../screens/kundli/Saprishi/KrsihnaMurti';
import AstkootDoshasRemedies from '../screens/customer/showkundli/Matching/AstkootDoshasRemedies';
import SelectSignnew from '../screens/customer/SelectSignnew';
import VRView from '../screens/VRView';
import ViroImage from '../screens/VRAndAR/ViroImage';
import WelcomeScreen from '../screens/LetterTogod/WelcomeScreen';
import ChatScreen from '../screens/LetterTogod/ChatScreen';
import WebVRViewer from '../screens/VRAndAR/WebVr';
import VRWebView from '../screens/VRAndAR/VRWebView';
import CustomVRSkia from '../screens/VRAndAR/CustomVRSkia';
import Allservices from '../screens/Recharge/Allservices';
import SelectOperator from '../screens/Recharge/Mobile/SelectOperator';
import MobileRecharge from '../screens/Recharge/Mobile/MobileRecharge';
import CheckOffer from '../screens/Recharge/Mobile/CheckOffer';
import ViewPlan from '../screens/Recharge/Mobile/ViewPlan';
import SelectPlanTab from '../screens/Recharge/Mobile/SelectPlanTab';
import Electricity from '../screens/Recharge/Electricity/Electricity';
import ElectricityProvidersList from '../screens/Recharge/Electricity/ElectricityProvidersList';
import ElectricityPayment from '../screens/Recharge/Electricity/ElectricityPayment';
import Dth from '../screens/Recharge/DTH/Dth';
import DthRechargeNew from '../screens/Recharge/DTH/DthRechargeNew';
import MobileNumbertoDth from '../screens/Recharge/DTH/MobileNumbertoDth';
import PanoramaView from '../screens/VRAndAR/PanoramaView';
import RechargePrepaid from '../screens/Recharge/Mobile/RechargePrepaid';
import Popular from '../screens/Recharge/Mobile/Popular';
import GasOperators from '../screens/Recharge/Gas/GasOperators';
import GasAmount from '../screens/Recharge/Gas/GasAmount';
import Gas from '../screens/Recharge/Gas/Gas';
import HeavyRefresh from '../screens/Recharge/DTH/HeavyRefresh';
import DthInfo from '../screens/Recharge/DTH/DthInfo';
import ElectricityPaymentProcess from '../screens/Recharge/Electricity/ElectricityPaymentProcess';
import Udhaar from '../screens/Recharge/Mobile/Udhaar';
import Dthconfirm from '../screens/Recharge/DTH/Dthconfirm';
import Prediction from '../screens/kundli/Prediction';
import WhoAMI from '../screens/kundli/Predictions/WhoAMI';
import Astkootdosha from '../screens/kundli-old/Match/Astkootdosha';
import RechargePostpaidAmount from '../screens/Recharge/Mobile/RechargePostpaidAmount';
import Fasttag from '../screens/Recharge/Fasttag/Fasttag';
import Fasttagvehicle from '../screens/Recharge/Fasttag/Fasttagvehicle';
import FasttagPayment from '../screens/Recharge/Fasttag/FasttagPayment';
// import VrUnity from '../screens/VRAndAR/VrUnity';
import MangliMatch from '../screens/Match/MangliMatch';
import AstkootaGun from '../screens/Match/AstkootaGun';
import PanchangMonthlys from '../screens/Pachang/PanchangMonthly';
import ChatDhamYatra from '../screens/VRAndAR/CharDhamYatra';
import WaterPage from '../screens/Recharge/WATER/WaterPage';
import WaterBillPage from '../screens/Recharge/WATER/WaterBillPage';
import MunicipalProviders from '../screens/Recharge/MunicipalTax/MunicipalProviders';
import MunicipalTaxPageData from '../screens/Recharge/MunicipalTax/MunicipalTaxPageData';
import LandLineProviders from '../screens/Recharge/LandLine/LandLineProviders';
import LandLineBillPage from '../screens/Recharge/LandLine/LandLineBillPage';
import BroadBandProviders from '../screens/Recharge/BroadBand/BroadBandProviders';
import BroadBandBillPage from '../screens/Recharge/BroadBand/BroadBandBillPage';
import AllCategory from '../screens/pooja/AllCategory';
import GasPiped from '../screens/Recharge/GasPiped/GasPiped';
import GasPipedOperators from '../screens/Recharge/GasPiped/GasPipedOperators';
import GasPipedAmount from '../screens/Recharge/GasPiped/GasPipedAmount';
import Dham from '../screens/VRAndAR/Dham';
import selectmapsantan from '../screens/VRAndAR/selectmapSantan';
import ARImage from '../screens/VRAndAR/ArImage';
import SelectMapVr from '../screens/VRAndAR/selectMapVR';
import LiveChatCall from '../screens/history/LiveChatCall';
import GodVideo from '../screens/video/GodVideo';
import RazorpayWeb from '../screens/home/components/razorpayWeb';
// import VrUnity from '../screens/VRAndAR/VrUnity';

const Stack = createNativeStackNavigator();

const StackNavigator =  ({ data1 }) => {
  const { t } = useTranslation();
  return (
    // data?.data1?.redirect_app
    <Stack.Navigator initialRouteName={"splash"}>
      <Stack.Screen name="splash" options={{ headerShown: false}}>
        {props => <Splash {...props} data1={data1} />}
      </Stack.Screen>
     
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="customerLogin" component={CustomerLogin} />
      <Stack.Screen name="signup" component={Signup} />

      <Stack.Screen name='CustomVrSkia' component={CustomVRSkia} options={{ headerShown: false }} />
      <Stack.Screen name="VrWebView" component={VRWebView} options={{ headerShown: false }} />

      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="astrologerSignUp" component={AstrologerSignUp} />
        <Stack.Screen name="home" component={DrawerNavigator} />
        <Stack.Screen name="showKundli" component={ShowKundli} />

        {/* <Stack.Screen name="NewShowKundli" component={NewShowKundli} /> */}
        {/* <Stack.Screen name="Vedicjyoti" component={Vedicjyoti} /> */}
        {/* <Stack.Screen name="TRIKAALDARSHI" component={TRIKAALDARSHI} /> */}
        {/* <Stack.Screen name="Kaalsarpmain" component={Kaalsarpmain} /> */}
        <Stack.Screen name="Gemstonebaba" component={Gemstonebaba} />
        <Stack.Screen name="DivyaDrishti" component={DivyaDrishti} />
        {/* <Stack.Screen name="NewNumerology" component={NewNumerology} /> */}

        <Stack.Screen name="NewTarotCard" component={NewTarotCard} />
        <Stack.Screen name="LuckyGemstone" component={LuckyGemstone} />
        <Stack.Screen name="KrsihnaMurti" component={KrsihnaMurti} />


        <Stack.Screen name="kundliBasicDetails" component={NewShowKundli} />
        <Stack.Screen name="showKundliCharts" component={ShowKundliCharts} />
        <Stack.Screen name="showKundliPlanets" component={ShowKundliPlanets} />
        {/* <Stack.Screen name="poojainfo" component={Poojainfo} /> */}
        <Stack.Screen name="PoojaDetails2" component={PoojaDetails2} />
        <Stack.Screen name="PoojaStatus" component={PoojaStatus} />
        <Stack.Screen name="PaymentModal" component={PaymentModal} />

        <Stack.Screen name='Artithali' component={Artithali} />
        <Stack.Screen name='Coconut' component={Coconut} />
        <Stack.Screen name='AstrologerDetailesChat' component={AstrologerDetailesChat} />
        <Stack.Screen name='ReferEarn' component={ReferEarn} />
        <Stack.Screen name='about' component={About} />
        <Stack.Screen name='AstrologerLogin' component={AstrologerLogin} />
        <Stack.Screen name='VerfiedAstrologer' component={VerfiedAstrologer} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />

        <Stack.Screen name='SendGifts' component={SendGifts} />
        <Stack.Screen name='CustomerTestimonials' component={CustomerTestimonials} />
        <Stack.Screen name='PujaSection' component={PujaSection} />
        <Stack.Screen name='BookPooja' component={BookPooja} />
        <Stack.Screen name='DetailPujaScreens' component={DetailPujaScreens} />
        <Stack.Screen name='AartiDetails' component={AartiDetails} />
        <Stack.Screen name='PoojaVidhiDetails' component={PoojaVidhiDetails} />

        <Stack.Screen name='NewPanchang' component={NewPanchang} />
        <Stack.Screen name='AstkootDoshasRemedies' component={AstkootDoshasRemedies} />

        {/* kundli click left apis */}

        {/* <Stack.Screen name='Houses' component={Houses} /> */}
        {/* <Stack.Screen name='Sadhedati' component={Sadhedati} /> */}
        {/* <Stack.Screen name='AllPridictions' component={AllPridictions} /> */}
        {/* <Stack.Screen name='Vinhottipredictions' component={Vinhottipredictions} /> */}
        <Stack.Screen name='MatchingConclusivePrediction' component={MatchingConclusivePrediction} />








        <Stack.Screen
          name="showKundliKpPlanets"
          component={ShowKundliKpPlanets}
        />
        <Stack.Screen
          name="showKundliKpHouseCusp"
          component={ShowKundliKpHouseCusp}
        />
        <Stack.Screen name="showDashna" component={ShowDashna} />
        <Stack.Screen name="houseReport" component={HouseReport} />
        <Stack.Screen name='rashiReport' component={RashiReport} />
        <Stack.Screen name='astakvarga' component={Ashtakvarga} />
        <Stack.Screen name='sarvastak' component={Sarvastak} />
        <Stack.Screen name='ascednt' component={AscedentReport} />
        <Stack.Screen name='bascipanchang' component={BasicPanchang} />
        <Stack.Screen name='numerology' component={Numerologynavigation} />
        <Stack.Screen name='basicmatch' component={BasicMatching} />
        <Stack.Screen name='conclusion' component={Conclusion} />
        <Stack.Screen name='dashakoota' component={Dashakoota} />
        {/* <Stack.Screen name='chart' component={Chart}/> */}
        <Stack.Screen name='matchreport' component={MatchReport} />
        <Stack.Screen name='numero' component={Numerology} />
        <Stack.Screen name='NumerologyForU' component={NumerologyForU} />
        <Stack.Screen
          name="kundliBirthDetailes"
          component={KundliBirthDetailes}
        />
        <Stack.Screen name="newMatching" component={NewMatching} />
        <Stack.Screen name="howUse" component={HowUse} />
        <Stack.Screen name="HowToScreenshots" component={HowToScreenshots} />
        <Stack.Screen name="HowToVideo" component={HowToVideo} />
        <Stack.Screen name="birhatHoroscope" component={BirhatHoroscope} />
        <Stack.Screen name="SelectSignnew" component={SelectSignnew} />
        <Stack.Screen
          name="magazine"
          component={Magazine}
        // options={{title: t('astrokunj_magazine')}}
        />
        <Stack.Screen
          name="remedies"
          component={Remedies}
          options={{ title: t('remedies') }}
        />
        <Stack.Screen name='panchange' component={Panchange} />
        <Stack.Screen name="basciAstro" component={BasicAstro} />
        <Stack.Screen name="chart" component={Chart} />
        <Stack.Screen name="matchAsc" component={Ascendent} />
        <Stack.Screen name="allRemedies" component={AllRemedies} />
         <Stack.Screen name="NewShowKundli" component={NewShowKundli} />
        <Stack.Screen name="Vedicjyoti" component={Vedicjyoti} />
        <Stack.Screen name="NewNumerology" component={NewNumerology} />
        <Stack.Screen name="BasicMatching" component={BasicMatching} />
        <Stack.Screen name="Astkoota" component={Astkoota} />
        <Stack.Screen name="Prediction" component={Prediction} />
        <Stack.Screen name="AstkootaGun" component={AstkootaGun} />
        <Stack.Screen name="TRIKAALDARSHI" component={TRIKAALDARSHI} />
        <Stack.Screen name="WhoAMI" component={WhoAMI} />
        <Stack.Screen
          name="DailyPanchang"
          component={DailyPanchang}
          options={{ title: t('dp1') }}
        />
        <Stack.Screen
          name="yellowBook"
          component={YellowBook}
          options={{ title: t('yellow_book') }}
        />
        <Stack.Screen
          name="auspicions"
          component={AuspicionsTime}
          options={{ title: t('muhurat') }}
        />
        <Stack.Screen name="yeardocuments" component={YearDoucments} />
        <Stack.Screen name="productCategory" component={ProductCategory} />
        <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
        <Stack.Screen name="Addaddress" component={AddAddress} options={{ headerShown: false }} />
        <Stack.Screen name="updateaddress" component={UpdateAddress} options={{ headerShown: false }} />

        <Stack.Screen name="products" component={Products} />
        <Stack.Screen name='productHistory' component={ProductHistory} />
        <Stack.Screen name="productDetails" component={ProductDetails} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name='astromallCategory' component={AstromallCategory} />
        <Stack.Screen name='poojaDetails' component={PoojaDetails} />
        <Stack.Screen name='registeredPooja' component={RegisteredPooja} />
        <Stack.Screen name='astromallHistroy' component={AstromallHistroy} />
        <Stack.Screen name='bookedPoojaDetails' component={BookedPoojaDetails} />
      </Stack.Group>
      <Stack.Screen name="OrderHistory" component={OrderHisory} options={{ headerShown: false }} />
      <Stack.Screen name="productFull" component={Productfull} options={{ headerShown: false }} />
      <Stack.Screen name="GiftOrderHistory" component={GiftOrderHistory} />
      <Stack.Screen name="logout" component={Logout} />
      <Stack.Screen name="otp" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen name="astrologerList" component={AstrologerLIst} />
      <Stack.Screen name="astrologerDetailes" component={AstrologerDetailes} />
      <Stack.Screen name="wallet" component={Wallet} />
      <Stack.Screen name="PursharthaWallet" component={PursharthaWallet} />
      <Stack.Screen name="billHistory" component={BillHistory} />
      <Stack.Screen
        name="customerOrderHistory"
        component={CustomerOrderHistory}
      />
      <Stack.Screen name="following" component={Following} />
     
      {/* <Stack.Screen name="newmatching" component={NewMatching1} /> */}
      <Stack.Screen name="matching" component={Matching1} />

      <Stack.Screen name="askAstrologer" component={AskAstrologer} />
      <Stack.Screen name="testimonials" component={Testimonials} />
      <Stack.Screen name="helpSupport" component={HelpSupport} />
      <Stack.Screen name="setting" component={Setting} />
      <Stack.Screen name="kundli" component={Kundli} />
      {/* <Stack.Screen name="matching" component={Matching} /> */}
      <Stack.Screen name="selectSign" component={SelectSign} options={{ headerShown: false }} />
      <Stack.Screen name="totalCard" component={TotalCard} />

      <Stack.Screen name="placeOfBirth" component={PlaceOfBirth} />
      <Stack.Screen name='birthplace' component={PlaceOfBirth2} />
      <Stack.Screen name="chatPickup" component={ChatPickup} />
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="customerChat"
          component={CustomerChat}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="chatIntakeForm" component={ChatIntakeForm} />
        <Stack.Screen name="walletHistroy" component={WalletHistroy} />
        <Stack.Screen
          name="religion"
          component={Religion}
        // options={{ title: t('religion1') }}
        />

      </Stack.Group>

      <Stack.Screen name="callIntakeForm" component={CallIntakeForm} />
      
     
      <Stack.Screen name="chatRating" component={ChatRating} />
      <Stack.Screen
        name="chatInvoice"
        component={ChatInvoice}
        options={{ animation: 'fade', headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="astroDateRegister" component={AstroDateRegister} />
      <Stack.Screen name="choosePlan" component={ChoosePlan} />
      <Stack.Screen name="connectWithFriends" component={ConnectWithFriends} />
      <Stack.Screen name="kundliMatch" component={KundliMatch} options={{ headerShown: false }}/>
      <Stack.Screen name="showHoroscope" component={ShowHoroscope} />
      <Stack.Screen name="tarotCard" component={TarotCard} />
      <Stack.Screen name="oneCardReading" component={OneCardReading} />
      <Stack.Screen name="customerAccount" component={CustomerAccount} />
      <Stack.Screen name="userGuide" component={UserGuide} />
      <Stack.Screen name="blogDetailes" component={BlogDetailes} />
      <Stack.Screen name='dailyhoro' component={daily} options={{ headerShown: false }} />
      <Stack.Screen name='AstroForCall' component={AstroForCall} options={{ headerShown: false }} />
      <Stack.Screen
        name="callInvoice"
        component={CallInvoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen
        name="notificationDetailes"
        component={NotificationDetailes}
      />
      <Stack.Screen name='liveChatCall' component={LiveChatCall} options={{ headerShown: false}}/>
      <Stack.Screen name="astrodateChat" component={AstrodateChat} />

      {/* //Prvider  */}
      <Stack.Screen name="editkundli" component={editkundli} />
      <Stack.Screen name="callRating" component={CallRating} />
      <Stack.Screen
        name="phoneView"
        component={PhoneView}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ViewRememdies" component={ViewRemedies} />
      {/* <Stack.Screen name="DownloadKundali" component={downloadKundli} /> */}
      <Stack.Screen name="Webpage" component={Webpage} />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{ title: 'New note' }}
      />
      <Stack.Screen
        name="Notes"
        component={HomeNotes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateNote"
        component={UpdateNote}
        options={{ title: 'Note' }}
      />

      <Stack.Screen
        name="askQuestion"
        component={AskQuestion}
        options={{ title: t('ask_a_question') }}
      />
      <Stack.Screen name="language" component={Language} />
      <Stack.Screen name="showPachang1" component={ShowPachang} />
      <Stack.Screen name="walletgst" component={WalletGST} />
      <Stack.Screen name="WalletGstAmount" component={WalletGstAmount} />
      <Stack.Screen name="walletgstoffer" component={WalletGstOffer} />
      <Stack.Screen name="astroBlogsRedirect" component={AstroBlogsRedirect} />
      <Stack.Screen name="year" component={Year} />
      <Stack.Screen name='astroBlog' component={AstroBlogs} />
      <Stack.Screen name='VideoInvoice' component={VideocallInvoice} options={{ headerShown: false }} />

      {/* Temples Screen */}

      <Stack.Screen name='Navgrah' component={Navgrah} options={{ headerShown: false }} />
      <Stack.Screen name='Sanatan' component={NewSanatan} options={{ headerShown: false }} />
      <Stack.Screen name='VardaniBargad' component={VardaniBargad} options={{ headerShown: false }} />
      <Stack.Screen name='Shivalya' component={Shivalya} options={{ headerShown: false }} />
      <Stack.Screen name='SignSecret' component={signSecret} options={{ headerShown: false }} />
      {/* <Stack.Screen name='KaalSarrp' component={KaalSarrp} options={{ headerShown: false }} /> */}
      <Stack.Screen name='TermsofUse' component={TermsofUse} options={{ headerShown: false }} />
      <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{ headerShown: false }} />
      <Stack.Screen name='Astkoot' component={Astkoota} options={{ headerShown: false }} />
      <Stack.Screen name='dosa' component={Astkootdosha} options={{ headerShown: false }} />
      <Stack.Screen name='manglikDosa' component={MangliMatch} options={{ headerShown: false }} />
      <Stack.Screen name='Conclusiondata' component={MatchConculsion} options={{ headerShown: false }} />
      <Stack.Screen name='ShowReligiousDetails' component={ShowReligiosDetails} options={{ headerShown: false }} />
      <Stack.Screen name='ChalitChart' component={ChalitChart} options={{ headerShown: false }} />
      <Stack.Screen name='ShowTotalPradhan' component={ShowTotalPradhan} options={{ headerShown: false }} />
      <Stack.Screen name='AllPujaByCategory' component={AllPujaByCategory} options={{ headerShown: false }} />
      <Stack.Screen name='PujaDetails' component={PujaDetails} options={{ headerShown: false }} />
      <Stack.Screen name='PujaCart' component={PujaCart} options={{ headerShown: false }} />

      <Stack.Screen name="AddressCart" component={AddressCarts} options={{ headerShown: false }} />

      <Stack.Screen name="divyaRashi" component={DivyaRashi} options={{ headerShown: false }} />
      <Stack.Screen name="webViewLyrics" component={WebViewLyrics} options={{ headerShown: false }} />
      <Stack.Screen name="VRView" component={WebVRViewer} options={{ headerShown: false }} />
      <Stack.Screen name="VRView1" component={VRView} options={{ headerShown: false }} />
      <Stack.Screen name="PanoramaView" component={PanoramaView} options={{ headerShown: false }} />

      {/* VR and AR images*/}
      <Stack.Screen name="ViroImage" component={ViroImage} options={{ headerShown: false }} />
      {/* <Stack.Screen name="VrUnity" component={VrUnity}  options={{ headerShown: false }} /> */}
      <Stack.Screen name="charDhamYatraVr" component={ChatDhamYatra} options={{ headerShown: false}} />




      <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Chat' component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Allservices' component={Allservices} options={{ headerShown: false }} />
      <Stack.Screen name='SelectOperator' component={SelectOperator} options={{ headerShown: false }} />
      <Stack.Screen name='MobileRecharge' component={MobileRecharge} options={{ headerShown: false }} />
      <Stack.Screen name='CheckOffer' component={CheckOffer} options={{ headerShown: false }} />
      <Stack.Screen name='ViewPlan' component={ViewPlan} options={{ headerShown: false }} />
      <Stack.Screen name='SelectPlanTab' component={SelectPlanTab} options={{ headerShown: false }} />
      <Stack.Screen name='Electricity' component={Electricity} options={{ headerShown: false }} />
      <Stack.Screen name='ElectricityProvidersList' component={ElectricityProvidersList} options={{ headerShown: false }} />
      <Stack.Screen name='ElectricityPayment' component={ElectricityPayment} options={{ headerShown: false }} />
      <Stack.Screen name='Dth' component={Dth} options={{ headerShown: false }} />

      <Stack.Screen name='DthRechargeNew' component={DthRechargeNew} options={{ headerShown: false }} />
      <Stack.Screen name='MobileNumbertoDth' component={MobileNumbertoDth} options={{ headerShown: false }} />


      <Stack.Screen name='Recharge' component={RechargePrepaid} options={{ headerShown: false }} />
      <Stack.Screen name='Popular' component={Popular} options={{ headerShown: false }} />
      <Stack.Screen name='GasOperators' component={GasOperators} options={{ headerShown: false }} />
      <Stack.Screen name='GasAmount' component={GasAmount} options={{ headerShown: false }} />
      <Stack.Screen name='Gas' component={Gas} options={{ headerShown: false }} />
      <Stack.Screen name='HeavyRefresh' component={HeavyRefresh} options={{ headerShown: false }} />
      <Stack.Screen name='DthInfo' component={DthInfo} options={{ headerShown: false }} />
      <Stack.Screen name='ElectricityPaymentProcess' component={ElectricityPaymentProcess} options={{ headerShown: false }} />
      <Stack.Screen name='Udhaar' component={Udhaar} options={{ headerShown: false }} />
      <Stack.Screen name='Dthconfirm' component={Dthconfirm} options={{ headerShown: false }} />
      <Stack.Screen name='Fasttag' component={Fasttag} options={{ headerShown: false }} />
      <Stack.Screen name='Fastagvechicle' component={Fasttagvehicle} options={{ headerShown: false }} />
      <Stack.Screen name='Fastagpayment' component={FasttagPayment} options={{ headerShown: false }} />
      <Stack.Screen name='WaterPage' component={WaterPage} options={{ headerShown: false }} />
      <Stack.Screen name='WaterBillPage' component={WaterBillPage} options={{ headerShown: false }} />
      <Stack.Screen name='MunicipalProviders' component={MunicipalProviders} options={{ headerShown: false }} />
      <Stack.Screen name='MunicipalTaxPageData' component={MunicipalTaxPageData} options={{ headerShown: false }} />
      <Stack.Screen name='LandLineProviders' component={LandLineProviders} options={{ headerShown: false }} />
      <Stack.Screen name='LandLineBillPage' component={LandLineBillPage} options={{ headerShown: false }} />
      <Stack.Screen name='BroadBandProviders' component={BroadBandProviders} options={{ headerShown: false }} />
      <Stack.Screen name='BroadBandBillPage' component={BroadBandBillPage} options={{ headerShown: false }} />
      <Stack.Screen name="GasPiped" component={GasPiped} options={{ headerShown: false}} />
      <Stack.Screen name="GasPipedOperators" component={GasPipedOperators} options={{ headerShown: false}} />
      <Stack.Screen name="GasPipedAmount" component={GasPipedAmount} options={{ headerShown: false}} />


      
      <Stack.Screen name="RechargePostpaidPayment" component={RechargePostpaidAmount} options={{ headerShown: false}} />

      <Stack.Screen name='PanchangMonthly' component={PanchangMonthlys} options={{ headerShown: false }} />
      <Stack.Screen name="AllCategory" component={AllCategory} options={{ headerShown: false}} />

      {/* three dhams */}
      <Stack.Screen name="Dham" component={Dham} options={{ headerShown: false}} />
      <Stack.Screen name="selectmapsantan" component={selectmapsantan} options={{ headerShown: false}} />
      <Stack.Screen name="selectmapvr" component={SelectMapVr} options={{ headerShown: false}} />
      <Stack.Screen name="ArImage" component={ARImage} options={{ headerShown: false}} />

      <Stack.Screen name="GodVideo" component={GodVideo} options={{ headerShown: false}} />
      <Stack.Screen name="razorpayweb" component={RazorpayWeb}  options={{ headerShown: false}}/>

    </Stack.Navigator>
  );
};

export default StackNavigator;

// vDyrZdnqcvTtYK8F9BlDDDFWTaF2
