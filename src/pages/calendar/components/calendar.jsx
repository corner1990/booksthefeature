import React from 'react'
import { View } from '@tarojs/components'
// import { AtCalendar } from 'taro-ui'
import AtCalendar from '../../../components/calendar'

import './index.scss'
import { useState } from 'react'

const CalendarComponent = props => {
  let { setDate, list, update } = props
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
    let { value } = info
    value = value.replace(/\-/g, '/')
    let selected = list.find(item => item.date === value)
    if  (selected) {
      selected = selected.product_list
    } else {
      selected = []
    }
    update({ selected })
  }
  const marks = list.map(info => ({value: info.date, status: info.status}))

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