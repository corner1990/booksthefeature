import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './newProductList.scss'

class NewProductList extends Component{
  
  componentDidMount() {
  }
  /**
   * @desc 处理商品
   */
  getProduct = () => {
    let { list = [] } = this.props
    return list.map((info, key) => {
      return (
        // <LazyBlock current={key} key={key} >
          <View className='productCard' key={key}>
            <Image
              src={info.base_info.main_image}
              className='productImg'
            />
            <View className='productTitle'>{info.base_info.product_name}</View>
            <View className='productPrice'>¥{info.base_info.sale_price}</View>
          </View>
        // </LazyBlock>
      )
    })
  }
  render() {
    let { getProduct } = this
    return (
      <View className='newProductListWrap'>
        <View className='newProductListTitle'>新品推荐</View>
        <View className='newProductList'>
          { getProduct() }
        </View>
      </View>)
  }
}

export default NewProductList
