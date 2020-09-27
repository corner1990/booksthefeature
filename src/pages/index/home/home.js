import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import ListView, { LazyBlock } from "taro-listview"
import CustomNavBar from '../../../components/navbar'
import Swiper from './home-components/swiper'
import PromotionCard from './home-components/promotionCard'
import NewProductList from './home-components/newProductList'

import './home.scss'
import { getProductList } from '../api'


const mapState = state => state.global
class Home extends Component {
  state = {
    list: [],
    isTouch: false,
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
  // touchstart = e => {
  //   e.stopPropagation()
  //   e.preventDefault()
  //   let { isTouch } = this.state
  //   if(isTouch) {
  //     this.setIsTouch()
  //   }
  // }
  // /**
  //  * @desc 控制是否页面可以滚动
  //  * @param { number | undefined } val 
  //  */
  // setIsTouch = (isTouch = false) => {
  //   this.setState({ isTouch })
  // }
  /**
   * @desc 动态控制是否显示navBar
   */
  getNavBar = () => {
    let title = 'FLOWERPLUS花加'
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
    let { errorCode, data } = await getProductList(this.state.pageInfo)
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.product_list : [...this.state.list, data.product_list]
    }
    this.setState({
      list, pageInfo
    })
  }
  render () {
    
    // let { touchstart } = this
    let { isTouch, list, pageInfo } = this.state

    return (
      <View
        className={`home ${isTouch ? 'hidden': ''}`}
        // onTouchStart={touchstart}
        // onTouchMove={touchstart}
      >
        <ListView
          hasMore={pageInfo.has_more}
          onScrollToLower={this.loadInfo}
          className='sbListView'
          autoHeight
        >
        { this.getNavBar() }
        <Swiper />
        <PromotionCard />
        <NewProductList list={list} />
        
        </ListView>
      </View>
    )
  }
}

export default connect(mapState)(Home)
