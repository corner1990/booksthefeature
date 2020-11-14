import React from 'react'
import { Picker, View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

import './index.scss'
/**
 * @desc 日期选择器
 */
const DatePicker = props => {
  let {
    change = () => {}
  } = props
  const dateChange = date => {
    change(date)
  }
  return(<View className='DatePickerWRap'>
    <Picker mode='date' onChange={dateChange} {...props}>
        <AtList>
          <AtListItem title='请选择日期'  />
        </AtList>
      </Picker>
  </View>)
}

export default DatePicker
