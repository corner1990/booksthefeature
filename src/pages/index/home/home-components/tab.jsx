import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import './index.scss'

/**
 * @desc 促销
 */
class PromotionCard extends Component{
  state = {
    active: 0
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
        icon: 'http://saidad.oss-cn-guangzhou.aliyuncs.com/image/456197f2bda97d4e732f84f8a3928968.png'
      },
      {
        name: '进行中',
        value: 1,
        icon: 'http://saidad.oss-cn-guangzhou.aliyuncs.com/image/9f463119ef1ab76ee1e859e209448648.png'
      },
      {
        name: '审核中',
        value: 2,
        icon: 'http://saidad.oss-cn-guangzhou.aliyuncs.com/image/bcd3c26445864682ec0bf513fabe760b.png'
      },
      {
        name: '已结束',
        value: 3,
        icon: 'check-circle'
      }
    ]
    let { active } = this.state
    return tabs.map((tab, idx) => {
      return <View
        className={['tabbar-item', (tab.value == active ? 'active': '')]}
        onClick={() => this.setActive(tab.value)}
        key={tab.value}
      >
        <View>
          {
            idx > 2 ? <AtIcon value={tab.icon} size='26' color='#00b4fc'></AtIcon> :
            <Image src={tab.icon} mode="aspectFill" style="width: 26px; height: 26px;" />
          }
          
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
