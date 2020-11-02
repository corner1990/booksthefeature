import React from 'react'
import { View } from '@tarojs/components'
import Card from './product-card'
import './index.scss'

/**
 * @desc 查看详情
 * @param {*} props 
 */
const  ProductList = props =>{
  let { selected } = props
 
  if(!selected.length) return (<View></View>)
  return (
    <View className='ProductList'>
      <View className='ProductListTitle'>鲜花列表</View>
      <View className='CardWrap'>
        { selected.map((info, key) => (<Card info={info} key={key} />)) }
      </View>
    </View>
  )

}

export default ProductList