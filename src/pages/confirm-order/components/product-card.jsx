import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.scss'

/**
 * @desc 商品card
 */
const ProductCard = props => {
  let { info } = props
  /**
   * @desc 跳转到详情
   */
  const toDetail = () => {
    let  id = info.item_id
    // eslint-disable-next-line no-undef
    Taro.navigateTo({ url: `/pages/productDetail/index?id=${id}`})
  }
  return (<View className='ProductCardWrap' onClick={toDetail}>
    <Image
      src={info.main_image}
      className='ProductImg'
    />
    <View className='ProductInfoWrap'>
      <View className='ProductName'>{info.product_name}</View>
      <View className='ProductSkuInfo'>
        <View className='ProductPrice'>
          &yen;
          {info.format_product_price}
        </View>
        <View className='ProductCount'>x{info.count}</View>
      </View>
    </View>
  </View>)
}

export default ProductCard
