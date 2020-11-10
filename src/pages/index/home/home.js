import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
// import ListView from "taro-listview"
import CustomNavBar from '../../../components/navbar'
import Swiper from './home-components/swiper'
import PromotionCard from './home-components/promotionCard'
import NewProductList from './home-components/newProductList'
import Welcome from './home-components/welcome'

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
  pageInfo = {
    index: 0
  }

  /**
   * @desc 动态控制是否显示navBar
   */
  getNavBar = () => {
    let title = 'AS Flower Boutique'
    let { showNavBar } = this.state
    if(!showNavBar) return ''
    return (<CustomNavBar title={title} />)
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async ()=> {
    let list = []
    let pageInfo = {}
    if (this.state.loading) return false
    this.setState({
      loading: true
    })

    let { errorCode, data } = await getProductList(this.state.pageInfo)
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
          style={{ height: "100%" }}
        >
          { this.getNavBar() }
          <Swiper />
          <PromotionCard />
          <NewProductList list={list} />
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapState)(Home)
