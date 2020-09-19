import React, { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'
/**
 * @desc 过滤
 */
class FilterBar extends Component{
  state = {
    list: [],
    active: 0
  }
  /**
   * @desc 处理item
   */
  getFitetItem = () => {
    let { list, active } = this.state
    return list.map((item, key) => (
      <View
        className={['OrderFilterBarItem', (active === key ? 'active' : '')]}
        key={key}
        onClick={() => this.setAvtive(key)}
      >
        {item.label}
      </View>
    ))
  }
  setAvtive = active => this.setState({ active })
  getIndexTransform = () => {
    let { active } = this.state
      let startWith = active * 25
      return {
        'transform': `translateX(calc(calc(25vw - 16px) / 2 + ${startWith}vw))`
      }
  }
  render() {
    return (<View className='OrderCard'>
      <View className='OrderCardTime'>
        <View className='OrderTime'>2020.08.31 17:43:21</View>
        <View className='CountDown'>倒计时28分37秒</View>
      </View>
      <View className='ProductInfoWrap'>
        <Image
          src='https://ipxcdn.jfshare.com/ipxmall/6287ac0c5f1013aa1114029b46e44b9e'
          className='ProductImg'
          mode='aspectFit'
        />
        <View className='ProductInfo'>
          <View className='ProductName'>北极星12支-玫瑰礼盒stardust collection</View>
          <View className='ProductSkuWrap'>
            <Text className='ProductPrice'>¥990.00</Text>
            <Text className='ProductCount'>x1</Text>
          </View>
        </View>
      </View>
      <View className='ProductOperationWrap'>
        <View className='ProductSkuText'>共1件商品，共计 ¥970.0</View>
        <AtButton type='primary' size='normal' circle>去支付</AtButton>
      </View>
    </View>)
  }
}

export default FilterBar
