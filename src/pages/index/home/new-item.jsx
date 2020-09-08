import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './new-item.scss'

const Index = props =>  {

  /**
   * @desc 查看详情
   */
  const viewDetail = () => {
    Taro.navigateTo({ url: '/pages/list/index'})
  }
  let { info: {
    img
  } } = props
  return (
    <View className='new-item' onClick={viewDetail}>
      <Image src={img} alt='img' srcset='' className='new-img' />
      {/* <View class='new-item-text'>2020年8月</View> */}
    </View>
  )
}

export default Index 
