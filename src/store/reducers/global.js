'use strict'
import { SETTAB, GETUSERINFO, GLOBALUPDATE } from '../types'

const initState = {
  tabIndex: 0, // 首页tabar下标
  order_type: 0,
  userInfo: {
    avatar: 'https://ipxcdn.jfshare.com/ipxmall/2c5871d1937274f5d04504e861817f9a.png'
  } // 用户信息
}
/**
 * @desc 全局状态
 * @param {*} state 
 * @param {*} action 
 */
const Global = (state = initState, action) => {
  
  switch(action.type) {
    // 设置tab
    case SETTAB:
      return {
        ...state,
        tabIndex: action.payload
      }
    // 用户信息
    case GETUSERINFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case GLOBALUPDATE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
export default Global
