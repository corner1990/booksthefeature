import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtInputNumber, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import ProductCard from './product-card'
import { setProductArray } from '../../../store/actions/shopping-cart'
import './index.scss'
/**
 * @desc 加入购物车
 */
const JustBuy = props => {
  let [count, setCount] = useState(1)
 
  /**
   * @desc 隐藏购物车
   */
  const toOrder = async () => {
    let { product } = props
    props.setProductArray([{...product, count}])
    Taro.navigateTo({
      url: '/pages/confirm-order/index'
    })
    props.update('showJustBuy', false)
  }
  return (<View className='JustBuyWrap'>
    <ProductCard info={props.product} />
    <View className='OperationWrap'>
      <View className='OperationCard'>
        <View className='OperationTitle'>购买数量</View>
        <View className='OperationVal'>
        <AtInputNumber
          min={1}
          max={99}
          step={1}
          value={count}
          onChange={setCount}
        />
        </View>
      </View>
      <View className='BtnWrap'>
        <AtButton type='primary' className='JustBuyBtn' onClick={toOrder}>立刻购买</AtButton>
      </View>
    </View>
  </View>)
}

export default connect(state => {
  return state.shoppingCart
}, {
  setProductArray
})(JustBuy)
