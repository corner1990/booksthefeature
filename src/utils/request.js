/* eslint-disable no-undef */
import axios from 'axios'
import Taro from '@tarojs/taro'
import { url } from './config'
// 时间戳
axios.defaults.timeout = 30000
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
    let userId = wx.getStorageSync('$user_id')

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
/**
 * @desc 处理重定向
 * @param { Object } data 
 */
const reject = data => {
  let codes = [403, 401 /* 1201 */]
  let { errorCode } = data
  
  if (codes.includes(errorCode)) {
    wx.removeStorageSync({ key: '$user_id' });
    wx.removeStorageSync({ key: 'token' });
    // 处理重定向地址
    let { path, params } = Taro.Current.router
    let $reject = Object.keys(params).filter(key => key !== '__key_').reduce((prev, next) => {
      return `${prev}${next}=${params[next]}`
    }, `${path}?`)

    Taro.setStorageSync({ $reject })
    Taro.navigateTo({ url: '/pages/login/index' })
    return false
  }
  return data
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
    console.log('处理错误提示', data)
    Taro.showToast({
      icon: 'none',
      title: data.errorMessage
    })
  }
  
  return reject(data)
}, function (error) {
  return Promise.reject(error)
})

export default request
