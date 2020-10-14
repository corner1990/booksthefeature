import Axios from '../../utils/request'
/**
 * @desc 计算订单价格
 * @param {*} params 
 */
export const calculateOrderPrice = params => Axios.post('/order/order/calculateOrderPrice', params)

/**
 * @desc 创建订单
 * @param {*} params 
 */
export const createOrder = params => Axios.post('/order/order/createOrder', params)

