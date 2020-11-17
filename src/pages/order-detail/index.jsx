import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import Header from './components/header'
import ReceiptInfo from './components/receipt-info'
import OrderInfo from './components/oder-info'
import ProductInfo from './components/product-info'
import Footer from './components/footer'
// import { parseQuery } from '../../utils/utils'

import './index.scss'
import { queryOrderDetailInfo } from './api'
import { cancelOrder, deleteOrder } from '../index/orders/api'
import { createOrderPayInfo } from '../confirm-order/api'
import Event from '../../utils/event'
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
    },
    serverPhone: '13681924547'
  }

  componentDidMount() {
    // let {} = this.props
    this.loadInfo()
    
  }
  /**
   * @desc 触发订单页面刷新数据
   */
  triggerLoad = () => {
    Event.trigger('ordersLoad')
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
    /* 
    order_id: 2406
  order_sn: "202011011514248868471"

  order_id: 2405
order_sn: "202011011509221621264"

order_id: 2404
order_sn: "202011011508089570764"
    */
    
    let { order_sn = '202011011514248868471' } = Taro.Current.router.params
    
    let { errorCode, data: orderInfo } = await queryOrderDetailInfo({order_sn})
    if (errorCode === 0) {
      // this.props.update({key: 'info', val: data.shopping_cart_product_list})
      this.setState({
        orderInfo
      })
    }
  }
  /**
   * @desc 下单
   * @param {*} info 
   */
  
  async toPay(params) {
    let url = `/pages/order-result/index?order_id=${params.order_sn}`
    let { errorCode, data} = await  createOrderPayInfo({order_sn: params.order_sn, 'pay_type': 5, pay_price: params.pay_price})
    if (errorCode === 0) {
      Taro.requestPayment({
        ...data,
        signType: 'MD5',
        success () {
          this.triggerLoad()
          url = `${url}&pay_status=1`
          Taro.navigateTo({ url })
        },
        fail () {
          url = `${url}&pay_status=0`
          Taro.navigateTo({ url })
        }
      })
    }
    
  }
  /**
   * @desc 调用方法
   */
  submit = (key) => {
    let { orderInfo: info} = this.state
    
    switch(key){
      
      case 'toPay': // 去支付
        this.toPay(info)
        break;
      case 'cancel': // 关闭订单
        this.askCancel(info)
        break;
      case 'delorder': // 关闭订单
        this.askDelete(info)
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
        this.driver()
        break;
      case 'refound': // 退款
        // this.refound()
        break;
    }
      
  }
  askCancel = info => {
    let self = this
    Taro.showModal({
      title: '提示',
      content: '你确定要取消该订单么？',
      success: function (res) {
        if (res.confirm) {
          self.cancel(info)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  /**
   * @desc 关闭订单
   * @param {*} info 
   */
  cancel = async info => {
    let { order_sn } = info
    let { errorCode } = await cancelOrder({ order_sn })
    if(errorCode === 0) {
      this.triggerLoad()
      this.setState({
        orderInfo: {
          ...info,
          order_status: 50
        }
       })
    }

  }
  askDelete = info => {
    let self = this
    Taro.showModal({
      title: '提示',
      content: '你确定要删除该订单么？',
      success: function (res) {
        if (res.confirm) {
          self.delete(info)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  /**
   * @desc 删除订单
   * @param {*} info 
   */
  delete = async info => {
    let { order_sn } = info
    let { errorCode } = await deleteOrder({ order_sn })
    if(errorCode === 0) {
      this.triggerLoad()
      Taro.navigateBack()
    }

  }
  /**
   * @des  催发货
   * @param {*} info 
   */
  driver = () => {
    Taro.showModal({
      title: '提示',
      content: '已经通知老板尽快发货！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  /**
   * @desc 拨打电话
   */
  tel = () => {
    Taro.makePhoneCall({
      phoneNumber: this.state.serverPhone
    })
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
      <View className='serveInfo'>
        <View className='serveTitle'>客服电话</View>
        <View className='servePhone' onClick={this.tel}>{this.state.serverPhone}</View>
      </View>
    </View>
    
    </View>)
  }
}

export default OrderDetail