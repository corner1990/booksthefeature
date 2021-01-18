import React, { Component } from  'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import '../index.scss'
/**
 * @desc 用户信息
 */
class CanlendarBar extends Component{
  state = {
    list: [
      {
        label: '我的计划',
        icon: 'calendar',
        path: '/pages/taskListOwn/index'
        // path: '/pages/calendar/index'
      },
      {
        label: '我的行动历史',
        icon: 'shopping-bag',
        path: '/pages/checkInList/index'
      }
    ]
  }
  getCard = () => {
    let { list } = this.state
    let { jumpToCalendar } = this
    return list.map((item, key) => {
      return <View key={key} className='calendarCard' onClick={() => jumpToCalendar(item.path, key)}>
        <AtIcon value={item.icon} className='cardIcon' />
        <Text>{item.label}</Text>
      </View>
    })
  }
  /**
   * @desc 跳转到日历页面
   */
  jumpToCalendar = (url) => {
    // if (key ) {
    //   Taro.showModal({
    //     title: '提示',
    //     content: '功能正在开发中，敬请期待！',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    //   return false
    // }
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