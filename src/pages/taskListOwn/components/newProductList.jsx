import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TaskCard from './taskCard'

import './newProductList.scss'

const TaskList = props =>{
  let { list = [] } = props
  /**
   * @desc 跳转详情
   * @param {*} info 
   */
  const goDetail = info => {
    let  id = info.base_info.item_id
    // eslint-disable-next-line no-undef
    Taro.navigateTo({ url: `/pages/productDetail/index?id=${id}`})
  }
  /**
   * @desc 处理商品
   */
  const getProduct = () => {
    // let list = [1,2,3,4,5]

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
