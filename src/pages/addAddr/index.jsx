import React, { Component } from 'react'
import { View, Text, Picker, Switch } from '@tarojs/components'
import { AtInput, AtTextarea, AtSwitch, AtList, AtListItem } from 'taro-ui';
import CustomNavBar from '../../components/navbar'
import Address from '../../components/address'
import './index.scss';
/**
 * @desc 选择地址
 */
class AddAddr extends Component {
  state = {
    name: '',
    addr: '',
    isDefault: false,
    selector: ['美国', '中国', '巴西', '日本'],
    selectorChecked: '美国'
  }
  nameChange = (...args) => {
    console.log('123', args)
  }
  /**
   * @desc 返回
   */
  backHistory = () => {}
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }
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
        {/* <AtSwitch title='开启中' checked={this.state.isDefault} onChange={nameChange} /> */}
        <Switch type='switch' color='#00B799'></Switch>
      </View>

    </View>)
  }
}

export default AddAddr