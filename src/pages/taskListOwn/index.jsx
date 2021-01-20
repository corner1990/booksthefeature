import React, { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskList from './components/newProductList'
import { getPubTaskList } from './api'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '我的未来'
  const backHistory = () => {
    Taro.navigateBack()
  }
  const [list, setList] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [pageInfo, setPageInfo] = useState({index: 0, has_more: true})
  
  /**
   * @desc 下载数据
   */
  const loadInfo = async () => {
    let { errorCode, data } = await getPubTaskList(pageInfo)
    setFirstLoad(false)
    if (errorCode == 0) {
      setList([...list, ...data.list])
      setPageInfo(data.page_info)
    }
  }
  if (firstLoad) {
    loadInfo()
  }
  return <View className='create-task-wrap'>
     <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={loadInfo}
          lowerThreshold={400}
          style={{ height: "100%" }}
        >
      <CustomNavBar
          title={title}
          clickLeft={backHistory}
        />
      <View className='content'>
        <TaskList list={list} />
      </View>
    </ScrollView>
  </View>
}


export default connect(mapState)(TaskDetail)
