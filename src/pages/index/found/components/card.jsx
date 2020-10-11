import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    value: '',
    src: 'https://ipxcdn.jfshare.com/system/admin/73b49bac721467bbc62bcc67519fcb2f.jpg'
  }
  componentDidMount () {
  }
  onChange (value) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value
    })
  }
  /**
   * @desc 动态处理图片尺寸
   * @param {*} img 
   */
  getStyle = img => {
    let { width, height } = img
    let screenW = wx.getSystemInfoSync().windowWidth
    let imgMaxWidth = screenW / 2 - 7
    if (width > imgMaxWidth) {
      width = imgMaxWidth
      height = width / imgMaxWidth * height
    } else {
      width = imgMaxWidth
      height = imgMaxWidth / width * height
    }
    return {
      width,
      height
    }
  }
  render () {
    let { info } = this.props
    let { getStyle } = this
    let img = info.feed_detail.image_list[0]
    return (
      <View className='FoundCard'>
        <Image src={img.image} style={getStyle(img)} className='FoundCardImg' mode='aspectFill' />
      </View>
    )
  }
}