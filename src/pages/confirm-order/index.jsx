import React from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import ItemWrap from './components/item-card'
import Address from '../../components/address'
import ProductCard from './components/product-card'
import Switch from '../../components/switch'
import UseCoupon from './components/use-coupon'
import PriceDetail from './components/price-detail'
import Footer from './components/footer'

import './index.scss'
/**
 * @desc 确认订单
 */
const ConfirmOrder = () => {
  const  backHistory = () => {}
  /**
   * @desc switch change
   * @param  {...any} args 
   */
  const switchChange = (...args) => {
    console.log('switchChange', args)
  }
  return (<View className='ConfirmOrderWrap'>
    <CustomNavBar
      title='确认订单'
      clickLeft={backHistory}
    />
    <View className='ConfirmOrderContentWrap'>
      <Address title='添加收获地址' />
      <ItemWrap
        title='添加收获地址'
        subTitle=''
      />
      <ItemWrap
        title='配送时间'
        subTitle='请选择配送时间'
      />
      <View className='ProductList'>
        <ProductCard />
        <ProductCard />
      </View>
      <UseCoupon />
      <ItemWrap
        title='祝福卡类型'
        subTitle='钢铁直男型'
      />
      <Switch
        title='匿名送达'
        change={switchChange}
      />
      <PriceDetail />
    </View>
    <Footer />
  </View>)
}

export default ConfirmOrder
