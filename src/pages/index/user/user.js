import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import { setTab } from '../../../store/actions/global'

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
      <View className='my'>
        <CustomNavBar title='我的' />
        
      </View>
    )
  }
}

export default connect(mapState, { setTab })(Index)