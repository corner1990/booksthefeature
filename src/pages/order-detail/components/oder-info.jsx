import React from 'react'
import { View, Text } from '@tarojs/components'
import dayjs from 'dayjs'
import './index.scss'
/**
 * @desc 详情头部
 */
const OrderInfo = props => {
  let { info } = props
  let timer = info.create_timestamp === 0 ? '' :  dayjs(new Date(info.created_timestamp*1000)).format('YYYY-MM-DD HH:mm:ss')

  return (<View className='OrderInfoWrap ReceiptInfoWrap'>
    <View className='Title'>订单信息</View>
    <View className='Line'>
      <Text className='LineTitle'>订单号码：</Text>
      <Text className='LineText'>{info.order_sn}</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>下单时间：</Text>
      <Text className='LineText'>{timer}</Text>
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
