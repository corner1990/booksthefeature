'use strict';
import { ADDSHOPPINGCART, DELSHOPPINGCART, UPDATESHOPPINGCART } from '../types'
// 初始化状态
const initState = {
  info: []
}
/**
 * @desc 购物车store
 * @param {*} state 
 * @param {*} actions 
 */
const ShoppingCart = (state = initState, action) => {
  
  switch(action.type) {
    case ADDSHOPPINGCART:
      return {
        ...state
      }
      break;
    case DELSHOPPINGCART:
      console.log('add', action)
      break;
    case UPDATESHOPPINGCART:
      console.log('ssss', state, action)
      let { key, val } = action.payload

      return {
        ...state,
        [key]: val
      }

    default:
      return state

  }
}

export default ShoppingCart