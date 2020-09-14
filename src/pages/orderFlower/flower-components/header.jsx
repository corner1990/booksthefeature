import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'

import './header.scss'

const mapState = state => state.global
/**
 * @desc 头部
 */
class Header extends Component {
  state = {
    tabs: [
      {
        label: '包月鲜花',
        key: 0,
      },
      {
        label: '礼品花束',
        key: 1
      }
    ],
    active: 0
  }
  /**
   * @desc 处理tabContent
   */
  getTabHeader = () => {
    let { active, tabs } = this.state
    let { setActive } = this
    return (tabs.map(item => (
          <View
            className={['tabHeadItem', (active === item.key ? 'active' : '')]}
            onClick={() => {setActive(item.key)}}
            key={item.key}
          >
            {item.label}
          </View>
        ))
    )
  }
  getTabContentItem = () => {
    let contents = [
      {
        label: '配送区域',
        subLabel: '送花去哪',
        key: 1,
        status: -1
      },
      {
        label: '配送星期',
        subLabel: '周几收花',
        key: 2,
        status: -1
      }
    ]
    let other = [
      {
        label: '产品',
        subLabel: '选择品种',
        key: 3,
        status: -1
      },
      {
        label: '订花周期',
        subLabel: '订几个月',
        key: 4,
        status: -1
      }
    ]
    let { active } = this.state
    if (active == 0) {
      contents = [...contents, ...other]
    }
    return (contents.map(item => (
      <View
        className='tabContentItem'
        key={item.key}
        onClick={() => this.showOption(item.key)}
      >
        <View className='tabContentItemTitle'>{item.label}</View>
        <View className='tabContentItemSubTitle'>{ item.subLabel }</View>
      </View>
    )))
  }
  /**
   * @desc 显示对应的操作弹框
   * @param { number } key 
   */
  showOption = key => {
    let { update } = this.props
    let options= {
      1: 'showSelectArea'
    }
    let optionKey = options[key]
    if (optionKey) {
      update(optionKey, true)
    }
  }
  /**
   * @desc 设置tab active
   * @param { number } active 
   */
  setActive = active => this.setState({ active })
  render() {
    let { getTabHeader, getTabContentItem } = this
    return (
      <View className='orderFlowerHeaderWrap'>
        <View className='tabWrap'>
          <View className='tabHead'>
            { getTabHeader() }
          </View>
          <View className='tabContent'>
            { getTabContentItem() }
          </View>
        </View>
      </View>
    )
  }

}

export default connect(mapState)(Header)
