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
        key: 1,
      },
      {
        label: '礼品花束',
        key: 2
      }
    ],
    active: 1
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
  setActive = active => {
    this.setState({ active })
    this.props.update({
      filterActive: active,
      pageInfo: {
        index: 0,
        has_more: true
      }
    })

    this.props.loadinfo()
  }
  render() {
    let { getTabHeader } = this
    console.log('render', this.props)
    return (
      <View className='orderFlowerHeaderWrap'>
        <View className='tabWrap'>
          <View className='tabHead'>
            { getTabHeader() }
          </View>
          <View className='tabContent'>
            等待设计出图
          </View>
        </View>
      </View>
    )
  }

}

export default connect(mapState)(Header)
