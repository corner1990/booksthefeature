import React, { useState } from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import Header from './components/header'
import ReceiptInfo from './components/receipt-info'

import './index.scss'
/**
 * @desc 我的信息
 */
const OrderDetail = () => {
  /**
   * @desc 返回上一页
   */
  const backHistory = () => {}


  return (<View className='OrderDetailWrap'>
    <CustomNavBar
      title='订单详情'
      clickLeft={backHistory}
    />
   <Header />
   <View className='OrderDetailContent'>
    <ReceiptInfo />
   </View>
   
  </View>)
}

export default OrderDetail