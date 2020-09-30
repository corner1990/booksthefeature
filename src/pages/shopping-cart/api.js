import Axios from '../../utils/request'
/**
 * @desc 获取商品详情
 * @param {*} params 
 */
export const getProductDetail = params => Axios.post('/product/FlowerProduct/getProductDetail', params)
/**
 * @desc 编辑购物车
 * @param {*} params 
 */
export const updateCart = params => Axios.post('/shoppingCart/shoppingCart/updateCart', params)
/**
 * @desc 编辑购物车
 * @param {*} params 
 */
export const removeFromCart = params => Axios.post('/shoppingCart/shoppingCart/removeFromCart', params)
/**
 * @desc 购物车信息
 * @param {*} params 
 */
export const getUserShoppingCartDetail = params => Axios.post('/shoppingCart/shoppingCart/getUserShoppingCartDetail', params)
