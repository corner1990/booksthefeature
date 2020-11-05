import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.scss'
import { btnKey, btnTexts } from '../../index/orders/config'
/**
 * @desc 底部
 */
const Footer = props => {
  let {
    info: {
      format_product_total_price = '0.00',
      order_status = 10
    },
    submit = () => {}
  } = props
  format_product_total_price = format_product_total_price == null ? '0.00' : format_product_total_price
  
   /**
   * @desc ok按钮（右侧按钮点击触发）
   */
  const confirm = e => {
    e && e.stopPropagation()
    let actionKey = btnKey[order_status][1]
    submit(actionKey)
    // Taro.navigateTo({
    //   url: '/pages/order-result/index'
    // })
  }
  // 取消按钮（左侧按钮侧点击触发）
  const cancel = e => {
    // console.log('e', e)
    e && e.stopPropagation()
    let actionKey = btnKey[order_status][0]
    submit(actionKey)
  }
  /**
   * @desc 处理按钮
   */
  const getBtn = () => {
   
    let btns = btnTexts[order_status] || []
    if (btns.length ===  2) {
      return (<View className='BtnWrap'>
        <View
          className='button cancel'
          onClick={cancel}
        >{btns[0]}</View>
        <View
          className='button'
          onClick={confirm}
        >{btns[1]}</View>
      </View>)
    }
    return (<View className='BtnWrap'>
      <View
        className='button'
        onClick={cancel}
      >{btns[0]}</View>
    </View>)
    
  }
  return (<View className='ShoppingCardFooter'>
    <View className='PriceWrap'>
      <Text className='Currency'>&yen; </Text>
      {format_product_total_price}
    </View>
    <View className='BtnWrap'>
      {
        getBtn()
      }
    </View>
  </View>)
}

export default Footer
