import React from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import AddressCard from './components/address-card'
import AddBtn from './components/add-button'

import './index.scss'
/**
 * @desc 地址列表
 */
const UserAddress = () => {
  const backHistory = () => {}
  return (<View className='UserAddressWrap'>
    <CustomNavBar
      title='收货地址'
      clickLeft={backHistory}
    />
    <View className='AddressList'>
      <AddressCard />
      <AddressCard />
      <AddressCard />
      <AddressCard />
      <AddressCard />
      <AddressCard />
    </View>
    <AddBtn />
  </View>)
}

export default UserAddress