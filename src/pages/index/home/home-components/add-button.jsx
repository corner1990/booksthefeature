import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './add-button.scss'
/**
 * @desc 促销
 */
class PromotionCard extends Component{
  creatTaskPage = () => {
    Taro.navigateTo({
      url: `/pages/taskList/index`
    })
  }
  render() {
    return (<View className='addbutton' onClick={this.creatTaskPage}>
      <View className="bg-circle bg-circle-frist "></View>
      <View className="bg-circle bg-circle-second"></View>
      <View className="btn-text">+</View>
    </View>)
  }
}

export default PromotionCard
