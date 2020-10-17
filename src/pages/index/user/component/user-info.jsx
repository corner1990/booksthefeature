import React, { Component } from  'react'
import { View, Image } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import './user-info.scss'

const mapState = state => state.global
/**
 * @desc 用户信息
 */
class UserInfo extends Component{
  state = {}
  /**
   * @desc 跳转到个人资料
   */
  jumpToUserInfo = () => {
    Taro.navigateTo({
      url: '/pages/user-info/index'
    })
  }
  /**
   * @desc 跳转到购物车
   */
  jumpToShopCartPage = () => {
    Taro.navigateTo({
      url: '/pages/shopping-cart/index'
    })
  }
  /**
   * @desc 跳转到日历页面
   */
  render() {
    let {
      userInfo
    } = this.props
    
    return(<View className='userInfo'>
      <View className='userInfoLeft' onClick={this.jumpToUserInfo}>
        <Image src={userInfo.avatar} className='userAvatar' />
        <View className='userInfoName'>{userInfo.nick_name}</View>
      </View>
      <AtButton
        type='primary'
        circle
        className='myInfoBtn'
        onClick={this.jumpToShopCartPage}
      >
        <AtIcon value='shopping-cart' size='22' color='#FFF' style={{marginTop: '-2px'}}></AtIcon> 购物车
      </AtButton>
    </View>)
  }
}

export default connect(mapState)(UserInfo)