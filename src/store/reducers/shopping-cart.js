'use strict';
import {
  ADDSHOPPINGCART,
  DELSHOPPINGCART,
  UPDATESHOPPINGCART,
  SHOPPINGCARTSELECTED,
  CANCELSHOPPINGCARTSELECTED,
  SETPRODUCTARRAY,
  SETSHIPPING
} from '../types'
// 初始化状态
const initState = {
  info: [],
  selected: [], // 选中的列表
  product_array: [],
  shipping: '',
  priceInfo: {
    format_pay_price: ''
  }
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
      break;
    // 购买商品列表
    case SETPRODUCTARRAY:
      return {
        ...state,
        product_array: action.payload
      }
    case SETSHIPPING:
      return {
        ...state,
        shipping: action.payload
      }
    // 更新
    case UPDATESHOPPINGCART:
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