import request from '../../utils/request'

// 获取任务详情
export const getPubTaskList = (params) => request.post('/future/task/queryTaskDetail', params)

// ch
export const createTaskOrder = (params) => request.post('/future/taskOrder/createTaskOrder', params)


