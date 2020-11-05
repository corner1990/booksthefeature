import React from 'react'
import { Picker, View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

import './index.scss'
/**
 * @desc 日期选择器
 */
const TimePicker = props => {
  let {
    change = () => {},
    list = []
  } = props
  const timeChange = date => {
    change(date)
  }
  return(<View className='DatePickerWRap'>
    <Picker range={list} onChange={timeChange}>
        <AtList>
          <AtListItem title='请选择日期'  />
        </AtList>
      </Picker>
  </View>)
}

export default TimePicker
