import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './newProductList.scss'

class NewProductList extends Component{
  
  componentDidMount() {
  }
  /**
   * @desc 跳转详情
   * @param {*} info 
   */
  goDetail = info => {
    let  id = info.base_info.item_id
    // eslint-disable-next-line no-undef
    Taro.navigateTo({ url: `/pages/productDetail/index?id=${id}`})
  }
  /**
   * @desc 处理商品
   */
  getProduct = () => {
    let { list = [] } = this.props
    let { goDetail } = this
    return list.map((info, key) => {
      
      return (
          <View
            className='productCard'
            key={key}
            onClick={() => goDetail(info)}
          >
            <Image
              src={info.base_info.main_image}
              className='productImg'
            />
            <View className='productTitle'>{info.base_info.product_name}</View>
            <View className='productPrice'>¥{info.base_info.format_sale_price}</View>
          </View>
        // </LazyBlock>
      )
    })
  }
  render() {
    let { getProduct} = this
    let {
      hideTitle = false
    } = this.props
    return (
      <View className='newProductListWrap'>
        {hideTitle ? '' : <View className='newProductListTitle'>新品推荐</View>}
        <View className='newProductList'>
          { getProduct() }
        </View>
      </View>)
  }
}

export default NewProductList
