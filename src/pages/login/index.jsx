import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import CustomNavBar from '../../components/navbar'

import './index.scss'
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
   * @desc 更新用户信息
   * @param {*} info 
   * @param {*} cb 
   */
  updateInfo = async (info, cb = () => {}) => {
    let { errorCode } = await updateUserInfo(info)
    if (errorCode === 0) {
      // 回调
      cb()
    }
  }

  render() {
    let {
      backHistory
    } = this

    let {} = this.state
    let {} = this.props
    return (<View className='UserInfoWrap'>
      <CustomNavBar
        title='登录'
        clickLeft={backHistory}
      />       
    <View class='login__bg'>
      <Image src='http://ipxcdn.jfshare.com/ipxmall/05a0e63296c1ecfee138eb4ffc06387f' class='' alt='' />
    </View>

    <View class='main'>
      <View class='title'>
        <View>Hello <br />欢迎来到享花·星Mall</View>
      </View>
      {/* <mobile-login @updata='updataPhone' @update='update' :agree='agree' /> */}
      <View class='footer'>
        <Image
          src='http://ipxcdn.jfshare.com/ipxmall/05a636532405e947a70a2bf607b6310f'
          class='img'
          mode='aspectFit'
          v-if='agree'
        ></Image>
        <Image
          src='http://ipxcdn.jfshare.com/ipxmall/ff0247d1eea74019238fa0a6db5eb358'
          class='img'
          mode='aspectFit'
          v-else
        ></Image>
          
          
          登录即代表您同意
          <Text class='btn' >服务条款</Text>与<Text class='btn' >隐私政策</Text>
        </View>
      </View>
    </View>)
  }
}

export default Login