import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

/**
 * @desc 商品card
 */
const ProductCard = props => {
  let { info } = props
  const viewDetail = () => {
    Taro.navigateTo({ url: `/pages/productDetail/index?id=${info.item_id}`})
  }
  return (<View className='CalendarProductCardWrap' onClick={viewDetail}>
    <Image
      src={info.prodcut_image}
      className='ProductImg'
    />
    <View className='ProductInfoWrap'>
      <View className='ProductName'>{info.prodcut_name}</View>
      {/* <View className='ProductSkuInfo'>
        <View className='ProductPrice'>
          &yen;
          {info.format_product_price}
        </View>
        <View className='ProductCount'>x{info.count}</View>
      </View> */}
    </View>
  </View>)
}

export default ProductCard
