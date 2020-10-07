import axios from '../../../utils/request'
/**
 * @desc 获取订单信息
 * @param {*} params 
 */
export const getOrderCount = params => axios.post('/order/order/getOrderCount', params)
/**
 * @desc 获取用户信息
 * @param {*} params 
 */
export const getUserInfo = params => axios.post('/user/user/getUserInfo', params)
/**
 * @desc 编辑用户信息
 * @param {*} params 
 */
export const updateUserInfo = params => axios.post('/user/user/updateUserInfo', params)
/**
 * @desc 获取
 */
export const getOssSign =  () => axios.get('/system/aliyun/getOssSign')