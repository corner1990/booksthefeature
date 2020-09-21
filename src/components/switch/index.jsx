import React from 'react'
import { View } from '@tarojs/components'
import { AtSwitch } from 'taro-ui'

import './index.scss'

const Switch = props => {
  let { 
    title = 'switch',
    change = (...args) => {
      console.log('arguments', args)
    }
   } = props
  return (<View className='SwitchWrap'>
  <View class='SwitchWrapTitle'>{title}</View>
  <AtSwitch
    type='switch'
    color='#00B799'
    onChange={change}
  ></AtSwitch>
</View>)
}
export default Switch