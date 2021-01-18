import React, { Component, useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { connect } from 'react-redux'
import Header from './components/header'
import { setTab } from '../../store/actions/global'
import OrderInfo from './components/oder-info'

import './index.scss'

/**
 * @desc 订单信息
 */


const OrderResult = props => {
  const [info, setInfo] = useState({
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
  })
  const [firstLoad, setFirstLoad] = useState(true)
  /**
   * @desc 加载数据
   */
  const loadInfo = async() => {
    let { errorCode, data } = await queryOrderDetailInfo(params)
    if (errorCode === 0) {
      setInfo(data)
    }
  }
  /**
   * @desc 跳转
   * @param {*} url 
   */
  const jumpTo = () => Taro.navigateTo({ url: '/pages/index/index' })
  const btnClick = tab => {
    props.setTab(tab)
    jumpTo()
  }
  if (firstLoad) {
    loadInfo()
  }
  return (<View className='OrderDetailWrap'>
   <Header info={info} />
   <View className='OrderDetailContent'>
     <OrderInfo info={info} />
   </View>
   <View className='BtnWrap'>
     <AtButton type='primary' onClick={() => btnClick(2)}>查看计划</AtButton>
     <AtButton onClick={() => btnClick(0)}>回到首页</AtButton>
   </View>
   </View>)
}
export default connect(
  () => {},
  { setTab }
)(OrderResult)