import request from '../../utils/request'

// 获取任务信息
export const getTaskInfo = (params) => request.post('/future/taskOrder/queryTaskOrderDetail', params)
