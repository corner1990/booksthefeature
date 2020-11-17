import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtInputNumber } from 'taro-ui'
import { connect } from 'react-redux'

import './index.scss'
import { updateCart } from '../api'
import { update } from '../../../store/actions/shopping-cart'
import { calculateOrderPrice } from '../../confirm-order/api'

const mapState = state => state.shoppingCart;
/**
 * @desc 商品
 */
class ProductCard extends Component {
  constructor(props) {
    super()
    let { product } = props
    this.state = {
      count: product.count
    }
  }
  shouldComponentUpdate(props) {
    let { product: { count } } = props
    if (count !== this.state.count) {
      this.setState({ count })
    }
    return true
  }
  // 切换选中状态
  changeStatus = () => {
    let { product, selected } = this.props
    let active = selected.find(item => item.item_id === product.item_id) ? 'active' : ''
    let arr = active ? selected.filter(item => item.item_id !== product.item_id) : [...selected, product]
    this.props.changeSelected(arr)
    this.calculatePrice(arr)
  }
  /**
   * @desc 计算价格
   */
  calculatePrice = async arr => {
    if (arr.length  === 0) return false
    let product_array = arr.map(info => {
      let { item_id } = info
      return { count: info.count, item_id  }
    })
    let { errorCode, data } = await calculateOrderPrice({
      product_array,
    })
    if (errorCode === 0) {
      this.props.update({key:'priceInfo', val: data})
    }
  }
  /**
   * @desc 跟新购物商品数量
   * @param { number } count 购物车商品数量
   */
  editProuctInfo = async num => {
    let { product, info } = this.props
    let { errorCode, data } = await updateCart({item_id: product.item_id, count: num})
    if (errorCode === 0 ) {
      this.setState({ count: num })
      
      info = info.map(item => {
        if (item.item_id !== product.item_id) return item
        return {
          ...product,
          count: num
        }
      })
      this.props.update({key: 'info', val: info})
      this.props.update({key: 'productCount', val: data})
    }
  }
  render() {
    let { count } = this.state
    let { product, selected, isEdit } = this.props
    let active = selected.find(item => item.item_id === product.item_id) ? 'active' : ''
    return (<View className='ProductCard' onClick={this.changeStatus} >
    <AtIcon
      value='check'
      size='14'
      color='#fff' 
      className={['CircleView', active]}
    ></AtIcon>
    <View class='ProductCardRgiht'>
      <Image
        src={product.main_image}
        className='ProductImg'
      />
      <View className='ProductInfoWrap'>
        <View className='ProductName'>{ product.product_name }</View>
        <View className='ProductSkuInfo'>
          <View className='ProductPrice'>
            &yen;
            {product.format_product_price}
          </View>
        
        {
          isEdit ? (
            <View onClick={e => {
              e.stopPropagation()
            }}
            >
              <AtInputNumber
                min={1}
                max={999}
                step={1}
                value={count}
                onChange={this.editProuctInfo}
              />
            </View>
          ) : (<View className='ProductCount'>x{count}</View>)
        }
        </View>
      </View>
    </View>
  </View>)
  }
}

export default connect(mapState, { update })(ProductCard)
