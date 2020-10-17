import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { statusObj } from '../../index/orders/config'
import CustomNavBar from '../../../components/navbar'
import './index.scss'
/**
 * @desc 详情头部
 */
const OrderHeader = props => {
  let { info } = props
  /**
   * @desc 返回上一页
   */
  const backHistory = () => {
    Taro.navigateBack()
  }
  return (<View className='OrderResultHeaderWrap'>
    <CustomNavBar
      color='#fff'
      clickLeft={backHistory}
    />
    {/* <View class='pay-status flex'>
      <Image src='@/assets/order/order-success.png' class='reslult-img' alt='' srcset='' />
      <View class='pay-info'>
        <View class='pay-title'>支付成功</View>
        <View class='pay-small-title'>商品正在准备中…</View>
      </View>
    </View> */}
    <View class='pay-status' >
      {/* <Image src='' class='reslult-img' alt='' srcset=''> */}
      <View class='pay-info'>
        <View class='pay-title'>支付失败</View>
        <View class='pay-small-title'>订单24小时后关闭</View>
      </View>
    </View>
    <View class='line'></View>
  </View>)
}

export default OrderHeader