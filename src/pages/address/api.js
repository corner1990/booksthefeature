import Axios from '../../utils/request'
/**
 * @desc 获取地址列表
 * @param {*} params 
 */
export const getShippingAddressList = params => Axios.post('/user/shippingAddress/getShippingAddressList', params)
/**
 * @desc 获取地址列表
 * @param {*} params 
 */
export const addShippingAddress = params => Axios.post('/user/shippingAddress/addShippingAddress', params)
