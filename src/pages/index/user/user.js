import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import { setTab } from '../../../store/actions/global'
import UserInfo from './user-info'
import CalendarBar from './calendar-bar'
import OrdersCard from  './order-card'

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

  render() {


    return (
      <View className='my-center'>
        <CustomNavBar title='FLOWERPLUS 花加' bgColor='#fff' />
        <UserInfo />
        <CalendarBar />
        <OrdersCard />
      </View>
    )
  }
}

export default connect(mapState, { setTab })(Index)