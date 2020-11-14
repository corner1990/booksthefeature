import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { AtTextarea } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import ItemWrap from './components/item-card'
// import Address from '../../components/address'
import AddressCard from './components/address-card'
import PickerDate from '../../components/picker-date'
import PickerTime from '../../components/picker-time'
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
import { dateFormat } from '../../utils/utils'

/**
 * @desc 确认订单
 */
class ConfirmOrder extends React.Component {
  state = {
    date: '请选择配送日期',
    priceInfo: {
      discount_price: '',
      pay_price: '',
      product_total_price: '',
      shipping_price: ''
    },
    anonymous: false,
    bless: '',
    voucher_code: '',
    delivery_time_range: '请选择配送时间',
    timeList: []
  }
  componentDidMount() {

    this.loadAddress()
    this.calculatePrice()
  }
  timer = 0
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
   * @desc 时间变化
   * @param {string} date 
   */
  timeChange = (time) => {
    let { value } = time.detail
    let {  timeList } = this.state

    this.setState({
      delivery_time_range: timeList[value]
    })
  }
  /**
   * 
   */
  loadAddress = async () => {
    let { errorCode, data: { shipping_address_list:list=[]  }} = await getShippingAddressList()
    
    if (errorCode === 0) { 
      let addr = list.find(item => item.is_default === '1') || list[0]
      if (addr) this.props.setShipping(addr)
    }
  }
  /**
   * @desc 处理地址
   */
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
        priceInfo: data,
        timeList: data.delivery_time_range_list
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
      anonymous,
      bless,
      delivery_time_range
    } = this.state
    if ( !shipping || !shipping.id) {
      Taro.showToast({
        icon: 'none',
        title: '请选择收获地址'
      })

      return false
    }
    if (date.includes('日期')) {
      Taro.showToast({
        icon: 'none',
        title: '请选择配送日期'
      })

      return false
    }
    if (delivery_time_range.includes('时间')) {
      Taro.showToast({
        icon: 'none',
        title: '请选择配送时间'
      })

      return false
    }
    if (this.execDate(date, delivery_time_range)) {
      Taro.showToast({
        icon: 'none',
        title: '送达时间不能早于下单时间'
      })

      return false
    }
    

    let anonymous_status = anonymous ? 1 : 0
    product_array = product_array.map(info => {
      let { count, item_id } = info
      return { count, item_id  }
    })
    
    date = this.getDate(date, delivery_time_range)

    let params = {
      product_array,
      voucher_code,
      shipping_id: shipping.id,
      delivery_timestamp: date,
      bless,
      anonymous_status,
      delivery_time_range
    }
   
    let { errorCode, data } = await createOrder(params)
    if (errorCode === 0) {
      this.toPay(data)
    }
  }

  async toPay(params) {
    let url = `/pages/order-result/index?order_sn=${params.order_sn}`
  
    let { errorCode, data} = await  createOrderPayInfo({order_id: params.order_sn, 'pay_type': 5, ...params})
    if (errorCode === 0) {
      Taro.requestPayment({
        ...data,
        signType: 'MD5',
        success () {
          url = `${url}&pay_status=1`
          Taro.navigateTo({ url })
        },
        fail () {
          url = `${url}&pay_status=0`
          Taro.navigateTo({ url })
        }
      })
    }
    
  }
  /**
   * @desc 判断送货时间是否小于下单时间
   * @param {*} date 
   * @param {*} timeStr 
   */
  execDate(date, timeStr) {
    let time = new Date(date + ' ' + timeStr.split('-')[1]).getTime()
    let current = new Date().getTime()
    return current > time
  }
  /**
   * @desc 处理日期
   * @param {*} date 
   * @param {*} timeStr 
   */
  getDate = (date, timeStr) => {
    let time = new Date(date + ' ' + timeStr.split('-')[1])
    let timeOrigin = new Date(date)
    // 设置时间为18:00
    let deathLine = new Date()
    deathLine.setHours(18)
    deathLine.setMinutes(0)
    deathLine.setSeconds(0)
    deathLine.setMilliseconds(0)

    let deathLineTime = deathLine.getTime()
    let timer = time.getTime()
    let today = new Date(new Date().toLocaleDateString())
    let day = 86400000 * 2
    // 如果货时间选择的后天 不需要修改时间
    if (today.getTime + day === timeOrigin.getTime) {
      console.log('正常发货')
      return date
    } 
    // 松后时间是当前18点之前  顺延一天
    let d = 0
    if (timer > deathLineTime) {
      // 如果son过时间是今天， 
      d = 1
    }
    time = time.setDate(time.getDate() + d)
    
    let res = dateFormat(time, 'YYYYmmdd')
    return res
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
  /**
   * @desc 设置优惠码
   * @param {*} voucher_code 
   */
  setConpon = voucher_code => {
    this.setState({ voucher_code })
    clearTimeout(this.timer)
    this.timer = setTimeout( this.calculatePrice, 800)
    // this.calculatePrice()
  }
  blessChange = bless => {
    this.setState({ bless })
  }
  render() {
    let {
      backHistory,
      switchChange,
      dateChange,
      timeChange,
      crateOrderFn,
      setConpon
    } = this
    let {
      product_array: list
    } = this.props
    
    let {
      date,
      priceInfo,
      anonymous,
      voucher_code,
      delivery_time_range,
      timeList
    } = this.state
    let start = new Date()
    start = start.setDate(start.getDate() + 1)
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
        <PickerDate change={dateChange} start={dateFormat(start, 'YYYY-mm-dd')} value={start} />
        <ItemWrap
          title='配送日期'
          subTitle={date}
        />
        <PickerTime change={timeChange} list={timeList} />
        <ItemWrap
          title='配送时间'
          subTitle={delivery_time_range}
        />
        <View className='ProductList'>
          { list.map((info, key) => (<ProductCard key={key} info={info} />)) }
        </View>
        <UseCoupon setConpon={setConpon} coupon={voucher_code} />
        <View className='BlessCard'>
          <View className='BlessTitle'>祝福卡</View>
          <AtTextarea
            className='BlessTextarea'
            maxLength={50}
            count={false}
            value={this.state.bless}
            onChange={this.blessChange}
            placeholder='给ta说点什么把！'
          />
        </View>
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
