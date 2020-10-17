import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import Header from './components/header'
import ReceiptInfo from './components/receipt-info'
import OrderInfo from './components/oder-info'
import ProductInfo from './components/product-info'
import Footer from './components/footer'
import { parseQuery } from '../../utils/utils'

import './index.scss'
import { queryOrderDetailInfo } from './api'
/**
 * @desc 我的信息
 */
class OrderDetail extends Component {
  state = {}

  componentDidMount() {
    // let {} = this.props
    this.loadInfo()
  }
  /**
   * @desc 返回上一页
   */
  backHistory = () => {
    Taro.navigateBack()
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async () => {
    // let { tid: path } = this.props
    let path = 'pages/productDetail/index?id=2354&__key_=16012089318921'
    let { id } = parseQuery(path)
    let { errorCode, data } = await queryOrderDetailInfo({order_id: id})
    if (errorCode === 0) {
      // this.props.update({key: 'info', val: data.shopping_cart_product_list})
      console.log('data.shopping_cart_product_list', data)
    }
  }
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