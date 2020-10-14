'use strict'
import {
  UPDATESHOPPINGCART,
  SHOPPINGCARTSELECTED,
  SETPRODUCTARRAY,
  SETSHIPPING
} from '../types'

/**
 * @desc 减少
 */
export const update = payload => {
  return {
    type: UPDATESHOPPINGCART,
    payload
  }
}
/**
 * @desc 设置购买商品列表
 */
export const setProductArray = payload => {
  return {
    type: SETPRODUCTARRAY,
    payload
  }
}
/**
 * @desc 设置地址id
 */
export const setShipping = payload => {
  return {
    type: SETSHIPPING,
    payload
  }
}
/**
 * @desc 添加到购物车
 */
export const select = payload => {
  
  return {
    type: SHOPPINGCARTSELECTED,
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