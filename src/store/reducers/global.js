'use strict'
import { SETTAB, GETUSERINFO, GLOBALUPDATE } from '../types'

const initState = {
  tabIndex: 2, // 首页tabar下标
  order_type: 0,
  userInfo: {
    avatar: 'https://ipxcdn.jfshare.com/system/admin/acf6f273c1cd77066b4541308f782a88.png',
    nick_name: ''
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
