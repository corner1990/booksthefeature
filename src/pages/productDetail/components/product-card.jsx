import React from 'react'
import { View, Image } from '@tarojs/components'
// import Addr from '../../../components/address'
import './index.scss'

/**
 * @desc 商品card
 */
const ProductCard = props => {
  let {
    info
  } = props
  info = info.base_info ? info : {
    base_info:{
      main_image: '',
      product_name: '',
      sale_price: ''
    }
  }
  return (<View className='ProductCardWrap'>
    <Image
      src={info.base_info.main_image}
      className='ProductImg'
    />
    <View className='ProductInfoWrap'>
      <View className='ProductName'>{info.base_info.product_name}</View>
      <View className='ProductSkuInfo'>
        <View className='ProductPrice'>
          &yen;
          {info.base_info.format_sale_price}
        </View>
      </View>
    </View>
    
  </View>)
}

export default ProductCard
