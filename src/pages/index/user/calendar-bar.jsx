import React, { Component } from  'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'
/**
 * @desc 用户信息
 */
class CanlendarBar extends Component{
  state = {
    list: [
      {
        label: '收花日历',
        icon: 'calendar',
        path: '/pages/calendar/index'
      },
      {
        label: '近期福利',
        icon: 'shopping-bag',
        path: ''
      }
    ]
  }
  getCard = () => {
    let { list } = this.state
    let { jumpToCalendar } = this
    return list.map((item, key) => {
      return <View key={key} className='calendarCard' onClick={() => jumpToCalendar(item.path)}>
        <AtIcon value={item.icon} className='cardIcon' />
        <Text>{item.label}</Text>
      </View>
    })
  }
  /**
   * @desc 跳转到日历页面
   */
  jumpToCalendar = url => {
    Taro.navigateTo({
      url
    })
  }
  render() {
    
    return(<View className='myCalendarBar'>
     { this.getCard() }
    </View>)
  }
}

export default CanlendarBar