import React from 'react'
import { View, Text } from '@tarojs/components'
import dayjs from 'dayjs'
import './index.scss'
/**
 * @desc 详情头部
 */
const OrderInfo = props => {
  let { info } = props
  let timer = info.create_timestamp === 0 ? '' :  dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')

  return (<View className='OrderInfoWrap ReceiptInfoWrap'>
    <View class='order-status-wrap'>
      <View class='status' >成功支付</View>
      {/* <p class='status' v-else>等待支付</p> */}
      <View class='order-price'>
        &yen;
        <View class='large-price'>123.00</View>
      </View>
    </View>
    <View class='order-info'>
      <View>订单号</View>
      <View>202003045067667</View>
    </View>
    <View class='order-info'>
      <View>下单时间</View>
      <View>{timer}</View>
    </View>
    <View class='order-info'>
      <View>支付方式</View>
      <View>微信支付</View>
    </View>
  </View>)
}

export default OrderInfo
