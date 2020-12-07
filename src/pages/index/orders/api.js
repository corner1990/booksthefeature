import Axios from '../../../utils/request'
/**
 * @desc 获取订单列表
 * @param { param } params {order_id: int}
 */
export const getOrderList = params => Axios.post('/order/order/getOrderList', params)
// 关闭订单
export const cancelOrder = params => Axios.post('/order/order/cancelOrder', params)
// 删除订单
export const deleteOrder = params => Axios.post('/order/order/deleteOrder', params)
// 确认收货
export const confirmReceipt = params => Axios.post('/order/order/confirmReceipt', params)