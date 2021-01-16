import React, { Component } from  'react'
import { View, Image } from '@tarojs/components'
import { AtButton, AtIcon, AtBadge } from 'taro-ui'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import './user-info.scss'
import { getUserShoppingCartCount } from '../../../productDetail/api'
import { update } from '../../../../store/actions/shopping-cart'

const mapState = state => {
  return {
    ...state.global,
    productCount: state.shoppingCart.productCount
  }
}
/**
 * @desc 用户信息
 */
class UserInfo extends Component{
  state = {}
  componentDidMount() {
    // this.loadCartCount()
  }
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
   * @desc 获取购物车数量
   */
  loadCartCount = async() => {
    let { errorCode, data } = await getUserShoppingCartCount()
    if (errorCode === 0) {
      this.props.update({key: 'productCount', val: data})
    }
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
        <View className='userInfoName'>{userInfo.nick_name || '高富帅'}</View>
      </View>
      {/* <AtButton
        type='primary'
        circle
        className='myInfoBtn'
        onClick={this.jumpToShopCartPage}
      >
        <AtBadge value={productCount} maxValue={99}>
          <AtIcon value='shopping-cart' size='22' color='#FFF' style={{marginTop: '-2px'}}></AtIcon>
        </AtBadge>
      </AtButton> */}
    </View>)
  }
}

export default connect(mapState, { update })(UserInfo)