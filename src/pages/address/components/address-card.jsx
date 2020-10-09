import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'

import './index.scss'
/**
 * @desc 地址
 */
const AddressCard = props => {
  let { info, setInfo } = props
  /**
   * @desc 编辑地址
   */
  const setEditInfo = () => {
    setInfo(info)
    Taro.navigateTo({
      url: '/pages/addAddr/index'
    })
  }
  const delAddr = () => {
    let { update } = props
    update('delInfo', info)
    update('showDel', true)
  }
  return (<View className='AddressCardWrap'>
    { info.is_default === '1' ? <Text className='Default'>默认</Text> : ''}
    <View className='UserInfo'>
      <Text className='Name'>{info.receiver}</Text>
      <Text className='Phone'>{info.phone}</Text>
    </View>
    <View className='Address'>
      {info.province} {info.city} {info.area} {info.addr} {info.address}
    </View>
    <View className='OperationWrap'>
      <Text className='del' onClick={delAddr}>
        <AtIcon value='trash' size='16' color='#170707d9'></AtIcon>
        删除
      </Text>
      <Text className='Edit' onClick={setEditInfo}>
        <AtIcon value='edit' size='16' color='#170707d9'></AtIcon>
        编辑
      </Text>
    </View>
  </View>)
}

export default AddressCard