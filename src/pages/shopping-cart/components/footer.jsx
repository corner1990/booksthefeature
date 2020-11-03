import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import './index.scss'

const mapState = state => state.shoppingCart;
/**
 * @desc 底部
 */
class Footer extends Component {
 
  render() {
    let { selected, toOrder, delProduct, priceInfo } = this.props
    
    let len = selected.length
    return (<View className='ShoppingCardFooter'>
      {
        this.props.isEdit ? (<View
          circle
          className='button del'
          onClick={delProduct}
        >删除</View>) : [
          <View className='PriceWrap' key='price'>
            {len ? <Text className='Currency'>&yen;</Text> : ''}
            {priceInfo.format_pay_price}
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
