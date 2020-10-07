import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import Header from './components/header'
import Calendar from './components/calendar'

import './index.scss'
/**
 * @desc 日历页面
 */
const CalendarWrap = () => {
  /**
   * @desc 返回
   */
  const backHistory = () => Taro.navigateBack()
  return (<View className='CalendarWrap'>
    <CustomNavBar
      title='收花日历'
      clickLeft={backHistory}
    />
    <Header />
    <Calendar />
  </View>)
}

export default CalendarWrap