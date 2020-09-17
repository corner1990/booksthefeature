import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
/**
 * @desc 过滤
 */
class FilterBar extends Component{
  state = {
    list: [
      {
        label: '待支付'
      },
      {
        label: '待发货'
      },
      {
        label: '待收货'
      },
      {
        label: '已完成'
      }
    ],
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
    return (<View className='OrderFilterBar'>
      <View className='OrderFilterBarItemWrap'>
        { this.getFitetItem() }
      </View>
      <View className='indexBar' style={this.getIndexTransform()}></View>
    </View>)
  }
}

export default FilterBar
