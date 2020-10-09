import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ListView from "taro-listview"
import CustomNavBar from '../../components/navbar'
import AddressCard from './components/address-card'
import AddBtn from './components/add-button'

import './index.scss'
import { getShippingAddressList } from './api'
/**
 * @desc 地址列表
 */
class UserAddress extends Component {
  state = {
    list: [],
    pageInfo: {
      index: 0,
      has_more: true
    }
  }
  componentDidMount() {
    this.loadInfo()
  }
  /**
   * @desc 返回
   */
  backHistory = () => Taro.navigateBack()
  /**
   * @desc 加载数据
   */
  loadInfo = async () => {
    let list = []
    let pageInfo = {}
    let { errorCode, data } = await getShippingAddressList()

    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.shipping_address_list : [...this.state.list, data.shipping_address_list]
    }
    this.setState({
      list, pageInfo
    })
  }
  /**
   * @desc 渲染列表信息
   */
  getAddressCard = () => {
    let { list } = this.state
    return list.map((info, key) => (<AddressCard info={info} key={key} />))
  }
  render() {
    let {
      backHistory,
      getAddressCard
    } = this
    let { pageInfo } = this.state
    return (<View className='UserAddressWrap'>
      <CustomNavBar
        title='收货地址'
        clickLeft={backHistory}
      />
      <ListView
        hasMore={pageInfo.has_more}
        onScrollToLower={this.loadInfo}
        className='AddressListView'
        autoHeight
      >
        <View className='AddressList'>
          
          { getAddressCard() }
        </View>
      </ListView>
      <AddBtn />
    </View>)
  }
  
}

export default UserAddress