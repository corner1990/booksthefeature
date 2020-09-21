import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'
/**
 * @desc 地址
 */
const AddBtn = () => {
  return (<View className='AddBtnWrap'>
    <AtButton type='primary'>新增</AtButton>
  </View>)
}

export default AddBtn