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
 * @desc 上传图片
 */
export const uploadBase64Image =  (params) => axios.post('/system/media/uploadBase64Image', params)

// 第三方登录
export const bindPhone = (params) => axios.post('/user/user/wxMiniLoginBindPhone', params)

// code登陆
export const wxMiniCodeLogin = (params) => axios.post('/user/user/wxMiniCodeLogin', params)