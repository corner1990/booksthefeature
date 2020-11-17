import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import ProductList from './components/product-list'
import Footer from './components/footer'
import None from '../../components/none'
import CustomTab from './components/tab'
import { getUserShoppingCartDetail, removeFromCart } from './api'
import { update, select, setProductArray } from '../../store/actions/shopping-cart'

import './index.scss'

const mapState= state => state.shoppingCart

/**
 * @desc 购物车
 */
class ShoppingCart extends Component {
  state = {
    isEdit: false,
    product_type: 1
  }
  componentWillMount() {
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
    let { product_type } = this.state
    let { errorCode, data } = await getUserShoppingCartDetail({ product_type })
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
    this.setState({ [key]: val })
  }
  askDelete = () => {
    let self = this
    Taro.showModal({
      title: '提示',
      content: '你确定要删除已选中的商品么？',
      success: function (res) {
        if (res.confirm) {
          self.delProduct()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  // 删除
  delProduct = async () => {
    let { selected, info } = this.props
    if (selected.length === 0) {
      return Taro.showToast('请先选择商品')
    }
    let items = selected.map(item => item.item_id)
    info = info.filter(item => {
      return !items.includes(item.item_id)
    })
    let { errorCode } = await removeFromCart({item_id: items})
    if (errorCode === 0) {
      // 清空已选择列表
      this.props.select([])
      this.props.update({key: 'info', val: info})
      return Taro.showToast({
        title: '删除成功',
        icon: 'none'
      })
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
  changeType = product_type => {
    this.setState({ product_type })
    this.loadInfo()
  }
  render() {
    let { isEdit, product_type } = this.state
    let { info } = this.props
    let { updateState, askDelete, toOrder, changeType } = this

    return (<View className='ShoppingCardWrap'>
      <CustomNavBar
        title='购物车'
        clickLeft={this.backHistory}
      />
      <View className='CustomTabWrap'>
        <CustomTab  update={changeType} active={product_type} />
      </View>
      {
        info.length ?
          <ProductList isEdit={isEdit} update={updateState} />
          : <None style={{paddingTop: 80}} text='暂无任何商品' /> 
      }
      <Footer
        isEdit={isEdit}
        update={updateState}
        delProduct={askDelete}
        toOrder={toOrder}
      />
    </View>)
  }
  
}

export default connect(mapState, { update, select, setProductArray })(ShoppingCart)
