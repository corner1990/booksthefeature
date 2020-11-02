import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'

import CustomNavBar from '../../components/navbar'

import './index.scss'
import { bindPhone } from './api'
/**
 * @desc 我的信息
 */
class Login extends Component {
  state = {}
  componentDidMount() {
    // this.uploadImg()
  }
  /**
   * @desc 返回上一页
   */
  backHistory = () => Taro.navigateBack()

  /**
   * @desc 手机号码绑定
   */
  getPhoneNumber = (e) => {
    let { errMsg, encryptedData, iv } = e.detail
    let self = this
    
    if (errMsg.includes('ok')) {
      Taro.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            self.bindPhoneFn({ code: res.code, encryptedData, iv, provider: 'TaroMini' })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
  /**
   * @desc 绑定手机号
   * @param { object } params 
   */
  async bindPhoneFn(params) {
    let { errorCode, data } = await bindPhone(params)
    if (errorCode === 0 && data.user_id) {
      let { access_token, refresh_token, user_id } = data
      Taro.setStorageSync('token', access_token)
      Taro.setStorageSync('refresh_token', refresh_token)
      Taro.setStorageSync('$user_id', user_id)
      // 处理跳转
      let url = '/pages/index/index'
      let reject = Taro.getStorageSync('$reject');
      if (reject) {
        url = reject
        // 清空信息
        Taro.removeStorageSync({ key: '$reject' });
      }
      Taro.navigateTo({url})
    }
  }
  render() {
    let {
      backHistory,
      getPhoneNumber
    } = this
    return (<View className='LoginWwrap'>
      <CustomNavBar
        title='登录'
        color='#fff'
        clickLeft={backHistory}
      />       
    <View class='login__bg'>
      {/* <Image src='https://ipxcdn.jfshare.com/ipxmall/c867d71a9a63ae3b5ec99386da8b245a' class='BgImg' alt='log-bg' /> */}
      <Image src='https://ipxcdn.jfshare.com/ipxmall/ed8ef394c873eef389055eb4f597354b' class='BgImg' alt='log-bg' />
    </View>
      <View className='MainContent'>
        <View className='CenterContent'>
          <Image src='https://ipxcdn.jfshare.com/ipxmall/7dad82f9bcde329c438fc26f9ea87157' class='LoginIcon' alt='log-bg' />
          <View className='authorText'>授权AS Flower Boutique登录</View>
          <AtButton         
            className='SubmitBtn'
            type='primary'
            openType='getPhoneNumber'
            onGetPhoneNumber={getPhoneNumber}
          >授权登录</AtButton>
        </View>
      </View>
    </View>)
  }
}

export default Login