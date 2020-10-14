import React, { Component } from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import Header from './components/header'
import ReceiptInfo from './components/receipt-info'
import OrderInfo from './components/oder-info'
import ProductInfo from './components/product-info'
import Footer from './components/footer'

import './index.scss'
/**
 * @desc 我的信息
 */
class OrderDetail extends Component {
  /**
   * @desc 返回上一页
   */
  backHistory = () => {}

  render() {
    let {
      backHistory
    } = this
    return (<View className='OrderDetailWrap'>
      <CustomNavBar
        title='订单详情'
        clickLeft={backHistory}
      />
    <Header />
    <View className='OrderDetailContent'>
      <ReceiptInfo />
      <OrderInfo />
      <ProductInfo />
      <Footer />
    </View>
    
    </View>)
  }
}

export default OrderDetail