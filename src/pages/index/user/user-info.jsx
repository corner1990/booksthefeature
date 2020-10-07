import React, { Component } from  'react'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import './user-info.scss'

const mapState = state => state.global
/**
 * @desc 用户信息
 */
class UserInfo extends Component{
  state = {
    avatar: 'https://ipxcdn.jfshare.com/ipxmall/2c5871d1937274f5d04504e861817f9a.png'
  }
  /**
   * @desc 跳转到日历页面
   */
  jumpToCalendar = () => {
    Taro.navigateTo({
      url: '/pages/user-info/index'
    })
  }
  /**
   * @desc 跳转到日历页面
   */
  render() {
    let {
      userInfo,
      avatar = 'https://ipxcdn.jfshare.com/ipxmall/2c5871d1937274f5d04504e861817f9a.png'
    } = this.props
    
    return(<View className='userInfo'>
      <View className='userInfoLeft'>
        <Image src={avatar} className='userAvatar' />
        <View className='userInfoName'>{userInfo.nick_name}</View>
      </View>
      <AtButton
        type='primary'
        circle
        className='myInfoBtn'
        onClick={this.jumpToCalendar}
      >我的资料</AtButton>
    </View>)
  }
}

export default connect(mapState)(UserInfo)