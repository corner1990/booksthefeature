import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import Header from './flower-components/header'
import FilterBar from './flower-components/filterBar'


import './index.scss'

const mapState = state => state.global
/**
 * @desc 订花
 */
class OrderFlower extends Component {
  state = {
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    console.log('headComponent', Header)
    return (
      <View className='orderFlowerWrap'>
        <CustomNavBar title='订花' />
        <Header />
        <FilterBar />
      </View>
    )
  }
}

export default connect(mapState)(OrderFlower)
