import * as actionTypes from "../actionTypes"

export const getGifts = payload =>({
    type: actionTypes.GET_GIFT,
    payload
})
export const setGifts = payload => ({
    type: actionTypes.SET_GIFT,
    payload
})