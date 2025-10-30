
import { Dimensions, PixelRatio } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const language_key = 'AIzaSyBLZeGSEW1ZbCh5MsOZq9W3wCCSK-NX0os';

// test server

export const base_url = "https://api.astroone.in/";
export const img_url = "https://api.astroone.in/uploads/";
export const api_url = "https://api.astroone.in/api/";

export const api_url_recharge = 'https://rechargeapi.astrosetalk.com/api/'
export const refund_razorpay = 'recharge/refund-recharge'
// live server

export const get_delete_account_data = 'customers/delete_account'
export const get_notification_data = 'customers/get_custmer_notification'
export const get_gift_data = 'customers/get-All-wallet-history-customer'
export const generator_call_id = 'customers/VideoCallIDGenerator'
export const endvidocall = 'customers/endvideocall'
export const customer_login = 'customers/customer-login';
export const customer_google_login = 'customers/customer_google_login';
export const verify_customer = 'customers/verify-customer';
export const get_customer_detail = 'customers/get-customer-detail';
export const update_customer_details = 'customers/update-customer-details';
export const customer_home_banner = 'customers/customer-home-banner';
export const get_active_astrologer = 'astrologer/get_active_astrologer';
export const get_astrologer_details = 'astrologer/get-astrologer-details';
export const get_all_pooja_list = '/ecommerce/get_puja'
export const book_pooja = 'ecommerce/book_puja';
export const get_puja_history_data = 'ecommerce/get_customer_puja_history'

export const get_verified_astrologer_review =
  'admin/get-verified-astrologer-review';
export const get_live_streaming = 'customers/get_live_streaming';
export const get_recent_live_streaming = 'customers/get_recent_live_streaming';
export const send_gift_in_live_streaming = 'customers/send_gift_in_live_streaming';
export const get_all_gift = 'admin/get-all-gift';
export const recharge_customer_wallet = 'customers/recharge-customer-wallet';
export const create_razorpay_order = 'customers/create_razorpay_order';
export const get_customer_all_recharge_plan = 'customers/get_customer_all_recharge_plan';
export const initiate_call_with_exotel = 'customers/initiate_call_with_exotel';
export const get_call_astrologer = 'astrologer/get_call_astrologer';
export const get_video_call_astrologers = 'astrologer/get_video_call_astrologer';
export const get_chat_astrologer = 'astrologer/get_chat_astrologer';
export const get_video_call_astrologer = 'astrologer/get_video_call_astrologer';
export const check_chat_status = 'astrologer/check-chat-status';
export const initiate_chat = 'customers/initiate-chat';
export const get_linked_profile = 'customers/get-linked-profile';
export const add_profile = 'customers/add-profile';
export const store_file = 'customers/store-file';
export const customers_call_history = 'customers/customers-call-history';
export const customers_chat_history = 'customers/customers-chat-history';
export const customers_video_history = 'customers/get_videocall_history'
export const get_chat_details = 'customers/get_chat_details';
export const delete_linked_data = 'customers/delete_linked_profile'
export const get_customer_live_calls = 'customers/get_customer_live_calls';
export const customers_wallet_history = 'customers/customers_wallet_history';
export const add_review = 'admin/add-review';
export const get_gifsanatan = 'admin/get_temple';
export const get_baghwan = 'admin/get-darshan';
export const get_pooja_category = 'admin/get-pooja-items';
export const get_referres = 'customers/top-referrers';
export const get_mudra = 'admin/balance';
export const get_lota_mudra = 'admin/add_mudra';
export const check_customer_following = 'customers/check_customer_following';
export const follow_astrolgoer = 'customers/follow_astrolgoer';
export const get_customer_following = 'customers/get_customer_following';
export const get_all_religion_spirituality = 'admin/get-all-religion-spirituality';
export const add_astrologer_inquiry = 'astrologer/add-astrologer-inquiry';
export const get_app_tutorials = 'admin/get_app_tutorials';
export const get_all_birhat_horoscope = 'admin/get-all-birhat-horoscope';
export const get_all_astro_magazine = 'admin/get-all-astro-magazine';
export const get_all_remedies = 'admin/get-all-remedies';
export const get_all_daily_panchang = 'admin/get-all-daily-panchang';
export const get_all_yellow_book = 'admin/get-all-yellow-book';
export const get_all_auspicious_time = 'admin/get-all-auspicious-time';
export const get_astro_companion = 'admin/get_astro_companion';
export const get_match_list = 'customers/get_match'

export const add_kundli = 'kundli/add_kundli';
export const get_customer_kundli = 'kundli/get_customer_kundli';
export const delete_kundli = 'kundli/delete_kundli';
export const get_horo_chart = 'kundli/get_horo_chart';
export const get_kundli_basic_details = 'kundli/get_kundli_basic_details';
export const get_planets = 'kundli/get_planets';
export const get_kp_planets = 'kundli/get_kp_planets';
export const get_kp_house_cusps = 'kundli/get_kp_house_cusps';
export const match_data = 'customers/match_making';
export const get_numero_list = 'customers/get_numerology';


