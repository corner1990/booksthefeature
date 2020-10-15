import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import { setTab } from '../../../store/actions/global'
import FilterBar from './components/filter-bar'
import OrderCard from './components/order-card'
import { getOrderList } from './api'

import './components/index.scss'

const mapState = state => state.global

class Index extends Component {

  state = {
    list: [],
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
    let { errorCode, data } = await getOrderList({...this.state.pageInfo})
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.order_list : [...this.state.list, data.order_list]
    }
    this.setState({
      list,
      pageInfo
    })
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
      console.log('key', key, info)
      switch(key){
        
        case 'toPay': // 去支付
          this.changePayVisiable = true
          break;
        case 'cancel': // 关闭订单
          // this.cancel()
          break;
        case 'delorder': // 关闭订单
          // this.delOrder()
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
          // this.driver()
          break;
        case 'refound': // 退款
          // this.refound()
          break;
      }
        
    }
  render() {

    return (
      <View className='myOrders'>
        <CustomNavBar
          title='我的订单'
          clickLeft={this.backHistory}
        />
        <FilterBar />
        <View className='OrderList'>
          {
            this.getCard()
          }
        </View>
      </View>
    )
  }
}

export default connect(mapState, { setTab })(Index)