import React from 'react'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

/**
 * @desc 商品
 */
const ProductCard = props => {
  let { info } = props
  return (<View className='ProductCard'>
    <AtIcon
      value='check'
      size='14'
      color='#fff' 
      className='CircleView'
    ></AtIcon>
    <View class='ProductCardRgiht'>
      <Image
        src={info.main_image}
        className='ProductImg'
      />
      <View className='ProductInfoWrap'>
        <View className='ProductName'>{ info.product_name }</View>
        <View className='ProductSkuInfo'>
          <View className='ProductPrice'>
            &yen;
            {info.product_price}
          </View>
        <View className='ProductCount'>x{info.count}</View>
        </View>
      </View>
    </View>
  </View>)
}

export default ProductCard
