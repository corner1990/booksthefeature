import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgress, AtTag } from 'taro-ui'
import Taro, { render } from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskInfo from './components/taskInfo'
import CheckinList from './components/checkInlist'
import ViewDetal from './components/view-detail'
// import None from '../../components/none'
import './index.scss'
import { getTaskInfo } from './api'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
class TaskDetail extends React.Component {
  
    state = {
      open: false,
      info: {},
      checkInfo: {
        sign_data_detail: {
          data_list:[{}]
        },
        sign_content: ''
      }
    }
  componentDidMount() {
    this.loadInfo()
  }
  /**
   * @desc 返回
   */
  backHistory = () => {
    Taro.navigateBack()
  }
  /**
   * @desc 首次加载
   */
  loadInfo = async () => {
    let { params } = Taro.Current.router
  // let params = {"task_id":"2","task_order_sn":"btf20210120073822151"}
    let { errorCode, data } = await getTaskInfo(params)
    if (errorCode == 0) {
      this.setState({ info: data })
    }
  }
  setOpen = open => {
    this.setState({ open })
  }
  setCheckInfo = checkInfo => {
    this.setState({ checkInfo })
  }
  render() {
    let title = '未来事件'
    let { info, checkInfo, open } = this.state
    return (<View className='task-detail-wrap'>
      <CustomNavBar
          title={title}
          clickLeft={this.backHistory}
        />
      <View className='content'>
        {/* <View className='top-bg'>
          <View className='top-time' style={{backgroundImage: info.task_cover}}>
            2021 02 12
          </View>
          <View className="top-slogan">
            你所有的努力都会有回报！
          </View>
        </View> */}
        <TaskInfo info={info} />
        <CheckinList list={info.sign_record_list} setCheckInfo={this.setCheckInfo}  setOpen={this.setOpen} />
      </View>
      <ViewDetal open={open} info={checkInfo} update={this.setOpen} />
    </View>)
  }
}


export default connect(mapState)(TaskDetail)
