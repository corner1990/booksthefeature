import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import ListView from "taro-listview"
import Backhistory from '../../components/backhistory'
import Header from './flower-components/header'
import FilterBar from './flower-components/filterBar'
import NewProductList from '../index/home/home-components/newProductList'


import './index.scss'
import { getProductList } from '../index/home/api'

const mapState = state => state.global
/**
 * @desc 订花
 */
class OrderFlower extends Component {
  state = {
    filterActive: 1,
    priceSort: 0,
    list: [],
    pageInfo: {
      index: 0,
      has_more: true
    }
  }
  componentWillMount () { }

  componentDidMount () {
    this.loadInfo()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  /**
   * @desc 更新数据
   * @param { string } key 需要更新的属性key
   * @param { any } val 任何值
   */
  update = params => {
    this.setState(params)
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async ()=> {
    let list = []
    let pageInfo = {}
    let { filterActive } = this.state
    let { errorCode, data } = await getProductList({...this.state.pageInfo, product_type: filterActive })
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.product_list : [...this.state.list, data.product_list]
    }
    this.setState({
      list, pageInfo
    })
  }
  render () {
    let { filterActive, priceSort, list, pageInfo } = this.state
    let { update } = this
    return (
      <View className='orderFlowerWrap'>
        <ListView
          hasMore={pageInfo.has_more}
          onScrollToLower={this.loadInfo}
          className='sbListView'
          autoHeight
        >
          <Backhistory title='订花' color='#fff' />
          {/* 头部 */}
          <Header update={update} loadinfo={this.loadInfo} />
          {/* 过滤器 */}
          {filterActive === 1 ? <FilterBar active={filterActive} update={update} priceSort={priceSort} /> : ''}
          {/* 鲜花列表 */}
          <NewProductList list={list} hideTitle />
          {/* 选择地址 */}
        </ListView>
  
      </View>
    )
  }
}

export default connect(mapState)(OrderFlower)
