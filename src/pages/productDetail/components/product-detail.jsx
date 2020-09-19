import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtAccordion } from 'taro-ui'
import './index.scss'
/**
 * @desc 头部
 */
class MainProductdetail extends Component {
  state = {
    open: false
  }
  handleClick = () => {
    let open = !this.state.open
    this.setState({ open })
  }
  render() {
    let src = 'https://ipxcdn.jfshare.com/ipxmall/23e01070cb4c2cc6aa56640240948531'
    return (<View className='MainProductdetail'>
      <View className='DetailTitle'>商品详情</View>
      <Image
        src={src}
        mode='aspectFill'
        className='DetailImage'
      />
      <View className='white-space'></View>
      <AtAccordion
        hasBorder={false}
        open={this.state.open}
        onClick={this.handleClick}
        title='规格参数'
        className='InfoAccordion'
      >
        <View>1212222</View>
      </AtAccordion>
    </View>)
  }
}

export default MainProductdetail
