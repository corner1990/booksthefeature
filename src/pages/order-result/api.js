import Axios from '../../utils/request'
/**
 * @desc 获取商品详情
 * @param {*} params 
 */
export const queryOrderDetailInfo = params => Axios.post('/order/order/queryOrderDetailInfo', params)

