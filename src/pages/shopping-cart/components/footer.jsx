import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import './index.scss'

const mapState = state => state.shoppingCart;
/**
 * @desc 底部
 */
const Footer = props => {
  let { delProduct } = props
  let { selected, toOrder } = props
  let len = selected.length
  /**
   * @desc 动态计算价格
   */
  const getPrice = () => {
    let price = selected.reduce((prev, next) => {
      // 单个商品价格
      let price = parseFloat(next.product_price) * 100 * next.count
      
      return prev + price
    }, 0)
    return (price/100).toFixed(2)
  }
  return (<View className='ShoppingCardFooter'>
    {
      props.isEdit ? (<View
        circle
        className='button del'
        onClick={() => delProduct()}
      >删除</View>) : [
        <View className='PriceWrap' key='price'>
          <Text className='Currency'>&yen;</Text>
          {getPrice()}
        </View>,
        <View
          circle
          className={['button', len ? '' : 'disabled']}
          key='btn'
          onClick={toOrder}
        >立即购买</View>
      ]
    }
  </View>)
}

export default connect(mapState)(Footer)
