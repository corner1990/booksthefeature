import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import { setTab } from '../../../store/actions/global'
import FilterBar from './filter-bar'
import OrderCard from './order-card'
import { getOrderList } from './api'

import './index.scss'

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
    let { errorCode, data } = await getOrderList({...this.state.pageInfo, order_id: 0})
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.product_list : [...this.state.list, data.product_list]
    }
    this.setState({
      list, pageInfo
    })
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
          <OrderCard />
        </View>
      </View>
    )
  }
}

export default connect(mapState, { setTab })(Index)