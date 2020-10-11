import React, { Component } from 'react'
import { View } from '@tarojs/components'
import ListView, { LazyBlock } from "taro-listview"
import CustomNavBar from '../../../components/navbar'
import FoundCard from './components/card'
import './index.scss'
import { getFeedList } from './api'


export default class Index extends Component {
  state = {
    list: [],
    pageInfo: {
      index: 0,
      has_more: true
    }
  }
  
  componentDidMount () {
    this.loadInfo()
  }
  /**
   * @desc 加载数据
   */
  loadInfo = async ()=> {
    let list = []
    let pageInfo = {}
    let { errorCode, data } = await getFeedList(this.state.pageInfo)
    if (errorCode === 0) {
      list = data.page_info.index === 1 ? data.feed_info_list : [...this.state.list, ...data.feed_info_list]
    }
    // list = [...list, ...list, ...list]
    // console.log('ist', list)
    this.setState({
      list, pageInfo
    })
  }
  render () {
    let { pageInfo, list } = this.state
    return (
      <View className='found' >
        <CustomNavBar title='发现' />
        <ListView
          hasMore={pageInfo.has_more}
          onScrollToLower={this.loadInfo}
          className='sbListView'
          autoHeight
        >
          <View className='FoundList'>
            { list.map( (item, key ) => (<FoundCard info={item} key={key} />))}
          </View>
        </ListView>
        
      </View>
    )
  }
}
