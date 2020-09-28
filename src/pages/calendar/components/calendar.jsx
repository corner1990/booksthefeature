import React from 'react'
import { View } from '@tarojs/components'
import { AtCalendar } from 'taro-ui'

import './index.scss'

const CalendarComponent = () => {
  return (<View className='CalendarComponent'>
    <View className='BgCount'>9</View>
    <AtCalendar
      marks={[]}
    />
  </View>)
}

export default CalendarComponent