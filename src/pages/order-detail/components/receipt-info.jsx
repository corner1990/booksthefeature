import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc 详情头部
 */
const ReceiptInfo = props => {
  let { info } = props
  return (<View className='ReceiptInfoWrap'>
    <View className='Title'>收货信息</View>
    <View className='Line'>
      <Text className='LineTitle'>收货人：</Text>
      <Text className='LineText'>{info.receiver}</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>手机号码：</Text>
      <Text className='LineText'>{info.phone}</Text>
    </View>
    <View className='Line AddrLine'>
      <Text className='LineTitle'>收货地址：</Text>
      <View className='LineText'>{info.province}{info.city}{info.area}{info.address}</View>
    </View>
  </View>)
}

export default ReceiptInfo
