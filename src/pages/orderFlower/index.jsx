import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import Backhistory from '../../components/backhistory'
import Header from './flower-components/header'
import FilterBar from './flower-components/filterBar'
import NewProductList from '../index/home/home-components/newProductList'
import None from '../../components/none'
import './index.scss'
import { getAdvertisingList, getProductList } from '../index/home/api'

const mapState = state => state.global
/**
 * @desc 订花
 */
class OrderFlower extends Component {
  state = {
    filterActive: 1,
    list: [],
    pageInfo: {
      index: 0,
      has_more: true
    },
    sort_type: 0,
    order_type: 0,
    bannerList: []
  }
  componentWillMount () { }

  componentDidMount () {
    let {
      type: filterActive
    } = Taro.Current.router.params
    filterActive -= 0
    // let filterActive = 0
    this.setState({ filterActive }, () => {
      this.loadInfo(filterActive)
      this.loadBanner(filterActive)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  /**
   * @desc 加载banner
   */
  loadBanner = async (space_id) => {
    let { errorCode, data } = await getAdvertisingList({ space_id })
    if (errorCode === 0) {
      this.setState({
        bannerList: data.advertising_list
      })
    }
  }
  /**
   * @desc 更新数据
   * @param { string } key 需要更新的属性key
   * @param { any } val 任何值
   */
  update = params => {
    this.setState({
      ...params,
      list: [],
      pageInfo: {
        index: 0,
        has_more: true
      }
    })
    this.loadInfo()
    if (params.filterActive) {
      this.loadBanner(params.filterActive)
    }
  }
  
  /**
   * @desc 加载数据
   */
  loadInfo = async ()=> {
    let list = []
    let pageInfo = {}
    let { filterActive, sort_type, order_type } = this.state
    let params = {...this.state.pageInfo, product_type: filterActive }

    if (filterActive == 2) {
      params = {
        ...params,
        sort_type
      }
      if (sort_type == 2) {
        params.order_type = order_type
      }
    }
    let { errorCode, data } = await getProductList(params)
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.product_list : [...this.state.list, data.product_list]
    }
    this.setState({
      list, pageInfo
    })
  }

  render () {
    let { filterActive, order_type, list, sort_type, bannerList } = this.state
    let { update } = this
    return (
      <View className='orderFlowerWrap'>
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.loadInfo}
          style={{ height: "100vh" }}
        >
          <Backhistory title='订花' color='rgba(0, 0, 0, .85)' bgColor='#fff' />
          {/* 头部 */}
          <Header
            update={update}
            loadinfo={this.loadInfo}
            active={filterActive}
            list={bannerList}
          />
          {/* 过滤器 */}
          {
            filterActive == 2 ? 
            <FilterBar
              active={sort_type}
              update={update}
              order_type={order_type}
            /> : ''
          }
          {/* 鲜花列表 */}
          {
            list.length ? <NewProductList list={list} hideTitle /> :  <None />
          }
          {/* 选择地址 */}
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapState)(OrderFlower)
