'use strict'
import { SETTAB } from '../types'

const initState = {
  tabIndex: 3, // 首页tabar下标
}
/**
 * @desc 全局状态
 * @param {*} state 
 * @param {*} action 
 */
const Global = (state = initState, action) => {
  
  switch(action.type) {
    case SETTAB:
      return {
        ...state,
        tabIndex: action.payload
      }
    default:
      return state
  }
}
export default Global
