import React, { Component } from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import ProductList from './components/product-list'
import Footer from './components/footer'

import './index.scss'

/**
 * @desc 购物侧
 */
class ShoppingCart extends Component {

  backHistory = () => {}
  render() {
    return (<View className='ShoppingCardWrap'>
      <CustomNavBar
        title='订花'
        clickLeft={this.backHistory}
      />
      <ProductList />
      <Footer />
    </View>)
  }
}

export default ShoppingCart
