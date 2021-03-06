import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
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
  /**
   * @desc 点击回调
   */
  clickHandle = () => {
    let { info } = this.props
    this.props.update({ info, open: true })
  }
  render () {
    let { info } = this.props
    let { clickHandle } = this
    let img = info.feed_detail.image_list[0]
    return (
      <View className='FoundCard' onClick={clickHandle}>
        <Image src={img.image}  className='FoundCardImg' mode='aspectFill' />
        <View className='FoundCardDesc'>
          {info.feed_detail.description}
        </View>
        <View class='ViewInfo'>
          <View>{info.author_info.nick_name} &nbsp; {info.feed_base_info.publish_time_str}</View>
          <View>
            <AtIcon value='eye' size='18' color='#999'></AtIcon>
            &nbsp;{info.feed_base_info.view_num_str}
          </View>
        </View>
      </View>
    )
  }
}