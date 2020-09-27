import Axios from '../../utils/request'

export const getProductList = params => Axios.post('/product/FlowerProduct/getProductList', params)