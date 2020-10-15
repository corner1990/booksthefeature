import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc PriceDetail 金额明细
 */
const PriceDetail = props => {
  let { info } = props
  return (<View className='PriceDetailWrap'>
    <View className='PriceDetailLine'>
      <Text className='PriceDetailLineTitle'>商品总额</Text>
      <View className='PriceInfo'>
        <Text className='currency'>&yen;</Text>
        {info.format_product_price}
      </View>
    </View>
    <View className='PriceDetailLine CouponLine'>
      <Text className='PriceDetailLineTitle'>优惠</Text>
      <View className='PriceInfo'>
        <Text className='Currency'>&yen;</Text>
        {info.discount_price}
      </View>
    </View>
    <View className='PriceDetailLine CouponLine'>
      <Text className='PriceDetailLineTitle'>运费</Text>
      <View className='PriceInfo'>
        <Text className='Currency'>&yen;</Text>
        {info.shipping_price}
      </View>
    </View>
  </View>)
}

export default PriceDetail