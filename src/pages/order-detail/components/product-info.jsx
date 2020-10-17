import React from 'react'
import { View, Text } from '@tarojs/components'
import ProductCard from '../../confirm-order/components/product-card'

import './index.scss'
/**
 * @desc 商品信息
 */
const ProductInfo = props => {
  let { info } = props
  let {
    format_product_total_price = '0.00',
    format_discount_price = '0.00',
    format_shipping_price = 0,
    format_pay_price
  } = info
  return (<View className='ProductInfoWrap ReceiptInfoWrap'>
    <View className='Title'>商品信息</View>
    {
      info.product_list.map((item, key) => <ProductCard info={item} key={key} />)
    }
    <View className='Line'>
      <Text className='LineTitle'>商品总额</Text>
      <Text className='LineText'>¥{format_product_total_price}</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>优惠</Text>
  <Text className='LineText'>{format_discount_price === '0.00' ? '' : '-'}¥{format_discount_price}</Text>
    </View>
    <View className='Line'>
      <Text className='LineTitle'>运费</Text>
      <Text className='LineText'>¥{format_shipping_price}</Text>
      </View>
    <View className='Line PriceInfo'>
      <Text className='LineTitle'>订单总额</Text>
      <Text className='LineText'>¥{format_pay_price}</Text>
    </View>
  </View>)
}

export default ProductInfo
