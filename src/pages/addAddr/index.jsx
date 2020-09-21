import React, { Component } from 'react'
import { View, Text, Picker, Switch } from '@tarojs/components'
import { AtInput, AtTextarea, AtSwitch, AtButton } from 'taro-ui';
import CustomNavBar from '../../components/navbar'
import Address from '../../components/address'
import './index.scss';
/**
 * @desc 选择地址
 */
class AddAddr extends Component {
  state = {
    name: '',
  }
  nameChange = (...args) => {
    console.log('123', args)
  }
  /**
   * @desc 返回
   */
  backHistory = () => {}
  render() {
    let { backHistory, nameChange } = this
    return (<View className='AddAddr'>
      <CustomNavBar title='添加收获地址' clickLeft={backHistory} />
      <View className='addrInfoWrap'>
        <AtInput
          name='name'
          title='收货人'
          type='text'
          placeholder='请输入收货人'
          value={this.state.name}
          onChange={nameChange}
        />
        <AtInput
          name='phone'
          title='手机号码'
          type='phone'
          placeholder='请输入手机号码'
          value={this.state.name}
          onChange={nameChange}
        />
        <Address />
        <View className='addrAreaWrap'>
          <View className='addrAreaTitle'>详细地址</View>
          <AtTextarea
            name='addr'
            className='addrArea'
            count={false}
            title='详细地址'
            placeholder='请输入地址'
            maxLength={100}
            value={this.state.name}
            onChange={nameChange}
          />
        </View>
        
      </View>
      <View className='setDefault'>
        <View class='setDefaultText'>设为默认地址</View>
        <AtSwitch type='switch' color='#00B799'></AtSwitch>
      </View>
      <View className='subBtnWrap'>
        <AtButton type='primary' className='subBtn'>保存</AtButton>
      </View>
    </View>)
  }
}

export default AddAddr