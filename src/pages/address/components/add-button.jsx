import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.scss'
/**
 * @desc 地址
 */
const AddBtn = () => {
  /**
   * @desc 新增地址
   */
  const addAddr = () => {
    Taro.navigateTo({
      url: '/pages/addAddr/index'
    })
  }
  return (<View className='AddBtnWrap'>
    <AtButton type='primary' onClick={addAddr}>新增</AtButton>
  </View>)
}

export default AddBtn