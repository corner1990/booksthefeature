import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'
/**
 * @desc 详情头部
 */
const OrderHeader = () => {
  return (<View className='OrderHeaderWrap'>
    <View className='OrderHeaderTitle'>订单已取消</View>
    <View className='OrderHeaderSubTitle'>您的订单因超时未支付而被取消</View>
  </View>)
}

export default OrderHeader