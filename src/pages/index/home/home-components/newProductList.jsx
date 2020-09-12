import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './newProductList.scss'

class NewProductList extends Component{
  /**
   * @desc 处理商品
   */
  getProduct = () => {
    let arr = [1, 2, 3, 4, 5]
    let src = 'https://ipxcdn.jfshare.com/ipxmall/52c827e336db429e3726da09fb6ca379'
    return arr.map(key => (
      <View className='productCard' key={key}>
        <Image src={src} className='productImg' />
        <View className='productTitle'>心形礼盒 怦然心动</View>
        <View className='productPrice'>¥399</View>
      </View>
    ))
  }
  render() {
    let { getProduct } = this
    return (<View className='newProductListWrap'>
      <View className='newProductListTitle'>新品推荐</View>
      <View className='newProductList'>
        { getProduct() }
      </View>
    </View>)
  }
}

export default NewProductList
