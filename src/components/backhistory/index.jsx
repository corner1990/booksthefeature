import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  state = {
    navigationBarHeight: 40,
  }
  componentWillMount () { 
    this.initWhiteHeight()
  }
  componentDidMount(){
    let {getHeight=()=>{}}=this.props;
    let {
      navigationBarHeight
    } = this.state
    const { statusBarHeight } = wx.getSystemInfoSync()
    getHeight(navigationBarHeight+statusBarHeight)
    console.log('did',navigationBarHeight+statusBarHeight)
  }
  /**
   * @desc 处理顶部高度
   */
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
   * @desc 处理返回
   */
  clickLeft = () => {
    // 兼容tab切换
    let { clickLeft } = this.props
    if(clickLeft) {
      clickLeft()
      return false
    }
    Taro.navigateBack()
  }
  clickRight() {}
  render () {
    let {
      navigationBarHeight
    } = this.state
    const { statusBarHeight } = wx.getSystemInfoSync()
    let {
      color= '#fff',
      title = false,
      titleStyle= {},
      fontSize=16,
      bgColor='#25272d',
      isFixed=false,
    } = this.props

    return (
      <View className={['custom-backhistory-wrap',(isFixed?'fixed':'')]} style={{ backgroundColor: bgColor }}>
        <View className='white-swpace' style={{height: statusBarHeight}}></View>
        <View className='backhistory-content-wrap' style={{ height: navigationBarHeight }}>
          <AtIcon value='chevron-left' color={color} onClick={this.clickLeft}></AtIcon>
          { title ? <View style={{...titleStyle, fontSize, color}} className='cuntom-nav-title'>{title}</View> : null }
        </View>
      </View>
    )
  }
}
