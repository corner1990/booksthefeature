import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './promotionCard.scss'
/**
 * @desc 促销
 */
class PromotionCard extends Component{
  toDetail = type => {
    Taro.navigateTo({
      url: `/pages/orderFlower/index?type=${type}`
    })
  }
  render() {
    return (<View className='promotionWrap' >
      <View className='allMonthFlower' onClick={() => this.toDetail(1)}>
        <Image src='https://ipxcdn.jfshare.com/system/admin/89b43f571a02436864226a47c457b895.png' class='icon-img'  />包月鲜花
      </View>
      <View className='giftFlowerGroup'  onClick={() => this.toDetail(2)}>
        <Image src='https://ipxcdn.jfshare.com/system/admin/1c3127cd1399f7d415f72f9768834f02.png' class='icon-img gift-img' />礼品花束
      </View>
    </View>)
  }
}

export default PromotionCard
