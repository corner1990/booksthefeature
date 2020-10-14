import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import ProductList from './components/product-list'
import Footer from './components/footer'
import { getUserShoppingCartDetail, removeFromCart } from './api'
import { update, select, setProductArray } from '../../store/actions/shopping-cart'

import './index.scss'

const mapState= state => state.shoppingCart

/**
 * @desc 购物车
 */
class ShoppingCart extends Component {
  state = {
    isEdit: false
  }
  componentDidMount() {
    this.loadInfo()
  }
  /**
   * @desc 返回
   */
  backHistory = () => {
    Taro.navigateBack()
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async () => {
    let { errorCode, data } = await getUserShoppingCartDetail()
    if (errorCode === 0) {
      this.props.update({key: 'info', val: data.shopping_cart_product_list})
    }
  }
  /**
   * @desc 更新数据
   * @param { string } key 数据key
   * @param { any } val 任何数据
   */
  updateState = (key, val) => {
    console.log('key', key, val)
    this.setState({ [key]: val })
  }
  // 删除
  delProduct = async () => {
    let { selected } = this.props
    if (selected.length === 0) {
      return Taro.showToast('请先选择商品')
    }
    let items = selected.map(item => item.item_id)
    let { errorCode } = await removeFromCart({item_id: items})
    if (errorCode === 0) {
      // 清空已选择列表
      this.props.select([])
      return Taro.showToast('删除成功')
    }
  }
  /**
   * @desc 下单
   */
  toOrder = () => {
    let { selected } = this.props
    
    if (selected.length === 0) {
      return Taro.showToast({
        title: '请先选择商品',
        icon: 'none'
      })
    }
    this.props.setProductArray(selected)
    setTimeout(() => {
      Taro.navigateTo({
        url: '/pages/confirm-order/index'
      })
    }, 100)
  }
  render() {
    let { isEdit } = this.state
    let { updateState, delProduct, toOrder } = this
    return (<View className='ShoppingCardWrap'>
      <CustomNavBar
        title='购物车'
        clickLeft={this.backHistory}
      />
      <ProductList isEdit={isEdit} update={updateState} />
      <Footer
        isEdit={isEdit}
        update={updateState}
        delProduct={delProduct}
        toOrder={toOrder}
      />
    </View>)
  }
  
}

export default connect(mapState, { update, select, setProductArray })(ShoppingCart)
