import React from 'react'
import { View } from '@tarojs/components'
// import { AtCalendar } from 'taro-ui'
import AtCalendar from '../../../components/calendar'

import './index.scss'
import { useState } from 'react'

const CalendarComponent = props => {
  let { setDate } = props
  let m = (new Date().getMonth() + 1)
  let [ month, setMonth ] = useState(m)
  /**
   * @desc 日期变换
   * @param {*} date 
   */
  const dateChange = date => {
    let month = parseInt(date.split('-')[1])
    setMonth(month)
    setDate(date)
  }
  const dayClick = info => {
    console.log('info', info)
  }
  const marks = [
    {
      value: '2020/10/10'
    },
  ]
  return (<View className='CalendarComponent'>
    <View className='BgCount'>{month}</View>
    <AtCalendar
      hideArrow
      format='YYYY-MM-DD'
      marks={marks}
      onDayClick={dayClick}
      onMonthChange={dateChange}
    />
  </View>)
}

export default CalendarComponent