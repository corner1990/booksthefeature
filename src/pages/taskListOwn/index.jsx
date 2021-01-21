import React, { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
import Taro, { render } from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskList from './components/newProductList'
import { getPubTaskList } from './api'
import Event from '../../utils/event'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
class TaskDetail extends React.Component {
  
  state = {
    list: [],
    pageInfo: {index: 0, has_more: true}
  }
  
  // 可以使用所有的 React 组件方法
  componentDidMount () {
    // this.loadInfo()
  }

  // 对应 onLaunch
  onLaunch () {}

  // 对应 onShow
  componentDidShow () {
    
    this.loadInfo()
  }

  // 对应 onHide
  componentDidHide () {}
  backHistory = () => {
    Taro.navigateBack()
  }
  /**
   * @desc 下载数据
   */
  loadInfo = async () => {
    let { pageInfo, list: arr } = this.state
    let { errorCode, data } = await getPubTaskList(pageInfo)
    if (pageInfo.index == 0) arr = []
    if (errorCode == 0) {
      
      let list = [...arr, ...data.list]
      this.setState({ list, pageInfo: data.page_info })
 
    }
  }
  refresh = () => {
    this.setState({
      pageInfo: {
        index: 0, 
        has_more: true
      },
      loadInfo: false
    })
    this.loadInfo()
  }
  render() {
    let title = '我的未来'
    let { list } = this.state
    console.log('list', list)
    return (<View className='create-task-wrap'>
     <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.loadInfo}
          lowerThreshold={400}
          style={{ height: "100%" }}
        >
      <CustomNavBar
          title={title}
          clickLeft={this.backHistory}
        />
      <View className='content'>
        <TaskList list={list} />
      </View>
    </ScrollView>
  </View>)
  }
}


export default connect(mapState)(TaskDetail)
