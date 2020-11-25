import Axios from '../../utils/request'
/**
 * @desc 获取商品详情
 * @param {*} params 
 */
export const getProductDetail = params => Axios.post('/product/FlowerProduct/getProductDetail', params)
// 获取购物车总数
export const getUserShoppingCartCount = params => Axios.post('/shoppingCart/shoppingCart/getUserShoppingCartCount', params)
// 获取配置列表
export const getSystemConfigList = params => Axios.post('/admin/SystemConfigAdmin/getSystemConfigList', params)
