import React, { Component } from  'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
/**
 * @desc 用户信息
 */
class CanlendarBar extends Component{
  state = {
    list: [
      {
        label: '收花日历',
        icon: 'calendar'
      },
      {
        label: '近期福利',
        icon: 'shopping-bag'
      }
    ]
  }
  getCard = () => {
    let { list } = this.state
    return list.map((item, key) => {
      return <View key={key} className='calendarCard'>
        <AtIcon value={item.icon} className='cardIcon' />
        <Text>{item.label}</Text>
      </View>
    })
  }
  render() {
    
    return(<View className='myCalendarBar'>
     { this.getCard() }
    </View>)
  }
}

export default CanlendarBar