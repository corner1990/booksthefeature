import React, { useState } from 'react'
import { View } from '@tarojs/components'
import {  AtInputNumber, AtButton } from 'taro-ui'
import { connect } from 'react-redux'
import ProductCard from './product-card'
// import Addr from '../../../components/address'
import { addShoppingCart, update as updateCount } from '../../../store/actions/shopping-cart'
import './index.scss'
import { asyncAdd } from '../../../store/actions/global'
import { updateCart } from '../../shopping-cart/api'
/**
 * @desc 加入购物车
 */
const AddShopCart = props => {
  // let [addr, setAddr] = useState('')
  let [count, setCount] = useState(1)
  
  // const addrChnage = selectAddr => {
  //   setAddr(selectAddr)
  // }
  // console.log('AddShopCart', props)
  /**
   * @desc 从购物车删除
   */
  const hideShopCart = () => {
    props.update('isOpened', false)
  }
  /**
   * @desc 隐藏购物车
   */
  const addCart = async () => {
    // 
    let { product } = props
    let { item_id } = product.base_info
    let { errorCode, data } = await updateCart({item_id,  new_num: count})
    if (errorCode === 0) {
      hideShopCart()
      props.updateCount({key: 'productCount', val: data})
    }
    // 添加到购物
    // addShoppingCart(item_id, count, hideShopCart)
    // asyncAdd(count)
  }
  return (<View className='AddShopCartWrap'>
    <ProductCard info={props.product} />
    <View className='OperationWrap'>
      {/* <Addr change={addrChnage} /> */}
      {/* <View className='OperationCard'>
        <View className='OperationTitle'>配送区域</View>
        <View className='OperationVal'>
          <Text className={(addr ? '' : 'Placehoder' )}>{(addr ? addr : '请选择行政区域')}</Text>
          <AtIcon value='chevron-down' size='20' color='#d8d8d8'></AtIcon>
        </View>
      </View>
      <View className='OperationCard'>
        <View className='OperationTitle'>送达时间</View>
        <View className='OperationVal'>
          2020.08.12
          <AtIcon value='chevron-down' size='20' color='#d8d8d8'></AtIcon>
        </View>
      </View> */}
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
        <AtButton type='primary' className='ShopCartBtn' onClick={addCart}>加入购物车</AtButton>
      </View>
    </View>
  </View>)
}

export default connect(state => {
  return state.shoppingCart
}, {
  addShoppingCart,
  asyncAdd,
  updateCount
})(AddShopCart)
