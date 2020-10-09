'use strict'
import { SELECTEDADDR, UPDATEADDRLIST, SETEDITADDRINFO } from '../types'

const initState = {
  editInfo: null,
  list: [],
  selected: null,
  pageInfo: {
    index: 0,
    has_more: true
  }
}
/**
 * @desc 全局状态
 * @param {*} state 
 * @param {*} action 
 */
const AddrReducers = (state = initState, action) => {
  
  switch(action.type) {
    // 设置选中地址
    case SELECTEDADDR:
      return {
        ...state,
        selected: action.payload
      }
    // 更新数据列表
    case UPDATEADDRLIST:
      return {
        ...state,
        ...action.payload
      }
    // 设置编辑数据
    case SETEDITADDRINFO:
      return {
        ...state,
        editInfo: action.payload
      }
    default:
      return state
  }
}
export default AddrReducers
