import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { connect } from 'react-redux'
import Header from './components/header'
import OrderInfo from './components/oder-info'
import { parseQuery } from '../../utils/utils'


import './index.scss'
import { queryOrderDetailInfo } from './api'
import { setTab } from '../../store/actions/global'

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
    let { tid: path } = this.props
    // let path = 'pages/productDetail/index?id=269&__key_=16012089318921'
    let { order_id } = parseQuery(path)
    // this.loadInfo()
    console.log(order_id, 'props order_id')
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
  /**
   * @desc 跳转
   * @param {*} url 
   */
  jumpTo = () => Taro.navigateTo({ url: '/pages/index/index' })
  btnClick = tab => {
    this.props.setTab(tab)
    this.jumpTo()
  }
  render() {
    let { orderInfo } = this.state

    return (<View className='OrderDetailWrap'>
    <Header info={orderInfo} />
    <View className='OrderDetailContent'>
      <OrderInfo info={orderInfo} />
    </View>
    <View className='BtnWrap'>
      <AtButton type='primary' onClick={() => this.btnClick(2)}>查看订单</AtButton>
      <AtButton onClick={() => this.btnClick(0)}>回到首页</AtButton>
    </View>
    </View>)
  }
}

export default connect(
  () => {},
  { setTab }
)(OrderDetail)