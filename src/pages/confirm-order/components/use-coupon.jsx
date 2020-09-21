import React from 'react'
import { View, Text, Input } from '@tarojs/components'

import './index.scss'
/**
 * @desc UseCoupon
 */
const UseCoupon = props => {
  let {
    title = '优惠码'
  } = props
  return (<View className='UseCouponWrap'>
    <Text className='UseCouponTitle'>{title}</Text>
    <View className='InputWrap'>
      <Input
        type='text'
        placeholder='请输入优惠码'
      />
      <View
        circle
        className='button'
      >兑换</View>
    </View>
  </View>)
}

export default UseCoupon