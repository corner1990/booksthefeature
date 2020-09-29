import axios from '../../../utils/request'

export const getOrderCount = params => axios.post('/order/order/getOrderCount', params)