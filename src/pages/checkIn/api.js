import request from '../../utils/request'

// 打卡
export const checkIn = (params) => request.post('/future/taskOrder/sign', params)
