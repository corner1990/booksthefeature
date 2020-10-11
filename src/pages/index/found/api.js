import Axios from '../../../utils/request'
// 商品列表
export const getFeedList = params => Axios.post('/feed/FlowerFeed/getFeedList', params)