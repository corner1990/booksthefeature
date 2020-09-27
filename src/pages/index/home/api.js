import Axios from '../../../utils/request'
// 商品列表
export const getProductList = params => Axios.post('/product/FlowerProduct/getProductList', params)
// 获取banner
export const getAdvertisingList = params => Axios.post('/operation/Advertising/getAdvertisingList', params)