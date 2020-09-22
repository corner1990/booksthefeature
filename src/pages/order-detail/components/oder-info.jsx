import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc 详情头部
 */
const OrderInfo = () => {
  return (<View className='OrderInfoWrap'>
    <View className='Title'>收货信息</View>
    <View className='Line'>
      <Text className='LineTitle'>收货人：</Text>
      <Text className='LineText'>Vian</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>手机号码：</Text>
      <Text className='LineText'>18662478953</Text>
    </View>
    <View className='Line AddrLine'>
      <Text className='LineTitle'>收货地址：</Text>
      <Text className='LineText'>上海市 静安区 陕西北路 100弄 1号</Text>
    </View>
  </View>)
}

export default OrderInfo
