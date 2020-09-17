import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
/**
 * @desc 过滤
 */
class FilterBar extends Component{
  state = {
    list: [],
    active: 0
  }
  /**
   * @desc 处理item
   */
  getFitetItem = () => {
    let { list, active } = this.state
    return list.map((item, key) => (
      <View
        className={['OrderFilterBarItem', (active === key ? 'active' : '')]}
        key={key}
        onClick={() => this.setAvtive(key)}
      >
        {item.label}
      </View>
    ))
  }
  setAvtive = active => this.setState({ active })
  getIndexTransform = () => {
    let { active } = this.state
      let startWith = active * 25
      return {
        'transform': `translateX(calc(calc(25vw - 16px) / 2 + ${startWith}vw))`
      }
  }
  render() {
    return (<View className='OrderCard'>
      <View className='OrderCardTime'>
        <View className='OrderTime'>2020.08.31 17:43:21</View>
        <View className='CountDown'>倒计时28分37秒</View>
      </View>
    </View>)
  }
}

export default FilterBar
