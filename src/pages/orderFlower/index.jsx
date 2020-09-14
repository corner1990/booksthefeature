import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { connect } from 'react-redux'
import Backhistory from '../../components/backhistory'
import Header from './flower-components/header'
import FilterBar from './flower-components/filterBar'
import FlowerList from '../index/home/home-components/newProductList'
import SelectArea from './flower-components/selectArea'


import './index.scss'

const mapState = state => state.global
/**
 * @desc 订花
 */
class OrderFlower extends Component {
  state = {
    filterActive: 0,
    priceSort: 0,
    showSelectArea: true
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  /**
   * @desc 更新数据
   * @param { string } key 需要更新的属性key
   * @param { any } val 任何值
   */
  update = (key, val) => {
    this.setState({ [key]: val })
  }
  render () {
    let { filterActive, priceSort, showSelectArea } = this.state
    let { update } = this
    return (
      <View className='orderFlowerWrap'>
        <Backhistory title='订花' color='#000' />
        {/* 头部 */}
        <Header update={update} />
        {/* 过滤器 */}
        <FilterBar active={filterActive} update={update} priceSort={priceSort} />
        {/* 鲜花列表 */}
        <FlowerList />
        {/* 选择地址 */}
        
        <AtFloatLayout
          isOpened={showSelectArea}
        >
          <SelectArea />
        </AtFloatLayout>
      </View>
    )
  }
}

export default connect(mapState)(OrderFlower)
