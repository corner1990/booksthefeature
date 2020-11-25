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
import { getProductDetail, getUserShoppingCartCount, getSystemConfigList } from './api'
import { update } from '../../store/actions/shopping-cart'

import './index.scss'

/**
 * @desc 详情页面
 */
class ProductDetail extends Component{
  state = {
    info: {},
    title: '',
    isOpened: false,
    showJustBuy: false,
    config: {} // 站点配置
  }
  componentWillMount () {
    // let { id } = Taro.Current.router.params
    let { id=289 } = Taro.Current.router.params
    this.loadInfo(id)
    this.loadCartCount()
    this.loadInfoConfig()
  }
  onLoad() {
    Taro.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    })
  }
  onShareAppMessage() {
    let { info } = this.state
    let { product_name, item_id, main_image } = info.base_info
    let res = {
      title: product_name,
      path: `/pages/productDetail/index?id=${item_id}`,  // 自定义的分享路径，点击分享的卡片之后会跳转这里定义的路由
      imageUrl: main_image // 图片路径
    }
    console.log('res', res)
    return res;
  }
  /**
   * @desc 获取购物车数量
   */
  loadCartCount = async() => {
    let { errorCode, data } = await getUserShoppingCartCount()
    if (errorCode === 0) {
      this.props.update({key: 'productCount', val: data})
    }
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async item_id => {
    let { errorCode, data } = await getProductDetail({item_id})
    if (errorCode === 0) {
      this.setState({
        info: data,
        title: data.base_info.product_name
      })
    }
    
  }
  /**
   * @desc 加载配置
   */
  loadInfoConfig = async item_id => {
    let { errorCode, data } = await getSystemConfigList()
    if (errorCode === 0) {
      let config = data.reduce((prev, next) => {
        let { config_key, config_value } = next
        prev[config_key] = config_value
        return prev
      }, {})
      // 外部
      this.setState({ config })
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
  backHistory = () => {
    Taro.navigateBack({
      fail() {
        Taro.redirectTo({
          url: '/pages/index/index'
        })
      }
    })
    
  }
  
  render() {
    let { info, isOpened, showJustBuy, title, config } = this.state
    // TODO: 处理规格参数
    return (<View className='ProductDetailWrap'>
      <CustomNavBar
        title={title}
        clickLeft={this.backHistory}
      />
      <MainImage info={info} />
      <View className='ProductContentWrap'>
        <ProductInfo info={info} />
        <Detail info={info} />
      </View>
      <Footer update={this.update} config={config}  />
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
        <JustBuyComponent
          update={this.update}
          product={info}
        />
      </AtActionSheet>
    </View>)
  }
}

export default connect(state => {
  return state.shoppingCart
}, { update })(ProductDetail)
