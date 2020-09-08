import {
  ADD,
  MINUS,
  SETTAB
} from '../types'
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

