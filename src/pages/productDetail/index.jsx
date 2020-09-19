import React, { Component } from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import MainImage from './components/header'
import ProductInfo from './components/productInfo'
import Detail from './components/product-detail'
import Footer from './components/footer'

import './index.scss'
/**
 * @desc 详情页面
 */
class ProductDetail extends Component{
  render() {
    return (<View className='ProductDetailWrap'>
      <CustomNavBar
        title='订花'
        clickLeft={this.backHistory}
      />
      <MainImage />
      <View className='ProductContentWrap'>
        <ProductInfo />
        <Detail />
      </View>
      <Footer />
    </View>)
  }
}

export default ProductDetail
