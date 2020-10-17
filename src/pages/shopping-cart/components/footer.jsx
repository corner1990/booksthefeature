import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import './index.scss'

const mapState = state => state.shoppingCart;
/**
 * @desc 底部
 */
class Footer extends Component {
 
  /**
   * @desc 动态计算价格
   */
  getPrice = () => {
    let { selected } = this.props
    let price = selected.reduce((prev, next) => {
      // 单个商品价格
      let itemPriceI = parseFloat(next.product_price) * 100 * next.count
      
      return prev + itemPriceI
    }, 0)
    return (price/100).toFixed(2)
  }
  
  render() {
    let { delProduct} = this.props
    let { selected, toOrder } = this.props
    let len = selected.length
    return (<View className='ShoppingCardFooter'>
      {
        this.props.isEdit ? (<View
          circle
          className='button del'
          onClick={() => delProduct()}
        >删除</View>) : [
          <View className='PriceWrap' key='price'>
            <Text className='Currency'>&yen;</Text>
            {this.getPrice()}
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
}

export default connect(mapState)(Footer)
