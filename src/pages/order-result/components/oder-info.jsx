import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import './index.scss'
/**
 * @desc 详情头部
 */
const OrderInfo = props => {
  let { info } = props
  let { params } = Taro.Current.router
  let timer = info.create_timestamp === 0 ? '' :  dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')

  return (<View className='OrderInfoWrap ReceiptInfoWrap'>
    <View class='order-status-wrap'>
      <View class='status' >{params.pay_status === '1' ? '成功支付' : '等待支付'}</View>
      <View class='order-price'>
        &yen;
        <View class='large-price'>{info.format_pay_price}</View>
      </View>
    </View>
    <View class='order-info'>
      <View>订单号</View>
      <View>{info.order_sn}</View>
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
