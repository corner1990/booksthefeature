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
  state = {
    orderInfo: {
      close_countdown: 0,
      created_timestamp: 0,
      format_pay_price: 0,
      order_id: 0,
      order_sn: 0,
      order_status: 0,
      pay_price: 0,
      pay_status: 1,
      product_list: [],
      shipping_word: '',
      shipping_info: {
        address: '',
        area: '',
        city: '',
        phone: '',
        province: '',
        receiver: '',
      }
    }
  }

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
    let { errorCode, data: orderInfo } = await queryOrderDetailInfo({order_id: id})
    if (errorCode === 0) {
      // this.props.update({key: 'info', val: data.shopping_cart_product_list})
      this.setState({
        orderInfo
      })
    }
  }
  toPay = () => {
    
  }
  /**
   * @desc 调用方法
   */
  submit = (key, ) => {
    console.log('key', key)
    switch(key){
      
      case 'toPay': // 去支付
        this.toPay()
        break;
      case 'cancel': // 关闭订单
        // this.cancel()
        break;
      case 'delorder': // 关闭订单
        // this.delOrder()
        break;
      case 'confirm': // 确认收货
        // this.confirm()
        break;
      case 'evaluation': // 确认收货
        // this.evaluation()
        break;
      case 'logistics': // 查看物流信息
        // this.viewLosistics()
        break;
      case 'seeEvaluation': // 查看查看评价
        // this.seeEvaluation()
        break;
      case 'driver': // 催发货
        // this.driver()
        break;
      case 'refound': // 退款
        // this.refound()
        break;
    }
      
  }
  render() {
    let {
      backHistory
    } = this
    let { orderInfo } = this.state

    return (<View className='OrderDetailWrap'>
      <CustomNavBar
        title='订单详情'
        clickLeft={backHistory}
      />
    <Header info={orderInfo} />
    <View className='OrderDetailContent'>
      <ReceiptInfo info={orderInfo.shipping_info} />
      <OrderInfo info={orderInfo} />
      <ProductInfo info={orderInfo} />
      <Footer info={orderInfo} submit={this.submit} />
    </View>
    
    </View>)
  }
}

export default OrderDetail