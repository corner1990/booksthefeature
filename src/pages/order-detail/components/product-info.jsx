import React from 'react'
import { View, Text } from '@tarojs/components'
import ProductCard from '../../confirm-order/components/product-card'

import './index.scss'
/**
 * @desc 商品信息
 */
const ProductInfo = () => {
  return (<View className='ProductInfoWrap ReceiptInfoWrap'>
    <View className='Title'>商品信息</View>
    <ProductCard />
    <View className='Line'>
      <Text className='LineTitle'>商品总额</Text>
      <Text className='LineText'>¥990.00</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>优惠</Text>
      <Text className='LineText'>-¥20.00</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>运费</Text>
      <Text className='LineText'>¥10.00</Text>
      </View>
    <View className='Line PriceInfo'>
      <Text className='LineTitle'>订单总额</Text>
      <Text className='LineText'>¥980.00</Text>
    </View>
  </View>)
}

export default ProductInfo
