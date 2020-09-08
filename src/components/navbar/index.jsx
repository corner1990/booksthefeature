import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  state = {
    src: 'https://ipxcdn.jfshare.com/ipxmall/729580491c97b7a08d969b3d2f3e7026',
    navigationBarHeight: 40
  }
  componentWillMount () { 
    this.initWhiteHeight()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  initWhiteHeight() {
    const { statusBarHeight, platform } = wx.getSystemInfoSync()
    const { top, height } = wx.getMenuButtonBoundingClientRect()

    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)
    let navigationBarHeight = 48
    // 判断胶囊按钮信息是否成功获取
    if (top && top !== 0 && height && height !== 0) {
        navigationBarHeight = (top - statusBarHeight) * 2 + height
    } else {
      navigationBarHeight = platform === 'android' ? 48 : 40
    }
    this.setState({
      navigationBarHeight
    })
  }
  /**
   * @desc 判断是否展示返回按钮
   */
  getArrowLeft = () => {
    let { clickLeft, color, iconSize=24 } = this.props
    if (!clickLeft) return ''
    return (<View className='clickLeft-wrap' onClick={ clickLeft } >
      <AtIcon value='chevron-left' size={iconSize} color={color}></AtIcon>
    </View>)
  }
  render () {
    let {
      src,
      navigationBarHeight
    } = this.state
    let { title } = this.props
    const { statusBarHeight } = wx.getSystemInfoSync()
    return (
      <View className='custom-navbar-wrap'>
        <View className='white-swpace' style={{height: statusBarHeight}}></View>
        <View className='custom-navbar' style={{ height: navigationBarHeight }}>
          { this.getArrowLeft() }
          <Text className='nav-bar-title'>{title}</Text>
          <Image src={ src } alt='logo' srcset='' className='login-img' />
        </View>
      </View>
    )
  }
}
