import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './promotionCard.scss'
/**
 * @desc 促销
 */
class PromotionCard extends Component{
  render() {
    return (<View className='promotionWrap'>
      <View className='allMonthFlower'>包月鲜花</View>
      <View className='giftFlowerGroup'>礼品花束</View>
    </View>)
  }
}

export default PromotionCard
