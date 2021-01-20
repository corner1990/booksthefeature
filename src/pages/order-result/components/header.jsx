import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../../components/navbar'
import './index.scss'
/**
 * @desc 详情头部
 */
const ResultHeader = props => {
  let { info } = props
  /**
   * @desc 返回上一页
   */
  const backHistory = () => {
    Taro.navigateBack()
  }
  let { params } = Taro.Current.router
  return (<View className='OrderResultHeaderWrap'>
    <CustomNavBar
      color='rgba(0, 0, 0, .85)'
      title='支付详情'
      clickLeft={backHistory}
    />
    
    <View class='pay-status' >
      <View class='pay-info'>
        <View class='pay-title'>{params.pay_status === '1' ? '成功支付' : '等待支付'}</View>
        {/* <View class='pay-small-title'>{info.shipping_word}</View> */}
      </View>
    </View>
  </View>)
}

export default ResultHeader