import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../../components/navbar'
import { setTab, getUseInfo } from '../../../store/actions/global'
import UserInfo from './component/user-info'
// import GetUserInfo from './component/getUserInfo'
import Item from '../../../components/item'
import { wxMiniCodeLogin } from './api'

import './index.scss'

// import { getOrderCount } from './api'

const mapState = state => state.global

class Index extends Component {

  state = {
    serverPhone: ''
  }

  componentWillMount() {
    // let { getUseInfo } = this.props
    this.props.getUseInfo()
    
  }

  componentDidMount() {
    this.updateToken()
    // this.login()
  }

  shouldComponentUpdate() {
    // let { userInfo } = props
    // if (!userInfo.avatar) {
    //   this.getInfo()
    // }
    return true
  }
  componentWillUnmount() { }
  
  componentDidShow() {
  }
  componentDidHide() { }

  toEndorsement = () => {
    this.props.setTab(3)
  }
  /**
   * @desc 定期更新token
   */
  updateToken() {
    // let t = 864000000 // 十天
    let t = 1000 * 5
    let $tokenTime = Taro.getStorageSync('$tokenTime')
    let token = wx.getStorageSync('token') || 'token'
    if (!$tokenTime || token) {
      t = new Date() - 0 + t
      Taro.setStorageSync('$tokenTime', t)
      this.login()
      return false
    }
    let now = new Date() - 0
    $tokenTime = $tokenTime  - 0
    if (now >= $tokenTime) {
      this.login()
    }
  }
  login = () => {
    // let token = Taro.getStorageSync('token')
    // if (token) return false
    let { codeLogin } = this
    Taro.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          codeLogin(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  /**
   * @desc code登陆
   * @param {*} code 
   */
  codeLogin = async (code) => {
    let { errorCode, data } = await wxMiniCodeLogin({code})
    if (errorCode == 0) {
      let { access_token, user_id } = data
      Taro.setStorageSync('token', access_token)
      Taro.setStorageSync('$user_id', user_id)
      this.props.getUseInfo()
    }
  }
  getInfo = () => {
    let success = this.questInfo
    Taro.login({
      success
    })
  }
  /**
   * @desc 获取信息
   */
  questInfo = () => {
    Taro.getUserInfo({
      success: (...args) => {
        console.log('questInfo', args)
      }
    })
  }
  /**
   * @desc 拨打电话
   */
  tel = () => {
    Taro.makePhoneCall({
      phoneNumber: this.state.serverPhone
    })
  }
  createTask = () => {
    Taro.navigateTo({ url: '/pages/taskListOwn/index' })
  }
  render() {

    return (
      <View className='my-center'>
        <CustomNavBar title='有学有钱' bgColor='#fff' />
        <UserInfo />
        {/* <CalendarBar /> */}
        {/* <View className='serveInfo'>
          <Item
            title='联系我们'
            click={this.tel}
            subTitle='客服电话'
          />
        </View> */}
         <View className='serveInfo'>
          <Item
            title='我的任务'
            click={this.createTask}
            // subTitle={this.state.serverPhone}
          />
          
        </View>
        <View className='serveInfo'>
          <Button openType='contact' className='OpenContact'></Button>
          <Item
            title='在线客服'
            // subTitle={this.state.serverPhone}
          />
          
        </View>
      </View>
    )
  }
}

export default connect(mapState, { setTab, getUseInfo })(Index)