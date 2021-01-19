import request from '../../utils/request'

// 获取任务列表
export const getPubTaskList = (params) => request.post('/future/task/queryRecommendTaskList', params)