export const get_product_category = 'ecommerce/get_product_category';
export const get_products = 'ecommerce/get_products';
export const add_to_cart = 'ecommerce/add_to_cart';
export const get_customer_cart = 'ecommerce/get_customer_cart';
export const update_cart_item_quantity = 'ecommerce/update_cart_item_quantity';
export const remove_cart_item = 'ecommerce/remove_cart_item'
export const order_product = 'ecommerce/order_product';
export const get_pooja = 'ecommerce/get_pooja';
export const get_new_pooja = 'ecommerce/get_puja'
export const get_astrolgoers_pooja = 'ecommerce/get_astrolgoers_pooja';
export const order_astrologer_pooja = 'ecommerce/order_astrologer_pooja';
export const get_custoemer_booked_pooja = 'ecommerce/get_custoemer_booked_pooja';
export const get_astro_blogs = 'admin/get_astro_blogs';
export const get_blogs_by_category = 'admin/blog-category-list';
export const get_mall_order_data = 'customers/getCustomerOrder'
export const phonepeWallet = 'customers/phonepe_payment';

export const onVrMode = 'customers/deductAndAddVrMode';
export const updateRealVrCount = 'customers/updateRealVrCount';


// kunmdli matching
export const match_save = 'customers/match_save';
export const match_delete = 'customers/match_delete';
export const get_match_data = 'customers/match_data';


export const temple_wallet_add_deduct = 'customers/temple-wallet-add-deduct';

export const getDivyaHistory = 'customers/getDivyaRashiWalletHistory';
export const getPurusharthaHistoryData = 'customers/getPurusharthaWalletHistory';

export const getRechargeHistoryData =   'recharge/get-user-recharge-history';

export const Shivam_Api_Url = "https://kundli2.astrosetalk.com/api/";

export const KP_PLANETS = "kp/get_all_planet_data"

export const KP_Birth_Detailes = 'kp/kp_birth_data'


//create order address
export const create_address_cart = 'ecommerce/create_address_cart';
export const get_address_cart = 'ecommerce/get_address_cart';
export const delete_address_cart = 'ecommerce/delete_address_cart';
export const update_address_cart = 'ecommerce/update_address_cart';

//puja
export const get_puja_details = 'ecommerce/get_puja'

//Religion Collection

export const get_All_Religion = 'admin/get_all_religious_categories'

export const get_All_Religion_SubCategory = 'admin/get_all_religious_subcategory_by_categoryid'

//Gift
export const get_gift = 'customers/get-all-customers';

//Search
export const get_Search = 'customers/search-customer';

//send gift

export const get_Send_Gift = 'customers/gift-wallet-balance';
export const send_wallet_request = 'customers/send-wallet-request';
export const get_wallet_request = 'customers/get-wallet-request/';
export const respond_wallet_request = 'customers/respond-wallet-request';
export const get_Testmonial_Data = 'admin/get-all-testimonial';

export const vardan_shivalya_deduct = 'customers/vardan_shivalya_deduct';
export const shivalya_deduct = 'customers/shivalya_deduct';
export const get_vardan_shivalya = 'admin/get-vardani-shivalya';



// numerology
export const delete_numerology = 'customers/delete_numero_data'
export const get_numerology = 'customers/get_numerology'
export const open_Numerology = 'customers/user_numerology'
export const numo_refresh = 'customers/get_numerology'

// ecommerce

export const get_all_categories_ecommerce = 'ecommerce/get_all_categories';
export const get_product_by_category_id = 'ecommerce/get_products_by_category_id';
export const cart_add_ecommerce = 'ecommerce/cart/add';
export const cart_remove_ecommerce = 'ecommerce/cart/remove';
export const cart_update_quanitity = 'ecommerce/cart/update-quantity';
export const cart_add_address = 'ecommerce/add-address';
export const cart_get_address = 'ecommerce/get-addresses/';
export const cart_delete_address = 'ecommerce/delete-address';
export const cart_update_address = 'ecommerce/update-address';
export const razorpay_cart = 'ecommerce/razorpay_cart';
export const cart_product_order = 'ecommerce/product_order';
export const cart_productOrderHistory = 'ecommerce/productOrderHistory';

export const get_vr_items = 'admin/get_vr_items';





export const razorpay_key = 'rzp_live_fycM10IO0gAtF9'
// export const zego_call_app_id = 1877843907
// export const zego_call_app_sign = 'abdf0d405292d6fe8ce886eda378bb8239c1fb4c56e86ecbe92e55af0103c507'
export const zego_call_app_id = 173391315
export const zego_call_app_sign = 'db0a2422001839ed37dfbaeb14f9b58f464257617d1faf38da8ffd45796c96fe'
// export const live_streaming_app_id = 1804652732;
// export const live_streaming_app_sign =
//   'cda5ae04ef3cd585a9cca284f6082c5f863172663ea961b23a7a39258f7b7aa7';  ksvm zego ckloud

export const live_streaming_app_id = 989424788;

export const live_streaming_app_sign = '43ba6854ca9e61a0cc718a494589f0a6e76ed6e4befcaea663fcbfe845a646b4';

export const FontsStyle = {
  font : {
      color:'#000',
      fontFamily: 'Poppins-SemiBold',
      fontSize: normalize(13)
      
  },
  fontBold: {
   color:'#000',
      fontFamily: 'Poppins-ExtraBold',
      fontSize: normalize(13)
  },
  fontfamily: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(13)
  }
}

export function normalize(size) {
 return RFValue(size);
}