import {
  ADD,
  MINUS,
  SETTAB,
  GETUSERINFO
} from '../types'
import { getUserInfo } from '../../pages/index/user/api'
/**
 * @desc 增加
 */
export const add = () => {
  return {
    type: ADD
  }
}

/**
 * @desc 减少
 */
export const minus = () => {
  return {
    type: MINUS
  }
}
/**
 * @desc 设置tab
 */
export const setTab = (payload) => {
  
  return {
    type: SETTAB,
    payload
  }
}
/**
 * @desc 获取用户信息
 * @param { object } payload 用户信息
 */
export const updateInfo = payload => {
  return {
    type: GETUSERINFO,
    payload
  }
}
/**
 * @desc 获取用户信息
 */
export const getUseInfo = () => {
  return async dispatch => {
    let { errorCode, data } = await getUserInfo()
    if (errorCode === 0) {
      dispatch(updateInfo(data))
    }
  }
}
/**
 * @desc 异步
 */
export const asyncAdd = () => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
export const asyncMinus = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(minus())
    }, 2000)
  }
}

