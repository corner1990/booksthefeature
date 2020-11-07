import React, { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs';
import {
  btnKey,
  btnTexts
} from '../config'
import './index.scss'
/**
 * @desc 过滤
 */
class FilterBar extends Component{
  constructor(props) {
    super(props)
    this.state = {
      countDown: '',
      close_countdown: props.info.close_countdown
    }
    
  }
  componentDidMount() {
    this.countDownFn()
  }
  /**
   * @desc 处理倒计时
   */
  countDownFn = () => {
    let {
      close_countdown
    } = this.state
    let timer =close_countdown
    if (!close_countdown) return false

    if (close_countdown === 0) return false
    let countDown = ''
    if (timer > 3600) {
      let h = Math.floor(timer / 3600)
      timer = timer % 3600
      countDown += `${h}小时`
    } 
    if (timer > 60) {
      let m = Math.floor(timer / 60)
      timer = timer % 60
      countDown += `${m}分`
    }
    countDown += `${timer}秒`
    close_countdown -= 1

    this.setState({
      countDown,
      close_countdown
    })
    
    setTimeout(() => this.countDownFn(), 1000)
  }
  /**
   * @desc ok按钮（右侧按钮点击触发）
   */
  confirm = e => {
    e && e.stopPropagation()
    // this.$emit('submit', actionKey)
    let { info, submit } = this.props
    let actionKey = btnKey[info.order_status][1]
    submit(actionKey, info)
  }
  // 取消按钮（左侧按钮侧点击触发）
  cancel = e => {
    // console.log('e', e)
    e && e.stopPropagation()
    // this.$emit('submit', actionKey)
    let { info, submit } = this.props
    let actionKey = btnKey[info.order_status][0]

    submit(actionKey, info)
  }
  getBtn = () => {
    let { info: { order_status } } = this.props
    let btns = btnTexts[order_status]
    
    if (btns.length ===  2) {
      return (<View className='BtnWrap'>
        <AtButton
          type='secondary'
          size='small'
          onClick={this.cancel}
        >{btns[0]}</AtButton>
        <AtButton
          type='primary'
          size='small'
          onClick={this.confirm}
        >{btns[1]}</AtButton>
      </View>)
    }
    return (<View className='BtnWrap'>
      <AtButton
        type='secondary'
        size='small'
        onClick={this.cancel}
      >{btns[0]}</AtButton>
    </View>)
    
  }
  toDetail = () => {
    let order_sn = this.props.info.order_sn
    let url = `/pages/order-detail/index?order_sn=${order_sn}`
    Taro.navigateTo({ url })
  }
  render() {
    let { info } = this.props
    // this.showLeft()
    
    let product = info.product_list[0] || {
      main_image: '',
      product_name: '',
      format_product_price: '',
      count: 0,
      format_pay_price: '0.00'
    }
    let create = new Date(info.created_timestamp*1000)
    let str = dayjs(create).format('YYYY-MM-DD HH:mm:ss')
    return (<View className='OrderCard' onClick={this.toDetail}>
      <View className='OrderCardTime'>
        <View className='OrderTime'>{str}</View>
        <View className='CountDown'>{this.state.countDown}</View>
      </View>
      <View className='ProductInfoWrap'>
        <Image
          src={product.main_image}
          className='ProductImg'
          mode='aspectFit'
        />
        <View className='ProductInfo'>
          <View className='ProductName'>{product.product_name}</View>
          <View className='ProductSkuWrap'>
            <Text className='ProductPrice'>¥{product.format_product_price}</Text>
            <Text className='ProductCount'>x{product.count}</Text>
          </View>
        </View>
      </View>
      <View className='ProductOperationWrap'>
      <View className='ProductSkuText'>共{info.total_product_count}件商品，共计 ¥{info.format_pay_price}</View>
      { this.getBtn() }
      </View>
    </View>)
  }
}

export default FilterBar
