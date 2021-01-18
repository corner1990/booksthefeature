import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
import CustomNavBar from '../../../components/navbar'
import TabBar from './home-components/tab'
import NewProductList from './home-components/newProductList'
import Welcome from './home-components/welcome'
import NoTask from './home-components/no-task'

import './home.scss'
import { getTaskList } from './api'


const mapState = state => state.global
class Home extends Component {
  state = {
    list: [],
    // laoding: false,
    showNavBar: true,
    pageInfo: {
      index: 0,
      has_more: true,
      page_size: 10,
      task_order_query_type: 0
    },
    isNoData: false
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
    let title = '有学有钱'
    let { showNavBar } = this.state
    if(!showNavBar) return ''
    return (<CustomNavBar title={title} />)
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async ()=> {
    let list = []
   
    let { loading, pageInfo } = this.state
    if (loading || !pageInfo.has_more) return false
    this.setState({
      loading: true
    })

    let { errorCode, data } = await getTaskList(pageInfo)
    if (errorCode == 0) {
      list = data.page_info.index === 1 ? data.list : [...this.state.list, ...data.list]
      pageInfo = data.page_info
    }
    this.setState({
      list,
      pageInfo,
      loading: false
    })
  }
  refresh = type => {
    let { pageInfo } = this.state
    let { loadInfo } = this
    
    this.setState({
      pageInfo: {
        ...pageInfo,
        index: 1, 
        has_more: true,
        task_order_query_type: type,
      },
      loading: false
    }, () => {
      console.log('33333')
      loadInfo()
    })
  }
  render () {
    
    let { list = [], pageInfo } = this.state
    // 
    let isNoData = list.length == 0 && !pageInfo.has_more
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
          {
            !isNoData ? <TabBar refresh={this.refresh} /> : ''
          }
         {
          isNoData ?  <NoTask /> : ''
         }
          {!isNoData ?  <NewProductList list={list} /> : ''}
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapState)(Home)
