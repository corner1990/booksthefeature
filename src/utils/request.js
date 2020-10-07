/* eslint-disable no-undef */
import axios from 'axios'
import Taro from '@tarojs/taro'
import { url } from './config'
// import qs from 'qs'
// 时间戳
// const NewTimeStamp = new Date().getTime()
axios.defaults.timeout = 30000
// axios.defaults.baseURL = 'https://ipxmallapi.jfshare.com'
axios.defaults.baseURL = `${url}`
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    let data = config.method === 'get' ? config.params : config.data
    if (data) {
      data = JSON.parse(data)
    }
    // console.log('data', data, config)
    // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
    let token = wx.getStorageSync('token') || 'token'
    let userId = wx.getStorageSync('$user_id') || '12345'

    wx.request({
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      data: {
        ...data,
        platform: 'wxMin',
        user_id: userId
      },
      header: {
        Authorization: `Bearer ${token}`
      },
      success: (res) => { return resolve(res) },
      fail: (err) => { return reject(err) }
    })
  })
}
const request = axios.create({})
// axios 拦截器
// 请求拦截器
// eslint-disable-next-line no-shadow
request.interceptors.request.use(function (request) {
  // request.headers.token = 'token=11124654654687';
  // console.log('request', request)
  return request
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  let { statusCode, data, errMsg } = response
  let status = [200, 304]
  if (!status.includes(statusCode)) {
    Promise.reject(errMsg)
  }
  // 处理错误提示
  if (data.errorCode !== 0) {
    Taro.showToast({
      icon: 'none',
      title: data.errorMessage
    })
  }
  return data
}, function (error) {
  return Promise.reject(error)
})

export default request
