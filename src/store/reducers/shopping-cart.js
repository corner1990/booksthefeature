'use strict';
import {
  ADDSHOPPINGCART,
  DELSHOPPINGCART,
  UPDATESHOPPINGCART,
  SHOPPINGCARTSELECTED,
  CANCELSHOPPINGCARTSELECTED
} from '../types'
// 初始化状态
const initState = {
  info: [],
  selected: [], // 选中的列表
}
/**
 * @desc 购物车store
 * @param {*} state 
 * @param {*} actions 
 */
const ShoppingCart = (state = initState, action) => {
  
  switch(action.type) {
    // 添加
    case ADDSHOPPINGCART:
      return {
        ...state,

      }
      break;
      // 选中
    case SHOPPINGCARTSELECTED:
      return {
        ...state,
        selected: action.payload
      }
      // 取消选中
    case CANCELSHOPPINGCARTSELECTED:
      return {
        ...state,
        selected: [
          ...state.selected.filter(item => item.item_id !== action.payload.item_id)
        ]
      }
    case DELSHOPPINGCART:
      console.log('DELSHOPPINGCART', action)
      break;
    // 更新
    case UPDATESHOPPINGCART:
      console.log('UPDATESHOPPINGCART', state, action)
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