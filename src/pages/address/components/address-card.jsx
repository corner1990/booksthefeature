import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'
/**
 * @desc 地址
 */
const AddressCard = props => {
  let { info } = props
  return (<View className='AddressCardWrap'>
    { info.is_default ? <Text className='Default'>默认</Text> : ''}
    <View className='UserInfo'>
      <Text className='Name'>{info.receiver}</Text>
      <Text className='Phone'>{info.phone}</Text>
    </View>
    <View className='Address'>
      {info.province} {info.city} {info.area} {info.addr}
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