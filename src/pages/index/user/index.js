import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import { setTab, getUseInfo } from '../../../store/actions/global'
import UserInfo from './component/user-info'
import CalendarBar from './component/calendar-bar'
import OrdersCard from  './component/order-card'

import './index.scss'

// import { getOrderCount } from './api'

const mapState = state => state.global

class Index extends Component {

  state = {
  }

  componentWillMount() {
    let { getUseInfo } = this.props
    getUseInfo()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { 
    
  }

  componentDidHide() { }

  toEndorsement = () => {
    this.props.setTab(3)
  }
  
  handleToast=()=>{
    // this.setState({ isOpened:true })
  }
  
  render() {


    return (
      <View className='my-center'>
        <CustomNavBar title='AS Flower Boutique' bgColor='#fff' />
        <UserInfo />
        <CalendarBar />
        <OrdersCard />
      </View>
    )
  }
}

export default connect(mapState, { setTab, getUseInfo })(Index)