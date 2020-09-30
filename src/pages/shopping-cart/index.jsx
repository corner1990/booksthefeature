import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro, { render } from '@tarojs/taro'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import ProductList from './components/product-list'
import Footer from './components/footer'
import { getUserShoppingCartDetail } from './api'
import { update } from '../../store/actions/shopping-cart'

import './index.scss'

const mapState= state => state.shoppingCart

/**
 * @desc 购物侧
 */
class ShoppingCart extends Component {
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
      console.log()
      this.props.update({key: 'info', val: data.shopping_cart_product_list})
    }
  }
  // 
  render() {
    return (<View className='ShoppingCardWrap'>
      <CustomNavBar
        title='购物车'
        clickLeft={this.backHistory}
      />
      <ProductList list={this.props.info} />
      <Footer />
    </View>)
  }
  
}

export default connect(mapState, { update })(ShoppingCart)
