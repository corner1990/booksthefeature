import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
/**
 * @desc 过滤
 */
class FilterBar extends Component{
  state = {
    // //0.全部 1.待付款2.待发货3.待收货4.已完成
    list: [
      {
        label: '全部',
      },
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
    ]
  }
  /**
   * @desc 处理item
   */
  getFitetItem = () => {
    let { list } = this.state
    let { active } = this.props
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
  setAvtive = active => {
    this.props.update({active})
    // this.setState({ active })
  }
  getIndexTransform = () => {
    let { active = 0 } = this.props
      let startWith = active  * 20
      return {
        'transform': `translateX(calc(calc(20vw - 16px) / 2 + ${startWith}vw))`
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
