import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from 'react-redux'
import ProductCard from './product-card'
import { select, update as updateStore } from '../../../store/actions/shopping-cart'
import { calculateOrderPrice } from '../../confirm-order/api'

import './index.scss'

const mapState = state => state.shoppingCart
/**
 * @desc 购物侧
 */
const ProductList = props => {
  let { info:list, selected, update } = props
  // 全选 取消全选
  const selectAll = () => {
    let arr = list.length === selected.length ? [] : list
    props.select(arr)
    calculatePrice(arr)
  }
  // 切换选中状态
  const changeSelected = arr => props.select(arr)
  // 编辑
  const editHanler = isEdit => {
    props.select([])
    props.update('isEdit', isEdit)
  }
  /**
   * @desc 计算价格
   */
  const calculatePrice = async arr => {
    if (arr.length  === 0) return false
    let product_array = arr.map(info => {
      let { item_id } = info
      return { count: info.count, item_id  }
    })
    let { errorCode, data } = await calculateOrderPrice({
      product_array,
    })
    if (errorCode === 0) {
      props.updateStore({key:'priceInfo', val: data})
    }
  }
  return (<View className='ProductList'>
    <View className='OperatonWrap'>
      <View className='SelectedAll' onClick={selectAll} >
        <AtIcon
          value='check'
          size='14'
          color='#fff' 
          className={['CircleView', list.length === selected.length ? 'active' : '']}
        ></AtIcon>全选
      </View>
      {
        props.isEdit ? (
          <Text className='EditBtn' onClick={() => editHanler(false)}>完成</Text>
        ) : (<Text className='EditBtn' onClick={() => editHanler(true)}>编辑</Text>)
      }
      
      
    </View>
    {
      list.map((info, key) => 
        (<ProductCard
          key={key}
          product={info}
          selected={selected}
          isEdit={props.isEdit}
          update={update}
          changeSelected={changeSelected}
        />)
      )
    }
    
  </View>)
}

export default connect(mapState, { select, updateStore })(ProductList)
