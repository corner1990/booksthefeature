'use strict'
import React from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

/**
 * @desc ConetentType1 展示样式1
 */
const ConetentType1 =  props => {
  let {
    info: {
      img,
      subTitle,
      subContent
    }
  } = props
  /**
   * @desc 获取内容
   */
  const getContent = () => {
    return subContent.map((info, key) => {
      return (<View className='contentType1-content' key={key} >
      <View className='contentType1-content-title'>{info.title}</View>
      <View className='contentType1-content'>{info.content}</View>
    </View>)
    })
  }
  return (<View className='conetentType1-wrap'>
    <View className='contentType1-img-wrap'>
      <Image src={img} className='conentType1-img'></Image>
    </View>
    <View className='contentType1-title'>{ subTitle }</View>
    { getContent() }
  </View>)
}

export default ConetentType1
