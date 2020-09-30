'use strict';
import { ADDSHOPPINGCART, DELSHOPPINGCART, UPDATE } from '../types'
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
    case UPDATE:
      return action.payload

    default:
      return state

  }
}

export default ShoppingCart