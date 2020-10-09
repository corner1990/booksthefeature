import Axios from '../../utils/request'
/**
 * @desc 获取地址列表
 * @param {*} params 
 */
export const getShippingAddressList = params => Axios.post('/user/shippingAddress/getShippingAddressList', params)
/**
 * @desc 添加地址
 * @param {*} params 
 */
export const addShippingAddress = params => Axios.post('/user/shippingAddress/addShippingAddress', params)
/**
 * @desc 更新地址
 * @param {*} params 
 */
export const updateShippingAddress = params => Axios.post('/user/shippingAddress/updateShippingAddress', params)
/**
 * @desc 删除地址
 * @param {*} params 
 */
export const deleteShippingAddress = params => Axios.post('/user/shippingAddress/deleteShippingAddress', params)

