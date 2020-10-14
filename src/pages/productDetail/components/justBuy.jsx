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
    let {
      product: {
        base_info: {
          main_image,
          item_id,
          sku_id,
          format_sale_price,
          format_original_price,
          product_name,
          sale_price
        }
      }
    } = props
    console.log('props')
    /* 
    count: 1
    format_product_price: "400.00"
    item_id: 269
    main_image: ""
    product_name: "枪炮玫瑰弗洛伊德33支鲜花七夕情人节礼物"
    product_price: 40000
    sku_id: 0
    */
    props.setProductArray([{
      product_price: format_sale_price,
      format_product_price: format_original_price,
      main_image,
      item_id,
      sku_id,
      count,
      product_name,
      sale_price
    }])
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
