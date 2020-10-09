'use strict'
import { SELECTEDADDR, UPDATEADDRLIST, SETEDITADDRINFO } from '../types'

/**
 * @desc 跟新数据
 */
export const updateAddrList = payload => {
  return {
    type: UPDATEADDRLIST,
    payload
  }
}

/**
 * @desc 选中地址
 */
export const selectedAddr = payload => {
  
  return {
    type: SELECTEDADDR,
    payload
  }
}

/**
 * @desc 选中地址
 */
export const setEditAddrInfo = payload => {
  
  return {
    type: SETEDITADDRINFO,
    payload
  }
}
export const addShoppingCart = () => {

  return async dispatch => {
    
    setTimeout(() => {
      dispatch(update())
    }, 2000)
  }
}
// 删除
export const delShoppingCart = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(update())
    }, 2000)
  }
}