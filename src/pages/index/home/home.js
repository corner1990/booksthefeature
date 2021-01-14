import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
// import ListView from "taro-listview"
import CustomNavBar from '../../../components/navbar'
// import Swiper from './home-components/swiper'
import TabBar from './home-components/tab'
import NewProductList from './home-components/newProductList'
import Welcome from './home-components/welcome'
import NoTask from './home-components/no-task'

import './home.scss'
import { getProductList } from '../api'


const mapState = state => state.global
class Home extends Component {
  state = {
    list: [],
    // laoding: false,
    showNavBar: true,
    pageInfo: {
      index: 0,
      has_more: true,
      page_size: 10
    }
  }
  
  componentWillMount () { }

  componentDidMount () {
    this.loadInfo()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  pageInfo = {
    index: 0
  }

  /**
   * @desc 动态控制是否显示navBar
   */
  getNavBar = () => {
    let title = 'Books The Feature'
    let { showNavBar } = this.state
    if(!showNavBar) return ''
    return (<CustomNavBar title={title} />)
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async ()=> {
    let list = []
    if (list) {
      return false
    }
    let { loading, pageInfo } = this.state
    if (loading || !pageInfo.has_more) return false
    this.setState({
      loading: true
    })

    let { errorCode, data } = await getProductList(pageInfo)
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.product_list : [...this.state.list, ...data.product_list]
      pageInfo = data.page_info
    }
    this.setState({
      list,
      pageInfo,
      loading: false
    })
  }
  render () {
    
    let { list } = this.state

    return (
      <View
        className='home'
      >
        <Welcome />
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.loadInfo}
          lowerThreshold={400}
          style={{ height: "100%" }}
        >
          { this.getNavBar() }
          {/* <TabBar /> */}
          <NoTask />
          {/* <NewProductList list={list} /> */}
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapState)(Home)
