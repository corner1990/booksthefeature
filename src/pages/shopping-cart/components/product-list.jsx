import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import ProductCard from './product-card'

import './index.scss'

/**
 * @desc 购物侧
 */
const ProductList = props => {
  let { list } = props
  return (<View className='ProductList'>
    <View className='OperatonWrap'>
      <View className='SelectedAll'>
        <AtIcon
          value='check'
          size='14'
          color='#fff' 
          className='CircleView active'
        ></AtIcon>全选
      </View>
      <Text className='EditBtn'>编辑</Text>
    </View>
    {
      list.map((info, key) => 
        (<ProductCard key={key} info={info} />)
      )
    }
    
  </View>)
}

export default ProductList
