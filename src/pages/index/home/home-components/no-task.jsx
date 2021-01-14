import React, { Component } from 'react'
import { View } from '@tarojs/components'
import AddButton from './add-button'
import Taro from '@tarojs/taro'
import './index.scss'
/**
 * @desc 咩有任务
 */
const NoTask = () => {
  return (<View className='no-task-wrap'>
    <AddButton />
    <View className='slogan'>给自己的未来一个承诺。。。</View>
  </View>)
}
export default NoTask