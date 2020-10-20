import request from '../../utils/request'

// 第三方登录
export const bindPhone = (params) => request.post('/user/user/wxMiniLoginBindPhone', params)
