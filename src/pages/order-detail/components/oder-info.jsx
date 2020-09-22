import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc 详情头部
 */
const OrderInfo = () => {
  return (<View className='OrderInfoWrap ReceiptInfoWrap'>
    <View className='Title'>订单信息</View>
    <View className='Line'>
      <Text className='LineTitle'>订单号码：</Text>
      <Text className='LineText'>42343243242324</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>下单时间：</Text>
      <Text className='LineText'>2019.09.17 13:00:00</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>支付方式：</Text>
      <Text className='LineText'>微信支付</Text>
      </View>
    <View className='Line'>
      <Text className='LineTitle'>祝福卡：</Text>
      <Text className='LineText'>微信</Text>
    </View>
  </View>)
}

export default OrderInfo
