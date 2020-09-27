import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc 底部
 */
const Footer = () => {
  return (<View className='ShoppingCardFooter'>
    <View className='PriceWrap'>
      <Text className='Currency'>&yen;</Text>
      999.00
    </View>
    <View className='BtnWrap'>
      <View
        circle
        className='button cancel'
      >取消订单</View>
      <View
        circle
        className='button'
      >立即购买</View>
    </View>
  </View>)
}

export default Footer
