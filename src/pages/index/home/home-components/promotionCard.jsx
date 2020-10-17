import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './promotionCard.scss'
/**
 * @desc 促销
 */
class PromotionCard extends Component{
  toDetail = () => {
    Taro.navigateTo({
      url: '/pages/orderFlower/index'
    })
  }
  render() {
    return (<View className='promotionWrap' onClick={this.toDetail}>
      <View className='allMonthFlower'>包月鲜花</View>
      <View className='giftFlowerGroup'>礼品花束</View>
    </View>)
  }
}

export default PromotionCard
