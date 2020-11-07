import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import ListView from "taro-listview"
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
import None from '../../components/none'

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
  shouldComponentUpdate(props) {
    console.log('shouldComponentUpdate', props, this)
    return true
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
      if (!data.page_info) {
        this.props.updateAddrList({pageInfo: {
          index: 0,
          has_more: false
        },
        list: []
      })
        return false
      }
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
    if (list.length <= 0) {
      return (<None text='请添加收货地址' style={{paddingTop: 100}} />)
    }
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
      this.loadInfo()
    }
  }
  render() {
    let {
      backHistory,
      getAddressCard
    } = this
    return (<View className='UserAddressWrap'>
      <CustomNavBar
        title='收货地址'
        clickLeft={backHistory}
      />
      <ScrollView
        scrollY
        scrollWithAnimation
        onScrollToLower={this.loadInfo}
        style={{ height: "100%" }}
      >
        <View className='AddressList'>
          { getAddressCard() }
        </View>
      </ScrollView>

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