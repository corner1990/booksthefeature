import React from 'react'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

const ProuductFooter = () => {
  return <View class='ProuductFooter'>
    <AtIcon
      value='shopping-cart'
      size='30'
      color='#101010'
      className='ShoppingCart'
    ></AtIcon>
    <View className='BtnWrap'>
        <View
          circle
          className='AddShoppingCart button'
        >加入购物车</View>
        <View
          circle
          className='JustBuy button'
        >立即购买</View>
    </View>
  </View>
}

export default ProuductFooter