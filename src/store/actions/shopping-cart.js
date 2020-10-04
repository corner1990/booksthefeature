'use strict'
import { UPDATESHOPPINGCART, SHOPPINGCARTSELECTED } from '../types'

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