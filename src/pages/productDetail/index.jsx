import React, { Component } from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import MainImage from './components/header'
import ProductInfo from './components/productInfo'
import Detail from './components/product-detail'
import Footer from './components/footer'
import { parseQuery } from '../../utils/utils'
import { getProductDetail } from './api'

import './index.scss'
/**
 * @desc 详情页面
 */
class ProductDetail extends Component{
  state = {
    info: {}
  }
  componentWillMount () {
    let path = 'pages/productDetail/index?id=269&__key_=16012089318921'
    let { id } = parseQuery(path)
    this.loadInfo(parseInt(id))
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async item_id => {
    let { errorCode, data } = await getProductDetail({item_id})
    if (errorCode === 0) {
      this.setState({
        info: data
      })
    }
    
  }
  render() {
    let { info } = this.state
    
    return (<View className='ProductDetailWrap'>
      <CustomNavBar
        title='订花'
        clickLeft={this.backHistory}
      />
      <MainImage />
      <View className='ProductContentWrap'>
        <ProductInfo info={info} />
        <Detail info={info} />
      </View>
      <Footer />
    </View>)
  }
}

export default ProductDetail
