import React from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

/**
 * @desc 商品card
 */
const ProductCard = props => {

  let { info } = props
  return (<View className='ProductCardWrap'>
    <Image
      src={info.main_image}
      className='ProductImg'
    />
    <View className='ProductInfoWrap'>
      <View className='ProductName'>{info.product_name}</View>
      <View className='ProductSkuInfo'>
        <View className='ProductPrice'>
          &yen;
          {info.sale_price}
        </View>
        <View className='ProductCount'>x{info.count}</View>
      </View>
    </View>
  </View>)
}

export default ProductCard
