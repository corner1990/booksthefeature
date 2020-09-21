import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc PriceDetail 金额明细
 */
const PriceDetail = props => {
  return (<View className='PriceDetailWrap'>
    <View className='PriceDetailLine'>
      <Text className='PriceDetailLineTitle'>商品总额</Text>
      <View className='PriceInfo'>
        <Text className='currency'>&yen;</Text>
        498.00
      </View>
    </View>
    <View className='PriceDetailLine CouponLine'>
      <Text className='PriceDetailLineTitle'>优惠</Text>
      <View className='PriceInfo'>
        - <Text className='Currency'>&yen;</Text>
        20.00
      </View>
    </View>
  </View>)
}

export default PriceDetail