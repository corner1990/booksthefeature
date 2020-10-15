import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtInputNumber } from 'taro-ui'
import { connect } from 'react-redux'

import './index.scss'
import { updateCart } from '../api'
import { update } from '../../../store/actions/shopping-cart'

const mapState = state => state.shoppingCart;
/**
 * @desc 商品
 */
const ProductCard = props => {
  let { product, selected, changeSelected, isEdit } = props
  let [count, setCount] = useState(product.count)
  let active = selected.find(item => item.item_id === product.item_id) ? 'active' : ''
  // 切换选中状态
  const changeStatus = () => {
    let arr = active ? selected.filter(item => item.item_id !== product.item_id) : [...selected, product]
    changeSelected(arr)
  }
  /**
   * @desc 跟新购物商品数量
   * @param { number } count 购物车商品数量
   */
  const editProuctInfo = async num => {
    // TODO: 接口数据不对，会出现乘20的现象
    let { errorCode } = await updateCart({item_id: product.item_id, count: num})
    if (errorCode === 0 ) {
      setCount(num)
    }
  }
  return (<View className='ProductCard' onClick={changeStatus} >
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
            {product.product_price}
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
                onChange={editProuctInfo}
              />
            </View>
          ) : (<View className='ProductCount'>x{count}</View>)
        }
        </View>
      </View>
    </View>
  </View>)
}

export default connect(mapState, { update })(ProductCard)
