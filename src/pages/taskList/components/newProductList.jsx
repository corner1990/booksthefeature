import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TaskCard from './taskCard'

import './newProductList.scss'

const TaskList = props => {
  /**
   * @desc 处理商品
   */
  const getProduct = () => {
    let { list = [] } = props

    return list.map((item, key) => {
      
      return (
          <TaskCard key={key} info={item} />
        // </LazyBlock>
      )
    })
  }
  
  return (
    <View className='newProductListWrap'>
      <View className='newProductList'>
        { getProduct() }

      </View>
    </View>)
}

export default TaskList
