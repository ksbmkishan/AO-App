import * as actionTypes from '../actionTypes'

export const onBellRing = payload => ({
    type: actionTypes.ON_BELL_RING,
    payload,
})

export const setBellRing = payload => ({
    type: actionTypes.SET_BELL_RING,
    payload,
})

export const onDiyaAnimation = payload => ({
    type: actionTypes.ON_DIYA_ANIMATION,
    payload,
})

export const getVrItems = payload => ({
    type: actionTypes.GET_VR_ITEAMS,
    payload,
})

export const showgif = payload => ({
    type: actionTypes.SHOW_GIF,
    payload,
})

export const onVrDeductAdd = payload => ({
    type: actionTypes.ON_VR_DEDUCT_ADD,
    payload,
})

export const updateVrUserCount = payload => ({
    type: actionTypes.UPDATE_VR_USER_COUNT,
    payload,
})

export const changeVrImage = payload => ({
    type: actionTypes.CHANGE_VR_IMAGE,
    payload
})