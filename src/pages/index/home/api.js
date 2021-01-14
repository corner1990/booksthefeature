import Axios from '../../../utils/request'
// 商品列表
export const getTaskList = params => Axios.post('/future/taskOrder/queryUserTaskOrderList', params)
// 获取banner
export const getAdvertisingList = params => Axios.post('/operation/Advertising/getAdvertisingList', params)