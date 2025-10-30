import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { add_to_cart, api_url, cart_add_address, cart_add_ecommerce, cart_delete_address, cart_get_address, cart_product_order, cart_productOrderHistory, cart_remove_ecommerce, cart_update_quanitity, create_address_cart, delete_address_cart, get_address_cart, get_all_categories_ecommerce, get_customer_cart, get_mall_order_data, get_product_by_category_id, get_product_category, get_products, order_product, remove_cart_item, update_address_cart, update_cart_item_quantity } from '../../config/constants'
import { goBack, navigate, resetToScreen } from '../../navigations/NavigationServices'
import { showToastMessage } from '../../utils/services'
import { razorpayPayment, razorpayPaymentCart } from '../../utils/razorpay'
import axios from 'axios'

function* getProductCategory(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield getRequest({
            url: api_url + get_product_category
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_PRODUCT_CATEGORY, payload: response?.productCategory })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getProductsData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + get_products,
            data: {
                categoryId: payload
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_PRODUCTS, payload: response?.products })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* addToCart(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + add_to_cart,
            data: {
                productId: payload,
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            showToastMessage({ message: response?.message })
            yield call(navigate, 'cart')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCartData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?._id, 'idcart')
        const response = yield postRequest({
            url: api_url + get_customer_cart,
            data: {
                customerId: customerData?._id
            },
        })
        // const response = yield axios({
        //     method: 'post',
        //     url: api_url + get_customer_cart,
        //     data: {
        //                 customerId: customerData?._id
        //             },
        // });
        console.log(response?.data, 'apiii')
        if (response?.success) {
            yield put({ type: actionTypes.SET_CART_DATA, payload: { cart: response?.cart, totalPrice: response?.totalPrice } })
            console.log('first')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'api')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* updateCartQuantity(actions) {
    try {
        const { payload } = actions
        console.log(payload, 'upda')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + update_cart_item_quantity,
            data: payload
        })
        // const response = yield axios({
        //     method: 'post',
        //     url: api_url + update_cart_item_quantity,
        //     data: payload,
        // });

        if (response?.success) {
            yield put({ type: actionTypes.GET_CART_DATA, payload: null })


        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'new eeoro')
        showToastMessage({ message: 'out of stock' })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* orderCart(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const cartData = yield select(state => state.ecommerce.cartData)

        const razorpayResponse = yield razorpayPayment({ amount: cartData?.totalPrice, email: customerData?.email, contact: customerData?.phoneNumber, name: customerData?.customerName })
        if (razorpayResponse) {
            const response = yield postRequest({
                url: api_url + order_product,
                data: {
                    customerId: customerData?._id
                }
            })
            if (response?.success) {
                showToastMessage({ message: response?.message })
                yield put({ type: actionTypes.GET_CART_DATA, payload: null })
                yield call(resetToScreen, 'home')
            }
        } else {
            showToastMessage({ message: 'Payment Failed' })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getMallOrderData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        // data = {
        //             ...payload
        //         }
        // const response = yield axios.post(api_url + get_mall_order_data,data);
        const response = yield postRequest({
            url: api_url + get_mall_order_data,
            data: {
                ...payload
            }
        })
        if (response?.success) {
            yield put({ type: actionTypes.SET_MALL_ORDER_DATA, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* removeCartItem(actions) {
    try {
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?._id, 'idcart')
        const { payload } = actions
        console.log(payload, ':::payyy')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + remove_cart_item,
            data: payload
        })
        console.log(response, 'all data')
        if (response?.success) {
            showToastMessage({ message: response?.message })
            yield put({ type: actionTypes.GET_CART_DATA, payload: customerData?._id })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'new eeoro')
        showToastMessage({ message: 'out of stock' })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


// ----------------------------------------------

function* onAddressCart(actions) {
    try {
        const { payload } = actions;

        console.log("check payload::::", payload);
        
        const response = yield axios.post(api_url + create_address_cart, payload);
        // const response = yield axios.post(`https://api.astroone.in/api/ecommerce/create_address_cart`, payload);

        console.log(response, "sjbdnfksdhfisdhbfjkd");

        if (response?.data?.success) {
            showToastMessage({ message: "Address data Successfully" });
            yield put({ type: actionTypes.GET_ADDRESS_CART, payload: null });
            resetToScreen('Address');
        }

        console.log("asdfdsfsddsafsdfsdff:::::::", response?.data?.success);
        

    } catch (e) {
        console.log(e);
    }
}

function* getAddressCart(actions) {
    try {
        const { payload } = actions;
        const customerdata = yield select(state => state.customer.customerData);

        const response = yield axios.post(api_url + get_address_cart, { customerId: customerdata?._id });
        // const response = yield axios.post(`https://api.astroone.in/api/ecommerce/get_address_cart`, { customerId: customerdata?._id });
        console.log('Response ::: ', response?.data);
        if (response) {
            yield put({ type: actionTypes.SET_ADDRESS_CART, payload: response?.data });
            showToastMessage({ message: "Address data Successfully" });
        } else {
            yield put({ type: actionTypes.SET_ADDRESS_CART, payload: [] });
            showToastMessage({ message: "No Address data found" });
        }

    } catch (e) {
        console.log(e);
    }
}

function* getDeleteAddressCart(actions) {
    try {
        const { payload } = actions;
        console.log(payload, "payload")
        const response = yield axios.post(api_url + delete_address_cart, payload);
        console.log('Response ::: ', response);
        if (response) {
            yield put({ type: actionTypes.GET_ADDRESS_CART });
            showToastMessage({ message: "Delete Successfully" });
        }

    } catch (e) {
        console.log(e, "sdl;kfjlsdnfl");
    }
}

function* getUpdateAddressCart(actions) {
    try {
        const { payload } = actions;
        console.log(payload, "payload")
        const response = yield axios.post(api_url + update_address_cart, payload);
        console.log('Response ::: ', response);
        if (response) {
            yield put({ type: actionTypes.GET_ADDRESS_CART, payload: null });
            resetToScreen('Address');
            showToastMessage({ message: "Update Successfully" });
        }

    } catch (e) {
        console.log(e);
    }
}

function* getEcommerceCategory(actions) {
    try {
        const response = yield getRequest({
            url: api_url + get_all_categories_ecommerce,
        });

        yield put({ type : actionTypes.SET_ECOMMERCE_CATEGORY, payload: response?.data})
    } catch(e) {
        console.log('error ',e);
    }
}

function* getEcommerceProduct(actions) {
    try {
        const { payload } =actions;

        const response = yield postRequest({
            url: api_url + get_product_by_category_id,
            data: payload
        });

        if(response?.success) {
            yield put({ type: actionTypes.SET_ECOMMERCE_PRODUCT,payload: response?.product});
        } else {
            yield put({ type: actionTypes.SET_ECOMMERCE_PRODUCT, payload: []});
        }
    } catch(e) {
        console.log('error ', e);
    }
}

function* onEcommerceCartAdd(actions) {
    try {
        const { payload } = actions

        const response = yield postRequest({
            url: api_url + cart_add_ecommerce,
            data: payload
        })

        if(response?.success) {
            yield put({ type: actionTypes.GET_ECOMMERCE_CART});
            navigate('PujaCart')
        }
    } catch(e) {
        console.log(e);
    }
}

function* getEcommerceCart(actions) {
    try {
        const customer = yield select(state => state.customer.customerData);

        const url = api_url + `ecommerce/cart/${customer?._id}`;

        const response = yield getRequest({
            url: url
        });

        if(response?.success) {
            yield put({ type: actionTypes.SET_ECOMMERCE_CART, payload: response?.data});
        } else {
            yield put({ type: actionTypes.SET_ECOMMERCE_CART, payload: response?.data});
        }
    } catch(e) {
        console.log(e);
    }
}

function* onEcommerceRemoveCart(actions) {
    try {
        const { payload } = actions;
        const response = yield postRequest({
            url: api_url + cart_remove_ecommerce,
            data: payload,
        });

        if(response?.success) {
            showToastMessage({ message: response?.message});
            yield put({ type: actionTypes.GET_ECOMMERCE_CART});
        } else {
            showToastMessage({ message: response?.message})
        }
    } catch(e) {
        console.log(e);
    }
}

function* onEcommerceUpdateQuanitity(actions) {
    try {
        const { payload } = actions;
        const response = yield postRequest({
            url: api_url + cart_update_quanitity,
            data: payload
        });

        if(response?.success) {
            showToastMessage({ message: response?.message});
            yield put({ type: actionTypes.GET_ECOMMERCE_CART});
        } else {
            showToastMessage({ message: response?.message});
        }
    } catch(e) {
        console.log(e);
    }
}

function* getEcommerceGetAddress() {
    try {
        const customer = yield select(state => state.customer.customerData);

        const response = yield getRequest({
            url: api_url + cart_get_address + `${customer?._id}`,
        });

        if(response?.success) {
            yield put({ type: actionTypes.SET_ECOMMERCE_ADRESS_DATA, payload:response?.data});
            showToastMessage({ message: response?.message})
        } else {
            yield put({ type: actionTypes.SET_ECOMMERCE_ADRESS_DATA, payload:[]});
        }
    } catch(e) {
        console.log(e);
    }
}

function* onEcommerceAddAddress(actions) {
    try {
        const { payload } = actions;
        const response = yield postRequest({
            url: api_url + cart_add_address,
            data: payload
        });

        if(response?.success) {
            yield put({ type: actionTypes.GET_ECOMMERCE_GET_ADDRESS});
            yield put({ type: actionTypes.SET_ADDRESS_MODAL_VISIBLE, payload: false})
            goBack();
        } else {
            showToastMessage({ message:response?.message})
        }
    } catch(e) {
        console.log(e);
    }
}

function* onEcommerceDeleteAddress(actions) {
    try {
        const { payload } = actions;

        const response = yield postRequest({
            url: api_url + cart_delete_address,
            data: payload
        })
        if(response?.success) {
            yield put({ type: actionTypes.GET_ECOMMERCE_GET_ADDRESS});
        }
    } catch(e) {
        console.log(e);
    }
}

function* onEcommerceRazorpayOrder(actions) {
    try {
        const { payload } = actions;
        const customer = yield select(state => state.customer.customerData);
        const response = yield razorpayPaymentCart({ 
            amount: payload?.amount,
            email: customer?.email,
            contact: customer?.phoneNumber,
            name: customer?.customerName,
            cartId: payload?.cartId,
            userId: customer?._id,
            addressId: payload?.addressId
        });

        console.log('response ',response)
        if(response?.razorpay_payment_id) {
            const responsePay = yield postRequest({
                url: api_url + cart_product_order,
                data: {
                    razorpay_payment_id: response?.razorpay_payment_id
                }
            });
            console.log('responsePay ', responsePay)
            if(responsePay?.success) {
                showToastMessage({ message: responsePay?.message });
                resetToScreen('home');
            } else {
                showToastMessage({ message: responsePay?.message });
            }
        } else {
            showToastMessage({ message: 'Payment Failed'});
        }
    } catch(e) {
        console.log(e);
    }
}

function* getEcommerceOrderHistory() {
    try {
        const customer = yield select(state => state.customer.customerData);

        const response  = yield postRequest({
            url: api_url + cart_productOrderHistory,
            data: {
                customerId: customer?._id,
            }
        });

        if(response?.success) {
            yield put({ type: actionTypes.SET_ECOMMERCE_ORDER_HISTORY, payload: response?.data});
        } else {
            yield put({ type: actionTypes.SET_ECOMMERCE_ORDER_HISTORY, payload: []});
        }
        
    } catch(e) {
        console.log(e);
    }
}


export default function* ecommerceSaga() {
    yield takeLeading(actionTypes.GET_PRODUCT_CATEGORY, getProductCategory)
    yield takeLeading(actionTypes.GET_PRODUCTS, getProductsData)
    yield takeLeading(actionTypes.ADD_TO_CART, addToCart)
    yield takeLeading(actionTypes.GET_CART_DATA, getCartData)
    yield takeLeading(actionTypes.UPDATE_CART_QUANTITY, updateCartQuantity)
    yield takeLeading(actionTypes.ORDER_CART, orderCart)
    yield takeLeading(actionTypes.GET_MALL_ORDER_DATA, getMallOrderData)
    yield takeLeading(actionTypes.REMOVE_CART_ITEM, removeCartItem)

    yield takeLeading(actionTypes.ON_ADDRESS_CART, onAddressCart);
    yield takeLeading(actionTypes.GET_ADDRESS_CART, getAddressCart);
    yield takeLeading(actionTypes.GET_DELETE_CART, getDeleteAddressCart);
    yield takeLeading(actionTypes.GET_UPDATE_ADDRESS, getUpdateAddressCart);

    // new
    yield takeLeading(actionTypes.GET_ECOMMERCE_CATEGORY, getEcommerceCategory);
    yield takeLeading(actionTypes.GET_ECOMMERCE_PRODUCT, getEcommerceProduct);
    yield takeLeading(actionTypes.ON_ECOMMERCE_CART_ADD, onEcommerceCartAdd);
    yield takeLeading(actionTypes.GET_ECOMMERCE_CART, getEcommerceCart);
    yield takeLeading(actionTypes.ON_ECOMMERCE_REMOVE_CART, onEcommerceRemoveCart);
    yield takeLeading(actionTypes.ON_ECOMMERCE_UPDATE_QUANITITY, onEcommerceUpdateQuanitity);
    yield takeLeading(actionTypes.GET_ECOMMERCE_GET_ADDRESS, getEcommerceGetAddress);
    yield takeLeading(actionTypes.ON_ECOMMERCE_ADD_ADDRESS, onEcommerceAddAddress);
    yield takeLeading(actionTypes.ON_ECOMMERCE_DELETE_ADDRESS, onEcommerceDeleteAddress);
    yield takeLeading(actionTypes.ON_ECOMMERCE_RAZORPAY_ORDER, onEcommerceRazorpayOrder);
    yield takeLeading(actionTypes.GET_ECOMMERCE_ORDER_HISTORY, getEcommerceOrderHistory);

}