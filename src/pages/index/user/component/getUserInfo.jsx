import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtButton } from "taro-ui"

import './index.scss'
import { updateUserInfo } from '../api'


class GetUserInfo extends Component {

  state = {
    open: false
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    let self = this
    let syncInfo = Taro.getStorageSync('$syncInfo')
    if (!syncInfo) {
      Taro.getSetting({
        success(res) {
          let {
            errMsg,
            authSetting
          } = res
          if (errMsg === 'getSetting:ok' && !authSetting["scope.userInfo"]) {
            self.getUserInfo()
          }
        }
      })
    }
  }
  componentWillUnmount() { }
  
  componentDidShow() {
  }
  componentDidHide() { }
  /**
   * @desc 获取用户信息
   */
  getUserInfo = () => {
    this.setState({ open: true })
    // let self = this
    Taro.getUserInfo({
      success: (res) => {
        let userInfo = res.userInfo
        this.updateInfo(userInfo)
      }
    })
  }
  cancel = () => {
    this.setState({ open: false })
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
      Taro.showToast({
        title: '同步信息成功!',
        icon: 'none'
      })
      this.props.loadInfo()
      Taro.setStorageSync('$syncInfo', '1')
    }
  }
  render() {

    return (
      <View className='getUserInfo'>
        <AtModal
          isOpened={this.state.open}
        >
          <AtModalHeader>同步提醒</AtModalHeader>
          <AtModalContent>
            为了更好地体验，请同步你的头像和昵称！
          </AtModalContent>
          <AtModalAction>
            <AtButton
              type='secondary'
              className='getUserInfoBtn'
              openType='getUserInfo'
              onClick={this.cancel}
            >确定</AtButton>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default GetUserInfo