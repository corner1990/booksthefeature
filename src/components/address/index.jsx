import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtFloatLayout } from 'taro-ui'
import './index.scss'
/**
 * @desc 地址选择控件
 */
class Address extends Component{
  state = {
    isOpened: false
  }
  onChange = isOpened => {
    this.setState({
      isOpened
    })
  }
  update = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  render() {
    let { isOpened } = this.state
    console.log('isOpened', isOpened)
    let { update } = this
    return (<View className='address-wrap'>
      <View className='info-wrap' onClick={() => update('isOpened', true)}>
        <Text className='addr-info-title'>收货地址</Text>
        <View className='info-right'>
          <Text className='addr-placeholder'>请选择地区</Text>
          <AtIcon value='chevron-right' size='24' ></AtIcon>
        </View>
      </View>
      <AtFloatLayout isOpened={isOpened}>
      这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
      随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
    </AtFloatLayout>
    </View>)
  }
}

export default Address