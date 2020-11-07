import React from 'react'
import { View } from '@tarojs/components'
import { AtIcon, AtBadge } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'

const ProuductFooter = props => {
  /**
   * @desc 添加到购物车
   */
  const addShopCart = () => {
    props.update('isOpened', true)
  }
  /**
   * @desc 跳转到购物车
   */
  const jumpToShopCartPage = () => {
    Taro.navigateTo({
      url: '/pages/shopping-cart/index'
    })
  }
  /**
   * @desc 创建订单
   */
  const toOrder = () => {
    // Taro.navigateTo({
    //   url: '/pages/confirm-order/index'
    // })
    props.update('showJustBuy', true)
  }
  
  return <View class='ProuductFooter'>
    <AtBadge value={props.productCount} maxValue={99}>
      <AtIcon
        value='shopping-cart'
        size='30'
        color='#101010'
        className='ShoppingCart'
        onClick={jumpToShopCartPage}
      ></AtIcon>
    </AtBadge>
    <View className='BtnWrap'>
      <View
        circle
        className='AddShoppingCart button'
        onClick={addShopCart}
      >加入购物车</View>
      <View
        circle
        className='JustBuy button'
        onClick={toOrder}
      >立即购买</View>
    </View>
  </View>
}

export default connect(state => {
  return state.shoppingCart
})(ProuductFooter)