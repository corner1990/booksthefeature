import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import './index.scss'

/**
 * @desc 促销
 */
class PromotionCard extends Component{
  state = {
    active: 1
  }
  toDetail = type => {
    Taro.navigateTo({
      url: `/pages/orderFlower/index?type=${type}`
    })
  }
  /**
   * @desc 获取tab iitem
   */
  getTabItem() {
    let tabs = [
      {
        name: '全部',
        value: 0,
        icon: 'bullet-list'
      },
      {
        name: '进行中',
        value: 1,
        icon: 'filter'
      },
      {
        name: '审核中',
        value: 2,
        icon: 'clock'
      },
      {
        name: '已结束',
        value: 3,
        icon: 'check-circle'
      }
    ]
    let { active } = this.state
    return tabs.map(tab => {
      return <View
        className={['tabbar-item', (tab.value == active ? 'active': '')]}
        onClick={() => this.setActive(tab.value)}
        key={tab.value}
      >
        <View>
          <AtIcon value={tab.icon} size='26' color='#00b4fc'></AtIcon>
        </View>
        <View className='tabbar-item-text'>
          {tab.name}
        </View>
      </View>
    })
  }
  setActive = (active) => {
    this.setState({ active })
    this.props.refresh(active)
  }
  render() {
    return (<View className='main-tabbar' >
      {
        this.getTabItem()
      }
    </View>)
  }
}

export default PromotionCard
