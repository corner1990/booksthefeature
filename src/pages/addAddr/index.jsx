import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtSwitch, AtButton, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import Address from '../../components/address'
import { addShippingAddress } from '../address/api'
import './index.scss';
/**
 * @desc 选择地址
 */
class AddAddr extends Component {
  state = {
    receiver: '',
    addrs: [],
    address: '',
    phone: '',
    is_default: true
  }
 
  /**
   * @desc 收货人
   * @param {object} e event对象那
   */
  receiverChange = receiver => {
    this.setState({ receiver })
  }
  /**
   * @desc 手机号
   * @param {string} phone event对象那
   */
  phoneChange = phone => {
    this.setState({ phone })
  }
  /**
   * @desc 手机号
   * @param {string } address event对象那
   */
  addressChange = address => {
    this.setState({
      address
    })
  }
  /**
   * @desc 返回
   */
  backHistory = () => {}
  /**
   * @desc 地址切换
   * @param { string } addr 地址字符串
   */
  addrChange = addrs => {
    
    this.setState({
      addrs
    })
  }
  /**
   * @desc 验证参数
   */
  vertifyAddress = () => {
    let {
      receiver,
      addrs,
      address,
      phone,
      is_default
    } = this.state
    phone = phone.trim()
    if (!receiver) {
      return Taro.showToast({
        icon: 'none',
        title: '请请输入收货人姓名'
      })
    }
    if(!/^1(3|4|5|7|8)[0-9]{9}$$/.test(phone)){
      return Taro.showToast({
        icon: 'none',
        title: '请输入正确的手机号码'
      })
    }
   
    if (!addrs.length) {
      return Taro.showToast({
        icon: 'none',
        title: '请选择收货地址'
      })
    }
    if (!address) {
      return Taro.showToast({
        icon: 'none',
        title: '请输入详细地址'
      })
    }
    is_default = is_default ? 1 : 0
    let [ province, city, area ] = addrs
    
    let params = {
      address,
      phone,
      receiver,
      is_default,
      province,
      city,
      area
    }
    this.saveAddress(params)
  }
  /**
   * @desc 向服务器保存地址
   * @param {object} params 新增地址信息
   */
  saveAddress = async params => {
    let { errorCode, data } = await addShippingAddress(params)
    if (errorCode === 0) {
      // 返回页面 
      Taro.navigateBack()
    }
  }
  /**
   * @desc 切换是否为默认
   * @param {*} e 
   */
  changeIsDefault = is_default => {
    this.setState({ is_default })
  }
  render() {
    let {
      backHistory,
      receiverChange,
      phoneChange,
      addrChange,
      addressChange,
      vertifyAddress,
      changeIsDefault
    } = this
    return (<View className='AddAddr'>
      <CustomNavBar title='添加收获地址' clickLeft={backHistory} />
      <View className='addrInfoWrap'>
        <AtInput
          name='name'
          title='收货人'
          type='text'
          placeholder='请输入收货人'
          value={this.state.receiver}
          onChange={receiverChange}
        />
        <AtInput
          name='phone'
          title='手机号码'
          type='phone'
          placeholder='请输入手机号码'
          value={this.state.phone}
          onChange={phoneChange}
        />
        <Address change={addrChange} />
        <AtInput
          name='addr'
          title='所在地区'
          type='text'
          readOnly
          placeholder='请选择地区'
          value={this.state.addrs.join(' ')}
        >
          <AtIcon value='chevron-right' size='24' color='#D8D8D8'></AtIcon>
        </AtInput>
        <View className='addrAreaWrap'>
          <View className='addrAreaTitle'>详细地址</View>
          <AtTextarea
            name='addr'
            className='addrArea'
            count={false}
            title='详细地址'
            placeholder='请输入地址'
            maxLength={100}
            value={this.state.address}
            onChange={addressChange}
          />
        </View>
        
      </View>
      <View className='setDefault'>
        <View class='setDefaultText'>设为默认地址</View>
        <AtSwitch
          type='switch'
          color='#00B799'
          onChange={changeIsDefault}
          checked={this.state.is_default}
        ></AtSwitch>
      </View>
      <View className='subBtnWrap'>
        <AtButton type='primary' className='subBtn' onClick={vertifyAddress} >保存</AtButton>
      </View>
    </View>)
  }
}

export default AddAddr