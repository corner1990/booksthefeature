import Axios from '../../utils/request'
/**
 * @desc 获取商品详情
 * @param {*} params 
 */
export const getProductDetail = params => Axios.post('/product/FlowerProduct/getProductDetail', params)