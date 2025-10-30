import RazorpayCheckout from 'react-native-razorpay';
import { postRequest } from './apiRequests';
import { api_url, create_razorpay_order, razorpay_cart, razorpay_key } from '../config/constants';
import { showToastMessage } from './services';
import { Colors } from '../assets/style';

export const razorpayPayment = async ({ amount = 0, email = '', contact = '', name = '' }) => {
    try {

        const orderResponse = await postRequest({
            url: api_url + create_razorpay_order,
            data: {
                amount
            }
        }) 
        console.log(orderResponse,'thisiscontact')

        if (!orderResponse?.status) {
            showToastMessage({ message: 'Payment Failed' })
            return
        }

        var options = {
            description: 'Credits towards consultation',
            // image: 'https://admin.astrofriends.in/static/media/astro-booster.ed9b4cb4dea264965dba.png',
            currency: 'INR',
            key: razorpay_key, // Your api key
            // key: 'rzp_test_7FcETDDAqUcnFu',
            amount: orderResponse?.data?.amount,
            order_id: orderResponse?.data?.id,
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name
            },
            theme: { color: Colors.primaryDark }
        }

        const response = await RazorpayCheckout.open(options)
        console.log("rzrpayreso::>", response)
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
} 


export const razorpayPaymentCart = async ({ amount = 0, email = '', contact = '', name = '', cartId= '',userId = '', addressId = '' }) => {
    try {
        console.log('Test :: ');
        const orderResponse = await postRequest({
            url: api_url + razorpay_cart,
            data: {
                amount,
                cartId,
                userId,
                addressId,
            }
        }) 
        console.log(orderResponse,'thisiscontact')

        if (!orderResponse?.success) {
            showToastMessage({ message: 'Payment Failed' })
            return
        }

        var options = {
            description: 'Credits towards consultation',
            // image: 'https://admin.astrofriends.in/static/media/astro-booster.ed9b4cb4dea264965dba.png',
            currency: 'INR',
            key:razorpay_key, // Your api key
            amount: orderResponse?.data?.amount,
            order_id: orderResponse?.data?.id,
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name
            },
            theme: { color: Colors.primaryDark }
        }

        const response = await RazorpayCheckout.open(options)
        console.log("rzrpayreso::>", response)
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
} 