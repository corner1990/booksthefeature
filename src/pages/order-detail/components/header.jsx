import React from 'react'
import { View } from '@tarojs/components'
import { statusObj } from '../../index/orders/config'
import './index.scss'
/**
 * @desc 详情头部
 */
const OrderHeader = props => {
  let { info } = props
  let statusText = statusObj[info.order_status] || ''
  
  return (<View className='OrderHeaderWrap'>
    <View className='OrderHeaderTitle'>{statusText}</View>
    <View className='OrderHeaderSubTitle'>{info.shipping_word}</View>
  </View>)
}

export default OrderHeader