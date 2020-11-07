import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
// import ListView from "taro-listview"
import CustomNavBar from '../../../components/navbar'
import FoundCard from './components/card'
import ViewDetal from './components/view-detail'
import './index.scss'
import { getFeedList } from './api'


export default class Index extends Component {
  state = {
    list: [],
    pageInfo: {
      index: 0,
      has_more: true
    },
    open: false,
    info: {
      feed_detail: {
        description: '',
        image_list: [{image: ''}]
      }
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
      pageInfo = data.page_info
    }
    // list = [...list, ...list, ...list]
    // console.log('ist', list)
    this.setState({
      list,
      pageInfo
    })
  }
  /**
   * @desc 更新数据
   * @param {*} key 
   * @param {*} val 
   */
  update = params => {
    this.setState(params)
  }
  render () {
    let { pageInfo, list, open, info } = this.state
    return (
      <View className='found' >
        <CustomNavBar title='发现' />
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.loadInfo}
          style={{ height: "100%" }}
        >
          <View className='FoundList'>
            { list.map( (item, key ) => (<FoundCard info={item} key={key} update={this.update} />))}
          </View>
        </ScrollView>
        <ViewDetal open={open} info={info} update={this.update} />
      </View>
    )
  }
}
