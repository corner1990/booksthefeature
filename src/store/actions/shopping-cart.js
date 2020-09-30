'use strict'
import { UPDATESHOPPINGCART } from '../types'

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
// export const addShoppingCart = (item_id, count, callFb=()=>{}) => {
  
//   return async dispatch => {
//     // console.log('item_id, count, callFb', item_id, count, callFb)
//     // dispatch(update())
//     setTimeout(() => {
//       console.log('333')
//       dispatch(update())
//     }, 2000)
//   }
// }
export const addShoppingCart1 = () => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(update())
    }, 2000)
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