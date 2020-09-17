import React, { Component } from  'react'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './user-info.scss'
/**
 * @desc 用户信息
 */
class UserInfo extends Component{
  state = {
    avatar: 'https://ipxcdn.jfshare.com/ipxmall/2c5871d1937274f5d04504e861817f9a.png'
  }
  render() {
    let { avatar } = this.state
    return(<View className='userInfo'>
      <View className='userInfoLeft'>
        <Image src={avatar} className='userAvatar' />
        <View className='userInfoName'>Blanche Hall</View>
      </View>
      <AtButton
        type='primary'
        circle
        className='myInfoBtn'
      >我的资料</AtButton>
    </View>)
  }
}

export default UserInfo