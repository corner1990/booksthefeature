import React from 'react'
import { View, Text, Input } from '@tarojs/components'

import './index.scss'
/**
 * @desc UseCoupon
 */
const UseCoupon = props => {
  let {
    title = '优惠码',
    setConpon = () => {},
    coupon= ''
  } = props
  /**
   * @desc 内容切换
   * @param {*} e 
   */
  const change = e => {
    let { detail } = e
    setConpon(detail.value)
  }
  return (<View className='UseCouponWrap'>
    <Text className='UseCouponTitle'>{title}</Text>
    <View className='InputWrap'>
      <Input
        type='text'
        placeholder='请输入优惠码'
        value={coupon}
        onInput={change}
      />
    </View>
  </View>)
}

export default UseCoupon