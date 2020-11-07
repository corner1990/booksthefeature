import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import { setTab, globaleUpdate } from '../../../store/actions/global'
import FilterBar from './components/filter-bar'
import OrderCard from './components/order-card'
import { getOrderList, cancelOrder, deleteOrder } from './api'
import { setProductArray } from '../../../store/actions/shopping-cart'

import './components/index.scss'
import { createOrderPayInfo } from '../../confirm-order/api'

const mapState = state => state.global

class Index extends Component {

  state = {
    list: [],
    active: 0,
    pageInfo: {
      index: 0,
      has_more: true
    }
  }

  componentWillMount() {
    this.loadInfo()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  toEndorsement = () => {
    this.props.setTab(3)
  }

  handleToast=()=>{
    // this.setState({ isOpened:true })
  }
  /**
   * @desc 返回上一页
   */
  backHistory = () => this.props.setTab(2)
  /**
   * @desc 加载数据
   */
  loadInfo = async ()=> {
    let list = []
    let pageInfo = {}
    let { order_type } = this.props
    let { errorCode, data } = await getOrderList({...this.state.pageInfo, order_type})
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.order_list : [...this.state.list, data.order_list]
      pageInfo = data.page_info
    }
    this.setState({
      list,
      pageInfo
    })
  }
  /**
   * @desc 下单
   * @param {*} info 
   */
  
  async toPay(params) {
    let url = `/pages/order-result/index?order_sn=${params.order_sn}`
    let { errorCode, data} = await  createOrderPayInfo({order_sn: params.order_sn, 'pay_type': 5, pay_price: params.pay_price})
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
   * @desc 获取卡片
   */
  getCard = () => {
    let { list } = this.state
    if (list.length === 0) return []
    return list.map((info, key) => (<OrderCard info={info} key={key} submit={this.submit} />))
  }
  /**
   * @desc 调用方法
   */
  submit = (key, info) => {
    switch(key){
      
      case 'toPay': // 去支付
        this.toPay(info)
        break;
      case 'cancel': // 关闭订单
        this.askCancel(info)
        break;
      case 'delorder': // 关闭订单
        this.askDelete(info)
        break;
      case 'confirm': // 确认收货
        // this.confirm()
        break;
      case 'evaluation': // 确认收货
        // this.evaluation()
        break;
      case 'logistics': // 查看物流信息
        // this.viewLosistics()
        break;
      case 'seeEvaluation': // 查看查看评价
        // this.seeEvaluation()
        break;
      case 'driver': // 催发货
        this.driver()
        break;
      case 'refound': // 退款
        // this.refound()
        break;
    }
      
  }
  /**
   * @desc 更新数据
   * @param {*} params 
   */
  setActive = params => {
    this.props.globaleUpdate({  order_type: params.active })
    this.setState({
      ...params,
      pageInfo: {
        index: 0,
        has_more: true
      }
    })
    this.loadInfo()
  }
  askCancel = info => {
    let self = this
    Taro.showModal({
      title: '提示',
      content: '你确定要取消该订单么？',
      success: function (res) {
        if (res.confirm) {
          self.cancel(info)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  /**
   * @desc 关闭订单
   * @param {*} info 
   */
  cancel = async info => {
    let { order_sn } = info
    let { errorCode } = await cancelOrder({ order_sn })
    if(errorCode === 0) {
      let list = this.state.list.map(item => {
        if (item.order_sn !== info.order_sn) return item
        return {
          ...item,
          order_status: 50
        }
      })
      this.setState({ list })
    }

  }
  askDelete = info => {
    let self = this
    Taro.showModal({
      title: '提示',
      content: '你确定要删除该订单么？',
      success: function (res) {
        if (res.confirm) {
          self.delete(info)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  /**
   * @desc 关闭订单
   * @param {*} info 
   */
  delete = async info => {
    let { order_sn } = info
    let { errorCode } = await deleteOrder({ order_sn })
    if(errorCode === 0) {
      let list = this.state.list.filter(item => item.order_sn !== info.order_sn)
      this.setState({ list })
    }

  }
  /**
   * @des  催发货
   * @param {*} info 
   */
  driver = () => {
    Taro.showModal({
      title: '提示',
      content: '已经通知老板尽快发货！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  render() {

    return (
      <View className='myOrders'>
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.loadInfo}
          style={{ height: "100%" }}
        >
        <CustomNavBar
          title='我的订单'
          clickLeft={this.backHistory}
        />
          <FilterBar active={this.state.active} update={this.setActive} />
          <View className='OrderList'>
            {
              this.getCard()
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapState, { setTab, setProductArray, globaleUpdate })(Index)