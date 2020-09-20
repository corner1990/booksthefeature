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
    <View
      circle
      className='button disabled'
    >立即购买</View>
  </View>)
}

export default Footer
