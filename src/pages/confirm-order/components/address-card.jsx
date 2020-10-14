import React from 'react'
import { View, Text } from '@tarojs/components'
// import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'
/**
 * @desc 地址
 */
const AddressCard = props => {
  let { info } = props

  /**
   * @desc 选择地址
   */
  const jumpAddr = () => {
    Taro.navigateTo({
      url: '/pages/address/index'
    })
  }
  return (<View className='AddressCardWrap' onClick={jumpAddr}>
    <View className='title'>收货地址</View>
    <View className='UserInfo'>
      <Text className='Name'>{info.receiver}</Text>
      <Text className='Phone'>{info.phone}</Text>
    </View>
    <View className='Address'>
      {info.province} {info.city} {info.area} {info.addr} {info.address}
    </View>
  </View>)
}

export default AddressCard