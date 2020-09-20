import React from 'react'
import { View, Text } from '@tarojs/components'
import { } from 'taro-ui'
import ProductCard from './product-card'

import './index.scss'

/**
 * @desc 购物侧
 */
const ProductList = () => {
  return (<View className='ProductList'>
    <View className='OperatonWrap'>
      <View className='SelectedAll'>
        <View className='CircleView active'></View>全选
      </View>
      <Text className='EditBtn'>编辑</Text>
    </View>
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
  </View>)
}

export default ProductList
