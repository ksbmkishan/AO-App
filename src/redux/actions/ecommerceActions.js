import * as actionTypes from '../actionTypes';

export const getEcommerceCategory = payload => ({
    type: actionTypes.GET_ECOMMERCE_CATEGORY, payload
});


export const getEcommerceProduct = payload => ({
    type: actionTypes.GET_ECOMMERCE_PRODUCT, payload
});

export const onEcommerceCartAdd = payload => ({
    type: actionTypes.ON_ECOMMERCE_CART_ADD,
    payload
})

export const getEcommerceCart = payload => ({
    type: actionTypes.GET_ECOMMERCE_CART,
    payload
})

export const onEcommerceRemoveCart = payload => ({
    type: actionTypes.ON_ECOMMERCE_REMOVE_CART,
    payload
})

export const onEcommerceUpdateQuanitity = payload => ({
    type: actionTypes.ON_ECOMMERCE_UPDATE_QUANITITY,
    payload
})

export const onEcommerceAddAddress = payload => ({
    type: actionTypes.ON_ECOMMERCE_ADD_ADDRESS,
    payload
})

export const getEcommerceAddressData = payload => ({
    type: actionTypes.GET_ECOMMERCE_GET_ADDRESS,
    payload
})

export const onEcommerceDeleteAddress = payload => ({
    type: actionTypes.ON_ECOMMERCE_DELETE_ADDRESS,
    payload
})

export const onEcommerceRazorpayPayment = payload => ({
    type: actionTypes.ON_ECOMMERCE_RAZORPAY_ORDER,
    payload
})

export const getEcommerceOrderHistory = payload => ({
    type: actionTypes.GET_ECOMMERCE_ORDER_HISTORY,
    payload
})

// Old
export const getProductCategory = payload => ({
    type: actionTypes.GET_PRODUCT_CATEGORY,
    payload,
})

export const setProductCategory = payload => ({
    type: actionTypes.SET_PRODUCT_CATEGORY,
    payload,
})

export const getProducts = payload => ({
    type: actionTypes.GET_PRODUCTS,
    payload,
})

export const setProducts = payload => ({
    type: actionTypes.SET_PRODUCTS,
    payload,
})

export const addToCart = payload => ({
    type: actionTypes.ADD_TO_CART,
    payload,
})

export const getCartData = payload => ({
    type: actionTypes.GET_CART_DATA,
    payload,
})

export const setCartData = payload => ({
    type: actionTypes.SET_CART_DATA,
    payload,
})

export const updateCartQuantity = payload => ({
    type: actionTypes.UPDATE_CART_QUANTITY,
    payload,
})

export const orderCart = payload => ({
    type: actionTypes.ORDER_CART,
    payload,
})
export const getmallOrderData = payload => ({
    type: actionTypes.GET_MALL_ORDER_DATA,
    payload,
})
export const removeCartItem = (cartItemId) => ({
    type: actionTypes.REMOVE_CART_ITEM,
    payload: cartItemId
});

// ----------------------------------------------

export const onAddressCart = payload => ({
    type: actionTypes.ON_ADDRESS_CART,
    payload
})

export const getaddresscart = payload => ({
    type: actionTypes.GET_ADDRESS_CART,
    payload
})

export const setaddressCart = payload => ({
    type: actionTypes.SET_SELECTED_ADDRESS_CART,
    payload
})
export const getdeleteaddresscart = payload => ({
    type: actionTypes.GET_DELETE_CART,
    payload
})

export const setdeleteaddresscart = payload => ({
    type: actionTypes.SET_DELETE_CART,
    payload
})
export const getupdateaddressCart = payload => ({
    type: actionTypes.GET_UPDATE_ADDRESS,
    payload
})

export const setupdateaddressCart = payload => ({
    type: actionTypes.SET_UPDATE_ADDRESS,
    payload
})