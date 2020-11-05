import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtActionSheet } from "taro-ui"
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import MainImage from './components/header'
import ProductInfo from './components/productInfo'
import Detail from './components/product-detail'
import Footer from './components/footer'
import AddShopCart from './components/addShopcart'
import JustBuyComponent from './components/justBuy'

import { getProductDetail } from './api'

import './index.scss'

/**
 * @desc 详情页面
 */
class ProductDetail extends Component{
  state = {
    info: {},
    isOpened: false,
    showJustBuy: false
  }
  componentWillMount () {
    // let { id } = Taro.Current.router.params
    let { id=289 } = Taro.Current.router.params
    this.loadInfo(id)
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
  
  /**
   * @desc 更新数据
   * @param { string } key 数据键
   * @param { any } val 需要更新的value
   */
  update = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  /**
   * @desc 返回上一页
   */
  backHistory = () => Taro.navigateBack()
  render() {
    let { info, isOpened, showJustBuy } = this.state
    // TODO: 处理规格参数
    return (<View className='ProductDetailWrap'>
      <CustomNavBar
        title='订花'
        clickLeft={this.backHistory}
      />
      <MainImage info={info} />
      <View className='ProductContentWrap'>
        <ProductInfo info={info} />
        <Detail info={info} />
      </View>
      <Footer update={this.update} />
      <AtActionSheet
        isOpened={isOpened}
        className='ShopCartActionSheet'
        onClose={() => this.update('isOpened', false)}
      >
        <AddShopCart update={this.update} product={info} />
      </AtActionSheet>
      <AtActionSheet
        isOpened={showJustBuy}
        className='ShopCartActionSheet'
        onClose={() => this.update('showJustBuy', false)}
      >
        <JustBuyComponent update={this.update} product={info} />
      </AtActionSheet>
    </View>)
  }
}

export default connect(state => {
  return state.shoppingCart
}, {})(ProductDetail)
