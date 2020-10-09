import { combineReducers } from 'redux'
// 处理导出reduces
import global from './global'
// 购物车reduces
import shoppingCart from './shopping-cart'

// 地址信息
import address from './addr'
 
export default combineReducers({
  global,
  shoppingCart,
  address
})