import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../../components/navbar'
import { setTab, getUseInfo } from '../../../store/actions/global'
import UserInfo from './component/user-info'
import CalendarBar from './component/calendar-bar'
import GetUserInfo from './component/getUserInfo'
import Item from '../../../components/item'

import './index.scss'

// import { getOrderCount } from './api'

const mapState = state => state.global

class Index extends Component {

  state = {
    serverPhone: '13681924547'
  }

  componentWillMount() {
    // let { getUseInfo } = this.props
    this.props.getUseInfo()
    
  }

  componentDidMount() { }
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
  pasteWx = () => {
    let phone = this.state.serverPhone
    // Taro.questInfosetClipboardData
    Taro.setClipboardData({
      data: phone,
      success: function () {
        Taro.showToast({
          icon: 'none', 
          title: '微信号复制成功'
        })
      }
    })
  }
  render() {

    return (
      <View className='my-center'>
        <CustomNavBar title='有学有钱' bgColor='#fff' />
        <UserInfo />
        <CalendarBar />
        <View className='serveInfo'>
          <Item
            title='联系我们'
            click={this.tel}
            subTitle='客服电话'
          />
        </View>
        <View className='serveInfo'>
          <Button openType='contact' className='OpenContact'></Button>
          <Item
            title='在线客服'
            // subTitle={this.state.serverPhone}
          />
          
        </View>
        <GetUserInfo loadInfo={this.props.getUseInfo} />
      </View>
    )
  }
}

export default connect(mapState, { setTab, getUseInfo })(Index)