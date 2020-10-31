import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import ItemWrap from './components/item-card'
// import Address from '../../components/address'
import AddressCard from './components/address-card'
import PickerDate from '../../components/picker-date'
import ProductCard from './components/product-card'
import Switch from '../../components/switch'
import UseCoupon from './components/use-coupon'
import PriceDetail from './components/price-detail'
import Footer from './components/footer'
import { getShippingAddressList } from '../address/api';
import { setShipping, update } from '../../store/actions/shopping-cart'

import './index.scss'
import { calculateOrderPrice, createOrder, createOrderPayInfo } from './api';
import { removeFromCart } from '../shopping-cart/api';

/**
 * @desc 确认订单
 */
class ConfirmOrder extends React.Component {
  state = {
    date: '请选择配送时间',
    priceInfo: {
      discount_price: '',
      pay_price: '',
      product_total_price: '',
      shipping_price: '',
      voucher_code: '',
      anonymous: false
    }
  }
  componentDidMount() {

    this.loadAddress()
    this.calculatePrice()
  }
   backHistory = () => Taro.navigateBack()
  /**
   * @desc switch change
   * @param  {...any} args 
   */
  switchChange = (anonymous) => {
    this.setState({ anonymous })
  }
  /**
   * @desc 跳转到我的地址列表
   */
  jumpToAddress = () => {
    Taro.navigateTo({
      url: '/pages/address/index'
    })
  }
  /**
   * @desc 时间变化
   * @param {string} date 
   */
  dateChange = date => {
    this.setState({
      date: date.detail.value
    })
  }
  /**
   * 
   */
  loadAddress = async () => {
    let { errorCode, data: { shipping_address_list:list  }} = await getShippingAddressList()
    
    if (errorCode === 0) { 
      let addr = list.find(item => item.is_default === '1') || list[0]
      this.props.setShipping(addr)
    }
  }
  getAddr = () => {
    let {
      shipping
    } = this.props
    if (shipping.province) {
      return (<AddressCard info={shipping} />)
    }
    return (<ItemWrap
      title='收获地址'
      subTitle=''
      click={this.jumpToAddress}
    />)
  }
  /**
   * @desc 计算价格
   */
  calculatePrice = async () => {
    let { product_array } = this.props
    let { voucher_code } = this.state
    product_array = product_array.map(info => {
      let { count, item_id } = info
      return { count, item_id  }
    })
    let { errorCode, data } = await calculateOrderPrice({
      product_array,
      voucher_code
    })
    if (errorCode === 0) {
      this.setState({
        priceInfo: data
      })
    }
  }
  /**
   * @description 创建订单
   */
  crateOrderFn = async () => {
    this.delSelectArr()
    let { product_array, shipping } = this.props
    let {
      voucher_code,
      date,
      anonymous
    } = this.state
    if ( date === '请选择配送时间') {
      Taro.showToast({
        message: '请选择配送时间'
      })
    }
    let anonymous_status = anonymous ? 1 : 0
    product_array = product_array.map(info => {
      let { count, item_id } = info
      return { count, item_id  }
    })
    let { errorCode, data } = await createOrder({
      product_array,
      voucher_code,
      shipping_id: shipping.id,
      delivery_timestamp: date,
      anonymous_status
    })
    if (errorCode === 0) {
      console.log('12312', data)
      // Taro.navigateTo({
      //   url: '/pages/order-result/index'
      // })
      this.toPay(data)
    }
  }
  async toPay(data) {
    let res = await  createOrderPayInfo({order_id: data.order_sn, ...data})
    console.log('res', res)
  }
  /**
   * @desc 删除购物车
   */
  delSelectArr = async () => {
    let { selected } = this.props
    if (selected.length === 0) return false
    selected = selected.map(item => item.item_id)
    let { errorCode } = await removeFromCart(selected)
    if(errorCode === 0) {
      this.props.update({key: '', val: []})
    }
  }
  render() {
    let {
      backHistory,
      switchChange,
      dateChange,
      crateOrderFn
    } = this
    let {
      product_array: list
    } = this.props
    
    let {
      date,
      priceInfo,
      anonymous
    } = this.state
    // TODO: 价格参数报错
    // TODO: 补充一个结果页， 直接跳转
    return (<View className='ConfirmOrderWrap'>
      <CustomNavBar
        title='确认订单'
        clickLeft={backHistory}
      />
      <View className='ConfirmOrderContentWrap'>
        {/* <Address title='添加收获地址' /> */}
        
        { this.getAddr() }
        <PickerDate change={dateChange} />
        <ItemWrap
          title='配送时间'
          subTitle={date}
        />
        <View className='ProductList'>
          { list.map((info, key) => (<ProductCard key={key} info={info} />)) }
        </View>
        <UseCoupon />
        <ItemWrap
          title='祝福卡类型'
          subTitle='钢铁直男型'
        />
        <Switch
          title='匿名送达'
          checked={anonymous}
          change={switchChange}
        />
        <PriceDetail info={priceInfo} />
      </View>
      <Footer info={priceInfo} submit={crateOrderFn} />
    </View>)
  }
}

export default connect(
  state => {
    return state.shoppingCart
  },
  { setShipping, update }
)(ConfirmOrder)
