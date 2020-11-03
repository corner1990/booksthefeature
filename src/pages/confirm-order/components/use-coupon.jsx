import React, { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'

import './index.scss'
/**
 * @desc UseCoupon
 */
const UseCoupon = props => {
  const { val, setVal } = useState('')
  let {
    title = '优惠码',
    setConpon = () => {}
  } = props
  /**
   * @desc 内容切换
   * @param {*} e 
   */
  const change = e => {
    let { detail } = e
    setVal(detail.value)
    setConpon(detail.value)
  }
  return (<View className='UseCouponWrap'>
    <Text className='UseCouponTitle'>{title}</Text>
    <View className='InputWrap'>
      <Input
        type='text'
        placeholder='请输入优惠码'
        value={val}
        onInput={change}
      />
      {/* <View
        circle
        className='button'
      >兑换</View> */}
    </View>
  </View>)
}

export default UseCoupon