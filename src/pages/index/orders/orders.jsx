import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import { setTab } from '../../../store/actions/global'
import FilterBar from './filter-bar'
import OrderCard from './order-card'

import './index.scss'

const mapState = state => state.global

class Index extends Component {

  state = {
  }

  componentWillMount() { }

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