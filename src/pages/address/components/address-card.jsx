import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'
/**
 * @desc 地址
 */
const AddressCard = () => {
  return (<View className='AddressCardWrap'>
    <Text className='Default'>默认</Text>
    <View className='UserInfo'>
      <Text className='Name'>高富帅</Text>
      <Text className='Phone'>188888888</Text>
    </View>
    <View className='Address'>
      山西省 大同市 矿区 华富街道，莲花大厦西座1613室
    </View>
    <View className='OperationWrap'>
      <Text className='del'>
        <AtIcon value='trash' size='16' color='#170707d9'></AtIcon>
        删除
      </Text>
      <Text className='Edit'>
        <AtIcon value='edit' size='16' color='#170707d9'></AtIcon>
        编辑
      </Text>
    </View>
  </View>)
}

export default AddressCard