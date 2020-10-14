import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ListView from "taro-listview"
import { connect } from 'react-redux'
import { AtModal } from 'taro-ui'
import CustomNavBar from '../../components/navbar'
import AddressCard from './components/address-card'
import AddBtn from './components/add-button'
import {
  setEditAddrInfo,
  updateAddrList
} from '../../store/actions/addr'

import './index.scss'
import { getShippingAddressList, deleteShippingAddress } from './api'

/**
 * @desc 合并参数
 * @param {*} state 
 */
const mapState = state => state.address
/**
 * @desc 地址列表
 */
class UserAddress extends Component {
  state = {
    showDel: false,
    delInfo: null
  }
  componentDidMount() {
    if (this.props.pageInfo.index === 0) {
      this.loadInfo()
    }
    
  }
  /**
   * @desc 更新数据
   * @param {*} key 
   * @param {*} val 
   */
  update = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  /**
   * @desc 返回
   */
  backHistory = () => Taro.navigateBack()
  /**
   * @desc 加载数据
   */
  loadInfo = async () => {
    let {list, pageInfo} = this.props
    let { errorCode, data } = await getShippingAddressList(pageInfo)

    if (errorCode === 0) {
      list =  [...list, ...data.shipping_address_list]
      pageInfo = data.page_info
    }
    this.props.updateAddrList({pageInfo, list})
  }
  /**
   * @desc 渲染列表信息
   */
  getAddressCard = () => {
    // let { list } = this.state
    let { list } = this.props
    return list.map((info, key) => (<AddressCard
      info={info}
      key={key}
      setInfo={this.props.setEditAddrInfo}
      update={this.update}
    />))
  }
  handleClose = () => {
    this.setState({
      showDel: false
    })
  }
  /**
   * @desc 删除地址
   */
  handleConfirm = async () => {
    let { delInfo } = this.state
    let { list } = this.props
    let { id } = delInfo
    let { errorCode } = await deleteShippingAddress({id})
    if (errorCode === 0) {
      // 更新数据
      list = list.filter(item => item.id !== id)
      this.props.updateAddrList({list})
      this.setState({
        showDel: false,
        delInfo: null
      })
    }
  }
  render() {
    let {
      backHistory,
      getAddressCard
    } = this
    let { pageInfo } = this.props
    return (<View className='UserAddressWrap'>
      <CustomNavBar
        title='收货地址'
        clickLeft={backHistory}
      />
      <ListView
        hasMore={pageInfo.has_more}
        onScrollToLower={this.loadInfo}
        className='AddressListView'
      >
        <View className='AddressList'>
          { getAddressCard() }
        </View>
      </ListView>
      <AddBtn />
      <AtModal
        isOpened={this.state.showDel}
        title='删除地址'
        cancelText='取消'
        confirmText='确认'
        onClose={ this.handleClose }
        onCancel={ this.handleClose }
        onConfirm={ this.handleConfirm }
        content='您确定要删除这条收货地址么？'
      />
    </View>)
  }
  
}

export default connect(mapState, {
  setEditAddrInfo,
  updateAddrList
})(UserAddress)