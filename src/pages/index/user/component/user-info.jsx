import React, { Component } from  'react'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtButton, AtIcon, AtBadge } from 'taro-ui'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import './user-info.scss'
import { getUserShoppingCartCount } from '../../../productDetail/api'
import { update } from '../../../../store/actions/shopping-cart'
import { getUseInfo } from '../../../../store/actions/global'
import { bindPhone, updateUserInfo } from '../api'

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
   * @desc 获取用户信息
   */
  getInfo = () => {
    let self = this
    Taro.login({
      success() {
        Taro.getUserInfo({
          success: (res) => {
            let userInfo = res.userInfo
            self.updateInfo(userInfo)
          }
        })
      }
    })
  }
  /**
   * @desc 更新用户信息
   * @param {*} info 
   */
  updateInfo = async info => {
    let {
      avatarUrl,
      gender,
      nickName,
    } = info
    let { errorCode } = await updateUserInfo({
      set: gender,
      avatar: avatarUrl,
      nick_name: nickName
    })
    if (errorCode === 0) {
      // Taro.showToast({
      //   title: '同步信息成功!',
      //   icon: 'none'
      // })
      this.props.getUseInfo()
      // Taro.setStorageSync('$syncInfo', '1')
    }
  }
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
            self.bindPhoneFn({ code: res.code, encryptedData, iv, provider: 'wxMin' })
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
    await bindPhone(params)
    this.props.getUseInfo()
    
  }
  /**
   * @desc 按钮
   */
  getPhoneBtn = () => {
    let {
      userInfo
    } = this.props
    if (userInfo.phone_num) {
      return (<View>
        <AtIcon value='iphone' size='20' color='#eee'></AtIcon>
        <Text>{userInfo.phone_num}</Text>
      </View>)
    }
    return (<AtButton         
      className='phoneButton'
      openType='getPhoneNumber'
      onGetPhoneNumber={this.getPhoneNumber}
    >
      <AtIcon value='iphone' size='20' color='#eee'></AtIcon>绑定手机号
    </AtButton>)
  }
  getLoginBtn = () => {
    let {
      userInfo
    } = this.props
    // let token = Taro.getStorageSync('token')
    if (!userInfo.nick_name) {
      return (<View>
        <View
        type='secondary'
        className='getUserInfoBtn'
        
      >点击登陆</View>
        <Button
          openType='getUserInfo'
          style="position: absolute;line-height: -70rpx;margin: -34px 0 0 2rpx;opacity: 0;"
          onClick={this.getInfo}
        >点击登陆</Button>
      </View>)
    }
    return userInfo.nick_name
  }
  /**
   * @desc 跳转到日历页面
   */
  render() {
    let {
      userInfo
    } = this.props
    return(<View className='userInfo'>
      <View className='userInfoLeft'>
        <Image src={userInfo.avatar} className='userAvatar'  onClick={this.jumpToUserInfo} />
        <View className='userInfoNameWrap'>
          <View className='userInfoName'>{this.getLoginBtn()}</View>
          <View className='phone-wrap'>
            {this.getPhoneBtn()}
          </View>
        </View>
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

export default connect(mapState, { update, getUseInfo })(UserInfo)