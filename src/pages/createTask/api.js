import request from '../../utils/request'

// 获取任务详情
export const getPubTaskList = (params) => request.post('/future/task/queryTaskDetail', params)

// ch
export const createTaskOrder = (params) => request.post('/future/taskOrder/createTaskOrder', params)

/**
 * @desc  创建支付信息
 * @param {*} params 
 */
export const createOrderPayInfo = params => request.post('/future/taskOrder/createOrderPayInfo', params)

