import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import './index.scss'

const mapState = state => state.shoppingCart;
/**
 * @desc 底部
 */
class CustomTab extends Component {
 
  render() {
   
    let {
      tabs = [
        {
          text: '包月鲜花',
          value: 1
        },
        {
          text: '礼品鲜花',
          value: 2
        }
      ],
      active = 1,
      update = () => {}
    } = this.props
    return (<View className='CustomTab'>
      <View class='TabHead'>
        {
          tabs.map(tab => {
            return(<View
              key={tab.value}
              className={['HeadItem', (active === tab.value ? 'active' : '')]}
              onClick={() => update(tab.value)}
            >{tab.text}</View>)
          })
        }
      </View>
    </View>)
  }
}

export default connect(mapState)(CustomTab)
